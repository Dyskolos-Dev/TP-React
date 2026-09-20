// src/lib/omdb.ts
//
// La forme de l'API OMDB et la construction des URL. Aucun composant,
// aucun hook ici.

// FilmOmdb et non Film : deux types du même nom dans un même projet
// finissent toujours par être importés l'un pour l'autre.
export interface FilmOmdb {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string; // "movie" | "series" | "game" — l'API n'est pas plus précise
  Poster: string; // une URL, ou la chaîne "N/A"
}

export interface ReponseRecherche {
  Search?: FilmOmdb[]; // absent quand la recherche échoue
  totalResults?: string;
  Response: "True" | "False"; // OMDB répond 200 même quand ça échoue
  Error?: string;
}

const CLE = import.meta.env.VITE_OMDB_KEY;
const BASE = "https://www.omdbapi.com/";

/** URL de recherche par titre. Le terme est encodé : sans cela, un
 *  espace ou un accent casse la requête. */
export function urlRecherche(terme: string): string {
  return `${BASE}?apikey=${CLE}&s=${encodeURIComponent(terme)}`;
}

/** L'API renvoie "N/A" quand il n'y a pas d'affiche : ce n'est pas une
 *  URL, et un <img> dessus afficherait une icône cassée. */
export function afficheDisponible(poster: string): boolean {
  return poster !== "N/A" && poster.startsWith("http");
}
