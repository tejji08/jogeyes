"use client"

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, Trophy, CalendarDays, Award, BookMarked } from "lucide-react";
import { academics } from "@/data/academics";

const categoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "club":
      return Users;
    case "athletics":
      return Trophy;
    case "event":
      return CalendarDays;
    case "award":
      return Award;
    case "academics":
      return BookMarked;
    default:
      return GraduationCap;
  }
};

export default function AcademicsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium text-primary mb-6">
              <GraduationCap className="w-4 h-4" /> Academics
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="aero-text">Academics</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Coursework, clubs, athletics, and the activities I&apos;m involved in
              at school.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {academics.map((a) => {
              const Icon = categoryIcon(a.category);
              return (
                <Card
                  key={a.id}
                  className="p-6 sm:p-7 glass border-0 rounded-2xl group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="grid place-items-center w-11 h-11 rounded-xl glossy shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-2">
                      {a.category && (
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/20 capitalize">
                          {a.category}
                        </Badge>
                      )}
                      {a.date && (
                        <span className="text-xs text-muted-foreground">{a.date}</span>
                      )}
                    </div>
                  </div>
                  <h2 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    {a.title}
                  </h2>
                  <p className="text-muted-foreground text-sm">{a.blurb}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
