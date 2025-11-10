"use client"

import { Github, Twitter, Instagram, Mail, Youtube, Music } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Music, href: "#", label: "Spotify" },
    { icon: Mail, href: "mailto:contact@example.com", label: "Email" },
  ];

  return (
    <footer className="bg-wood-dark/95 border-t-2 border-wood-accent/30 mt-20 wood-texture">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-foreground mb-2">
              Creative Portfolio
            </h3>
            <p className="text-sm text-muted-foreground">
              Sharing stories, music, and creativity with the world.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-wood-light hover:bg-wood-accent hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-wood-accent/20 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Creative Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}