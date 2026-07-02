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

  const data = (await response.json()) as {
    items?: { id?: { videoId?: string }; snippet?: { title?: string } }[];
  };

  return (data.items ?? [])
    .map((item) => {
      const videoId = item.id?.videoId;
      const title = item.snippet?.title;
      if (!videoId || !title) return null;
      return createVideo(videoId, title);
    })
    .filter((video): video is YoutubeSearchResult => video !== null);
}

async function searchYoutubeScrape(query: string): Promise<YoutubeSearchResult[]> {
  const response = await fetch(
    `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}&sp=EgIQAQ%253D%253D`,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "ko-KR,ko;q=0.9,en;q=0.8",
      },
    },
  );

  if (!response.ok) return [];

  const html = await response.text();
  const videoIdMatches = [...html.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g)];
  const titleMatches = [
    ...html.matchAll(/"title":\{"runs":\[\{"text":"((?:\\.|[^"\\])*)"\}/g),
  ];

  const seen = new Set<string>();
  const results: YoutubeSearchResult[] = [];

  for (const match of videoIdMatches) {
    const videoId = match[1];
    if (seen.has(videoId)) continue;
    seen.add(videoId);

    const titleIndex = results.length;
    const rawTitle = titleMatches[titleIndex]?.[1] ?? `${query} - YouTube`;
    const title = rawTitle.replace(/\\u([0-9a-fA-F]{4})/g, (_, code) =>
      String.fromCharCode(parseInt(code, 16)),
    );

    results.push(createVideo(videoId, title));
    if (results.length >= 10) break;
  }

  return results;
}

export async function searchYoutubeOnServer(
  query: string,
  apiKey?: string,
): Promise<YoutubeSearchResult[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const apiResults = await searchYoutubeApi(trimmed, apiKey);
  if (apiResults.length > 0) return apiResults;

  return searchYoutubeScrape(trimmed);
}
