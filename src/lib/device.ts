type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean; effectiveType?: string };
};

/**
 * Perlu hemat sumber daya? True untuk HP/laptop kelas bawah, mode hemat data,
 * koneksi lambat, atau pengguna yang meminta gerakan dikurangi. Dipakai untuk
 * memutuskan apakah efek berat (video latar, kartu 3D + physics) dijalankan
 * atau diganti versi statis/2D. Hanya dipanggil di client (useEffect/handler).
 */
export function prefersLightweight(): boolean {
  if (typeof window === "undefined") return true;
  const nav = navigator as NavigatorWithHints;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  if (nav.connection?.saveData) return true;
  if (nav.connection?.effectiveType && /(^|-)2g|3g/.test(nav.connection.effectiveType)) return true;
  if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) return true;
  if (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency < 4) return true;
  return false;
}

/** Layar kecil / perangkat sentuh tanpa hover (HP & tablet). */
export function isSmallOrTouchScreen(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(max-width: 767px), (hover: none)").matches;
}
