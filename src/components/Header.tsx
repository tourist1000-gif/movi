import { Link, useLocation, useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineBell,
  HiXMark,
} from "react-icons/hi2";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchOpen, setSearchOpen] = useState(location.pathname === "/search");
  const [query, setQuery] = useState(
    new URLSearchParams(location.search).get("q") ?? "",
  );

  useEffect(() => {
    if (location.pathname === "/search") {
      setSearchOpen(true);
      const q = new URLSearchParams(location.search).get("q") ?? "";
      setQuery(q);
      inputRef.current?.focus();
    }
  }, [location.pathname, location.search]);

  function openSearch() {
    setSearchOpen(true);
    navigate("/search");
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  function closeSearch() {
    setSearchOpen(false);
    setQuery("");
    if (location.pathname === "/search") {
      navigate("/");
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        searchOpen ? "bg-black" : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-4 md:px-10 md:py-5">
        <div className="flex min-w-0 flex-1 items-center gap-6 md:gap-10">
          <Link
            to="/"
            className="shrink-0 text-xl font-bold tracking-tight text-[#e50914] md:text-2xl"
          >
            MOVI
          </Link>

          {!searchOpen && (
            <nav className="hidden items-center gap-5 text-sm text-[#e5e5e5] md:flex">
              <Link to="/" className="font-semibold text-white">
                홈
              </Link>
              <Link to="/" className="transition hover:text-white/70">
                현재 상영
              </Link>
              <Link
                to="/search"
                className="transition hover:text-white/70"
              >
                검색
              </Link>
            </nav>
          )}

          {searchOpen && (
            <form onSubmit={handleSubmit} className="flex min-w-0 flex-1 items-center gap-3">
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (e.target.value.trim()) {
                    navigate(`/search?q=${encodeURIComponent(e.target.value.trim())}`, {
                      replace: true,
                    });
                  } else {
                    navigate("/search", { replace: true });
                  }
                }}
                placeholder="영화 제목을 검색하세요"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#777] md:text-base"
              />
            </form>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-4 text-white md:gap-5">
          {searchOpen ? (
            <button type="button" onClick={closeSearch} aria-label="검색 닫기">
              <HiXMark className="h-6 w-6" />
            </button>
          ) : (
            <button type="button" onClick={openSearch} aria-label="검색">
              <HiOutlineMagnifyingGlass className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          )}
          <button type="button" aria-label="알림" className="hidden md:block">
            <HiOutlineBell className="h-6 w-6" />
          </button>
          <div className="hidden h-8 w-8 rounded bg-[#e50914] md:block" />
        </div>
      </div>
    </header>
  );
}
