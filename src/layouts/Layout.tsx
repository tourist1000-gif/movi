import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import ScrollToTop from "../components/ScrollToTop";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#141414]">
      <ScrollToTop />
      <Header />
      <Outlet />
      <footer className="border-t border-[#222] px-4 py-6 text-center text-xs text-[#666] md:px-10">
        © 2026 MOVI · Powered by TMDB
      </footer>
    </div>
  );
}
