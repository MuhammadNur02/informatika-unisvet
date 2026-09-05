import { Layers, CalendarClock, MonitorSmartphone, Network, Target, Eye } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { useHomeContent } from "@/lib/site-content";

const ICONS = [Layers, CalendarClock, MonitorSmartphone, Network];

export function Advantages() {
  const { advantages, visi, misi } = useHomeContent();

  return (
    <section id="akademik" className="bg-slate-surface py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                <article className="card-elevated group h-full rounded-3xl p-6">
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-[image:var(--gradient-hero)] text-primary-foreground shadow-[var(--shadow-card)] transition-transform duration-300 group-hover:scale-110">
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
            <div className="card-elevated h-full rounded-3xl p-8">
              <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-accent/15 text-accent-foreground">
                <Eye className="size-5" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-foreground">{visi.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{visi.text}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card-elevated h-full rounded-3xl p-8">
              <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-accent/15 text-accent-foreground">
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
