import { useMemo } from "react";

/** Hash deterministik (bukan Math.random) supaya render server & klien selalu sama. */
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const STAR_COUNT = 100;
const SHOOTING_STAR_COUNT = 3;

/**
 * Langit berbintang dekoratif untuk beranda mode gelap. Fixed terhadap
 * viewport (bukan ikut scroll konten) supaya bintangnya "tertinggal di
 * tempat" saat halaman digulir — sama seperti di dashboard admin. Hanya
 * tampak saat mode gelap AKTIF dan `visible` true (dikontrol pembungkusnya
 * lewat IntersectionObserver, supaya cuma nyala sepanjang rentang section
 * tertentu, bukan di seluruh halaman).
 */
export function StarField({ visible }: { visible: boolean }) {
  const stars = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }, (_, i) => {
        const top = seededRandom(i * 11.311 + 3) * 100;
        const left = seededRandom(i * 71.917 + 3) * 100;
        const size = 1 + seededRandom(i * 34.271 + 3) * 1.6;
        const duration = 2.2 + seededRandom(i * 89.113 + 3) * 3.5;
        const delay = seededRandom(i * 23.657 + 3) * 6;
        return { id: i, top, left, size, duration, delay };
      }),
    [],
  );

  const shootingStars = useMemo(
    () =>
      Array.from({ length: SHOOTING_STAR_COUNT }, (_, i) => {
        const top = 4 + seededRandom(i * 14.891 + 11) * 45;
        const left = seededRandom(i * 48.617 + 11) * 55;
        const dx = 360 + seededRandom(i * 31.229 + 11) * 260;
        const dy = 220 + seededRandom(i * 58.443 + 11) * 180;
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        const length = 110 + seededRandom(i * 41.717 + 11) * 90;
        const duration = 8 + seededRandom(i * 67.331 + 11) * 6;
        const delay = seededRandom(i * 18.191 + 11) * 14;
        return { id: i, top, left, dx, dy, angle, length, duration, delay };
      }),
    [],
  );

  return (
    <div
      aria-hidden
      className={`site-starfield pointer-events-none fixed inset-0 z-0 overflow-hidden ${visible ? "is-visible" : ""}`}
    >
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animation: `star-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite backwards`,
          }}
        />
      ))}
      {shootingStars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full"
          style={
            {
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: s.length,
              height: 2,
              background:
                "linear-gradient(90deg, transparent, oklch(0.9 0.03 220 / 0.15) 40%, oklch(0.97 0.02 210 / 0.95))",
              boxShadow: "0 0 6px 1px oklch(0.95 0.02 210 / 0.55)",
              "--sx": `${s.dx}px`,
              "--sy": `${s.dy}px`,
              "--sa": `${s.angle}deg`,
              animation: `shooting-star ${s.duration}s linear ${s.delay}s infinite backwards`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
