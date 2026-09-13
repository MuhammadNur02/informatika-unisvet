import { Layers, CalendarClock, MonitorSmartphone, Network } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { useHomeContent } from "@/lib/site-content";

const ICONS = [Layers, CalendarClock, MonitorSmartphone, Network];

export function Advantages() {
  const { advantages } = useHomeContent();
  const [featured, ...rest] = advantages.items;
  const FeaturedIcon = ICONS[0]!;

  return (
    <section id="akademik" className="relative overflow-hidden bg-gradient-advantages py-20 sm:py-28">
      {/* Animated gradient mesh background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-mesh opacity-60" aria-hidden />
      {/* Floating decorative shapes */}
      <div className="pointer-events-none absolute left-0 top-20 h-72 w-72 rounded-full bg-accent/5 blur-3xl float-shape" aria-hidden />
      <div className="pointer-events-none absolute right-0 bottom-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl float-shape-delayed" aria-hidden />
      <div className="pointer-events-none absolute left-1/3 bottom-20 h-64 w-64 rounded-full bg-accent-soft/40 blur-3xl float-shape-slow" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={advantages.eyebrow}
          title={advantages.title}
          description={advantages.description}
          align="left"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          {featured ? (
            <Reveal>
              <article className="card-elevated group flex h-full min-h-80 flex-col justify-end rounded-3xl bg-[image:var(--gradient-hero)] p-8 border-accent-glow">
                <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-hero-foreground/15 text-hero-foreground icon-glow transition-transform duration-300 group-hover:scale-110">
                  <FeaturedIcon className="size-6" />
                </span>
                <h3 className="mt-6 text-2xl font-bold tracking-tight text-hero-foreground">{featured.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-hero-foreground/75">{featured.desc}</p>
              </article>
            </Reveal>
          ) : null}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {rest.map((item, i) => {
              const Icon = ICONS[(i + 1) % ICONS.length]!;
              return (
                <Reveal key={item.title} delay={(i + 1) * 0.08}>
                  <article className="card-elevated group flex h-full items-start gap-4 rounded-2xl p-5 border-accent-glow">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-foreground icon-glow transition-transform duration-300 group-hover:scale-110">
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
