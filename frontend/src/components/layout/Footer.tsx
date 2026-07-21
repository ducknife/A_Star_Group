import { NavLink } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import { Container } from "../ui/Container";
import { NAV_LINKS, ORG_NAME, ORG_TAGLINE } from "../../lib/constants";
import logo from "../../assets/images/logo.png";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-200 bg-ink-50 dark:border-ink-800 dark:bg-ink-900/40">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <img src={logo} alt={ORG_NAME} className="h-8 w-8" />
            <span className="font-serif text-lg font-semibold text-ink-900 dark:text-white">{ORG_NAME}</span>
          </div>
          <p className="mt-4 font-script text-xl text-brand-600 dark:text-brand-400">{ORG_TAGLINE}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-400">Điều hướng</h3>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className="text-sm text-ink-600 transition-colors hover:text-brand-600 dark:text-ink-300 dark:hover:text-brand-400"
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-400">Liên hệ</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-600 dark:text-ink-300">
            <li className="flex items-start gap-2">
              <Mail size={16} className="mt-0.5 shrink-0 text-brand-600" />
              astarsquad@alandas.site
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-brand-600" />
              Việt Nam
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-400">Kết nối</h3>
          <div className="mt-4 flex gap-3">
            <a
              href=""
              aria-label="Facebook"
              className="inline-flex h-9 w-9 items-center justify-center border border-ink-300 text-ink-600 transition-colors hover:border-brand-600 hover:text-brand-600 dark:border-ink-700 dark:text-ink-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12" />
              </svg>
            </a>
          </div>
        </div>
      </Container>

      <div className="border-t border-ink-200 py-6 dark:border-ink-800">
        <Container className="text-center text-xs text-ink-400">
          <p>
            © {year} {ORG_NAME}. All rights reserved.{" "}
            <NavLink to="/admin/login" aria-label="Đăng nhập" className="text-ink-300 dark:text-ink-700">
              ·
            </NavLink>
          </p>
        </Container>
      </div>
    </footer>
  );
}
