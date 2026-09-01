import { useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, FileVideo, Loader2, Trash2, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { deleteMedia, fetchMedia, uploadMedia, type MediaItem } from "@/lib/cms";

export function MediaLibrary({ userId }: { userId: string }) {
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [judul, setJudul] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const mediaQuery = useQuery({ queryKey: ["media"], queryFn: fetchMedia });
  const items = mediaQuery.data ?? [];

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      toast.error("Pilih berkas gambar atau video terlebih dahulu.");
      return;
    }
    setBusy(true);
    const id = toast.loading("Mengunggah berkas…");
    try {
      await uploadMedia({ file, judul, userId });
      setJudul("");
      setFile(null);
      if (inputRef.current) inputRef.current.value = "";
      toast.success("Berkas masuk pustaka media", { id });
      await queryClient.invalidateQueries({ queryKey: ["media"] });
    } catch (err) {
      toast.error("Gagal mengunggah berkas", {
        id,
        description: err instanceof Error ? err.message : "Silakan coba lagi.",
      });
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(item: MediaItem) {
    setDeletingId(item.id);
    try {
      await deleteMedia(item);
      toast.success("Berkas dihapus", { description: item.judul });
      await queryClient.invalidateQueries({ queryKey: ["media"] });
    } catch (err) {
      toast.error("Gagal menghapus berkas", {
        description: err instanceof Error ? err.message : "Silakan coba lagi.",
      });
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
      <section className="card-elevated h-fit rounded-3xl bg-card p-6 lg:sticky lg:top-24">
        <h2 className="text-lg font-bold tracking-tight text-foreground">Unggah Media</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Gambar atau video yang diunggah di sini bisa dipakai di editor konten halaman.
        </p>
        <form onSubmit={handleUpload} className="mt-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="media-judul">Nama Berkas</Label>
            <Input
              id="media-judul"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="Video profil prodi"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="media-file">Berkas (gambar / video)</Label>
            <Input
              ref={inputRef}
              id="media-file"
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
            <p className="text-xs text-muted-foreground">Disarankan video MP4 maksimal ±50 MB agar cepat dimuat.</p>
          </div>
          <Button type="submit" size="pill" className="w-full" disabled={busy}>
            {busy ? <Loader2 className="animate-spin" /> : <UploadCloud />}
            {busy ? "Mengunggah…" : "Unggah ke Pustaka"}
          </Button>
        </form>
      </section>

      <section>
        <h2 className="text-lg font-bold tracking-tight text-foreground">Pustaka Media</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {mediaQuery.isLoading ? "Memuat data…" : `${items.length} berkas tersimpan`}
        </p>

        {mediaQuery.isLoading ? (
          <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/3] w-full rounded-3xl" />
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="card-elevated group overflow-hidden rounded-3xl bg-card"
                >
                  <div className="relative aspect-[4/3] bg-secondary">
                    {item.kind === "video" ? (
                      <div className="flex h-full flex-col items-center justify-center gap-2 text-primary">
                        <FileVideo className="size-8" />
                        <span className="text-xs font-semibold uppercase tracking-widest">Video</span>
                      </div>
                    ) : (
                      <img src={item.url} alt={item.judul} loading="lazy" className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="space-y-3 p-4">
                    <p className="truncate text-sm font-bold text-foreground">{item.judul}</p>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          void navigator.clipboard.writeText(item.url);
                          toast.success("Tautan disalin");
                        }}
                      >
                        <Copy /> Salin URL
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        aria-label={`Hapus ${item.judul}`}
                        onClick={() => handleDelete(item)}
                        disabled={deletingId === item.id}
                        className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        {deletingId === item.id ? <Loader2 className="animate-spin" /> : <Trash2 />}
                      </Button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="mt-5 rounded-3xl border border-dashed border-border bg-card p-10 text-center">
            <p className="text-base font-bold text-foreground">Pustaka masih kosong</p>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Unggah gambar atau video pertama untuk dipakai pada konten halaman.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
