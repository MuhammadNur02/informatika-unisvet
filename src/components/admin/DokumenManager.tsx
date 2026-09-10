import { useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText, Loader2, Trash2, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  fetchDokumen,
  uploadDokumen,
  deleteDokumen,
  updateDokumenUrutan,
  formatUkuran,
  KATEGORI_DOKUMEN,
} from "@/lib/dokumen";

const ease = [0.22, 1, 0.36, 1] as const;

export function DokumenManager({ userId }: { userId: string }) {
  const queryClient = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [kategori, setKategori] = useState<string>(KATEGORI_DOKUMEN[0]);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const dokumenQuery = useQuery({ queryKey: ["dokumen"], queryFn: fetchDokumen });
  const items = dokumenQuery.data ?? [];

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      toast.error("Pilih berkas terlebih dahulu.");
      return;
    }
    setBusy(true);
    const id = toast.loading("Mengunggah dokumen…");
    try {
      await uploadDokumen({
        file,
        judul,
        deskripsi,
        kategori,
        urutan: items.length,
        userId,
      });
      setJudul("");
      setDeskripsi("");
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
      toast.success("Dokumen berhasil diunggah", {
        id,
        description: "Dokumen langsung bisa diunduh di halaman publik.",
      });
      await queryClient.invalidateQueries({ queryKey: ["dokumen"] });
    } catch (err) {
      toast.error("Gagal mengunggah dokumen", {
        id,
        description: err instanceof Error ? err.message : "Silakan coba lagi.",
      });
    } finally {
      setBusy(false);
    }
  }

  async function move(index: number, direction: -1 | 1) {
    const a = items[index];
    const b = items[index + direction];
    if (!a || !b) return;
    setBusyId(a.id);
    try {
      await updateDokumenUrutan(a.id, b.urutan);
      await updateDokumenUrutan(b.id, a.urutan);
      await queryClient.invalidateQueries({ queryKey: ["dokumen"] });
    } catch (err) {
      toast.error("Gagal mengubah urutan", {
        description: err instanceof Error ? err.message : "Silakan coba lagi.",
      });
    } finally {
      setBusyId(null);
    }
  }

  async function remove(item: { id: string; storage_path: string | null; judul: string }) {
    setBusyId(item.id);
    try {
      await deleteDokumen(item);
      toast.success("Dokumen dihapus", { description: item.judul });
      await queryClient.invalidateQueries({ queryKey: ["dokumen"] });
    } catch (err) {
      toast.error("Gagal menghapus dokumen", {
        description: err instanceof Error ? err.message : "Silakan coba lagi.",
      });
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[400px_1fr]">
      <section className="card-elevated h-fit rounded-3xl bg-card p-6 lg:sticky lg:top-24">
        <h2 className="text-lg font-bold tracking-tight text-foreground">Unggah Dokumen</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          PDF, Word, Excel, atau PowerPoint. Maksimal 50 MB.
        </p>

        <form onSubmit={handleUpload} className="mt-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="dokumen-file">Berkas</Label>
            <Input
              ref={fileRef}
              id="dokumen-file"
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
            {file ? (
              <p className="truncate text-xs text-muted-foreground">
                {file.name} • {formatUkuran(file.size)}
              </p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="dokumen-judul">Judul Dokumen</Label>
            <Input
              id="dokumen-judul"
              required
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="Panduan Skripsi 2026"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dokumen-kategori">Kategori</Label>
            <select
              id="dokumen-kategori"
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground"
            >
              {KATEGORI_DOKUMEN.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dokumen-deskripsi">Deskripsi (opsional)</Label>
            <Textarea
              id="dokumen-deskripsi"
              rows={3}
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              placeholder="Keterangan singkat isi dokumen"
            />
          </div>
          <Button type="submit" size="pill" className="w-full" disabled={busy}>
            {busy ? <Loader2 className="animate-spin" /> : <UploadCloud />}
            {busy ? "Mengunggah…" : "Unggah Dokumen"}
          </Button>
        </form>
      </section>

      <section>
        <h2 className="text-lg font-bold tracking-tight text-foreground">Daftar Dokumen</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {dokumenQuery.isLoading ? "Memuat data…" : `${items.length} dokumen tersimpan`}
        </p>

        {dokumenQuery.isLoading ? (
          <div className="mt-5 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-3xl border border-border bg-card p-6">
                <Skeleton className="h-4 w-52" />
                <Skeleton className="mt-3 h-3 w-full" />
              </div>
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="mt-5 space-y-4">
            <AnimatePresence mode="popLayout">
              {items.map((item, i) => (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ delay: Math.min(i, 6) * 0.04, duration: 0.35, ease }}
                  className="card-elevated flex flex-wrap items-start justify-between gap-4 rounded-3xl bg-card p-6"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-foreground">
                      {item.kategori} • {formatUkuran(item.ukuran)}
                    </p>
                    <h3 className="mt-1.5 text-base font-bold text-foreground">{item.judul}</h3>
                    {item.deskripsi ? (
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.deskripsi}</p>
                    ) : null}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={busyId === item.id || i === 0}
                      onClick={() => move(i, -1)}
                    >
                      Naik
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={busyId === item.id || i === items.length - 1}
                      onClick={() => move(i, 1)}
                    >
                      Turun
                    </Button>
                    <Button asChild variant="outline" size="icon" aria-label={`Unduh ${item.judul}`}>
                      <a href={item.url} target="_blank" rel="noreferrer">
                        <Download />
                      </a>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      aria-label={`Hapus ${item.judul}`}
                      disabled={busyId === item.id}
                      onClick={() => remove(item)}
                      className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      {busyId === item.id ? <Loader2 className="animate-spin" /> : <Trash2 />}
                    </Button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="mt-5 rounded-3xl border border-dashed border-border bg-card p-10 text-center">
            <span className="mx-auto inline-flex size-14 items-center justify-center rounded-2xl bg-secondary text-primary">
              <FileText className="size-6" />
            </span>
            <h3 className="mt-4 text-base font-bold text-foreground">Belum ada dokumen</h3>
            <p className="mx-auto mt-1.5 max-w-sm text-sm text-muted-foreground">
              Unggah dokumen pertama melalui formulir di samping.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
