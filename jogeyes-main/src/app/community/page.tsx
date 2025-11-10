"use client"

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, Calendar, Sparkles, ExternalLink } from "lucide-react";

export default function CommunityPage() {
  const stats = [
    { label: "Members", value: "2,847", icon: Users },
    { label: "Messages Today", value: "1,234", icon: MessageSquare },
    { label: "Active Now", value: "387", icon: Sparkles },
  ];

  const channels = [
    {
      name: "💬 general-chat",
      description: "General discussions and casual conversations",
      members: 2847,
    },
    {
      name: "🎵 music-discussion",
      description: "Talk about music, share tracks, and get feedback",
      members: 1523,
    },
    {
      name: "📚 writing-corner",
      description: "Share your stories, poetry, and get constructive feedback",
      members: 1089,
    },
    {
      name: "🎬 youtube-updates",
      description: "Get notified about new videos and behind-the-scenes content",
      members: 2341,
    },
    {
      name: "🎨 creative-showcase",
      description: "Share your own creative work and get inspired",
      members: 876,
    },
    {
      name: "🎉 events",
      description: "Community events, listening parties, and live sessions",
      members: 1654,
    },
  ];

  const upcomingEvents = [
    {
      title: "Live Music Session",
      date: "Jan 28, 2024",
      time: "7:00 PM EST",
      description: "Join me for a live music production session",
    },
    {
      title: "Poetry Reading Night",
      date: "Feb 4, 2024",
      time: "6:00 PM EST",
      description: "Community poetry reading and open mic",
    },
    {
      title: "Q&A Session",
      date: "Feb 11, 2024",
      time: "8:00 PM EST",
      description: "Ask me anything about music, writing, and creativity",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Community</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Join our vibrant Discord community and connect with fellow creatives
            </p>
            
            <Button size="lg" className="text-lg bg-wood-accent hover:bg-wood-accent/90 text-wood-dark" asChild>
              <a href="https://discord.gg/example" target="_blank" rel="noopener noreferrer">
                <Users className="w-5 h-5 mr-2" />
                Join Discord Server
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="p-6 text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-wood-accent bg-card/50 wood-texture">
                  <div className="inline-flex p-4 rounded-full bg-wood-accent/20 mb-4">
                    <Icon className="w-8 h-8 text-wood-accent" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </Card>
              );
            })}
          </div>

          {/* Channels */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Discord Channels</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {channels.map((channel) => (
                <Card key={channel.name} className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-wood-accent group bg-card/50 wood-texture">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-wood-accent transition-colors">
                    {channel.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {channel.description}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="w-4 h-4 mr-2" />
                    {channel.members.toLocaleString()} members
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Upcoming Events</h2>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-wood-accent group bg-card/50 wood-texture">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="p-4 rounded-xl bg-gradient-to-br from-wood-accent to-wood-light">
                        <Calendar className="w-8 h-8 text-wood-dark" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-wood-accent transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground mb-2">
                        {event.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="font-medium">{event.date}</span>
                        <span>•</span>
                        <span>{event.time}</span>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="sm:ml-auto border-wood-accent/50 hover:bg-wood-light hover:text-wood-accent">
                      Set Reminder
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}