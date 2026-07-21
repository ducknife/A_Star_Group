import type { HTMLAttributes } from "react";
import clsx from "clsx";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "rounded-none border border-ink-200 bg-white transition-colors duration-150 hover:border-ink-900",
        "dark:border-ink-800 dark:bg-ink-900 dark:hover:border-ink-400",
        className,
      )}
      {...props}
    />
  );
}
