import { useEffect, useState } from "react";

/**
 * Sinkron ke class "dark" di <html> yang di-toggle ThemeToggle. Tidak ada
 * event/context bersama untuk perubahan tema di app ini, jadi dipantau
 * langsung lewat MutationObserver supaya nilainya ikut berubah seketika saat
 * tema di-toggle, bukan cuma pas komponen di-mount ulang.
 */
export function useIsDarkMode() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    setDark(root.classList.contains("dark"));
    const observer = new MutationObserver(() => setDark(root.classList.contains("dark")));
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return dark;
}
