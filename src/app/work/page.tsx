"use client"

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { HandHeart, MapPin, ExternalLink } from "lucide-react";
import { work } from "@/data/work";

export default function WorkPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium text-primary mb-6">
              <HandHeart className="w-4 h-4" /> My Work
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="aero-text">My Work</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Community involvement, teaching, and volunteering — the work I do
              beyond the screen.
            </p>
          </div>

          <div className="space-y-6">
            {work.map((w) => (
              <Card
                key={w.id}
                className="p-6 sm:p-8 glass border-0 rounded-2xl group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="grid place-items-center w-12 h-12 rounded-xl glossy shrink-0">
                    <HandHeart className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                      <h2 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {w.role}
                      </h2>
                      <span className="text-muted-foreground">·</span>
                      <span className="font-medium">{w.org}</span>
                    </div>
                    {w.location && (
                      <p className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
                        <MapPin className="w-3.5 h-3.5" /> {w.location}
                      </p>
                    )}
                    <p className="text-muted-foreground">{w.blurb}</p>
                    {w.link && (
                      <a
                        href={w.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-primary hover:gap-3 transition-all"
                      >
                        {w.linkLabel || "Learn more"}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
