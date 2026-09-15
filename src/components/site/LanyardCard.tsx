import { useState } from "react";
import { motion, useMotionValue, useTransform, type MotionValue } from "motion/react";
import { X } from "lucide-react";
import type { Block } from "@/content/types";

type DosenItem = Extract<Block, { type: "people" }>["items"][number];

/** Titik jangkar tali (klip di langit-langit) dan titik tali menyambung ke lubang kartu, dalam koordinat SVG lokal. */
const ROPE_ANCHOR = { x: 150, y: 22 };
const CARD_ATTACH = { x: 150, y: 204 };

/** Bentuk tali saat kartu diam di posisi netral (x=0, y=0) — dipakai sebagai
    jalur tetap untuk teks bordir supaya tidak ikut dihitung ulang tiap frame
    drag (lihat catatan di LanyardRope). */
const RESTING_ROPE_PATH = `M${ROPE_ANCHOR.x} ${ROPE_ANCHOR.y} Q${ROPE_ANCHOR.x} ${
  ROPE_ANCHOR.y + (CARD_ATTACH.y - ROPE_ANCHOR.y) * 0.42
} ${CARD_ATTACH.x} ${CARD_ATTACH.y}`;

/**
 * Tali digambar sebagai satu <path> yang lengkungnya dihitung ulang tiap
 * frame dari posisi kartu (x, y) — bukan garis statis. Titik kontrol kurva
 * quadratic ikut condong ke arah kartu ditarik, jadi tali terlihat benar-benar
 * menahan beban & melengkung, bukan kaku seperti tongkat.
 *
 * Teks "UNIVERSITAS IVET" SENGAJA tidak ikut ditempel ke path dinamis itu —
 * <textPath> memaksa browser menata ulang glyph sepanjang kurva di main
 * thread tiap kali path berubah, jauh lebih berat daripada sekadar
 * menggeser sebuah <path> lewat GPU, dan ini yang bikin drag terasa patah-
 * patah (terutama di HP). Karena bagian atas tali (dekat jangkar, tempat
 * teksnya berada) nyaris tidak melengkung meski kartu ditarik jauh, teksnya
 * cukup ditempel ke jalur statis RESTING_ROPE_PATH — hasilnya nyaris identik
 * secara visual tapi tidak lagi menghitung ulang tata letak teks tiap frame.
 */
function LanyardRope({ x, y }: { x: MotionValue<number>; y: MotionValue<number> }) {
  const pathD = useTransform([x, y], (latest) => {
    const [lx, ly] = latest as [number, number];
    const attachX = CARD_ATTACH.x + lx;
    const attachY = CARD_ATTACH.y + ly;
    const ctrlX = ROPE_ANCHOR.x + lx * 0.55;
    const ctrlY = ROPE_ANCHOR.y + (attachY - ROPE_ANCHOR.y) * 0.42;
    return `M${ROPE_ANCHOR.x} ${ROPE_ANCHOR.y} Q${ctrlX} ${ctrlY} ${attachX} ${attachY}`;
  });

  return (
    <svg
      width={300}
      height={420}
      viewBox="0 0 300 420"
      className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 overflow-visible"
      aria-hidden
    >
      <motion.path d={pathD} fill="none" stroke="#131210" strokeWidth={22} strokeLinecap="round" />
      <path id="lanyard-rope-label-path" d={RESTING_ROPE_PATH} fill="none" stroke="none" />
      <text fontSize={7.5} fill="#e7e3d8" textAnchor="middle" fontFamily="sans-serif" letterSpacing={0.8}>
        <textPath href="#lanyard-rope-label-path" startOffset="12%">
          UNIVERSITAS IVET
        </textPath>
      </text>
      <text fontSize={7.5} fill="#e7e3d8" textAnchor="middle" fontFamily="sans-serif" letterSpacing={0.8}>
        <textPath href="#lanyard-rope-label-path" startOffset="60%">
          UNIVERSITAS IVET
        </textPath>
      </text>
    </svg>
  );
}

/**
 * Kartu dosen bergaya lanyard fisik: menggantung dari klip di atas layar,
 * jatuh dengan spring saat pertama muncul, bisa diseret bebas ke segala arah
 * (elastis, memantul kembali via framer-motion drag) tanpa perlu fisika
 * manual, dan bisa di-tap untuk membalik ke sisi belakang. Tap dibedakan
 * dari drag oleh framer-motion sendiri lewat prop onTap, jadi tidak perlu
 * threshold jarak manual.
 */
