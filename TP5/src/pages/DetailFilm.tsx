
import { Link, useParams } from "react-router-dom";
import { afficheDisponible, urlDetail, type FilmDetailOmdb } from "../lib/omdb";
import { useFetch } from "../hooks/useFetch";
import { useFavoris } from "../contextes/FavorisContext";
import { Badge } from "../composants/Badge";
import { Bouton } from "../composants/Bouton";

export function DetailFilm() {

  const { id } = useParams();
  const { donnees, chargement, erreur } = useFetch<FilmDetailOmdb>(
    id ? urlDetail(id) : null
  );
  const { favoris, dispatch } = useFavoris();

  if (chargement) {
    return <p className="text-slate-500">Chargement…</p>;
  }

  if (erreur) {
    return <p className="text-red-600">{erreur}</p>;
  }

  if (!donnees || donnees.Response === "False") {
    return <p className="text-slate-500">Ce film est introuvable.</p>;
  }

  const dejaEnFavori = favoris.some((f) => f.imdbID === donnees.imdbID);

  return (
    <div className="flex flex-col gap-6 sm:flex-row">
      <div className="sm:w-64 sm:shrink-0">
        {afficheDisponible(donnees.Poster) ? (
          <img
            src={donnees.Poster}
            alt={`Affiche de ${donnees.Title}`}
            className="aspect-[2/3] w-full rounded object-cover"
          />
        ) : (
          <div className="flex aspect-[2/3] w-full items-center justify-center rounded bg-slate-100 text-xs text-slate-400 dark:bg-slate-800">
            Pas d'affiche
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <div>
          <h1 className="text-2xl font-bold">{donnees.Title}</h1>
          <p className="text-slate-500 dark:text-slate-400">
            {donnees.Year} · {donnees.Runtime} · {donnees.Genre}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge texte={donnees.Rated} ton="neutre" />
          {donnees.imdbRating !== "N/A" && (
            <Badge texte={`IMDb ${donnees.imdbRating}`} ton="info" />
          )}
        </div>

        <p className="text-slate-700 dark:text-slate-300">{donnees.Plot}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Réalisé par {donnees.Director}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Avec {donnees.Actors}
        </p>

        <div>
          <Bouton
            libelle={
              dejaEnFavori ? "Déjà dans les favoris" : "Ajouter aux favoris"
            }
            desactive={dejaEnFavori}
            onClick={() => dispatch({ type: "ajouter", film: donnees })}
          />
        </div>

        <p>
          <Link
            to="/recherche"
            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            ← Retour à la recherche
          </Link>
        </p>
      </div>
    </div>
  );
}
