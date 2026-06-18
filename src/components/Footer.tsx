"use client"

import Link from "next/link";
import { Github, Youtube, BookOpen, Mail, Sparkles } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { icon: Youtube, href: "https://www.youtube.com/@Jogeyes", label: "YouTube" },
    { icon: BookOpen, href: "/writing", label: "Writing" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer className="mt-24 px-3 sm:px-4 pb-6">
      <div className="container mx-auto glass rounded-2xl px-6 sm:px-10 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1.5">
              <span className="grid place-items-center w-7 h-7 rounded-lg glossy">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
              <h3 className="text-lg font-bold aero-text">Jogeyes</h3>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Gaming &amp; guitar, fiction, and photography — all in one place.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  className="p-2.5 rounded-xl bg-white/60 border border-white/70 text-muted-foreground hover:text-primary hover:bg-white transition-colors"
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5" />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-7 pt-5 border-t border-white/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Jogeyes · Hartej Singh</p>
          <Link href="/studio" className="hover:text-primary transition-colors">
            Edit site →
          </Link>
        </div>
      </div>
    </footer>
  );
}
