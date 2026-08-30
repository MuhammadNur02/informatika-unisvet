const GLYPHS = "0101011010{}</>=+#01";

type Column = {
  left: string;
  duration: number;
  delay: number;
  chars: string;
  size: number;
  opacity: number;
  gold: boolean;
  bright: boolean;
};

// Deterministic pseudo-random agar SSR/CSR konsisten
function seeded(i: number, salt: number) {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const COUNT = 26;

const COLUMNS: Array<Column> = Array.from({ length: COUNT }, (_, i) => {
  const len = 8 + Math.floor(seeded(i, 1) * 8);
  const chars = Array.from(
    { length: len },
    (_, j) => GLYPHS[Math.floor(seeded(i * 31 + j, 2) * GLYPHS.length)],
  ).join("\n");
  // Kecepatan acak: ada yang sangat cepat (7s) sampai sangat pelan (42s)
  const speedRoll = seeded(i, 4);
  const duration =
    speedRoll < 0.3
      ? 7 + seeded(i, 9) * 8 // cepat: 7–15s
      : speedRoll < 0.7
        ? 16 + seeded(i, 9) * 12 // sedang: 16–28s
        : 30 + seeded(i, 9) * 12; // pelan: 30–42s
  const bright = seeded(i, 10) > 0.72; // sebagian kolom tampil lebih menonjol
  return {
    left: `${(i / COUNT) * 100 + seeded(i, 3) * 3}%`,
    duration,
    delay: -seeded(i, 5) * 45,
    chars,
    size: bright
      ? 15 + Math.floor(seeded(i, 6) * 5) // kolom terang: 15–19px
      : 11 + Math.floor(seeded(i, 6) * 4), // kolom latar: 11–14px
    opacity: bright
      ? 0.42 + seeded(i, 7) * 0.22 // 0.42–0.64
      : 0.14 + seeded(i, 7) * 0.18, // 0.14–0.32
    gold: seeded(i, 8) > 0.45,
    bright,
  };
});

/** Hujan karakter kode (0/1, </>, {}) acak — ada yang cepat, ada yang pelan. */
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
              color: col.gold
                ? col.bright
                  ? "oklch(0.85 0.16 82)"
                  : "oklch(0.79 0.15 78)"
                : col.bright
                  ? "oklch(0.88 0.05 25)"
                  : "oklch(0.78 0.07 25)",
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
