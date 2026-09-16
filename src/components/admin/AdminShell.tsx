import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  FileDown,
  FileText,
  FolderOpen,
  Home,
  Images,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  KeyRound,
  Newspaper,
  ShieldCheck,
  X,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import Silk from "@/components/site/Silk";
import { ADMIN_SILK_PROPS } from "@/components/admin/admin-silk-config";
import { AdminMarquee } from "@/components/admin/AdminMarquee";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  description: string;
  icon: typeof Images;
  id: string;
  group: string;
};

const NAV: NavItem[] = [
  {
    id: "ringkasan",
    label: "Ringkasan",
    description: "Statistik singkat",
    icon: LayoutDashboard,
    group: "Utama",
  },
  {
    id: "beranda",
    label: "Beranda & Footer",
    description: "Hero, statistik & kontak",
    icon: Home,
    group: "Halaman",
  },
  {
    id: "konten",
    label: "Editor Konten",
    description: "Teks, foto & video halaman",
    icon: FileText,
    group: "Halaman",
  },
  {
    id: "berita",
    label: "Berita & Agenda",
    description: "Tulis & unggah berita",
    icon: Newspaper,
    group: "Publikasi",
  },
  {
    id: "galeri",
    label: "Galeri Kegiatan",
    description: "Unggah & kelola foto",
    icon: Images,
    group: "Publikasi",
  },
  {
    id: "media",
    label: "Pustaka Media",
    description: "Unggah foto & video",
    icon: FolderOpen,
    group: "Publikasi",
  },
  {
    id: "dokumen",
    label: "Dokumen Unduhan",
    description: "Unggah PDF & formulir",
    icon: FileDown,
    group: "Publikasi",
  },
  {
    id: "pesan",
    label: "Pesan Masuk",
    description: "Pesan dari formulir kontak",
    icon: Inbox,
    group: "Layanan",
  },
  {
    id: "akun",
    label: "Akun Saya",
    description: "Ubah kata sandi sendiri",
    icon: KeyRound,
    group: "Layanan",
  },
];

