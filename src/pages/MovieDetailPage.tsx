import { Link, useParams } from "react-router-dom";
import { HiArrowLeft, HiPlay, HiPlus } from "react-icons/hi2";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";
import { useMovieDetail } from "../hooks/useMovieDetail";
import { formatRuntime } from "../lib/tmdb";

export default function MovieDetailPage() {
  const { id } = useParams();
  const movieId = id ? Number(id) : null;
  const { movie, loading, error } = useMovieDetail(movieId);

  if (loading) return <LoadingScreen />;
  if (error || !movie) return <ErrorScreen message={error ?? "영화를 찾을 수 없습니다."} />;

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[320px] w-full md:h-[65vh]">
        <img
          src={movie.backdropUrl}
          alt={movie.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />

        <Link
          to="/"
          className="absolute left-4 top-24 flex items-center gap-2 rounded bg-black/50 px-3 py-1.5 text-sm text-white backdrop-blur-sm transition hover:bg-black/70 md:left-10 md:top-28"
        >
          <HiArrowLeft className="h-4 w-4" />
          돌아가기
        </Link>
      </section>

      {/* Content */}
      <section className="relative -mt-32 px-4 pb-16 md:-mt-40 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:gap-10">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="mx-auto w-[160px] shrink-0 rounded-lg shadow-2xl md:mx-0 md:w-[220px] lg:w-[260px]"
          />

          <div className="flex-1">
            {movie.tagline && (
              <p className="mb-1 text-sm italic text-[#999]">{movie.tagline}</p>
            )}
            <h1 className="text-2xl font-bold text-white md:text-4xl lg:text-5xl">
              {movie.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[#aaa]">
              <span className="font-semibold text-[#46d369]">
                ★ {movie.rating}
              </span>
              <span>{movie.releaseDate}</span>
              <span>{formatRuntime(movie.runtime)}</span>
              {movie.genres.length > 0 && (
                <span>{movie.genres.map((g) => g.name).join(" · ")}</span>
              )}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to={`/movie/${movie.id}/watch`}
                className="flex items-center gap-2 rounded bg-white px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-white/80"
              >
                <HiPlay className="h-5 w-5" />
                재생
              </Link>
              <button
                type="button"
                className="flex items-center gap-2 rounded border border-[#555] bg-[#6d6d6e]/40 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#6d6d6e]/60"
              >
                <HiPlus className="h-5 w-5" />
                내 리스트
              </button>
            </div>

            <div className="mt-8">
              <h2 className="mb-2 text-lg font-semibold text-white">줄거리</h2>
              <p className="leading-relaxed text-[#d2d2d2]">
                {movie.overview || "줄거리 정보가 없습니다."}
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="mb-1 text-sm font-semibold text-[#777]">감독</h3>
                <p className="text-white">{movie.director}</p>
              </div>
              <div>
                <h3 className="mb-1 text-sm font-semibold text-[#777]">출연</h3>
                <p className="text-white">{movie.cast.join(", ")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
