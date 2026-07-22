import type { AccountRole, DocumentCategory } from "../types";

export const DOCUMENT_CATEGORY_LABELS: Record<DocumentCategory, string> = {
  SCHOLARSHIP_GUIDE: "Hướng dẫn học bổng",
  STUDY_MATERIAL: "Tài liệu học tập",
  REPORT: "Báo cáo & Tổng kết",
  TEMPLATE: "Biểu mẫu",
  OTHER: "Khác",
};

export const ACCOUNT_ROLE_LABELS: Record<AccountRole, string> = {
  ADMIN: "Quản trị viên",
  MOD: "Điều hành viên",
  MEMBER: "Thành viên",
};

export const NAV_LINKS: Array<{ to: string; key: "home" | "about" | "members" | "documents" | "contact" }> = [
  { to: "/", key: "home" },
  { to: "/gioi-thieu", key: "about" },
  { to: "/thanh-vien", key: "members" },
  { to: "/tai-lieu", key: "documents" },
  { to: "/lien-he", key: "contact" },
];

export const ORG_NAME = "A* SQUAD";
