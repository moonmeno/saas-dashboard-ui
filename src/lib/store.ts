import { create } from "zustand";

export type Platform = "youtube" | "instagram";
export type ThemeMode = "dark" | "light";

// 전역 토스트 메시지 구조입니다. intent를 통해 상태 색상을 결정합니다.
export type ToastMessage = {
  id: string;
  title: string;
  description?: string;
  intent?: "success" | "warning" | "danger" | "info";
};

type SelectionsState = {
  contentViewMode: "grid" | "table";
  moderationFilter: string;
  searchQuery: string;
};

export type AppState = {
  activePlatform: Platform;
  themeMode: ThemeMode;
  selections: Record<Platform, SelectionsState>;
  lastVisitedRoute: Record<Platform, string>;
  toasts: ToastMessage[];
  setActivePlatform: (platform: Platform, options?: { route?: string }) => void;
  setThemeMode: (mode: ThemeMode) => void;
  updateSelection: (platform: Platform, payload: Partial<SelectionsState>) => void;
  pushToast: (toast: ToastMessage) => void;
  dismissToast: (id: string) => void;
  rememberRoute: (platform: Platform, route: string) => void;
};

const defaultSelection: SelectionsState = {
  contentViewMode: "grid",
  moderationFilter: "all",
  searchQuery: "",
};

// 브라우저 환경에서 마지막으로 사용한 플랫폼/테마를 기억합니다.
const persistedPlatform =
  (typeof window !== "undefined" &&
    (window.localStorage.getItem("ccc-platform") as Platform | null)) ||
  "youtube";

const persistedTheme =
  (typeof window !== "undefined" &&
    (window.localStorage.getItem("ccc-theme") as ThemeMode | null)) ||
  "dark";

export const useAppStore = create<AppState>((set) => ({
  activePlatform: persistedPlatform,
  themeMode: persistedTheme,
  selections: {
    youtube: { ...defaultSelection },
    instagram: { ...defaultSelection },
  },
  lastVisitedRoute: {
    youtube: "/youtube/dashboard",
    instagram: "/instagram/dashboard",
  },
  toasts: [],
  setActivePlatform: (platform, options) =>
    set((state) => {
      if (typeof window !== "undefined") {
        // 로컬스토어에 저장하여 새로고침 후에도 동일한 플랫폼을 유지합니다.
        window.localStorage.setItem("ccc-platform", platform);
      }
      const route = options?.route;
      const nextRoutes = route
        ? { ...state.lastVisitedRoute, [platform]: route }
        : state.lastVisitedRoute;
      return {
        activePlatform: platform,
        lastVisitedRoute: nextRoutes,
      };
    }),
  setThemeMode: (mode) =>
    set(() => {
      if (typeof window !== "undefined") {
        // 테마 모드 역시 로컬스토어에 기록하여 사용자 선택을 기억합니다.
        window.localStorage.setItem("ccc-theme", mode);
      }
      return { themeMode: mode };
    }),
  updateSelection: (platform, payload) =>
    set((state) => ({
      selections: {
        ...state.selections,
        [platform]: {
          ...state.selections[platform],
          ...payload,
        },
      },
    })),
  pushToast: (toast) =>
    set((state) => ({
      toasts: [...state.toasts.filter((t) => t.id !== toast.id), toast],
    })),
  dismissToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
  rememberRoute: (platform, route) =>
    set((state) => ({
      lastVisitedRoute: {
        ...state.lastVisitedRoute,
        [platform]: route,
      },
    })),
}));
