import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "motion/react";
import { Eye } from "lucide-react";
import { Reveal } from "./Reveal";
import { LensFlare } from "./LensFlare";
import { fetchPageOverride, staticPage } from "@/lib/cms";
import { usePointerGlow, lightGlowBackground } from "@/lib/use-pointer-glow";
import type { Block } from "@/content/types";
import codingBg from "@/assets/Coding-bg.jpg";

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
function DarkSectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-hero-foreground/20 bg-hero-foreground/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-hero-foreground sm:text-4xl">{title}</h2>
      <p className="mt-3 text-base leading-relaxed text-hero-foreground/70">{description}</p>
    </Reveal>
  );
}

/** Spring "kenyal" — sedikit overshoot lalu menetap, seperti riak air, bukan berhenti tiba-tiba. */
const WATER_SPRING = { type: "spring" as const, stiffness: 190, damping: 14, mass: 0.8 };

const DOSEN_CARD_BODY = (
  d: DosenItem,
  photoClass: string,
  nameClass: string,
  roleClass: string,
  showMessage = false,
  showHint = false,
) => (
  <>
    {/* Foto dibuat "bleed" penuh sampai tepi kartu (bukan kotak kecil
        mengambang dengan padding di sekelilingnya) supaya lebih menonjol
        dan tidak terkesan tertutup/kekecilan. */}
    <div className={`relative w-full shrink-0 overflow-hidden bg-hero-foreground/10 ${photoClass}`}>
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
      {showHint ? (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 backdrop-blur-0 transition-all duration-300 group-hover:bg-black/45 group-hover:opacity-100 group-hover:backdrop-blur-[1px]"
          aria-hidden
        >
          <span className="inline-flex translate-y-1.5 items-center gap-1.5 rounded-full bg-black/70 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-hero-foreground opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Eye className="size-3.5" />
            Klik untuk melihat
          </span>
        </div>
      ) : null}
    </div>

    <div className="flex w-full flex-1 flex-col items-center px-6 pb-6 pt-5 text-center">
      <h3 className={`leading-snug text-hero-foreground ${nameClass}`}>{d.name}</h3>
      <span
        className={`mt-2.5 inline-flex items-center justify-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono font-semibold uppercase tracking-wide text-accent ${roleClass}`}
      >
        {d.role}
      </span>

      {showMessage && d.message ? (
        <p className="mx-auto mt-6 max-w-sm text-balance text-base italic leading-relaxed text-hero-foreground/80">
          &ldquo;{d.message}&rdquo;
        </p>
      ) : null}

      <div className="mt-6 flex w-full flex-col items-center gap-3.5">
        <span className="h-px w-10 bg-gradient-to-r from-transparent via-accent/50 to-transparent" aria-hidden />
        <span className="inline-block max-w-full rounded-xl bg-hero-foreground/10 px-3.5 py-1.5 text-xs leading-snug font-semibold text-hero-foreground/85">
          {d.interest}
        </span>
      </div>
    </div>
  </>
);

/**
 * Kartu dosen membesar ke overlay hampir sepenuh layar saat DIKLIK (bukan
 * sekadar disentuh pointer) — saat pointer hanya lewat/berhenti di atasnya,
 * yang muncul cuma label kecil "Klik untuk melihat" supaya jelas ada aksi
 * yang perlu dilakukan. Kartu asli di grid tetap diam di tempatnya (cuma
 * disembunyikan sementara lewat visibility, supaya layout grid tidak ikut
 * goyah) sementara "kembarannya" muncul di atas backdrop gelap dan meluncur
 * dari posisi asal ke tengah layar lewat layoutId yang sama (shared-layout
 * transition framer-motion), disertai shading radial tipis & tilt 3D ringan
 * yang mengikuti kursor. Spring dengan damping rendah membuatnya sedikit
 * "bergoyang" seperti riak air saat menetap. Kartu tertutup lewat klik di
 * bagian mana saja (kartunya sendiri atau area gelap di sekitarnya) atau
 * tombol Esc.
 */
