import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, Sparkles, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroLab from "@/assets/hero-lab.jpg";

export function Hero() {
  return (
    <section id="beranda" className="relative isolate overflow-hidden bg-hero-gradient pb-24 pt-32 sm:pb-32 sm:pt-40">
      <div className="absolute inset-0 tech-grid opacity-60" aria-hidden />
      <div
        className="absolute -right-24 -top-24 size-[28rem] rounded-full bg-accent/20 blur-[120px]"
        aria-hidden
      />
      <div
        className="absolute -bottom-40 -left-24 size-[26rem] rounded-full bg-primary-soft/40 blur-[120px]"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent backdrop-blur-md">
            <Sparkles className="size-3.5" /> Sarjana Pendidikan Informatika
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-primary-foreground sm:text-5xl lg:text-[3.4rem]">
            Mencetak Pendidik & Ahli{" "}
            <span className="text-gradient-gold">Teknologi Informasi</span> Masa Depan
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/75 sm:text-lg">
            Program Studi Pendidikan Informatika Universitas Ivet Semarang – Mengintegrasikan
            keahlian kependidikan dengan teknologi digital terdepan.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild variant="hero" size="xl">
              <a href="#akademik">
                Jelajahi Prodi <ArrowRight />
              </a>
            </Button>
            <Button asChild variant="heroGhost" size="xl">
              <a href="#pmb">Daftar Sekarang</a>
            </Button>
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
              src={heroLab}
              alt="Laboratorium komputer modern Pendidikan Informatika Universitas Ivet Semarang"
              width={1600}
              height={1104}
              className="h-full w-full object-cover"
            />
          </div>

          <motion.div
            className="absolute -left-4 top-8 flex items-center gap-2 rounded-2xl border border-primary-foreground/20 bg-primary-foreground/85 px-4 py-3 text-sm font-semibold text-primary shadow-[var(--shadow-lift)] backdrop-blur-md sm:-left-8"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ShieldCheck className="size-4 text-accent-foreground" /> Akreditasi Baik
          </motion.div>

          <motion.div
            className="absolute -bottom-6 right-2 flex max-w-[16rem] items-center gap-2 rounded-2xl border border-primary-foreground/20 bg-primary-foreground/85 px-4 py-3 text-sm font-semibold text-primary shadow-[var(--shadow-lift)] backdrop-blur-md sm:right-[-1.5rem]"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          >
            <Cpu className="size-4 text-accent-foreground" /> Kurikulum Berbasis Industri & EdTech
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}