import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/** Hash string sederhana → angka 0..1, deterministik (sama di server & client, aman untuk SSR). */
function seededRandom(seed: string, salt = 0) {
  let h = salt;
  for (let i = 0; i < seed.length; i++) {
    h = (h << 5) - h + seed.charCodeAt(i);
    h |= 0;
  }
  return Math.abs((h % 1000) / 1000);
}

const STAR_COUNT = 34;

/**
 * Pengganti dekorasi blob mengambang yang berjalan terus-menerus: satu sapuan
 * cahaya lensa lembut (berkas cahaya + inti glow + cincin iris + titik pantulan)
 * yang posisi & intensitasnya mengikuti progres scroll di dalam section ini —
 * muncul, melintas diagonal, lalu memudar saat section meninggalkan viewport.
 * Ukuran & lintasan tiap elemen dirandom berdasarkan `seed` (unik per section)
 * supaya setiap section terasa beda, tapi tetap konsisten antara server & client.
 * Disertai taburan bintang kecil berkedip (hanya tampak di mode gelap) yang
 * menyatu dengan cahaya & cincin iris, bukan layer terpisah.
 */
export function LensFlare({ className = "", seed = "flare" }: { className?: string; seed?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const rnd = useMemo(
    () => ({
      scale: 0.7 + seededRandom(seed, 1) * 0.9, // 0.7x - 1.6x
      ringScale: 0.5 + seededRandom(seed, 2) * 1.1, // 0.5x - 1.6x
      ringOffset: 0.12 + seededRandom(seed, 3) * 0.18, // 12% - 30%
      startX: -15 + seededRandom(seed, 4) * 15, // -15% .. 0%
      endX: 95 + seededRandom(seed, 5) * 25, // 95% .. 120%
      startY: 5 + seededRandom(seed, 6) * 20, // 5% .. 25%
      endY: 65 + seededRandom(seed, 7) * 25, // 65% .. 90%
      rotateFrom: -14 + seededRandom(seed, 8) * 10,
      rotateTo: -2 + seededRandom(seed, 9) * 16,
    }),
    [seed],
  );

  const stars = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }, (_, i) => ({
        id: i,
        top: seededRandom(seed, 50 + i * 3.1) * 100,
        left: seededRandom(seed, 90 + i * 5.7) * 100,
        size: 1 + seededRandom(seed, 130 + i * 2.3) * 1.6,
        duration: 2.2 + seededRandom(seed, 170 + i * 4.1) * 3.5,
        delay: seededRandom(seed, 210 + i * 6.3) * 6,
      })),
    [seed],
  );

  // 3 lapis kedalaman (dekat/tengah/jauh) supaya bintang ikut bergerak saat
  // digulir dengan kecepatan berbeda-beda — efek paralaks sederhana yang
  // terasa seperti melayang nyata di luar angkasa, bukan cuma nempel diam.
  const starsYNear = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const starsYMid = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const starsYFar = useTransform(scrollYProgress, [0, 1], [18, -18]);
  const starLayers = [
    { y: starsYNear, items: stars.filter((_, i) => i % 3 === 0) },
    { y: starsYMid, items: stars.filter((_, i) => i % 3 === 1) },
    { y: starsYFar, items: stars.filter((_, i) => i % 3 === 2) },
  ];

  const left = useTransform(scrollYProgress, [0, 1], [`${rnd.startX}%`, `${rnd.endX}%`]);
  const top = useTransform(scrollYProgress, [0, 1], [`${rnd.startY}%`, `${rnd.endY}%`]);
  const ringLeft = useTransform(scrollYProgress, [0, 1], [`${rnd.startX + rnd.ringOffset * 100}%`, `${rnd.endX + rnd.ringOffset * 100}%`]);
  const ringTop = useTransform(scrollYProgress, [0, 1], [`${rnd.startY - rnd.ringOffset * 40}%`, `${rnd.endY - rnd.ringOffset * 40}%`]);
  const rotate = useTransform(scrollYProgress, [0, 1], [rnd.rotateFrom, rnd.rotateTo]);
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.5, 0.82, 1], [0, 0.55, 0.85, 0.55, 0]);

  const coreSize = 128 * rnd.scale;
  const ringSize = 56 * rnd.ringScale;

  return (
    <div ref={ref} className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {/* Berkas cahaya diagonal */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{
          left,
          top,
          rotate,
          opacity,
          width: `${65 * rnd.scale}%`,
          height: 3 * Math.max(rnd.scale, 0.8),
          background:
            "linear-gradient(90deg, transparent 0%, oklch(0.85 0.1 85 / 0.5) 38%, oklch(0.98 0.03 95 / 0.85) 50%, oklch(0.85 0.1 85 / 0.5) 62%, transparent 100%)",
          filter: "blur(6px)",
        }}
      />
      {/* Inti cahaya */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left,
          top,
          opacity,
          width: coreSize,
          height: coreSize,
          background: "radial-gradient(circle, oklch(0.95 0.05 90 / 0.55) 0%, oklch(0.85 0.1 85 / 0.2) 45%, transparent 75%)",
          filter: "blur(18px)",
        }}
      />
      {/* Cincin iris — elemen khas lens flare, melintas di jalur yang sedikit bergeser */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: ringLeft,
          top: ringTop,
          opacity: useTransform(opacity, (o) => o * 0.75),
          width: ringSize,
          height: ringSize,
          border: "1.5px solid oklch(0.9 0.07 88 / 0.55)",
          boxShadow: "0 0 12px oklch(0.9 0.07 88 / 0.25)",
          filter: "blur(0.5px)",
        }}
      />
      {/* Pantulan sekunder kecil */}
      <motion.div
        className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full sm:size-4"
        style={{
          left: useTransform(left, (v) => `calc(${v} + 12%)`),
          top: useTransform(top, (v) => `calc(${v} + 8%)`),
          opacity: useTransform(opacity, (o) => o * 0.7),
          background: "oklch(0.9 0.06 88 / 0.6)",
          filter: "blur(3px)",
        }}
      />
      {/* Taburan bintang kecil berkedip — hanya tampak di mode gelap, 3 lapis
          paralaks supaya benar-benar ikut bergerak saat digulir */}
      <div className="lens-flare-stars absolute inset-0">
        {starLayers.map((layer, li) => (
          <motion.div key={li} className="absolute inset-0" style={{ y: layer.y }}>
            {layer.items.map((s) => (
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
          </motion.div>
        ))}
      </div>
    </div>
  );
}
