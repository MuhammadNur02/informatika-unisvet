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
 * Tombol terang/gelap. Varian "inline" dipasang di SiteHeader (header-nya
 * fixed, jadi tetap selalu terjangkau). Varian "floating" dulu melayang di
 * pojok kanan bawah, tapi di HP menutupi foto hero & konten lain.
 */
export function ThemeToggle({
  className,
  variant = "floating",
}: {
  className?: string;
  variant?: "floating" | "inline";
}) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  return (
    <button
      type="button"
      aria-label={dark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
      aria-pressed={dark}
      onClick={() => {
        const next = !dark;
        setDark(next);
        applyTheme(next);
      }}
      className={cn(
        variant === "inline"
          ? "inline-flex size-10 shrink-0 items-center justify-center rounded-full border transition-colors"
          : "fixed bottom-5 right-5 z-40 inline-flex size-12 items-center justify-center rounded-full border border-border bg-card text-primary shadow-[var(--shadow-lift)] transition-[translate,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[var(--shadow-glow)] sm:bottom-6 sm:right-6",
        className,
      )}
    >
      {dark ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
    </button>
  );
}
