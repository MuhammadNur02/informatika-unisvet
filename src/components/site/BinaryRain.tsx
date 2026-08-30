const GLYPHS = "0101011010{}</>=+#01";

type Column = {
  left: string;
  duration: number;
  delay: number;
  chars: string;
  size: number;
  opacity: number;
  gold: boolean;
};

// Deterministic pseudo-random agar SSR/CSR konsisten
function seeded(i: number, salt: number) {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const COLUMNS: Array<Column> = Array.from({ length: 14 }, (_, i) => {
  const len = 8 + Math.floor(seeded(i, 1) * 7);
  const chars = Array.from(
    { length: len },
    (_, j) => GLYPHS[Math.floor(seeded(i * 31 + j, 2) * GLYPHS.length)],
  ).join("\n");
  return {
    left: `${(i / 14) * 100 + seeded(i, 3) * 4}%`,
    duration: 22 + seeded(i, 4) * 22,
    delay: -seeded(i, 5) * 30,
    chars,
    size: 11 + Math.floor(seeded(i, 6) * 4),
    opacity: 0.1 + seeded(i, 7) * 0.14,
    gold: seeded(i, 8) > 0.5,
  };
});

/** Hujan karakter kode (0/1, </>, {}) halus bertema informatika. */
export function BinaryRain({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {COLUMNS.map((col, i) => (
        <span
          key={i}
          className="binary-column"
          style={
            {
              left: col.left,
              fontSize: col.size,
              "--col-opacity": col.opacity,
              color: col.gold ? "oklch(0.79 0.15 78)" : "oklch(0.75 0.08 25)",
              animationDuration: `${col.duration}s`,
              animationDelay: `${col.delay}s`,
            } as React.CSSProperties
          }
        >
          {col.chars}
        </span>
      ))}
    </div>
  );
}
