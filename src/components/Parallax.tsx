"use client";

import { useEffect } from "react";

// Subtle scroll parallax for the bottom scenery (sets --parallax on <html>,
// consumed by .scene in globals.css).
export default function Parallax() {
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = -Math.min(window.scrollY * 0.06, 44);
        document.documentElement.style.setProperty("--parallax", `${y}px`);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
