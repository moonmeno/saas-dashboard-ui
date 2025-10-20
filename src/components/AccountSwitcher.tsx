import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { usePlatform } from "../lib/platform";
import { useAppStore } from "../lib/store";
import { InstagramIcon, YoutubeIcon } from "./icons";

const AccountSwitcher = () => {
  const { activePlatform, setActivePlatform } = usePlatform();
  const navigate = useNavigate();
  const lastVisitedRoute = useAppStore((state) => state.lastVisitedRoute);

  // 렌더링 시마다 동일한 옵션 배열이 만들어지지 않도록 useMemo로 캐싱합니다.
  const options = useMemo(
    () => [
      {
        value: "youtube" as const,
        label: "YouTube Channels",
        description: "Google API connection",
        icon: <YoutubeIcon className="h-4 w-4 text-[#FF0033]" aria-hidden />,
      },
      {
        value: "instagram" as const,
        label: "Instagram Accounts",
        description: "Graph API",
        icon: <InstagramIcon className="h-4 w-4 text-[#DD2A7B]" aria-hidden />,
      },
    ],
    []
  );

  // 플랫폼을 변경하면 Zustand 상태와 라우터 둘 다를 즉시 업데이트합니다.
  const handleChange = (value: "youtube" | "instagram") => {
    setActivePlatform(value);
    navigate(lastVisitedRoute[value]);
  };

  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[var(--surface-2)] px-4 py-3">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => handleChange(option.value)}
          className={`flex min-h-[44px] min-w-[140px] flex-col items-start rounded-lg px-3 py-2 text-left transition ${
            activePlatform === option.value
              ? "bg-[var(--brand)]/20 text-[var(--text)]"
              : "hover:bg-white/5 text-[var(--muted)]"
          }`}
          aria-pressed={activePlatform === option.value}
        >
          <span className="flex items-center gap-2 text-sm font-semibold text-[var(--text)]">
            {option.icon}
            {option.label}
          </span>
          <span className="text-xs text-[var(--muted)]">{option.description}</span>
        </button>
      ))}
    </div>
  );
};

export default AccountSwitcher;
