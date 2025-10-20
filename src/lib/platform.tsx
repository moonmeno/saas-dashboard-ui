import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useLocation } from "react-router-dom";
import { Platform, useAppStore } from "./store";

export type PlatformContextValue = {
  activePlatform: Platform;
  setActivePlatform: (platform: Platform) => void;
};

const PlatformContext = createContext<PlatformContextValue | undefined>(
  undefined
);

// 라우트 경로를 분석하여 어떤 플랫폼인지 판별하는 유틸 함수입니다.
// URL 앞부분만 확인하면 되기 때문에 startsWith를 사용하여 가볍게 처리합니다.
const detectPlatformFromPath = (pathname: string): Platform | null => {
  if (pathname.startsWith("/instagram")) {
    return "instagram";
  }
  if (pathname.startsWith("/youtube")) {
    return "youtube";
  }
  return null;
};

export const PlatformProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const activePlatform = useAppStore((state) => state.activePlatform);
  const setPlatform = useAppStore((state) => state.setActivePlatform);
  const rememberRoute = useAppStore((state) => state.rememberRoute);

  useEffect(() => {
    // 라우트가 변경될 때마다 URL 기반으로 플랫폼을 다시 계산합니다.
    // URL과 저장된 상태가 다르면 Zustand 스토어를 최신 상태로 맞춰줍니다.
    const derivedPlatform = detectPlatformFromPath(location.pathname);
    if (derivedPlatform && derivedPlatform !== activePlatform) {
      setPlatform(derivedPlatform);
    }
    if (derivedPlatform) {
      // 플랫폼별 마지막 방문 경로를 저장하여 새로고침 시 복구할 수 있도록 합니다.
      rememberRoute(derivedPlatform, `${location.pathname}${location.search}`);
    }
  }, [location.pathname, location.search, activePlatform, setPlatform, rememberRoute]);

  useEffect(() => {
    // HTML 루트 엘리먼트에 data-platform 속성을 부여하여 CSS 토큰을 교체합니다.
    document.documentElement.setAttribute("data-platform", activePlatform);
  }, [activePlatform]);

  const value = useMemo(
    () => ({
      activePlatform,
      setActivePlatform: (platform: Platform) => setPlatform(platform),
    }),
    [activePlatform, setPlatform]
  );

  return (
    <PlatformContext.Provider value={value}>{children}</PlatformContext.Provider>
  );
};

export const usePlatform = () => {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error("usePlatform must be used within PlatformProvider");
  }
  return context;
};
