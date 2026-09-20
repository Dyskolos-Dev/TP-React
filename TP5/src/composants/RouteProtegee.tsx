// src/composants/RouteProtegee.tsx
//
// Redirige vers /connexion si personne n'est connecté. Ça masque un
// affichage côté client, ça ne protège rien : la vraie autorisation
// reste derrière un serveur.

import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contextes/AuthContext";

export function RouteProtegee({ children }: { children: ReactNode }) {
  const { pseudo } = useAuth();
  const emplacement = useLocation();

  if (!pseudo) {
    // On mémorise la page demandée : après connexion, l'utilisateur y
    // retourne au lieu d'atterrir sur l'accueil.
    return <Navigate to="/connexion" state={{ de: emplacement }} replace />;
  }

  return <>{children}</>;
}
