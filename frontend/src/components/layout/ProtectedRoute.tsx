import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";
import { LoadingState } from "../ui/StateMessage";
import type { AccountRole } from "../../types";

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: AccountRole[];
}

export function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const { auth, checkingSession } = useAuth();
  if (checkingSession) return <LoadingState />;
  if (!auth) return <Navigate to="/admin/login" replace />;
  if (roles && !roles.includes(auth.role)) return <Navigate to="/admin" replace />;
  return <>{children}</>;
}
