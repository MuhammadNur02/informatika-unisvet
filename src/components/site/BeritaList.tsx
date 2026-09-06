import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays } from "lucide-react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";
import { fetchBeritaPublik, formatTanggalId, KATEGORI_BERITA } from "@/lib/berita";

const FILTERS = ["Semua", ...KATEGORI_BERITA] as const;

export function BeritaList() {
  const [active, setActive] = useState<string>("Semua");
  const { data, isLoading } = useQuery({
    queryKey: ["berita", "publik"],
    queryFn: fetchBeritaPublik,
    staleTime: 60_000,
  });

  const items = useMemo(() => {
    const list = data ?? [];
    return active === "Semua" ? list : list.filter((b) => b.kategori === active);
  }, [data, active]);

  return (
    <section className="mt-14 first:mt-0">
      <Reveal>
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Berita Terbaru</h2>
      </Reveal>

      <div className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setActive(f)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors",
              active === f
                ? "border-transparent bg-[image:var(--gradient-hero)] text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:text-primary",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-72 animate-pulse rounded-3xl border border-border bg-secondary" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="rounded-3xl border border-border bg-card p-8 text-sm text-muted-foreground">
          Belum ada berita yang diterbitkan.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((b, i) => (
            <Reveal key={b.id} delay={(i % 3) * 0.06}>
              <article className="card-elevated group h-full overflow-hidden rounded-3xl">
                {b.gambar_url ? (
                  <div className="aspect-[16/10] overflow-hidden bg-secondary">
                    <img
                      src={b.gambar_url}
                      alt={b.judul}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                ) : null}
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                    <span className="rounded-full bg-accent/15 px-2.5 py-1 text-accent-foreground">{b.kategori}</span>
                    {b.tag ? <span className="text-muted-foreground">#{b.tag}</span> : null}
                  </div>
                  <h3 className="mt-3 text-lg font-bold leading-snug text-foreground">{b.judul}</h3>
                  <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDays className="size-3.5" /> {formatTanggalId(b.tanggal)}
                  </p>
                  {b.ringkasan ? (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.ringkasan}</p>
                  ) : null}
                  {b.isi ? (
                    <details className="group/isi mt-4">
                      <summary className="cursor-pointer list-none text-sm font-semibold text-primary">
                        Baca selengkapnya
                      </summary>
                      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                        {b.isi.split(/\n{2,}/).map((p, pi) => (
                          <p key={pi}>{p}</p>
                        ))}
                      </div>
                    </details>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
