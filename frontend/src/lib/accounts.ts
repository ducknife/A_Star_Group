import { api } from "./api";
import type { Account, AccountRole } from "../types";

export const listAccounts = async (): Promise<Account[]> => {
  const { data } = await api.get<Account[]>("/api/admin/accounts");
  return data;
};

export const createAccount = async (payload: {
  username: string;
  password: string;
  role: AccountRole;
  displayName?: string;
}): Promise<Account> => {
  const { data } = await api.post<Account>("/api/admin/accounts", payload);
  return data;
};

export const deleteAccount = async (id: number): Promise<void> => {
  await api.delete(`/api/admin/accounts/${id}`);
};

export const updateAccountRole = async (id: number, role: AccountRole): Promise<Account> => {
  const { data } = await api.put<Account>(`/api/admin/accounts/${id}/role`, { role });
  return data;
};

export const getMyAccount = async (): Promise<Account> => {
  const { data } = await api.get<Account>("/api/account/me");
  return data;
};

export const updateMyAccount = async (payload: {
  username?: string;
  displayName?: string;
  currentPassword?: string;
  newPassword?: string;
}): Promise<Account> => {
  const { data } = await api.put<Account>("/api/account/me", payload);
  return data;
};
