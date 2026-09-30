import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Satu IntersectionObserver dipakai bersama oleh semua <Reveal> di halaman —
 * bukan satu observer per elemen seperti whileInView framer-motion.
 */
const callbacks = new WeakMap<Element, () => void>();
let sharedObserver: IntersectionObserver | null = null;

function getObserver() {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          callbacks.get(entry.target)?.();
          callbacks.delete(entry.target);
          sharedObserver?.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -60px 0px" },
    );
  }
  return sharedObserver;
}

/**
 * Animasi muncul saat scroll, tanpa framer-motion. Konten SELALU terlihat di
 * HTML hasil SSR — sebelumnya motion.div merender `opacity:0` dari server,
 * sehingga di HP lambat seluruh halaman kosong sampai JavaScript selesai
 * dimuat. Sekarang, setelah hydrate, hanya elemen yang masih di bawah layar
 * yang disembunyikan (.reveal-pending) lalu dimunculkan saat masuk viewport.
 * Elemen yang sudah terlihat tidak pernah disembunyikan (tidak ada kedipan).
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.classList.add("reveal-pending");
    const observer = getObserver();
    callbacks.set(el, () => el.classList.remove("reveal-pending"));
    observer.observe(el);
    return () => {
      callbacks.delete(el);
      observer.unobserve(el);
      el.classList.remove("reveal-pending");
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={{ "--reveal-y": `${y}px`, "--reveal-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-accent-foreground">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance text-foreground sm:text-4xl xl:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-base leading-relaxed text-pretty text-muted-foreground xl:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
