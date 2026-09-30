import { lazy, Suspense, useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Eye } from "lucide-react";
import { Reveal } from "./Reveal";
import { fetchPageOverride, staticPage } from "@/lib/cms";
import { isSmallOrTouchScreen, prefersLightweight } from "@/lib/device";
import type { Block } from "@/content/types";
import kayuBg from "@/assets/Kayu-bg.jpg";

type DosenItem = Extract<Block, { type: "people" }>["items"][number];

const DOSEN_PATH = "/profil/dosen-tendik";
const FASILITAS_PATH = "/profil/fasilitas";

// Dua versi kartu ID, dua-duanya lazy — beranda tidak lagi mengunduh
// three.js + Rapier (physics WASM) + drei hanya untuk ditampilkan saat klik.
const loadLanyard3D = () => import("./DosenLanyard3D");
const DosenLanyard3D = lazy(loadLanyard3D);
const LanyardCard2D = lazy(() => import("./LanyardCard").then((m) => ({ default: m.LanyardCard })));

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
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance text-hero-foreground sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-base leading-relaxed text-pretty text-hero-foreground/70">{description}</p>
    </Reveal>
  );
}

// Lebar kartu mengikuti jumlah kolom dengan gap 1.5rem (gap-6): di HP jadi
// carousel geser (78% layar per kartu), di layar besar grid yang baris
// terakhirnya selalu di tengah (flex-wrap + justify-center) — bukan satu
// kartu yatim di kiri seperti grid 3 kolom sebelumnya.
const CARD_WIDTH =
  "w-[78%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]";
const CAROUSEL =
  "snap-carousel -mx-4 px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0";

function DosenCard({ d, onOpen }: { d: DosenItem; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      // Hangatkan chunk 3D saat mouse mendekat, supaya klik terasa instan.
      onPointerEnter={(e) => e.pointerType === "mouse" && void loadLanyard3D()}
      aria-label={`Lihat kartu ${d.name}`}
      className="dosen-card-shine group relative block aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10 bg-dosen-card text-left shadow-[0_10px_28px_-16px_oklch(0.04_0.01_20/0.65)] transition-[translate,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_30px_54px_-18px_oklch(0.03_0.01_20/0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {d.photo ? (
        <img
          src={d.photo}
          alt=""
          loading="lazy"
          decoding="async"
          width={720}
          height={900}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          style={{ objectPosition: `${d.photoPosX ?? 50}% ${d.photoPosY ?? 25}%` }}
        />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-hero-foreground/80">
          {d.name.charAt(0)}
        </span>
      )}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,oklch(0.08_0.02_22/0.96)_0%,oklch(0.08_0.02_22/0.7)_28%,oklch(0.08_0.02_22/0)_58%)]"
        aria-hidden
      />
      <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-hero-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        <Eye className="size-3.5" /> Lihat kartu
      </span>
      <div className="absolute inset-x-0 bottom-0 p-5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">{d.role}</span>
        <h3 className="mt-1.5 text-lg font-bold leading-snug text-hero-foreground">{d.name}</h3>
        {d.interest ? (
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-hero-foreground/65">{d.interest}</p>
        ) : null}
      </div>
    </button>
  );
}

function ModalFallback() {
  return (
    <div className="fixed inset-0 z-[101] flex items-center justify-center bg-black/80">
      <div className="size-10 animate-spin rounded-full border-2 border-hero-foreground/20 border-t-hero-foreground/70" />
    </div>
  );
}

/** Section gelap ("team spotlight") — pita gelap kedua di beranda, kontras dengan section terang sekitarnya. */
export function Faculty() {
  const dosen = usePeople(DOSEN_PATH);
  const fasilitas = useGallery(FASILITAS_PATH);
  const [opened, setOpened] = useState<{ dosen: DosenItem; mode: "3d" | "2d" } | null>(null);
  const close = useCallback(() => setOpened(null), []);

  function open(d: DosenItem) {
    // Kartu 3D + physics hanya untuk desktop yang mampu; HP & perangkat
    // low-end memakai kartu lanyard 2D (tetap bisa diseret & dibalik).
    const mode = prefersLightweight() || isSmallOrTouchScreen() ? "2d" : "3d";
    setOpened({ dosen: d, mode });
  }

  return (
    <section id="dosen" className="relative overflow-hidden bg-hero-gradient py-20 sm:py-28">
      <img
        src={kayuBg}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <DarkSectionHeading
          eyebrow="Profil Pengajar"
          title="Dosen & Tenaga Pendidik"
          description="Didampingi dosen berkualifikasi magister dan doktor dengan fokus riset pendidikan dan informatika."
        />

        <ul className={`mt-12 sm:mt-14 ${CAROUSEL}`}>
          {dosen.map((d, i) => (
            <li key={d.name} className={CARD_WIDTH}>
              <Reveal delay={(i % 4) * 0.06} className="h-full">
                <DosenCard d={d} onOpen={() => open(d)} />
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex justify-center">
          <Link
            to={DOSEN_PATH}
            className="inline-flex items-center gap-2 rounded-full border border-hero-foreground/20 bg-hero-foreground/10 px-5 py-2.5 text-sm font-semibold text-hero-foreground transition-colors hover:border-accent/60 hover:text-accent"
          >
            Profil lengkap dosen & tendik <ArrowRight className="size-4" />
          </Link>
        </div>

        <div id="fasilitas" className="mt-20">
          <DarkSectionHeading
            eyebrow="Fasilitas"
            title="Ruang Belajar & Laboratorium"
            description="Fasilitas penunjang praktik yang mendukung pembelajaran berbasis proyek."
          />
          <ul className={`mt-12 ${CAROUSEL}`}>
            {fasilitas.map((f, i) => (
              <li key={f.name} className={CARD_WIDTH}>
                <Reveal delay={(i % 4) * 0.06} className="h-full">
                  <article className="group relative h-72 overflow-hidden rounded-3xl border border-white/10">
                    <img
                      src={f.image}
                      alt={f.name}
                      loading="lazy"
                      decoding="async"
                      width={900}
                      height={700}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.1_0.04_25/0.95),transparent_60%)]" />
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                      <h3 className="text-lg font-bold text-hero-foreground">{f.name}</h3>
                      <p className="mt-1 line-clamp-2 text-sm text-hero-foreground/75">{f.desc}</p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {opened ? (
        <Suspense fallback={<ModalFallback />}>
          {opened.mode === "3d" ? (
            <DosenLanyard3D dosen={opened.dosen} onClose={close} />
          ) : (
            <LanyardCard2D dosen={opened.dosen} onClose={close} />
          )}
        </Suspense>
      ) : null}
    </section>
  );
}
