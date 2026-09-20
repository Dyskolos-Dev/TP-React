

import { useEffect, useState } from "react";

export interface EtatFetch<T> {
  donnees: T | null;
  chargement: boolean;
  erreur: string | null;
}

export function useFetch<T>(url: string | null): EtatFetch<T> {
  const [donnees, setDonnees] = useState<T | null>(null);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setDonnees(null);
      setErreur(null);
      return;
    }

    const controleur = new AbortController();

    const charger = async () => {
      setChargement(true);
      setErreur(null);
      try {
        const r = await fetch(url, { signal: controleur.signal });
        if (!r.ok) throw new Error(`Erreur HTTP ${r.status}`);
        const d: T = await r.json();
        setDonnees(d);
      } catch (e) {
        if (e instanceof Error && e.name === "AbortError") return;
        setErreur(e instanceof Error ? e.message : "Erreur inconnue");
        setDonnees(null);
      } finally {
        setChargement(false);
      }
    };

    charger();
    return () => controleur.abort();
  }, [url]);

  return { donnees, chargement, erreur };
}

export function useDebounce<T>(valeur: T, delai = 400): T {
  const [differee, setDifferee] = useState(valeur);

  useEffect(() => {
    const id = window.setTimeout(() => setDifferee(valeur), delai);
    return () => window.clearTimeout(id);
  }, [valeur, delai]);

  return differee;
}
