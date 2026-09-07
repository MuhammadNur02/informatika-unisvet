import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";
import { fetchBeritaPublik, formatTanggalId, KATEGORI_BERITA } from "@/lib/berita";

const FILTERS = ["Semua", ...KATEGORI_BERITA] as const;

type Props = {
  /** Batasi ke satu kategori (mis. "Pengumuman"); filter disembunyikan. */
  kategori?: string;
  /** Judul bagian. */
  heading?: string;
  /** Teks bila belum ada isi. */
  emptyText?: string;
};

export function BeritaList({ kategori, heading = "Berita Terbaru", emptyText }: Props) {
  const [active, setActive] = useState<string>("Semua");
  const { data, isLoading } = useQuery({
    queryKey: ["berita", "publik"],
    queryFn: fetchBeritaPublik,
    staleTime: 60_000,
  });

  const items = useMemo(() => {
    const list = data ?? [];
    if (kategori) return list.filter((b) => b.kategori === kategori);
    return active === "Semua" ? list : list.filter((b) => b.kategori === active);
  }, [data, active, kategori]);

  return (
    <section className="mt-14 first:mt-0">
      <Reveal>
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{heading}</h2>
      </Reveal>

      {!kategori ? (
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
      ) : null}

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-72 animate-pulse rounded-3xl border border-border bg-secondary" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="rounded-3xl border border-border bg-card p-8 text-sm text-muted-foreground">
          {emptyText ?? "Belum ada berita yang diterbitkan."}
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((b, i) => (
            <Reveal key={b.id} delay={(i % 3) * 0.06}>
              <article className="card-elevated group flex h-full flex-col overflow-hidden rounded-3xl">
                {b.gambar_url ? (
                  <Link
                    to="/informasi/berita/$slug"
                    params={{ slug: b.slug }}
                    className="block aspect-[16/10] overflow-hidden bg-secondary"
                  >
                    <img
                      src={b.gambar_url}
                      alt={b.judul}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>
                ) : null}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                    <span className="rounded-full bg-accent/15 px-2.5 py-1 text-accent-foreground">{b.kategori}</span>
                    {b.tag ? <span className="text-muted-foreground">#{b.tag}</span> : null}
                  </div>
                  <h3 className="mt-3 text-lg font-bold leading-snug text-foreground">
                    <Link
                      to="/informasi/berita/$slug"
                      params={{ slug: b.slug }}
                      className="transition-colors hover:text-primary"
                    >
                      {b.judul}
                    </Link>
                  </h3>
                  <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDays className="size-3.5" /> {formatTanggalId(b.tanggal)}
                  </p>
                  {b.ringkasan ? (
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{b.ringkasan}</p>
                  ) : null}
                  <Link
                    to="/informasi/berita/$slug"
                    params={{ slug: b.slug }}
                    className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-primary"
                  >
                    Baca selengkapnya
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
