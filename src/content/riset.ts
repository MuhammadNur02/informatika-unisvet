import type { PageContent } from "./types";

export const RISET_PAGES: Record<string, PageContent> = {
  "/riset/penelitian": {
    eyebrow: "Riset & Inovasi",
    title: "Penelitian",
    description:
      "Roadmap penelitian program studi berfokus pada pendidikan informatika, EdTech, IoT, dan kecerdasan artifisial untuk pembelajaran.",
    metaTitle: "Penelitian — Pendidikan Informatika UNISVET Semarang",
    blocks: [
      {
        type: "cards",
        title: "Kelompok Bidang Riset",
        items: [
          { title: "EdTech & Digital Pedagogy", tag: "KBK 1", desc: "Pengembangan media, model pembelajaran hibrida, dan evaluasi berbasis data." },
          { title: "Software Engineering", tag: "KBK 2", desc: "Rekayasa aplikasi web/mobile, kualitas perangkat lunak, dan DevOps pendidikan." },
          { title: "IoT & Smart Systems", tag: "KBK 3", desc: "Purwarupa perangkat cerdas untuk laboratorium dan lingkungan sekolah." },
          { title: "AI for Education", tag: "KBK 4", desc: "Educational data mining, learning analytics, dan asisten belajar berbasis AI." },
        ],
      },
      {
        type: "table",
        title: "Penelitian Terkini",
        head: ["Tahun", "Judul", "Skema"],
        rows: [
          ["2026", "Model Blended Learning Adaptif pada Mata Pelajaran Informatika SMK", "Internal UNISVET"],
          ["2025", "Learning Analytics untuk Prediksi Kesulitan Belajar Pemrograman", "Hibah Nasional"],
          ["2025", "Pengembangan E-Modul Interaktif Berbasis Proyek", "Internal UNISVET"],
          ["2024", "Purwarupa Monitoring Laboratorium Komputer Berbasis IoT", "Kerja sama mitra"],
          ["2024", "Efektivitas Microteaching Terekam terhadap Keterampilan Mengajar", "Internal UNISVET"],
        ],
      },
      {
        type: "list",
        title: "Dukungan bagi Peneliti",
        items: [
          "Klinik proposal hibah internal dan nasional setiap tahun.",
          "Pendampingan analisis data dan penulisan artikel.",
          "Keterlibatan mahasiswa sebagai anggota tim penelitian.",
          "Akses laboratorium dan perangkat riset program studi.",
        ],
      },
    ],
  },
  "/riset/publikasi": {
    eyebrow: "Riset & Inovasi",
    title: "Publikasi Ilmiah",
    description:
      "Luaran publikasi dosen dan mahasiswa pada jurnal nasional terakreditasi, prosiding, serta jurnal internasional.",
    metaTitle: "Publikasi — Pendidikan Informatika UNISVET Semarang",
    blocks: [
      {
        type: "stats",
        title: "Rekap Publikasi",
        items: [
          { label: "Jurnal Nasional Terakreditasi", value: "24" },
          { label: "Prosiding Nasional", value: "31" },
          { label: "Jurnal Internasional", value: "8" },
          { label: "Buku & Book Chapter", value: "6" },
        ],
      },
      {
        type: "table",
        title: "Publikasi Terpilih",
        head: ["Tahun", "Judul Artikel", "Terbitan"],
        rows: [
          ["2026", "Adaptive Blended Learning in Vocational Informatics Classrooms", "Jurnal Pendidikan Informatika (Sinta 2)"],
          ["2025", "Predicting Programming Difficulty Using Learning Analytics", "International Conference Proceeding"],
          ["2025", "Pengembangan E-Modul Interaktif Algoritma untuk Siswa SMA", "Jurnal Teknologi Pendidikan (Sinta 3)"],
          ["2024", "IoT-Based Laboratory Monitoring for School Computer Labs", "Jurnal Sistem Cerdas (Sinta 3)"],
          ["2024", "Dampak Microteaching Terekam pada Kesiapan Mengajar Calon Guru", "Prosiding Seminar Nasional Pendidikan"],
        ],
      },
      {
        type: "prose",
        title: "Budaya Menulis",
        paragraphs: [
          "Mahasiswa didorong mempublikasikan hasil skripsi bersama dosen pembimbing. Program studi menyediakan pendampingan penulisan, template artikel, dan bimbingan pemilihan jurnal yang sesuai.",
        ],
      },
    ],
  },
  "/riset/pengabdian": {
    eyebrow: "Riset & Inovasi",
    title: "Pengabdian kepada Masyarakat",
    description:
      "Program pengabdian berbasis literasi digital untuk sekolah, guru, UMKM, dan masyarakat sekitar kampus.",
    metaTitle: "Pengabdian — Pendidikan Informatika UNISVET Semarang",
    blocks: [
      {
        type: "cards",
        title: "Program Pengabdian",
        items: [
          { title: "Pelatihan Guru Informatika", tag: "Sekolah", desc: "Penguatan modul ajar berbasis proyek dan pemanfaatan LMS untuk guru sekolah mitra." },
          { title: "Digitalisasi UMKM", tag: "Masyarakat", desc: "Pendampingan pembuatan website, katalog digital, dan pemasaran daring UMKM." },
          { title: "Kelas Literasi Digital Warga", tag: "Masyarakat", desc: "Pengenalan komputer dasar, internet aman, dan layanan publik digital." },
          { title: "Klinik Laboratorium Sekolah", tag: "Sekolah", desc: "Bantuan penataan, perawatan, dan konfigurasi laboratorium komputer sekolah." },
          { title: "Coding Camp Pelajar", tag: "Sekolah", desc: "Pelatihan pemrograman dasar dan robotika bagi siswa SMP/SMA." },
          { title: "Edukasi Keamanan Digital", tag: "Masyarakat", desc: "Sosialisasi perlindungan data pribadi dan pencegahan penipuan daring." },
        ],
      },
      {
        type: "timeline",
        title: "Kegiatan Terlaksana",
        items: [
          { date: "2026", title: "Pelatihan Modul Ajar Digital untuk 3 SMK Mitra", desc: "Melibatkan 6 dosen dan 20 mahasiswa sebagai fasilitator pendamping." },
          { date: "2025", title: "Digitalisasi Administrasi Desa Mitra", desc: "Penyusunan sistem arsip sederhana dan pelatihan operator desa." },
          { date: "2024", title: "Coding Camp untuk Pelajar Semarang", desc: "Pelatihan dua hari bagi 80 siswa SMP dan SMA di laboratorium kampus." },
        ],
      },
    ],
  },
  "/riset/hki": {
    eyebrow: "Riset & Inovasi",
    title: "Hak Kekayaan Intelektual (HKI)",
    description:
      "Perlindungan karya dosen dan mahasiswa berupa hak cipta program komputer, media pembelajaran, dan karya tulis.",
    metaTitle: "HKI — Pendidikan Informatika UNISVET Semarang",
    blocks: [
      {
        type: "table",
        title: "Daftar HKI Tercatat",
        head: ["Tahun", "Judul Karya", "Jenis"],
        rows: [
          ["2026", "E-Modul Interaktif Algoritma & Pemrograman", "Hak Cipta — Karya Tulis"],
          ["2025", "Aplikasi Presensi Sekolah Berbasis Web", "Hak Cipta — Program Komputer"],
          ["2025", "Game Edukasi Logika LogiKid", "Hak Cipta — Program Komputer"],
          ["2024", "Video Pembelajaran Jaringan Komputer Seri 1-5", "Hak Cipta — Karya Audio Visual"],
          ["2024", "Purwarupa Smart Attendance RFID", "Hak Cipta — Program Komputer"],
        ],
      },
      {
        type: "steps",
        title: "Alur Pengusulan HKI",
        items: [
          { title: "Penyiapan Karya", desc: "Melengkapi dokumentasi karya, manual, dan bukti kepemilikan." },
          { title: "Verifikasi Prodi", desc: "Koordinator riset memeriksa kelayakan dan kelengkapan berkas." },
          { title: "Pengajuan LPPM", desc: "Pendaftaran melalui LPPM Universitas Ivet ke DJKI." },
          { title: "Penerbitan Sertifikat", desc: "Sertifikat tercatat diarsipkan sebagai luaran program studi." },
        ],
      },
    ],
  },
  "/riset/inovasi": {
    eyebrow: "Riset & Inovasi",
    title: "Inovasi & Produk Unggulan",
    description:
      "Hilirisasi hasil riset menjadi produk pembelajaran dan perangkat yang langsung dipakai sekolah maupun masyarakat.",
    metaTitle: "Inovasi — Pendidikan Informatika UNISVET Semarang",
    blocks: [
      {
        type: "cards",
        title: "Produk Inovasi",
        items: [
          { title: "Platform E-Modul Prodi", tag: "EdTech", desc: "Kumpulan modul interaktif informatika yang dapat digunakan guru sekolah mitra secara gratis." },
          { title: "Smart Lab Kit", tag: "IoT", desc: "Paket perangkat IoT untuk pembelajaran sensor dan mikrokontroler di sekolah." },
          { title: "Asisten Belajar Berbasis AI", tag: "AI", desc: "Chatbot tanya jawab materi informatika berbasis basis pengetahuan modul ajar prodi." },
          { title: "Dashboard Learning Analytics", tag: "Data", desc: "Visualisasi keterlibatan dan capaian belajar mahasiswa untuk dosen pengampu." },
          { title: "Studio Konten Pembelajaran", tag: "Multimedia", desc: "Layanan produksi video dan animasi pembelajaran bersama mahasiswa." },
          { title: "Marketplace Karya Mahasiswa", tag: "Wirausaha", desc: "Kanal etalase produk digital hasil proyek mahasiswa untuk mitra eksternal." },
        ],
      },
      {
        type: "prose",
        title: "Arah Pengembangan",
        paragraphs: [
          "Inovasi program studi diarahkan agar setiap hasil riset memiliki pengguna nyata: guru, siswa, atau masyarakat. Setiap produk melewati tahap uji coba lapangan, perbaikan, lalu diserahkan bersama pelatihan penggunaan.",
        ],
      },
    ],
  },
  "/riset/kerja-sama": {
    eyebrow: "Riset & Inovasi",
    title: "Kerja Sama & Kemitraan",
    description:
      "Jejaring sekolah mitra, dunia usaha dan dunia industri, komunitas teknologi, serta perguruan tinggi mitra.",
    metaTitle: "Kerja Sama — Pendidikan Informatika UNISVET Semarang",
    blocks: [
      {
        type: "stats",
        title: "Rekap Kemitraan",
        items: [
          { label: "Sekolah Mitra PLP", value: "25+" },
          { label: "Mitra Industri", value: "15+" },
          { label: "Komunitas Teknologi", value: "8" },
          { label: "Perguruan Tinggi Mitra", value: "6" },
        ],
      },
      {
        type: "table",
        title: "Bentuk Kerja Sama",
        head: ["Mitra", "Ruang Lingkup", "Bentuk Kegiatan"],
        rows: [
          ["SMA/SMK/MTs mitra", "Pendidikan", "PLP, asistensi mengajar, pelatihan guru"],
          ["Software house & startup", "Industri TI", "Magang bersertifikat, kuliah praktisi, rekrutmen"],
          ["Komunitas developer", "Pengembangan kompetensi", "Workshop, bootcamp, mentoring"],
          ["Pemerintah daerah & desa", "Layanan masyarakat", "KKN tematik, digitalisasi layanan"],
          ["Perguruan tinggi mitra", "Akademik", "Pertukaran mahasiswa, riset kolaboratif, penyunting jurnal"],
        ],
      },
      {
        type: "cta",
        title: "Ingin bermitra dengan kami?",
        desc: "Kami terbuka untuk kerja sama magang, penelitian bersama, pelatihan guru, dan pengembangan produk pendidikan digital.",
        label: "Hubungi Program Studi",
        href: "mailto:pendidikaninformatika@ivet.ac.id",
      },
    ],
  },
};