// Decorative ambient background, rendered once in the root layout.
// Aero: floating bubbles + soft light glows. Atompunk: spinning atom,
// sunbursts, and CRT scanlines. Pure static markup (deterministic) so it
// works in SSR with no hydration mismatch. Toggled by [data-theme] in CSS.

const BUBBLES = [
  { left: "6%", size: 26, dur: 22, delay: 0 },
  { left: "16%", size: 14, dur: 17, delay: 5 },
  { left: "27%", size: 38, dur: 28, delay: 2 },
  { left: "38%", size: 18, dur: 19, delay: 8 },
  { left: "47%", size: 10, dur: 15, delay: 1 },
  { left: "55%", size: 30, dur: 25, delay: 6 },
  { left: "64%", size: 16, dur: 18, delay: 3 },
  { left: "72%", size: 22, dur: 21, delay: 9 },
  { left: "80%", size: 12, dur: 16, delay: 4 },
  { left: "88%", size: 34, dur: 27, delay: 7 },
  { left: "94%", size: 18, dur: 20, delay: 11 },
  { left: "33%", size: 12, dur: 23, delay: 13 },
];

const SPIKES = Array.from({ length: 24 }, (_, i) => {
  const a = (i * 15 * Math.PI) / 180;
  return { x2: +(50 + 50 * Math.cos(a)).toFixed(2), y2: +(50 + 50 * Math.sin(a)).toFixed(2) };
});

function Sunburst({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.6">
        {SPIKES.map((s, i) => (
          <line key={i} x1="50" y1="50" x2={s.x2} y2={s.y2} />
        ))}
      </g>
    </svg>
  );
}

export default function Ambience() {
  return (
    <div className="ambience" aria-hidden="true">
      <div className="ambience-aero">
        <span className="ambience-glow" />
        <span className="ambience-glow two" />
        <span className="ambience-glow three" />
        {BUBBLES.map((b, i) => (
          <span
            key={i}
            className="ambience-bubble"
            style={{
              left: b.left,
              width: `${b.size}px`,
              height: `${b.size}px`,
              animationDuration: `${b.dur}s`,
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="ambience-atom">
        <Sunburst className="ambience-burst one" />
        <Sunburst className="ambience-burst two" />
        <svg className="ambience-atom-symbol" viewBox="0 0 100 100" fill="none" stroke="currentColor" aria-hidden="true">
          <g strokeWidth="2.5">
            <ellipse cx="50" cy="50" rx="46" ry="18" />
            <ellipse cx="50" cy="50" rx="46" ry="18" transform="rotate(60 50 50)" />
            <ellipse cx="50" cy="50" rx="46" ry="18" transform="rotate(120 50 50)" />
          </g>
          <circle cx="50" cy="50" r="6" fill="currentColor" stroke="none" />
        </svg>
        <div className="ambience-scan" />
      </div>
    </div>
  );
}
