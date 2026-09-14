import { useMemo } from "react";

/** Hash deterministik (bukan Math.random) supaya render server & klien selalu sama. */
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const STAR_COUNT = 110;
const SHOOTING_STAR_COUNT = 4;

/**
 * Langit berbintang untuk latar dashboard admin mode gelap — dipasang fixed
 * terhadap viewport (bukan ikut scroll konten) supaya bintangnya "tertinggal
 * di tempat" saat halaman digulir. Hanya terlihat saat .dark + .admin-theme
 * aktif bersamaan (lihat styles.css); di luar itu selalu tersembunyi.
 */
export function AdminStarfield() {
  const stars = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }, (_, i) => {
        const top = seededRandom(i * 12.9898 + 1) * 100;
        const left = seededRandom(i * 78.233 + 1) * 100;
        const size = 1 + seededRandom(i * 37.719 + 1) * 1.6;
        const duration = 2.2 + seededRandom(i * 93.989 + 1) * 3.5;
        const delay = seededRandom(i * 26.651 + 1) * 6;
        return { id: i, top, left, size, duration, delay };
      }),
    [],
  );

  const shootingStars = useMemo(
    () =>
      Array.from({ length: SHOOTING_STAR_COUNT }, (_, i) => {
        const top = 4 + seededRandom(i * 15.234 + 7) * 45;
        const left = seededRandom(i * 51.234 + 7) * 55;
        const dx = 360 + seededRandom(i * 33.897 + 7) * 260;
        const dy = 220 + seededRandom(i * 61.113 + 7) * 180;
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        const length = 110 + seededRandom(i * 44.31 + 7) * 90;
        const duration = 7 + seededRandom(i * 71.51 + 7) * 6;
        const delay = seededRandom(i * 19.71 + 7) * 14;
        return { id: i, top, left, dx, dy, angle, length, duration, delay };
      }),
    [],
  );

  return (
    <div aria-hidden className="admin-starfield pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animation: `admin-star-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite backwards`,
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
              animation: `admin-shooting-star ${s.duration}s linear ${s.delay}s infinite backwards`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
