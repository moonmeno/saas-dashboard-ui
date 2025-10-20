import { useEffect, useMemo, useState } from "react";
import ContentCard from "../../components/ContentCard";
import FilterBar from "../../components/FilterBar";
import Pagination from "../../components/Pagination";
import { fetchInstagramPosts } from "../../services/instagram";
import { ContentItem } from "../../types";
import { useAppStore } from "../../lib/store";

const PAGE_SIZE = 6;

const InstagramPosts = () => {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const selection = useAppStore((state) => state.selections.instagram);
  const updateSelection = useAppStore((state) => state.updateSelection);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchInstagramPosts();
      setItems(data);
      setLoading(false);
    };
    load();
  }, []);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return items.slice(start, start + PAGE_SIZE);
  }, [items, page]);

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));

  return (
    <div className="space-y-6">
      <FilterBar
        search={selection.searchQuery}
        onSearchChange={(value) => updateSelection("instagram", { searchQuery: value })}
        viewMode={selection.contentViewMode}
        onViewModeChange={(mode) => updateSelection("instagram", { contentViewMode: mode })}
        platform="instagram"
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="card-surface h-[320px] animate-pulse" />
            ))
          : paginatedItems.map((item) => (
              <ContentCard key={item.id} {...item} platform="instagram" />
            ))}
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default InstagramPosts;
