// src/composants/Layout.tsx
//
// L'en-tête et le pied de page ne sont écrits qu'ici, une seule fois.
// <Outlet /> affiche la page courante au milieu.

import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../contextes/AuthContext";
import { useFavoris } from "../contextes/FavorisContext";
import { useTheme } from "../contextes/ThemeContext";
import { Bouton } from "./Bouton";

function classeLien({ isActive }: { isActive: boolean }): string {
  return isActive
    ? "font-bold text-blue-600 dark:text-blue-400"
    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white";
}

export function Layout() {
  const { pseudo, deconnecter } = useAuth();
  const { favoris } = useFavoris();
  const { theme, basculer } = useTheme();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 p-4">
          <nav className="flex flex-wrap items-center gap-4 text-sm">
            <NavLink to="/" end className={classeLien}>
              Accueil
            </NavLink>
            <NavLink to="/recherche" className={classeLien}>
              Recherche
            </NavLink>
            <NavLink to="/favoris" className={classeLien}>
              Favoris{favoris.length > 0 && ` (${favoris.length})`}
            </NavLink>
          </nav>

          <div className="flex items-center gap-3 text-sm">
            <button
              type="button"
              onClick={basculer}
              className="rounded-md border border-slate-300 px-2 py-1 text-xs text-slate-600 dark:border-slate-700 dark:text-slate-300"
            >
              {theme === "sombre" ? "Mode clair" : "Mode sombre"}
            </button>

            {pseudo ? (
              <>
                <span className="text-slate-600 dark:text-slate-300">
                  Connecté en tant que <strong>{pseudo}</strong>
                </span>
                <Bouton
                  libelle="Déconnexion"
                  variante="secondaire"
                  onClick={deconnecter}
                />
              </>
            ) : (
              <NavLink to="/connexion" className={classeLien}>
                Connexion
              </NavLink>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 p-6">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 p-4 text-center text-xs text-slate-400 dark:border-slate-800">
        TP5 — Application de films
      </footer>
    </div>
  );
}
