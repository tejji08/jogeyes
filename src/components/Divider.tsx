// Themed section divider (SVG). variant: wave | zigzag | ribbon.

const PATHS: Record<string, string> = {
  wave: "M0,40 C240,90 480,0 720,35 S1200,90 1440,30 L1440,80 L0,80 Z",
  zigzag: "M0,70 L120,30 L240,70 L360,30 L480,70 L600,30 L720,70 L840,30 L960,70 L1080,30 L1200,70 L1320,30 L1440,70 L1440,80 L0,80 Z",
  ribbon: "M0,50 C360,10 360,70 720,40 C1080,10 1080,70 1440,40 L1440,80 L0,80 Z",
};

export default function Divider({
  variant = "wave",
  flip = false,
  className = "",
}: {
  variant?: "wave" | "zigzag" | "ribbon";
  flip?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={`divider ${flip ? "divider-flip" : ""} ${className}`}
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path className="divider-fill" d={PATHS[variant]} />
    </svg>
  );
}
