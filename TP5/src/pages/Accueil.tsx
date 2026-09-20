// src/pages/Accueil.tsx
import { Link } from "react-router-dom";

export function Accueil() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Bienvenue</h1>
      <p className="text-slate-600 dark:text-slate-300">
        Cette application permet de rechercher des films via l'API OMDB,
        de consulter leur fiche détaillée et de garder les vôtres en
        favoris.
      </p>
      <p>
        <Link
          to="/recherche"
          className="font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          Lancer une recherche →
        </Link>
      </p>
    </div>
  );
}
