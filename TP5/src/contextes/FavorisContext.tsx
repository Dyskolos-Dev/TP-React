// src/contextes/FavorisContext.tsx
//
// Même patron que AuthContext, mais l'état est piloté par un reducer
// plutôt qu'un useState.

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import type { FilmOmdb } from "../lib/omdb";

type ActionFavoris =
  | { type: "ajouter"; film: FilmOmdb }
  | { type: "retirer"; id: string }
  | { type: "vider" };

const CLE_STOCKAGE = "tp5-favoris";

// Fonction pure : pas de fetch, pas de Date, pas de localStorage ici.
// Elle renvoie toujours un nouveau tableau, jamais l'état muté — et le
// switch est exhaustif sans `default`, pour que l'oubli d'un cas reste
// une erreur de compilation.
function reducerFavoris(etat: FilmOmdb[], action: ActionFavoris): FilmOmdb[] {
  switch (action.type) {
    case "ajouter":
      // Un utilisateur qui clique deux fois sur le même film est le cas
      // normal, pas le cas tordu : pas de doublon.
      if (etat.some((f) => f.imdbID === action.film.imdbID)) return etat;
      return [...etat, action.film];
    case "retirer":
      return etat.filter((f) => f.imdbID !== action.id);
    case "vider":
      return [];
  }
}

// Lue une seule fois, à l'initialisation du useReducer : jamais dans le
// reducer, qui doit rester une fonction pure.
function chargerFavorisInitiaux(): FilmOmdb[] {
  try {
    const brut = localStorage.getItem(CLE_STOCKAGE);
    return brut ? (JSON.parse(brut) as FilmOmdb[]) : [];
  } catch {
    return [];
  }
}

interface FavorisContexte {
  favoris: FilmOmdb[];
  dispatch: Dispatch<ActionFavoris>;
}

const Contexte = createContext<FavorisContexte | undefined>(undefined);

export function FavorisProvider({ children }: { children: ReactNode }) {
  const [favoris, dispatch] = useReducer(
    reducerFavoris,
    undefined,
    chargerFavorisInitiaux
  );

  // L'écriture, elle, est un effet de bord : elle n'a rien à faire dans
  // le reducer.
  useEffect(() => {
    localStorage.setItem(CLE_STOCKAGE, JSON.stringify(favoris));
  }, [favoris]);

  return (
    <Contexte.Provider value={{ favoris, dispatch }}>
      {children}
    </Contexte.Provider>
  );
}

export function useFavoris(): FavorisContexte {
  const contexte = useContext(Contexte);
  if (contexte === undefined) {
    throw new Error("useFavoris doit être utilisé dans un <FavorisProvider>");
  }
  return contexte;
}
