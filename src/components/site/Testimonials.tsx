import { Quote } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { useHomeContent } from "@/lib/site-content";

export function Testimonials() {
  const { alumni } = useHomeContent();

  return (
    <section id="alumni" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={alumni.eyebrow} title={alumni.title} description={alumni.description} />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {alumni.items.map((a, i) => (
            <Reveal key={`${a.name}-${i}`} delay={i * 0.1}>
              <figure className="card-elevated flex h-full flex-col rounded-3xl p-7">
                <Quote className="size-8 text-accent" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/80">
                  “{a.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <span className="inline-flex size-11 items-center justify-center rounded-full bg-[image:var(--gradient-hero)] text-sm font-bold text-primary-foreground">
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
