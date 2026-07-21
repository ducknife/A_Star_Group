import { useState } from "react";
import clsx from "clsx";
import { Container } from "../../components/ui/Container";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { DocumentCard } from "../../components/documents/DocumentCard";
import { LoadingState, ErrorState, EmptyState } from "../../components/ui/StateMessage";
import { useFetch } from "../../hooks/useFetch";
import { listDocuments } from "../../lib/documents";
import { DOCUMENT_CATEGORY_LABELS } from "../../lib/constants";
import type { DocumentCategory } from "../../types";

const CATEGORIES: Array<{ key: DocumentCategory | "ALL"; label: string }> = [
  { key: "ALL", label: "Tất cả" },
  ...(Object.entries(DOCUMENT_CATEGORY_LABELS) as Array<[DocumentCategory, string]>).map(([key, label]) => ({
    key,
    label,
  })),
];

export function Documents() {
  const [category, setCategory] = useState<DocumentCategory | "ALL">("ALL");
  const { data, loading, error } = useFetch(
    () => listDocuments(category === "ALL" ? undefined : category),
    [category],
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
              onClick={() => setCategory(c.key)}
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

        <div className="mt-12">
          {loading && <LoadingState label="Đang tải tài liệu..." />}
          {error && <ErrorState message={error} />}
          {data && data.length === 0 && <EmptyState message="Chưa có tài liệu nào trong danh mục này." />}
          {data && data.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data.map((doc) => (
                <DocumentCard key={doc.id} document={doc} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
