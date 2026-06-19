// Decorative ambient background, rendered once in the root layout.
// Aero: bubbles, light glows, a glass orb, drifting cloud, and a hills +
// skyline backdrop. Atompunk: spinning atom, sunbursts, CRT scanlines, and a
// retrofuturist city + rocket + saucer backdrop. Pure static markup
// (deterministic) so it works in SSR with no hydration mismatch.

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
      {/* ---------- AERO ---------- */}
      <div className="ambience-aero">
        <span className="ambience-glow" />
        <span className="ambience-glow two" />
        <span className="ambience-glow three" />
        <span className="ambience-orb" />

        <svg className="scene-cloud" viewBox="0 0 120 60" aria-hidden="true">
          <ellipse cx="40" cy="38" rx="34" ry="16" />
          <ellipse cx="66" cy="28" rx="26" ry="18" />
          <ellipse cx="86" cy="38" rx="22" ry="13" />
        </svg>

        <svg className="scene-blimp" viewBox="0 0 120 50" aria-hidden="true">
          <ellipse cx="58" cy="22" rx="48" ry="15" />
          <path d="M104,22 l16,-8 v16 z" />
          <rect x="46" y="35" width="24" height="8" rx="3" />
        </svg>

        <svg className="scene-birds" viewBox="0 0 120 30" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M8,16 q7,-9 14,0 q7,-9 14,0" />
          <path d="M54,10 q6,-8 12,0 q6,-8 12,0" />
          <path d="M92,18 q5,-7 10,0 q5,-7 10,0" />
        </svg>

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

        <svg className="scene scene-aero" viewBox="0 0 1440 260" preserveAspectRatio="xMidYMax slice">
          <g className="scene-far">
            <rect x="980" y="150" width="22" height="60" />
            <rect x="1008" y="120" width="18" height="90" />
            <rect x="1030" y="140" width="26" height="70" />
            <rect x="1062" y="100" width="16" height="110" />
            <rect x="1082" y="135" width="24" height="75" />
            <rect x="1110" y="155" width="20" height="55" />
          </g>
          <path className="scene-mid" d="M0,150 C260,112 520,150 760,126 C1000,102 1240,150 1440,122 L1440,260 L0,260 Z" />
          <path className="scene-near" d="M0,206 C320,172 640,214 960,182 C1180,160 1320,196 1440,184 L1440,260 L0,260 Z" />
        </svg>
      </div>

      {/* ---------- ATOMPUNK ---------- */}
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

        <svg className="scene-satellite" viewBox="0 0 120 50" aria-hidden="true">
          <rect x="52" y="16" width="16" height="18" rx="2" />
          <rect x="20" y="21" width="28" height="8" />
          <rect x="72" y="21" width="28" height="8" />
          <rect x="48" y="24" width="6" height="2" />
          <rect x="66" y="24" width="6" height="2" />
          <circle cx="60" cy="10" r="5" />
          <rect x="59" y="12" width="2" height="6" />
        </svg>

        <svg className="scene scene-atom" viewBox="0 0 1440 260" preserveAspectRatio="xMidYMax slice">
          <g className="scene-far">
            <rect x="120" y="140" width="40" height="70" />
            <rect x="300" y="120" width="30" height="90" />
            <path d="M170,210 a44,44 0 0 1 88,0 Z" />
            <path d="M520,210 a30,30 0 0 1 60,0 Z" />
            <rect x="400" y="90" width="12" height="120" />
            <circle cx="406" cy="86" r="8" />
            <rect x="620" y="70" width="10" height="140" />
            <circle cx="625" cy="66" r="7" />
            <rect x="980" y="110" width="34" height="100" />
            <rect x="1040" y="130" width="24" height="80" />
            <path d="M1100,210 a36,36 0 0 1 72,0 Z" />
            <rect x="1230" y="100" width="12" height="110" />
            <circle cx="1236" cy="96" r="7" />
          </g>
          <rect className="scene-near" x="0" y="206" width="1440" height="60" />
          <g className="scene-accent">
            <g className="scene-rocket" transform="translate(760,66)">
              <path d="M14,0 C24,14 24,42 14,56 C4,42 4,14 14,0 Z" />
              <path d="M4,42 L-7,60 L9,52 Z" />
              <path d="M24,42 L35,60 L19,52 Z" />
              <circle cx="14" cy="22" r="5" fill="#bfeaff" />
            </g>
            <g className="scene-saucer" transform="translate(250,86)">
              <ellipse cx="0" cy="8" rx="36" ry="10" />
              <ellipse cx="0" cy="2" rx="16" ry="11" />
            </g>
          </g>
        </svg>

        <div className="ambience-scan" />
      </div>
    </div>
  );
}
