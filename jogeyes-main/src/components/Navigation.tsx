"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Music, Youtube, BookOpen, Users, Home, Camera } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/youtube", label: "YouTube", icon: Youtube },
    { href: "/music", label: "Music", icon: Music },
    { href: "/writing", label: "Writing", icon: BookOpen },
    { href: "/photography", label: "Photography", icon: Camera },
    { href: "/community", label: "Community", icon: Users },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-wood-dark/95 backdrop-blur-md border-b-2 border-wood-accent/30 wood-texture">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center py-3">
          <div className="flex space-x-2 overflow-x-auto nav-scroll pb-2 px-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-6 py-2.5 rounded-lg transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-wood-accent text-wood-dark shadow-lg shadow-wood-accent/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-wood-light/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}