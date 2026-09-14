import { useEffect, useRef, useState, type ReactNode } from "react";
import { StarField } from "./StarField";

/**
 * Bungkus beberapa section beranda sekaligus supaya langit berbintang
 * (fixed, tetap diam saat digulir) hanya menyala selama pengunjung berada
 * di rentang section ini — bukan di seluruh halaman.
 */
export function StarFieldRegion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inRegion, setInRegion] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => setInRegion(entries[0]?.isIntersecting ?? false),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative">
      <StarField visible={inRegion} />
      {children}
    </div>
  );
}
