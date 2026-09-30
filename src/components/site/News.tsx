import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Newspaper,
  Users,
  Megaphone,
  PartyPopper,
  CalendarClock,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Reveal, SectionHeading } from "./Reveal";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { fetchBeritaPublik, formatTanggalId, KATEGORI_BERITA, type BeritaItem } from "@/lib/berita";
import { useHomeContent } from "@/lib/site-content";
import labIot from "@/assets/lab-iot.jpg";
import labMultimedia from "@/assets/lab-multimedia.jpg";
import labSmart from "@/assets/lab-smart.jpg";

const PLACEHOLDERS = [labMultimedia, labSmart, labIot];

const KATEGORI_ICON: Record<string, typeof Newspaper> = {
  Berita: Newspaper,
  Kegiatan: Users,
  Pengumuman: Megaphone,
  Event: PartyPopper,
  Agenda: CalendarClock,
};

function NewsSkeleton() {
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]" aria-hidden>
      <Skeleton className="h-[22rem] rounded-3xl" />
      <div className="flex flex-col gap-5">
        <Skeleton className="h-28 rounded-2xl" />
        <Skeleton className="h-28 rounded-2xl" />
      </div>
    </div>
  );
}

/**
 * Berita terbaru di beranda. Hanya kategori yang punya isi yang ditampilkan
 * sebagai tab, dan seluruh section disembunyikan kalau belum ada berita sama
 * sekali — kotak "Belum ada berita" di beranda memberi kesan prodi tidak aktif.
 * Halaman /informasi/berita tetap ada dan tetap menampilkan status kosongnya.
 */
export function News() {
  const { news } = useHomeContent();
  const [picked, setPicked] = useState<string | null>(null);

  const { data, isPending, isError } = useQuery({
    queryKey: ["berita", "publik"],
    queryFn: fetchBeritaPublik,
    staleTime: 60_000,
  });

  const grouped = useMemo(() => {
    const map: Record<string, BeritaItem[]> = {};
    for (const item of data ?? []) {
      const key = KATEGORI_BERITA.includes(item.kategori as (typeof KATEGORI_BERITA)[number])
        ? item.kategori
        : KATEGORI_BERITA[0];
      (map[key] ??= []).push(item);
    }
    return map;
  }, [data]);

  const tabs = KATEGORI_BERITA.filter((k) => (grouped[k]?.length ?? 0) > 0);
  const active = picked && tabs.includes(picked as (typeof tabs)[number]) ? picked : tabs[0];

  if (isError || (!isPending && tabs.length === 0)) return null;

  const items = (active ? grouped[active] ?? [] : []).slice(0, 3);
  const [lead, ...others] = items;

  return (
    <section id="berita" className="relative overflow-hidden bg-gradient-news py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-mesh opacity-40" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={news.eyebrow} title={news.title} description={news.description} />

        {isPending ? (
          <NewsSkeleton />
        ) : (
          <>
            {tabs.length > 1 ? (
              <Reveal className="mt-10 flex justify-center">
                <div className="max-w-full overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <div role="tablist" className="inline-flex rounded-full border border-border bg-card p-1 shadow-(--shadow-card)">
                    {tabs.map((tab) => {
                      const Icon = KATEGORI_ICON[tab] ?? Newspaper;
                      const selected = active === tab;
                      return (
                        <button
                          key={tab}
                          type="button"
                          role="tab"
                          aria-selected={selected}
                          onClick={() => setPicked(tab)}
                          className={cn(
                            "flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors duration-300 sm:px-5",
                            selected
                              ? "bg-[image:var(--gradient-gold)] text-primary-deep"
                              : "text-muted-foreground hover:text-primary",
                          )}
                        >
                          <Icon className="size-3.5" />
                          {tab}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            ) : null}

            {lead ? (
              <div
                key={active}
                className={cn(
                  "mt-10 grid gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300",
                  others.length > 0 && "lg:grid-cols-[1.4fr_1fr]",
                )}
              >
                <article className="group relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-3xl lg:min-h-[26rem] border border-accent/30 shadow-(--shadow-card)">
                  <img
                    src={lead.gambar_url || PLACEHOLDERS[0]}
                    alt={lead.judul}
                    loading="lazy"
                    decoding="async"
                    width={1200}
                    height={900}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.12_0.04_24/0.94),transparent_70%)]" />
                  <div className="relative p-6 sm:p-8">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-hero-foreground/90 px-3 py-1 text-xs font-semibold text-primary">
                      <CalendarDays className="size-3.5" /> {formatTanggalId(lead.tanggal)}
                    </span>
                    <h3 className="mt-4 text-xl font-bold leading-snug text-balance text-hero-foreground sm:text-2xl">
                      {lead.judul}
                    </h3>
                    <p className="mt-2 line-clamp-2 max-w-md text-sm leading-relaxed text-hero-foreground/80">
                      {lead.ringkasan}
                    </p>
                    <Link
                      to="/informasi/berita/$slug"
                      params={{ slug: lead.slug }}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-hero-foreground"
                    >
                      Baca Selengkapnya <ArrowUpRight className="size-4" />
                    </Link>
                  </div>
                </article>

                {/* Hanya satu berita → tanpa kolom kanan (dulu tersisa kolom kosong
                    besar); tautan "lihat semua" pindah ke bawah kartu utama. */}
                <div className={cn("flex flex-col gap-4", others.length === 0 && "items-center")}>
                  {others.map((item, i) => (
                    <Link
                      key={item.id}
                      to="/informasi/berita/$slug"
                      params={{ slug: item.slug }}
                      className="group flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-(--shadow-card) transition-[border-color,translate] duration-300 hover:-translate-y-0.5 hover:border-accent/50"
                    >
                      <div className="h-20 w-24 shrink-0 overflow-hidden rounded-xl">
                        <img
                          src={item.gambar_url || PLACEHOLDERS[(i + 1) % PLACEHOLDERS.length]}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          width={300}
                          height={300}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        {item.tag ? (
                          <span className="inline-flex rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-bold uppercase tracking-widest text-accent-foreground dark:text-accent">
                            {item.tag}
                          </span>
                        ) : null}
                        <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-foreground">
                          {item.judul}
                        </h3>
                        <p className="mt-1 text-xs text-muted-foreground">{formatTanggalId(item.tanggal)}</p>
                      </div>
                    </Link>
                  ))}
                  <Link
                    to="/informasi/berita"
                    className="mt-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-dashed border-primary/25 px-6 py-3.5 text-sm font-semibold text-primary transition-colors hover:border-accent hover:bg-accent/10 dark:text-accent"
                  >
                    Lihat semua berita <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}
