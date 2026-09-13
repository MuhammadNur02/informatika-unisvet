import { Quote } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { useHomeContent } from "@/lib/site-content";

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
}

/** Spotlight: satu testimoni ditonjolkan besar, sisanya jadi daftar ringkas — bukan grid kartu seragam. */
export function Testimonials() {
  const { alumni } = useHomeContent();
  const [featured, ...rest] = alumni.items;

  return (
    <section id="alumni" className="relative overflow-hidden bg-gradient-testimonials py-20 sm:py-28">
      {/* Animated gradient mesh background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-mesh opacity-50" aria-hidden />
      {/* Floating decorative shapes */}
      <div className="pointer-events-none absolute top-10 left-1/3 h-72 w-72 rounded-full bg-accent/5 blur-3xl float-shape" aria-hidden />
      <div className="pointer-events-none absolute bottom-20 right-1/4 h-80 w-80 rounded-full bg-primary/5 blur-3xl float-shape-delayed" aria-hidden />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={alumni.eyebrow} title={alumni.title} description={alumni.description} />

        {featured ? (
          <Reveal className="mt-14" delay={0.05}>
            <figure className="mx-auto max-w-3xl text-center">
              <Quote className="mx-auto size-10 text-accent/50" />
              <blockquote className="mt-5 text-xl font-semibold leading-relaxed text-foreground sm:text-2xl">
                "{featured.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center justify-center gap-3">
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-[image:var(--gradient-hero)] text-sm font-bold text-hero-foreground icon-glow">
                  {initials(featured.name)}
                </span>
                <span className="text-left">
                  <span className="block text-sm font-bold text-foreground">{featured.name}</span>
                  <span className="block text-xs text-muted-foreground">
                    {featured.role} · {featured.year}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ) : null}

        {rest.length > 0 ? (
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {rest.map((a, i) => (
              <Reveal key={`${a.name}-${i}`} delay={(i + 1) * 0.08}>
                <div className="flex h-full items-start gap-3 rounded-2xl border border-border bg-card/70 p-4">
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent-foreground">
                    {initials(a.name)}
                  </span>
                  <div>
                    <p className="text-sm leading-relaxed text-muted-foreground">"{a.quote}"</p>
                    <p className="mt-1.5 text-xs font-bold text-foreground">
                      {a.name} <span className="font-normal text-muted-foreground">· {a.role}</span>
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
