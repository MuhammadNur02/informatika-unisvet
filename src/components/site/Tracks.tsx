import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GraduationCap, Code2, Palette, CheckCircle2 } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { cn } from "@/lib/utils";

const TRACKS = [
  {
    id: "pendidik",
    icon: GraduationCap,
    label: "Tenaga Pendidik & Duta Digital",
    headline: "Track 1 — Guru Informatika & Duta Digital Sekolah",
    desc: "Menguasai pedagogi informatika, perancangan pembelajaran berbasis proyek, serta kepemimpinan transformasi digital di sekolah.",
    points: [
      "Pedagogi & Kurikulum Informatika (CPL Kependidikan)",
      "Microteaching & Praktik Lapangan Persekolahan (PLP)",
      "Asesmen Digital & Manajemen Kelas Berbasis LMS",
      "Literasi Data, AI, dan Etika Digital untuk Sekolah",
    ],
    careers: ["Guru Informatika SMP/SMA/SMK", "Instruktur TIK", "Koordinator Digitalisasi Sekolah"],
  },
  {
    id: "developer",
    icon: Code2,
    label: "Software & Web Developer",
    headline: "Track 2 — Software Engineer & Web/Mobile Developer",
    desc: "Fokus rekayasa perangkat lunak modern: dari algoritma dan basis data hingga pengembangan aplikasi web serta mobile siap industri.",
    points: [
      "Algoritma, Struktur Data & Basis Data",
      "Rekayasa Perangkat Lunak, Git & DevOps Dasar",
      "Pemrograman Web (React & TypeScript) dan Mobile",
      "Keamanan Siber & Jaringan Komputer Terapan",
    ],
    careers: ["Frontend/Backend Developer", "Mobile Developer", "QA & IT Support Specialist"],
  },
  {
    id: "edtech",
    icon: Palette,
    label: "EdTech Content & Design",
    headline: "Track 3 — EdTech Content Creator & Instructional Designer",
    desc: "Merancang media dan pengalaman belajar digital: modul interaktif, video pembelajaran, gamifikasi, hingga produk EdTech.",
    points: [
      "Desain Instruksional & Model ADDIE",
      "Produksi Video, Animasi & Multimedia Pembelajaran",
      "Gamifikasi dan Pengembangan Media Interaktif",
      "Kewirausahaan Digital & Manajemen Produk EdTech",
    ],
    careers: ["Instructional Designer", "EdTech Content Creator", "Digital Learning Specialist"],
  },
];

export function Tracks() {
  const [active, setActive] = useState(TRACKS[0].id);
  const current = TRACKS.find((t) => t.id === active) ?? TRACKS[0];

  return (
    <section id="kurikulum" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Kurikulum & Profil Lulusan"
          title="Tiga Jalur Karier Lulusan"
          description="Kurikulum OBE dengan capaian pembelajaran lulusan (CPL) yang membuka tiga jalur profesi utama."
        />

        <Reveal className="mt-12">
          <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2">
            {TRACKS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActive(t.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-300",
                  active === t.id
                    ? "border-transparent bg-[image:var(--gradient-hero)] text-primary-foreground shadow-[var(--shadow-card)]"
                    : "border-border bg-card text-foreground/70 hover:border-accent/50 hover:text-primary",
                )}
              >
                <t.icon className="size-4" />
                {t.label}
              </button>
            ))}
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
              className="card-elevated grid gap-8 rounded-3xl p-8 lg:grid-cols-[1.1fr_1fr] sm:p-10"
            >
              <div>
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-[image:var(--gradient-hero)] text-primary-foreground">
                  <current.icon className="size-5" />
                </span>
                <h3 className="mt-5 text-2xl font-bold tracking-tight text-foreground">{current.headline}</h3>
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
              <div className="rounded-2xl bg-slate-surface p-6">
                <h4 className="text-sm font-bold uppercase tracking-widest text-primary">Prospek Karier</h4>
                <ul className="mt-4 space-y-3">
                  {current.careers.map((c) => (
                    <li
                      key={c}
                      className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground/85"
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