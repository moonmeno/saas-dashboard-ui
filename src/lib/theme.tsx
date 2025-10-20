import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { ThemeMode, useAppStore } from "./store";

export type ThemeContextValue = {
  themeMode: ThemeMode;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// 플랫폼과 별개로 라이트/다크 모드를 제어하는 컨텍스트입니다.
// 표면(surface)과 텍스트 계열 토큰만 스위칭하고 브랜드 색상은 플랫폼 상태를 따릅니다.
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const themeMode = useAppStore((state) => state.themeMode);
  const setThemeMode = useAppStore((state) => state.setThemeMode);

  useEffect(() => {
    // data-theme 속성을 통해 Tailwind와 CSS 변수에서 현재 모드를 읽을 수 있도록 합니다.
    document.documentElement.setAttribute("data-theme", themeMode);
  }, [themeMode]);

  const toggleTheme = useCallback(() => {
    // 토글 시 단순한 스위치 로직으로 라이트/다크 모드를 교대합니다.
    setThemeMode(themeMode === "dark" ? "light" : "dark");
  }, [setThemeMode, themeMode]);

  const value = useMemo(
    () => ({
      themeMode,
      toggleTheme,
      setThemeMode,
    }),
    [themeMode, toggleTheme, setThemeMode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
