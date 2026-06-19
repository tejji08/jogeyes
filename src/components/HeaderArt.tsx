// Decorative line-art for section headers. Absolutely positioned, hidden on
// small screens, inherits color from CSS (.header-art).

import type { ReactNode } from "react";

type Art = "youtube" | "writing" | "photography" | "community" | "music";

const ART: Record<Art, ReactNode> = {
  youtube: (
    <svg viewBox="0 0 120 90" fill="none" stroke="currentColor" strokeWidth="3">
      <rect x="14" y="26" width="92" height="58" rx="8" />
      <path d="M52 44 L72 55 L52 66 Z" fill="currentColor" stroke="none" />
      <line x1="40" y1="26" x2="30" y2="10" />
      <line x1="80" y1="26" x2="90" y2="10" />
      <circle cx="30" cy="10" r="3" fill="currentColor" stroke="none" />
      <circle cx="90" cy="10" r="3" fill="currentColor" stroke="none" />
    </svg>
  ),
  writing: (
    <svg viewBox="0 0 120 90" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M60 24 C46 16 28 16 16 22 L16 70 C28 64 46 64 60 72 Z" />
      <path d="M60 24 C74 16 92 16 104 22 L104 70 C92 64 74 64 60 72 Z" />
      <line x1="60" y1="24" x2="60" y2="72" />
      <path d="M86 30 L98 18 L106 26 L94 38 Z" fill="currentColor" stroke="none" opacity="0.7" />
    </svg>
  ),
  photography: (
    <svg viewBox="0 0 120 90" fill="none" stroke="currentColor" strokeWidth="3">
      <rect x="18" y="30" width="84" height="54" rx="8" />
      <path d="M40 30 L48 20 L72 20 L80 30" />
      <circle cx="60" cy="57" r="15" />
      <circle cx="60" cy="57" r="6" fill="currentColor" stroke="none" />
    </svg>
  ),
  community: (
    <svg viewBox="0 0 120 90" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M18 24 H78 a8 8 0 0 1 8 8 V58 a8 8 0 0 1 -8 8 H40 L26 78 V66 H18 a8 8 0 0 1 -8 -8 V32 a8 8 0 0 1 8 -8 Z" />
      <circle cx="36" cy="45" r="3.5" fill="currentColor" stroke="none" />
      <circle cx="50" cy="45" r="3.5" fill="currentColor" stroke="none" />
      <circle cx="64" cy="45" r="3.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  music: (
    <svg viewBox="0 0 120 90" fill="none" stroke="currentColor" strokeWidth="3">
      <circle cx="60" cy="50" r="30" />
      <circle cx="60" cy="50" r="6" fill="currentColor" stroke="none" />
      <path d="M82 30 L96 22" />
      <circle cx="98" cy="20" r="5" fill="currentColor" stroke="none" />
    </svg>
  ),
};

export default function HeaderArt({ name }: { name: Art }) {
  return (
    <div className="header-art hidden lg:block" aria-hidden="true">
      {ART[name]}
    </div>
  );
}
