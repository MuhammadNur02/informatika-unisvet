import type { PageContent } from "./types";

export const AKADEMIK_PAGES: Record<string, PageContent> = {
  "/akademik/kurikulum": {
    eyebrow: "Akademik",
    title: "Kurikulum Berbasis OBE",
    description:
      "Kurikulum 146 SKS yang memadukan penguatan pedagogi, rekayasa perangkat lunak, jaringan & IoT, multimedia, dan kecerdasan artifisial.",
    metaTitle: "Kurikulum — Pendidikan Informatika UNISVET Semarang",
    blocks: [
      {
        type: "prose",
        title: "Struktur Kurikulum",
        paragraphs: [
          "Kurikulum disusun dengan pendekatan Outcome Based Education (OBE): setiap mata kuliah dipetakan langsung pada capaian pembelajaran lulusan (CPL) dan dievaluasi melalui asesmen berbasis kinerja.",
          "Empat semester pertama menekankan fondasi pemrograman, matematika informatika, dan ilmu kependidikan. Semester lanjut fokus pada peminatan, praktik lapangan (PLP), MBKM, dan tugas akhir.",
        ],
      },
      {
        type: "table",
        title: "Distribusi Beban Studi",
        head: ["Kelompok Mata Kuliah", "SKS", "Porsi"],
        rows: [
          ["Mata Kuliah Wajib Umum (MKWU)", "10", "7%"],
          ["Kependidikan & Pedagogi", "34", "23%"],
          ["Inti Keilmuan Informatika", "62", "43%"],
          ["Peminatan & Pilihan", "20", "14%"],
          ["Praktik Lapangan, MBKM & KKN", "12", "8%"],
          ["Skripsi & Seminar", "8", "5%"],
        ],
        note: "Total 146 SKS, ditempuh normal dalam 8 semester.",
      },
      {
        type: "steps",
        title: "Alur Studi per Tahun",
        items: [
          { title: "Tahun 1 — Fondasi", desc: "Algoritma & pemrograman dasar, matematika diskrit, pengantar pendidikan, dan literasi digital." },
          { title: "Tahun 2 — Penguatan", desc: "Struktur data, basis data, jaringan komputer, kurikulum & pembelajaran, media pembelajaran." },
          { title: "Tahun 3 — Peminatan", desc "Rekayasa perangkat lunak, IoT, AI, multimedia, microteaching, dan proyek kolaboratif." },
          { title: "Tahun 4 — Aktualisasi", desc: "PLP di sekolah mitra, magang/MBKM industri, KKN, seminar proposal, dan skripsi." },
        ],
      },
    ],
  },
};