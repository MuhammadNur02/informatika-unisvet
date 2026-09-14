import { createFileRoute, redirect } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  FileDown,
  FileText,
  FolderOpen,
  ImagePlus,
  Images,
  Inbox,
  Newspaper,
  ShieldAlert,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AdminShell } from "@/components/admin/AdminShell";
import { PageEditor } from "@/components/admin/PageEditor";
import { MediaLibrary } from "@/components/admin/MediaLibrary";
import { BeritaEditor } from "@/components/admin/BeritaEditor";
import { BerandaEditor } from "@/components/admin/BerandaEditor";
import { DokumenManager } from "@/components/admin/DokumenManager";
import { PesanInbox } from "@/components/admin/PesanInbox";
import { AccountSettings } from "@/components/admin/AccountSettings";
import { GalleryManager } from "@/components/admin/GalleryManager";
import { fetchGaleri } from "@/lib/galeri";
import { fetchBeritaAdmin } from "@/lib/berita";
import { fetchDokumen } from "@/lib/dokumen";
import { fetchPesan } from "@/lib/kontak";
import { editablePaths, fetchEditedPaths, fetchMedia } from "@/lib/cms";

export const Route = createFileRoute("/admin/dashboard")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Dashboard Pengelola — Pendidikan Informatika UNISVET" },
      {
        name: "description",
        content: "Kelola seluruh konten Program Studi Pendidikan Informatika UNISVET: beranda, halaman, berita, galeri, dokumen, dan pesan masuk.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/admin/login" });
    return { user: data.user };
  },
  component: AdminDashboard,
});

const ease = [0.22, 1, 0.36, 1] as const;

