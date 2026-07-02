interface ErrorScreenProps {
  message: string;
}

export default function ErrorScreen({ message }: ErrorScreenProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#141414] px-4">
      <div className="max-w-md rounded-lg border border-[#333] bg-[#1a1a1a] p-8 text-center">
        <p className="text-lg font-semibold text-[#e50914]">
          영화를 불러올 수 없습니다
        </p>
        <p className="mt-2 text-sm text-[#aaa]">{message}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-6 rounded bg-[#e50914] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#f40612]"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
}
