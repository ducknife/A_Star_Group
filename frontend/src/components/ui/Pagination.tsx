import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i).filter(
    (p) => p === 0 || p === totalPages - 1 || Math.abs(p - page) <= 1,
  );

  return (
    <nav className="mt-12 flex items-center justify-center gap-1.5">
      <button
        type="button"
        disabled={page === 0}
        onClick={() => onChange(page - 1)}
        aria-label="Trang trước"
        className="inline-flex h-9 w-9 items-center justify-center border border-ink-300 text-ink-600 transition-colors hover:border-brand-600 hover:text-brand-600 disabled:opacity-40 disabled:pointer-events-none dark:border-ink-700 dark:text-ink-300"
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((p, i) => (
        <span key={p} className="flex items-center gap-1.5">
          {i > 0 && p - pages[i - 1] > 1 && <span className="px-1 text-ink-400">…</span>}
          <button
            type="button"
            onClick={() => onChange(p)}
            className={clsx(
              "inline-flex h-9 w-9 items-center justify-center border text-sm font-medium transition-colors",
              p === page
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-ink-300 text-ink-600 hover:border-brand-600 hover:text-brand-600 dark:border-ink-700 dark:text-ink-300",
            )}
          >
            {p + 1}
          </button>
        </span>
      ))}

      <button
        type="button"
        disabled={page >= totalPages - 1}
        onClick={() => onChange(page + 1)}
        aria-label="Trang sau"
        className="inline-flex h-9 w-9 items-center justify-center border border-ink-300 text-ink-600 transition-colors hover:border-brand-600 hover:text-brand-600 disabled:opacity-40 disabled:pointer-events-none dark:border-ink-700 dark:text-ink-300"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
