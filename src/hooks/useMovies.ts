import { useEffect, useState } from "react";
import { mapToMovie, mapToTrendingMovie } from "../lib/mappers";
import {
  fetchPopularMoviesWithDetails,
  fetchTrendingMovies,
} from "../lib/tmdb";
import type { Movie, TrendingMovie } from "../types/movie";

interface UseMoviesResult {
  movies: Movie[];
  trending: TrendingMovie[];
  loading: boolean;
  error: string | null;
}

export function useMovies(): UseMoviesResult {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trending, setTrending] = useState<TrendingMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const [trendingData, popularDetails] = await Promise.all([
          fetchTrendingMovies(),
          fetchPopularMoviesWithDetails(),
        ]);

        if (cancelled) return;

        setTrending(trendingData.map(mapToTrendingMovie));
        setMovies(popularDetails.map(mapToMovie));
      } catch (err) {
        if (cancelled) return;
        setError(
          err instanceof Error ? err.message : "데이터를 불러오지 못했습니다.",
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { movies, trending, loading, error };
}
