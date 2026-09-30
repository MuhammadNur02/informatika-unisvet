import { type CSSProperties, type ReactNode } from "react";
import { Quote } from "lucide-react";
import { SectionHeading } from "./Reveal";
import { useHomeContent } from "@/lib/site-content";

type Alumni = ReturnType<typeof useHomeContent>["alumni"]["items"][number];

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
}

function TestimonialCard({ a }: { a: Alumni }) {
  return (
    <figure className="flex w-[300px] shrink-0 flex-col justify-between gap-5 rounded-2xl border border-border bg-card p-6 shadow-(--shadow-card) transition-[translate,border-color] duration-300 hover:-translate-y-1 hover:border-accent/50 sm:w-[360px]">
      <div>
        <Quote className="size-6 text-accent" aria-hidden />
        <blockquote className="mt-3 line-clamp-5 text-[15px] leading-relaxed text-foreground/85">
          &ldquo;{a.quote}&rdquo;
        </blockquote>
      </div>
      <figcaption className="flex items-center gap-3">
        <span
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-hero-gradient text-xs font-bold text-hero-foreground"
          aria-hidden
        >
          {initials(a.name)}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-bold text-foreground">{a.name}</span>
          <span className="block truncate text-xs text-muted-foreground">
            {[a.role, a.year].filter(Boolean).join(" · ")}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Satu baris marquee — diadaptasi dari 21st.dev "Testimonial Marquee"
 * (componentry): dua salinan track identik digeser -100% secara linear,
 * jadi loop-nya menyambung mulus. Animasi transform murni (dijalankan
 * compositor, tanpa JS), berhenti saat di-hover, dan mati untuk
 * prefers-reduced-motion (baris berubah jadi bisa digeser manual).
 */
function MarqueeRow({
  children,
  direction = "left",
  duration,
}: {
  children: ReactNode;
  direction?: "left" | "right";
  duration: number;
}) {
  const track = (hidden: boolean) => (
    <div
      aria-hidden={hidden || undefined}
      data-direction={direction}
      className="marquee-track flex min-w-full shrink-0 gap-4 pr-4"
      style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
    >
      {children}
    </div>
  );
  return (
    <div className="marquee-row flex overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      {track(false)}
      {track(true)}
    </div>
  );
}

export function Testimonials() {
  const { alumni } = useHomeContent();
  const items = alumni.items;
  if (items.length === 0) return null;

  // Minimal ±6 kartu per baris supaya track selalu lebih lebar dari layar.
  let filled = [...items];
  while (filled.length < 6) filled = [...filled, ...items];
  const dual = items.length >= 4;
  const half = Math.ceil(filled.length / 2);
  const rowA = dual ? filled.slice(0, half) : filled;
  const rowB = dual ? filled.slice(half) : [];

  return (
    <section id="alumni" className="relative overflow-hidden bg-gradient-testimonials py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-mesh opacity-50" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={alumni.eyebrow} title={alumni.title} description={alumni.description} />
      </div>

      <div className="relative mt-12 space-y-4 sm:mt-14">
        <MarqueeRow duration={Math.max(28, rowA.length * 7)}>
          {rowA.map((a, i) => (
            <TestimonialCard key={`a-${i}`} a={a} />
          ))}
        </MarqueeRow>
        {rowB.length > 0 ? (
          <MarqueeRow direction="right" duration={Math.max(28, rowB.length * 7)}>
            {rowB.map((a, i) => (
              <TestimonialCard key={`b-${i}`} a={a} />
            ))}
          </MarqueeRow>
        ) : null}
      </div>
    </section>
  );
}
