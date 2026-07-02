import { searchYoutubeOnServer } from "../lib/youtube-search-server";

export default async function handler(
  request: { query: { q?: string | string[] } },
  response: {
    setHeader: (key: string, value: string) => void;
    status: (code: number) => { json: (body: unknown) => void };
  },
) {
  response.setHeader("Access-Control-Allow-Origin", "*");

  const rawQuery = request.query.q;
  const query = typeof rawQuery === "string" ? rawQuery.trim() : "";

  if (!query) {
    response.status(400).json({ error: "q parameter is required" });
    return;
  }

  const apiKey =
    process.env.YOUTUBE_API_KEY ?? process.env.VITE_YOUTUBE_API_KEY;

  const results = await searchYoutubeOnServer(query, apiKey);
  response.status(200).json(results);
}
