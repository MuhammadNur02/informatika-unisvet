import type { PageContent } from "./types";
import labIot from "@/assets/lab-iot.jpg";
import labSmart from "@/assets/lab-smart.jpg";
import labMicroteaching from "@/assets/lab-microteaching.jpg";
import libCampus from "@/assets/lib-campus.jpg";
import heroLab from "@/assets/hero-lab.jpg";
import labKomputerAsset from "@/assets/lab-komputer.webp.asset.json";
import kegiatanProyekAsset from "@/assets/kegiatan-proyek.webp.asset.json";
import kegiatanDosenAsset from "@/assets/kegiatan-dosen.webp.asset.json";
const labKomputer = labKomputerAsset.url;
const kegiatanProyek = kegiatanProyekAsset.url;
const kegiatanDosen = kegiatanDosenAsset.url;

export const INFORMASI_PAGES: Record<string, PageContent> = {
  "/informasi/berita": {
    eyebrow: "Informasi",
    title: "Berita Program Studi",
    description:
      "Kabar terbaru seputar akademik, riset, kemitraan, dan aktivitas mahasiswa Pendidikan Informatika UNISVET Semarang.",
    metaTitle: "Berita — Pendidikan Informatika UNISVET Semarang",
    blocks: [
      {
        type: "timeline",
        title: "Berita Terbaru",
        items: [
          { date: "10 Agustus 2026", title: "Prodi Perbarui Kurikulum OBE 2026", desc: "Peninjauan kurikulum melibatkan pengguna lulusan, alumni, dan asosiasi profesi untuk memperkuat peminatan AI dan EdTech." },
          { date: "28 Juli 2026", title: "Kerja Sama Baru dengan Tiga SMK di Semarang", desc: "Penandatanganan kerja sama untuk penempatan PLP, asistensi mengajar, dan pelatihan guru informatika." },
          { date: "12 Juli 2026", title: "Mahasiswa Raih Juara 2 Lomba Media Pembelajaran Nasional", desc: "Karya e-modul interaktif tim mahasiswa semester 6 dinilai unggul pada aspek kebaruan dan kebermanfaatan." },
          { date: "20 Juni 2026", title: "Bootcamp Fullstack Angkatan Kedua Dibuka", desc: "Program pendampingan intensif bagi mahasiswa yang menyiapkan portofolio magang industri." },
          { date: "5 Juni 2026", title: "Dosen Prodi Terbitkan Artikel di Jurnal Sinta 2", desc: "Riset tentang blended learning adaptif pada kelas informatika SMK berhasil dipublikasikan." },
        ],
      },
    ],
  },
  "/informasi/event": {
    eyebrow: "Informasi",
    title: "Event & Kegiatan Kampus",
    description:
      "Seminar, workshop, dan kompetisi yang diselenggarakan atau diikuti program studi.",
    metaTitle: "Event — Pendidikan Informatika UNISVET Semarang",
    blocks: [
      {
        type: "cards",
        title: "Event Mendatang",
        items: [
          { title: "Informatics Fair 2026", tag: "5-6 Sep 2026", desc: "Pameran karya mahasiswa, lomba coding pelajar, dan talkshow karier teknologi di kampus UNISVET." },
          { title: "Workshop AI untuk Guru", tag: "20 Sep 2026", desc: "Pelatihan pemanfaatan AI generatif untuk penyusunan modul ajar bagi guru sekolah mitra." },
          { title: "Seminar Nasional Pendidikan Digital", tag: "18 Okt 2026", desc: "Diseminasi hasil riset dosen dan mahasiswa dengan pembicara praktisi EdTech nasional." },
          { title: "Career Day Alumni", tag: "9 Nov 2026", desc: "Sesi berbagi karier dan rekrutmen bersama mitra industri dan sekolah." },
          { title: "Coding Camp Pelajar", tag: "Des 2026", desc: "Pelatihan pemrograman dasar dua hari bagi siswa SMP/SMA se-Kota Semarang." },
          { title: "Kuliah Tamu Praktisi Industri", tag: "Setiap Semester", desc: "Sesi rutin bersama praktisi rekayasa perangkat lunak, jaringan, dan EdTech." },
        ],
      },
    ],
  },
  "/informasi/pengumuman": {
    eyebrow: "Informasi",
    title: "Pengumuman Akademik",
    description:
      "Informasi resmi terkait perkuliahan, administrasi, dan layanan akademik program studi.",
    metaTitle: "Pengumuman — Pendidikan Informatika UNISVET Semarang",
    blocks: [
      {
        type: "timeline",
        title: "Pengumuman Terbaru",
        items: [
          { date: "14 Agustus 2026", title: "Pengisian KRS Semester Gasal 2026/2027", desc: "Pengisian KRS dibuka 18-29 Agustus 2026 melalui SIAKAD, wajib disetujui dosen Pembimbing Akademik." },
          { date: "8 Agustus 2026", title: "Jadwal Seminar Proposal Skripsi", desc: "Pendaftaran seminar proposal gelombang 1 ditutup 25 Agustus 2026 di admin akademik prodi." },
          { date: "1 Agustus 2026", title: "Pendaftaran PLP & MBKM Semester Gasal", desc: "Mahasiswa semester 5 ke atas dapat mendaftar penempatan PLP dan magang industri." },
          { date: "22 Juli 2026", title: "Pembaruan Panduan Penulisan Skripsi", desc: "Template dan panduan versi 2026 dapat diunduh di kanal informasi prodi." },
          { date: "10 Juli 2026", title: "Pembukaan Beasiswa Prestasi Semester Gasal", desc: "Berkas pengajuan diterima paling lambat 30 Agustus 2026." },
        ],
      },
      {
        type: "list",
        title: "Layanan Administrasi",
        items: [
          "Legalisir ijazah dan transkrip di admin akademik prodi.",
          "Surat keterangan aktif kuliah dan surat pengantar penelitian.",
          "Pengajuan cuti akademik dan perpindahan kelas.",
          "Konsultasi rencana studi bersama dosen Pembimbing Akademik.",
        ],
      },
    ],
  },
  "/informasi/agenda": {
    eyebrow: "Informasi",
    title: "Agenda & Kalender Akademik",
    description:
      "Jadwal penting perkuliahan, ujian, dan kegiatan program studi pada tahun akademik berjalan.",
    metaTitle: "Agenda — Pendidikan Informatika UNISVET Semarang",
    blocks: [
      {
        type: "table",
        title: "Kalender Akademik Semester Gasal 2026/2027",
        head: ["Kegiatan", "Tanggal"],
        rows: [
          ["Pengisian & validasi KRS", "18 - 29 Agustus 2026"],
          ["Awal perkuliahan", "7 September 2026"],
          ["Ujian Tengah Semester", "26 - 31 Oktober 2026"],
          ["Batas pengajuan seminar proposal", "20 November 2026"],
          ["Pekan pengganti & praktikum susulan", "7 - 12 Desember 2026"],
          ["Ujian Akhir Semester", "4 - 16 Januari 2027"],
          ["Yudisium & wisuda periode I", "Februari 2027"],
        ],
      },
      {
        type: "list",
        title: "Agenda Rutin Prodi",
        items: [
          "Rapat koordinasi dosen setiap awal dan akhir semester.",
          "Monitoring perkuliahan dan kesesuaian RPS pekan ke-8.",
          "Kuliah tamu praktisi setiap pertengahan semester.",
          "Audit mutu internal setiap akhir tahun akademik.",
        ],
      },
    ],
  },
  "/informasi/galeri": {
    eyebrow: "Informasi",
    title: "Galeri Kegiatan & Fasilitas",
    description:
      "Dokumentasi visual suasana pembelajaran, laboratorium, dan kegiatan mahasiswa Pendidikan Informatika UNISVET.",
    metaTitle: "Galeri — Pendidikan Informatika UNISVET Semarang",
    blocks: [
      {
        type: "gallery",
        title: "Dokumentasi",
        items: [
          { name: "Praktikum Pemrograman", image: labKomputer, desc: "Suasana praktikum di laboratorium komputer lanjut." },
          { name: "Laboratorium IoT", image: labIot, desc: "Eksperimen sensor dan mikrokontroler mahasiswa." },
          { name: "Microteaching Studio", image: labMicroteaching, desc: "Latihan mengajar terekam untuk evaluasi pedagogi." },
          { name: "Smart Classroom", image: labSmart, desc: "Perkuliahan hibrida dengan papan digital interaktif." },
          { name: "Perpustakaan Kampus", image: libCampus, desc: "Ruang baca dan akses jurnal digital mahasiswa." },
          { name: "Kolaborasi Proyek", image: kegiatanProyek, desc: "Kerja tim capstone project bersama dosen pembimbing." },
          { name: "Dosen & Tendik Prodi", image: kegiatanDosen, desc: "Kebersamaan tim dosen dan tenaga kependidikan prodi." },
        ],
      },
    ],
  },
};