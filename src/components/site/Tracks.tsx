import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GraduationCap, Code2, Palette, CheckCircle2 } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { useHomeContent } from "@/lib/site-content";
import { cn } from "@/lib/utils";

const ICONS = [GraduationCap, Code2, Palette];

export function Tracks() {
  const { tracks } = useHomeContent();
  const [active, setActive] = useState(tracks.items[0]?.id ?? "");
  const [hovered, setHovered] = useState<string | null>(null);
  const activeIndex = Math.max(
    0,
    tracks.items.findIndex((t) => t.id === active),
  );
  const current = tracks.items[activeIndex];

  if (!current) return null;
  const CurrentIcon = ICONS[activeIndex % ICONS.length]!;

  return (
    <section id="kurikulum" className="relative overflow-hidden bg-gradient-tracks py-20 sm:py-28">
      {/* Gradient mesh statis */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-mesh opacity-50"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={tracks.eyebrow}
          title={tracks.title}
          description={tracks.description}
        />

        <Reveal className="mt-12">
          <div
            className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2"
            onMouseLeave={() => setHovered(null)}
          >
            {tracks.items.map((t, i) => {
              const Icon = ICONS[i % ICONS.length]!;
              const trulyActive = active === t.id;
              // Pill mengikuti kursor saat hover (tanpa perlu klik); begitu
              // pointer keluar dari grup tombol, kembali ke tab yang benar-benar
              // dipilih — layoutId yang sama membuat transisinya meluncur mulus.
              const indicated = (hovered ?? active) === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActive(t.id)}
                  onMouseEnter={() => setHovered(t.id)}
                  className={cn(
                    "relative inline-flex items-center gap-2 overflow-hidden rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors duration-300",
                    indicated
                      ? "border-transparent text-hero-foreground"
                      : "border-border bg-card text-foreground/70 hover:border-accent/50 hover:text-primary hover:shadow-[var(--shadow-glow-accent)]",
                  )}
                >
                  {indicated ? (
                    // Sengaja TANPA -z-10: pada elemen tanpa stacking context
                    // sendiri (tombolnya cuma "relative", tidak punya z-index),
                    // z-index negatif dievaluasi di stacking context ANCESTOR
                    // terdekat yang sesungguhnya (bisa jauh lebih tinggi dari
                    // tombol ini) — bukan "di belakang background tombol ini
                    // saja" seperti yang terlihat. Urutan DOM biasa (span ini
                    // duluan, ikon & label sesudahnya) sudah cukup untuk
                    // menaruhnya di atas background tombol tapi di bawah
                    // ikon/label, tanpa risiko itu. bg-primary juga dihapus
                    // dari tombolnya sendiri (fallback yang salah warna di
                    // mode gelap — jadi putih, padahal teksnya juga putih)
                    // karena warna asli pill ini sudah pasti datang dari span
                    // bg-hero-gradient ini, keduanya selalu tampil bersamaan.
                    <motion.span
                      layoutId="tracks-tab-pill"
                      className={cn(
                        "absolute inset-0 rounded-full bg-hero-gradient shadow-(--shadow-card)",
                        trulyActive && "pulse-glow",
                      )}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <Icon className="relative size-4" />
                  <span className="relative">{t.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="card-elevated grid gap-8 rounded-3xl p-8 lg:grid-cols-[1.1fr_1fr] sm:p-10 border-accent-glow"
            >
              <div>
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-[image:var(--gradient-hero)] text-hero-foreground icon-glow">
                  <CurrentIcon className="size-5" />
                </span>
                <h3 className="mt-5 text-2xl font-bold tracking-tight text-foreground">
                  {current.headline}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{current.desc}</p>
                <ul className="mt-6 space-y-3">
                  {current.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm text-foreground/80">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-slate-surface p-6 border border-accent/20">
                <h4 className="text-sm font-bold uppercase tracking-widest text-accent-foreground">
                  Prospek Karier
                </h4>
                <ul className="mt-4 space-y-3">
                  {current.careers.map((c) => (
                    <li
                      key={c}
                      className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground/85 hover:border-accent/40 hover:bg-accent/5 transition-all duration-300"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                  Semua jalur ditempuh dalam 8 semester (144 SKS) dengan skema kelas reguler maupun
                  blended learning untuk mahasiswa pekerja.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
