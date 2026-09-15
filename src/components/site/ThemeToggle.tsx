import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  try {
    localStorage.setItem("theme", dark ? "dark" : "light");
  } catch {
    // localStorage tidak tersedia (mode privat, dll) — abaikan.
  }
}

/**
 * Tombol mengambang (fixed terhadap viewport, bukan bagian dari header/nav)
 * supaya selalu gampang dijangkau di layar mana pun — mobile maupun desktop —
 * tanpa harus buka menu hamburger dulu atau cuma muncul di breakpoint
 * tertentu seperti sebelumnya. Warnanya sengaja solid/opaque (bg-card,
 * bukan transparan menyatu ke header) karena sekarang bisa melayang di atas
 * section apa saja tergantung posisi scroll — perlu tetap kebaca sendiri
 * terlepas dari apa yang ada di belakangnya.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  return (
    <button
      type="button"
      aria-label={dark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
      onClick={() => {
        const next = !dark;
        setDark(next);
        applyTheme(next);
      }}
      className={cn(
        "fixed bottom-5 right-5 z-40 inline-flex size-12 items-center justify-center rounded-full border border-border bg-card text-primary shadow-[var(--shadow-lift)] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[var(--shadow-glow)] sm:bottom-6 sm:right-6",
        className,
      )}
    >
      {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </button>
  );
}
