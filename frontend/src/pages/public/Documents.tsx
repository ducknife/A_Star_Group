import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import clsx from "clsx";
import { Container } from "../../components/ui/Container";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { Button } from "../../components/ui/Button";
import { DocumentCard } from "../../components/documents/DocumentCard";
import { Pagination } from "../../components/ui/Pagination";
import { LoadingState, ErrorState, EmptyState } from "../../components/ui/StateMessage";
import { useFetch } from "../../hooks/useFetch";
import { listDocuments } from "../../lib/documents";
import { useTranslation } from "../../lib/translations";
import type { DocumentCategory } from "../../types";

const PAGE_SIZE = 8;

export function Documents() {
  const [category, setCategory] = useState<DocumentCategory | "ALL">("ALL");
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const { t } = useTranslation();

  const categories: Array<{ key: DocumentCategory | "ALL"; label: string }> = useMemo(
    () => [
      { key: "ALL", label: t.documents.all },
      ...(Object.entries(t.categories) as Array<[DocumentCategory, string]>).map(([key, label]) => ({
        key,
        label,
      })),
    ],
    [t],
  );

  // Auto-search shortly after typing stops; Enter/button below commits instantly.
  useEffect(() => {
    const timer = setTimeout(() => setSearch(inputValue), 350);
    return () => clearTimeout(timer);
  }, [inputValue]);

  const selectCategory = (key: DocumentCategory | "ALL") => {
    setCategory(key);
    setPage(0);
  };

  const submitSearch = () => {
    setSearch(inputValue);
    setPage(0);
  };

  const { data, loading, error } = useFetch(
    () =>
      listDocuments({
        category: category === "ALL" ? undefined : category,
        search,
        page,
        size: PAGE_SIZE,
      }),
    [category, search, page],
  );

  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          eyebrow={t.documents.eyebrow}
          title={t.documents.title}
          description={t.documents.description}
          align="center"
          className="mx-auto"
        />

        <div className="mx-auto mt-10 max-w-3xl">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
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

          <form
            className="mt-6 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              submitSearch();
            }}
          >
            <div className="relative flex-1">
              <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t.documents.searchPlaceholder}
                className="w-full border border-ink-300 bg-white py-2.5 pl-11 pr-4 text-sm text-ink-800 outline-none transition-colors focus:border-brand-600 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-100"
              />
            </div>
            <Button type="submit" icon={<Search size={16} />}>
              {t.documents.search}
            </Button>
          </form>
        </div>

        <div className="mt-12">
          {loading && <LoadingState label={t.documents.loading} />}
          {error && <ErrorState message={error} />}
          {data && data.content.length === 0 && (
            <EmptyState message={search ? t.documents.noResults : t.documents.empty} />
          )}
          {data && data.content.length > 0 && (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
