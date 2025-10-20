import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Toast from "./Toast";
import { usePlatform } from "../lib/platform";
import { useAppStore } from "../lib/store";

const AppShell = () => {
  const { activePlatform } = usePlatform();
  const location = useLocation();
  const rememberRoute = useAppStore((state) => state.rememberRoute);

  useEffect(() => {
    // 라우트 이동 시 현재 플랫폼의 마지막 방문 경로를 지속적으로 갱신합니다.
    rememberRoute(activePlatform, `${location.pathname}${location.search}`);
  }, [activePlatform, location.pathname, location.search, rememberRoute]);

  return (
    <div className="flex min-h-screen bg-[var(--surface)] text-[var(--text)]">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <Outlet />
        </main>
      </div>
      <Toast />
    </div>
  );
};

export default AppShell;
