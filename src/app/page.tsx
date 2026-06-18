"use client"

import Link from "next/link";
import { Youtube, BookOpen, Users, ArrowRight, Camera } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";

export default function Home() {
  const sections = [
    {
      title: "YouTube",
      description: "Gaming runs and guitar covers — Doom, Yakuza, Forza, Minecraft, and Master of Puppets.",
      icon: Youtube,
      href: "/youtube",
      color: "from-red-400 to-rose-500",
    },
    {
      title: "Photography",
      description: "A small gallery: animals, landscapes, still life, and portraits.",
      icon: Camera,
      href: "/photography",
      color: "from-amber-300 to-orange-500",
    },
    {
      title: "Writing",
      description: "The 4Corner Collection and more — fiction, sci-fi, and experimental pieces.",
      icon: BookOpen,
      href: "/writing",
      color: "from-sky-400 to-blue-500",
    },
    {
      title: "Community",
      description: "Join the Discord and connect over music, writing, and YouTube updates.",
      icon: Users,
      href: "/community",
      color: "from-emerald-300 to-green-500",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-36 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="aero-blob w-72 h-72 bg-sky-300 top-20 -left-10" />
        <div className="aero-blob w-80 h-80 bg-emerald-300 top-10 right-0" style={{ animationDelay: "3s" }} />
        <div className="aero-blob w-64 h-64 bg-violet-300 bottom-0 left-1/3" style={{ animationDelay: "6s" }} />

        <div className="container mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium text-primary mb-7">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {profile.alias} · creative portfolio
          </span>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            Hi, I&apos;m <span className="aero-text">{profile.name.split(" ")[0]}</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            {profile.tagline}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="text-base glossy border-0 h-12 px-7 rounded-xl">
              <Link href={profile.heroPrimary.href}>
                <Youtube className="w-5 h-5 mr-2" />
                {profile.heroPrimary.label}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base h-12 px-7 rounded-xl glass border-0 text-foreground hover:text-primary">
              <Link href={profile.heroSecondary.href}>
                <BookOpen className="w-5 h-5 mr-2" />
                {profile.heroSecondary.label}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About strip */}
      <section className="px-4 sm:px-6 lg:px-8 -mt-6 mb-8">
        <div className="container mx-auto max-w-3xl">
          <Card className="glass border-0 rounded-2xl p-6 sm:p-8 text-center">
            <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">{profile.bio}</p>
          </Card>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-14 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Explore my <span className="aero-text">work</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {sections.map((section) => {
              const Icon = section.icon;
              const isCommunity = section.href === "/community";
              return (
                <Link
                  key={section.href}
                  href={section.href}
                  className={isCommunity ? "md:col-span-2" : ""}
                >
                  <Card className="group relative overflow-hidden p-8 h-full glass border-0 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                    <div className="relative z-10">
                      <div className={`inline-flex p-3.5 rounded-2xl bg-gradient-to-br ${section.color} mb-4 shadow-sm`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {section.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">{section.description}</p>
                      <div className="flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform">
                        Explore <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
