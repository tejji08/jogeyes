"use client"

import * as React from "react";
import { usePlayer } from "@/context/player";
import { X, Minimize2, Maximize2 } from "lucide-react";

export default function MiniPlayer() {
  const player = usePlayer();

  if (!player.current) return null;

  return (
    <div className={`fixed right-4 bottom-4 z-50 ${player.isMinimized ? 'w-40 h-12' : 'w-80'} bg-card/90 rounded-lg shadow-lg p-2 flex items-center gap-3`}> 
      <div className={`${player.isMinimized ? 'w-12 h-8' : 'w-20 h-12'} bg-black rounded overflow-hidden flex-shrink-0`}> 
        {!player.isMinimized && (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${player.current}?autoplay=1`}
            title={player.title || 'video'}
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            className="w-full h-full"
          />
        )}
      </div>

      {!player.isMinimized ? (
        <>
          <div className="flex-1">
            <div className="text-sm font-medium">{player.title}</div>
            <div className="text-xs text-muted-foreground">Playing</div>
          </div>
          <div className="flex items-center gap-2">
            <button aria-label="Minimize player" onClick={() => player.minimize()} className="p-2 rounded hover:bg-white/5">
              <Minimize2 className="w-4 h-4" />
            </button>
            <button aria-label="Close player" onClick={() => player.stop()} className="p-2 rounded hover:bg-white/5">
              <X className="w-4 h-4" />
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-between w-full px-2">
          <div className="text-sm truncate">{player.title}</div>
          <div className="flex items-center gap-2">
            <button aria-label="Restore player" onClick={() => player.restore()} className="p-1 rounded hover:bg-white/5">
              <Maximize2 className="w-4 h-4" />
            </button>
            <button aria-label="Close player" onClick={() => player.stop()} className="p-1 rounded hover:bg-white/5">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
