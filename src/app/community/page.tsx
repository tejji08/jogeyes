"use client"

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, Music, BookOpen, Youtube, Palette, PartyPopper, ExternalLink } from "lucide-react";

export default function CommunityPage() {
  const channels = [
    { name: "general-chat", description: "General discussion and casual conversation.", icon: MessageSquare },
    { name: "music-discussion", description: "Share tracks, talk production, and get feedback.", icon: Music },
    { name: "writing-corner", description: "Stories, poetry, and constructive feedback.", icon: BookOpen },
    { name: "youtube-updates", description: "New videos and behind-the-scenes content.", icon: Youtube },
    { name: "creative-showcase", description: "Show off your own work and get inspired.", icon: Palette },
    { name: "events", description: "Listening parties, live sessions, and more.", icon: PartyPopper },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium text-primary mb-6">
              <Users className="w-4 h-4" /> Community
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Hang out on the <span className="aero-text">Discord</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              A small, friendly server for everything I make — music, writing, and YouTube.
              Drop in, share your own work, and say hi.
            </p>

            <Button size="lg" className="text-base glossy border-0 h-12 px-7 rounded-xl" asChild>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Users className="w-5 h-5 mr-2" />
                Join the Discord
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>

          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-6">Channels</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {channels.map((channel) => {
                const Icon = channel.icon;
                return (
                  <Card key={channel.name} className="p-6 glass border-0 rounded-2xl group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="flex items-start gap-4">
                      <div className="grid place-items-center w-11 h-11 rounded-xl glossy shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                          <span className="text-muted-foreground font-normal">#</span>{channel.name}
                        </h3>
                        <p className="text-muted-foreground text-sm">{channel.description}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
