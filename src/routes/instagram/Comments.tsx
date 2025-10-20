import { useEffect, useMemo, useState } from "react";
import DrawerPanel from "../../components/DrawerPanel";
import Button from "../../components/ui/button";
import Badge from "../../components/ui/badge";
import { fetchInstagramComments } from "../../services/instagram";
import { CommentThread } from "../../types";
import { MessageCircleIcon, ShieldIcon, TrashIcon } from "../../components/icons";
import { timeAgo } from "../../lib/format";

const filters = [
  { label: "All", value: "all" },
  { label: "Hidden", value: "held" },
  { label: "Reported", value: "likely_spam" },
  { label: "Removed", value: "rejected" },
];

const InstagramComments = () => {
  const [threads, setThreads] = useState<CommentThread[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
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

  const filtered = useMemo(() => {
    if (activeFilter === "all") return threads;
    return threads.filter((thread) => thread.status === activeFilter);
  }, [threads, activeFilter]);

  const actionButtons = (
    <>
      <Button variant="primary" className="min-h-[44px]">
        <MessageCircleIcon className="mr-2 h-4 w-4" /> Reply
      </Button>
      <Button variant="secondary" className="min-h-[44px]">
        <ShieldIcon className="mr-2 h-4 w-4" /> Hide
      </Button>
      <Button variant="secondary" className="min-h-[44px]">
        <TrashIcon className="mr-2 h-4 w-4" /> Delete
      </Button>
    </>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <aside className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[var(--text)]">Inbox</h2>
          <Badge variant="muted" className="uppercase">
            Instagram
          </Badge>
        </div>
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
        <div className="space-y-3">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-24 rounded-xl border border-white/10 bg-white/5 animate-pulse" />
              ))
            : filtered.map((thread) => (
                <button
                  key={thread.id}
                  onClick={() => setSelectedThread(thread)}
                  className={`w-full rounded-2xl border border-white/10 bg-[var(--surface-2)] px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] ${
                    selectedThread?.id === thread.id ? "border-[var(--brand)]" : "hover:border-white/20"
                  }`}
                  aria-label={`Open conversation from ${thread.author}`}
                >
                  <p className="text-sm font-semibold text-[var(--text)]">{thread.author}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-[var(--muted)]">{thread.excerpt}</p>
                  <p className="mt-2 text-xs text-[var(--muted)]">{timeAgo(thread.publishedAt)}</p>
                </button>
              ))}
        </div>
      </aside>
      <section className="card-surface hidden h-full flex-col lg:flex">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div>
            <h3 className="text-lg font-semibold text-[var(--text)] brand-text">Thread details</h3>
            <p className="text-sm text-[var(--muted)]">
              {selectedThread ? `Conversation with ${selectedThread.author}` : "Select a thread to review"}
            </p>
          </div>
          <Badge variant="muted" className="uppercase">
            Safety
          </Badge>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
          {selectedThread ? (
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-[var(--surface-2)] p-4">
                <p className="text-sm text-[var(--text)]">{selectedThread.excerpt}</p>
                <p className="mt-2 text-xs text-[var(--muted)]">{timeAgo(selectedThread.publishedAt)}</p>
              </div>
              {selectedThread.replies.map((reply) => (
                <div key={reply.id} className="rounded-2xl border border-white/5 bg-[var(--surface)] p-4">
                  <p className="text-sm font-semibold text-[var(--text)]">{reply.author}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{reply.message}</p>
                  <p className="mt-2 text-xs text-[var(--muted)]">{timeAgo(reply.publishedAt)}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-full flex-1 items-center justify-center text-sm text-[var(--muted)]">
              Choose a thread to moderate.
            </div>
          )}
        </div>
        {selectedThread ? (
          <div className="flex flex-wrap items-center gap-2 border-t border-white/10 bg-[var(--surface-2)] px-6 py-4">
            {actionButtons}
          </div>
        ) : null}
      </section>
      <DrawerPanel
        open={isMobile && Boolean(selectedThread)}
        title={selectedThread ? selectedThread.author : "Thread"}
        description={selectedThread ? timeAgo(selectedThread.publishedAt) : undefined}
        onClose={() => setSelectedThread(null)}
        actions={selectedThread ? <div className="flex flex-wrap gap-2">{actionButtons}</div> : undefined}
      >
        {selectedThread ? (
          <div className="space-y-4">
            <p className="text-sm text-[var(--text)]">{selectedThread.excerpt}</p>
            {selectedThread.replies.map((reply) => (
              <div key={reply.id} className="rounded-xl border border-white/10 bg-[var(--surface-2)] p-4">
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
