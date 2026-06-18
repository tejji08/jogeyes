"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sparkles, Monitor } from "lucide-react";

const THEMES = [
  { id: "aero", label: "Aero", icon: Sparkles },
  { id: "retro", label: "Retro", icon: Monitor },
] as const;

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Avoid hydration mismatch: reserve space until mounted.
  if (!mounted) return <div className="h-9 w-[150px] shrink-0" aria-hidden />;

  return (
    <div
      role="group"
      aria-label="Theme"
      className="shrink-0 flex items-center gap-0.5 rounded-xl bg-white/55 border border-white/70 p-0.5"
    >
      {THEMES.map((t) => {
        const Icon = t.icon;
        const active = (theme ?? "aero") === t.id;
        return (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            aria-pressed={active}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              active ? "glossy" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
