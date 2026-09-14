import { useEffect, useState } from "react";

const TYPE_SPEED = 55;
const DELETE_SPEED = 28;
const PAUSE_AFTER_TYPE = 2000;
const PAUSE_AFTER_DELETE = 350;

type Phase = "typing" | "pausing" | "deleting";

/**
 * Judul yang bergantian tampil dengan animasi ketik lalu hapus, lalu lanjut
 * ke judul berikutnya (berulang terus). Render awal (server & client) selalu
 * menampilkan judul pertama secara utuh, jadi tidak ada kedipan saat
 * hydration — animasi baru mulai jalan lewat useEffect (hanya berjalan di
 * client, tidak pernah saat SSR). Menghormati prefers-reduced-motion: kalau
 * aktif, judul pertama ditampilkan statis tanpa animasi.
 *
 * State fase (typing/pausing/deleting) dibuat eksplisit, bukan disimpulkan
 * dari panjang teks — membandingkan panjang teks saat ini terhadap target
 * saja ambigu: teks yang sedang DIHAPUS dan teks yang sedang DIKETIK bisa
 * sama-sama "lebih pendek dari target", jadi tanpa fase eksplisit animasi
 * bisa balik lagi mengetik ulang karakter yang baru saja dihapus.
 */
export function TypewriterText({ items, className = "" }: { items: string[]; className?: string }) {
  const [text, setText] = useState(items[0] ?? "");
  const [itemIndex, setItemIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>(items.length > 1 ? "pausing" : "typing");

  useEffect(() => {
    if (items.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const current = items[itemIndex] ?? "";

    if (phase === "typing") {
      if (text.length < current.length) {
        const t = setTimeout(() => setText(current.slice(0, text.length + 1)), TYPE_SPEED);
        return () => clearTimeout(t);
      }
      setPhase("pausing");
      return;
    }

    if (phase === "pausing") {
      const t = setTimeout(() => setPhase("deleting"), PAUSE_AFTER_TYPE);
      return () => clearTimeout(t);
    }

    // phase === "deleting"
    if (text.length > 0) {
      const t = setTimeout(() => setText(text.slice(0, -1)), DELETE_SPEED);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setItemIndex((i) => (i + 1) % items.length);
      setPhase("typing");
    }, PAUSE_AFTER_DELETE);
    return () => clearTimeout(t);
  }, [text, itemIndex, phase, items]);

  return (
    <span className={className}>
      <span aria-hidden>
        {text}
        <span className="typewriter-cursor" />
      </span>
      <span className="sr-only">{items.join(" — ")}</span>
    </span>
  );
}
