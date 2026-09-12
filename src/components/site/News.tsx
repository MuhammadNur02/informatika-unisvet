import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Reveal, SectionHeading } from "./Reveal";
import { cn } from "@/lib/utils";
import { fetchBeritaPublik, formatTanggalId, KATEGORI_BERITA, type BeritaItem } from "@/lib/berita";
import { useHomeContent } from "@/lib/site-content";
import labIot from "@/assets/lab-iot.jpg";
import labMultimedia from "@/assets/lab-multimedia.jpg";
import labSmart from "@/assets/lab-smart.jpg";

const PLACEHOLDERS = [labMultimedia, labSmart, labIot];

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
      {/* Animated gradient mesh background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-mesh opacity-40" aria-hidden />
      {/* Floating decorative shapes */}
      <div className="pointer-events-none absolute top-20 left-1/4 h-72 w-72 rounded-full bg-accent/5 blur-3xl float-shape" aria-hidden />
      <div className="pointer-events-none absolute bottom-10 right-1/3 h-80 w-80 rounded-full bg-primary/5 blur-3xl float-shape-delayed" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={news.eyebrow} title={news.title} description={news.description} />

        <Reveal className="mt-10 flex justify-center">
          <div className="inline-flex rounded-full border border-border bg-card p-1 shadow-[var(--shadow-card)]">
            {KATEGORI_BERITA.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActive(tab)}
                className={cn(
                  "relative rounded-full px-5 py-2 text-sm font-semibold transition-colors",
                  active === tab ? "text-primary-foreground" : "text-muted-foreground hover:text-primary",
                )}
              >
                {active === tab ? (
                  <motion.span
                    layoutId="news-tab"
                    className="absolute inset-0 rounded-full bg-[image:var(--gradient-gold)]"
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  />
                ) : null}
                <span className="relative">{tab}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {items.length === 0 ? (
              <p className="col-span-full rounded-3xl border border-dashed border-border bg-card/60 p-10 text-center text-sm text-muted-foreground">
                Belum ada {active.toLowerCase()} yang diterbitkan.
              </p>
            ) : (
              items.map((item, i) => (
                <article
                  key={item.id}
                  className="card-elevated group flex h-full flex-col overflow-hidden rounded-3xl border-accent-glow"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={item.gambar_url || PLACEHOLDERS[i % PLACEHOLDERS.length]}
                      alt={item.judul}
                      loading="lazy"
                      width={900}
                      height={700}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md shadow-[var(--shadow-card)]">
                      <CalendarDays className="size-3.5" /> {formatTanggalId(item.tanggal)}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    {item.tag ? (
                      <span className="text-xs font-bold uppercase tracking-widest text-accent-gradient">
                        {item.tag}
                      </span>
                    ) : null}
                    <h3 className="mt-2 text-lg font-bold leading-snug text-foreground">{item.judul}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {item.ringkasan}
                    </p>
                    <Link
                      to="/informasi/berita"
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-accent-foreground hover:underline-offset-4 hover:underline"
                    >
                      Baca Selengkapnya <ArrowUpRight className="size-4" />
                    </Link>
                  </div>
                </article>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
