import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  MonitorPlay,
  Library,
  ShieldCheck,
  LayoutDashboard,
  Home,
  User,
  BookOpen,
  Users,
  FlaskConical,
  Info,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NAV } from "@/lib/site-nav";
import logo from "@/assets/logo-ivet.png";

const PORTALS = [
  { label: "SIAKAD", icon: LayoutDashboard, href: "https://siakad.ivet.ac.id" },
  { label: "E-Learning", icon: MonitorPlay, href: "https://elearning.ivet.ac.id" },
  { label: "E-Library", icon: Library, href: "https://library.ivet.ac.id" },
  { label: "SPMI Mutu", icon: ShieldCheck, href: "https://spmi.ivet.ac.id" },
];

const NAV_ICONS: Record<string, LucideIcon> = {
  Beranda: Home,
  Profil: User,
  Akademik: BookOpen,
  Kemahasiswaan: Users,
  "Riset & Inovasi": FlaskConical,
  Informasi: Info,
  PMB: GraduationCap,
};

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
    setOpenGroup(null);
  }, [pathname]);

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
      <AnimatePresence initial={false}>
        {!scrolled ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mx-auto mb-3 hidden max-w-7xl items-center justify-end gap-2 px-4 sm:px-6 md:flex lg:px-8">
              {PORTALS.map((p) => (
                <a
                  key={p.label}
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/15 bg-primary-foreground/8 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground/75 backdrop-blur-md transition-colors hover:border-accent/50 hover:text-accent"
                >
                  <p.icon className="size-3.5" /> {p.label}
                </a>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-primary-foreground shadow-[var(--shadow-card)]">
            <img
              src={logo}
              alt="Logo Universitas Ivet Semarang"
              width={44}
              height={44}
              className="h-9 w-9 object-contain"
            />
          </span>
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
            <span
              className={cn(
                "block text-[10px] font-medium tracking-wide transition-colors",
                scrolled ? "text-muted-foreground" : "text-primary-foreground/60",
              )}
            >
              UNISVET Semarang
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex">
          {NAV.map((item) => (
            <div key={item.label} className="group relative">
              <Link
                to={item.to}
                className={cn(
                  "flex items-center gap-1 rounded-full px-3 py-2 text-[13px] font-medium transition-colors",
                  scrolled
                    ? "text-foreground/75 hover:bg-secondary hover:text-primary"
                    : "text-primary-foreground/85 hover:bg-primary-foreground/10 hover:text-primary-foreground",
                )}
              >
                {item.label}
                {item.children ? (
                  <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" />
                ) : null}
              </Link>
              {item.children ? (
                <div className="invisible absolute left-0 top-full w-64 translate-y-2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-[var(--shadow-lift)]">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.to}
                        activeProps={{ className: "bg-secondary text-primary" }}
                        className="block rounded-xl px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="pmb" size="pill" className="pulse-glow hidden sm:inline-flex">
            <Link to="/pmb/daftar">
              <GraduationCap /> PMB UNISVET
            </Link>
          </Button>
          <button
            type="button"
            aria-label="Buka menu"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "inline-flex size-10 items-center justify-center rounded-full border transition-colors xl:hidden",
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
            className="overflow-hidden xl:hidden"
          >
            <div className="mx-4 mt-3 max-h-[70vh] overflow-y-auto rounded-3xl border border-border bg-card p-3 shadow-[var(--shadow-lift)]">
              {NAV.map((item) => (
                <div key={item.label}>
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-sm font-semibold text-foreground/85 transition-colors hover:bg-secondary hover:text-primary"
                  >
                    {item.label}
                  </Link>
                  {item.children ? (
                    <div className="mb-1 ml-4 border-l border-border pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.to}
                          onClick={() => setOpen(false)}
                          className="block rounded-xl px-3 py-2 text-[13px] text-muted-foreground transition-colors hover:text-primary"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2 border-t border-border pt-3">
                {PORTALS.map((p) => (
                  <a
                    key={p.label}
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-secondary px-3 py-2 text-xs font-semibold text-primary"
                  >
                    <p.icon className="size-3.5" /> {p.label}
                  </a>
                ))}
              </div>
              <Button asChild variant="pmb" size="pill" className="mt-3 w-full">
                <Link to="/pmb/daftar" onClick={() => setOpen(false)}>
                  <GraduationCap /> PMB UNISVET
                </Link>
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
