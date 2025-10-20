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
    <nav className="flex items-center justify-between rounded-2xl border border-white/10 bg-[var(--surface-2)] px-4 py-3" aria-label="Pagination">
      <Button
        variant="secondary"
        disabled={!canPrev}
        onClick={() => canPrev && onPageChange(page - 1)}
        className="min-w-[120px]"
      >
        Previous
      </Button>
      <p className="text-sm text-[var(--muted)]">
        Page <span className="font-semibold text-[var(--text)]">{page}</span> of {totalPages}
      </p>
      <Button
        variant="secondary"
        disabled={!canNext}
        onClick={() => canNext && onPageChange(page + 1)}
        className="min-w-[120px]"
      >
        Next
      </Button>
    </nav>
  );
};

export default Pagination;
