import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, CalendarDays, Newspaper, Users, Megaphone, PartyPopper, CalendarClock } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Reveal, SectionHeading } from "./Reveal";
import { LensFlare } from "./LensFlare";
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

export function News() {
  const { news } = useHomeContent();
  const [active, setActive] = useState<string>(KATEGORI_BERITA[0]);

  const { data } = useQuery({
    queryKey: ["berita", "publik"],
    queryFn: fetchBeritaPublik,
    staleTime: 60_000,
  });

  const grouped = useMemo(() => {
    const map: Record<string, BeritaItem[]> = {};
    for (const kategori of KATEGORI_BERITA) map[kategori] = [];
    for (const item of data ?? []) {
      const key = KATEGORI_BERITA.includes(item.kategori as (typeof KATEGORI_BERITA)[number])
        ? item.kategori
        : KATEGORI_BERITA[0];
      (map[key] ??= []).push(item);
    }
    return map;
  }, [data]);

  const items = (grouped[active] ?? []).slice(0, 3);

  return (
    <section id="berita" className="relative overflow-hidden bg-gradient-news py-20 sm:py-28">
      {/* Gradient mesh statis + sapuan cahaya lensa yang mengikuti scroll */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-mesh opacity-40" aria-hidden />
      <LensFlare seed="berita" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={news.eyebrow} title={news.title} description={news.description} />

        <Reveal className="mt-10 flex justify-center">
          <div className="max-w-full overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-0 [&::-webkit-scrollbar]:hidden">
          <div className="inline-flex rounded-full border border-border bg-card p-1 shadow-[var(--shadow-card)]">
            {KATEGORI_BERITA.map((tab) => {
              const Icon = KATEGORI_ICON[tab] ?? Newspaper;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActive(tab)}
                  className={cn(
                    "relative flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-semibold transition-colors",
                    active === tab ? "text-hero-foreground" : "text-muted-foreground hover:text-primary",
                  )}
                >
                  {active === tab ? (
                    <motion.span
                      layoutId="news-tab"
                      className="absolute inset-0 rounded-full bg-[image:var(--gradient-gold)]"
                      transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    />
                  ) : null}
                  <motion.span
                    className="relative inline-flex"
                    animate={active === tab ? { rotate: [0, -12, 12, 0] } : { rotate: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <Icon className="size-3.5" />
                  </motion.span>
                  <span className="relative">{tab}</span>
                </button>
              );
            })}
          </div>
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            {items.length === 0 ? (
              <p className="rounded-3xl border border-dashed border-border bg-card/60 p-10 text-center text-sm text-muted-foreground">
                Belum ada {active.toLowerCase()} yang diterbitkan.
              </p>
            ) : (
              <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                <article className="card-elevated group relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-3xl border-accent-glow">
                  <img
                    src={items[0]!.gambar_url || PLACEHOLDERS[0]}
                    alt={items[0]!.judul}
                    loading="lazy"
                    width={1200}
                    height={900}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.21_0.075_265/0.92),transparent_65%)]" />
                  <div className="relative p-7 sm:p-8">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/90 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
                      <CalendarDays className="size-3.5" /> {formatTanggalId(items[0]!.tanggal)}
                    </span>
                    <h3 className="mt-4 text-2xl font-bold leading-snug text-hero-foreground">
                      {items[0]!.judul}
                    </h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-hero-foreground/80">
                      {items[0]!.ringkasan}
                    </p>
                    <Link
                      to="/informasi/berita"
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-hero-foreground"
                    >
                      Baca Selengkapnya <ArrowUpRight className="size-4" />
                    </Link>
                  </div>
                </article>

                {items.length > 1 ? (
                  <div className="flex flex-col gap-5">
                    {items.slice(1).map((item, i) => (
                      <article
                        key={item.id}
                        className="card-elevated group flex h-full gap-4 rounded-2xl p-4 border-accent-glow"
                      >
                        <div className="h-20 w-24 shrink-0 overflow-hidden rounded-xl">
                          <img
                            src={item.gambar_url || PLACEHOLDERS[(i + 1) % PLACEHOLDERS.length]}
                            alt={item.judul}
                            loading="lazy"
                            width={300}
                            height={300}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          {item.tag ? (
                            <span className="text-[11px] font-bold uppercase tracking-widest text-accent-gradient">
                              {item.tag}
                            </span>
                          ) : null}
                          <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-foreground">
                            {item.judul}
                          </h3>
                          <p className="mt-1 text-xs text-muted-foreground">{formatTanggalId(item.tanggal)}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : null}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
