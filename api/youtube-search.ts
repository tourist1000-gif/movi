import type { VercelRequest, VercelResponse } from "@vercel/node";
import { searchYoutubeOnServer } from "../lib/youtube-search-server";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    const rawQuery = req.query.q;
    const query = typeof rawQuery === "string" ? rawQuery.trim() : "";

    if (!query) {
      res.status(400).json({ error: "q parameter is required" });
      return;
    }

    const apiKey =
      process.env.YOUTUBE_API_KEY ?? process.env.VITE_YOUTUBE_API_KEY;

    const results = await searchYoutubeOnServer(query, apiKey);
    res.status(200).json(results);
  } catch (error) {
    console.error("youtube-search error:", error);
    res.status(500).json({ error: "YouTube search failed" });
  }
}
