import videos from "../mocks/youtube/videos.json";
import comments from "../mocks/youtube/comments.json";
import { CommentThread, ContentItem } from "../types";

// JSON 목업 데이터를 타입 단언하여 사용합니다.
const videoItems = videos as ContentItem[];
const commentThreads = comments as CommentThread[];

export const fetchYoutubeDashboard = async () => {
  // 대시보드 통계는 간단한 합산/필터 로직으로 계산합니다.
  const totalComments = videoItems.reduce((acc, video) => acc + (video.commentCount ?? 0), 0);
  const heldOrSpam = videoItems.filter((video) => video.moderation && video.moderation !== "published").length;

  return {
    kpis: {
      totalContent: videoItems.length,
      totalComments,
      attentionRequired: heldOrSpam,
    },
    recent: videoItems.slice(0, 8),
  };
};

export const fetchYoutubeVideos = async () => videoItems;

export const fetchYoutubeComments = async () => commentThreads;
