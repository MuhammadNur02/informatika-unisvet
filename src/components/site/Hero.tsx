import { useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useHomeContent } from "@/lib/site-content";
import { VideoBackground } from "./VideoBackground";

type PointerState = { rx: number; ry: number; mx: number; my: number; active: boolean };

const POINTER_REST: PointerState = { rx: 0, ry: 0, mx: 50, my: 50, active: false };

/**
 * Foto hero bereaksi ke posisi pointer: sedikit miring 3D mengikuti arah
 * kursor, plus lapisan shading radial di titik kursor — gelap tepat di
 * tengah (kesan permukaan "terdorong masuk") dan cincin terang di luarnya
 * (kesan sedikit "menonjol keluar"), memakai mix-blend-mode agar menyatu
 * alami dengan foto, bukan sekadar overlay polos.
 */
function HeroImage({ src, alt }: { src: string; alt: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState<PointerState>(POINTER_REST);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setPointer({
      rx: (py - 0.5) * -8,
      ry: (px - 0.5) * 8,
      mx: px * 100,
      my: py * 100,
      active: true,
    });
  }

  return (
    <div
      ref={wrapRef}
      className="perspective-distant"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setPointer(POINTER_REST)}
    >
      <div
        className="relative overflow-hidden rounded-[2rem] border border-hero-foreground/15 shadow-(--shadow-lift) transition-transform duration-300 ease-out transform-3d will-change-transform"
        style={{
          transform: `rotateX(${pointer.rx}deg) rotateY(${pointer.ry}deg) scale(${pointer.active ? 1.015 : 1})`,
        }}
      >
        <img src={src} alt={alt} width={1600} height={1104} className="h-full w-full object-cover" />
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 mix-blend-overlay"
          style={{
            opacity: pointer.active ? 1 : 0,
            background: `radial-gradient(circle at ${pointer.mx}% ${pointer.my}%, oklch(0 0 0 / 0.55) 0%, oklch(0 0 0 / 0.28) 8%, transparent 18%, oklch(1 0 0 / 0.35) 24%, transparent 40%)`,
          }}
          aria-hidden
        />
      </div>
    </div>
  );
}

const DEFAULT_HERO_IMAGE = "/banner-kampus.jpg";

// Data lama dari sebelum migrasi keluar dari Lovable masih bisa menyimpan
// path proxy aset platform (/__l5e/assets-v1/...) yang tidak pernah resolve
// di luar editor Lovable — jangan pernah tampilkan path itu, pakai foto
// default. URL asli yang diunggah lewat dashboard admin tidak pernah
// berbentuk seperti ini, jadi pengecekan ini aman.
function resolveHeroImage(url: string | undefined) {
  return url && !url.startsWith("/__l5e/") ? url : DEFAULT_HERO_IMAGE;
}

export function Hero() {
  const home = useHomeContent();
  const hero = home.hero;

  return (
    <section id="beranda" className="relative isolate overflow-hidden bg-black/40 pb-24 pt-32 sm:pb-32 sm:pt-40 backdrop-blur-[2px]">
      <VideoBackground />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-hero-foreground/20 bg-hero-foreground/10 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-accent backdrop-blur-md">
            <Sparkles className="size-3.5" /> {hero.badge}
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-hero-foreground sm:text-5xl lg:text-[3.4rem] xl:text-[3.8rem]">
            {hero.titleLead} <span className="text-gradient-gold">{hero.titleAccent}</span> {hero.titleTail}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-hero-foreground/75 sm:text-lg xl:max-w-2xl xl:text-xl">
            {hero.subtitle}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild variant="hero" size="xl">
              <Link to="/pmb/daftar">
                {hero.primaryLabel} <ArrowRight />
              </Link>
            </Button>
            <Button
              asChild
              variant="linkArrow"
              className="h-auto p-0 text-base text-hero-foreground/90 hover:text-hero-foreground"
            >
              <Link to="/akademik/kurikulum">
                {hero.secondaryLabel} <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {hero.badges.map((b) => (
              <span
                key={b}
                className="rounded-full border border-hero-foreground/15 bg-hero-foreground/8 px-3 py-1.5 text-xs font-medium text-hero-foreground/80 backdrop-blur-md"
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
          <HeroImage
            src={resolveHeroImage(hero.image)}
            alt="Gedung FKIP Universitas Ivet Semarang, kampus Program Studi Pendidikan Informatika"
          />
        </motion.div>
      </div>
    </section>
  );
}