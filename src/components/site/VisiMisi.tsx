import { Eye, Target } from "lucide-react";
import { Reveal } from "./Reveal";
import { LensFlare } from "./LensFlare";
import { useHomeContent } from "@/lib/site-content";

/** Section gelap full-bleed — pemecah ritme antara Advantages (terang) dan Tracks (terang). */
export function VisiMisi() {
  const { visi, misi } = useHomeContent();

  return (
    <section id="profil" className="relative overflow-hidden bg-hero-gradient py-20 sm:py-28">
      {/* Mesh gradient statis + sapuan cahaya lensa yang mengikuti scroll */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-mesh opacity-40" aria-hidden />
      <LensFlare seed="profil" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-14 lg:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-hero-foreground/20 bg-hero-foreground/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
            <Eye className="size-3.5" /> {visi.title}
          </span>
          <p className="mt-6 text-2xl font-bold leading-snug tracking-tight text-hero-foreground sm:text-3xl lg:text-[2.25rem] xl:text-5xl">
            {visi.text}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="card-glass-dark rounded-3xl p-6 sm:p-8">
            <h3 className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
              <Target className="size-3.5" /> {misi.title}
            </h3>
            <ol className="mt-5">
              {misi.items.map((item, i) => (
                <li
                  key={item}
                  className="flex gap-4 border-t border-hero-foreground/10 py-4 first:border-t-0 first:pt-0"
                >
                  <span className="font-mono text-sm font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm leading-relaxed text-hero-foreground/80 xl:text-base">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
