import { useEffect, useState } from "react";
import { fetchMovieDetail } from "../lib/tmdb";
import type { MovieDetail } from "../types/movie";

export function useMovieDetail(id: number | null) {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || Number.isNaN(id)) {
      setError("유효하지 않은 영화 ID입니다.");
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMovieDetail(id!);
        if (!cancelled) setMovie(data);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "영화 정보를 불러오지 못했습니다.",
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
  }, [id]);

  return { movie, loading, error };
}
