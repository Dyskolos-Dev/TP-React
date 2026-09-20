// src/pages/Favoris.tsx

import { Link } from "react-router-dom";
import { useFavoris } from "../contextes/FavorisContext";
import { CarteFilm } from "../composants/CarteFilm";
import { Bouton } from "../composants/Bouton";

export function Favoris() {
  const { favoris, dispatch } = useFavoris();

  if (favoris.length === 0) {
    return (
      <p className="rounded-lg bg-slate-100 p-6 text-center text-slate-500 dark:bg-slate-800">
        Aucun favori pour l'instant.{" "}
        <Link
          to="/recherche"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          Cherchez un film
        </Link>{" "}
        à ajouter.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {favoris.map((film) => (
        <li key={film.imdbID} className="flex flex-col gap-2">
          <Link to={`/films/${film.imdbID}`}>
            <CarteFilm film={film} />
          </Link>
          <Bouton
            libelle="Retirer"
            variante="danger"
            onClick={() => dispatch({ type: "retirer", id: film.imdbID })}
          />
        </li>
      ))}
    </ul>
  );
}
