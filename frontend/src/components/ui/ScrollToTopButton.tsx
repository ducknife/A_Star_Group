import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Lên đầu trang"
      className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center border border-ink-900 bg-white text-ink-900 transition-colors hover:bg-brand-600 hover:text-white dark:border-ink-100 dark:bg-ink-900 dark:text-white"
    >
      <ArrowUp size={18} />
    </button>
  );
}
