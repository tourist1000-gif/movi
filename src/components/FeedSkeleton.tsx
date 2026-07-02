export default function FeedSkeleton() {
  return (
    <div className="w-full max-w-[470px] space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-lg border border-[#262626] bg-black"
        >
          <div className="flex items-center gap-3 px-3 py-3">
            <div className="h-8 w-8 rounded-full bg-[#262626]" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-32 rounded bg-[#262626]" />
              <div className="h-2 w-24 rounded bg-[#1a1a1a]" />
            </div>
          </div>
          <div className="aspect-square w-full bg-[#121212]" />
          <div className="space-y-2 px-3 py-3">
            <div className="h-3 w-20 rounded bg-[#262626]" />
            <div className="h-3 w-full rounded bg-[#1a1a1a]" />
            <div className="h-3 w-4/5 rounded bg-[#1a1a1a]" />
          </div>
        </div>
      ))}
    </div>
  );
}
