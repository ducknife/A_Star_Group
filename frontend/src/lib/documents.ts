import { api, API_BASE_URL } from "./api";
import type { AppDocument, DocumentCategory, Page } from "../types";

export interface ListDocumentsParams {
  category?: DocumentCategory;
  search?: string;
  page?: number;
  size?: number;
}

export const listDocuments = async (params: ListDocumentsParams = {}): Promise<Page<AppDocument>> => {
  const { data } = await api.get<Page<AppDocument>>("/api/documents", {
    params: {
      category: params.category,
      search: params.search || undefined,
      page: params.page ?? 0,
      size: params.size ?? 12,
    },
  });
  return data;
};

export const getDocument = async (id: number): Promise<AppDocument> => {
  const { data } = await api.get<AppDocument>(`/api/documents/${id}`);
  return data;
};

export const documentDownloadUrl = (id: number): string => `${API_BASE_URL}/api/documents/${id}/download`;

export const createDocument = async (payload: {
  title: string;
  description?: string;
  category: DocumentCategory;
  file: File;
  thumbnail: File;
}): Promise<AppDocument> => {
  const form = new FormData();
  form.append("title", payload.title);
  if (payload.description) form.append("description", payload.description);
  form.append("category", payload.category);
  form.append("file", payload.file);
  form.append("thumbnail", payload.thumbnail);
  const { data } = await api.post<AppDocument>("/api/admin/documents", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const updateDocument = async (
  id: number,
  payload: {
    title: string;
    description?: string;
    category: DocumentCategory;
    file?: File;
    thumbnail?: File;
  },
): Promise<AppDocument> => {
  const form = new FormData();
  form.append("title", payload.title);
  if (payload.description) form.append("description", payload.description);
  form.append("category", payload.category);
  if (payload.file) form.append("file", payload.file);
  if (payload.thumbnail) form.append("thumbnail", payload.thumbnail);
  const { data } = await api.put<AppDocument>(`/api/admin/documents/${id}`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const deleteDocument = async (id: number): Promise<void> => {
  await api.delete(`/api/admin/documents/${id}`);
};
