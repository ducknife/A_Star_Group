export interface Member {
  id: number;
  fullName: string;
  university: string;
  scholarshipName: string;
  major?: string;
  graduationYear?: number;
  bio?: string;
  photoUrl?: string;
  featured: boolean;
  sortOrder: number;
}

export type DocumentCategory =
  | "SCHOLARSHIP_GUIDE"
  | "STUDY_MATERIAL"
  | "REPORT"
  | "TEMPLATE"
  | "OTHER";

export interface AppDocument {
  id: number;
  title: string;
  description?: string;
  category: DocumentCategory;
  fileName: string;
  thumbnailUrl: string;
  fileSize: number;
  contentType: string;
  downloadCount: number;
  uploadedBy?: string;
  uploadedAt: string;
}

export type AccountRole = "ADMIN" | "MOD" | "MEMBER";

export interface Account {
  id: number;
  username: string;
  role: AccountRole;
  displayName?: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  username: string;
  role: AccountRole;
  expiresAt: string;
}

export interface ApiError {
  status: number;
  message: string;
  path?: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}
