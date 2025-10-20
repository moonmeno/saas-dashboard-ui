import posts from "../mocks/instagram/posts.json";
import comments from "../mocks/instagram/comments.json";
import { CommentThread, ContentItem } from "../types";

// 인스타그램 목업 데이터도 동일하게 타입 단언하여 활용합니다.
const postItems = posts as ContentItem[];
const commentThreads = comments as CommentThread[];

export const fetchInstagramDashboard = async () => {
  // 숨김/신고된 게시물 수를 KPI로 변환하여 UI에 전달합니다.
  const totalComments = postItems.reduce((acc, post) => acc + (post.commentCount ?? 0), 0);
  const hiddenOrReported = postItems.filter((post) => post.flaggedCount && post.flaggedCount > 0).length;

  return {
    kpis: {
      totalContent: postItems.length,
      totalComments,
      attentionRequired: hiddenOrReported,
    },
    recent: postItems.slice(0, 8),
  };
};

export const fetchInstagramPosts = async () => postItems;

export const fetchInstagramComments = async () => commentThreads;
