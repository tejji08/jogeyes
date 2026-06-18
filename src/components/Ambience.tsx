// Decorative ambient background, rendered once in the root layout.
// Aero: floating bubbles + soft light glows. Retro: stars + CRT scanlines.
// Pure static markup (deterministic values) so it works in SSR with no
// hydration mismatch and needs no client JS. Toggled by [data-theme] in CSS.

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
      <div className="ambience-retro">
        <div className="ambience-stars" />
        <div className="ambience-scan" />
      </div>
    </div>
  );
}
