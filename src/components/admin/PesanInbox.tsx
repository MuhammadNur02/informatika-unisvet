import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Mail, MailOpen, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchPesan, tandaiPesan, hapusPesan } from "@/lib/kontak";

const ease = [0.22, 1, 0.36, 1] as const;

function formatDateTime(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function PesanInbox() {
  const queryClient = useQueryClient();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"semua" | "belum">("semua");
  const [busyId, setBusyId] = useState<string | null>(null);

  const pesanQuery = useQuery({ queryKey: ["pesan-kontak"], queryFn: fetchPesan });
  const rows = pesanQuery.data ?? [];

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows.filter((r) => {
      if (filter === "belum" && r.dibaca) return false;
      if (!needle) return true;
      return [r.nama, r.email, r.subjek, r.pesan, r.telepon]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [rows, q, filter]);

  const belum = rows.filter((r) => !r.dibaca).length;

  async function toggleRead(id: string, dibaca: boolean) {
    setBusyId(id);
    try {
      await tandaiPesan(id, dibaca);
      await queryClient.invalidateQueries({ queryKey: ["pesan-kontak"] });
    } catch (err) {
      toast.error("Gagal memperbarui status", {
        description: err instanceof Error ? err.message : "Silakan coba lagi.",
      });
    } finally {
      setBusyId(null);
    }
  }

  async function remove(id: string) {
    setBusyId(id);
    try {
      await hapusPesan(id);
      toast.success("Pesan dihapus");
      await queryClient.invalidateQueries({ queryKey: ["pesan-kontak"] });
    } catch (err) {
      toast.error("Gagal menghapus pesan", {
        description: err instanceof Error ? err.message : "Silakan coba lagi.",
      });
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="card-elevated rounded-3xl bg-card p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-foreground">Pesan Masuk</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {pesanQuery.isLoading
                ? "Memuat pesan…"
                : `${rows.length} pesan • ${belum} belum dibaca`}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari nama, email, isi pesan…"
                className="w-64 pl-9"
              />
            </div>
            <Button
              type="button"
              variant={filter === "semua" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("semua")}
            >
              Semua
            </Button>
            <Button
              type="button"
              variant={filter === "belum" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("belum")}
            >
              Belum dibaca
            </Button>
          </div>
        </div>
      </div>

      {pesanQuery.isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-3xl border border-border bg-card p-6">
              <Skeleton className="h-3 w-40" />
              <Skeleton className="mt-3 h-4 w-64" />
              <Skeleton className="mt-3 h-3 w-full" />
            </div>
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ delay: Math.min(i, 6) * 0.04, duration: 0.35, ease }}
                className={`card-elevated rounded-3xl bg-card p-6 ${
                  item.dibaca ? "" : "shadow-[inset_0_0_0_1px_oklch(0.79_0.15_78/0.45)]"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      {formatDateTime(item.created_at)}
                      {item.dibaca ? "" : " • Baru"}
                    </p>
                    <h3 className="mt-1.5 text-base font-bold text-foreground">
                      {item.subjek || "Tanpa subjek"}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.nama} •{" "}
                      <a href={`mailto:${item.email}`} className="underline-offset-2 hover:underline">
                        {item.email}
                      </a>
                      {item.telepon ? ` • ${item.telepon}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={busyId === item.id}
                      onClick={() => toggleRead(item.id, !item.dibaca)}
                    >
                      {busyId === item.id ? (
                        <Loader2 className="animate-spin" />
                      ) : item.dibaca ? (
                        <Mail />
                      ) : (
                        <MailOpen />
                      )}
                      {item.dibaca ? "Tandai belum dibaca" : "Tandai sudah dibaca"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      aria-label="Hapus pesan"
                      disabled={busyId === item.id}
                      onClick={() => remove(item.id)}
                      className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>
                <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-foreground/85">
                  {item.pesan}
                </p>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-border bg-card p-10 text-center">
          <span className="mx-auto inline-flex size-14 items-center justify-center rounded-2xl bg-secondary text-primary">
            <Mail className="size-6" />
          </span>
          <h3 className="mt-4 text-base font-bold text-foreground">Belum ada pesan</h3>
          <p className="mx-auto mt-1.5 max-w-sm text-sm text-muted-foreground">
            Pesan dari formulir kontak di halaman publik akan tampil di sini.
          </p>
        </div>
      )}
    </div>
  );
}