export function LanyardCard({ dosen, onClose }: { dosen: DosenItem; onClose: () => void }) {
  const [flipped, setFlipped] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Kartu sedikit "condong" mengikuti arah ditarik, seperti beban di ujung
  // tali — bukan cuma bergeser lurus.
  const lean = useTransform(x, [-170, 170], [10, -10]);

  return (
    <motion.div
      className="fixed inset-0 z-[101] flex items-start justify-center bg-black/70 pt-6 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <div className="relative" style={{ width: 300, height: 480 }} onClick={(e) => e.stopPropagation()}>
        {/* Klip plastik di langit-langit — titik jangkar tetap, tidak ikut bergerak. */}
        <div className="absolute left-1/2 top-0 h-[22px] w-[52px] -translate-x-1/2 rounded-md bg-[#0d0c0a]" />

        <LanyardRope x={x} y={y} />

        <motion.div
          drag
          dragElastic={0.55}
          dragConstraints={{ top: -150, bottom: 150, left: -170, right: 170 }}
          dragTransition={{ bounceStiffness: 280, bounceDamping: 16 }}
          // touchAction "none": tanpa ini, browser mobile mencoba menafsirkan
          // gestur yang sama sebagai scroll/pan halaman SEKALIGUS framer-motion
          // menanganinya sebagai drag kartu — keduanya "rebutan" input tiap
          // frame dan hasilnya terasa patah-patah. willChange menyiapkan layer
          // GPU untuk transform di awal, supaya sentuhan pertama tidak nge-hitch.
          style={{ x, y, rotate: lean, touchAction: "none", willChange: "transform" }}
          onTap={() => setFlipped((f) => !f)}
          initial={{ y: -420, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
          className="absolute left-1/2 top-[204px] -translate-x-1/2 cursor-grab active:cursor-grabbing"
        >
          <div style={{ perspective: 1100 }}>
            <motion.div
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 16 }}
              style={{ transformStyle: "preserve-3d", width: 236, height: 340 }}
              className="relative shadow-2xl"
            >
              {/* Sisi depan: foto full-bleed, nama, jabatan — tanpa kapsul/badge. */}
              <div
                style={{ backfaceVisibility: "hidden" }}
                className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl bg-[#241f1a]"
              >
                <div className="absolute left-1/2 top-2 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-black/70" />
                <div className="relative h-[62%] w-full shrink-0 overflow-hidden bg-hero-foreground/10">
                  {dosen.photo ? (
                    <img
                      src={dosen.photo}
                      alt={dosen.name}
                      className="h-full w-full object-cover"
                      style={{ objectPosition: `${dosen.photoPosX ?? 50}% ${dosen.photoPosY ?? 25}%` }}
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-3xl font-bold text-hero-foreground">
                      {dosen.name.charAt(0)}
                    </span>
                  )}
                  <div
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(20,16,12,0.55),transparent_45%)]"
                    aria-hidden
                  />
                </div>
                <div className="flex flex-1 flex-col items-center justify-center px-4 pb-3 pt-2 text-center">
                  <h3 className="text-[15px] font-medium leading-snug text-hero-foreground">{dosen.name}</h3>
                  <p className="mt-1 text-xs text-accent">{dosen.role}</p>
                </div>
                <p className="pb-2.5 text-center text-[9px] tracking-wide text-hero-foreground/40">
                  universitas ivet semarang
                </p>
              </div>

              {/* Sisi belakang: gradasi maroon (atas) ke hitam (bawah), kutipan, bidang keahlian. */}
              <div
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-t from-[#0d0906] to-[#4a0e17] px-5 text-center"
              >
                {dosen.message ? (
                  <p className="text-[13px] italic leading-relaxed text-hero-foreground/90">&ldquo;{dosen.message}&rdquo;</p>
                ) : null}
                {dosen.interest ? <p className="mt-4 text-[11px] tracking-wide text-accent">{dosen.interest}</p> : null}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Tutup"
        className="absolute right-6 top-6 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-hero-foreground/10 text-hero-foreground transition-colors hover:bg-hero-foreground/20"
      >
        <X className="size-4" />
      </button>
    </motion.div>
  );
}