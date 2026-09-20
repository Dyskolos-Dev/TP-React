// src/lib/inscription.ts
//
// Aucun JSX ici : ce fichier décrit les données du formulaire et les
// règles de validation qui s'y appliquent.

export interface Inscription {
  prenom: string;
  email: string;
  motDePasse: string;
  confirmation: string;
  cgv: boolean;
}

export const valeursInitiales: Inscription = {
  prenom: "",
  email: "",
  motDePasse: "",
  confirmation: "",
  cgv: false,
};

// Dérivé de Inscription par keyof : une faute de frappe (erreurs.emial)
// devient une erreur de compilation, et un nouveau champ est connu
// immédiatement.
export type Erreurs = Partial<Record<keyof Inscription, string>>;

// Ce qu'on conserve après inscription : jamais le mot de passe.
export type InscriptionEnregistree = Omit<
  Inscription,
  "motDePasse" | "confirmation"
> & { id: number };

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function valider(donnees: Inscription): Erreurs {
  const erreurs: Erreurs = {};

  if (donnees.prenom.trim().length < 2) {
    erreurs.prenom = "Le prénom doit contenir au moins 2 caractères.";
  }

  if (!REGEX_EMAIL.test(donnees.email)) {
    erreurs.email = "L'adresse email n'est pas valide.";
  }

  if (donnees.motDePasse.length < 8) {
    erreurs.motDePasse = "Le mot de passe doit contenir au moins 8 caractères.";
  }

  if (donnees.confirmation !== donnees.motDePasse) {
    erreurs.confirmation = "La confirmation ne correspond pas au mot de passe.";
  }

  if (!donnees.cgv) {
    erreurs.cgv = "Vous devez accepter les conditions générales de vente.";
  }

  return erreurs;
}
