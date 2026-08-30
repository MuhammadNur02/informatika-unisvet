import { ArrowRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { SmokeLayer } from "./SmokeLayer";
import { BinaryRain } from "./BinaryRain";

export function CtaBanner() {
  return (
    <section id="pmb" className="px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8">
      <Reveal className="mx-auto max-w-7xl">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-hero-gradient px-6 py-16 text-center sm:px-14 sm:py-20">
          <BinaryRain />
          <SmokeLayer />
          <div className="absolute -right-20 -top-20 size-80 rounded-full bg-accent/25 blur-[110px]" aria-hidden />
          <div className="relative">
            <span className="inline-flex rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Penerimaan Mahasiswa Baru 2026/2027
            </span>
            <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-primary-foreground sm:text-4xl">
              Mulai Langkahmu Menjadi Pendidik & Inovator Teknologi
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/75">
              Bergabunglah dengan Program Studi Pendidikan Informatika Universitas Ivet Semarang.
              Kuota terbatas, tersedia beasiswa prestasi dan keringanan biaya studi.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button asChild variant="hero" size="xl">
                <a href="https://pmb.ivet.ac.id" target="_blank" rel="noreferrer">
                  Daftar di Portal PMB <ArrowRight />
                </a>
              </Button>
              <Button asChild variant="heroGhost" size="xl">
                <a href="https://wa.me/6224831234">
                  <PhoneCall /> Konsultasi Admisi
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}