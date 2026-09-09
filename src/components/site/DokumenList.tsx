import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Download, FileText, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchDokumen, formatUkuran } from "@/lib/dokumen";
import { Reveal } from "./Reveal";

export function DokumenList() {
  const query = useQuery({ queryKey: ["dokumen"], queryFn: fetchDokumen, staleTime: 60_000 });
  const [q, setQ] = useState("");
  const [kategori, setKategori] = useState("Semua");

  const items = query.data ?? [];
  const kategoris = useMemo(() => ["Semua", ...new Set(items.map((i) => i.kategori))], [items]);

  const filtered = items.filter((i) => {
    const cocokKategori = kategori === "Semua" || i.kategori === kategori;
    const teks = `${i.judul} ${i.deskripsi}`.toLowerCase();
    return cocokKategori && teks.includes(q.trim().toLowerCase());
  });

  return (
    <section className="mt-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari dokumen…"
            aria-label="Cari dokumen"
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {kategoris.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setKategori(k)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                kategori === k
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:border-accent/60 hover:text-primary"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      {query.isLoading ? (
        <div className="mt-8 space-y-3">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-20 w-full rounded-3xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="mt-10 rounded-3xl border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
          Belum ada dokumen yang tersedia untuk diunduh.
        </p>
      ) : (
        <ul className="mt-8 space-y-3">
          {filtered.map((d, i) => (
            <Reveal key={d.id} delay={(i % 6) * 0.04}>
              <li className="card-elevated flex flex-wrap items-center gap-4 rounded-3xl bg-card p-5">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
                  <FileText className="size-5" />
                </span>
                <div className="min-w-[200px] flex-1">
                  <p className="text-sm font-bold text-foreground">{d.judul}</p>
                  {d.deskripsi ? (
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d.deskripsi}</p>
                  ) : null}
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    {d.kategori} • {formatUkuran(d.ukuran)}
                  </p>
                </div>
                <a
                  href={d.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-transform duration-200 hover:scale-[1.03]"
                >
                  <Download className="size-3.5" /> Unduh
                </a>
              </li>
            </Reveal>
          ))}
        </ul>
      )}
    </section>
  );
}
