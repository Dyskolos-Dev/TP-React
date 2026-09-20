

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

function reducerFavoris(etat: FilmOmdb[], action: ActionFavoris): FilmOmdb[] {
  switch (action.type) {
    case "ajouter":

      if (etat.some((f) => f.imdbID === action.film.imdbID)) return etat;
      return [...etat, action.film];
    case "retirer":
      return etat.filter((f) => f.imdbID !== action.id);
    case "vider":
      return [];
  }
}

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
