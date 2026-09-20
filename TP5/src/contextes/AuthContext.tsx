// src/contextes/AuthContext.tsx
//
// Connexion simulée : un pseudo suffit, aucun mot de passe, aucun
// serveur.

import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthContexte {
  pseudo: string | null;
  connecter: (pseudo: string) => void;
  deconnecter: () => void;
}

const Contexte = createContext<AuthContexte | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [pseudo, setPseudo] = useState<string | null>(null);

  return (
    <Contexte.Provider
      value={{
        pseudo,
        connecter: (nouveauPseudo) => setPseudo(nouveauPseudo),
        deconnecter: () => setPseudo(null),
      }}
    >
      {children}
    </Contexte.Provider>
  );
}

// Sans cette garde, un composant monté hors du Provider planterait dix
// lignes plus loin avec un message incompréhensible. C'est la garde
// qu'on lit dans le message d'erreur, pas le plantage.
export function useAuth(): AuthContexte {
  const contexte = useContext(Contexte);
  if (contexte === undefined) {
    throw new Error("useAuth doit être utilisé dans un <AuthProvider>");
  }
  return contexte;
}
