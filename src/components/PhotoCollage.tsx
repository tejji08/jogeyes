"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ImageWithPlaceholder from "./ImageWithPlaceholder";

export interface CollagePhoto {
  id: string;
  src: string;
  caption?: string;
}

// Each album picks a layout by index so neighbouring albums look different.
// spans = [colSpan, rowSpan] cycled across the photos for a collage feel.
type Layout = { name: string; rows: number; cell: string; spans: [number, number][] };

const LAYOUTS: Layout[] = [
  // Mosaic — two rows, mixed tile sizes
  { name: "mosaic", rows: 2, cell: "8.5rem", spans: [[2, 2], [1, 1], [1, 1], [1, 2], [1, 1], [2, 1], [1, 1]] },
  // Filmstrip — one tall row of equal frames
  { name: "filmstrip", rows: 1, cell: "13rem", spans: [[2, 1], [2, 1], [3, 1], [2, 1]] },
  // Ribbon — two rows, alternating wide/tall accents
  { name: "ribbon", rows: 2, cell: "8.5rem", spans: [[1, 1], [1, 2], [2, 1], [1, 1], [1, 1], [2, 2]] },
];

export default function PhotoCollage({
  photos,
  layoutIndex = 0,
  onOpen,
}: {
  photos: CollagePhoto[];
  layoutIndex?: number;
  onOpen: (id: string) => void;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const layout = LAYOUTS[layoutIndex % LAYOUTS.length];

  const scroll = (dir: number) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <div className="relative group">
      {photos.length > 3 && (
        <>
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Scroll left"
            className="collage-arrow absolute left-1 top-1/2 -translate-y-1/2 z-10 grid place-items-center w-10 h-10 rounded-full glossy border border-white/40 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Scroll right"
            className="collage-arrow absolute right-1 top-1/2 -translate-y-1/2 z-10 grid place-items-center w-10 h-10 rounded-full glossy border border-white/40 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      <div
        ref={scroller}
        className="collage-scroll overflow-x-auto overflow-y-hidden pb-3"
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${layout.rows}, ${layout.cell})`,
          gridAutoFlow: "column dense",
          gridAutoColumns: layout.cell,
          gap: "0.6rem",
        }}
      >
        {photos.map((p, i) => {
          const [cs, rs] = layout.spans[i % layout.spans.length];
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onOpen(p.id)}
              className="group/tile relative overflow-hidden rounded-2xl glass border-2 border-wood-accent/30 text-left transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary"
              style={{ gridColumn: `span ${cs}`, gridRow: `span ${Math.min(rs, layout.rows)}` }}
            >
              <ImageWithPlaceholder src={p.src} alt={p.caption || p.id} className="w-full h-full" sizes="(max-width: 640px) 60vw, 280px" />
              {p.caption && (
                <span className="absolute inset-x-0 bottom-0 p-2 pt-6 text-xs font-medium text-white bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover/tile:opacity-100 transition-opacity">
                  {p.caption}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
