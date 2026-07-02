import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { loadEnv } from "vite";
import { searchYoutubeOnServer } from "./lib/youtube-search-server";

function youtubeSearchApiPlugin(): Plugin {
  return {
    name: "youtube-search-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith("/api/youtube-search")) {
          next();
          return;
        }

        const url = new URL(req.url, "http://localhost");
        const query = url.searchParams.get("q")?.trim() ?? "";

        if (!query) {
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "q parameter is required" }));
          return;
        }

        const env = loadEnv(server.config.mode, process.cwd(), "");
        const apiKey = env.VITE_YOUTUBE_API_KEY || env.YOUTUBE_API_KEY;

        try {
          const results = await searchYoutubeOnServer(query, apiKey);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(results));
        } catch {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "YouTube search failed" }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), youtubeSearchApiPlugin()],
});
