interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="w-full max-w-[470px] rounded-lg border border-[#ed4956]/30 bg-[#1a0a0a] px-6 py-8 text-center">
      <p className="text-[16px] font-semibold text-[#ed4956]">
        데이터를 불러올 수 없습니다
      </p>
      <p className="mt-2 text-[14px] text-[#a8a8a8]">{message}</p>
      <div className="mt-4 rounded-lg bg-[#121212] px-4 py-3 text-left text-[13px] text-[#737373]">
        <p className="mb-1 font-semibold text-[#a8a8a8]">설정 방법</p>
        <ol className="list-inside list-decimal space-y-1">
          <li>
            <a
              href="https://www.themoviedb.org/settings/api"
              target="_blank"
              rel="noreferrer"
              className="text-[#0095f6] hover:underline"
            >
              TMDB
            </a>
            에서 API 키 발급
          </li>
          <li>
            프로젝트 루트에 <code className="text-[#fafafa]">.env</code> 파일
            생성
          </li>
          <li>
            <code className="text-[#fafafa]">
              VITE_TMDB_API_KEY=your_api_key
            </code>{" "}
            추가
          </li>
          <li>개발 서버 재시작</li>
        </ol>
      </div>
    </div>
  );
}
