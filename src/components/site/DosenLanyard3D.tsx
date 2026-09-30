import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import Lanyard from "./Lanyard";
import type { Block } from "@/content/types";

type DosenItem = Extract<Block, { type: "people" }>["items"][number];

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
 * Modal kartu ID 3D (Lanyard React Bits: three.js + physics Rapier). File ini
 * SENGAJA terpisah & hanya dimuat lewat React.lazy dari Faculty.tsx saat
 * pengunjung desktop mengklik kartu dosen — tiga library 3D itu (±1 MB gzip)
 * tidak lagi ikut terunduh di beranda. HP & perangkat low-end memakai
 * LanyardCard.tsx (versi 2D ringan) sebagai gantinya.
 */
export default function DosenLanyard3D({ dosen, onClose }: { dosen: DosenItem; onClose: () => void }) {
  // Canvas 3D baru dipasang SATU TICK setelah modal tampil, bukan bersamaan —
  // loading model + inisialisasi physics di frame yang sama dengan animasi
  // buka modal bisa memblokir main thread cukup lama sampai Chrome mematikan
  // konteks WebGL ("Context Lost").
  const [readyFor3D, setReadyFor3D] = useState(false);
  const backImage = useMemo(() => generateDosenBackImage(dosen), [dosen]);

  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setReadyFor3D(true)));
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[101] bg-black/80 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={`Kartu dosen ${dosen.name}`}
    >
      {/* Kanvas 3D menutupi seluruh layar (kartu bisa diseret ke mana saja),
          jadi modal ditutup lewat tombol X atau tombol Esc. */}
      <div className="h-full w-full">
        {readyFor3D ? (
          <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} frontImage={dosen.photo} backImage={backImage} />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="size-10 animate-spin rounded-full border-2 border-hero-foreground/20 border-t-hero-foreground/70" />
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Tutup"
        className="absolute right-6 top-6 z-20 flex size-10 items-center justify-center rounded-full bg-hero-foreground/10 text-hero-foreground transition-colors hover:bg-hero-foreground/20"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
