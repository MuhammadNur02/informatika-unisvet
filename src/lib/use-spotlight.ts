import type { PointerEvent } from "react";

/**
 * Handler untuk kartu `.spotlight` (pola SpotlightCard React Bits): posisi
 * pointer ditulis langsung ke CSS variable elemen, bukan ke state React —
 * jadi menggerakkan mouse tidak memicu re-render sama sekali.
 */
export function onSpotlightMove(e: PointerEvent<HTMLElement>) {
  if (e.pointerType !== "mouse") return;
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
  el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
}
