import { useState } from "react";
import {
  HiHeart,
  HiOutlineHeart,
  HiOutlineChatBubbleOvalLeft,
  HiOutlinePaperAirplane,
  HiOutlineBookmark,
  HiBookmark,
  HiOutlineEllipsisHorizontal,
  HiSpeakerWave,
  HiSpeakerXMark,
} from "react-icons/hi2";
import { MdVerified } from "react-icons/md";
import type { Movie } from "../types/movie";

interface MoviePostProps {
  movie: Movie;
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

export default function MoviePost({ movie }: MoviePostProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [muted, setMuted] = useState(true);

  const likeCount = liked ? movie.likes + 1 : movie.likes;

  return (
    <article className="mb-4 overflow-hidden rounded-lg border border-[#262626] bg-black">
      {/* Header */}
      <header className="flex items-center justify-between px-3 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <img
            src={movie.studioLogo}
            alt={movie.studio}
            className="h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-[#363636]"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="truncate text-[14px] font-semibold">
                {movie.title}
              </span>
              {movie.verified && (
                <MdVerified className="h-4 w-4 shrink-0 text-[#0095f6]" />
              )}
            </div>
            <p className="truncate text-[12px] text-[#a8a8a8]">
              {movie.studio} · 개봉 {movie.releasedAgo} 전
            </p>
          </div>
        </div>
        <button type="button" aria-label="더보기" className="p-2">
          <HiOutlineEllipsisHorizontal className="h-5 w-5" />
        </button>
      </header>

      {/* Media */}
      <div className="relative aspect-square w-full bg-[#121212]">
        <img
          src={movie.poster}
          alt={movie.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/60 to-transparent px-4 py-3">
          <p className="text-center text-[13px] font-medium text-white/90">
            {movie.genre} · ★ {movie.rating} · {movie.duration}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setMuted(!muted)}
          aria-label={muted ? "음소거 해제" : "음소거"}
          className="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm"
        >
          {muted ? (
            <HiSpeakerXMark className="h-4 w-4" />
          ) : (
            <HiSpeakerWave className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Actions */}
      <div className="px-3 pt-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setLiked(!liked)}
              aria-label="좋아요"
              className="transition-transform active:scale-90"
            >
              {liked ? (
                <HiHeart className="h-6 w-6 text-[#ed4956]" />
              ) : (
                <HiOutlineHeart className="h-6 w-6" />
              )}
            </button>
            <button type="button" aria-label="댓글" className="flex items-center gap-1">
              <HiOutlineChatBubbleOvalLeft className="h-6 w-6" />
              <span className="text-[13px] text-[#a8a8a8]">
                {formatCount(movie.comments)}
              </span>
            </button>
            <button type="button" aria-label="공유" className="flex items-center gap-1">
              <HiOutlinePaperAirplane className="h-6 w-6 -rotate-12" />
              <span className="text-[13px] text-[#a8a8a8]">
                {formatCount(movie.shares)}
              </span>
            </button>
          </div>
          <button
            type="button"
            onClick={() => setSaved(!saved)}
            aria-label="저장"
          >
            {saved ? (
              <HiBookmark className="h-6 w-6" />
            ) : (
              <HiOutlineBookmark className="h-6 w-6" />
            )}
          </button>
        </div>

        <p className="mt-2 text-[14px] font-semibold">
          좋아요 {formatCount(likeCount)}개
        </p>

        <p className="mt-1 text-[13px] text-[#a8a8a8]">
          <span className="font-semibold text-white">{movie.likedBy}</span>
          님 외 여러 명이 좋아합니다
        </p>

        {/* Caption */}
        <div className="mt-1 text-[14px] leading-snug">
          <span className="font-semibold">{movie.title}</span>{" "}
          <span className={expanded ? "" : "caption-clamp"}>
            {movie.synopsis}
          </span>
          {!expanded && movie.synopsis.length > 80 && (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="ml-1 text-[#a8a8a8]"
            >
              ... 더 보기
            </button>
          )}
        </div>

        <p className="mt-1 text-[13px] text-[#a8a8a8]">
          감독 {movie.director} · 출연 {movie.cast.slice(0, 3).join(", ")}
          {movie.cast.length > 3 && " 외"}
        </p>

        {movie.comments > 0 && (
          <button
            type="button"
            className="mt-2 text-[14px] text-[#a8a8a8]"
          >
            댓글 {formatCount(movie.comments)}개 모두 보기
          </button>
        )}
      </div>

      {/* Comment input */}
      <div className="mt-3 flex items-center border-t border-[#262626] px-3 py-3">
        <input
          type="text"
          placeholder="리뷰를 남겨보세요..."
          className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-[#a8a8a8]"
        />
        <button
          type="button"
          className="text-[14px] font-semibold text-[#0095f6] opacity-50"
          disabled
        >
          게시
        </button>
      </div>
    </article>
  );
}
