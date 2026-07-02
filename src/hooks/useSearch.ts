import { useEffect, useState } from "react";
import { searchMovies } from "../lib/tmdb";
import type { NowPlayingMovie } from "../types/movie";

export function useSearch(query: string) {
  const [results, setResults] = useState<NowPlayingMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await searchMovies(trimmed);
        if (!cancelled) setResults(data);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "검색에 실패했습니다.",
          );
          setResults([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 400);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  return { results, loading, error };
}
