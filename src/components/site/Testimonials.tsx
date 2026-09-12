import { Quote } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { useHomeContent } from "@/lib/site-content";

export function Testimonials() {
  const { alumni } = useHomeContent();

  return (
    <section id="alumni" className="relative overflow-hidden bg-gradient-testimonials py-20 sm:py-28">
      {/* Animated gradient mesh background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-mesh opacity-50" aria-hidden />
      {/* Floating decorative shapes */}
      <div className="pointer-events-none absolute top-10 left-1/3 h-72 w-72 rounded-full bg-accent/5 blur-3xl float-shape" aria-hidden />
      <div className="pointer-events-none absolute bottom-20 right-1/4 h-80 w-80 rounded-full bg-primary/5 blur-3xl float-shape-delayed" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={alumni.eyebrow} title={alumni.title} description={alumni.description} />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {alumni.items.map((a, i) => (
            <Reveal key={`${a.name}-${i}`} delay={i * 0.1}>
              <figure className="card-elevated flex h-full flex-col rounded-3xl p-7 border-accent-glow">
                <Quote className="size-8 text-accent icon-glow" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/80">
                  "{a.quote}"
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <span className="inline-flex size-11 items-center justify-center rounded-full bg-[image:var(--gradient-hero)] text-sm font-bold text-primary-foreground icon-glow">
                    {a.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-foreground">{a.name}</span>
                    <span className="block text-xs text-muted-foreground">
                      {a.role} · {a.year}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
