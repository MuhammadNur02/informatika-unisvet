import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "motion/react";
import { Eye, X } from "lucide-react";
import { Reveal } from "./Reveal";
import { LensFlare } from "./LensFlare";
import Lanyard from "./Lanyard";
import { fetchPageOverride, staticPage } from "@/lib/cms";
import type { Block } from "@/content/types";
import kayuBg from "@/assets/Kayu-bg.jpg";

type DosenItem = Extract<Block, { type: "people" }>["items"][number];

const DOSEN_PATH = "/profil/dosen-tendik";
const FASILITAS_PATH = "/profil/fasilitas";

/** Sumber data sama dengan halaman CMS terkait, supaya edit dosen/fasilitas di dashboard otomatis tampil di beranda juga. */
function usePageBlocks(path: string) {
  const query = useQuery({
    queryKey: ["page-content", path],
    queryFn: () => fetchPageOverride(path),
    staleTime: 60_000,
  });
  return (query.data ?? staticPage(path))?.blocks ?? [];
}

function usePeople(path: string) {
  const blocks = usePageBlocks(path);
  const block = blocks.find((b): b is Extract<Block, { type: "people" }> => b.type === "people");
  return block?.items ?? [];
}

function useGallery(path: string) {
  const blocks = usePageBlocks(path);
  const block = blocks.find((b): b is Extract<Block, { type: "gallery" }> => b.type === "gallery");
  return block?.items ?? [];
}

/** Heading versi terang-di-atas-gelap — section ini beda dari section terang lain di beranda. */
function DarkSectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-hero-foreground/20 bg-hero-foreground/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-hero-foreground sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-base leading-relaxed text-hero-foreground/70">{description}</p>
    </Reveal>
  );
}

function wrapCanvasText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const attempt = current ? `${current} ${word}` : word;
    if (current && ctx.measureText(attempt).width > maxWidth) {
      lines.push(current);
      current = word;
    } else {
      current = attempt;
    }
  }
  if (current) lines.push(current);
  return lines;
}

/**
 * Komponen Lanyard 3D (React Bits) cuma menerima gambar statis untuk sisi
 * depan & belakang kartu — bukan HTML/teks langsung. Sisi belakang aslinya
 * berisi kutipan penyemangat & bidang keahlian, jadi digambar dulu ke
 * <canvas> lalu diekspor sebagai data URL supaya bisa dipakai sebagai
 * backImage.
 */
function generateDosenBackImage(d: DosenItem): string {
  const W = 800;
  const H = 1120;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  const gradient = ctx.createLinearGradient(0, 0, 0, H);
  gradient.addColorStop(0, "#0d0906");
  gradient.addColorStop(1, "#4a0e17");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, W, H);

  ctx.textAlign = "center";
  let cursorY = H / 2 - 60;

  if (d.message) {
    ctx.font = "italic 36px Georgia, serif";
    ctx.fillStyle = "#f5f1ea";
    const lines = wrapCanvasText(ctx, `“${d.message}”`, W - 180);
    cursorY -= ((lines.length - 1) * 48) / 2;
    for (const line of lines) {
      ctx.fillText(line, W / 2, cursorY);
      cursorY += 48;
    }
    cursorY += 70;
  }

  if (d.interest) {
    ctx.font = "600 28px system-ui, sans-serif";
    ctx.fillStyle = "#e8b84b";
    ctx.fillText(d.interest, W / 2, cursorY);
  }

  return canvas.toDataURL("image/png");
}

/**
 * Kartu dosen di grid — hover menampilkan label "Klik untuk melihat". Klik
 * membuka kartu ID 3D (komponen Lanyard dari React Bits): kartu fisik
 * bertali yang jatuh & disimulasikan lewat physics engine (Rapier), bisa
 * diseret bebas dengan mouse/jari mengikuti fisika tali sungguhan. Foto
 * dosen dipasang sebagai sisi depan; kutipan & bidang keahlian digambar ke
 * kanvas lalu dipasang sebagai sisi belakang (lihat generateDosenBackImage).
 */
