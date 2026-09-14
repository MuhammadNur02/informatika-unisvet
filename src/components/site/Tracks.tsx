import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GraduationCap, Code2, Palette, CheckCircle2 } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { LensFlare } from "./LensFlare";
import { useHomeContent } from "@/lib/site-content";
import { cn } from "@/lib/utils";

const ICONS = [GraduationCap, Code2, Palette];

export function Tracks() {
  const { tracks } = useHomeContent();
  const [active, setActive] = useState(tracks.items[0]?.id ?? "");
  const activeIndex = Math.max(0, tracks.items.findIndex((t) => t.id === active));
  const current = tracks.items[activeIndex];

  if (!current) return null;
  const CurrentIcon = ICONS[activeIndex % ICONS.length]!;

  return (
    <section id="kurikulum" className="relative overflow-hidden bg-gradient-tracks py-20 sm:py-28">
      {/* Gradient mesh statis + sapuan cahaya lensa yang mengikuti scroll */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-mesh opacity-50" aria-hidden />
      <LensFlare seed="kurikulum" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={tracks.eyebrow} title={tracks.title} description={tracks.description} />

        <Reveal className="mt-12">
          <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2">
            {tracks.items.map((t, i) => {
              const Icon = ICONS[i % ICONS.length]!;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActive(t.id)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-300",
                    active === t.id
                      ? "border-transparent bg-[image:var(--gradient-hero)] text-hero-foreground shadow-[var(--shadow-card)] pulse-glow"
                      : "border-border bg-card text-foreground/70 hover:border-accent/50 hover:text-primary hover:shadow-[var(--shadow-glow-accent)]",
                  )}
                >
                  <Icon className="size-4" />
                  {t.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="card-elevated grid gap-8 rounded-3xl p-8 lg:grid-cols-[1.1fr_1fr] sm:p-10 border-accent-glow"
            >
              <div>
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-[image:var(--gradient-hero)] text-hero-foreground icon-glow">
                  <CurrentIcon className="size-5" />
                </span>
                <h3 className="mt-5 text-2xl font-bold tracking-tight text-foreground">{current.headline}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{current.desc}</p>
                <ul className="mt-6 space-y-3">
                  {current.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm text-foreground/80">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-slate-surface p-6 border border-accent/20">
                <h4 className="text-sm font-bold uppercase tracking-widest text-accent-gradient">Prospek Karier</h4>
                <ul className="mt-4 space-y-3">
                  {current.careers.map((c) => (
                    <li
                      key={c}
                      className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground/85 hover:border-accent/40 hover:bg-accent/5 transition-all duration-300"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                  Semua jalur ditempuh dalam 8 semester (144 SKS) dengan skema kelas reguler maupun
                  blended learning untuk mahasiswa pekerja.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
