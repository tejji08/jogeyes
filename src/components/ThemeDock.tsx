"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Atom, Droplets, Sun, Moon } from "lucide-react";

export default function ThemeDock() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 h-12 w-72" aria-hidden />;
  }

  const current = theme ?? "aero-light";
  const family = current.startsWith("atom") ? "atom" : "aero";
  const mode = current.endsWith("dark") ? "dark" : "light";

  const setFamily = (f: "aero" | "atom") => setTheme(`${f}-${mode}`);
  const toggleMode = () => setTheme(`${family}-${mode === "dark" ? "light" : "dark"}`);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="glass rounded-full p-1.5 flex items-center gap-1 shadow-xl" role="group" aria-label="Theme">
        <button
          onClick={() => setFamily("aero")}
          aria-pressed={family === "aero"}
          className={`flex items-center gap-2 pl-3 pr-4 py-2 rounded-full text-sm font-medium transition-all ${
            family === "aero" ? "glossy" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Droplets className="w-4 h-4" />
          <span className="hidden sm:inline">Aero</span>
        </button>

        <button
          onClick={() => setFamily("atom")}
          aria-pressed={family === "atom"}
          className={`flex items-center gap-2 pl-3 pr-4 py-2 rounded-full text-sm font-medium transition-all ${
            family === "atom" ? "glossy" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Atom className="w-4 h-4" />
          <span className="hidden sm:inline">Atompunk</span>
        </button>

        <span className="w-px h-6 bg-foreground/15 mx-1" aria-hidden />

        <button
          onClick={toggleMode}
          aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
          className="grid place-items-center w-9 h-9 rounded-full text-foreground hover:bg-foreground/10 transition-colors"
        >
          {mode === "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
