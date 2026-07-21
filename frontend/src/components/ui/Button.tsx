import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary: "border border-brand-600 bg-brand-600 text-white hover:bg-brand-700 hover:border-brand-700",
  secondary:
    "border border-ink-900 bg-ink-900 text-white hover:bg-ink-800 dark:border-ink-100 dark:bg-ink-100 dark:text-ink-900 dark:hover:bg-white",
  ghost:
    "border border-ink-300 bg-transparent text-ink-800 hover:border-ink-900 hover:bg-ink-100 dark:border-ink-700 dark:text-ink-100 dark:hover:border-ink-100 dark:hover:bg-ink-800/60",
  danger: "border border-red-700 bg-red-700 text-white hover:bg-red-800",
};

const sizeClasses: Record<Size, string> = {
  sm: "text-xs px-3 py-1.5 gap-1.5",
  md: "text-sm px-5 py-2.5 gap-2",
  lg: "text-sm px-7 py-3.5 gap-2",
};

export function Button({
  variant = "primary",
  size = "md",
  icon,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-none font-semibold uppercase tracking-wide transition-colors duration-150",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        "disabled:opacity-50 disabled:pointer-events-none",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
