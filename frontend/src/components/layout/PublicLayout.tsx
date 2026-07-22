import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollToTopButton } from "../ui/ScrollToTopButton";

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-ink-800 dark:bg-ink-950 dark:text-ink-100">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
