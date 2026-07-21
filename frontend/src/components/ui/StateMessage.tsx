import { Spinner } from "./Spinner";

export function LoadingState({ label = "Đang tải dữ liệu..." }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2.5 py-16 text-sm text-ink-400">
      <Spinner />
      {label}
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="border border-dashed border-red-300 bg-red-50/60 py-12 text-center text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
      {message}
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="border border-dashed border-ink-300 bg-ink-50/60 py-12 text-center text-sm text-ink-400 dark:border-ink-800 dark:bg-ink-900/40">
      {message}
    </div>
  );
}
