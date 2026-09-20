

import { useState, type FormEvent } from "react";
import { useLocation, useNavigate, type Location } from "react-router-dom";
import { useAuth } from "../contextes/AuthContext";
import { Bouton } from "../composants/Bouton";

interface EtatRedirection {
  de?: Location;
}

export function Connexion() {
  const [pseudo, setPseudo] = useState("");
  const [erreur, setErreur] = useState<string | null>(null);
  const { connecter } = useAuth();
  const navigate = useNavigate();
  const emplacement = useLocation();

  const gererEnvoi = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const propre = pseudo.trim();
    if (propre.length < 2) {
      setErreur("Le pseudo doit contenir au moins 2 caractères.");
      return;
    }

    connecter(propre);

    const etat = emplacement.state as EtatRedirection | null;
    navigate(etat?.de?.pathname ?? "/", { replace: true });
  };

  return (
    <form
      onSubmit={gererEnvoi}
      noValidate
      className="mx-auto flex max-w-sm flex-col gap-4 rounded-lg bg-white p-6 shadow-sm dark:bg-slate-800"
    >
      <h1 className="text-xl font-bold">Connexion</h1>

      <div className="flex flex-col gap-1">
        <label htmlFor="pseudo" className="text-sm font-medium">
          Pseudo
        </label>
        <input
          id="pseudo"
          name="pseudo"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          aria-invalid={!!erreur}
          aria-describedby={erreur ? "pseudo-erreur" : undefined}
          className={`rounded-md border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-slate-900 ${
            erreur ? "border-red-500" : "border-slate-300 dark:border-slate-700"
          }`}
        />
        {erreur && (
          <p id="pseudo-erreur" className="text-sm text-red-600">
            {erreur}
          </p>
        )}
      </div>

      <Bouton libelle="Se connecter" type="submit" />
    </form>
  );
}
