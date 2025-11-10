"use client"

import * as React from "react";

type PlayerState = {
  current?: string | null;
  playing?: boolean;
  title?: string;
  setPlaying: (id?: string | null, title?: string) => void;
  stop: () => void;
  minimize: () => void;
  restore: () => void;
  isMinimized: boolean;
};

const PlayerContext = React.createContext<PlayerState | undefined>(undefined);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = React.useState<string | null>(null);
  const [title, setTitle] = React.useState<string | undefined>(undefined);
  const [isMinimized, setIsMinimized] = React.useState<boolean>(false);

  function setPlaying(id?: string | null, t?: string) {
    setCurrent(id ?? null);
    setTitle(t);
    setIsMinimized(false);
  }

  function stop() {
    setCurrent(null);
    setTitle(undefined);
  }

  function minimize() {
    setIsMinimized(true);
  }

  function restore() {
    setIsMinimized(false);
  }

  return (
    <PlayerContext.Provider value={{ current, playing: !!current, title, setPlaying, stop, minimize, restore, isMinimized }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = React.useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}
