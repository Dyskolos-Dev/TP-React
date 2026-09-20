// =====================================================================
//  utils.ts — CORRIGÉ du TP1
//  React.js & TypeScript — Séance 1
//
//  Une correction possible parmi d'autres. Ce qui compte :
//   - `npx tsc --noEmit` ne renvoie rien
//   - strict est resté à true
//   - aucun `any`, ni implicite ni explicite
//   - les annotations sont aux frontières, pas partout
// =====================================================================

// --- Les types du domaine ---------------------------------------------

/** Union littérale : impossible d'écrire "Vu", "vue" ou "à voir". */
export type StatutFilm = "vu" | "a_voir" | "abandonne";

export interface Film {
  readonly id: number; // attribué à la création, jamais modifié ensuite
  titre: string;
  annee: number;
  genres: string[];
  note: number;
  statut: StatutFilm;
}

/** Types dérivés — on ne recopie jamais une interface à la main. */
export type NouveauFilm = Omit<Film, "id">;
export type MajFilm = Partial<Omit<Film, "id">>;
export type ApercuFilm = Pick<Film, "id" | "titre" | "annee">;

// --- Données de démonstration ------------------------------------------

export const FILMS: Film[] = [
  { id: 1, titre: "Alien", annee: 1979, genres: ["SF", "Horreur"], note: 8.5, statut: "vu" },
  { id: 2, titre: "Blade Runner", annee: 1982, genres: ["SF", "Thriller"], note: 8.1, statut: "vu" },
  { id: 3, titre: "Arrival", annee: 2016, genres: ["SF", "Drame"], note: 7.9, statut: "a_voir" },
  { id: 4, titre: "Dune", annee: 2021, genres: ["SF", "Aventure"], note: 8.0, statut: "a_voir" },
  { id: 5, titre: "Solaris", annee: 1972, genres: ["SF", "Drame"], note: 8.4, statut: "abandonne" },
];

// --- 1. Paramètres typés ------------------------------------------------
// On annote les paramètres ; le retour est inféré (string), inutile de
// l'écrire.

export function formaterTitre(titre: string, annee: number) {
  return `${titre} (${annee})`;
}

export function resume(film: Film) {
  return `${film.titre} — ${film.annee} — ${film.note}/10 — ${film.genres.join(", ")}`;
}

// --- 2. Un retour de type variable --------------------------------------
// Le type union force l'appelant à traiter les deux cas (narrowing).
// Variante défendable : renvoyer `number | null`, souvent plus pratique.

export function moyenne(notes: number[]): number | string {
  if (notes.length === 0) return "Aucune note";
  const total = notes.reduce((a, b) => a + b, 0);
  return total / notes.length;
}

/** Exemple d'utilisation : le narrowing est obligatoire côté appelant. */
export function afficherMoyenne(notes: number[]): string {
  const m = moyenne(notes);
  if (typeof m === "string") return m; // ici, m est une string
  return m.toFixed(2); // ici, TS sait que c'est un number
}

// --- 3. Une recherche qui peut échouer -----------------------------------
// find() renvoie `Film | undefined` : le type le dit, et le compilateur
// oblige à traiter le cas.

export function trouverParId(liste: Film[], id: number): Film | undefined {
  return liste.find((film) => film.id === id);
}

export function titreDuFilm(liste: Film[], id: number): string {
  const film = trouverParId(liste, id);
  if (!film) return "Film introuvable"; // garde explicite
  return film.titre;
}

// --- 4. Un tri générique -------------------------------------------------
// `keyof T` garantit que la clé existe réellement sur les objets triés.
// trierPar(FILMS, "titrre") devient une erreur de compilation.

export function trierPar<T>(liste: T[], cle: keyof T): T[] {
  return [...liste].sort((a, b) => (a[cle] > b[cle] ? 1 : -1));
}

// --- 5. Un paramètre optionnel correctement traité ------------------------
// Sans genre, on renvoie la liste entière plutôt que de filtrer sur
// undefined.

export function filtrerParGenre(liste: Film[], genre?: string): Film[] {
  if (!genre) return liste;
  return liste.filter((film) => film.genres.includes(genre));
}

// --- 6. Un statut contraint ----------------------------------------------
// Le switch est exhaustif : le cas `never` provoque une erreur de
// compilation si une valeur est ajoutée à StatutFilm sans être traitée.

export function estVu(film: Film): boolean {
  return film.statut === "vu";
}

export function libelleStatut(film: Film): string {
  switch (film.statut) {
    case "vu":
      return "Déjà vu";
    case "a_voir":
      return "À voir";
    case "abandonne":
      return "Abandonné";
    default: {
      const jamais: never = film.statut;
      return jamais;
    }
  }
}

// --- 7. Une valeur venue de l'extérieur -----------------------------------
// getItem renvoie `string | null` : on traite le null avant de parser.
// Rappel : le typage n'est PAS une validation. Si le contenu stocké ne
// correspond pas, TypeScript ne s'en apercevra pas (voir zod, séance 4).

export function chargerFavoris(): number[] {
  const brut = localStorage.getItem("favoris");
  if (brut === null) return [];
  return JSON.parse(brut) as number[];
}

export function enregistrerFavoris(favoris: number[]): void {
  localStorage.setItem("favoris", JSON.stringify(favoris));
}

// --- 8. Une mise à jour partielle ------------------------------------------
// Partial<Omit<Film, "id">> : tous les champs optionnels, sauf l'id qu'on
// ne doit jamais modifier.

export function mettreAJour(film: Film, modifications: MajFilm): Film {
  return { ...film, ...modifications };
}

// --- 9. Une création sans identifiant ---------------------------------------
// Omit<Film, "id"> : exactement un Film, moins son id.

let prochainId = 100;

export function creer(nouveauFilm: NouveauFilm): Film {
  return { id: prochainId++, ...nouveauFilm };
}

// --- 10. Sans mutation --------------------------------------------------------
// On renvoie un nouvel objet au lieu de modifier celui reçu. Le réflexe
// sera indispensable dès la séance 3 avec useState.

export function ajouterNote(film: Film, nouvelleNote: number): Film {
  return { ...film, note: (film.note + nouvelleNote) / 2 };
}

// --- Bonus : un aperçu allégé ---------------------------------------------------

export function apercu(film: Film): ApercuFilm {
  return { id: film.id, titre: film.titre, annee: film.annee };
}
