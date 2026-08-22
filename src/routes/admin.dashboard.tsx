import { createFileRoute, redirect, useNavigate, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Images, ImagePlus, Loader2, LogOut, Trash2, ShieldAlert } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { fetchGaleri, uploadGaleri, deleteGaleri, type GaleriItem } from "@/lib/galeri";

export const Route = createFileRoute("/admin/dashboard")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Dashboard Pengelola — Pendidikan Informatika UNISVET" },
      { name: "description", content: "Kelola galeri kegiatan Program Studi Pendidikan Informatika UNISVET." },
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

function AdminDashboard() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tanggal, setTanggal] = useState(() => new Date().toISOString().slice(0, 10));
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  const roleQuery = useQuery({
    queryKey: ["is-admin", user.id],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" });
      if (error) throw error;
      return Boolean(data);
    },
  });

  const galeriQuery = useQuery({ queryKey: ["galeri"], queryFn: fetchGaleri });

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/admin/login", replace: true });
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setMessage({ kind: "err", text: "Pilih berkas gambar terlebih dahulu." });
      return;
    }
    setBusy(true);
    setMessage(null);
    try {
      await uploadGaleri({ file, judul, deskripsi, tanggal, userId: user.id });
      setJudul("");
      setDeskripsi("");
      setFile(null);
      (document.getElementById("file") as HTMLInputElement | null)?.value &&
        ((document.getElementById("file") as HTMLInputElement).value = "");
      setMessage({ kind: "ok", text: "Foto berhasil diunggah dan tampil di halaman galeri." });
      await queryClient.invalidateQueries({ queryKey: ["galeri"] });
    } catch (err) {
      setMessage({ kind: "err", text: err instanceof Error ? err.message : "Gagal mengunggah foto." });
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(item: GaleriItem) {
    setMessage(null);
    try {
      await deleteGaleri(item);
      await queryClient.invalidateQueries({ queryKey: ["galeri"] });
    } catch (err) {
      setMessage({ kind: "err", text: err instanceof Error ? err.message : "Gagal menghapus foto." });
    }
  }

  return (
    <div className="min-h-screen bg-slate-surface">
      <header className="glass-header sticky top-0 z-40 border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-[image:var(--gradient-hero)]">
              <Images className="size-5 text-primary-foreground" />
            </span>
            <div>
              <p className="text-sm font-bold text-foreground">Dashboard Pengelola</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/informasi/galeri">Lihat Galeri</Link>
            </Button>
            <Button variant="secondary" size="sm" onClick={handleSignOut}>
              <LogOut /> Keluar
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {roleQuery.data === false ? (
          <div className="mb-8 flex gap-3 rounded-2xl border border-destructive/40 bg-destructive/10 p-5">
            <ShieldAlert className="mt-0.5 size-5 shrink-0 text-destructive" />
            <div className="text-sm text-destructive">
              Akun ini belum memiliki hak admin, sehingga unggah dan hapus foto akan ditolak. Hubungi pengelola
              utama untuk mengaktifkan peran admin.
            </div>
          </div>
        ) : null}

        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
          <section className="card-elevated h-fit rounded-3xl bg-card p-6">
            <h2 className="text-lg font-bold tracking-tight text-foreground">Unggah Foto Galeri</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Foto akan langsung muncul di halaman publik galeri kegiatan.
            </p>
            <form onSubmit={handleUpload} className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="judul">Judul</Label>
                <Input id="judul" required value={judul} onChange={(e) => setJudul(e.target.value)} placeholder="Praktikum IoT" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deskripsi">Deskripsi</Label>
                <Textarea
                  id="deskripsi"
                  rows={3}
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  placeholder="Keterangan singkat kegiatan"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tanggal">Tanggal</Label>
                <Input id="tanggal" type="date" required value={tanggal} onChange={(e) => setTanggal(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="file">Berkas Gambar</Label>
                <Input
                  id="file"
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
              </div>

              {message ? (
                <p
                  className={
                    message.kind === "ok"
                      ? "rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent-foreground"
                      : "rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                  }
                >
                  {message.text}
                </p>
              ) : null}

              <Button type="submit" size="pill" className="w-full" disabled={busy}>
                {busy ? <Loader2 className="animate-spin" /> : <ImagePlus />} Unggah Foto
              </Button>
            </form>
          </section>

          <section>
            <h2 className="text-lg font-bold tracking-tight text-foreground">
              Foto Terunggah{galeriQuery.data ? ` (${galeriQuery.data.length})` : ""}
            </h2>
            {galeriQuery.isLoading ? (
              <p className="mt-4 text-sm text-muted-foreground">Memuat data…</p>
            ) : galeriQuery.data && galeriQuery.data.length > 0 ? (
              <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {galeriQuery.data.map((item) => (
                  <article key={item.id} className="card-elevated overflow-hidden rounded-3xl bg-card">
                    <div className="aspect-[4/3] overflow-hidden bg-secondary">
                      <img src={item.url} alt={item.judul} loading="lazy" className="h-full w-full object-cover" />
                    </div>
                    <div className="p-5">
                      <p className="text-xs font-semibold uppercase tracking-widest text-accent-foreground">
                        {item.tanggal}
                      </p>
                      <h3 className="mt-1.5 text-base font-bold text-foreground">{item.judul}</h3>
                      {item.deskripsi ? (
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.deskripsi}</p>
                      ) : null}
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4 text-destructive hover:bg-destructive/10"
                        onClick={() => handleDelete(item)}
                      >
                        <Trash2 /> Hapus
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="mt-4 rounded-2xl border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
                Belum ada foto yang diunggah.
              </p>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
