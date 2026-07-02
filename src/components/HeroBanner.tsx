import { Link } from "react-router-dom";
import { HiPlay, HiInformationCircle } from "react-icons/hi2";
import { HERO_BACKGROUND_URL } from "../constants/hero";
import type { NowPlayingMovie } from "../types/movie";

interface HeroBannerProps {
  movie: NowPlayingMovie;
}

export default function HeroBanner({ movie }: HeroBannerProps) {
  return (
    <section className="relative h-[55vh] min-h-[360px] w-full md:h-[75vh] md:min-h-[480px]">
      <img
        src={HERO_BACKGROUND_URL}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/30" />

      <div className="absolute bottom-[12%] left-4 max-w-xl md:left-10 md:max-w-2xl">
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-[#46d369] md:text-sm">
          현재 상영 중
        </p>
        <h1 className="text-3xl font-bold leading-tight drop-shadow-lg md:text-5xl lg:text-6xl">
          {movie.title}
        </h1>
        <p className="mt-3 line-clamp-3 text-sm text-[#d2d2d2] md:mt-4 md:text-base md:line-clamp-4">
          {movie.overview || "줄거리 정보가 없습니다."}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3 md:mt-6">
          <Link
            to={`/movie/${movie.id}/watch`}
            className="flex items-center gap-2 rounded bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-white/80 md:px-6 md:py-2.5 md:text-base"
          >
            <HiPlay className="h-5 w-5" />
            재생
          </Link>
          <Link
            to={`/movie/${movie.id}`}
            className="flex items-center gap-2 rounded bg-[#6d6d6e]/70 px-5 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-[#6d6d6e]/50 md:px-6 md:py-2.5 md:text-base"
          >
            <HiInformationCircle className="h-5 w-5" />
            상세 정보
          </Link>
        </div>
        <p className="mt-3 text-xs text-[#aaa] md:text-sm">
          ★ {movie.rating} · {movie.releaseDate}
        </p>
      </div>
    </section>
  );
}
