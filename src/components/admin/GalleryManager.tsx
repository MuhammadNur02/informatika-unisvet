import { useMemo, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUp, ImagePlus, Images, Loader2, Search, Trash2, UploadCloud, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
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
  deleteGaleri,
  fetchGaleri,
  updateGaleriMetadata,
  uploadGaleri,
  type GaleriItem,
} from "@/lib/galeri";

const CATEGORIES = ["Kegiatan", "Praktikum", "Prestasi", "Fasilitas", "Umum"];
const ease = [0.22, 1, 0.36, 1] as const;

export function GalleryManager({ userId }: { userId: string }) {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tanggal, setTanggal] = useState(() => new Date().toISOString().slice(0, 10));
  const [kategori, setKategori] = useState("Kegiatan");
  const [urutan, setUrutan] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<GaleriItem | null>(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Semua");
  const [sort, setSort] = useState("urutan");

  const galeriQuery = useQuery({ queryKey: ["galeri"], queryFn: fetchGaleri });
  const items = galeriQuery.data ?? [];
  const categories = useMemo(
    () => ["Semua", ...Array.from(new Set([...CATEGORIES, ...items.map((item) => item.kategori)]))],
    [items],
  );
  const visibleItems = useMemo(() => {
    const normalized = search.trim().toLocaleLowerCase("id-ID");
    return items
      .filter((item) => categoryFilter === "Semua" || item.kategori === categoryFilter)
      .filter((item) => `${item.judul} ${item.deskripsi ?? ""}`.toLocaleLowerCase("id-ID").includes(normalized))
      .sort((a, b) => {
        if (sort === "terbaru") return b.tanggal.localeCompare(a.tanggal);
        if (sort === "terlama") return a.tanggal.localeCompare(b.tanggal);
        if (sort === "judul") return a.judul.localeCompare(b.judul, "id");
        return a.urutan - b.urutan || b.tanggal.localeCompare(a.tanggal);
      });
  }, [categoryFilter, items, search, sort]);

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

  async function handleUpload(event: React.FormEvent) {
    event.preventDefault();
    if (!file) return toast.error("Pilih berkas gambar terlebih dahulu.");
    setBusy(true);
    const toastId = toast.loading("Mengunggah foto…");
    try {
      await uploadGaleri({ file, judul, deskripsi, tanggal, kategori, urutan, userId });
      setJudul("");
      setDeskripsi("");
      setUrutan(0);
      pickFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      toast.success("Foto berhasil diunggah", { id: toastId });
      await queryClient.invalidateQueries({ queryKey: ["galeri"] });
    } catch (error) {
      toast.error("Gagal mengunggah foto", { id: toastId, description: error instanceof Error ? error.message : "Silakan coba lagi." });
    } finally {
      setBusy(false);
    }
  }

  async function updateItem(item: GaleriItem, next: { kategori?: string; urutan?: number }) {
    setBusyId(item.id);
    try {
      await updateGaleriMetadata({ id: item.id, kategori: next.kategori ?? item.kategori, urutan: next.urutan ?? item.urutan });
      await queryClient.invalidateQueries({ queryKey: ["galeri"] });
      toast.success("Galeri diperbarui");
    } catch (error) {
      toast.error("Gagal memperbarui galeri", { description: error instanceof Error ? error.message : "Silakan coba lagi." });
    } finally {
      setBusyId(null);
    }
  }

  async function move(item: GaleriItem, direction: -1 | 1) {
    const ordered = [...items].sort((a, b) => a.urutan - b.urutan || b.tanggal.localeCompare(a.tanggal));
    const index = ordered.findIndex((candidate) => candidate.id === item.id);
    const target = ordered[index + direction];
    if (!target) return;
    setBusyId(item.id);
    try {
      await Promise.all([
        updateGaleriMetadata({ id: item.id, kategori: item.kategori, urutan: target.urutan }),
        updateGaleriMetadata({ id: target.id, kategori: target.kategori, urutan: item.urutan }),
      ]);
      await queryClient.invalidateQueries({ queryKey: ["galeri"] });
    } catch (error) {
      toast.error("Gagal mengubah urutan", { description: error instanceof Error ? error.message : "Silakan coba lagi." });
    } finally {
      setBusyId(null);
    }
  }

  async function confirmDelete() {
    const item = pendingDelete;
    if (!item) return;
    setPendingDelete(null);
    setBusyId(item.id);
    try {
      await deleteGaleri(item);
      toast.success("Foto dihapus", { description: item.judul });
      await queryClient.invalidateQueries({ queryKey: ["galeri"] });
    } catch (error) {
      toast.error("Gagal menghapus foto", { description: error instanceof Error ? error.message : "Silakan coba lagi." });
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[400px_1fr]">
      <section className="card-elevated h-fit rounded-3xl bg-card p-6 lg:sticky lg:top-24">
        <h2 className="text-lg font-bold text-foreground">Unggah Foto Galeri</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">Lengkapi informasi foto yang akan tampil di halaman publik.</p>
        <form onSubmit={handleUpload} className="mt-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="gallery-file">Berkas Gambar</Label>
            <div
              onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={(event) => { event.preventDefault(); setDragging(false); pickFile(event.dataTransfer.files?.[0] ?? null); }}
              className={`overflow-hidden rounded-2xl border-2 border-dashed transition-colors ${dragging ? "border-accent bg-accent/10" : "border-border bg-secondary/50"}`}
            >
              {preview ? (
                <div className="relative">
                  <img src={preview} alt="Pratinjau foto" className="aspect-[4/3] w-full object-cover" />
                  <Button type="button" size="icon" variant="outline" aria-label="Hapus pilihan gambar" onClick={() => pickFile(null)} className="absolute right-3 top-3">
                    <X />
                  </Button>
                </div>
              ) : (
                <label htmlFor="gallery-file" className="flex cursor-pointer flex-col items-center gap-2 px-6 py-9 text-center">
                  <UploadCloud className="size-7 text-primary" />
                  <span className="text-sm font-semibold">Tarik foto ke sini atau klik untuk pilih</span>
                  <span className="text-xs text-muted-foreground">JPG, PNG, atau WEBP</span>
                </label>
              )}
              <Input ref={fileInputRef} id="gallery-file" type="file" accept="image/*" className="sr-only" onChange={(event) => pickFile(event.target.files?.[0] ?? null)} />
            </div>
          </div>
          <div className="space-y-2"><Label htmlFor="gallery-title">Judul Foto</Label><Input id="gallery-title" required value={judul} onChange={(event) => setJudul(event.target.value)} /></div>
          <div className="space-y-2"><Label htmlFor="gallery-description">Deskripsi</Label><Textarea id="gallery-description" rows={3} value={deskripsi} onChange={(event) => setDeskripsi(event.target.value)} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label htmlFor="gallery-date">Tanggal</Label><Input id="gallery-date" type="date" required value={tanggal} onChange={(event) => setTanggal(event.target.value)} /></div>
            <div className="space-y-2"><Label htmlFor="gallery-order">Urutan</Label><Input id="gallery-order" type="number" min={0} value={urutan} onChange={(event) => setUrutan(Number(event.target.value))} /></div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="gallery-category">Kategori</Label>
            <select id="gallery-category" value={kategori} onChange={(event) => setKategori(event.target.value)} className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground">
              {CATEGORIES.map((value) => <option key={value}>{value}</option>)}
            </select>
          </div>
          <Button type="submit" size="pill" className="w-full" disabled={busy}>{busy ? <Loader2 className="animate-spin" /> : <ImagePlus />}{busy ? "Mengunggah…" : "Unggah Foto"}</Button>
        </form>
      </section>

      <section>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div><h2 className="text-lg font-bold text-foreground">Foto Terunggah</h2><p className="mt-1 text-sm text-muted-foreground">{galeriQuery.isLoading ? "Memuat data…" : `${visibleItems.length} dari ${items.length} foto`}</p></div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <label className="relative sm:col-span-3 xl:col-span-1"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari judul atau deskripsi…" className="pl-9" /></label>
          <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} aria-label="Filter kategori galeri" className="h-11 rounded-xl border border-input bg-background px-3 text-sm text-foreground">{categories.map((value) => <option key={value}>{value}</option>)}</select>
          <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Urutkan galeri" className="h-11 rounded-xl border border-input bg-background px-3 text-sm text-foreground"><option value="urutan">Urutan tampil</option><option value="terbaru">Terbaru</option><option value="terlama">Terlama</option><option value="judul">Judul A–Z</option></select>
        </div>

        {galeriQuery.isLoading ? (
          <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{[0, 1, 2].map((value) => <Skeleton key={value} className="aspect-[4/3] rounded-3xl" />)}</div>
        ) : visibleItems.length ? (
          <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visibleItems.map((item, index) => (
                <motion.article key={item.id} layout initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease }} className="card-elevated overflow-hidden rounded-3xl bg-card">
                  <img src={item.url} alt={item.judul} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                  <div className="space-y-3 p-4">
                    <h3 className="truncate font-bold text-foreground">{item.judul}</h3>
                    <div className="grid grid-cols-[1fr_76px] gap-2">
                      <select value={item.kategori} disabled={busyId === item.id} onChange={(event) => updateItem(item, { kategori: event.target.value })} aria-label={`Kategori ${item.judul}`} className="h-9 min-w-0 rounded-xl border border-input bg-background px-2 text-xs text-foreground">{categories.filter((value) => value !== "Semua").map((value) => <option key={value}>{value}</option>)}</select>
                      <Input type="number" min={0} value={item.urutan} disabled={busyId === item.id} onChange={(event) => updateItem(item, { urutan: Number(event.target.value) })} aria-label={`Urutan ${item.judul}`} className="h-9" />
                    </div>
                    <div className="flex gap-2">
                      <Button type="button" variant="outline" size="icon" aria-label={`Naikkan ${item.judul}`} disabled={busyId === item.id || index === 0} onClick={() => move(item, -1)}><ArrowUp /></Button>
                      <Button type="button" variant="outline" size="icon" aria-label={`Turunkan ${item.judul}`} disabled={busyId === item.id || index === visibleItems.length - 1} onClick={() => move(item, 1)}><ArrowDown /></Button>
                      <Button type="button" variant="outline" size="icon" aria-label={`Hapus ${item.judul}`} disabled={busyId === item.id} onClick={() => setPendingDelete(item)} className="ml-auto text-destructive hover:bg-destructive hover:text-destructive-foreground">{busyId === item.id ? <Loader2 className="animate-spin" /> : <Trash2 />}</Button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="mt-5 rounded-3xl border border-dashed border-border bg-card p-10 text-center"><Images className="mx-auto size-7 text-primary" /><h3 className="mt-3 font-bold">Tidak ada foto yang cocok</h3><p className="mt-1 text-sm text-muted-foreground">Ubah kata pencarian atau penyaring kategori.</p></div>
        )}
      </section>

      <AlertDialog open={Boolean(pendingDelete)} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Hapus foto ini?</AlertDialogTitle><AlertDialogDescription>“{pendingDelete?.judul}” akan dihapus permanen dari galeri dan penyimpanan.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Batal</AlertDialogCancel><AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Ya, hapus</AlertDialogAction></AlertDialogFooter></AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
