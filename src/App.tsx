import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import WatchPage from "./pages/WatchPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/movie/:id/watch" element={<WatchPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
