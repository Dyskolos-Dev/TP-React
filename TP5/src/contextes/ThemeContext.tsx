

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "clair" | "sombre";

interface ThemeContexte {
  theme: Theme;
  basculer: () => void;
}

const Contexte = createContext<ThemeContexte | undefined>(undefined);

const CLE_STOCKAGE = "tp5-theme";

function themeInitial(): Theme {
  return localStorage.getItem(CLE_STOCKAGE) === "sombre" ? "sombre" : "clair";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(themeInitial);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "sombre");
    localStorage.setItem(CLE_STOCKAGE, theme);
  }, [theme]);

  const basculer = () => setTheme((t) => (t === "sombre" ? "clair" : "sombre"));

  return (
    <Contexte.Provider value={{ theme, basculer }}>
      {children}
    </Contexte.Provider>
  );
}

export function useTheme(): ThemeContexte {
  const contexte = useContext(Contexte);
  if (contexte === undefined) {
    throw new Error("useTheme doit être utilisé dans un <ThemeProvider>");
  }
  return contexte;
}
