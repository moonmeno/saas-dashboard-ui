import { useEffect, useMemo, useState } from "react";
import DrawerPanel from "../../components/DrawerPanel";
import Button from "../../components/ui/button";
import Badge from "../../components/ui/badge";
import { fetchInstagramComments } from "../../services/instagram";
import { CommentThread } from "../../types";
import {
  MessageCircleIcon,
  ShieldIcon,
  TrashIcon,
  SparklesIcon,
} from "../../components/icons";
import { timeAgo } from "../../lib/format";

const filters = [
  { label: "전체", value: "all" },
  { label: "숨김됨", value: "held" },
  { label: "신고됨", value: "likely_spam" },
  { label: "삭제됨", value: "rejected" },
] as const;

type FilterValue = (typeof filters)[number]["value"];

type FilterMode = "agent" | "manual";

const getRiskLabel = (score?: number) => {
  if (score === undefined) return "분석 없음";
  if (score >= 0.75) return "위험도 높음";
  if (score >= 0.4) return "주의";
  return "안정";
};

const InstagramComments = () => {
  const [threads, setThreads] = useState<CommentThread[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const [filterMode, setFilterMode] = useState<FilterMode>("agent");
  const [selectedThread, setSelectedThread] = useState<CommentThread | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchInstagramComments();
      setThreads(data);
      setLoading(false);
    };
    load();
  }, []);

  useEffect(() => {
    const handler = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 1024);
      }
    };
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const filteredThreads = useMemo(() => {
    if (filterMode === "agent") {
      return [...threads].sort(
        (a, b) => (b.aiRiskScore ?? 0) - (a.aiRiskScore ?? 0)
      );
    }
    if (activeFilter === "all") return threads;
    return threads.filter((thread) => thread.status === activeFilter);
  }, [threads, filterMode, activeFilter]);

  const handleSelect = (thread: CommentThread) => setSelectedThread(thread);
  const handleClose = () => setSelectedThread(null);

  const actionButtons = (
    <>
      <Button variant="primary" className="min-h-[44px]">
        <MessageCircleIcon className="mr-2 h-4 w-4" /> 답글
      </Button>
      <Button variant="secondary" className="min-h-[44px]">
        <ShieldIcon className="mr-2 h-4 w-4" /> 숨기기
      </Button>
      <Button variant="secondary" className="min-h-[44px]">
        <TrashIcon className="mr-2 h-4 w-4" /> 삭제
      </Button>
    </>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
      <aside className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[var(--text)]">댓글 인박스</h2>
          <Badge variant="muted">인스타그램</Badge>
        </div>
        <div className="rounded-2xl border border-[var(--outline)] bg-[var(--surface-2)] p-4 shadow-sm">
          <p className="text-sm font-semibold text-[var(--text)]">필터 모드</p>
          <p className="mt-1 text-xs text-[var(--muted)]">
            AI 에이전트 모드는 신고·스팸 가능성이 높은 항목을 우선 정렬합니다. 수동 필터에서는 상태별로 직접 선택할 수 있습니다.
          </p>
          <div className="mt-3 flex gap-2">
            <Button
              variant={filterMode === "agent" ? "primary" : "secondary"}
              className="flex-1 min-h-[40px]"
              onClick={() => setFilterMode("agent")}
            >
              <SparklesIcon className="h-4 w-4" /> AI 에이전트
            </Button>
            <Button
              variant={filterMode === "manual" ? "primary" : "secondary"}
              className="flex-1 min-h-[40px]"
              onClick={() => setFilterMode("manual")}
            >
              수동 필터
            </Button>
          </div>
        </div>
        {filterMode === "manual" ? (
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Button
                key={filter.value}
                variant={activeFilter === filter.value ? "primary" : "secondary"}
                className="min-h-[40px] flex-1"
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-[var(--outline)] bg-[var(--surface)] p-4 text-sm text-[var(--muted)]">
            신고 횟수와 AI 위험도 점수를 기준으로 정렬되었습니다.
          </div>
        )}
        <div className="space-y-3">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-24 rounded-2xl border border-[var(--outline)] bg-[var(--surface-2)]/60 animate-pulse"
                />
              ))
            : filteredThreads.map((thread) => (
                <button
                  key={thread.id}
                  onClick={() => handleSelect(thread)}
                  className={`w-full rounded-2xl border border-[var(--outline)] bg-[var(--surface-2)] px-4 py-3 text-left shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] ${
                    selectedThread?.id === thread.id
                      ? "border-[var(--brand)]"
                      : "hover:border-[var(--outline-strong)]"
                  }`}
                  aria-label={`${thread.author}님의 댓글 열기`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-[var(--text)]">{thread.author}</p>
                    <Badge variant="muted">{getRiskLabel(thread.aiRiskScore)}</Badge>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs text-[var(--muted)]">{thread.excerpt}</p>
                  {thread.aiLabels?.length ? (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {thread.aiLabels.map((label) => (
                        <Badge key={label} variant="muted" className="text-[10px]">
                          {label}
                        </Badge>
                      ))}
                    </div>
                  ) : null}
                  <p className="mt-2 text-xs text-[var(--muted)]">{timeAgo(thread.publishedAt)}</p>
                </button>
              ))}
        </div>
      </aside>
      <section className="card-surface hidden h-full flex-col lg:flex">
        <div className="flex items-center justify-between border-b border-[var(--outline)] px-6 py-4">
          <div>
            <h3 className="text-lg font-semibold text-[var(--text)] brand-text">스레드 상세</h3>
            <p className="text-sm text-[var(--muted)]">
              {selectedThread
                ? `${selectedThread.author} 님과의 대화`
                : "검토할 스레드를 선택하세요"}
            </p>
          </div>
          <Badge variant="muted">안전 센터</Badge>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
          {selectedThread ? (
            <div className="space-y-4">
              <div className="rounded-2xl border border-[var(--outline)] bg-[var(--surface-2)] p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-[var(--text)]">{selectedThread.author}</p>
                  <Badge variant="muted">{getRiskLabel(selectedThread.aiRiskScore)}</Badge>
                </div>
                <p className="mt-2 text-sm text-[var(--text)]">{selectedThread.excerpt}</p>
                <p className="mt-2 text-xs text-[var(--muted)]">{timeAgo(selectedThread.publishedAt)}</p>
              </div>
              {selectedThread.aiSummary ? (
                <div className="rounded-2xl border border-[var(--outline)] bg-[var(--surface)] p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text)]">
                    <SparklesIcon className="h-4 w-4 text-[var(--brand)]" /> OpenAI 분석
                  </div>
                  <p className="mt-2 text-sm text-[var(--text)]">{selectedThread.aiSummary}</p>
                </div>
              ) : null}
              {selectedThread.replies.map((reply) => (
                <div
                  key={reply.id}
                  className="rounded-2xl border border-[var(--outline)] bg-[var(--surface-2)] p-4 shadow-sm"
                >
                  <p className="text-sm font-semibold text-[var(--text)]">{reply.author}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{reply.message}</p>
                  <p className="mt-2 text-xs text-[var(--muted)]">{timeAgo(reply.publishedAt)}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-full flex-1 items-center justify-center text-sm text-[var(--muted)]">
              좌측에서 댓글 스레드를 선택하면 상세 내용을 확인할 수 있습니다.
            </div>
          )}
        </div>
        {selectedThread ? (
          <div className="flex flex-wrap items-center gap-2 border-t border-[var(--outline)] bg-[var(--surface-2)] px-6 py-4">
            {actionButtons}
          </div>
        ) : null}
      </section>
      <DrawerPanel
        open={isMobile && Boolean(selectedThread)}
        title={selectedThread ? selectedThread.author : "댓글"}
        description={selectedThread ? timeAgo(selectedThread.publishedAt) : undefined}
        onClose={handleClose}
        actions={selectedThread ? <div className="flex flex-wrap gap-2">{actionButtons}</div> : undefined}
      >
        {selectedThread ? (
          <div className="space-y-4">
            <div className="rounded-2xl border border-[var(--outline)] bg-[var(--surface-2)] p-4 shadow-sm">
              <p className="text-sm text-[var(--text)]">{selectedThread.excerpt}</p>
              <p className="mt-2 text-xs text-[var(--muted)]">{timeAgo(selectedThread.publishedAt)}</p>
            </div>
            {selectedThread.aiSummary ? (
              <div className="rounded-2xl border border-[var(--outline)] bg-[var(--surface)] p-4 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text)]">
                  <SparklesIcon className="h-4 w-4 text-[var(--brand)]" /> OpenAI 분석
                </div>
                <p className="mt-2 text-sm text-[var(--text)]">{selectedThread.aiSummary}</p>
              </div>
            ) : null}
            {selectedThread.replies.map((reply) => (
              <div
                key={reply.id}
                className="rounded-xl border border-[var(--outline)] bg-[var(--surface-2)] p-4 shadow-sm"
              >
                <p className="text-sm font-semibold text-[var(--text)]">{reply.author}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{reply.message}</p>
                <p className="mt-2 text-xs text-[var(--muted)]">{timeAgo(reply.publishedAt)}</p>
              </div>
            ))}
          </div>
        ) : null}
      </DrawerPanel>
    </div>
  );
};

export default InstagramComments;
