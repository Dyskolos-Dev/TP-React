import { FILMS, trierPar, filtrerParGenre } from "./lib/utils";
import { ListeFilms } from "./composants/ListeFilms";

function App() {
  const filmsTries = trierPar(FILMS, "titre");
  const filmsSF = filtrerParGenre(FILMS, "SF");
  const filmsComedie = filtrerParGenre(FILMS, "Comédie");

  return (
    <main className="mx-auto max-w-5xl space-y-10 p-6">
      <h1 className="text-2xl font-bold text-slate-900">Catalogue de films</h1>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-800">
          Tous les films (triés par titre)
        </h2>
        <ListeFilms
          films={filmsTries}
          onSelection={(film) => console.log("Sélection :", film.titre)}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-800">Science-fiction</h2>
        <ListeFilms films={filmsSF} />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-800">Comédies</h2>
        <ListeFilms
          films={filmsComedie}
          messageVide="Aucune comédie dans le catalogue."
        />
      </section>
    </main>
  );
}

export default App;
