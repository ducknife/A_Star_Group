import clsx from "clsx";
import { useLanguage } from "../../context/LanguageContext";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="inline-flex h-9 border border-ink-300 text-xs font-bold uppercase tracking-wide dark:border-ink-700">
      <button
        type="button"
        onClick={() => setLanguage("vi")}
        aria-pressed={language === "vi"}
        className={clsx(
          "px-2.5 transition-colors",
          language === "vi"
            ? "bg-brand-600 text-white"
            : "text-ink-600 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800",
        )}
      >
        VI
      </button>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        aria-pressed={language === "en"}
        className={clsx(
          "border-l border-ink-300 px-2.5 transition-colors dark:border-ink-700",
          language === "en"
            ? "bg-brand-600 text-white"
            : "text-ink-600 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800",
        )}
      >
        EN
      </button>
    </div>
  );
}
