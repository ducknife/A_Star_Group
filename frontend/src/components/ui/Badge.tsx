import type { HTMLAttributes } from "react";
import clsx from "clsx";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-none border border-brand-600 px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wide text-brand-700",
        "dark:border-brand-400 dark:text-brand-300",
        className,
      )}
      {...props}
    />
  );
}
