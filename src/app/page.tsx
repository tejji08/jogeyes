"use client"

import Link from "next/link";
import { Youtube, Music, BookOpen, Users, ArrowRight, Sparkles, Camera } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const sections = [
    {
      title: "YouTube",
      description: "Watch my latest videos, creative content, and visual storytelling",
      icon: Youtube,
      href: "/youtube",
      color: "from-red-500 to-red-700",
    },
    {
      title: "Music",
      description: "Listen to my music",
      icon: Music,
      href: "/music",
      color: "from-purple-500 to-purple-700",
    },
    {
      title: "Photography",
      description: "A small gallery of photos: animals, landscapes, still life and portraits",
      icon: Camera,
      href: "/photography",
      color: "from-yellow-500 to-amber-700",
    },
    {
      title: "Writing",
      description: "Explore stories, poetry, and experimental writing",
      icon: BookOpen,
      href: "/writing",
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "Community",
      description: "Join our Discord and connect with others",
      icon: Users,
      href: "/community",
      color: "from-green-500 to-green-700",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden wood-texture">
        <div className="absolute inset-0 bg-gradient-to-b from-wood-accent/10 to-transparent" />
        
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center mb-8">
            <Sparkles className="w-16 h-16 text-wood-accent" />
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-wood-accent bg-clip-text text-transparent">
            Creative Portfolio
          </h1>
          
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12">
            A collection of multimedia creative works spanning video, music, and written storytelling.
            <br />
            Explore, connect, and experience the journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg bg-green-600 hover:bg-green-700 text-white">
              <Link href="/youtube">
                <Youtube className="w-5 h-5 mr-2" />
                Watch Videos
              </Link>
            </Button>
            <Button asChild size="lg" className="text-lg bg-green-600 hover:bg-green-700 text-white">
              <Link href="/writing">
                <BookOpen className="w-5 h-5 mr-2" />
                Read Stories
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Explore My Work
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {sections.map((section) => {
              const Icon = section.icon;
              // center Community card
              if (section.href === '/community') {
                return (
                  <div key={section.href} className="col-span-2 flex justify-center">
                    <Link href={section.href}>
                      <Card className="group relative overflow-hidden p-8 h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-wood-accent bg-card/50 wood-texture w-full max-w-md">
                        <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                        <div className="relative z-10 text-center">
                          <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${section.color} mb-4 mx-auto`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold mb-2 group-hover:text-wood-accent transition-colors">
                            {section.title}
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            {section.description}
                          </p>
                          <div className="flex items-center justify-center text-wood-accent font-medium group-hover:translate-x-2 transition-transform">
                            Explore <ArrowRight className="w-4 h-4 ml-2" />
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </div>
                );
              }

              return (
                <Link key={section.href} href={section.href}>
                  <Card className="group relative overflow-hidden p-8 h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-wood-accent bg-card/50 wood-texture">
                    <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                    
                    <div className="relative z-10">
                      <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${section.color} mb-4`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-wood-accent transition-colors">
                        {section.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-4">
                        {section.description}
                      </p>
                      
                      <div className="flex items-center text-wood-accent font-medium group-hover:translate-x-2 transition-transform">
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