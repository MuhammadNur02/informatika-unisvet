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
          { title: "Tahun 3 — Peminatan", desc: "Rekayasa perangkat lunak, IoT, AI, multimedia, microteaching, dan proyek kolaboratif." },
          { title: "Tahun 4 — Aktualisasi", desc: "PLP di sekolah mitra, magang/MBKM industri, KKN, seminar proposal, dan skripsi." },
        ],
      },
    ],
  },
  "/akademik/profil-lulusan": {
    eyebrow: "Akademik",
    title: "Profil Lulusan",
    description:
      "Empat profil karier utama lulusan S1 Pendidikan Informatika UNISVET Semarang beserta kompetensi yang menyertainya.",
    metaTitle: "Profil Lulusan — Pendidikan Informatika UNISVET Semarang",
    blocks: [
      {
        type: "cards",
        title: "Profil Karier Lulusan",
        items: [
          { title: "Guru / Pendidik Informatika", tag: "PL-1", desc: "Guru mata pelajaran Informatika dan TIK di SMP, SMA, SMK, serta instruktur pelatihan teknologi." },
          { title: "Software & Web Developer", tag: "PL-2", desc: "Pengembang aplikasi web dan mobile, front-end/back-end developer, serta quality assurance." },
          { title: "EdTech Content Creator", tag: "PL-3", desc: "Perancang media pembelajaran interaktif, e-modul, video edukasi, dan pengelola LMS sekolah." },
          { title: "Praktisi Jaringan & IoT", tag: "PL-4", desc: "Teknisi jaringan, pengelola laboratorium komputer sekolah, dan pengembang purwarupa IoT." },
          { title: "Technopreneur Pendidikan", tag: "PL-5", desc: "Pendiri usaha rintisan bidang pendidikan digital, bimbingan belajar teknologi, dan jasa TI." },
          { title: "Peneliti / Lanjut Studi", tag: "PL-6", desc: "Melanjutkan studi magister bidang pendidikan informatika, ilmu komputer, atau teknologi pendidikan." },
        ],
      },
      {
        type: "list",
        title: "Kompetensi Pendukung",
        items: [
          "Sertifikasi kompetensi bidang pemrograman atau jaringan.",
          "Kemampuan menyusun perangkat pembelajaran (RPP/modul ajar) berbasis teknologi.",
          "Kemampuan komunikasi ilmiah dan penulisan artikel.",
          "Penguasaan alat kolaborasi dan version control (Git).",
        ],
      },
    ],
  },
  "/akademik/cpl": {
    eyebrow: "Akademik",
    title: "Capaian Pembelajaran Lulusan (CPL)",
    description:
      "CPL disusun mengacu KKNI level 6 dan SN-Dikti, mencakup sikap, pengetahuan, keterampilan umum, dan keterampilan khusus.",
    metaTitle: "CPL — Pendidikan Informatika UNISVET Semarang",
    blocks: [
      {
        type: "table",
        title: "Rumusan CPL",
        head: ["Kode", "Aspek", "Capaian Pembelajaran"],
        rows: [
          ["S-1", "Sikap", "Menunjukkan sikap religius, berintegritas, dan berkarakter kebangsaan dalam praktik keprofesian."],
          ["S-2", "Sikap", "Menunjukkan tanggung jawab dan etika profesi pendidik serta etika penggunaan teknologi."],
          ["P-1", "Pengetahuan", "Menguasai konsep teoretis informatika: algoritma, basis data, jaringan, dan kecerdasan artifisial."],
          ["P-2", "Pengetahuan", "Menguasai teori belajar, kurikulum, dan asesmen pembelajaran informatika."],
          ["KU-1", "Keterampilan Umum", "Mampu berpikir logis, kritis, dan inovatif dalam menyelesaikan masalah pembelajaran."],
          ["KU-2", "Keterampilan Umum", "Mampu bekerja dalam tim, berkomunikasi efektif, dan mengelola pembelajaran mandiri."],
          ["KK-1", "Keterampilan Khusus", "Mampu merancang dan melaksanakan pembelajaran informatika berbantuan teknologi digital."],
          ["KK-2", "Keterampilan Khusus", "Mampu membangun aplikasi web/mobile sesuai kaidah rekayasa perangkat lunak."],
          ["KK-3", "Keterampilan Khusus", "Mampu mengembangkan media pembelajaran interaktif dan mengelola LMS."],
          ["KK-4", "Keterampilan Khusus", "Mampu merancang purwarupa sistem cerdas berbasis IoT untuk kebutuhan pendidikan."],
        ],
      },
      {
        type: "prose",
        title: "Pemetaan & Asesmen",
        paragraphs: [
          "Setiap CPL diturunkan menjadi capaian pembelajaran mata kuliah (CPMK) dan sub-CPMK yang terukur pada RPS. Asesmen menggunakan kombinasi proyek, portofolio, unjuk kerja mengajar, dan ujian tulis.",
          "Hasil asesmen direkap sebagai matriks ketercapaian CPL setiap semester dan menjadi dasar perbaikan pembelajaran.",
        ],
      },
    ],
  },
  "/akademik/mata-kuliah": {
    eyebrow: "Akademik",
    title: "Daftar Mata Kuliah",
    description:
      "Sebaran mata kuliah semester 1 hingga 8 Program Studi Pendidikan Informatika UNISVET Semarang.",
    metaTitle: "Mata Kuliah — Pendidikan Informatika UNISVET Semarang",
    blocks: [
      {
        type: "table",
        title: "Semester 1 & 2",
        head: ["Mata Kuliah", "SKS", "Semester"],
        rows: [
          ["Pendidikan Agama", "2", "1"],
          ["Pancasila & Kewarganegaraan", "2", "1"],
          ["Algoritma & Pemrograman Dasar", "4", "1"],
          ["Matematika Diskrit", "3", "1"],
          ["Pengantar Ilmu Pendidikan", "2", "1"],
          ["Literasi Digital & Etika Informatika", "2", "1"],
          ["Bahasa Indonesia Keilmuan", "2", "2"],
          ["Struktur Data", "4", "2"],
          ["Sistem Digital & Arsitektur Komputer", "3", "2"],
          ["Psikologi Pendidikan", "2", "2"],
          ["Statistika Pendidikan", "3", "2"],
        ],
      },
      {
        type: "table",
        title: "Semester 3 & 4",
        head: ["Mata Kuliah", "SKS", "Semester"],
        rows: [
          ["Pemrograman Berorientasi Objek", "4", "3"],
          ["Basis Data", "4", "3"],
          ["Jaringan Komputer", "3", "3"],
          ["Kurikulum & Pembelajaran", "3", "3"],
          ["Media Pembelajaran Digital", "3", "3"],
          ["Pemrograman Web", "4", "4"],
          ["Rekayasa Perangkat Lunak", "3", "4"],
          ["Sistem Operasi", "3", "4"],
          ["Strategi & Model Pembelajaran", "3", "4"],
          ["Evaluasi Pembelajaran", "3", "4"],
        ],
      },
      {
        type: "table",
        title: "Semester 5 & 6",
        head: ["Mata Kuliah", "SKS", "Semester"],
        rows: [
          ["Pemrograman Mobile", "4", "5"],
          ["Kecerdasan Artifisial", "3", "5"],
          ["Internet of Things", "3", "5"],
          ["Multimedia Pembelajaran Interaktif", "3", "5"],
          ["Microteaching", "2", "5"],
          ["Keamanan Informasi", "3", "6"],
          ["Machine Learning for Education", "3", "6"],
          ["Manajemen Proyek TI", "3", "6"],
          ["Metodologi Penelitian Pendidikan", "3", "6"],
          ["Proyek Rekayasa Perangkat Lunak (Capstone)", "4", "6"],
        ],
      },
      {
        type: "table",
        title: "Semester 7 & 8",
        head: ["Mata Kuliah", "SKS", "Semester"],
        rows: [
          ["Pengenalan Lapangan Persekolahan (PLP)", "4", "7"],
          ["Magang / MBKM Industri", "6", "7"],
          ["Kuliah Kerja Nyata (KKN)", "2", "7"],
          ["Seminar Proposal Skripsi", "2", "7"],
          ["Skripsi", "6", "8"],
          ["Mata Kuliah Pilihan Peminatan", "6", "7-8"],
        ],
        note: "Sebaran dapat menyesuaikan kalender akademik dan pilihan skema MBKM mahasiswa.",
      },
    ],
  },
  "/akademik/praktikum-proyek": {
    eyebrow: "Akademik",
    title: "Praktikum & Proyek Mahasiswa",
    description:
      "Rekam jejak praktikum laboratorium dan proyek nyata yang pernah dikerjakan mahasiswa Pendidikan Informatika UNISVET.",
    metaTitle: "Praktikum & Proyek — Pendidikan Informatika UNISVET Semarang",
    blocks: [
      {
        type: "cards",
        title: "Proyek yang Pernah Dikerjakan Mahasiswa",
        items: [
          { title: "SIAKAD Mini untuk SMK Mitra", tag: "Capstone 2025", desc: "Aplikasi web presensi dan nilai berbasis Laravel yang dipakai guru SMK mitra di Semarang." },
          { title: "E-Modul Interaktif Informatika Kelas X", tag: "Media 2025", desc: "E-modul HTML5 dengan kuis adaptif dan video tutorial untuk materi algoritma pemula." },
          { title: "Game Edukasi Logika 'LogiKid'", tag: "Multimedia 2024", desc: "Game puzzle logika berbasis Unity untuk siswa SD, diuji coba pada dua sekolah dasar." },
          { title: "Smart Attendance RFID", tag: "IoT 2024", desc: "Purwarupa presensi kelas berbasis ESP32 dan RFID dengan dashboard realtime." },
          { title: "Chatbot Tanya Materi", tag: "AI 2025", desc: "Asisten tanya jawab materi informatika memanfaatkan model bahasa dan basis pengetahuan modul ajar." },
          { title: "Monitoring Suhu Lab Berbasis IoT", tag: "IoT 2023", desc: "Sensor suhu dan kelembaban lab komputer dengan notifikasi otomatis ke pengelola lab." },
        ],
      },
      {
        type: "list",
        title: "Praktikum Wajib di Laboratorium",
        items: [
          "Praktikum Algoritma & Pemrograman (C/Python).",
          "Praktikum Basis Data (MySQL/PostgreSQL).",
          "Praktikum Jaringan Komputer & konfigurasi perangkat.",
          "Praktikum Pemrograman Web & Mobile.",
          "Praktikum IoT dan sistem tertanam.",
          "Praktik mengajar terekam di Microteaching Studio.",
        ],
      },
      {
        type: "steps",
        title: "Alur Proyek Capstone",
        items: [
          { title: "Identifikasi Kebutuhan", desc: "Mahasiswa menggali masalah nyata di sekolah atau UMKM mitra." },
          { title: "Perancangan", desc: "Menyusun dokumen kebutuhan, desain UI, dan arsitektur sistem." },
          { title: "Pengembangan", desc: "Implementasi dalam tim 3-4 orang dengan Git dan sprint mingguan." },
          { title: "Uji Coba & Serah Terima", desc: "Pengujian bersama pengguna, pelatihan singkat, dan penyerahan produk." },
        ],
      },
    ],
  },
  "/akademik/magang-mbkm": {
    eyebrow: "Akademik",
    title: "Magang & MBKM",
    description:
      "Program Merdeka Belajar Kampus Merdeka yang pernah diikuti mahasiswa: magang industri, asistensi mengajar, studi independen, hingga proyek kemanusiaan.",
    metaTitle: "Magang / MBKM — Pendidikan Informatika UNISVET Semarang",
    blocks: [
      {
        type: "cards",
        title: "Skema MBKM yang Diikuti Mahasiswa",
        items: [
          { title: "Magang Industri Bersertifikat", tag: "20 SKS", desc: "Penempatan sebagai junior web developer dan QA di software house dan startup wilayah Semarang & Yogyakarta." },
          { title: "Asistensi Mengajar", tag: "20 SKS", desc: "Mendampingi guru Informatika di SMK/SMA mitra, mengembangkan modul ajar dan kelas digital." },
          { title: "Studi Independen", tag: "20 SKS", desc: "Kelas bersertifikat bidang front-end, data science, dan cloud dari mitra platform pembelajaran." },
          { title: "Proyek di Desa & KKN Tematik", tag: "10 SKS", desc: "Pendampingan digitalisasi administrasi desa dan pelatihan komputer warga." },
          { title: "Kewirausahaan Digital", tag: "10 SKS", desc: "Membangun layanan jasa pembuatan website dan konten edukasi bersama tim mahasiswa." },
          { title: "Pertukaran Mahasiswa", tag: "20 SKS", desc: "Mengambil mata kuliah informatika/kependidikan di perguruan tinggi mitra dalam negeri." },
        ],
      },
      {
        type: "table",
        title: "Contoh Mitra Penempatan",
        head: ["Mitra", "Bidang", "Peran Mahasiswa"],
        rows: [
          ["SMK Negeri di Kota Semarang", "Pendidikan", "Asisten guru Informatika, pengelola lab"],
          ["Software house lokal Semarang", "Pengembangan web", "Junior developer, QA tester"],
          ["Startup EdTech", "Teknologi pendidikan", "Content creator & instructional designer"],
          ["Dinas / Pemerintah Desa", "Layanan publik", "Digitalisasi administrasi & pelatihan"],
        ],
      },
      {
        type: "steps",
        title: "Prosedur Pendaftaran MBKM",
        items: [
          { title: "Konsultasi Dosen PA", desc: "Mahasiswa memastikan SKS dan kesiapan akademik minimal semester 5." },
          { title: "Pendaftaran & Seleksi", desc: "Mengisi formulir prodi, melampirkan CV dan portofolio, lalu mengikuti seleksi mitra." },
          { title: "Penetapan & Konversi", desc: "Penerbitan SK penempatan serta pemetaan konversi mata kuliah oleh koordinator MBKM." },
          { title: "Pelaksanaan & Laporan", desc: "Logbook mingguan, monitoring dosen pembimbing, dan seminar hasil di akhir program." },
        ],
      },
    ],
  },
};