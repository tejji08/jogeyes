"use client"

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, ArrowRight, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";

const statusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "live":
      return "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20";
    case "in progress":
      return "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20";
    case "completed":
      return "bg-sky-500/10 text-sky-500 hover:bg-sky-500/20";
    default:
      return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
  }
};

const isInternal = (href: string) => href.startsWith("/");

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium text-primary mb-6">
              <BrainCircuit className="w-4 h-4" /> AI / Machine Learning
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="aero-text">AI/ML Projects</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Machine-learning models and tools I&apos;ve built — from deep-learning
              image classifiers to training pipelines and practical apps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((p) => (
              <Card
                key={p.id}
                className="p-6 sm:p-7 glass border-0 rounded-2xl group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="grid place-items-center w-11 h-11 rounded-xl glossy shrink-0">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  {p.status && <Badge className={statusColor(p.status)}>{p.status}</Badge>}
                </div>

                <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {p.title}
                </h2>
                <p className="text-muted-foreground text-sm mb-4 flex-1">{p.blurb}</p>

                {p.stack && (
                  <p className="text-xs font-medium text-primary/80 mb-4">{p.stack}</p>
                )}

                {p.link && (
                  <a
                    href={p.link}
                    target={isInternal(p.link) ? undefined : "_blank"}
                    rel={isInternal(p.link) ? undefined : "noopener noreferrer"}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
                  >
                    {p.linkLabel || "View project"}
                    {isInternal(p.link) ? (
                      <ArrowRight className="w-4 h-4" />
                    ) : (
                      <ExternalLink className="w-4 h-4" />
                    )}
                  </a>
                )}
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
