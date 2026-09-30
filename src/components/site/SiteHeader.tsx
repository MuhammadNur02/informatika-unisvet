import { useEffect, useState } from "react";
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
  Database,
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
import { SiteSearch } from "@/components/site/SiteSearch";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import logo from "@/assets/logo-unisvet.png";

const PORTALS = [
  { label: "SIveta", icon: LayoutDashboard, href: "https://siveta.unisvet.ac.id/" },
  { label: "Lentera", icon: MonitorPlay, href: "https://siveta.unisvet.ac.id/lentera" },
  { label: "E-Library", icon: Library, href: "https://eprint.ivet.ac.id" },
  { label: "SPMI Mutu", icon: ShieldCheck, href: "https://spmi.kemdiktisaintek.go.id/auth/login" },
];

/** Tautan milik prodi sendiri — ditonjolkan (warna emas) & dipisah dari portal universitas. */
const PUSAT_DATA = { label: "Pusat Data Prodi", href: "https://s.id/informatika-unisvet" };

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
    // Dibatasi satu kali per frame — event scroll bisa menembak puluhan kali per frame.
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 24));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      {/* Progress bar scroll: scroll-driven animation CSS (.scroll-progress),
          tanpa listener JS — di browser tanpa dukungan, bar tidak tampil. */}
      <div
        className="scroll-progress fixed inset-x-0 top-0 z-60 h-0.75 origin-left"
        style={{ backgroundImage: "var(--gradient-gold)" }}
        aria-hidden
      />
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[padding,background-color,box-shadow] duration-300",
          scrolled ? "glass-header py-2" : "bg-transparent py-4",
        )}
      >
        {/* Baris portal menyusut saat scroll — transisi grid-template-rows CSS. */}
        <div
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-300",
            scrolled ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100",
          )}
          inert={scrolled}
        >
            <div className="overflow-hidden">
              <div className="mx-auto mb-3 hidden max-w-7xl items-center justify-end gap-2 px-4 sm:px-6 md:flex lg:px-8">
                <a
                  href={PUSAT_DATA.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-accent/45 bg-accent/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-accent backdrop-blur-md transition-colors hover:border-accent hover:bg-accent/25"
                >
                  <Database className="size-3.5" /> {PUSAT_DATA.label}
                </a>
                <span className="mx-1 h-4 w-px bg-hero-foreground/20" aria-hidden />
                {PORTALS.map((p) => (
                  <a
                    key={p.label}
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-hero-foreground/15 bg-hero-foreground/8 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-hero-foreground/75 backdrop-blur-md transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    <p.icon className="size-3.5" /> {p.label}
                  </a>
                ))}
              </div>
            </div>
        </div>

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <span className="inline-flex size-12 shrink-0 sm:size-14 items-center justify-center rounded-2xl bg-hero-foreground shadow-[var(--shadow-card)]">
              <img
                src={logo}
                alt="Logo Universitas Ivet Semarang"
                width={56}
                height={56}
                className="h-9 w-9 object-contain sm:h-11 sm:w-11"
              />
            </span>
            <span className="min-w-0 leading-tight">
              <span
                className={cn(
                  "block truncate text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors sm:text-[11px] sm:tracking-[0.18em]",
                  scrolled ? "text-muted-foreground" : "text-hero-foreground/70",
                )}
              >
                Universitas Ivet Semarang
              </span>
              <span
                className={cn(
                  "block truncate text-[15px] font-bold tracking-tight transition-colors sm:text-base",
                  scrolled ? "text-primary" : "text-hero-foreground",
                )}
              >
                Pendidikan Informatika
              </span>
              <span
                className={cn(
                  "hidden text-[10px] font-medium tracking-wide transition-colors sm:block",
                  scrolled ? "text-muted-foreground" : "text-hero-foreground/60",
                )}
              >
                UNISVET Semarang
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 xl:flex">
            {NAV.map((item) => {
              const active =
                pathname === item.to || (item.children?.some((c) => pathname === c.to) ?? false);
              return (
                <div key={item.label} className="group relative">
                  <Link
                    to={item.to}
                    className={cn(
                      "relative flex items-center gap-1 rounded-full px-3 py-2 text-[13px] font-medium transition-colors",
                      scrolled
                        ? active
                          ? "text-primary"
                          : "text-foreground/75 hover:bg-secondary hover:text-primary"
                        : active
                          ? "text-hero-foreground"
                          : "text-hero-foreground/85 hover:bg-hero-foreground/10 hover:text-hero-foreground",
                    )}
                  >
                    {item.label}
                    {item.children ? (
                      <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" />
                    ) : null}
                    <span
                      className={cn(
                        "absolute inset-x-3 -bottom-0.5 h-0.5 origin-center rounded-full bg-accent transition-transform duration-300",
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-60",
                      )}
                      aria-hidden
                    />
                  </Link>
                  {item.children ? (
                    <div className="invisible absolute left-0 top-full w-64 translate-y-2 pt-2 opacity-0 transition-[opacity,translate,visibility] duration-200 group-hover:visible group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100">
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
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            {/* Di HP pencarian ada di dalam menu, supaya nama prodi muat satu baris. */}
            <div className="hidden sm:block">
              <SiteSearch
                className={cn(
                  scrolled
                    ? "text-primary hover:bg-secondary"
                    : "text-hero-foreground hover:bg-hero-foreground/10",
                )}
              />
            </div>
            <ThemeToggle
              variant="inline"
              className={cn(
                scrolled
                  ? "border-border text-primary hover:bg-secondary"
                  : "border-hero-foreground/25 text-hero-foreground hover:bg-hero-foreground/10",
              )}
            />
            <Button asChild variant="pmb" size="pill" className="pulse-glow hidden sm:inline-flex">
              <Link to="/pmb/daftar">
                <GraduationCap /> PMB UNISVET
              </Link>
            </Button>
            <button
              type="button"
              aria-label={open ? "Tutup menu" : "Buka menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className={cn(
                "inline-flex size-10 items-center justify-center rounded-full border transition-colors xl:hidden",
                scrolled
                  ? "border-border text-primary hover:bg-secondary"
                  : "border-hero-foreground/25 text-hero-foreground hover:bg-hero-foreground/10",
              )}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        <div
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-300 ease-out xl:hidden",
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
          inert={!open}
        >
            <div className="overflow-hidden">
              <div className="mx-4 mt-3 max-h-[72vh] space-y-2 overflow-y-auto rounded-3xl border border-border bg-card p-3 shadow-[var(--shadow-lift)]">
                {NAV.map((item) => {
                  const Icon = NAV_ICONS[item.label] ?? Info;
                  const expanded = openGroup === item.label;
                  const groupActive =
                    pathname === item.to ||
                    (item.children?.some((c) => pathname === c.to) ?? false);

                  if (!item.children) {
                    return (
                      <Link
                        key={item.label}
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-2xl border border-border/70 bg-card px-4 py-3 text-[15px] font-semibold shadow-[var(--shadow-card)] transition-colors",
                          groupActive ? "text-primary" : "text-foreground/85 hover:text-primary",
                        )}
                      >
                        <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                          <Icon className="size-4" />
                        </span>
                        <span className="min-w-0 truncate">{item.label}</span>
                      </Link>
                    );
                  }

                  return (
                    <div
                      key={item.label}
                      className={cn(
                        "overflow-hidden rounded-2xl border bg-card shadow-[var(--shadow-card)] transition-colors",
                        expanded || groupActive ? "border-accent/50" : "border-border/70",
                      )}
                    >
                      <button
                        type="button"
                        aria-expanded={expanded}
                        onClick={() => setOpenGroup(expanded ? null : item.label)}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-[15px] font-semibold text-foreground/85 transition-colors hover:text-primary"
                      >
                        <span
                          className={cn(
                            "inline-flex size-8 shrink-0 items-center justify-center rounded-full transition-colors",
                            expanded || groupActive
                              ? "bg-accent/15 text-accent-foreground"
                              : "bg-secondary text-primary",
                          )}
                        >
                          <Icon className="size-4" />
                        </span>
                        <span className="min-w-0 flex-1 truncate">{item.label}</span>
                        <ChevronDown
                          className={cn(
                            "size-4 shrink-0 text-muted-foreground transition-transform duration-300",
                            expanded && "rotate-180 text-primary",
                          )}
                        />
                      </button>

                      <div
                        className={cn(
                          "grid transition-[grid-template-rows,opacity] duration-300",
                          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                        )}
                        inert={!expanded}
                      >
                          <div className="overflow-hidden">
                            <div className="relative mx-3 mb-3 ml-[27px] space-y-0.5 pl-4 before:absolute before:bottom-2 before:left-0 before:top-2 before:w-px before:bg-gradient-to-b before:from-accent/50 before:via-border before:to-transparent before:content-['']">
                              {item.children.map((child) => {
                                const active = pathname === child.to;
                                return (
                                  <Link
                                    key={child.label}
                                    to={child.to}
                                    onClick={() => setOpen(false)}
                                    className={cn(
                                      "group relative flex items-center gap-2 rounded-xl px-3 py-2 text-[13.5px] transition-colors duration-200",
                                      active
                                        ? "bg-secondary font-semibold text-primary"
                                        : "text-muted-foreground hover:bg-secondary/60 hover:text-primary",
                                    )}
                                  >
                                    <span
                                      className={cn(
                                        "absolute -left-4 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors",
                                        active ? "bg-accent" : "bg-border group-hover:bg-accent/70",
                                      )}
                                    />
                                    <ChevronRight className="size-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 data-[active=true]:opacity-100" />
                                    <span className="min-w-0 truncate">{child.label}</span>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                      </div>
                    </div>
                  );
                })}
                <div className="mt-2 grid grid-cols-2 gap-2 border-t border-border pt-3">
                  <a
                    href={PUSAT_DATA.href}
                    target="_blank"
                    rel="noreferrer"
                    className="col-span-2 inline-flex items-center justify-center gap-2 rounded-xl border border-accent/50 bg-accent/15 px-3 py-2.5 text-xs font-semibold text-accent-foreground"
                  >
                    <Database className="size-3.5" /> {PUSAT_DATA.label}
                  </a>
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
                <SiteSearch compact />
                <Button asChild variant="pmb" size="pill" className="mt-3 w-full">
                  <Link to="/pmb/daftar" onClick={() => setOpen(false)}>
                    <GraduationCap /> PMB UNISVET
                  </Link>
                </Button>
              </div>
            </div>
        </div>
      </header>
    </>
  );
}
