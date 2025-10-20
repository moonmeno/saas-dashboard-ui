import { NavLink, useNavigate } from "react-router-dom";
import { usePlatform } from "../lib/platform";
import { useAppStore } from "../lib/store";
import {
  ArrowUpRightIcon,
  MenuIcon,
  MessageCircleIcon,
  TrendingUpIcon,
  UsersIcon,
  YoutubeIcon,
  InstagramIcon,
} from "./icons";
import Button from "./ui/button";

const Sidebar = () => {
  const { activePlatform, setActivePlatform } = usePlatform();
  const lastVisitedRoute = useAppStore((state) => state.lastVisitedRoute);
  const navigate = useNavigate();

  // 플랫폼마다 네비게이션 구성이 달라지므로 조건부로 링크 목록을 만듭니다.
  const links = (
    activePlatform === "youtube"
      ? [
          { label: "대시보드", to: "/youtube/dashboard" },
          { label: "동영상", to: "/youtube/videos" },
          { label: "댓글함", to: "/youtube/comments" },
          { label: "리포트", to: "/youtube/dashboard#reports" },
          { label: "설정", to: "/youtube/dashboard#settings" },
        ]
      : [
          { label: "대시보드", to: "/instagram/dashboard" },
          { label: "피드", to: "/instagram/posts" },
          { label: "댓글함", to: "/instagram/comments" },
          { label: "인사이트", to: "/instagram/dashboard#insights" },
          { label: "설정", to: "/instagram/dashboard#settings" },
        ]
  ).map((link) => ({ ...link, key: link.to }));

  // 사이드바 하단 CTA에서 플랫폼을 즉시 전환할 수 있도록 돕는 함수입니다.
  const handlePlatformJump = (platform: "youtube" | "instagram") => {
    setActivePlatform(platform);
    navigate(lastVisitedRoute[platform]);
  };

  return (
    <aside
      className="hidden w-80 flex-col border-r border-[var(--outline)] bg-[var(--surface-2)]/95 backdrop-blur lg:flex"
      aria-label="주요 내비게이션"
    >
      <div className="flex items-center gap-3 px-6 py-6">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--outline)] bg-[var(--surface)] shadow-sm">
          {activePlatform === "youtube" ? (
            <YoutubeIcon className="h-7 w-7 text-[var(--brand)]" />
          ) : (
            <InstagramIcon className="h-7 w-7 text-[var(--brand)]" />
          )}
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
            콘텐츠 허브
          </p>
          <p className="text-xl font-semibold text-[var(--text)]">
            {activePlatform === "youtube" ? "YouTube 댓글 관리" : "Instagram 댓글 관리"}
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-4" aria-label="내비게이션">
        {links.map((link) => (
          <NavLink
            key={link.key}
            to={link.to}
            className={({ isActive }) =>
              `group flex h-12 items-center justify-between rounded-xl px-4 text-sm font-medium transition ${
                isActive
                  ? "bg-[var(--brand)]/10 text-[var(--text)]"
                  : "text-[var(--muted)] hover:bg-[var(--surface-3)] hover:text-[var(--text)]"
              }`
            }
          >
            <span>{link.label}</span>
            <ArrowUpRightIcon className="h-4 w-4 opacity-50 group-hover:opacity-100" />
          </NavLink>
        ))}
      </nav>

      <div className="space-y-4 px-6 py-6">
        <div className="rounded-2xl border border-[var(--outline)] bg-[var(--surface-3)] p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <TrendingUpIcon className="mt-1 h-5 w-5 text-[var(--brand)]" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-[var(--text)]">
                다른 플랫폼으로 이동할까요?
              </p>
              <p className="text-xs text-[var(--muted)]">
                마지막으로 보던 화면으로 바로 이동합니다.
              </p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <Button variant="secondary" className="w-full" onClick={() => handlePlatformJump("youtube")}>
              <div className="flex w-full items-center justify-between">
                <span className="flex items-center gap-2">
                  <YoutubeIcon className="h-5 w-5 text-[#FF0033]" />
                  유튜브
                </span>
                <MenuIcon className="h-4 w-4" />
              </div>
            </Button>
            <Button variant="secondary" className="w-full" onClick={() => handlePlatformJump("instagram")}>
              <div className="flex w-full items-center justify-between">
                <span className="flex items-center gap-2">
                  <InstagramIcon className="h-5 w-5 text-[#DD2A7B]" />
                  인스타그램
                </span>
                <MenuIcon className="h-4 w-4" />
              </div>
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-[var(--outline)] bg-[var(--surface-2)] p-4 shadow-sm">
          <div>
            <p className="text-sm font-semibold text-[var(--text)]">검토 센터</p>
            <p className="text-xs text-[var(--muted)]">커뮤니티를 안전하게 보호하세요</p>
          </div>
          <MessageCircleIcon className="h-6 w-6 text-[var(--brand)]" />
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-[var(--outline)] bg-[var(--surface-2)] p-4 shadow-sm">
          <div>
            <p className="text-sm font-semibold text-[var(--text)]">운영자 관리</p>
            <p className="text-xs text-[var(--muted)]">함께 일하는 팀원을 정리하세요</p>
          </div>
          <UsersIcon className="h-6 w-6 text-[var(--brand)]" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
