import { Platform } from "./lib/store";

export type ModerationStatus = "published" | "held" | "likely_spam" | "rejected";

// 콘텐츠 카드가 공통적으로 사용하는 데이터 모델입니다.
export type ContentCardProps = {
  id: string;
  platform: Platform;
  thumbnailUrl: string;
  title: string;
  ownerName: string;
  publishedAt: string;
  viewCount?: number;
  likeCount?: number;
  commentCount?: number;
  flaggedCount?: number;
  category?: string;
  badges?: string[];
  moderation?: ModerationStatus;
  onOpen?: (id: string) => void;
  onQuickAction?: (id: string, action: string) => void;
};

export type ContentItem = ContentCardProps & {
  description?: string;
};

// 댓글 스레드 상세 화면을 위해 정의한 목업 데이터 타입입니다.
export type CommentThread = {
  id: string;
  platform: Platform;
  author: string;
  excerpt: string;
  publishedAt: string;
  status: ModerationStatus;
  replies: Array<{ id: string; author: string; message: string; publishedAt: string }>;
  aiSummary?: string;
  aiLabels?: string[];
  aiRiskScore?: number;
};
