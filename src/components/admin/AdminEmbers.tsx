import { useMemo, type CSSProperties } from "react";

/** Hash deterministik (bukan Math.random) supaya render server & klien selalu sama. */
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const EMBER_COUNT = 60;

/**
 * Percikan bara api yang naik dari bawah layar, sedikit bergoyang ke kiri-
 * kanan (bukan garis lurus), lalu warnanya meredup dari kuning-oranye
 * menyala jadi merah tua lalu hitam sambil menghilang — dipasang di latar
 * halaman login admin. Tiap percikan memakai animation-delay NEGATIF supaya
 * begitu halaman dimuat, animasinya langsung terlihat "sedang berjalan" di
 * berbagai tahap (bukan mulai serentak dari nol), jadi kesan banyak-dan-acak
 * sudah terasa sejak frame pertama, bukan menumpuk pelan-pelan.
 */
export function AdminEmbers() {
  const embers = useMemo(
    () =>
      Array.from({ length: EMBER_COUNT }, (_, i) => {
        const left = seededRandom(i * 17.31 + 3) * 100;
        const size = 2 + seededRandom(i * 41.71 + 3) * 3.5;
        const riseY = -(260 + seededRandom(i * 63.97 + 3) * 380);
        const dx = -40 + seededRandom(i * 29.33 + 3) * 80;
        const duration = 3.5 + seededRandom(i * 87.19 + 3) * 4.5;
        const delay = -(seededRandom(i * 19.71 + 3) * duration);
        return { id: i, left, size, riseY, dx, duration, delay };
      }),
    [],
  );

  return (
    <div aria-hidden className="ember-field pointer-events-none absolute inset-0 overflow-hidden">
      {embers.map((e) => (
        <span
          key={e.id}
          className="absolute rounded-full"
          style={
            {
              left: `${e.left}%`,
              bottom: "-4%",
              width: e.size,
              height: e.size,
              "--dx": `${e.dx}px`,
              "--rise-y": `${e.riseY}px`,
              animation: `ember-rise ${e.duration}s ease-out ${e.delay}s infinite`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