function DosenCard({ d, delay }: { d: DosenItem; delay: number }) {
  const [expanded, setExpanded] = useState(false);
  // Kartu di kolom kiri/kanan menempuh jarak geser jauh lebih besar daripada
  // kolom tengah saat membesar (FLIP-nya menggabungkan translate+scale besar).
  // Kalau tilt ikut aktif SELAMA perjalanan itu, hasilnya numpuk jadi liar,
  // terutama untuk kartu yang jauh dari tengah. Jadi tilt baru dinyalakan
  // setelah animasi membesarnya benar-benar selesai (settled).
  const [settled, setSettled] = useState(false);
  const { ref, pointer, onPointerMove, onPointerLeave } = usePointerGlow(6);
  const layoutId = `dosen-card-${d.name}`;

  useEffect(() => {
    if (!expanded) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setExpanded(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

  return (
    <Reveal delay={delay}>
      <div style={{ visibility: expanded ? "hidden" : "visible" }} className="h-full">
        <motion.article
          {...(!expanded ? { layoutId } : {})}
          onClick={() => {
            setSettled(false);
            setExpanded(true);
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setSettled(false);
              setExpanded(true);
            }
          }}
          className="card-glass-dark group flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl text-center"
        >
          {DOSEN_CARD_BODY(d, "aspect-[4/3]", "min-h-14 text-lg font-bold", "min-h-8 max-w-full text-sm", false, true)}
        </motion.article>
      </div>

      <AnimatePresence>
        {expanded ? (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setExpanded(false)}
              aria-hidden
            />
            <motion.article
              key="expanded"
              layoutId={layoutId}
              ref={ref}
              onPointerMove={onPointerMove}
              onPointerLeave={onPointerLeave}
              onLayoutAnimationComplete={() => setSettled(true)}
              onClick={() => setExpanded(false)}
              transition={WATER_SPRING}
              style={{
                rotateX: settled ? pointer.rx : 0,
                rotateY: settled ? pointer.ry : 0,
                transformPerspective: 1200,
                // card-glass-dark sendiri punya CSS "transition: transform 0.35s"
                // untuk efek hover kartu lain — di sini transform-nya sudah
                // dikendalikan penuh oleh framer-motion (layoutId + tilt), jadi
                // transisi CSS itu harus dimatikan di sini. Kalau tidak, browser
                // ikut mencoba menghaluskan tiap update transform dari
                // framer-motion selama 0.35s tambahan, bikin bukaannya terasa
                // ada jeda & lamban (dua animasi saling berebut properti yang sama).
                transitionProperty: "none",
              }}
              className="card-glass-dark fixed inset-0 z-[101] m-auto flex h-[min(85vh,780px)] w-[min(92vw,640px)] cursor-pointer flex-col overflow-hidden rounded-[2rem] text-center"
            >
              {DOSEN_CARD_BODY(d, "aspect-[16/9]", "text-3xl font-bold", "text-lg", true)}
              <div
                className="pointer-events-none absolute inset-0 rounded-[2rem] transition-opacity duration-300 mix-blend-screen"
                style={{ opacity: pointer.active ? 1 : 0, background: lightGlowBackground(pointer.mx, pointer.my) }}
                aria-hidden
              />
            </motion.article>
          </>
        ) : null}
      </AnimatePresence>
    </Reveal>
  );
}

/** Section gelap ("team spotlight") — pita gelap kedua di beranda, kontras dengan section terang sekitarnya. */
export function Faculty() {
  const dosen = usePeople(DOSEN_PATH);
  const fasilitas = useGallery(FASILITAS_PATH);

  return (
    <section id="dosen" className="relative overflow-hidden bg-hero-gradient py-20 sm:py-28">
      {/* Latar foto coding — tampil apa adanya, tidak diblur atau ditutup
          gradien tebal, supaya fotonya jelas terlihat. */}
      <img src={codingBg} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full object-cover" />

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
