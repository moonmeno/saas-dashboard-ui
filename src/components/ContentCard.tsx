import { useMemo, useState } from "react";
import { ContentCardProps, ModerationStatus } from "../types";
import { formatCount, timeAgo } from "../lib/format";
import { cn } from "../lib/cn";
import Badge, { type BadgeVariant } from "./ui/badge";
import Button from "./ui/button";
import {
  ArrowUpRightIcon,
  FlagIcon,
  MessageCircleIcon,
  ShieldIcon,
  TrashIcon,
} from "./icons";

// 콘텐츠 카드 상단에서 모더레이션 상태에 따라 뱃지 색상을 바꾸기 위한 매핑입니다.
const moderationColor: Record<ModerationStatus, BadgeVariant> = {
  published: "success",
  held: "warning",
  likely_spam: "danger",
  rejected: "danger",
};

type Action = {
  label: string;
  action: string;
  platform: "youtube" | "instagram";
  disabled?: boolean;
  hidden?: boolean;
};

// 플랫폼별로 지원되는 퀵 액션을 한 군데에서 정의합니다.
// 같은 레이블이라도 플랫폼이 다르면 별도 항목으로 분리하여 필터링하기 쉽게 만듭니다.
const allActions: Action[] = [
  { label: "Open", action: "open", platform: "youtube" },
  { label: "Open", action: "open", platform: "instagram" },
  { label: "View Comments", action: "view-comments", platform: "youtube" },
  { label: "View Comments", action: "view-comments", platform: "instagram" },
  { label: "Hold", action: "hold", platform: "youtube" },
  { label: "Publish", action: "publish", platform: "youtube" },
  { label: "Mark Spam", action: "spam", platform: "youtube" },
  { label: "Delete", action: "delete", platform: "youtube" },
  { label: "Hide", action: "hide", platform: "instagram" },
  { label: "Delete", action: "delete", platform: "instagram" },
];

const ContentCard = ({
  id,
  platform,
  thumbnailUrl,
  title,
  ownerName,
  publishedAt,
  viewCount,
  likeCount,
  commentCount,
  flaggedCount,
  category,
  badges,
  moderation,
  onOpen,
  onQuickAction,
}: ContentCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // 현재 카드가 어떤 플랫폼인지에 따라 표시할 액션 리스트를 메모이제이션합니다.
  const platformActions = useMemo(
    () => allActions.filter((action) => action.platform === platform),
    [platform]
  );

  // 버튼 클릭 시 액션 타입에 따라 onOpen 또는 onQuickAction을 호출합니다.
  const handleAction = (action: string) => {
    if (action === "open" && onOpen) {
      onOpen(id);
      return;
    }
    onQuickAction?.(id, action);
  };

  return (
    <article
      className={cn(
        "card-surface group flex flex-col overflow-hidden transition hover:border-[var(--brand)]/40",
        platform === "instagram" ? "border-[var(--brand)]/30" : ""
      )}
      aria-label={`${title} by ${ownerName}`}
    >
      <div className="relative">
        <div className="aspect-video w-full overflow-hidden bg-[var(--surface)]">
          <img
            src={thumbnailUrl}
            alt=""
            className={cn(
              "h-full w-full object-cover transition",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded ? (
            <div className="absolute inset-0 animate-pulse bg-[var(--surface-2)]" />
          ) : null}
        </div>
        <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
          {/* 신고 건수가 있을 때만 경고 배지를 노출합니다. */}
          {typeof flaggedCount === "number" && flaggedCount > 0 ? (
            <Badge variant="danger" className="bg-[var(--danger)] text-black">
              <FlagIcon className="h-3 w-3" /> {flaggedCount} flagged
            </Badge>
          ) : null}
          {/* 모더레이션 상태는 moderationColor 매핑을 통해 색상을 지정합니다. */}
          {moderation ? (
            <Badge variant={moderationColor[moderation]}>
              <ShieldIcon className="h-3 w-3" /> {moderation.replace("_", " ")}
            </Badge>
          ) : null}
        </div>
        {/* 유튜브는 비디오 길이 표시 칩을 제공하여 플랫폼의 특징을 살립니다. */}
        {platform === "youtube" ? (
          <div className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
            16:34
          </div>
        ) : null}
        {/* 인스타그램은 그라데이션 포커스를 하단 라인으로 표현합니다. */}
        {platform === "instagram" ? (
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[var(--brand)] to-transparent opacity-80" />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <header className="space-y-2">
          <p
            className={cn(
              "line-clamp-2 text-lg font-semibold",
              platform === "instagram" ? "brand-text" : "text-[var(--text)]"
            )}
          >
            {title}
          </p>
          <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
            <span>{ownerName}</span>
            <span>•</span>
            <span>{timeAgo(publishedAt)}</span>
            {category ? (
              <span className="rounded-full border border-white/10 px-2 py-0.5 text-xs uppercase tracking-wide">
                {category}
              </span>
            ) : null}
          </div>
          {badges?.length ? (
            <div className="flex flex-wrap gap-2">
              {badges.map((badge) => (
                <Badge key={badge} variant="muted">
                  {badge}
                </Badge>
              ))}
            </div>
          ) : null}
        </header>
        <dl className="grid grid-cols-3 gap-3 text-sm">
          <div>
            <dt className="text-[var(--muted)]">Views</dt>
            <dd className="font-semibold text-[var(--text)]">{formatCount(viewCount)}</dd>
          </div>
          <div>
            <dt className="text-[var(--muted)]">Likes</dt>
            <dd className="font-semibold text-[var(--text)]">{formatCount(likeCount)}</dd>
          </div>
          <div>
            <dt className="text-[var(--muted)]">Comments</dt>
            <dd className="font-semibold text-[var(--text)]">{formatCount(commentCount)}</dd>
          </div>
        </dl>
      </div>
      <footer className="flex flex-wrap items-center gap-2 border-t border-white/5 bg-[var(--surface)] px-5 py-4">
        {platformActions.map((action) => {
          const isDisabled =
            platform === "instagram" &&
            ["hold", "publish", "spam"].includes(action.action);
          return (
            <Button
              key={`${action.action}-${platform}`}
              variant={action.action === "open" ? "primary" : "secondary"}
              className="min-h-[40px] flex-1"
              onClick={() => handleAction(action.action)}
              disabled={isDisabled}
              aria-label={
                isDisabled
                  ? `${action.label} (not available on ${platform})`
                  : action.label
              }
            >
              {/* 아이콘은 액션 종류에 따라 조건부로 렌더링합니다. */}
              {action.action === "open" ? (
                <ArrowUpRightIcon className="h-4 w-4" />
              ) : null}
              {action.action === "view-comments" ? (
                <MessageCircleIcon className="h-4 w-4" />
              ) : null}
              {action.action === "spam" ? <ShieldIcon className="h-4 w-4" /> : null}
              {action.action === "delete" ? <TrashIcon className="h-4 w-4" /> : null}
              <span>{action.label}</span>
            </Button>
          );
        })}
      </footer>
    </article>
  );
};

export default ContentCard;
