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
    <div className="space-y-10">
      <section className="grid gap-4 md:grid-cols-3">
        <KpiCard
          label="전체 동영상"
          value={kpis.totalContent.toLocaleString()}
          delta="최근 30일 대비 12% 증가"
          icon={<TrendingUpIcon className="h-6 w-6" />}
        />
        <KpiCard
          label="전체 댓글"
          value={kpis.totalComments.toLocaleString()}
          delta="지난주보다 4% 상승"
          icon={<MessageCircleIcon className="h-6 w-6" />}
        />
        <KpiCard
          label="보류·스팸 의심"
          value={kpis.attentionRequired.toLocaleString()}
          delta="신고 콘텐츠를 우선 검토하세요"
          icon={<ShieldIcon className="h-6 w-6" />}
          intent="warning"
        />
      </section>

      <section className="space-y-4">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[var(--text)]">최근 업로드</h2>
            <p className="text-sm text-[var(--muted)]">연결된 채널에서 들어온 최신 동영상</p>
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
