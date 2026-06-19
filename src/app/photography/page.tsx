"use client"

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Camera } from "lucide-react";
import { photographySamples } from "@/data/photography";
import HeaderArt from "@/components/HeaderArt";
import dynamic from "next/dynamic";
import { useState } from "react";
import ImageWithPlaceholder from '../../components/ImageWithPlaceholder';
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

          <div className="space-y-8">
            {Object.entries(
              photographySamples.reduce((acc: Record<string, typeof photographySamples>, p) => {
                acc[p.category] = acc[p.category] || [];
                acc[p.category].push(p);
                return acc;
              }, {} as Record<string, typeof photographySamples>)
            ).map(([category, items]) => (
              <section key={category}>
                <h3 className="text-xl font-semibold mb-4 capitalize">{category.replace('-', ' ')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {items.map((p) => (
                    <Card key={p.id} className="overflow-hidden bg-card/50 wood-texture border-2 border-wood-accent/30">
                      <button onClick={() => setOpen({ open: true, index: photographySamples.findIndex(x => x.id === p.id) })} className="w-full h-full text-left">
                        <div className="aspect-video">
                          {/* Use ImageWithPlaceholder for better UX */}
                          <div className="w-full h-full relative">
                            <ImageWithPlaceholder src={p.src} alt={`photo-${p.id}`} />
                          </div>
                        </div>
                      </button>
                    </Card>
                  ))}
                </div>
              </section>
            ))}
          </div>
          {open?.open && (
            <Lightbox
              items={photographySamples.map((p) => ({ src: p.src, alt: p.id }))}
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
