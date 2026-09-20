

export type StatutFilm = "vu" | "a_voir" | "abandonne";

export interface Film {
  readonly id: number;
  titre: string;
  annee: number;
  genres: string[];
  note: number;
  statut: StatutFilm;
}

export type NouveauFilm = Omit<Film, "id">;
export type MajFilm = Partial<Omit<Film, "id">>;
export type ApercuFilm = Pick<Film, "id" | "titre" | "annee">;

export const FILMS: Film[] = [
  { id: 1, titre: "Alien", annee: 1979, genres: ["SF", "Horreur"], note: 8.5, statut: "vu" },
  { id: 2, titre: "Blade Runner", annee: 1982, genres: ["SF", "Thriller"], note: 8.1, statut: "vu" },
  { id: 3, titre: "Arrival", annee: 2016, genres: ["SF", "Drame"], note: 7.9, statut: "a_voir" },
  { id: 4, titre: "Dune", annee: 2021, genres: ["SF", "Aventure"], note: 8.0, statut: "a_voir" },
  { id: 5, titre: "Solaris", annee: 1972, genres: ["SF", "Drame"], note: 8.4, statut: "abandonne" },
];

export function formaterTitre(titre: string, annee: number): string {
  return `${titre} (${annee})`;
}

export function resume(film: Film): string {
  return `${film.titre} — ${film.annee} — ${film.note}/10 — ${film.genres.join(", ")}`;
}

export function moyenne(notes: number[]): number | string {
  if (notes.length === 0) return "Aucune note";
  const total = notes.reduce((a, b) => a + b, 0);
  return total / notes.length;
}

export function afficherMoyenne(notes: number[]): string {
  const m = moyenne(notes);
  if (typeof m === "string") return m;
  return m.toFixed(2);
}

export function trouverParId(liste: Film[], id: number): Film | undefined {
  return liste.find((film) => film.id === id);
}

export function titreDuFilm(liste: Film[], id: number): string {
  const film = trouverParId(liste, id);
  if (!film) return "Film introuvable";
  return film.titre;
}

export function trierPar<T>(liste: T[], cle: keyof T): T[] {
  return [...liste].sort((a, b) => (a[cle] > b[cle] ? 1 : -1));
}

export function filtrerParGenre(liste: Film[], genre?: string): Film[] {
  if (!genre) return liste;
  return liste.filter((film) => film.genres.includes(genre));
}

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

export function chargerFavoris(): number[] {
  const brut = localStorage.getItem("favoris");
  if (brut === null) return [];
  return JSON.parse(brut) as number[];
}

export function enregistrerFavoris(favoris: number[]): void {
  localStorage.setItem("favoris", JSON.stringify(favoris));
}

export function mettreAJour(film: Film, modifications: MajFilm): Film {
  return { ...film, ...modifications };
}

let prochainId = 100;

export function creer(nouveauFilm: NouveauFilm): Film {
  return { id: prochainId++, ...nouveauFilm };
}

export function ajouterNote(film: Film, nouvelleNote: number): Film {
  return { ...film, note: (film.note + nouvelleNote) / 2 };
}

export function apercu(film: Film): ApercuFilm {
  return { id: film.id, titre: film.titre, annee: film.annee };
}
