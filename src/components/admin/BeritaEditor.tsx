import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Eye,
  EyeOff,
  ImagePlus,
  Loader2,
  Newspaper,
  Pencil,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";
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
import {
  KATEGORI_BERITA,
  deleteBerita,
  fetchBeritaAdmin,
  formatTanggalId,
  saveBerita,
  type BeritaItem,
} from "@/lib/berita";
import { uploadMedia } from "@/lib/cms";

type Draft = {
  id?: string;
  judul: string;
  kategori: string;
  tag: string;
  tanggal: string;
  ringkasan: string;
  isi: string;
  gambar_url: string;
  published: boolean;
};

function emptyDraft(): Draft {
  return {
    judul: "",
    kategori: "Berita",
    tag: "",
    tanggal: new Date().toISOString().slice(0, 10),
    ringkasan: "",
    isi: "",
    gambar_url: "",
    published: true,
  };
}

export function BeritaEditor({ userId }: { userId: string }) {
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<BeritaItem | null>(null);

  const listQuery = useQuery({ queryKey: ["berita-admin"], queryFn: fetchBeritaAdmin });
  const items = listQuery.data ?? [];

  function patch(next: Partial<Draft>) {
    setDraft((d) => ({ ...d, ...next }));
  }

  async function handleImage(file: File | null) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Berkas harus berupa gambar.");
      return;
    }
    setUploading(true);
    const id = toast.loading("Mengunggah gambar…");
    try {
      const url = await uploadMedia({ file, judul: draft.judul || file.name, userId });
      patch({ gambar_url: url });
      toast.success("Gambar siap dipakai", { id });
      await queryClient.invalidateQueries({ queryKey: ["media"] });
    } catch (err) {
      toast.error("Gagal mengunggah gambar", {
        id,
        description: err instanceof Error ? err.message : "Silakan coba lagi.",
      });
    } finally {
      setUploading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const id = toast.loading("Menyimpan berita…");
    try {
      await saveBerita({ ...draft, userId });
      toast.success(draft.id ? "Berita diperbarui" : "Berita ditambahkan", {
        id,
        description: draft.published ? "Sudah tampil di halaman publik." : "Disimpan sebagai draf.",
      });
      setDraft(emptyDraft());
      await queryClient.invalidateQueries({ queryKey: ["berita-admin"] });
      await queryClient.invalidateQueries({ queryKey: ["berita-publik"] });
    } catch (err) {
      toast.error("Gagal menyimpan berita", {
        id,
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
    try {
      await deleteBerita(item.id);
      if (draft.id === item.id) setDraft(emptyDraft());
      toast.success("Berita dihapus", { description: item.judul });
      await queryClient.invalidateQueries({ queryKey: ["berita-admin"] });
      await queryClient.invalidateQueries({ queryKey: ["berita-publik"] });
    } catch (err) {
      toast.error("Gagal menghapus berita", {
        description: err instanceof Error ? err.message : "Silakan coba lagi.",
      });
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
      <section className="card-elevated h-fit rounded-3xl bg-card p-6 lg:sticky lg:top-24">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-foreground">
              {draft.id ? "Ubah Berita" : "Tulis Berita Baru"}
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Isi judul, ringkasan, dan foto — tanpa perlu koding.
            </p>
          </div>
          {draft.id ? (
            <Button type="button" variant="outline" size="sm" onClick={() => setDraft(emptyDraft())}>
              <X /> Batal
            </Button>
          ) : null}
        </div>

        <form onSubmit={handleSave} className="mt-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="b-judul">Judul</Label>
            <Input
              id="b-judul"
              required
              value={draft.judul}
              onChange={(e) => patch({ judul: e.target.value })}
              placeholder="Mahasiswa Juara Hackathon EdTech"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="b-kategori">Kategori</Label>
              <select
                id="b-kategori"
                value={draft.kategori}
                onChange={(e) => patch({ kategori: e.target.value })}
                className="h-11 w-full rounded-xl border border-input bg-background px-3.5 text-sm text-foreground outline-none transition-colors focus-visible:border-accent"
              >
                {KATEGORI_BERITA.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="b-tanggal">Tanggal</Label>
              <Input
                id="b-tanggal"
                type="date"
                required
                value={draft.tanggal}
                onChange={(e) => patch({ tanggal: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="b-tag">Label / Tag</Label>
            <Input
              id="b-tag"
              value={draft.tag}
              onChange={(e) => patch({ tag: e.target.value })}
              placeholder="Prestasi, Workshop, Akademik…"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="b-ringkasan">Ringkasan Singkat</Label>
            <Textarea
              id="b-ringkasan"
              rows={2}
              value={draft.ringkasan}
              onChange={(e) => patch({ ringkasan: e.target.value })}
              placeholder="Satu–dua kalimat yang tampil pada kartu berita."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="b-isi">Isi Berita</Label>
            <Textarea
              id="b-isi"
              rows={7}
              value={draft.isi}
              onChange={(e) => patch({ isi: e.target.value })}
              placeholder="Tulis isi lengkap berita. Pisahkan antar paragraf dengan baris kosong."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="b-gambar">Foto Berita</Label>
            {draft.gambar_url ? (
              <div className="relative overflow-hidden rounded-2xl border border-border">
                <img src={draft.gambar_url} alt="Pratinjau foto berita" className="aspect-[4/3] w-full object-cover" />
                <button
                  type="button"
                  aria-label="Hapus foto"
                  onClick={() => patch({ gambar_url: "" })}
                  className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-full bg-primary-deep/70 text-primary-foreground backdrop-blur"
                >
                  <X className="size-4" />
                </button>
              </div>
            ) : null}
            <Input
              id="b-gambar"
              type="file"
              accept="image/*"
              disabled={uploading}
              onChange={(e) => handleImage(e.target.files?.[0] ?? null)}
            />
            <p className="text-xs text-muted-foreground">
              {uploading ? "Mengunggah…" : "Foto otomatis tersimpan di pustaka media."}
            </p>
          </div>

          <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border bg-secondary/40 p-3.5">
            <input
              type="checkbox"
              checked={draft.published}
              onChange={(e) => patch({ published: e.target.checked })}
              className="size-4 accent-[hsl(var(--accent))]"
            />
            <span className="text-sm font-medium text-foreground">
              Terbitkan (tampil di beranda & halaman berita)
            </span>
          </label>

          <Button type="submit" size="pill" className="w-full" disabled={busy || uploading}>
            {busy ? <Loader2 className="animate-spin" /> : draft.id ? <Save /> : <Plus />}
            {draft.id ? "Simpan Perubahan" : "Terbitkan Berita"}
          </Button>
        </form>
      </section>

      <section>
        <div>
          <h2 className="text-lg font-bold tracking-tight text-foreground">Daftar Berita</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {listQuery.isLoading ? "Memuat data…" : `${items.length} berita tersimpan`}
          </p>
        </div>

        {listQuery.isLoading ? (
          <div className="mt-5 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-28 w-full rounded-3xl" />
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="mt-5 space-y-4">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className="card-elevated flex gap-4 rounded-3xl bg-card p-4"
                >
                  <div className="size-24 shrink-0 overflow-hidden rounded-2xl bg-secondary">
                    {item.gambar_url ? (
                      <img src={item.gambar_url} alt={item.judul} loading="lazy" className="h-full w-full object-cover" />
                    ) : (
                      <span className="flex h-full items-center justify-center text-muted-foreground">
                        <Newspaper className="size-5" />
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 font-semibold text-primary">
                        <CalendarDays className="size-3" /> {formatTanggalId(item.tanggal)}
                      </span>
                      <span className="rounded-full bg-accent/15 px-2.5 py-1 font-semibold text-accent-foreground">
                        {item.kategori}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-semibold ${
                          item.published ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {item.published ? <Eye className="size-3" /> : <EyeOff className="size-3" />}
                        {item.published ? "Terbit" : "Draf"}
                      </span>
                    </div>
                    <h3 className="mt-2 truncate text-base font-bold text-foreground">{item.judul}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.ringkasan}</p>
                    <div className="mt-3 flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setDraft({
                            id: item.id,
                            judul: item.judul,
                            kategori: item.kategori,
                            tag: item.tag,
                            tanggal: item.tanggal,
                            ringkasan: item.ringkasan,
                            isi: item.isi,
                            gambar_url: item.gambar_url,
                            published: item.published,
                          })
                        }
                      >
                        <Pencil /> Ubah
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setPendingDelete(item)}
                        className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 /> Hapus
                      </Button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="mt-5 rounded-3xl border border-dashed border-border bg-card p-10 text-center">
            <span className="mx-auto inline-flex size-14 items-center justify-center rounded-2xl bg-secondary text-primary">
              <ImagePlus className="size-6" />
            </span>
            <h3 className="mt-4 text-base font-bold text-foreground">Belum ada berita</h3>
            <p className="mx-auto mt-1.5 max-w-sm text-sm text-muted-foreground">
              Tulis berita pertama melalui formulir di samping. Berita akan langsung tampil di beranda dan
              halaman Informasi › Berita.
            </p>
          </div>
        )}
      </section>

      <AlertDialog open={Boolean(pendingDelete)} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus berita ini?</AlertDialogTitle>
            <AlertDialogDescription>
              “{pendingDelete?.judul}” akan dihapus permanen dari halaman publik. Tindakan ini tidak dapat
              dibatalkan.
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
    </div>
  );
}
