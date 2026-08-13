import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, Sparkles, Cpu, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroLab from "@/assets/hero-lab.jpg";

const NODES = [
  { top: "12%", left: "8%", d: 0 },
  { top: "28%", left: "22%", d: 0.6 },
  { top: "64%", left: "12%", d: 1.2 },
  { top: "78%", left: "34%", d: 0.3 },
  { top: "18%", left: "62%", d: 0.9 },
  { top: "48%", left: "78%", d: 1.5 },
  { top: "82%", left: "68%", d: 0.45 },
  { top: "36%", left: "44%", d: 1.1 },
];

export function Hero() {
  return (
    <section id="beranda" className="relative isolate overflow-hidden bg-hero-gradient pb-24 pt-32 sm:pb-32 sm:pt-40">
      <div className="absolute inset-0 tech-grid opacity-60" aria-hidden />
      <div className="absolute inset-0" aria-hidden>
        {NODES.map((n, i) => (
          <motion.span
            key={i}
            className="absolute size-2 rounded-full bg-accent/70 shadow-[0_0_18px_4px_oklch(0.79_0.15_78/0.35)]"
            style={{ top: n.top, left: n.left }}
            animate={{ y: [0, -18, 0], opacity: [0.25, 0.9, 0.25] }}
            transition={{ duration: 5 + n.d, repeat: Infinity, ease: "easeInOut", delay: n.d }}
          />
        ))}
      </div>
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
            <Sparkles className="size-3.5" /> S1 Pendidikan Informatika — UNISVET
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-primary-foreground sm:text-5xl lg:text-[3.4rem]">
            Mencetak Pendidik IT Profesional &{" "}
            <span className="text-gradient-gold">Inovator Teknologi</span> Masa Depan
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/75 sm:text-lg">
            Mengintegrasikan keahlian pedagogi kependidikan dengan skill software development,
            cyber security & digital EdTech di Universitas Ivet Semarang.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild variant="hero" size="xl">
              <a href="#pmb">
                Daftar PMB Sekarang <ArrowRight />
              </a>
            </Button>
            <Button asChild variant="heroGhost" size="xl">
              <a href="#kurikulum">Lihat Kurikulum</a>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {["Akreditasi LAMDIK Baik", "Kuliah Reguler & Blended Learning", "4 Laboratorium Modern"].map((b) => (
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

          <motion.div
            className="absolute -right-2 top-1/2 hidden items-center gap-2 rounded-2xl border border-primary-foreground/20 bg-primary-foreground/85 px-4 py-3 text-sm font-semibold text-primary shadow-[var(--shadow-lift)] backdrop-blur-md sm:flex"
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          >
            <Laptop className="size-4 text-accent-foreground" /> Kelas Reguler & Karyawan
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}