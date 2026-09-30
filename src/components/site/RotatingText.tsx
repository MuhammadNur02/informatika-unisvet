import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const INTERVAL = 3200;

/**
 * Kalimat yang bergantian dengan transisi blur-fade (pola RotatingText React
 * Bits, versi CSS murni). Semua kalimat dirender sekaligus & ditumpuk di satu
 * sel grid (.rotating-text), jadi tinggi judul SELALU setinggi kalimat
 * terpanjang — tidak ada lagi judul yang memanjang-memendek atau celah kosong
 * besar seperti efek ketik sebelumnya. SSR menampilkan kalimat pertama utuh.
 */
export function RotatingText({ items, className }: { items: string[]; className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") setIndex((i) => (i + 1) % items.length);
    }, INTERVAL);
    return () => window.clearInterval(id);
  }, [items.length]);

  // className (mis. text-gradient-gold) dipasang ke tiap kalimat, bukan ke
  // pembungkus: background-clip:text milik induk tidak ikut mewarnai teks
  // anak yang punya opacity/filter/translate sendiri.
  return (
    <span>
      <span className="rotating-text" aria-hidden>
        {items.map((item, i) => (
          <span key={item} data-active={i === index} className={cn(className)}>
            {item}
          </span>
        ))}
      </span>
      <span className="sr-only">{items.join(" — ")}</span>
    </span>
  );
}
