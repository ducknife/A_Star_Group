import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { api } from "../lib/api";
import type { Account } from "../types";

interface AuthContextValue {
  auth: Account | null;
  checkingSession: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<Account | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    api
      .get<Account>("/api/auth/me")
      .then(({ data }) => setAuth(data))
      .catch(() => setAuth(null))
      .finally(() => setCheckingSession(false));
  }, []);

  const login = async (username: string, password: string) => {
    const { data } = await api.post<Account>("/api/auth/login", { username, password });
    setAuth(data);
  };

  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
    } finally {
      setAuth(null);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, checkingSession, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
