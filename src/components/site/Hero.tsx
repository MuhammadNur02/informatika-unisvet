import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, Sparkles, Cpu, Laptop } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useHomeContent } from "@/lib/site-content";
import { VideoBackground } from "./VideoBackground";

export function Hero() {
  const home = useHomeContent();
  const hero = home.hero;
  const floating = hero.floating.slice(0, 3);

  return (
    <section id="beranda" className="relative isolate overflow-hidden bg-hero-gradient pb-24 pt-32 sm:pb-32 sm:pt-40">
      <VideoBackground />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent backdrop-blur-md">
            <Sparkles className="size-3.5" /> {hero.badge}
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-primary-foreground sm:text-5xl lg:text-[3.4rem]">
            {hero.titleLead} <span className="text-gradient-gold">{hero.titleAccent}</span> {hero.titleTail}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/75 sm:text-lg">
            {hero.subtitle}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild variant="hero" size="xl">
              <Link to="/pmb/daftar">
                {hero.primaryLabel} <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="heroGhost" size="xl">
              <Link to="/akademik/kurikulum">{hero.secondaryLabel}</Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {hero.badges.map((b) => (
              <span
                key={b}
                className="rounded-full border border-primary-foreground/15 bg-primary-foreground/8 px-3 py-1.5 text-xs font-medium text-primary-foreground/80 backdrop-blur-md"
              >
                {b}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="overflow-hidden rounded-[2rem] border border-primary-foreground/15 shadow-[var(--shadow-lift)]">
            <img
              src={hero.image}
              alt="Gedung FKIP Universitas Ivet Semarang, kampus Program Studi Pendidikan Informatika"
              width={1600}
              height={1104}
              className="h-full w-full object-cover"
            />
          </div>

          {floating[0] ? (
            <motion.div
              className="absolute -left-4 top-8 flex items-center gap-2 rounded-2xl border border-primary-foreground/20 bg-primary-foreground/85 px-4 py-3 text-sm font-semibold text-primary shadow-[var(--shadow-lift)] backdrop-blur-md sm:-left-8"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ShieldCheck className="size-4 text-accent-foreground" /> {floating[0]}
            </motion.div>
          ) : null}

          {floating[1] ? (
            <motion.div
              className="absolute -bottom-6 right-2 flex max-w-[16rem] items-center gap-2 rounded-2xl border border-primary-foreground/20 bg-primary-foreground/85 px-4 py-3 text-sm font-semibold text-primary shadow-[var(--shadow-lift)] backdrop-blur-md sm:right-[-1.5rem]"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            >
              <Cpu className="size-4 text-accent-foreground" /> {floating[1]}
            </motion.div>
          ) : null}

          {floating[2] ? (
            <motion.div
              className="absolute -right-2 top-1/2 hidden items-center gap-2 rounded-2xl border border-primary-foreground/20 bg-primary-foreground/85 px-4 py-3 text-sm font-semibold text-primary shadow-[var(--shadow-lift)] backdrop-blur-md sm:flex"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            >
              <Laptop className="size-4 text-accent-foreground" /> {floating[2]}
            </motion.div>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
