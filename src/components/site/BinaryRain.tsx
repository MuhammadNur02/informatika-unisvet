const GLYPHS = "0101011010{}</>=+#01";

type Stream = {
  pos: string; // left (vertikal) atau top (horizontal)
  duration: number;
  delay: number;
  chars: string;
  size: number;
  opacity: number;
  color: string;
  horizontal: boolean;
  reverse: boolean;
};

// Deterministic pseudo-random agar SSR/CSR konsisten
function seeded(i: number, salt: number) {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

// Palet warna aliran data: emas, amber, putih hangat, rose maroon
const COLORS = {
  gold: "oklch(0.85 0.16 82)",
  amber: "oklch(0.78 0.17 60)",
  white: "oklch(0.93 0.03 80)",
  rose: "oklch(0.78 0.07 25)",
} as const;

function pickColor(i: number, bright: boolean): string {
  const roll = seeded(i, 8);
  if (bright) return roll > 0.5 ? COLORS.gold : COLORS.white;
  if (roll > 0.75) return COLORS.gold;
  if (roll > 0.5) return COLORS.amber;
  return COLORS.rose;
}

function makeChars(i: number, len: number) {
  return Array.from(
    { length: len },
    (_, j) => GLYPHS[Math.floor(seeded(i * 31 + j, 2) * GLYPHS.length)],
  ).join("\n");
}

// Kecepatan acak 3 tingkat: cepat / sedang / pelan
function pickDuration(i: number) {
  const roll = seeded(i, 4);
  if (roll < 0.3) return 7 + seeded(i, 9) * 8; // cepat: 7–15s
  if (roll < 0.7) return 16 + seeded(i, 9) * 12; // sedang: 16–28s
  return 30 + seeded(i, 9) * 12; // pelan: 30–42s
}

const VERTICAL_COUNT = 20;
const HORIZONTAL_COUNT = 9;

const VERTICAL: Array<Stream> = Array.from({ length: VERTICAL_COUNT }, (_, i) => {
  const bright = seeded(i, 10) > 0.72;
  return {
    pos: `${(i / VERTICAL_COUNT) * 100 + seeded(i, 3) * 3}%`,
    duration: pickDuration(i),
    delay: -seeded(i, 5) * 45,
    chars: makeChars(i, 8 + Math.floor(seeded(i, 1) * 8)),
    size: bright ? 15 + Math.floor(seeded(i, 6) * 5) : 11 + Math.floor(seeded(i, 6) * 4),
    opacity: bright ? 0.42 + seeded(i, 7) * 0.22 : 0.14 + seeded(i, 7) * 0.18,
    color: pickColor(i, bright),
    horizontal: false,
    reverse: false,
  };
});

const HORIZONTAL: Array<Stream> = Array.from({ length: HORIZONTAL_COUNT }, (_, k) => {
  const i = 100 + k; // offset seed agar tidak sama dengan vertikal
  const bright = seeded(i, 10) > 0.6;
  return {
    pos: `${(k / HORIZONTAL_COUNT) * 100 + seeded(i, 3) * 6}%`,
    duration: pickDuration(i) * 0.9,
    delay: -seeded(i, 5) * 45,
    chars: makeChars(i, 14 + Math.floor(seeded(i, 1) * 10)),
    size: bright ? 14 + Math.floor(seeded(i, 6) * 4) : 10 + Math.floor(seeded(i, 6) * 3),
    opacity: bright ? 0.36 + seeded(i, 7) * 0.2 : 0.1 + seeded(i, 7) * 0.14,
    color: pickColor(i, bright),
    horizontal: true,
    reverse: seeded(i, 11) > 0.5, // sebagian ke kiri, sebagian ke kanan
  };
});

// Percikan bit: titik cahaya kecil yang melayang naik & berkedip
const SPARKS = Array.from({ length: 14 }, (_, i) => ({
  left: `${seeded(i, 20) * 100}%`,
  top: `${55 + seeded(i, 21) * 45}%`,
  size: 3 + Math.floor(seeded(i, 22) * 4),
  duration: 6 + seeded(i, 23) * 9,
  delay: -seeded(i, 24) * 15,
  color: seeded(i, 25) > 0.5 ? COLORS.gold : COLORS.white,
  opacity: 0.35 + seeded(i, 26) * 0.4,
}));

/**
 * Hujan karakter kode (0/1, </>, {}) acak:
 * vertikal jatuh ke bawah + horizontal melintas kiri-kanan,
 * ditambah percikan bit yang melayang. Kecepatan acak cepat–pelan.
 */
export function BinaryRain({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {VERTICAL.map((col, i) => (
        <span
          key={`v-${i}`}
          className="binary-column"
          style={
            {
              left: col.pos,
              fontSize: col.size,
              "--col-opacity": col.opacity,
              color: col.color,
              animationDuration: `${col.duration}s`,
              animationDelay: `${col.delay}s`,
            } as React.CSSProperties
          }
        >
          {col.chars}
        </span>
      ))}

      {HORIZONTAL.map((row, i) => (
        <span
          key={`h-${i}`}
          className={`binary-row ${row.reverse ? "binary-row-reverse" : ""}`}
          style={
            {
              top: row.pos,
              fontSize: row.size,
              "--col-opacity": row.opacity,
              color: row.color,
              animationDuration: `${row.duration}s`,
              animationDelay: `${row.delay}s`,
            } as React.CSSProperties
          }
        >
          {row.chars.replaceAll("\n", " ")}
        </span>
      ))}

      {SPARKS.map((s, i) => (
        <span
          key={`s-${i}`}
          className="bit-spark"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            background: s.color,
            boxShadow: `0 0 ${s.size * 3}px ${s.color}, 0 0 ${s.size * 6}px ${s.color}`,
            opacity: s.opacity,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
