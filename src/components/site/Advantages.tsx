import { Layers, CalendarClock, MonitorSmartphone, Network } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { useHomeContent } from "@/lib/site-content";
import { onSpotlightMove } from "@/lib/use-spotlight";
// Foto praktikum ASLI di lab komputer kampus. Sebelumnya foto hasil AI/stok
// (hero-lab.jpg) yang memperlihatkan papan nama kampus lain ("FIU").
import kegiatanPraktikum from "@/assets/lab-iot.jpg";

const ICONS = [Layers, CalendarClock, MonitorSmartphone, Network];

export function Advantages() {
  const { advantages } = useHomeContent();
  const [featured, ...rest] = advantages.items;
  const FeaturedIcon = ICONS[0]!;

  return (
    <section id="akademik" className="relative overflow-hidden bg-gradient-advantages py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-mesh opacity-60" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={advantages.eyebrow}
          title={advantages.title}
          description={advantages.description}
          align="left"
        />

        <div className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-[1.1fr_1fr] lg:gap-6">
          {featured ? (
            <Reveal>
              <article className="group relative flex h-full min-h-80 flex-col justify-end overflow-hidden rounded-3xl border border-accent/30 p-7 shadow-(--shadow-card) sm:p-8">
                <img
                  src={kegiatanPraktikum}
                  alt="Mahasiswa praktikum di laboratorium komputer Universitas Ivet"
                  loading="lazy"
                  decoding="async"
                  width={900}
                  height={506}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.1_0.03_24/0.94)_0%,oklch(0.1_0.03_24/0.55)_40%,oklch(0.1_0.03_24/0)_75%)]"
                  aria-hidden
                />
                <div className="relative">
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-accent text-primary-deep shadow-(--shadow-glow-accent)">
                    <FeaturedIcon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-2xl font-bold tracking-tight text-hero-foreground">
                    {featured.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-hero-foreground/80">
                    {featured.desc}
                  </p>
                </div>
              </article>
            </Reveal>
          ) : null}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {rest.map((item, i) => {
              const Icon = ICONS[(i + 1) % ICONS.length]!;
              return (
                <Reveal key={item.title} delay={(i + 1) * 0.08}>
                  <article
                    onPointerMove={onSpotlightMove}
                    className="spotlight group flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-(--shadow-card) transition-[border-color,translate] duration-300 hover:-translate-y-1 hover:border-accent/50"
                  >
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-foreground ring-1 ring-accent/25 dark:text-accent">
                      <Icon className="size-4.5" />
                    </span>
                    <div>
                      <h3 className="text-base font-bold tracking-tight text-foreground">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
