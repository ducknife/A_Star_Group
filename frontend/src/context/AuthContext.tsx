import { createContext, useContext, useState, type ReactNode } from "react";
import { api, AUTH_STORAGE_KEY } from "../lib/api";
import type { AccountRole, AuthResponse } from "../types";

interface StoredAuth {
  token: string;
  username: string;
  role: AccountRole;
}

interface AuthContextValue {
  auth: StoredAuth | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredAuth(): StoredAuth | null {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredAuth;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<StoredAuth | null>(readStoredAuth);

  const login = async (username: string, password: string) => {
    const { data } = await api.post<AuthResponse>("/api/auth/login", { username, password });
    const stored: StoredAuth = { token: data.token, username: data.username, role: data.role };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(stored));
    setAuth(stored);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setAuth(null);
  };

  return <AuthContext.Provider value={{ auth, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
