import { useEffect, useState } from "react";
import KpiCard from "../../components/KpiCard";
import ContentCard from "../../components/ContentCard";
import { fetchInstagramDashboard } from "../../services/instagram";
import { ContentItem } from "../../types";
import { TrendingUpIcon, MessageCircleIcon, FlagIcon } from "../../components/icons";

const InstagramDashboard = () => {
  const [recent, setRecent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [kpis, setKpis] = useState({
    totalContent: 0,
    totalComments: 0,
    attentionRequired: 0,
  });

  useEffect(() => {
    // 인스타그램 대시보드도 동일하게 목업 데이터를 로드합니다.
    const load = async () => {
      setLoading(true);
      const result = await fetchInstagramDashboard();
      setRecent(result.recent);
      setKpis(result.kpis);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-3">
        <KpiCard
          label="Total Posts"
          value={kpis.totalContent.toLocaleString()}
          delta="Reels + Stories"
          icon={<TrendingUpIcon className="h-6 w-6" />}
        />
        <KpiCard
          label="Total Comments"
          value={kpis.totalComments.toLocaleString()}
          delta="Engagement past 7 days"
          icon={<MessageCircleIcon className="h-6 w-6" />}
        />
        <KpiCard
          label="Hidden or Reported"
          value={kpis.attentionRequired.toLocaleString()}
          delta="Requires team review"
          icon={<FlagIcon className="h-6 w-6" />}
          intent="warning"
        />
      </section>

      <section className="space-y-4">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[var(--text)] brand-text">Recent Content</h2>
            <p className="text-sm text-[var(--muted)]">Latest posts and reels from connected accounts</p>
          </div>
        </header>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="card-surface h-[320px] animate-pulse" />
              ))
            : recent.map((item) => (
                <ContentCard key={item.id} {...item} platform="instagram" />
              ))}
        </div>
      </section>
    </div>
  );
};

export default InstagramDashboard;
