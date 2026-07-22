import { Link } from "react-router-dom";
import { Download, Eye } from "lucide-react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { documentDownloadUrl } from "../../lib/documents";
import { DOCUMENT_CATEGORY_LABELS } from "../../lib/constants";
import type { AppDocument } from "../../types";

export function DocumentCard({ document }: { document: AppDocument }) {
  return (
    <Card className="flex h-full flex-col">
      <div className="aspect-[4/3] w-full overflow-hidden border-b border-ink-200 bg-ink-100 dark:border-ink-800 dark:bg-ink-800">
        <img src={document.thumbnailUrl} alt={document.title} className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <Badge className="self-start">{DOCUMENT_CATEGORY_LABELS[document.category]}</Badge>
        <h3 className="mt-3 font-serif text-lg font-semibold leading-snug text-ink-900 dark:text-white">
          {document.title}
        </h3>
        {document.description && (
          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
            {document.description}
          </p>
        )}

        <div className="mt-4 flex gap-2 border-t border-ink-200 pt-4 dark:border-ink-800">
          <Link
            to={`/tai-lieu/${document.id}`}
            className="inline-flex flex-1 items-center justify-center gap-1.5 border border-ink-300 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-ink-700 transition-colors hover:border-ink-900 dark:border-ink-700 dark:text-ink-200 dark:hover:border-ink-100"
          >
            <Eye size={14} />
            Xem chi tiết
          </Link>
          <a
            href={documentDownloadUrl(document.id)}
            className="inline-flex flex-1 items-center justify-center gap-1.5 border border-brand-600 bg-brand-600 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-brand-700"
          >
            <Download size={14} />
            Tải xuống
          </a>
        </div>
      </div>
    </Card>
  );
}
