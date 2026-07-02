import { Link, useParams } from "react-router-dom";
import { HiArrowLeft, HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";
import { useWatchPage } from "../hooks/useWatchPage";
import { formatRuntime } from "../lib/tmdb";

export default function WatchPage() {
  const { id } = useParams();
  const movieId = id ? Number(id) : null;
  const { movie, videos, selectedVideo, setSelectedVideo, loading, error } =
    useWatchPage(movieId);

  if (loading) return <LoadingScreen />;
  if (error || !movie) return <ErrorScreen message={error ?? "영화를 찾을 수 없습니다."} />;

  return (
    <main className="min-h-screen bg-black pt-20 md:pt-24">
      <div className="mx-auto max-w-6xl px-4 pb-16 md:px-10">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <Link
            to={`/movie/${movie.id}`}
            className="inline-flex items-center gap-2 text-sm text-[#aaa] transition hover:text-white"
          >
            <HiArrowLeft className="h-4 w-4" />
            상세 정보로 돌아가기
          </Link>

          {selectedVideo && (
            <a
              href={selectedVideo.watchUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#aaa] transition hover:text-white"
            >
              YouTube에서 보기
              <HiOutlineArrowTopRightOnSquare className="h-4 w-4" />
            </a>
          )}
        </div>

        {selectedVideo ? (
          <div className="overflow-hidden rounded-lg bg-black shadow-2xl ring-1 ring-[#333]">
            <div className="relative aspect-video w-full bg-[#111]">
              <iframe
                key={selectedVideo.id}
                src={selectedVideo.embedUrl}
                title={selectedVideo.name}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        ) : (
          <div className="flex aspect-video items-center justify-center rounded-lg bg-[#111] text-[#777]">
            재생할 영상이 없습니다.
          </div>
        )}

        <div className="mt-6 md:mt-8">
          <p className="text-xs uppercase tracking-widest text-[#46d369]">
            {selectedVideo?.type ?? "Video"}
          </p>
          <h1 className="mt-1 text-2xl font-bold text-white md:text-4xl">
            {movie.title}
          </h1>
          {selectedVideo && (
            <p className="mt-1 text-sm text-[#aaa] md:text-base">
              {selectedVideo.name}
            </p>
          )}

          <div className="mt-3 flex flex-wrap gap-3 text-sm text-[#aaa]">
            <span className="font-semibold text-[#46d369]">★ {movie.rating}</span>
            <span>{movie.releaseDate}</span>
            <span>{formatRuntime(movie.runtime)}</span>
            {movie.genres.length > 0 && <span>{movie.genres.join(" · ")}</span>}
          </div>

          <div className="mt-6">
            <h2 className="mb-2 text-lg font-semibold text-white">줄거리</h2>
            <p className="leading-relaxed text-[#d2d2d2]">
              {movie.overview || "줄거리 정보가 없습니다."}
            </p>
          </div>
        </div>

        {videos.length > 1 && (
          <section className="mt-10">
            <h2 className="mb-4 text-lg font-semibold text-white">
              관련 영상
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((video) => {
                const isActive = selectedVideo?.id === video.id;

                return (
                  <button
                    key={video.id}
                    type="button"
                    onClick={() => setSelectedVideo(video)}
                    className={`rounded-lg border px-4 py-3 text-left transition ${
                      isActive
                        ? "border-[#e50914] bg-[#1a1a1a]"
                        : "border-[#333] bg-[#141414] hover:border-[#555]"
                    }`}
                  >
                    <p className="text-xs text-[#46d369]">{video.type}</p>
                    <p className="mt-1 line-clamp-2 text-sm font-medium text-white">
                      {video.name}
                    </p>
                    <p className="mt-1 text-xs text-[#777]">
                      {video.official ? "공식" : "비공식"} · YouTube
                    </p>
                  </button>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
