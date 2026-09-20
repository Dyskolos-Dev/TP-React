import {
  FILMS,
  trierPar,
  libelleStatut,
  type Film,
} from "./lib/utils";

function App() {
  const troisPremiers: Film[] = trierPar(FILMS, "titre").slice(0, 3);

  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "2rem" }}>
      <h1>Catalogue de films</h1>
      <ul style={{ display: "grid", gap: "1rem" }}>
        {troisPremiers.map((film) => (
          <li
            key={film.id}
            style={{
              background: "white",
              borderRadius: 8,
              padding: "1rem",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <strong>
              {film.titre} ({film.annee})
            </strong>
            <p style={{ margin: "0.25rem 0" }}>{film.genres.join(", ")}</p>
            <p style={{ margin: 0 }}>
              {film.note}/10 — {libelleStatut(film)}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
