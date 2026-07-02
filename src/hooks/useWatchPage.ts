import { useEffect, useState } from "react";
import { fetchMovieDetail, fetchMovieVideos } from "../lib/tmdb";
import type { MovieDetail, MovieVideo } from "../types/movie";

export function useWatchPage(id: number | null) {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [videos, setVideos] = useState<MovieVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<MovieVideo | null>(null);
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

        const [movieData, videoData] = await Promise.all([
          fetchMovieDetail(id!),
          fetchMovieVideos(id!),
        ]);

        if (cancelled) return;

        setMovie(movieData);
        setVideos(videoData);
        setSelectedVideo(videoData[0] ?? null);

        if (videoData.length === 0) {
          setError("재생 가능한 예고편 영상을 찾지 못했습니다.");
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "영상 정보를 불러오지 못했습니다.",
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

  return { movie, videos, selectedVideo, setSelectedVideo, loading, error };
}
