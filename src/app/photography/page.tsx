"use client"

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Camera, Images } from "lucide-react";
import { photographySamples } from "@/data/photography";
import HeaderArt from "@/components/HeaderArt";
import dynamic from "next/dynamic";
import { useState } from "react";
const Lightbox = dynamic(() => import("@/components/Lightbox"), { ssr: false });

export default function PhotographyPage() {
  // One album per category, preserving first-seen order.
  const albums = Object.entries(
    photographySamples.reduce((acc: Record<string, typeof photographySamples>, p) => {
      acc[p.category] = acc[p.category] || [];
      acc[p.category].push(p);
      return acc;
    }, {} as Record<string, typeof photographySamples>)
  );

  // Which album's slideshow is open (null = closed).
  const [openCat, setOpenCat] = useState<string | null>(null);
  const openAlbum = openCat ? albums.find(([cat]) => cat === openCat) : null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8 pt-8 relative">
            <div className="flex items-center gap-3 mb-3">
              <span className="grid place-items-center w-12 h-12 rounded-2xl glossy">
                <Camera className="w-6 h-6" />
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold"><span className="aero-text">Photography</span></h1>
            </div>
            <p className="text-lg text-muted-foreground">Browse by collection — tap an album to open the slideshow. Add your own from the <a href="/studio" className="underline hover:text-primary">studio</a>.</p>
            <HeaderArt name="photography" />
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
            {albums.map(([category, items]) => {
              const cover = items[0];
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setOpenCat(category)}
                  className="group relative mb-6 w-full break-inside-avoid overflow-hidden rounded-3xl glass border-2 border-wood-accent/30 text-left transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {/* Native img so each card takes the photo's natural aspect ratio — no crop, no bars. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cover.src}
                    alt={category}
                    loading="lazy"
                    className="block w-full h-auto transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 p-4 flex items-end justify-between gap-3">
                    <span>
                      <span className="block text-lg font-semibold text-white capitalize drop-shadow">{category.replace('-', ' ')}</span>
                      <span className="block text-sm text-white/80">{items.length} {items.length === 1 ? "photo" : "photos"}</span>
                    </span>
                    <span className="grid place-items-center w-9 h-9 rounded-full glossy border border-white/40 shrink-0">
                      <Images className="w-4 h-4" />
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {openAlbum && (
            <Lightbox
              items={openAlbum[1].map((p) => ({ src: p.src, alt: p.caption || p.id, caption: p.caption }))}
              index={0}
              onClose={() => setOpenCat(null)}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
