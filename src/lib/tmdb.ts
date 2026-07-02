import type {
  TmdbMovieDetails,
  TmdbMovieListItem,
  TmdbPaginatedResponse,
} from "../types/tmdb";

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p";

export type ImageSize = "w92" | "w185" | "w500" | "original";

const PLACEHOLDER_POSTER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='750' viewBox='0 0 500 750'%3E%3Crect fill='%23121212' width='500' height='750'/%3E%3Ctext x='50%25' y='50%25' fill='%23363636' font-size='24' text-anchor='middle' dominant-baseline='middle' font-family='sans-serif'%3ENo Image%3C/text%3E%3C/svg%3E";

export function getApiKey(): string {
  const key = import.meta.env.VITE_TMDB_API_KEY;
  if (!key) {
    throw new Error(
      "VITE_TMDB_API_KEY가 설정되지 않았습니다. .env 파일을 확인해 주세요.",
    );
  }
  return key;
}

export function getImageUrl(
  path: string | null | undefined,
  size: ImageSize = "w500",
): string {
  if (!path) return PLACEHOLDER_POSTER;
  return `${IMAGE_BASE}/${size}${path}`;
}

async function tmdbFetch<T>(
  endpoint: string,
  params: Record<string, string> = {},
): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set("api_key", getApiKey());
  url.searchParams.set("language", "ko-KR");

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    const message =
      response.status === 401
        ? "TMDB API 키가 유효하지 않습니다."
        : `TMDB API 오류 (${response.status})`;
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export async function fetchTrendingMovies(): Promise<TmdbMovieListItem[]> {
  const data = await tmdbFetch<TmdbPaginatedResponse<TmdbMovieListItem>>(
    "/trending/movie/day",
  );
  return data.results;
}

export async function fetchPopularMovies(): Promise<TmdbMovieListItem[]> {
  const data = await tmdbFetch<TmdbPaginatedResponse<TmdbMovieListItem>>(
    "/movie/popular",
  );
  return data.results.slice(0, 10);
}

export async function fetchMovieDetails(
  movieId: number,
): Promise<TmdbMovieDetails> {
  return tmdbFetch<TmdbMovieDetails>(`/movie/${movieId}`, {
    append_to_response: "credits",
  });
}

export async function fetchPopularMoviesWithDetails(): Promise<
  TmdbMovieDetails[]
> {
  const popular = await fetchPopularMovies();
  return Promise.all(popular.map((movie) => fetchMovieDetails(movie.id)));
}
