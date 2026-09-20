

import type { FilmOmdb } from "../lib/omdb";
import { afficheDisponible } from "../lib/omdb";
import { Carte } from "./Carte";
import { Badge } from "./Badge";

export interface CarteFilmProps {
  film: FilmOmdb;
}

const libelles: Record<string, string> = {
  movie: "Film",
  series: "Série",
  game: "Jeu",
};

export function CarteFilm({ film }: CarteFilmProps) {
  return (
    <Carte titre={film.Title} sousTitre={film.Year}>
      {afficheDisponible(film.Poster) ? (
        <img
          src={film.Poster}
          alt={`Affiche de ${film.Title}`}
          className="aspect-[2/3] w-full rounded object-cover"
        />
      ) : (
        <div className="flex aspect-[2/3] w-full items-center justify-center rounded bg-slate-100 text-xs text-slate-400">
          Pas d'affiche
        </div>
      )}

      <p className="mt-2">
        <Badge texte={libelles[film.Type] ?? film.Type} ton="info" />
      </p>
    </Carte>
  );
}
