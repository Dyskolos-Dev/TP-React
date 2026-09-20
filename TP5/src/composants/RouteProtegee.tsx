

import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contextes/AuthContext";

export function RouteProtegee({ children }: { children: ReactNode }) {
  const { pseudo } = useAuth();
  const emplacement = useLocation();

  if (!pseudo) {

    return <Navigate to="/connexion" state={{ de: emplacement }} replace />;
  }

  return <>{children}</>;
}
