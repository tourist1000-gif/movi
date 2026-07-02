import type { MovieDetail, MovieVideo, NowPlayingMovie } from "../types/movie";
import type {
  TmdbMovieDetailsResponse,
  TmdbMovieListItem,
  TmdbPaginatedResponse,
  TmdbSearchResponse,
  TmdbVideo,
  TmdbVideosResponse,
} from "../types/tmdb";

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p";

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='450' viewBox='0 0 300 450'%3E%3Crect fill='%23222222' width='300' height='450'/%3E%3Ctext x='50%25' y='50%25' fill='%23555' font-size='16' text-anchor='middle' dominant-baseline='middle' font-family='sans-serif'%3ENo Image%3C/text%3E%3C/svg%3E";

function getApiKey(): string {
  const key = import.meta.env.VITE_TMDB_API_KEY;
  if (!key) {
    throw new Error("VITE_TMDB_API_KEY가 .env 파일에 설정되어 있지 않습니다.");
  }
  return key;
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
    throw new Error(
      response.status === 401
        ? "TMDB API 키가 유효하지 않습니다."
        : `요청에 실패했습니다. (${response.status})`,
    );
  }

  return response.json() as Promise<T>;
}

export function getPosterUrl(path: string | null): string {
  if (!path) return PLACEHOLDER;
  return `${IMAGE_BASE}/w500${path}`;
}

export function getBackdropUrl(path: string | null): string {
  if (!path) return PLACEHOLDER;
  return `${IMAGE_BASE}/w1280${path}`;
}

function mapListItem(item: TmdbMovieListItem): NowPlayingMovie {
  return {
    id: item.id,
    title: item.title,
    posterUrl: getPosterUrl(item.poster_path),
    backdropUrl: getBackdropUrl(item.backdrop_path ?? item.poster_path),
    overview: item.overview,
    releaseDate: item.release_date,
    rating: Math.round(item.vote_average * 10) / 10,
  };
}

function mapDetail(data: TmdbMovieDetailsResponse): MovieDetail {
  const director =
    data.credits?.crew.find((member) => member.job === "Director")?.name ??
    "정보 없음";

  const cast =
    data.credits?.cast
      .slice(0, 8)
      .map((member) => member.name)
      .filter(Boolean) ?? [];

  return {
    id: data.id,
    title: data.title,
    posterUrl: getPosterUrl(data.poster_path),
    backdropUrl: getBackdropUrl(data.backdrop_path ?? data.poster_path),
    overview: data.overview,
    releaseDate: data.release_date,
    rating: Math.round(data.vote_average * 10) / 10,
    runtime: data.runtime,
    genres: data.genres.map((g) => g.name),
    director,
    cast: cast.length > 0 ? cast : ["정보 없음"],
    tagline: data.tagline,
  };
}

export function formatRuntime(minutes: number | null): string {
  if (!minutes) return "정보 없음";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}분`;
  if (mins === 0) return `${hours}시간`;
  return `${hours}시간 ${mins}분`;
}

export async function fetchNowPlaying(): Promise<NowPlayingMovie[]> {
  const data = await tmdbFetch<TmdbPaginatedResponse<TmdbMovieListItem>>(
    "/movie/now_playing",
    { region: "KR" },
  );
  return data.results.map(mapListItem);
}

export async function fetchMovieDetail(id: number): Promise<MovieDetail> {
  const data = await tmdbFetch<TmdbMovieDetailsResponse>(`/movie/${id}`, {
    append_to_response: "credits",
  });
  return mapDetail(data);
}

export async function searchMovies(query: string): Promise<NowPlayingMovie[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const data = await tmdbFetch<TmdbSearchResponse>("/search/movie", {
    query: trimmed,
    include_adult: "false",
  });

  return data.results.map(mapListItem);
}

const VIDEO_TYPE_PRIORITY: Record<string, number> = {
  Trailer: 0,
  Teaser: 1,
  Clip: 2,
  Featurette: 3,
  "Behind the Scenes": 4,
};

function mapVideo(video: TmdbVideo): MovieVideo | null {
  if (video.site !== "YouTube") return null;

  return {
    id: video.id,
    name: video.name,
    key: video.key,
    site: video.site,
    type: video.type,
    official: video.official,
    embedUrl: `https://www.youtube.com/embed/${video.key}?autoplay=1&rel=0`,
    watchUrl: `https://www.youtube.com/watch?v=${video.key}`,
    source: "tmdb",
  };
}

function sortVideos(a: MovieVideo, b: MovieVideo): number {
  if (a.official !== b.official) return a.official ? -1 : 1;

  const typeDiff =
    (VIDEO_TYPE_PRIORITY[a.type] ?? 99) - (VIDEO_TYPE_PRIORITY[b.type] ?? 99);
  if (typeDiff !== 0) return typeDiff;

  return a.name.localeCompare(b.name, "ko");
}

export async function fetchMovieVideos(movieId: number): Promise<MovieVideo[]> {
  const data = await tmdbFetch<TmdbVideosResponse>(`/movie/${movieId}/videos`);
  const videos = data.results
    .map(mapVideo)
    .filter((video): video is MovieVideo => video !== null)
    .sort(sortVideos);

  if (videos.length > 0) return videos;

  return fetchMovieVideosFallback(movieId);
}

async function fetchMovieVideosFallback(movieId: number): Promise<MovieVideo[]> {
  const url = new URL(`${BASE_URL}/movie/${movieId}/videos`);
  url.searchParams.set("api_key", getApiKey());

  const response = await fetch(url.toString());
  if (!response.ok) return [];

  const data = (await response.json()) as TmdbVideosResponse;
  return data.results
    .map(mapVideo)
    .filter((video): video is MovieVideo => video !== null)
    .sort(sortVideos);
}

export function getPrimaryVideo(videos: MovieVideo[]): MovieVideo | null {
  return videos[0] ?? null;
}
