import { useState } from "react";
import { Search } from "lucide-react";
import clsx from "clsx";
import { Container } from "../../components/ui/Container";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { DocumentCard } from "../../components/documents/DocumentCard";
import { Pagination } from "../../components/ui/Pagination";
import { LoadingState, ErrorState, EmptyState } from "../../components/ui/StateMessage";
import { useFetch } from "../../hooks/useFetch";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { listDocuments } from "../../lib/documents";
import { DOCUMENT_CATEGORY_LABELS } from "../../lib/constants";
import type { DocumentCategory } from "../../types";

const PAGE_SIZE = 8;

const CATEGORIES: Array<{ key: DocumentCategory | "ALL"; label: string }> = [
  { key: "ALL", label: "Tất cả" },
  ...(Object.entries(DOCUMENT_CATEGORY_LABELS) as Array<[DocumentCategory, string]>).map(([key, label]) => ({
    key,
    label,
  })),
];

export function Documents() {
  const [hasSelectedFilter, setHasSelectedFilter] = useState(false);
  const [category, setCategory] = useState<DocumentCategory | "ALL">("ALL");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const debouncedSearch = useDebouncedValue(search);

  const selectCategory = (key: DocumentCategory | "ALL") => {
    setCategory(key);
    setHasSelectedFilter(true);
    setPage(0);
  };

  const { data, loading, error } = useFetch(
    () =>
      listDocuments({
        category: category === "ALL" ? undefined : category,
        search: debouncedSearch,
        page,
        size: PAGE_SIZE,
      }),
    [category, debouncedSearch, page],
  );

  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          eyebrow="Kho lưu trữ"
          title="Tài liệu"
          description="Tài liệu, hướng dẫn học bổng và biểu mẫu được A* SQUAD tổng hợp và chia sẻ cho cộng đồng."
          align="center"
          className="mx-auto"
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => selectCategory(c.key)}
              className={clsx(
                "border px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors",
                category === c.key
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-ink-300 text-ink-600 hover:border-brand-600 dark:border-ink-700 dark:text-ink-300",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        {hasSelectedFilter && (
          <div className="relative mx-auto mt-6 max-w-md animate-fade-up">
            <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
              placeholder="Tìm theo tiêu đề, mô tả..."
              className="w-full border border-ink-300 bg-white py-2.5 pl-11 pr-4 text-sm text-ink-800 outline-none transition-colors focus:border-brand-600 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-100"
            />
          </div>
        )}

        <div className="mt-12">
          {loading && <LoadingState label="Đang tải tài liệu..." />}
          {error && <ErrorState message={error} />}
          {data && data.content.length === 0 && (
            <EmptyState
              message={debouncedSearch ? "Không tìm thấy tài liệu phù hợp." : "Chưa có tài liệu nào trong danh mục này."}
            />
          )}
          {data && data.content.length > 0 && (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data.content.map((doc) => (
                  <DocumentCard key={doc.id} document={doc} />
                ))}
              </div>
              <Pagination page={data.number} totalPages={data.totalPages} onChange={setPage} />
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
