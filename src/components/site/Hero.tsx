import type { CSSProperties } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useHomeContent } from "@/lib/site-content";
import { usePointerGlow, radialGlowBackground } from "@/lib/use-pointer-glow";
import { VideoBackground } from "./VideoBackground";
import { RotatingText } from "./RotatingText";

/**
 * Foto hero bereaksi ke posisi pointer: sedikit miring 3D mengikuti arah
 * kursor, plus lapisan shading radial di titik kursor. Hanya aktif untuk
 * mouse — di layar sentuh tidak ada event pointermove yang terus-menerus.
 */
function HeroImage({ src, alt, isDefault }: { src: string; alt: string; isDefault: boolean }) {
  const { ref, pointer, onPointerMove, onPointerLeave } = usePointerGlow<HTMLDivElement>(8);

  return (
    <div
      ref={ref}
      className="perspective-distant"
      onPointerMove={(e) => e.pointerType === "mouse" && onPointerMove(e)}
      onPointerLeave={onPointerLeave}
    >
      <div
        className="relative overflow-hidden rounded-[2rem] border border-hero-foreground/15 shadow-(--shadow-lift) transition-transform duration-300 ease-out transform-3d"
        style={{
          transform: `rotateX(${pointer.rx}deg) rotateY(${pointer.ry}deg) scale(${pointer.active ? 1.015 : 1})`,
        }}
      >
        {/* Gambar LCP: dimuat paling awal (fetchPriority high), dan untuk foto
            bawaan tersedia versi 640px supaya HP tidak mengunduh versi desktop. */}
        <img
          src={src}
          srcSet={isDefault ? "/banner-kampus-640.jpg 640w, /banner-kampus.jpg 1264w" : undefined}
          sizes={isDefault ? "(min-width: 1024px) 45vw, 92vw" : undefined}
          alt={alt}
          width={1264}
          height={872}
          fetchPriority="high"
          decoding="async"
          className="aspect-[1264/872] h-full w-full object-cover"
        />
        <div
          className="pointer-events-none absolute inset-0 mix-blend-overlay transition-opacity duration-300"
          style={{
            opacity: pointer.active ? 1 : 0,
            background: radialGlowBackground(pointer.mx, pointer.my),
          }}
          aria-hidden
        />
      </div>
    </div>
  );
}

const DEFAULT_HERO_IMAGE = "/banner-kampus.jpg";

// Data lama dari sebelum migrasi ke hosting sendiri masih bisa menyimpan
// path proxy aset platform lama (/__l5e/assets-v1/...) yang tidak pernah
// resolve di luar editor platform itu — jangan pernah tampilkan path itu,
// pakai foto default. URL asli yang diunggah lewat dashboard admin tidak
// pernah berbentuk seperti ini, jadi pengecekan ini aman.
function resolveHeroImage(url: string | undefined) {
  return url && !url.startsWith("/__l5e/") ? url : DEFAULT_HERO_IMAGE;
}

const enter = (delay: number) => ({ "--enter-delay": `${delay}s` }) as CSSProperties;

export function Hero() {
  const home = useHomeContent();
  const hero = home.hero;
  const image = resolveHeroImage(hero.image);

  return (
    <section id="beranda" className="relative isolate overflow-hidden pb-24 pt-28 sm:pb-32 sm:pt-40">
      <VideoBackground />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:px-8">
        {/* Animasi masuk pakai CSS (.hero-enter), bukan framer-motion: teks
            hero langsung tampil sejak paint pertama tanpa menunggu JS. */}
        <div>
          <span
            className="hero-enter inline-flex max-w-full items-center gap-2 rounded-full border border-hero-foreground/20 bg-hero-foreground/10 px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-accent sm:px-4 sm:text-xs sm:tracking-[0.18em]"
            style={enter(0)}
          >
            <Sparkles className="size-3.5 shrink-0" />
            <span className="truncate">{hero.badge}</span>
          </span>
          <h1
            className="hero-enter mt-6 text-[2.1rem] font-extrabold leading-[1.1] tracking-tight text-balance text-hero-foreground sm:text-5xl lg:text-[3.3rem] xl:text-[3.7rem]"
            style={enter(0.08)}
          >
            {hero.titleFixed}{" "}
            <RotatingText items={hero.titleRotating} className="text-gradient-gold" />
          </h1>
          <p
            className="hero-enter mt-6 max-w-xl text-base leading-relaxed text-pretty text-hero-foreground/75 sm:text-lg xl:max-w-2xl"
            style={enter(0.16)}
          >
            {hero.subtitle}
          </p>
          <div className="hero-enter mt-9 flex flex-wrap items-center gap-x-6 gap-y-4" style={enter(0.24)}>
            <Button asChild variant="hero" size="xl" className="btn-shine">
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
          <ul className="hero-enter mt-8 flex flex-wrap gap-2" style={enter(0.32)}>
            {hero.badges.map((b) => (
              <li
                key={b}
                className="rounded-full border border-hero-foreground/15 bg-hero-foreground/10 px-3 py-1.5 text-xs font-medium text-hero-foreground/85"
              >
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Tanpa animasi masuk: foto ini kandidat LCP, jangan ditahan di opacity 0. */}
        <div className="relative">
          <HeroImage
            src={image}
            isDefault={image === DEFAULT_HERO_IMAGE}
            alt="Gedung FKIP Universitas Ivet Semarang, kampus Program Studi Pendidikan Informatika"
          />
        </div>
      </div>
    </section>
  );
}
