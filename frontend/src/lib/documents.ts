import { api, API_BASE_URL } from "./api";
import type { AppDocument, DocumentCategory } from "../types";

export const listDocuments = async (category?: DocumentCategory): Promise<AppDocument[]> => {
  const { data } = await api.get<AppDocument[]>("/api/documents", { params: { category } });
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

export const deleteDocument = async (id: number): Promise<void> => {
  await api.delete(`/api/admin/documents/${id}`);
};
