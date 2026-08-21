import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal, SectionHeading } from "./Reveal";
import { cn } from "@/lib/utils";
import labIot from "@/assets/lab-iot.jpg";
import labMultimedia from "@/assets/lab-multimedia.jpg";
import labSmart from "@/assets/lab-smart.jpg";

type Item = { date: string; tag: string; title: string; excerpt: string; image: string };

const DATA: Record<string, Item[]> = {
  Berita: [
    {
      date: "08 Agu 2026",
      tag: "Prestasi",
      title: "Mahasiswa Pendidikan Informatika Juara Hackathon EdTech Nasional",
      excerpt:
        "Tim Ivet Dev membawa pulang juara pertama dengan platform asesmen adaptif berbasis AI.",
      image: labMultimedia,
    },
    {
      date: "02 Agu 2026",
      tag: "Kerja Sama",
      title: "Penandatanganan MoU dengan 12 SMK Mitra di Jawa Tengah",
      excerpt:
        "Kemitraan baru memperluas kesempatan PLP dan magang kependidikan bagi mahasiswa.",
      image: labSmart,
    },
    {
      date: "26 Jul 2026",
      tag: "Riset",
      title: "Dosen Prodi Publikasikan Riset Pembelajaran Berbasis IoT",
      excerpt:
        "Hasil riset diterbitkan di jurnal internasional terindeks Scopus kuartil dua.",
      image: labIot,
    },
  ],
  Kegiatan: [
    {
      date: "20 Agu 2026",
      tag: "Workshop",
      title: "Workshop Web Development dengan React & TypeScript",
      excerpt: "Pelatihan intensif tiga hari bersama praktisi industri dari Semarang Tech Hub.",
      image: labMultimedia,
    },
    {
      date: "05 Sep 2026",
      tag: "Seminar",
      title: "Seminar Nasional Transformasi Digital Pendidikan",
      excerpt: "Menghadirkan pembicara dari Kemendikbud, industri EdTech, dan akademisi.",
      image: labSmart,
    },
    {
      date: "18 Sep 2026",
      tag: "Kompetisi",
      title: "Ivet Informatics Competition untuk Siswa SMA/SMK",
      excerpt: "Kompetisi logika pemrograman dan desain multimedia tingkat provinsi.",
      image: labIot,
    },
  ],
  Pengumuman: [
    {
      date: "12 Agu 2026",
      tag: "Akademik",
      title: "Jadwal Kuliah Semester Gasal 2026/2027 Telah Terbit",
      excerpt: "Mahasiswa diminta melakukan validasi KRS sebelum tanggal 20 Agustus 2026.",
      image: labSmart,
    },
    {
      date: "09 Agu 2026",
      tag: "PMB",
      title: "Gelombang II Penerimaan Mahasiswa Baru Dibuka",
      excerpt: "Tersedia beasiswa prestasi dan potongan biaya pendaftaran bagi pendaftar awal.",
      image: labMultimedia,
    },
    {
      date: "01 Agu 2026",
      tag: "Layanan",
      title: "Pendaftaran Sidang Skripsi Periode September",
      excerpt: "Berkas persyaratan dikumpulkan melalui portal akademik hingga 25 Agustus.",
      image: labIot,
    },
  ],
};

const TABS = Object.keys(DATA) as string[];

export function News() {
  const [active, setActive] = useState<string>(TABS[0] ?? "Berita");

  return (
    <section id="berita" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Informasi Terkini"
          title="Berita, Pengumuman & Agenda"
          description="Ikuti perkembangan terbaru dari Program Studi Pendidikan Informatika Universitas Ivet Semarang."
        />

        <Reveal className="mt-10 flex justify-center">
          <div className="inline-flex rounded-full border border-border bg-card p-1 shadow-[var(--shadow-card)]">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActive(tab)}
                className={cn(
                  "relative rounded-full px-5 py-2 text-sm font-semibold transition-colors",
                  active === tab ? "text-primary-foreground" : "text-muted-foreground hover:text-primary",
                )}
              >
                {active === tab ? (
                  <motion.span
                    layoutId="news-tab"
                    className="absolute inset-0 rounded-full bg-[image:var(--gradient-hero)]"
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  />
                ) : null}
                <span className="relative">{tab}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {(DATA[active] ?? []).map((item: Item) => (
              <article key={item.title} className="card-elevated group flex h-full flex-col overflow-hidden rounded-3xl">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    width={900}
                    height={700}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
                    <CalendarDays className="size-3.5" /> {item.date}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-accent-foreground">
                    {item.tag}
                  </span>
                  <h3 className="mt-2 text-lg font-bold leading-snug text-foreground">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.excerpt}</p>
                  <Link
                    to="/informasi/berita"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-accent-foreground"
                  >
                    Baca Selengkapnya <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}