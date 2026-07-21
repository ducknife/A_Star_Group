import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";
import type { AccountRole } from "../../types";

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: AccountRole[];
}

export function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const { auth } = useAuth();
  if (!auth) return <Navigate to="/admin/login" replace />;
  if (roles && !roles.includes(auth.role)) return <Navigate to="/admin" replace />;
  return <>{children}</>;
}
