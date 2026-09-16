/**
 * Konfigurasi Silk (React Bits) bersama untuk latar admin.login.tsx &
 * AdminShell.tsx — kedua halaman sengaja dibuat senada (lihat komentar di
 * masing-masing pemanggil), jadi nilainya disatukan di sini supaya tidak
 * perlu diubah dua tempat terpisah kalau nada warnanya perlu disesuaikan.
 */
export const ADMIN_SILK_PROPS = {
  color: "#4a1a15",
  speed: 1.3,
  scale: 1.2,
  noiseIntensity: 0.9,
  rotation: 0.18,
} as const;
