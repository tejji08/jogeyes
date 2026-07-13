"use client"

import Link from "next/link";
import { Youtube, BookOpen, ArrowRight, Camera, Sparkles, Star, Send, Mail, BrainCircuit, HandHeart, GraduationCap } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Divider from "@/components/Divider";
import { profile } from "@/data/profile";
import { services } from "@/data/services";

const areaIcon = (area: string) =>
  area === "photography" ? Camera : area === "writing" ? BookOpen : area === "youtube" ? Youtube : Sparkles;

export default function Home() {
  const sections = [
    {
      title: "YouTube",
      description: "Guitar covers and gaming runs from the @Jogeyes channel.",
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
      title: "AI/ML Projects",
      description: "Machine-learning models and tools — from a browser-based cancer-tissue classifier to training pipelines.",
      icon: BrainCircuit,
      href: "/projects",
      color: "from-violet-400 to-purple-500",
    },
    {
      title: "My Work",
      description: "Teaching Python, running community events, and volunteering around Seattle.",
      icon: HandHeart,
      href: "/work",
      color: "from-emerald-300 to-green-500",
    },
    {
      title: "Academics",
      description: "Coursework, clubs, athletics, and school involvement.",
      icon: GraduationCap,
      href: "/academics",
      color: "from-teal-300 to-cyan-500",
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

        {/* Decorative graphics (Aero only) */}
        <div className="hero-decor pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            className="absolute -top-12 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(255,248,205,.95), rgba(255,226,150,.35) 45%, transparent 70%)", filter: "blur(6px)" }}
          />
          <Sparkles className="absolute top-24 left-[16%] w-6 h-6 text-sky-400/70 animate-pulse" />
          <Sparkles className="absolute top-44 right-[18%] w-5 h-5 text-emerald-400/70 animate-pulse" style={{ animationDelay: "1s" }} />
          <Star className="absolute top-16 right-[30%] w-4 h-4 text-violet-400/70 animate-pulse" style={{ animationDelay: ".5s" }} />
          <Star className="absolute top-56 left-[28%] w-3.5 h-3.5 text-sky-400/60 animate-pulse" style={{ animationDelay: "1.4s" }} />
          <svg className="absolute top-28 left-[6%] w-28 opacity-80" viewBox="0 0 120 50" fill="white" aria-hidden="true">
            <ellipse cx="40" cy="32" rx="34" ry="16" />
            <ellipse cx="68" cy="24" rx="26" ry="18" />
            <ellipse cx="88" cy="34" rx="24" ry="13" />
          </svg>
          <svg className="absolute top-20 right-[8%] w-24 opacity-70" viewBox="0 0 120 50" fill="white" aria-hidden="true">
            <ellipse cx="40" cy="32" rx="32" ry="15" />
            <ellipse cx="70" cy="26" rx="24" ry="16" />
            <ellipse cx="90" cy="34" rx="20" ry="12" />
          </svg>
        </div>

        {/* Wave divider (Aero only) */}
        <svg className="hero-wave absolute bottom-0 left-0 w-full h-12 sm:h-16" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 40 C 240 90, 480 0, 720 35 S 1200 90, 1440 30 L 1440 80 L 0 80 Z" fill="rgba(255,255,255,0.45)" />
        </svg>

        <div className="container mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium text-primary mb-7">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {profile.available ? "Available for work" : `${profile.alias} · portfolio`}
          </span>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
            Hi, I&apos;m <span className="aero-text">{profile.name.split(" ")[0]}</span>
          </h1>

          <p className="text-base sm:text-lg font-medium text-foreground/70 mb-4">{profile.role}</p>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            {profile.tagline}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="text-base glossy border-0 h-12 px-7 rounded-xl">
              <Link href={profile.heroPrimary.href}>
                <Camera className="w-5 h-5 mr-2" />
                {profile.heroPrimary.label}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base h-12 px-7 rounded-xl glass border-0 text-foreground hover:text-primary">
              <Link href={profile.heroSecondary.href}>
                <Send className="w-5 h-5 mr-2" />
                {profile.heroSecondary.label}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About strip */}
      <section className="px-4 sm:px-6 lg:px-8 -mt-6 mb-8">
        <div className="container mx-auto max-w-3xl">
          <Card className="glass border-0 rounded-2xl p-6 sm:p-8 text-center pat pat-dots overflow-hidden">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium text-primary mb-4">
              <Sparkles className="w-4 h-4" /> About me
            </span>
            <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
              {profile.about || profile.bio}
            </p>
          </Card>
        </div>
      </section>

      <Divider variant="ribbon" />

      {/* Content Grid */}
      <section className="py-14 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Explore my <span className="aero-text">work</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Link
                  key={section.href}
                  href={section.href}
                >
                  <Card className="group relative overflow-hidden p-8 h-full glass glass-hover border-0 rounded-2xl">
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

      {/* Services / Work with me */}
      <Divider variant="wave" flip />
      <section id="services" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium text-primary mb-5">
              <Sparkles className="w-4 h-4" /> Work with me
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              What I can do for <span className="aero-text">you</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hire me for shoots, commissions, and collaborations — here&apos;s where I can help.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s) => {
              const Icon = areaIcon(s.area);
              return (
                <Card key={s.id} className="glass glass-hover border-0 rounded-2xl p-7 flex flex-col">
                  <div className="inline-flex w-12 h-12 rounded-2xl glossy items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-muted-foreground mb-5 flex-1">{s.blurb}</p>
                  <Link href="/contact" className="inline-flex items-center text-primary font-medium hover:translate-x-1 transition-transform">
                    Get in touch <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Card>
              );
            })}
          </div>

          <div className="mt-12">
            <Card className="glass border-0 rounded-2xl p-8 sm:p-10 max-w-3xl mx-auto text-center pat pat-grid overflow-hidden">
              <h3 className="text-2xl sm:text-3xl font-bold mb-3">Have a project in mind?</h3>
              <p className="text-muted-foreground mb-6">{profile.pitch}</p>
              <Button asChild size="lg" className="glossy border-0 rounded-xl h-12 px-8">
                <Link href="/contact"><Mail className="w-5 h-5 mr-2" /> Start a project</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
