import type { PageContent } from "./types";

export const LAYANAN_PAGES: Record<string, PageContent> = {
  "/kontak": {
    eyebrow: "Hubungi Kami",
    title: "Kontak Program Studi Pendidikan Informatika",
    description:
      "Punya pertanyaan tentang pendaftaran, kurikulum, atau kerja sama? Kirim pesan melalui formulir di bawah, tim prodi akan membalas melalui email Anda.",
    metaTitle: "Kontak — Pendidikan Informatika UNISVET Semarang",
    metaDescription:
      "Hubungi Program Studi Pendidikan Informatika Universitas Ivet (UNISVET) Semarang untuk informasi pendaftaran, akademik, dan kerja sama.",
    ogTitle: "Kontak Pendidikan Informatika UNISVET",
    ogDescription: "Kirim pertanyaan Anda ke tim Program Studi Pendidikan Informatika UNISVET Semarang.",
    blocks: [
      {
        type: "prose",
        title: "Layanan Informasi",
        paragraphs: [
          "Tim prodi melayani pertanyaan pada hari kerja Senin–Jumat. Untuk pertanyaan yang membutuhkan jawaban cepat, gunakan nomor WhatsApp yang tercantum di bagian bawah halaman.",
        ],
      },
    ],
  },
  "/informasi/dokumen": {
    eyebrow: "Unduhan",
    title: "Dokumen & Formulir",
    description:
      "Kumpulan dokumen resmi prodi: panduan akademik, dokumen kurikulum, formulir, dan berkas akreditasi yang dapat diunduh secara bebas.",
    metaTitle: "Dokumen & Unduhan — Pendidikan Informatika UNISVET",
    metaDescription:
      "Unduh panduan akademik, dokumen kurikulum, formulir, dan berkas akreditasi Program Studi Pendidikan Informatika UNISVET Semarang.",
    ogTitle: "Dokumen & Unduhan Pendidikan Informatika UNISVET",
    ogDescription: "Panduan akademik, kurikulum, formulir, dan berkas akreditasi prodi dalam satu halaman.",
    blocks: [],
  },
};
