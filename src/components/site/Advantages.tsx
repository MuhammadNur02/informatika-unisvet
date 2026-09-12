import { Layers, CalendarClock, MonitorSmartphone, Network, Target, Eye } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { useHomeContent } from "@/lib/site-content";

const ICONS = [Layers, CalendarClock, MonitorSmartphone, Network];

export function Advantages() {
  const { advantages, visi, misi } = useHomeContent();

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
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length]!;
            return (
              <Reveal key={`${item.title}-${i}`} delay={i * 0.08}>
                <article className="card-elevated group h-full rounded-3xl p-6 border-accent-glow">
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-[image:var(--gradient-hero)] text-primary-foreground shadow-[var(--shadow-card)] icon-glow transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold tracking-tight text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div id="profil" className="mt-16 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="card-elevated h-full rounded-3xl p-8 border-accent-glow">
              <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-accent/15 text-accent-foreground icon-glow">
                <Eye className="size-5" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-foreground">{visi.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{visi.text}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card-elevated h-full rounded-3xl p-8 border-accent-glow">
              <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-accent/15 text-accent-foreground icon-glow">
                <Target className="size-5" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-foreground">{misi.title}</h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                {misi.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
