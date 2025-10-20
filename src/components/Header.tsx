import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { usePlatform } from "../lib/platform";
import { useTheme } from "../lib/theme";
import AccountSwitcher from "./AccountSwitcher";
import Button from "./ui/button";
import Input from "./ui/input";
import Switch from "./ui/switch";
import { BellIcon, FilterIcon, MenuIcon, SearchIcon } from "./icons";

const Header = () => {
  const { activePlatform } = usePlatform();
  const { themeMode, toggleTheme } = useTheme();
  const location = useLocation();
  const [search, setSearch] = useState("");

  // 현재 URL을 기반으로 헤더 타이틀을 결정합니다.
  const title = useMemo(() => {
    if (location.pathname.includes("dashboard")) {
      return "Dashboard";
    }
    if (location.pathname.includes("videos") || location.pathname.includes("posts")) {
      return "Content Library";
    }
    if (location.pathname.includes("comments")) {
      return "Comments Inbox";
    }
    return "Command Center";
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[var(--surface)]/80 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 lg:px-10">
        <div className="flex flex-1 items-center gap-3">
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-[var(--text)] hover:bg-white/5 lg:hidden"
            aria-label="Toggle navigation"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              {activePlatform === "youtube" ? "YouTube" : "Instagram"}
            </p>
            <h1 className="text-xl font-semibold text-[var(--text)] md:text-2xl">{title}</h1>
          </div>
        </div>

        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
            <Input
              aria-label="Search content"
              placeholder="Search videos, posts, or comments"
              className="pl-11"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <Button variant="secondary" className="min-h-[44px] px-4" aria-label="Filters">
            <FilterIcon className="h-4 w-4" />
            Filters
          </Button>
        </div>

        <div className="flex flex-1 items-center justify-end gap-4">
          <AccountSwitcher />
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[var(--surface-2)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--muted)]">Interface</span>
            <Switch
              pressed={themeMode === "light"}
              onClick={toggleTheme}
              aria-label="Toggle light and dark surfaces"
            >
              Toggle theme
            </Switch>
            <span className="text-xs text-[var(--muted)]">
              {themeMode === "light" ? "Light" : "Dark"}
            </span>
          </div>
          <Button
            variant="ghost"
            className="relative h-11 w-11 rounded-full border border-white/10"
            aria-label="Notifications"
          >
            <BellIcon className="h-5 w-5" />
            <span className="absolute right-2 top-2 inline-flex h-2.5 w-2.5 rounded-full bg-[var(--brand)]" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
