
import { Link } from "react-router-dom";

export function PageIntrouvable() {
  return (
    <div className="flex flex-col items-center gap-4 py-12 text-center">
      <h1 className="text-2xl font-bold">Cette page n'existe pas.</h1>
      <Link
        to="/"
        className="text-blue-600 hover:underline dark:text-blue-400"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}
