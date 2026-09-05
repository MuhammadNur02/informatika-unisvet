import { ArrowRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHomeContent } from "@/lib/site-content";
import { Reveal } from "./Reveal";
import { VideoBackground } from "./VideoBackground";

export function CtaBanner() {
  const { cta } = useHomeContent();

  return (
    <section id="pmb" className="px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8">
      <Reveal className="mx-auto max-w-7xl">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-hero-gradient px-6 py-16 text-center sm:px-14 sm:py-20">
          <VideoBackground />
          <div className="relative">
            <span className="inline-flex rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {cta.badge}
            </span>
            <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-primary-foreground sm:text-4xl">
              {cta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/75">
              {cta.desc}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button asChild variant="hero" size="xl">
                <a href={cta.primaryHref} target="_blank" rel="noreferrer">
                  {cta.primaryLabel} <ArrowRight />
                </a>
              </Button>
              <Button asChild variant="heroGhost" size="xl">
                <a href={cta.secondaryHref} target="_blank" rel="noreferrer">
                  <PhoneCall /> {cta.secondaryLabel}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
