import { useMemo } from "react";

/** Hash deterministik (bukan Math.random) supaya render server & klien selalu sama. */
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const STAR_COUNT = 110;

/**
 * Langit berbintang berkedip untuk latar dashboard & login admin — dipasang
 * fixed terhadap viewport (bukan ikut scroll konten) supaya bintangnya
 * "tertinggal di tempat" saat halaman digulir. Tampil kapan pun tema admin
 * aktif (lihat styles.css); di luar itu selalu tersembunyi.
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
            animation: `star-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite backwards`,
          }}
        />
      ))}
    </div>
  );
}
