import { useEffect, useMemo, useState } from "react";
import { fetchNowPlaying } from "../lib/tmdb";
import { buildGenreRows, type GenreRow } from "../lib/genres";
import type { NowPlayingMovie } from "../types/movie";

export function useNowPlaying() {
  const [movies, setMovies] = useState<NowPlayingMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchNowPlaying();
        if (!cancelled) setMovies(data);
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

  const genreRows: GenreRow[] = useMemo(
    () => buildGenreRows(movies, 1),
    [movies],
  );

  return { movies, genreRows, loading, error };
}
