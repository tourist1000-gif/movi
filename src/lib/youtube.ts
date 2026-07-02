import type { MovieVideo } from "../types/movie";

function scoreYoutubeTitle(title: string): number {
  const lower = title.toLowerCase();
  if (lower.includes("official trailer") || lower.includes("공식 예고편")) {
    return 0;
  }
  if (lower.includes("trailer") || lower.includes("예고편") || lower.includes("teaser")) {
    return 1;
  }
  if (lower.includes("clip") || lower.includes("review") || lower.includes("리뷰")) {
    return 3;
  }
  return 2;
}

function sortYoutubeResults(videos: MovieVideo[]): MovieVideo[] {
  return [...videos].sort(
    (a, b) => scoreYoutubeTitle(a.name) - scoreYoutubeTitle(b.name),
  );
}

function dedupeVideos(videos: MovieVideo[]): MovieVideo[] {
  const seen = new Set<string>();
  return videos.filter((video) => {
    if (seen.has(video.key)) return false;
    seen.add(video.key);
    return true;
  });
}

function createYoutubeVideo(
  videoId: string,
  title: string,
): MovieVideo {
  return {
    id: `yt-${videoId}`,
    name: title,
    key: videoId,
    site: "YouTube",
    type: "YouTube",
    official: false,
    embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`,
    watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
    source: "youtube",
  };
}

async function searchWithYoutubeApi(query: string): Promise<MovieVideo[]> {
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  if (!apiKey) return [];

  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("q", query);
  url.searchParams.set("type", "video");
  url.searchParams.set("maxResults", "10");
  url.searchParams.set("key", apiKey);

  const response = await fetch(url.toString());
  if (!response.ok) return [];

  const data = (await response.json()) as {
    items?: { id?: { videoId?: string }; snippet?: { title?: string } }[];
  };

  return (data.items ?? [])
    .map((item) => {
      const videoId = item.id?.videoId;
      const title = item.snippet?.title;
      if (!videoId || !title) return null;
      return createYoutubeVideo(videoId, title);
    })
    .filter((video): video is MovieVideo => video !== null);
}

async function searchWithProxy(query: string): Promise<MovieVideo[]> {
  const response = await fetch(
    `/api/youtube-search?q=${encodeURIComponent(query)}`,
  );
  if (!response.ok) return [];
  return (await response.json()) as MovieVideo[];
}

export async function searchYoutubeVideos(movieTitle: string): Promise<MovieVideo[]> {
  const queries = [
    `${movieTitle} official trailer`,
    `${movieTitle} trailer`,
    `${movieTitle} 예고편`,
  ];

  const collected: MovieVideo[] = [];

  for (const query of queries) {
    const proxyResults = await searchWithProxy(query);
    collected.push(...proxyResults);

    if (collected.length >= 8) break;

    const apiResults = await searchWithYoutubeApi(query);
    collected.push(...apiResults);

    if (collected.length >= 8) break;
  }

  return sortYoutubeResults(dedupeVideos(collected)).slice(0, 10);
}
