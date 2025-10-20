import Button from "./ui/button";

export type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <nav className="flex items-center justify-between rounded-2xl border border-[var(--outline)] bg-[var(--surface-2)] px-4 py-3 shadow-sm" aria-label="페이지 네비게이션">
      <Button
        variant="secondary"
        disabled={!canPrev}
        onClick={() => canPrev && onPageChange(page - 1)}
        className="min-w-[120px]"
      >
        이전
      </Button>
      <p className="text-sm text-[var(--muted)]">
        <span className="font-semibold text-[var(--text)]">{page}</span> / {totalPages} 페이지
      </p>
      <Button
        variant="secondary"
        disabled={!canNext}
        onClick={() => canNext && onPageChange(page + 1)}
        className="min-w-[120px]"
      >
        다음
      </Button>
    </nav>
  );
};

export default Pagination;
