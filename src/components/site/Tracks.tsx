import { useRef, useState, type KeyboardEvent } from "react";
import { GraduationCap, Code2, Palette, CheckCircle2, BriefcaseBusiness } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { useHomeContent } from "@/lib/site-content";
import { cn } from "@/lib/utils";

const ICONS = [GraduationCap, Code2, Palette];

export function Tracks() {
  const { tracks } = useHomeContent();
  const [active, setActive] = useState(tracks.items[0]?.id ?? "");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIndex = Math.max(
    0,
    tracks.items.findIndex((t) => t.id === active),
  );
  const current = tracks.items[activeIndex];

  if (!current) return null;
  const CurrentIcon = ICONS[activeIndex % ICONS.length]!;

  // Navigasi keyboard pola WAI-ARIA Tabs: panah kiri/kanan pindah tab.
  function onTabKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (i + (e.key === "ArrowRight" ? 1 : -1) + tracks.items.length) % tracks.items.length;
    setActive(tracks.items[next]!.id);
    tabRefs.current[next]?.focus();
  }

  return (
    <section id="kurikulum" className="relative overflow-hidden bg-gradient-tracks py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-mesh opacity-50" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={tracks.eyebrow} title={tracks.title} description={tracks.description} />

        <Reveal className="mt-10 sm:mt-12">
          <div
            role="tablist"
            aria-label={tracks.title}
            className="mx-auto flex max-w-full gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] sm:flex-wrap sm:justify-center [&::-webkit-scrollbar]:hidden"
          >
            {tracks.items.map((t, i) => {
              const Icon = ICONS[i % ICONS.length]!;
              const selected = active === t.id;
              return (
                <button
                  key={t.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`track-tab-${t.id}`}
                  aria-selected={selected}
                  aria-controls="track-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(t.id)}
                  onKeyDown={(e) => onTabKeyDown(e, i)}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-[background-color,border-color,color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    selected
                      ? "border-transparent bg-hero-gradient text-hero-foreground shadow-(--shadow-card)"
                      : "border-border bg-card text-foreground/70 hover:border-accent/50 hover:text-primary",
                  )}
                >
                  <Icon className="size-4" />
                  {t.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div
          key={current.id}
          id="track-panel"
          role="tabpanel"
          aria-labelledby={`track-tab-${current.id}`}
          className="mt-8 grid gap-8 rounded-3xl border border-accent/25 bg-card p-6 shadow-(--shadow-card) animate-in fade-in slide-in-from-bottom-2 duration-300 sm:mt-10 sm:p-10 lg:grid-cols-[1.1fr_1fr]"
        >
          <div>
            <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-hero-gradient text-hero-foreground shadow-(--shadow-glow-accent)">
              <CurrentIcon className="size-5" />
            </span>
            <h3 className="mt-5 text-xl font-bold tracking-tight text-balance text-foreground sm:text-2xl">
              {current.headline}
            </h3>
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

          <div className="rounded-2xl bg-slate-surface p-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-primary dark:text-accent">
              Prospek Karier
            </h4>
            {/* Daftar berikon, bukan kotak putih bergaris tepi — versi lama
                terlihat seperti kolom input form yang bisa diisi. */}
            <ul className="mt-4 divide-y divide-border">
              {current.careers.map((c) => (
                <li key={c} className="flex items-center gap-3 py-3 text-sm font-semibold text-foreground">
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent-foreground dark:text-accent">
                    <BriefcaseBusiness className="size-4" />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
              Semua jalur ditempuh dalam 8 semester (144 SKS) dengan skema kelas reguler maupun
              blended learning untuk mahasiswa pekerja.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
