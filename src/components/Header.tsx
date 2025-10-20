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
      return "대시보드";
    }
    if (location.pathname.includes("videos") || location.pathname.includes("posts")) {
      return "콘텐츠 라이브러리";
    }
    if (location.pathname.includes("comments")) {
      return "댓글 인박스";
    }
    return "콘텐츠 허브";
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--outline)] bg-[var(--surface-2)]/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-4 px-6 py-4 lg:px-12">
        <div className="flex flex-1 items-center gap-3">
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--outline)] text-[var(--text)] hover:bg-[var(--surface-3)] lg:hidden"
            aria-label="사이드바 열기"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
              {activePlatform === "youtube" ? "YouTube 데이터" : "Instagram 데이터"}
            </p>
            <h1 className="text-xl font-semibold text-[var(--text)] md:text-2xl">{title}</h1>
          </div>
        </div>

        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
            <Input
              aria-label="콘텐츠 검색"
              placeholder="동영상, 게시물, 댓글을 검색하세요"
              className="pl-11"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <Button variant="secondary" className="min-h-[44px] px-4" aria-label="필터 열기">
            <FilterIcon className="h-4 w-4" />
            필터
          </Button>
        </div>

        <div className="flex flex-1 items-center justify-end gap-4">
          <AccountSwitcher />
          <div className="flex items-center gap-3 rounded-full border border-[var(--outline)] bg-[var(--surface-2)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--muted)]">화면 모드</span>
            <Switch
              pressed={themeMode === "light"}
              onClick={toggleTheme}
              aria-label="라이트/다크 전환"
            >
              테마 토글
            </Switch>
            <span className="text-xs text-[var(--muted)]">
              {themeMode === "light" ? "라이트" : "다크"}
            </span>
          </div>
          <Button
            variant="ghost"
            className="relative h-11 w-11 rounded-full border border-[var(--outline)]"
            aria-label="알림 확인"
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