function DosenCard({ d, delay }: { d: DosenItem; delay: number }) {
  const [expanded, setExpanded] = useState(false);
  // Canvas 3D (model GLTF + physics engine Rapier) baru dipasang SATU TICK
  // setelah modal tampil, bukan bersamaan. Tanpa ini, animasi buka modal +
  // loading model + inisialisasi physics semuanya berebut main thread di
  // frame yang sama — pada mesin yang lebih lambat ini bisa memblokir main
  // thread sampai ~1-2 detik penuh, dan Chrome meresponsnya dengan
  // mematikan konteks WebGL (dianggap tab tidak responsif), jadi kartunya
  // tidak pernah tampil ("Context Lost" di console). Menunda pemasangan
  // Canvas menyebar beban itu ke frame terpisah.
  const [readyFor3D, setReadyFor3D] = useState(false);

  const backImage = useMemo(() => (expanded ? generateDosenBackImage(d) : null), [expanded, d]);

  useEffect(() => {
    if (!expanded) {
      setReadyFor3D(false);
      return;
    }
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setReadyFor3D(true)));
    return () => cancelAnimationFrame(id);
  }, [expanded]);

  useEffect(() => {
    if (!expanded) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setExpanded(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

  return (
    <>
      <Reveal delay={delay}>
        <motion.article
          onClick={() => setExpanded(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setExpanded(true);
            }
          }}
          className="card-glass-dark group flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl text-center"
        >
          <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-hero-foreground/10">
            {d.photo ? (
              <img
                src={d.photo}
                alt={d.name}
                className="h-full w-full object-cover"
                style={{ objectPosition: `${d.photoPosX ?? 50}% ${d.photoPosY ?? 25}%` }}
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-3xl font-bold text-hero-foreground">
                {d.name.charAt(0)}
              </span>
            )}
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,oklch(0.08_0_0/0.92)_0%,oklch(0.08_0_0/0.5)_30%,oklch(0.08_0_0/0)_62%)]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 backdrop-blur-0 transition-all duration-300 group-hover:bg-black/45 group-hover:opacity-100 group-hover:backdrop-blur-[1px]"
              aria-hidden
            >
              <span className="inline-flex translate-y-1.5 items-center gap-1.5 rounded-full bg-black/70 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-hero-foreground opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <Eye className="size-3.5" />
                Klik untuk melihat
              </span>
            </div>
          </div>

          <div className="flex w-full flex-1 flex-col items-center px-6 pb-6 pt-5 text-center">
            <h3 className="min-h-14 text-lg font-bold leading-snug text-hero-foreground">
              {d.name}
            </h3>
            <span className="mt-2.5 inline-flex min-h-8 max-w-full items-center justify-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-sm font-semibold uppercase tracking-wide text-accent">
              {d.role}
            </span>

            <div className="mt-6 flex w-full flex-col items-center gap-3.5">
              <span
                className="h-px w-10 bg-gradient-to-r from-transparent via-accent/50 to-transparent"
                aria-hidden
              />
              <span className="inline-block max-w-full rounded-xl bg-hero-foreground/10 px-3.5 py-1.5 text-xs leading-snug font-semibold text-hero-foreground/85">
                {d.interest}
              </span>
            </div>
          </div>
        </motion.article>
      </Reveal>

      {/* Sengaja DI LUAR <Reveal> — Reveal membungkus konten dengan
          motion.div ber-transform (translateY) untuk animasi scroll-in-view.
          "position: fixed" pada modal ini butuh benar-benar lepas ke
          viewport; kalau nempel di dalam ancestor yang punya transform
          (termasuk transform identitas translateY(0)), spesifikasi CSS
          menjadikan ancestor itu containing block untuk fixed descendant-nya
          — modal jadi ketiban terkurung ke kotak kartu asal, bukan
          menutupi seluruh layar (sudah kejadian & dikonfirmasi lewat
          pengukuran getBoundingClientRect sebelum dipindah ke sini). */}
      <AnimatePresence>
        {expanded ? (
          <motion.div
            className="fixed inset-0 z-[101] bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setExpanded(false)}
          >
            <div className="h-full w-full" onClick={(e) => e.stopPropagation()}>
              {readyFor3D ? (
                <Lanyard
                  position={[0, 0, 20]}
                  gravity={[0, -40, 0]}
                  frontImage={d.photo}
                  backImage={backImage}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <div className="size-10 animate-spin rounded-full border-2 border-hero-foreground/20 border-t-hero-foreground/70" />
                </div>
              )}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(false);
              }}
              aria-label="Tutup"
              className="absolute right-6 top-6 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-hero-foreground/10 text-hero-foreground transition-colors hover:bg-hero-foreground/20"
            >
              <X className="size-4" />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

/** Section gelap ("team spotlight") — pita gelap kedua di beranda, kontras dengan section terang sekitarnya. */
export function Faculty() {
  const dosen = usePeople(DOSEN_PATH);
  const fasilitas = useGallery(FASILITAS_PATH);

  return (
    <section id="dosen" className="relative overflow-hidden bg-hero-gradient py-20 sm:py-28">
      {/* Latar tekstur kayu — tampil apa adanya, tidak diblur atau ditutup
          gradien tebal, supaya teksturnya jelas terlihat. */}
      <img
        src={kayuBg}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <DarkSectionHeading
            eyebrow="Profil Pengajar"
            title="Dosen & Tenaga Pendidik"
            description="Didampingi dosen berkualifikasi magister dan doktor dengan fokus riset pendidikan dan informatika."
          />

          <div className="relative mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dosen.map((d, i) => (
              <DosenCard key={d.name} d={d} delay={(i % 3) * 0.08} />
            ))}
          </div>
        </div>

        <div id="fasilitas" className="relative mt-20 overflow-hidden">
          <LensFlare seed="fasilitas" />
          <DarkSectionHeading
            eyebrow="Fasilitas"
            title="Ruang Belajar & Laboratorium"
            description="Fasilitas penunjang praktik yang mendukung pembelajaran berbasis proyek."
          />
          <div className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {fasilitas.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.08}>
                <article className="card-glass-dark group relative h-72 overflow-hidden rounded-3xl">
                  <img
                    src={f.image}
                    alt={f.name}
                    loading="lazy"
                    width={900}
                    height={700}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.1_0.04_25/0.95),transparent_60%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="text-lg font-bold text-hero-foreground">{f.name}</h3>
                    <p className="mt-1 text-sm text-hero-foreground/75">{f.desc}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
