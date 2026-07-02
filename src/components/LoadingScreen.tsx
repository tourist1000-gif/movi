export default function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#141414]">
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#333] border-t-[#e50914]" />
        <p className="text-sm text-[#aaa]">영화 목록 불러오는 중...</p>
      </div>
    </div>
  );
}
