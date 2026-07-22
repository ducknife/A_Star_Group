import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { Container } from "../../components/ui/Container";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { LoadingState, ErrorState } from "../../components/ui/StateMessage";
import { useFetch } from "../../hooks/useFetch";
import { getDocument, documentDownloadUrl } from "../../lib/documents";
import { useTranslation, pickLang, pickLangOptional } from "../../lib/translations";

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function DocumentDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: doc, loading, error } = useFetch(() => getDocument(Number(id)), [id]);
  const { t, language } = useTranslation();

  if (loading) return <LoadingState label={t.documentDetail.loading} />;
  if (error || !doc) return <ErrorState message={t.documentDetail.notFound} />;

  const title = pickLang(language, doc.title, doc.titleEn);
  const description = pickLangOptional(language, doc.description, doc.descriptionEn);

  return (
    <section className="py-16">
      <Container className="max-w-4xl">
        <Link
          to="/tai-lieu"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-brand-600 dark:text-ink-400"
        >
          <ArrowLeft size={15} />
          {t.documentDetail.back}
        </Link>

        <div className="mt-8 grid gap-10 border border-ink-200 dark:border-ink-800 md:grid-cols-[280px_1fr]">
          <div className="aspect-[3/4] w-full overflow-hidden border-b border-ink-200 bg-ink-100 dark:border-ink-800 dark:bg-ink-800 md:border-b-0 md:border-r">
            <img src={doc.thumbnailUrl} alt={title} className="h-full w-full object-cover" />
          </div>

          <div className="p-6 md:p-8">
            <Badge>{t.categories[doc.category]}</Badge>
            <h1 className="mt-3 font-serif text-3xl font-semibold text-ink-900 dark:text-white sm:text-4xl">
              {title}
            </h1>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-ink-400">
              {formatFileSize(doc.fileSize)} · {doc.downloadCount} {t.documentDetail.downloads}
            </p>

            {description && (
              <p className="mt-6 text-base leading-relaxed text-ink-600 dark:text-ink-300">{description}</p>
            )}

            <a href={documentDownloadUrl(doc.id)} className="mt-8 inline-block">
              <Button size="lg" icon={<Download size={16} />}>
                {t.documentDetail.download}
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
