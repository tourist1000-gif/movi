import type { Movie, TrendingMovie } from "../types/movie";
import type { TmdbMovieDetails, TmdbMovieListItem } from "../types/tmdb";
import { getImageUrl } from "./tmdb";

function formatDuration(minutes: number | null): string {
  if (!minutes) return "정보 없음";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}분`;
  if (mins === 0) return `${hours}시간`;
  return `${hours}시간 ${mins}분`;
}

function formatReleasedAgo(releaseDate: string): string {
  if (!releaseDate) return "미정";

  const release = new Date(releaseDate);
  const now = new Date();
  const diffMs = now.getTime() - release.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (days < 0) return "개봉 예정";
  if (days === 0) return "오늘";
  if (days < 30) return `${days}일`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}개월`;
  return `${Math.floor(months / 12)}년`;
}

function isRecentlyReleased(releaseDate: string): boolean {
  if (!releaseDate) return false;
  const release = new Date(releaseDate);
  const days =
    (Date.now() - release.getTime()) / (1000 * 60 * 60 * 24);
  return days >= 0 && days <= 30;
}

export function mapToTrendingMovie(movie: TmdbMovieListItem): TrendingMovie {
  return {
    id: String(movie.id),
    title: movie.title,
    poster: getImageUrl(movie.poster_path, "w185"),
    isNew: isRecentlyReleased(movie.release_date),
  };
}

export function mapToMovie(movie: TmdbMovieDetails): Movie {
  const director =
    movie.credits?.crew.find((member) => member.job === "Director")?.name ??
    "정보 없음";

  const cast =
    movie.credits?.cast
      .slice(0, 5)
      .map((member) => member.name)
      .filter(Boolean) ?? [];

  const studio = movie.production_companies[0]?.name ?? "Unknown Studio";
  const studioLogo = getImageUrl(
    movie.production_companies[0]?.logo_path,
    "w92",
  );

  const likedByCast = movie.credits?.cast[0]?.name;

  return {
    id: String(movie.id),
    title: movie.title,
    studio,
    studioLogo:
      studioLogo.includes("No Image") && movie.poster_path
        ? getImageUrl(movie.poster_path, "w92")
        : studioLogo,
    verified: movie.vote_average >= 7.5,
    releasedAgo: formatReleasedAgo(movie.release_date),
    poster: getImageUrl(movie.poster_path, "w500"),
    likes: movie.vote_count,
    comments: Math.max(1, Math.floor(movie.vote_count * 0.12)),
    shares: Math.max(1, Math.floor(movie.popularity)),
    likedBy: likedByCast ?? "movie_fan",
    synopsis: movie.overview || "줄거리 정보가 없습니다.",
    director,
    cast: cast.length > 0 ? cast : ["출연 정보 없음"],
    rating: Math.round(movie.vote_average * 10) / 10,
    genre: movie.genres.map((g) => g.name).join(" · ") || "장르 미정",
    duration: formatDuration(movie.runtime),
  };
}
