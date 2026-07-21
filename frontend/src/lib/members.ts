import { api } from "./api";
import type { Member } from "../types";

export const listMembers = async (featuredOnly = false): Promise<Member[]> => {
  const { data } = await api.get<Member[]>("/api/members", { params: { featured: featuredOnly || undefined } });
  return data;
};

export const getMember = async (id: number): Promise<Member> => {
  const { data } = await api.get<Member>(`/api/members/${id}`);
  return data;
};

export const createMember = async (payload: Omit<Member, "id">): Promise<Member> => {
  const { data } = await api.post<Member>("/api/admin/members", payload);
  return data;
};

export const updateMember = async (id: number, payload: Omit<Member, "id">): Promise<Member> => {
  const { data } = await api.put<Member>(`/api/admin/members/${id}`, payload);
  return data;
};

export const deleteMember = async (id: number): Promise<void> => {
  await api.delete(`/api/admin/members/${id}`);
};

export const uploadMemberPhoto = async (id: number, file: File): Promise<Member> => {
  const form = new FormData();
  form.append("file", file);
  const { data } = await api.post<Member>(`/api/admin/members/${id}/photo`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};
