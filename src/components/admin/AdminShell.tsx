import { Link, useNavigate } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  FileText,
  FolderOpen,
  Home,
  Images,
  LayoutDashboard,
  LogOut,
  Menu,
  Newspaper,
  ShieldCheck,
  X,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  description: string;
  icon: typeof Images;
  id: string;
};

const NAV: NavItem[] = [
  { id: "ringkasan", label: "Ringkasan", description: "Statistik singkat", icon: LayoutDashboard },
  { id: "beranda", label: "Beranda & Footer", description: "Hero, statistik & kontak", icon: Home },
  { id: "berita", label: "Berita & Agenda", description: "Tulis & unggah berita", icon: Newspaper },
  { id: "galeri", label: "Galeri Kegiatan", description: "Unggah & kelola foto", icon: Images },
  { id: "konten", label: "Editor Konten", description: "Teks, foto & video halaman", icon: FileText },
  { id: "media", label: "Pustaka Media", description: "Unggah foto & video", icon: FolderOpen },
];

export function AdminShell({
  email,
  isAdmin,
  active,
  onNavigate,
  children,
}: {
  email: string;
  isAdmin: boolean;
  active: string;
  onNavigate: (id: string) => void;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/admin/login", replace: true });
  }

  const initials = email.slice(0, 2).toUpperCase();

  const nav = (
    <nav className="space-y-1.5">
      {NAV.map((item, index) => {
        const isActive = active === item.id;
        return (
          <motion.button
            key={item.id}
            type="button"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * index, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => {
              onNavigate(item.id);
              setMobileOpen(false);
            }}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "group relative flex w-full items-start gap-3 rounded-2xl px-3.5 py-3 text-left transition-all duration-300",
              isActive
                ? "bg-primary-foreground/10 text-primary-foreground shadow-[inset_0_0_0_1px_oklch(0.79_0.15_78/0.35)]"
                : "text-primary-foreground/65 hover:bg-primary-foreground/5 hover:text-primary-foreground",
            )}
          >
            {isActive ? (
              <motion.span
                layoutId="admin-nav-marker"
                className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-full bg-accent"
              />
            ) : null}
            <span
              className={cn(
                "mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "bg-primary-foreground/10 text-primary-foreground/70 group-hover:bg-primary-foreground/15",
              )}
            >
              <item.icon className="size-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold">{item.label}</span>
              <span className="block text-xs text-primary-foreground/50">{item.description}</span>
            </span>
          </motion.button>
        );
      })}
    </nav>
  );

  const sidebarInner = (
    <div className="flex h-full flex-col gap-6 p-5">
      <Link to="/" className="flex items-center gap-3 rounded-2xl p-1 transition-opacity hover:opacity-85">
        <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-accent">
          <ShieldCheck className="size-5 text-accent-foreground" />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-extrabold tracking-tight text-primary-foreground">
            Panel Pengelola
          </span>
          <span className="block truncate text-xs text-primary-foreground/55">Pend. Informatika UNISVET</span>
        </span>
      </Link>

      {nav}

      <div className="mt-auto space-y-3">
        <Link
          to="/informasi/galeri"
          className="flex items-center justify-between gap-2 rounded-2xl border border-primary-foreground/15 px-3.5 py-3 text-xs font-semibold text-primary-foreground/75 transition-all duration-300 hover:border-accent/50 hover:text-primary-foreground"
        >
          Lihat halaman publik
          <ExternalLink className="size-3.5" />
        </Link>
        <div className="rounded-2xl border border-primary-foreground/12 bg-primary-foreground/5 p-3.5">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
              {initials}
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-primary-foreground">{email}</p>
              <p className="text-[11px] text-primary-foreground/55">
                {isAdmin ? "Admin Prodi" : "Akses terbatas"}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSignOut}
            className="mt-3 w-full border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <LogOut /> Keluar
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-surface">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 bg-hero-gradient lg:block">
        <div className="h-full">{sidebarInner}</div>
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-primary-deep/60 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 left-0 z-50 w-[86%] max-w-xs bg-hero-gradient lg:hidden"
            >
              <button
                type="button"
                aria-label="Tutup menu"
                onClick={() => setMobileOpen(false)}
                className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground"
              >
                <X className="size-4" />
              </button>
              <div className="h-full">{sidebarInner}</div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>

      <div className="lg:pl-72">
        <header className="glass-header sticky top-0 z-30">
          <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3.5 sm:px-6">
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden"
              aria-label="Buka menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu />
            </Button>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Dashboard
              </p>
              <h1 className="truncate text-base font-bold tracking-tight text-foreground sm:text-lg">
                {NAV.find((n) => n.id === active)?.label ?? "Ringkasan"}
              </h1>
            </div>
            <span
              className={cn(
                "hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold sm:inline-flex",
                isAdmin
                  ? "bg-accent/15 text-accent-foreground"
                  : "bg-destructive/10 text-destructive",
              )}
            >
              <ShieldCheck className="size-3.5" />
              {isAdmin ? "Terverifikasi Admin" : "Tanpa hak admin"}
            </span>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6">{children}</main>
      </div>
    </div>
  );
}
