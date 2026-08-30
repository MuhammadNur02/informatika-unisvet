import { createFileRoute, redirect } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  CheckCircle2,
  Images,
  ImagePlus,
  Loader2,
  ShieldAlert,
  Sparkles,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AdminShell } from "@/components/admin/AdminShell";
import { fetchGaleri, uploadGaleri, deleteGaleri, type GaleriItem } from "@/lib/galeri";

export const Route = createFileRoute("/admin/dashboard")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Dashboard Pengelola — Pendidikan Informatika UNISVET" },
      {
        name: "description",
        content: "Kelola galeri kegiatan Program Studi Pendidikan Informatika UNISVET.",
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

function formatDate(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

function AdminDashboard() {
  const { user } = Route.useRouteContext();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [section, setSection] = useState("ringkasan");
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tanggal, setTanggal] = useState(() => new Date().toISOString().slice(0, 10));
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<GaleriItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

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

  const galeriQuery = useQuery({ queryKey: ["galeri"], queryFn: fetchGaleri });
  const items = galeriQuery.data ?? [];

  const stats = useMemo(() => {
    const bulanIni = items.filter((i) => i.tanggal?.slice(0, 7) === new Date().toISOString().slice(0, 7));
    const terakhir = items[0];
    return [
      { label: "Total Foto Galeri", value: String(items.length), icon: Images, hint: "Tampil di halaman publik" },
      { label: "Unggahan Bulan Ini", value: String(bulanIni.length), icon: Sparkles, hint: "Periode berjalan" },
      {
        label: "Unggahan Terakhir",
        value: terakhir ? formatDate(terakhir.tanggal) : "—",
        icon: CalendarDays,
        hint: terakhir?.judul ?? "Belum ada data",
      },
    ];
  }, [items]);

  function pickFile(next: File | null) {
    if (next && !next.type.startsWith("image/")) {
      toast.error("Berkas harus berupa gambar (JPG, PNG, atau WEBP).");
      return;
    }
    setFile(next);
    setPreview((old) => {
      if (old) URL.revokeObjectURL(old);
      return next ? URL.createObjectURL(next) : null;
    });
  }

  function resetForm() {
    setJudul("");
    setDeskripsi("");
    pickFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      toast.error("Pilih berkas gambar terlebih dahulu.");
      return;
    }
    setBusy(true);
    const toastId = toast.loading("Mengunggah foto…");
    try {
      await uploadGaleri({ file, judul, deskripsi, tanggal, userId: user.id });
      resetForm();
      toast.success("Foto berhasil diunggah", {
        id: toastId,
        description: "Foto langsung tampil di halaman galeri publik.",
      });
      await queryClient.invalidateQueries({ queryKey: ["galeri"] });
    } catch (err) {
      toast.error("Gagal mengunggah foto", {
        id: toastId,
        description: err instanceof Error ? err.message : "Silakan coba lagi.",
      });
    } finally {
      setBusy(false);
    }
  }

  async function confirmDelete() {
    const item = pendingDelete;
    if (!item) return;
    setPendingDelete(null);
    setDeletingId(item.id);
    try {
      await deleteGaleri(item);
      toast.success("Foto dihapus", { description: item.judul });
      await queryClient.invalidateQueries({ queryKey: ["galeri"] });
    } catch (err) {
      toast.error("Gagal menghapus foto", {
        description: err instanceof Error ? err.message : "Silakan coba lagi.",
      });
    } finally {
      setDeletingId(null);
    }
  }

  const isAdmin = roleQuery.data !== false;

  return (
    <AdminShell email={user.email ?? "Pengelola"} isAdmin={isAdmin} active={section} onNavigate={setSection}>
      <AnimatePresence>
        {roleQuery.data === false ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex gap-3 rounded-2xl border border-destructive/40 bg-destructive/10 p-5"
          >
            <ShieldAlert className="mt-0.5 size-5 shrink-0 text-destructive" />
            <div className="text-sm text-destructive">
              Akun ini belum memiliki hak admin, sehingga unggah dan hapus foto akan ditolak. Hubungi pengelola
              utama untuk mengaktifkan peran admin.
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
                  Semua perubahan yang Anda lakukan di sini langsung tampil pada halaman publik. Mulai dari
                  mengunggah foto kegiatan hingga merapikan dokumentasi galeri.
                </p>
                <Button
                  size="pill"
                  className="mt-6 pulse-glow"
                  onClick={() => setSection("galeri")}
                >
                  <ImagePlus /> Kelola Galeri
                </Button>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {stats.map((stat, i) => (
                <motion.article
                  key={stat.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.45, ease }}
                  className="card-elevated rounded-3xl bg-card p-6"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-secondary text-primary">
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

            <div className="rounded-3xl border border-dashed border-border bg-card p-6">
              <h3 className="text-sm font-bold text-foreground">Panduan singkat</h3>
              <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground">
                {[
                  "Buka menu Galeri Kegiatan untuk mengunggah foto baru.",
                  "Gunakan judul yang jelas, misalnya “Praktikum IoT Semester 5”.",
                  "Ukuran gambar ideal rasio 4:3 agar tampil rapi di halaman publik.",
                  "Tombol hapus selalu meminta konfirmasi, jadi aman dari salah klik.",
                ].map((tip) => (
                  <li key={tip} className="flex gap-2.5">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="galeri"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease }}
            className="grid gap-8 lg:grid-cols-[400px_1fr]"
          >
            <section className="card-elevated h-fit rounded-3xl bg-card p-6 lg:sticky lg:top-24">
              <h2 className="text-lg font-bold tracking-tight text-foreground">Unggah Foto Galeri</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Lengkapi informasi berikut, foto akan langsung tampil di halaman publik.
              </p>

              <form onSubmit={handleUpload} className="mt-6 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="file">Berkas Gambar</Label>
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragging(false);
                      pickFile(e.dataTransfer.files?.[0] ?? null);
                    }}
                    className={`relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 ${
                      dragging ? "border-accent bg-accent/10" : "border-border bg-secondary/50 hover:border-accent/60"
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {preview ? (
                        <motion.div
                          key="preview"
                          initial={{ opacity: 0, scale: 0.97 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="relative"
                        >
                          <img src={preview} alt="Pratinjau foto" className="aspect-[4/3] w-full object-cover" />
                          <button
                            type="button"
                            aria-label="Hapus pilihan gambar"
                            onClick={() => {
                              pickFile(null);
                              if (fileInputRef.current) fileInputRef.current.value = "";
                            }}
                            className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-full bg-primary-deep/70 text-primary-foreground backdrop-blur transition-transform duration-200 hover:scale-110"
                          >
                            <X className="size-4" />
                          </button>
                          <p className="truncate px-4 py-2.5 text-xs text-muted-foreground">{file?.name}</p>
                        </motion.div>
                      ) : (
                        <motion.label
                          key="empty"
                          htmlFor="file"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex cursor-pointer flex-col items-center gap-2 px-6 py-9 text-center"
                        >
                          <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-card text-primary shadow-sm">
                            <UploadCloud className="size-5" />
                          </span>
                          <span className="text-sm font-semibold text-foreground">
                            Tarik foto ke sini atau klik untuk pilih
                          </span>
                          <span className="text-xs text-muted-foreground">JPG, PNG, atau WEBP • maks. 5 MB</span>
                        </motion.label>
                      )}
                    </AnimatePresence>
                    <Input
                      ref={fileInputRef}
                      id="file"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="judul">Judul Foto</Label>
                  <Input
                    id="judul"
                    required
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
                    placeholder="Praktikum IoT Semester 5"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deskripsi">Deskripsi (opsional)</Label>
                  <Textarea
                    id="deskripsi"
                    rows={3}
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    placeholder="Keterangan singkat kegiatan"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tanggal">Tanggal Kegiatan</Label>
                  <Input
                    id="tanggal"
                    type="date"
                    required
                    value={tanggal}
                    onChange={(e) => setTanggal(e.target.value)}
                  />
                </div>

                <Button type="submit" size="pill" className="w-full" disabled={busy}>
                  {busy ? <Loader2 className="animate-spin" /> : <ImagePlus />}
                  {busy ? "Mengunggah…" : "Unggah Foto"}
                </Button>
              </form>
            </section>

            <section>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold tracking-tight text-foreground">Foto Terunggah</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {galeriQuery.isLoading ? "Memuat data…" : `${items.length} foto tersimpan`}
                  </p>
                </div>
              </div>

              {galeriQuery.isLoading ? (
                <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="overflow-hidden rounded-3xl border border-border bg-card">
                      <Skeleton className="aspect-[4/3] w-full rounded-none" />
                      <div className="space-y-2.5 p-5">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : items.length > 0 ? (
                <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  <AnimatePresence mode="popLayout">
                    {items.map((item, i) => (
                      <motion.article
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 18, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: Math.min(i, 6) * 0.04, duration: 0.4, ease }}
                        className="card-elevated group overflow-hidden rounded-3xl bg-card"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                          <img
                            src={item.url}
                            alt={item.judul}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                          <button
                            type="button"
                            aria-label={`Hapus ${item.judul}`}
                            onClick={() => setPendingDelete(item)}
                            disabled={deletingId === item.id}
                            className="absolute right-3 top-3 inline-flex size-9 translate-y-1 items-center justify-center rounded-full bg-card/90 text-destructive opacity-0 shadow-sm backdrop-blur transition-all duration-300 hover:scale-110 hover:bg-destructive hover:text-destructive-foreground focus-visible:translate-y-0 focus-visible:opacity-100 group-hover:translate-y-0 group-hover:opacity-100"
                          >
                            {deletingId === item.id ? (
                              <Loader2 className="size-4 animate-spin" />
                            ) : (
                              <Trash2 className="size-4" />
                            )}
                          </button>
                        </div>
                        <div className="p-5">
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-foreground">
                            {formatDate(item.tanggal)}
                          </p>
                          <h3 className="mt-1.5 text-base font-bold text-foreground">{item.judul}</h3>
                          {item.deskripsi ? (
                            <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                              {item.deskripsi}
                            </p>
                          ) : null}
                        </div>
                      </motion.article>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 rounded-3xl border border-dashed border-border bg-card p-10 text-center"
                >
                  <span className="mx-auto inline-flex size-14 items-center justify-center rounded-2xl bg-secondary text-primary">
                    <Images className="size-6" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-foreground">Belum ada foto</h3>
                  <p className="mx-auto mt-1.5 max-w-sm text-sm text-muted-foreground">
                    Unggah foto pertama melalui formulir di samping. Foto akan otomatis tampil di halaman galeri
                    publik.
                  </p>
                </motion.div>
              )}
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      <AlertDialog open={Boolean(pendingDelete)} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus foto ini?</AlertDialogTitle>
            <AlertDialogDescription>
              “{pendingDelete?.judul}” akan dihapus permanen dari galeri publik dan penyimpanan. Tindakan ini
              tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Ya, hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminShell>
  );
}
