import {
  HiOutlineHome,
  HiOutlineMagnifyingGlass,
  HiOutlineFilm,
  HiOutlinePlay,
  HiOutlineChatBubbleLeftRight,
  HiOutlineHeart,
  HiOutlinePlus,
  HiOutlineBars3,
} from "react-icons/hi2";

const navItems = [
  { icon: HiOutlineHome, label: "홈", active: true },
  { icon: HiOutlineMagnifyingGlass, label: "검색" },
  { icon: HiOutlineFilm, label: "탐색" },
  { icon: HiOutlinePlay, label: "예고편" },
  { icon: HiOutlineChatBubbleLeftRight, label: "리뷰" },
  { icon: HiOutlineHeart, label: "알림" },
  { icon: HiOutlinePlus, label: "추가" },
];

export default function Sidebar() {
  return (
    <nav className="fixed left-0 top-0 z-50 flex h-screen w-[72px] flex-col items-center border-r border-[#262626] bg-black py-3 md:w-[244px] md:items-stretch md:px-3">
      <div className="mb-6 flex items-center justify-center px-3 py-4 md:justify-start">
        <span className="hidden text-2xl font-semibold tracking-tight md:block">
          MOVI
        </span>
        <span className="text-xl font-bold md:hidden">M</span>
      </div>

      <ul className="flex flex-1 flex-col gap-1">
        {navItems.map(({ icon: Icon, label, active }) => (
          <li key={label}>
            <button
              type="button"
              className={`flex w-full items-center gap-4 rounded-lg px-3 py-3 transition-colors hover:bg-[#121212] ${
                active ? "font-bold" : "font-normal text-[#fafafa]"
              }`}
            >
              <Icon className="h-6 w-6 shrink-0" strokeWidth={active ? 2.5 : 1.5} />
              <span className="hidden text-[16px] md:block">{label}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-col gap-1 pb-3">
        <button
          type="button"
          className="flex w-full items-center gap-4 rounded-lg px-3 py-3 transition-colors hover:bg-[#121212]"
        >
          <HiOutlineBars3 className="h-6 w-6 shrink-0" />
          <span className="hidden text-[16px] md:block">더 보기</span>
        </button>
        <button
          type="button"
          className="flex w-full items-center gap-4 rounded-lg px-3 py-3 transition-colors hover:bg-[#121212]"
        >
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop"
            alt="프로필"
            className="h-6 w-6 shrink-0 rounded-full object-cover"
          />
          <span className="hidden text-[16px] md:block">프로필</span>
        </button>
      </div>
    </nav>
  );
}
