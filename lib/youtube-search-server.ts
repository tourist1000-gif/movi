export interface YoutubeSearchResult {
  id: string;
  name: string;
  key: string;
  site: string;
  type: string;
  official: boolean;
  embedUrl: string;
  watchUrl: string;
  source: "youtube";
}

interface PipedSearchItem {
  type: string;
  title?: string;
  url?: string;
}

interface PipedSearchResponse {
  items?: PipedSearchItem[];
}

interface YoutubeApiItem {
  id?: { videoId?: string };
  snippet?: { title?: string };
}

interface YoutubeApiResponse {
  items?: YoutubeApiItem[];
}

const PIPED_INSTANCES = [
  "https://pipedapi.adminforge.de",
  "https://api.piped.projectsegfau.lt",
  "https://pipedapi.kavin.rocks",
];

function createVideo(videoId: string, title: string): YoutubeSearchResult {
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

function extractVideoId(url: string): string | null {
  const match = url.match(/[?&]v=([^&]+)/);
  return match?.[1] ?? null;
}

async function searchYoutubeApi(
  query: string,
  apiKey?: string,
): Promise<YoutubeSearchResult[]> {
  if (!apiKey) return [];

  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("q", query);
  url.searchParams.set("type", "video");
  url.searchParams.set("maxResults", "10");
  url.searchParams.set("key", apiKey);

  const response = await fetch(url.toString());
  if (!response.ok) return [];

  const data = (await response.json()) as YoutubeApiResponse;
  return (data.items ?? [])
    .map((item) => {
      const videoId = item.id?.videoId;
      const title = item.snippet?.title;
      if (!videoId || !title) return null;
      return createVideo(videoId, title);
    })
    .filter((video): video is YoutubeSearchResult => video !== null);
}

async function searchPiped(query: string): Promise<YoutubeSearchResult[]> {
  for (const instance of PIPED_INSTANCES) {
    try {
      const url = new URL(`${instance}/search`);
      url.searchParams.set("q", query);
      url.searchParams.set("filter", "videos");

      const response = await fetch(url.toString());
      if (!response.ok) continue;

      const data = (await response.json()) as PipedSearchResponse;
      const videos = (data.items ?? [])
        .filter((item) => item.type === "stream" && item.url && item.title)
        .map((item) => {
          const videoId = extractVideoId(item.url!);
          if (!videoId) return null;
          return createVideo(videoId, item.title!);
        })
        .filter((video): video is YoutubeSearchResult => video !== null);

      if (videos.length > 0) return videos;
    } catch {
      continue;
    }
  }
  return [];
}

export async function searchYoutubeOnServer(
  query: string,
  apiKey?: string,
): Promise<YoutubeSearchResult[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const apiResults = await searchYoutubeApi(trimmed, apiKey);
  if (apiResults.length > 0) return apiResults;

  return searchPiped(trimmed);
}
