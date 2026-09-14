import { useRef, useState, type PointerEvent } from "react";

export type PointerGlowState = { rx: number; ry: number; mx: number; my: number; active: boolean };

const REST: PointerGlowState = { rx: 0, ry: 0, mx: 50, my: 50, active: false };

/**
 * Lacak posisi pointer di dalam sebuah elemen untuk efek tilt 3D + shading
 * radial yang mengikuti kursor (dipakai di foto hero & kartu dosen).
 *
 * Saat pointer keluar, mx/my (posisi shading) SENGAJA tidak direset ke
 * tengah — background-position/radial-gradient tidak bisa di-transition
 * CSS, jadi kalau direset di sini akan terlihat "meloncat" ke tengah
 * sebelum sempat fade out. Cuma tilt & status aktif yang direset di sini;
 * keduanya properti yang memang bisa transisi mulus lewat CSS.
 */
export function usePointerGlow(maxTilt = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState<PointerGlowState>(REST);

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setPointer({
      rx: (py - 0.5) * -maxTilt,
      ry: (px - 0.5) * maxTilt,
      mx: px * 100,
      my: py * 100,
      active: true,
    });
  }

  function onPointerLeave() {
    setPointer((p) => ({ ...p, rx: 0, ry: 0, active: false }));
  }

  return { ref, pointer, onPointerMove, onPointerLeave };
}

export function radialGlowBackground(mx: number, my: number) {
  return `radial-gradient(circle at ${mx}% ${my}%, oklch(0 0 0 / 0.55) 0%, oklch(0 0 0 / 0.28) 8%, transparent 18%, oklch(1 0 0 / 0.35) 24%, transparent 40%)`;
}

/** Versi tipis dari radialGlowBackground — cincin lebih kecil & lebih transparan, untuk permukaan besar yang tidak boleh terasa berat. */
export function thinRadialGlowBackground(mx: number, my: number) {
  return `radial-gradient(circle at ${mx}% ${my}%, oklch(0 0 0 / 0.22) 0%, oklch(0 0 0 / 0.08) 4%, transparent 10%, oklch(1 0 0 / 0.16) 13%, transparent 22%)`;
}
