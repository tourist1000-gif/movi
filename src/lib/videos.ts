import { fetchMovieDetail, fetchMovieVideos } from "./tmdb";
import { searchYoutubeVideos } from "./youtube";
import type { MovieVideo } from "../types/movie";

export type VideoSource = "tmdb" | "youtube";

export async function fetchVideosForMovie(
  movieId: number,
  movieTitle: string,
): Promise<{ videos: MovieVideo[]; source: VideoSource | null }> {
  const tmdbVideos = await fetchMovieVideos(movieId);
  if (tmdbVideos.length > 0) {
    return { videos: tmdbVideos, source: "tmdb" };
  }

  const youtubeVideos = await searchYoutubeVideos(movieTitle);
  if (youtubeVideos.length > 0) {
    return { videos: youtubeVideos, source: "youtube" };
  }

  return { videos: [], source: null };
}

export async function loadWatchPageData(movieId: number) {
  const movie = await fetchMovieDetail(movieId);
  const { videos, source } = await fetchVideosForMovie(movieId, movie.title);
  return { movie, videos, source };
}
