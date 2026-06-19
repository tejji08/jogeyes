// Themed full-screen loading state shown during route transitions.
export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5">
      <span className="relative grid place-items-center w-20 h-20">
        <svg className="ambience-atom-symbol" style={{ position: "static", width: 80, height: 80, opacity: 1 }} viewBox="0 0 100 100" fill="none" stroke="currentColor" aria-hidden="true">
          <g strokeWidth="3" className="text-primary">
            <ellipse cx="50" cy="50" rx="46" ry="18" />
            <ellipse cx="50" cy="50" rx="46" ry="18" transform="rotate(60 50 50)" />
            <ellipse cx="50" cy="50" rx="46" ry="18" transform="rotate(120 50 50)" />
          </g>
          <circle cx="50" cy="50" r="6" fill="currentColor" stroke="none" />
        </svg>
      </span>
      <p className="text-sm text-muted-foreground tracking-wide">Loading…</p>
    </div>
  );
}
