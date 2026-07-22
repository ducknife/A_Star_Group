import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { Container } from "../ui/Container";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { NAV_LINKS, ORG_NAME } from "../../lib/constants";
import { useTranslation } from "../../lib/translations";
import logo from "../../assets/images/logo.png";

export function Header() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-40 border-b border-ink-900 bg-white dark:border-ink-100 dark:bg-ink-950">
      <div className="h-1.5 bg-brand-600" />
      <Container className="flex h-18 items-center justify-between py-3">
        <NavLink to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img src={logo} alt={ORG_NAME} className="h-9 w-9" />
          <span className="font-serif text-lg font-semibold tracking-tight text-ink-900 dark:text-white">
            {ORG_NAME}
          </span>
        </NavLink>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                clsx(
                  "border-b-2 px-4 py-2 text-sm font-medium uppercase tracking-wide transition-colors",
                  isActive
                    ? "border-brand-600 text-ink-900 dark:text-white"
                    : "border-transparent text-ink-500 hover:border-ink-300 hover:text-ink-900 dark:text-ink-400 dark:hover:text-white",
                )
              }
            >
              {t.nav[link.key]}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageToggle />
          <ThemeToggle />
          <NavLink
            to="/tai-lieu"
            className="inline-flex items-center justify-center border border-brand-600 bg-brand-600 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-brand-700 hover:border-brand-700"
          >
            {t.nav.documentsCta}
          </NavLink>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageToggle />
          <ThemeToggle />
          <button
            type="button"
            aria-label={t.common.openMenu}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center border border-ink-300 text-ink-700 dark:border-ink-700 dark:text-ink-200"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </Container>

      {open && (
        <nav className="border-t border-ink-200 bg-white px-6 py-4 dark:border-ink-800 dark:bg-ink-950 lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  clsx(
                    "border-l-2 px-3 py-2.5 text-sm font-medium uppercase tracking-wide",
                    isActive
                      ? "border-brand-600 text-ink-900 dark:text-white"
                      : "border-transparent text-ink-600 dark:text-ink-300",
                  )
                }
              >
                {t.nav[link.key]}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
