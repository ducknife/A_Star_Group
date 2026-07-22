import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, Users, FileText, ShieldCheck, UserCog, LogOut, ExternalLink } from "lucide-react";
import clsx from "clsx";
import { useAuth } from "../../context/AuthContext";
import { ThemeToggle } from "./ThemeToggle";
import { ACCOUNT_ROLE_LABELS, ORG_NAME } from "../../lib/constants";
import type { AccountRole } from "../../types";
import logo from "../../assets/images/logo.png";

const ADMIN_LINKS: Array<{ to: string; label: string; icon: typeof LayoutDashboard; roles: AccountRole[] }> = [
  { to: "/admin", label: "Tổng quan", icon: LayoutDashboard, roles: ["ADMIN", "MOD", "MEMBER"] },
  { to: "/admin/members", label: "Thành viên", icon: Users, roles: ["ADMIN", "MOD"] },
  { to: "/admin/documents", label: "Tài liệu", icon: FileText, roles: ["ADMIN", "MOD", "MEMBER"] },
  { to: "/admin/accounts", label: "Tài khoản", icon: ShieldCheck, roles: ["ADMIN"] },
  { to: "/admin/tai-khoan-cua-toi", label: "Tài khoản của tôi", icon: UserCog, roles: ["ADMIN", "MOD", "MEMBER"] },
];

export function AdminLayout() {
  const { auth, logout } = useAuth();
  const links = ADMIN_LINKS.filter((link) => auth && link.roles.includes(auth.role));

  return (
    <div className="flex min-h-screen bg-ink-50 text-ink-800 dark:bg-ink-950 dark:text-ink-100">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900 lg:flex">
        <div className="flex items-center gap-2.5 border-b border-ink-200 px-6 py-5 dark:border-ink-800">
          <img src={logo} alt={ORG_NAME} className="h-8 w-8" />
          <div>
            <p className="font-serif text-sm font-semibold leading-tight">{ORG_NAME}</p>
            <p className="text-xs text-ink-400">Bảng quản trị</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-5">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/admin"}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-3 border-l-2 px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300"
                    : "border-transparent text-ink-600 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800",
                )
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-ink-200 p-3 dark:border-ink-800">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-ink-500 hover:bg-ink-100 dark:text-ink-400 dark:hover:bg-ink-800"
          >
            <ExternalLink size={17} />
            Xem trang chủ
          </a>
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
          >
            <LogOut size={17} />
            Đăng xuất
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-ink-200 bg-white px-6 py-4 dark:border-ink-800 dark:bg-ink-900">
          <p className="text-sm text-ink-500 dark:text-ink-400">
            Xin chào,{" "}
            <span className="font-medium text-ink-800 dark:text-ink-100">
              {auth?.username}
            </span>{" "}
            <span className="kicker ml-1 align-middle text-[0.65rem]">
              {auth ? ACCOUNT_ROLE_LABELS[auth.role] : ""}
            </span>
          </p>
          <ThemeToggle />
        </header>
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
