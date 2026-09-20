// src/composants/ListeInscriptions.tsx
import type { InscriptionEnregistree } from "../lib/inscription";
import { Badge } from "./Badge";
import { Bouton } from "./Bouton";
import { Carte } from "./Carte";

export interface ListeInscriptionsProps {
  inscriptions: InscriptionEnregistree[];
  onSuppression?: (id: number) => void;
}

export function ListeInscriptions({
  inscriptions,
  onSuppression,
}: ListeInscriptionsProps) {
  if (inscriptions.length === 0) {
    return (
      <p className="rounded-lg bg-slate-100 p-6 text-center text-slate-500">
        Aucune inscription pour l'instant.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {inscriptions.map((inscription) => (
        <li key={inscription.id}>
          <Carte
            titre={inscription.prenom}
            sousTitre={inscription.email}
            actions={
              onSuppression && (
                <Bouton
                  libelle="Supprimer"
                  variante="danger"
                  onClick={() => onSuppression(inscription.id)}
                />
              )
            }
          >
            <Badge texte="CGV acceptées" ton="succes" />
          </Carte>
        </li>
      ))}
    </ul>
  );
}
