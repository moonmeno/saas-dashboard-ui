import { useEffect, useState } from "react";
import KpiCard from "../../components/KpiCard";
import ContentCard from "../../components/ContentCard";
import { fetchYoutubeDashboard } from "../../services/youtube";
import { ContentItem } from "../../types";
import { TrendingUpIcon, MessageCircleIcon, ShieldIcon } from "../../components/icons";

const YoutubeDashboard = () => {
  const [recent, setRecent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [kpis, setKpis] = useState({
    totalContent: 0,
    totalComments: 0,
    attentionRequired: 0,
  });

  useEffect(() => {
    // 대시보드 진입 시 목업 데이터를 비동기로 로드합니다.
    const load = async () => {
      setLoading(true);
      const result = await fetchYoutubeDashboard();
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
          label="Total Videos"
          value={kpis.totalContent.toLocaleString()}
          delta="↑ 12% vs last 30 days"
          icon={<TrendingUpIcon className="h-6 w-6" />}
        />
        <KpiCard
          label="Total Comments"
          value={kpis.totalComments.toLocaleString()}
          delta="4% more week over week"
          icon={<MessageCircleIcon className="h-6 w-6" />}
        />
        <KpiCard
          label="Held or Likely Spam"
          value={kpis.attentionRequired.toLocaleString()}
          delta="Review flagged videos"
          icon={<ShieldIcon className="h-6 w-6" />}
          intent="warning"
        />
      </section>

      <section className="space-y-4">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[var(--text)]">Recent Content</h2>
            <p className="text-sm text-[var(--muted)]">Latest uploads from connected channels</p>
          </div>
        </header>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="card-surface h-[320px] animate-pulse" />
              ))
            : recent.map((item) => (
                <ContentCard key={item.id} {...item} platform="youtube" />
              ))}
        </div>
      </section>
    </div>
  );
};

export default YoutubeDashboard;