function AdminDashboard() {
  const { user } = Route.useRouteContext();
  const [section, setSection] = useState("ringkasan");

  const roleQuery = useQuery({
    queryKey: ["is-admin", user.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (error) throw error;
      return Boolean(data);
    },
  });

  const totalPages = useMemo(() => editablePaths().length, []);
  const galeriQuery = useQuery({ queryKey: ["galeri"], queryFn: fetchGaleri });
  const beritaQuery = useQuery({ queryKey: ["berita-admin"], queryFn: fetchBeritaAdmin });
  const dokumenQuery = useQuery({ queryKey: ["dokumen"], queryFn: fetchDokumen });
  const pesanQuery = useQuery({ queryKey: ["pesan-kontak"], queryFn: fetchPesan });
  const editedPathsQuery = useQuery({ queryKey: ["edited-paths"], queryFn: fetchEditedPaths });
  const mediaQuery = useQuery({ queryKey: ["media"], queryFn: fetchMedia });

  const belumDibaca = (pesanQuery.data ?? []).filter((p) => !p.dibaca).length;
  const beritaTerbit = (beritaQuery.data ?? []).filter((b) => b.published).length;
  const statsLoading =
    galeriQuery.isLoading ||
    beritaQuery.isLoading ||
    dokumenQuery.isLoading ||
    pesanQuery.isLoading ||
    editedPathsQuery.isLoading ||
    mediaQuery.isLoading;

  const stats = [
    {
      label: "Berita Diterbitkan",
      value: String(beritaTerbit),
      icon: Newspaper,
      hint: `${(beritaQuery.data ?? []).length - beritaTerbit} draf belum terbit`,
    },
    {
      label: "Pesan Belum Dibaca",
      value: String(belumDibaca),
      icon: Inbox,
      hint: `Dari total ${(pesanQuery.data ?? []).length} pesan masuk`,
      alert: belumDibaca > 0,
    },
    {
      label: "Halaman Prodi Diedit",
      value: `${(editedPathsQuery.data ?? []).length}/${totalPages}`,
      icon: FileText,
      hint: "Sisanya masih memakai konten bawaan",
    },
    {
      label: "Foto Galeri",
      value: String((galeriQuery.data ?? []).length),
      icon: Images,
      hint: "Tampil di halaman publik",
    },
    {
      label: "Dokumen Diunggah",
      value: String((dokumenQuery.data ?? []).length),
      icon: FileDown,
      hint: "Siap diunduh publik",
    },
    {
      label: "Pustaka Media",
      value: String((mediaQuery.data ?? []).length),
      icon: FolderOpen,
      hint: "Untuk konten halaman & beranda",
    },
  ];

  const quickActions = [
    { id: "beranda", label: "Beranda & Footer", desc: "Ubah hero, statistik, kontak" },
    { id: "konten", label: "Editor Konten", desc: "Isi semua halaman prodi" },
    { id: "berita", label: "Berita & Agenda", desc: "Tulis & terbitkan berita" },
    { id: "galeri", label: "Galeri Kegiatan", desc: "Unggah & kelola foto" },
    { id: "dokumen", label: "Dokumen Unduhan", desc: "Unggah PDF & formulir" },
    {
      id: "pesan",
      label: "Pesan Masuk",
      desc: belumDibaca > 0 ? `${belumDibaca} pesan belum dibaca` : "Pesan dari formulir kontak",
      alert: belumDibaca > 0,
    },
    { id: "media", label: "Pustaka Media", desc: "Unggah foto & video" },
  ];

  const isAdmin = roleQuery.data !== false;

  return (
    <AdminShell
      email={user.email ?? "Pengelola"}
      isAdmin={isAdmin}
      active={section}
      onNavigate={setSection}
      badges={{ pesan: belumDibaca }}
    >
      <AnimatePresence>
        {roleQuery.data === false ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex gap-3 rounded-2xl border border-destructive/40 bg-destructive/10 p-5"
          >
            <ShieldAlert className="mt-0.5 size-5 shrink-0 text-destructive" />
            <div className="text-sm text-destructive">
              Akun ini belum memiliki hak admin, sehingga semua perubahan (simpan konten, unggah, hapus) akan
              ditolak. Hubungi pengelola utama untuk mengaktifkan peran admin.
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Ringkasan */}
      <AnimatePresence mode="wait">
        {section === "ringkasan" ? (
          <motion.div
            key="ringkasan"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease }}
            className="space-y-8"
          >
            <div className="relative overflow-hidden rounded-3xl bg-hero-gradient p-7 sm:p-9">
              <div className="pointer-events-none absolute inset-0 opacity-70" />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Selamat datang</p>
                <h2 className="mt-2 max-w-xl text-2xl font-extrabold tracking-tight text-primary-foreground sm:text-3xl">
                  Kelola konten prodi dengan tenang dan terarah
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-primary-foreground/70">
                  Semua perubahan yang Anda lakukan di sini langsung tampil pada halaman publik — beranda,
                  halaman prodi, berita, galeri, dokumen, hingga pesan masuk dari pengunjung.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setSection("konten")}
                    className="pulse-glow inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02]"
                  >
                    <ImagePlus className="size-4" /> Mulai Edit Konten
                  </button>
                </div>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {statsLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="card-elevated h-32 animate-pulse rounded-3xl bg-card" />
                  ))
                : stats.map((stat, i) => (
                    <motion.article
                      key={stat.label}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.45, ease }}
                      className={`card-elevated rounded-3xl bg-card p-6 ${
                        stat.alert ? "shadow-[inset_0_0_0_1px_oklch(0.79_0.15_78/0.45)]" : ""
                      }`}
                    >
                      <span
                        className={`inline-flex size-11 items-center justify-center rounded-2xl ${
                          stat.alert ? "bg-accent/15 text-accent-foreground" : "bg-secondary text-primary"
                        }`}
                      >
                        <stat.icon className="size-5" />
                      </span>
                      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        {stat.label}
                      </p>
                      <p className="mt-1.5 text-2xl font-extrabold tracking-tight text-foreground">{stat.value}</p>
                      <p className="mt-1 truncate text-xs text-muted-foreground">{stat.hint}</p>
                    </motion.article>
                  ))}
            </div>

            <div>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground">
                Menu Cepat
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {quickActions.map((action, i) => (
                  <motion.button
                    key={action.id}
                    type="button"
                    onClick={() => setSection(action.id)}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.4, ease }}
                    className={`card-elevated relative rounded-3xl bg-card p-5 text-left ${
                      action.alert ? "shadow-[inset_0_0_0_1px_oklch(0.79_0.15_78/0.45)]" : ""
                    }`}
                  >
                    {action.alert ? (
                      <span className="absolute right-4 top-4 size-2 rounded-full bg-accent" aria-hidden />
                    ) : null}
                    <p className="text-sm font-bold text-foreground">{action.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{action.desc}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-dashed border-border bg-card p-6">
              <h3 className="text-sm font-bold text-foreground">Panduan singkat</h3>
              <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground">
                {[
                  "Setiap perubahan langsung tampil di situs publik begitu tombol \"Simpan\" ditekan.",
                  "Ada tanda titik oranye di menu kalau ada perubahan yang belum disimpan atau pesan yang belum dibaca.",
                  "Tombol \"Kembalikan Konten Asli\" akan selalu meminta konfirmasi karena tidak bisa dibatalkan.",
                  "Kalau baru pertama kali login dan penyimpanan ditolak, pastikan akun Anda sudah diberi peran admin.",
                ].map((tip) => (
                  <li key={tip} className="flex gap-2.5">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ) : section === "galeri" ? (
          <motion.div key="galeri" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4, ease }}>
            <GalleryManager userId={user.id} />
          </motion.div>
        ) : section === "beranda" ? (
          <motion.div
            key="beranda"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease }}
          >
            <BerandaEditor userId={user.id} />
          </motion.div>
        ) : section === "berita" ? (
          <motion.div
            key="berita"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease }}
          >
            <BeritaEditor userId={user.id} />
          </motion.div>
        ) : section === "dokumen" ? (
          <motion.div
            key="dokumen"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease }}
          >
            <DokumenManager userId={user.id} />
          </motion.div>
        ) : section === "pesan" ? (
          <motion.div
            key="pesan"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease }}
          >
            <PesanInbox />
          </motion.div>
        ) : section === "akun" ? (
          <motion.div key="akun" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4, ease }}>
            <AccountSettings email={user.email ?? ""} />
          </motion.div>
        ) : section === "konten" ? (
          <motion.div
            key="konten"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease }}
          >
            <PageEditor userId={user.id} />
          </motion.div>
        ) : (
          <motion.div
            key="media"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease }}
          >
            <MediaLibrary userId={user.id} />
          </motion.div>
        )}
      </AnimatePresence>
    </AdminShell>
  );
}
