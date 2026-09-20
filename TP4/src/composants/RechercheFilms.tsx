// src/composants/RechercheFilms.tsx

import { useState } from "react";
import { urlRecherche, type ReponseRecherche } from "../lib/omdb";
import { useFetch, useDebounce } from "../hooks/useFetch";
import { CarteFilm } from "./CarteFilm";

export function RechercheFilms() {
  const [terme, setTerme] = useState("");
  const termeNettoye = terme.trim();

  // La requête ne part que 400 ms après la dernière frappe.
  const termeDiffere = useDebounce(termeNettoye, 400);
  const url = termeDiffere ? urlRecherche(termeDiffere) : null;
  const { donnees, chargement, erreur } = useFetch<ReponseRecherche>(url);

  // Sans ça, il y a un blanc entre "je tape" et "Chargement…" pendant
  // que le debounce rattrape la frappe.
  const enAttenteDebounce = termeNettoye !== "" && termeNettoye !== termeDiffere;

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">
        Recherche de films
      </h1>

      <input
        type="search"
        value={terme}
        onChange={(e) => setTerme(e.target.value)}
        placeholder="Tapez le titre d'un film…"
        aria-label="Titre du film à rechercher"
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="mt-8">
        {termeNettoye === "" ? (
          <p className="text-slate-500">
            Tapez un titre pour lancer la recherche.
          </p>
        ) : enAttenteDebounce || chargement ? (
          <p className="text-slate-500">Chargement…</p>
        ) : erreur ? (
          <p className="text-red-600">{erreur}</p>
        ) : donnees?.Response === "False" ? (
          <p className="text-slate-500">
            Aucun film ne correspond à « {termeNettoye} ».
          </p>
        ) : (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {donnees?.Search?.map((film) => (
              <li key={film.imdbID}>
                <CarteFilm film={film} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
