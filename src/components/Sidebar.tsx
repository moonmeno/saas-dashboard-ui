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
          { label: "Dashboard", to: "/youtube/dashboard" },
          { label: "Videos", to: "/youtube/videos" },
          { label: "Comments", to: "/youtube/comments" },
          { label: "Reports", to: "/youtube/dashboard#reports" },
          { label: "Settings", to: "/youtube/dashboard#settings" },
        ]
      : [
          { label: "Dashboard", to: "/instagram/dashboard" },
          { label: "Posts", to: "/instagram/posts" },
          { label: "Comments", to: "/instagram/comments" },
          { label: "Insights", to: "/instagram/dashboard#insights" },
          { label: "Settings", to: "/instagram/dashboard#settings" },
        ]
  ).map((link) => ({ ...link, key: link.to }));

  // 사이드바 하단 CTA에서 플랫폼을 즉시 전환할 수 있도록 돕는 함수입니다.
  const handlePlatformJump = (platform: "youtube" | "instagram") => {
    setActivePlatform(platform);
    navigate(lastVisitedRoute[platform]);
  };

  return (
    <aside
      className="hidden w-72 flex-col border-r border-white/5 bg-[var(--surface-2)]/80 backdrop-blur lg:flex"
      aria-label="Primary"
    >
      <div className="flex items-center gap-3 px-6 py-6">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[var(--surface)]">
          {activePlatform === "youtube" ? (
            <YoutubeIcon className="h-7 w-7 text-[var(--brand)]" />
          ) : (
            <InstagramIcon className="h-7 w-7 text-[var(--brand)]" />
          )}
        </span>
        <div>
          <p className="text-sm uppercase tracking-widest text-[var(--muted)]">
            Command Center
          </p>
          <p className="text-xl font-semibold text-[var(--text)]">
            {activePlatform === "youtube" ? "YouTube" : "Instagram"}
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-4" aria-label="Main navigation">
        {links.map((link) => (
          <NavLink
            key={link.key}
            to={link.to}
            className={({ isActive }) =>
              `group flex h-12 items-center justify-between rounded-xl px-4 text-sm font-medium transition ${
                isActive
                  ? "bg-[var(--brand)]/15 text-[var(--brand-contrast)]"
                  : "text-[var(--muted)] hover:bg-white/5 hover:text-[var(--text)]"
              }`
            }
          >
            <span>{link.label}</span>
            <ArrowUpRightIcon className="h-4 w-4 opacity-50 group-hover:opacity-100" />
          </NavLink>
        ))}
      </nav>

      <div className="space-y-4 px-6 py-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-start gap-3">
            <TrendingUpIcon className="mt-1 h-5 w-5 text-[var(--brand)]" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-[var(--text)]">
                Need to switch platforms?
              </p>
              <p className="text-xs text-[var(--muted)]">
                Jump directly to the last view you opened.
              </p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <Button variant="secondary" className="w-full" onClick={() => handlePlatformJump("youtube")}>
              <div className="flex w-full items-center justify-between">
                <span className="flex items-center gap-2">
                  <YoutubeIcon className="h-5 w-5 text-[#FF0033]" />
                  YouTube
                </span>
                <MenuIcon className="h-4 w-4" />
              </div>
            </Button>
            <Button variant="secondary" className="w-full" onClick={() => handlePlatformJump("instagram")}>
              <div className="flex w-full items-center justify-between">
                <span className="flex items-center gap-2">
                  <InstagramIcon className="h-5 w-5 text-[#DD2A7B]" />
                  Instagram
                </span>
                <MenuIcon className="h-4 w-4" />
              </div>
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-white/10 p-4">
          <div>
            <p className="text-sm font-semibold text-[var(--text)]">Moderation</p>
            <p className="text-xs text-[var(--muted)]">Keep your community safe</p>
          </div>
          <MessageCircleIcon className="h-6 w-6 text-[var(--brand)]" />
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-white/10 p-4">
          <div>
            <p className="text-sm font-semibold text-[var(--text)]">Creators</p>
            <p className="text-xs text-[var(--muted)]">Manage collaborators</p>
          </div>
          <UsersIcon className="h-6 w-6 text-[var(--brand)]" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
