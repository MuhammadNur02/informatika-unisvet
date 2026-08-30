const GLYPHS = "0101011010{}</>=+#01";

type Stream = {
  pos: string;
  duration: number;
  delay: number;
  chars: string;
  size: number;
  opacity: number;
  color: string;
};

function seeded(i: number, salt: number) {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const COLORS = {
  gold: "oklch(0.80 0.18 82)",
  amber: "oklch(0.72 0.18 60)",
  white: "oklch(0.90 0.03 80)",
  rose: "oklch(0.65 0.12 25)",
} as const;

function pickColor(i: number, bright: boolean): string {
  const roll = seeded(i, 8);
  if (bright) return roll > 0.5 ? COLORS.gold : COLORS.white;
  if (roll > 0.75) return COLORS.gold;
  if (roll > 0.5) return COLORS.amber;
  return COLORS.rose;
}

function makeChars(i: number, len: number) {
  return Array.from({ length: len }, (_, j) => GLYPHS[Math.floor(seeded(i * 31 + j, 2) * GLYPHS.length)]).join("");
}

function pickDuration(i: number) {
  const roll = seeded(i, 4);
  if (roll < 0.3) return 9 + seeded(i, 9) * 8;
  if (roll < 0.7) return 18 + seeded(i, 9) * 12;
  return 32 + seeded(i, 9) * 12;
}

const VERTICAL_COUNT = 18;

const VERTICAL: Array<Stream> = Array.from({ length: VERTICAL_COUNT }, (_, i) => {
  const bright = seeded(i, 10) > 0.75;
  return {
    pos: `${(i / VERTICAL_COUNT) * 100 + seeded(i, 3) * 3}%`,
    duration: pickDuration(i),
    delay: -seeded(i, 5) * 45,
    chars: makeChars(i, 8 + Math.floor(seeded(i, 1) * 8)),
    size: bright ? 14 + Math.floor(seeded(i, 6) * 4) : 10 + Math.floor(seeded(i, 6) * 3),
    opacity: bright ? 0.28 + seeded(i, 7) * 0.15 : 0.08 + seeded(i, 7) * 0.1,
    color: pickColor(i, bright),
  };
});

/** Hujan kode binary vertikal ke bawah dengan latar belakang merah maroon gelap bersih tanpa vignette dan sparks. */
export function BinaryRain({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none bg-[#3b0914] ${className}`} aria-hidden>
      <div className="relative z-10">
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
      </div>
    </div>
  );
}
