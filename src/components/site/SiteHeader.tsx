import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo-ivet.png";

type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

const NAV: NavItem[] = [
  { label: "Beranda", href: "#beranda" },
  {
    label: "Profil",
    href: "#profil",
    children: [
      { label: "Visi & Misi", href: "#profil" },
      { label: "Dosen & Staf", href: "#dosen" },
    ],
  },
  {
    label: "Akademik",
    href: "#akademik",
    children: [
      { label: "Kurikulum", href: "#akademik" },
      { label: "Akreditasi", href: "#statistik" },
    ],
  },
  { label: "Kemahasiswaan", href: "#alumni" },
  { label: "Berita & Kegiatan", href: "#berita" },
  { label: "Kontak", href: "#kontak" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass-header py-2" : "bg-transparent py-4",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#beranda" className="flex items-center gap-3">
          <img src={logo} alt="Logo Universitas Ivet Semarang" width={44} height={44} className="h-10 w-10 object-contain" />
          <span className="leading-tight">
            <span
              className={cn(
                "block text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors",
                scrolled ? "text-muted-foreground" : "text-primary-foreground/70",
              )}
            >
              Universitas Ivet Semarang
            </span>
            <span
              className={cn(
                "block text-base font-bold tracking-tight transition-colors",
                scrolled ? "text-primary" : "text-primary-foreground",
              )}
            >
              Pendidikan Informatika
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <div key={item.label} className="group relative">
              <a
                href={item.href}
                className={cn(
                  "flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  scrolled
                    ? "text-foreground/75 hover:bg-secondary hover:text-primary"
                    : "text-primary-foreground/85 hover:bg-primary-foreground/10 hover:text-primary-foreground",
                )}
              >
                {item.label}
                {item.children ? <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" /> : null}
              </a>
              {item.children ? (
                <div className="invisible absolute left-0 top-full w-52 translate-y-2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-[var(--shadow-lift)]">
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="block rounded-xl px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="pmb" size="pill" className="hidden sm:inline-flex">
            <a href="#pmb">
              <GraduationCap /> Pendaftaran PMB
            </a>
          </Button>
          <button
            type="button"
            aria-label="Buka menu"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "inline-flex size-10 items-center justify-center rounded-full border transition-colors lg:hidden",
              scrolled
                ? "border-border text-primary hover:bg-secondary"
                : "border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10",
            )}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden lg:hidden"
          >
            <div className="mx-4 mt-3 rounded-3xl border border-border bg-card p-3 shadow-[var(--shadow-lift)]">
              {NAV.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
                >
                  {item.label}
                </a>
              ))}
              <Button asChild variant="pmb" size="pill" className="mt-2 w-full">
                <a href="#pmb" onClick={() => setOpen(false)}>
                  <GraduationCap /> Pendaftaran PMB
                </a>
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}