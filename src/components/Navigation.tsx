"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Youtube, BookOpen, Users, Home, Camera, Sparkles } from "lucide-react";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function Navigation() {
  const pathname = usePathname();

  // Music is intentionally hidden for now.
  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/youtube", label: "YouTube", icon: Youtube },
    { href: "/writing", label: "Writing", icon: BookOpen },
    { href: "/photography", label: "Photography", icon: Camera },
    { href: "/community", label: "Community", icon: Users },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-3 sm:px-4 pt-3">
        <div className="glass rounded-2xl px-3 py-2 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 pl-1 pr-2 shrink-0 group">
            <span className="grid place-items-center w-8 h-8 rounded-xl glossy">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="hidden sm:block text-lg font-bold tracking-tight aero-text">
              Jogeyes
            </span>
          </Link>

          <div className="flex-1 flex items-center gap-1.5 overflow-x-auto nav-scroll">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap text-sm font-medium ${
                    isActive
                      ? "glossy shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/60"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>

          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
