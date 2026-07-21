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

export const MARQUEE_ITEMS = ["TRI THỨC", "KẾT NỐI", "CHIA SẺ", "PHÁT TRIỂN", "HỌC BỔNG", "CỘNG ĐỒNG"];

export const NAV_LINKS = [
  { to: "/", label: "Trang chủ" },
  { to: "/gioi-thieu", label: "Giới thiệu" },
  { to: "/thanh-vien", label: "Thành viên" },
  { to: "/tai-lieu", label: "Tài liệu" },
  { to: "/lien-he", label: "Liên hệ" },
];

export const ORG_NAME = "A* SQUAD";
export const ORG_TAGLINE = "Học bổng là khởi đầu, tri thức là hành trình.";
