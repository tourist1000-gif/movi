import { Link } from "react-router-dom";
import type { NowPlayingMovie } from "../types/movie";

interface MovieCardProps {
  movie: NowPlayingMovie;
  className?: string;
}

export default function MovieCard({ movie, className }: MovieCardProps) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className={`movie-card group block shrink-0 ${className ?? "w-[120px] md:w-[160px] lg:w-[180px]"}`}
    >
      <div className="overflow-hidden rounded-md bg-[#2f2f2f] transition duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-black/60">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          loading="lazy"
          className="aspect-[2/3] w-full object-cover"
        />
      </div>
      <h3 className="mt-2 line-clamp-2 text-xs font-medium text-[#e5e5e5] transition group-hover:text-white md:text-sm">
        {movie.title}
      </h3>
    </Link>
  );
}
