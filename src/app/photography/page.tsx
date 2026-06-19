"use client"

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Camera } from "lucide-react";
import { photographySamples } from "@/data/photography";
import HeaderArt from "@/components/HeaderArt";
import PhotoCollage from "@/components/PhotoCollage";
import dynamic from "next/dynamic";
import { useState } from "react";
const Lightbox = dynamic(() => import("@/components/Lightbox"), { ssr: false });

export default function PhotographyPage() {
  const [open, setOpen] = useState<{ open: boolean; index: number }>({ open: false, index: 0 });
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
            <p className="text-lg text-muted-foreground">A small gallery — animals, landscapes, still life, and portraits. Add your own from the <a href="/studio" className="underline hover:text-primary">studio</a>.</p>
            <HeaderArt name="photography" />
          </div>

          <div className="space-y-10">
            {Object.entries(
              photographySamples.reduce((acc: Record<string, typeof photographySamples>, p) => {
                acc[p.category] = acc[p.category] || [];
                acc[p.category].push(p);
                return acc;
              }, {} as Record<string, typeof photographySamples>)
            ).map(([category, items], albumIndex) => (
              <section key={category}>
                <div className="flex items-baseline justify-between mb-4 gap-3">
                  <h3 className="text-xl font-semibold capitalize">{category.replace('-', ' ')}</h3>
                  <span className="text-sm text-muted-foreground">{items.length} {items.length === 1 ? "photo" : "photos"} · scroll →</span>
                </div>
                <PhotoCollage
                  photos={items.map((p) => ({ id: p.id, src: p.src, caption: p.caption }))}
                  layoutIndex={albumIndex}
                  onOpen={(id) => setOpen({ open: true, index: photographySamples.findIndex((x) => x.id === id) })}
                />
              </section>
            ))}
          </div>
          {open?.open && (
            <Lightbox
              items={photographySamples.map((p) => ({ src: p.src, alt: p.caption || p.id, caption: p.caption }))}
              index={open.index}
              onClose={() => setOpen({ open: false, index: 0 })}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
