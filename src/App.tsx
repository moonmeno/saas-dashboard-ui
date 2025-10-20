import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AppShell from "./components/AppShell";
import YoutubeDashboard from "./routes/youtube/Dashboard";
import YoutubeVideos from "./routes/youtube/Videos";
import YoutubeComments from "./routes/youtube/Comments";
import InstagramDashboard from "./routes/instagram/Dashboard";
import InstagramPosts from "./routes/instagram/Posts";
import InstagramComments from "./routes/instagram/Comments";
import { usePlatform } from "./lib/platform";

const App = () => {
  const location = useLocation();
  const { activePlatform } = usePlatform();

  // 현재 활성화된 플랫폼을 기준으로 기본 대시보드 경로를 계산합니다.
  const fallbackRoute = `/${activePlatform ?? "youtube"}/dashboard`;

  return (
    <Routes location={location}>
      <Route path="/" element={<Navigate to={fallbackRoute} replace />} />
      <Route element={<AppShell />}>
        <Route path="/youtube/dashboard" element={<YoutubeDashboard />} />
        <Route path="/youtube/videos" element={<YoutubeVideos />} />
        <Route path="/youtube/comments" element={<YoutubeComments />} />
        <Route path="/instagram/dashboard" element={<InstagramDashboard />} />
        <Route path="/instagram/posts" element={<InstagramPosts />} />
        <Route path="/instagram/comments" element={<InstagramComments />} />
      </Route>
      <Route path="*" element={<Navigate to={fallbackRoute} replace />} />
    </Routes>
  );
};

export default App;
