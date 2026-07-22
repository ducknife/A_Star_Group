import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

export interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
  size?: "md" | "sm";
}

/**
 * A native <select>'s closed box can be styled with CSS, but its open options list is
 * rendered by the OS/browser itself — there is no cross-browser way to theme it. This
 * component replaces the whole control so every part (box, chevron, open list, hover
 * and selected states) matches the site's flat/square design.
 */
export function CustomSelect({ label, options, value, onChange, disabled, className, size = "md" }: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const selectOption = (optionValue: string) => {
    onChange(optionValue);
    setOpen(false);
  };

  const control = (
    <div ref={containerRef} className={clsx("relative", className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={clsx(
          "flex w-full items-center justify-between gap-2 border border-ink-300 bg-white text-left text-ink-800 outline-none transition-colors focus:border-brand-600 disabled:cursor-not-allowed disabled:opacity-60 dark:border-ink-700 dark:bg-ink-950 dark:text-ink-100",
          size === "sm" ? "px-2 py-1 text-xs font-medium" : "px-4 py-2.5 text-sm",
        )}
      >
        <span className="truncate">{selected?.label ?? ""}</span>
        <ChevronDown
          size={size === "sm" ? 14 : 16}
          className={clsx("shrink-0 text-ink-500 transition-transform dark:text-ink-400", open && "rotate-180")}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto border border-ink-900 bg-white dark:border-ink-100 dark:bg-ink-900"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => selectOption(option.value)}
                className={clsx(
                  "cursor-pointer px-4 py-2 text-sm transition-colors",
                  isSelected
                    ? "bg-brand-600 text-white"
                    : "text-ink-800 hover:bg-ink-100 dark:text-ink-100 dark:hover:bg-ink-800",
                )}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );

  if (!label) return control;

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-300">{label}</label>
      {control}
    </div>
  );
}
