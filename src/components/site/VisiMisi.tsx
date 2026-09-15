import { Eye, Target } from "lucide-react";
import { Reveal } from "./Reveal";
import { useHomeContent } from "@/lib/site-content";
import kampusIvet from "@/assets/kampus-ivet.jpg";

/** Section gelap full-bleed — pemecah ritme antara Advantages (terang) dan Tracks (terang). */
export function VisiMisi() {
  const { visi, misi } = useHomeContent();

  return (
    <section id="profil" className="relative overflow-hidden bg-hero-gradient py-20 sm:py-28">
      {/* Foto gedung kampus sebagai latar. Sempat tanpa lapisan penggelapan sama
          sekali ("tampil bersih apa adanya"), tapi fotonya punya area tembok
          krem & langit yang cukup terang — teks putih di atasnya (cuma
          dilindungi text-shadow) berisiko menyatu tergantung crop object-cover
          di lebar layar tertentu. Ditambah multiply-darken di sini (pola sama
          dengan VideoBackground.tsx) supaya tetap aman di seluruh area foto,
          teksturnya tetap terlihat karena multiply (bukan overlay solid). */}
      <img
        src={kampusIvet}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-primary-deep/80 mix-blend-multiply" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-mesh opacity-30"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-14 lg:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-hero-foreground/20 bg-black/35 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-accent backdrop-blur-sm">
            <Eye className="size-3.5" /> {visi.title}
          </span>
          <p className="mt-6 text-2xl leading-[1.2] font-bold tracking-tight text-hero-foreground text-shadow-[0_2px_16px_oklch(0_0_0/0.45)] sm:text-3xl lg:text-[2.25rem] xl:text-5xl">
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
                  <span className="font-mono text-sm font-bold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-relaxed text-hero-foreground/90 xl:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
