import { useEffect, useState } from "react";
import { fetchHomePageData } from "../lib/tmdb";
import type { GenreRow } from "../lib/genres";
import type { NowPlayingMovie } from "../types/movie";

export function useNowPlaying() {
  const [movies, setMovies] = useState<NowPlayingMovie[]>([]);
  const [genreRows, setGenreRows] = useState<GenreRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchHomePageData();
        if (!cancelled) {
          setMovies(data.movies);
          setGenreRows(data.genreRows);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "데이터를 불러오지 못했습니다.",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { movies, genreRows, loading, error };
}