export function AdminShell({
  email,
  isAdmin,
  active,
  onNavigate,
  badges,
  children,
}: {
  email: string;
  isAdmin: boolean;
  active: string;
  onNavigate: (id: string) => void;
  badges?: Record<string, number>;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  // KRUSIAL: dipasang di <html> (documentElement), BUKAN <body> — sebelumnya di body,
  // dan itu bug besar penyebab teks/tombol dashboard sering kelihatan gelap/tak rapi.
  // Sebabnya: token Tailwind semantik (bg-card, text-foreground, bg-background, dst.)
  // dijembatani lewat "@theme inline" jadi var(--color-foreground): var(--foreground)
  // yang dideklarasikan SEKALI di :root (= <html>). Custom property yang di-inherit
  // turun ke anak itu MEMBAWA NILAI YANG SUDAH DIHITUNG di leluhur tempat ia
  // dideklarasikan, bukan dihitung ulang di tiap elemen turunan — jadi kalau
  // ".admin-theme" cuma override "--foreground" di <body> (satu level DI BAWAH
  // <html> tempat "--color-foreground" dihitung), utility seperti text-foreground/
  // bg-card di seluruh dashboard diam-diam tetap pakai warna tema TERANG/GELAP situs
  // publik (apa pun toggle terang/gelap terakhir pengguna), bukan palet admin — baru
  // kelihatan kalau .dark JUGA kebetulan aktif di <html>. Dipasang di <html> supaya
  // override-nya kejadian di elemen yang SAMA dengan tempat "--color-*" dihitung.
  // Dialog/toast yang di-render lewat portal ke <body> tetap kena juga (body tetap
  // anak <html>, jadi cascade custom property tetap turun ke situ seperti biasa).
  useEffect(() => {
    document.documentElement.classList.add("admin-theme");
    return () => document.documentElement.classList.remove("admin-theme");
  }, []);

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/admin/login", replace: true });
  }

  const initials = email.slice(0, 2).toUpperCase();

  const groups = NAV.reduce<{ group: string; items: NavItem[] }[]>((acc, item) => {
    const found = acc.find((g) => g.group === item.group);
    if (found) found.items.push(item);
    else acc.push({ group: item.group, items: [item] });
    return acc;
  }, []);

  let navIndex = -1;
  const nav = (
    <nav className="space-y-5" onMouseLeave={() => setHoveredNav(null)}>
      {groups.map((group) => (
        <div key={group.group} className="space-y-1.5">
          <p className="px-3.5 text-[10px] font-bold uppercase tracking-[0.22em] text-hero-foreground/40">
            {group.group}
          </p>
          {group.items.map((item) => {
            const isActive = active === item.id;
            // Sorotan (background, marker, ikon) ikut kursor saat hover
            // (tanpa klik) — kembali ke menu yang benar-benar aktif begitu
            // pointer keluar dari daftar menu, sama seperti pola navbar
            // situs publik & tab kategori berita.
            const isIndicated = (hoveredNav ?? active) === item.id;
            navIndex += 1;
            const index = navIndex;
            return (
              <motion.button
                key={item.id}
                type="button"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredNav(item.id)}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileOpen(false);
                }}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group relative flex w-full items-start gap-3 rounded-2xl px-3.5 py-3 text-left transition-all duration-300",
                  isIndicated
                    ? "bg-hero-foreground/10 text-hero-foreground shadow-[inset_0_0_0_1px_oklch(0.79_0.15_78/0.35)]"
                    : "text-hero-foreground/65 hover:bg-hero-foreground/5 hover:text-hero-foreground",
                )}
              >
                {isIndicated ? (
                  <motion.span
                    layoutId="admin-nav-marker"
                    className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <span
                  className={cn(
                    "mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
                    isIndicated
                      ? "bg-accent text-accent-foreground"
                      : "bg-hero-foreground/10 text-hero-foreground/70 group-hover:bg-hero-foreground/15",
                  )}
                >
                  <item.icon className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="block text-sm font-semibold">{item.label}</span>
                    {badges?.[item.id] ? (
                      <span className="inline-flex size-4.5 shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                        {badges[item.id]}
                      </span>
                    ) : null}
                  </span>
                  <span className="block text-xs text-hero-foreground/50">{item.description}</span>
                </span>
              </motion.button>
            );
          })}
        </div>
      ))}
    </nav>
  );

  const sidebarInner = (
    <div className="flex h-full flex-col gap-6 p-5">
      <Link
        to="/"
        className="flex items-center gap-3 rounded-2xl p-1 transition-opacity hover:opacity-85"
      >
        <span className="inline-flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-accent p-1.5">
          <img
            src="/favicon.png"
            alt="Logo Universitas Ivet Semarang"
            className="h-full w-full object-contain"
          />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-extrabold tracking-tight text-hero-foreground">
            Panel Pengelola
          </span>
          <span className="block truncate text-xs text-hero-foreground/55">
            Pend. Informatika UNISVET
          </span>
        </span>
      </Link>

      {nav}

      <div className="mt-auto space-y-3">
        <Link
          to="/informasi/galeri"
          className="flex items-center justify-between gap-2 rounded-2xl border border-hero-foreground/15 px-3.5 py-3 text-xs font-semibold text-hero-foreground/75 transition-all duration-300 hover:border-accent/50 hover:text-hero-foreground"
        >
          Lihat halaman publik
          <ExternalLink className="size-3.5" />
        </Link>
        <div className="rounded-2xl border border-hero-foreground/12 bg-hero-foreground/5 p-3.5">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
              {initials}
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-hero-foreground">{email}</p>
              <p className="text-[11px] text-hero-foreground/55">
                {isAdmin ? "Admin Prodi" : "Akses terbatas"}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSignOut}
            className="mt-3 w-full border-hero-foreground/20 bg-transparent text-hero-foreground hover:bg-hero-foreground/10 hover:text-hero-foreground"
          >
            <LogOut /> Keluar
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-surface">
      {/* Satu latar Silk (React Bits) yang tenang, senada dengan admin.login.tsx
          — ganti kombinasi starfield + ember sebelumnya yang ramai & kurang
          rapi untuk latar persisten di belakang sidebar/tabel/form kerja.
          Opacity diturunkan (beda dari login) — ini area kerja padat berisi
          tabel & form yang butuh fokus, jadi teksturnya cuma nuansa halus di
          celah antar kartu, bukan pola yang mencolok. */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-60" aria-hidden>
        <Silk {...ADMIN_SILK_PROPS} />
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-slate-surface/40" aria-hidden />

      {/* Desktop sidebar — bisa disembunyikan lewat tombol menu di header */}
      <motion.aside
        initial={false}
        animate={{ x: desktopSidebarOpen ? 0 : "-100%" }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-y-0 left-0 z-40 hidden w-72 bg-hero-gradient lg:block"
      >
        <div className="h-full overflow-y-auto">{sidebarInner}</div>
      </motion.aside>

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
                className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full bg-hero-foreground/10 text-hero-foreground"
              >
                <X className="size-4" />
              </button>
              <div className="h-full overflow-y-auto">{sidebarInner}</div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>

      {/* "relative z-10" krusial di sini — tanpa ini, div ini (dan <main> di
          dalamnya) tetap "position: static" alias TIDAK punya stacking context
          sendiri, jadi tergambar di layer paling belakang (di BAWAH latar Silk
          "fixed z-0" di atas walau z-0 kelihatannya "netral") — persis
          penyebab semua kartu/form dashboard sempat terlihat pudar tertimpa
          tekstur latar. header di dalamnya sudah z-30 sendiri, tapi <main>
          butuh ini juga karena tidak punya z-index eksplisit. */}
      <div
        className={cn(
          "relative z-10 transition-[padding-left] duration-300 ease-out",
          desktopSidebarOpen ? "lg:pl-72" : "lg:pl-0",
        )}
      >
        <header className="admin-glass-header sticky top-0 z-30">
          <div className="mx-auto flex max-w-[1600px] items-center gap-2 px-4 py-3.5 sm:px-6">
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden"
              aria-label="Buka menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="hidden lg:inline-flex"
              aria-label={desktopSidebarOpen ? "Sembunyikan menu" : "Tampilkan menu"}
              onClick={() => setDesktopSidebarOpen((v) => !v)}
            >
              <Menu />
            </Button>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {NAV.find((n) => n.id === active)?.group ?? "Dashboard"}
              </p>
              <h1 className="truncate text-base font-bold tracking-tight text-foreground sm:text-lg">
                {NAV.find((n) => n.id === active)?.label ?? "Ringkasan"}
              </h1>
              <p className="hidden truncate text-xs text-muted-foreground sm:block">
                {NAV.find((n) => n.id === active)?.description ?? ""}
              </p>
            </div>
            <Link
              to="/"
              className="hidden items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-accent/60 hover:text-primary md:inline-flex"
            >
              Lihat situs <ExternalLink className="size-3.5" />
            </Link>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold",
                isAdmin
                  ? "bg-emerald-500/15 text-emerald-400"
                  : "bg-destructive/10 text-destructive",
              )}
            >
              <ShieldCheck className="size-3.5" />
              <span className="hidden sm:inline">
                {isAdmin ? "Terverifikasi Admin" : "Tanpa hak admin"}
              </span>
            </span>
          </div>

          <AdminMarquee />
        </header>

        <main className="mx-auto max-w-[1600px] px-4 pb-16 pt-8 sm:px-6">{children}</main>
      </div>
    </div>
  );
}
