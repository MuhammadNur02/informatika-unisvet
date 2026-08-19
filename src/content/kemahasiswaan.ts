import type { PageContent } from "./types";

export const KEMAHASISWAAN_PAGES: Record<string, PageContent> = {
  "/kemahasiswaan/organisasi": {
    eyebrow: "Kemahasiswaan",
    title: "Organisasi & Komunitas Mahasiswa",
    description:
      "Wadah pengembangan minat, bakat, dan kepemimpinan mahasiswa Pendidikan Informatika UNISVET Semarang.",
    metaTitle: "Organisasi & Komunitas — Pendidikan Informatika UNISVET",
    blocks: [
      {
        type: "cards",
        title: "Organisasi & Komunitas",
        items: [
          { title: "HIMA Pendidikan Informatika", tag: "Organisasi", desc: "Himpunan mahasiswa prodi yang menaungi kegiatan akademik, sosial, dan kaderisasi." },
          { title: "Coding Club UNISVET", tag: "Komunitas", desc: "Latihan rutin competitive programming, web development, dan persiapan lomba." },
          { title: "IoT & Robotics Lab Community", tag: "Komunitas", desc: "Eksperimen mikrokontroler, sensor, dan purwarupa perangkat cerdas." },
          { title: "EdTech Creator Squad", tag: "Komunitas", desc: "Produksi konten pembelajaran: video, e-modul, dan desain instruksional." },
          { title: "Multimedia & UI/UX Studio", tag: "Komunitas", desc: "Belajar desain antarmuka, motion graphic, dan branding kegiatan kampus." },
          { title: "Divisi Kerohanian & Sosial", tag: "Organisasi", desc: "Kegiatan keagamaan, bakti sosial, dan penguatan karakter mahasiswa." },
        ],
      },
      {
        type: "list",
        title: "Program Kerja Tahunan",
        items: [
          "Informatics Fair: pameran karya dan lomba antar sekolah.",
          "Workshop rutin bulanan bersama praktisi industri.",
          "Kelas persiapan sertifikasi kompetensi mahasiswa.",
          "Pengabdian digital ke sekolah dan desa mitra.",
          "Studi banding ke perguruan tinggi dan perusahaan teknologi.",
          "Masa pengenalan dan kaderisasi anggota baru HIMA.",
        ],
      },
    ],
  },
  "/kemahasiswaan/prestasi": {
    eyebrow: "Kemahasiswaan",
    title: "Prestasi Mahasiswa",
    description:
      "Capaian mahasiswa pada kompetisi akademik, teknologi, dan kegiatan kemahasiswaan tingkat regional maupun nasional.",
    metaTitle: "Prestasi Mahasiswa — Pendidikan Informatika UNISVET",
    blocks: [
      {
        type: "table",
        title: "Daftar Prestasi Terkini",
        head: ["Tahun", "Kompetisi", "Capaian"],
        rows: [
          ["2026", "Lomba Media Pembelajaran Digital Nasional", "Juara 2"],
          ["2025", "Hackathon EdTech Jawa Tengah", "Juara 1"],
          ["2025", "Kompetisi Web Design Tingkat Provinsi", "Juara 3"],
          ["2025", "Program Kreativitas Mahasiswa (PKM)", "Lolos pendanaan nasional"],
          ["2024", "Lomba Karya Tulis Ilmiah Pendidikan", "Juara Harapan 1"],
          ["2024", "Kontes Robot Line Follower Regional", "Finalis 8 besar"],
        ],
      },
      {
        type: "stats",
        title: "Rekap Lima Tahun",
        items: [
          { label: "Prestasi Nasional", value: "9" },
          { label: "Prestasi Regional", value: "17" },
          { label: "Proposal PKM Lolos", value: "5" },
          { label: "Sertifikasi Kompetensi", value: "80+" },
        ],
      },
    ],
  },
  "/kemahasiswaan/kegiatan": {
    eyebrow: "Kemahasiswaan",
    title: "Kegiatan Mahasiswa",
    description:
      "Agenda pembinaan akademik dan non-akademik yang rutin diselenggarakan bersama HIMA dan program studi.",
    metaTitle: "Kegiatan Mahasiswa — Pendidikan Informatika UNISVET",
    blocks: [
      {
        type: "timeline",
        title: "Kegiatan Terbaru",
        items: [
          { date: "Juli 2026", title: "Bootcamp Fullstack Web 2 Pekan", desc: "Pelatihan intensif React & Laravel bagi mahasiswa semester 4 ke atas bersama mentor industri." },
          { date: "Mei 2026", title: "Informatics Fair 2026", desc: "Pameran karya mahasiswa, lomba coding pelajar SMA/SMK, dan talkshow karier teknologi." },
          { date: "Maret 2026", title: "Pelatihan Guru Informatika Sekolah Mitra", desc: "Mahasiswa menjadi asisten fasilitator pelatihan modul ajar berbasis proyek." },
          { date: "Januari 2026", title: "Studi Ekskursi Industri Teknologi", desc: "Kunjungan ke perusahaan pengembang perangkat lunak dan diskusi peluang magang." },
          { date: "November 2025", title: "Digital Literacy Camp Desa Mitra", desc: "Pengabdian mahasiswa mengajarkan komputer dasar dan keamanan digital bagi warga." },
        ],
      },
      {
        type: "list",
        title: "Kanal Pembinaan",
        items: [
          "Pembimbingan akademik oleh dosen Pembimbing Akademik setiap semester.",
          "Klinik proposal PKM dan karya tulis ilmiah.",
          "Latihan kepemimpinan dasar dan manajemen organisasi.",
          "Program mentoring alumni untuk persiapan kerja.",
        ],
      },
    ],
  },
  "/kemahasiswaan/beasiswa": {
    eyebrow: "Kemahasiswaan",
    title: "Beasiswa Mahasiswa Aktif",
    description:
      "Berbagai skema beasiswa yang dapat diakses mahasiswa Pendidikan Informatika UNISVET Semarang selama masa studi.",
    metaTitle: "Beasiswa — Pendidikan Informatika UNISVET Semarang",
    blocks: [
      {
        type: "cards",
        title: "Skema Beasiswa",
        items: [
          { title: "KIP Kuliah", tag: "Pemerintah", desc: "Bantuan biaya pendidikan dan biaya hidup bagi mahasiswa dari keluarga kurang mampu." },
          { title: "Beasiswa Prestasi Akademik", tag: "Internal", desc: "Potongan UKT bagi mahasiswa dengan IPK tertinggi setiap semester." },
          { title: "Beasiswa Prestasi Non-Akademik", tag: "Internal", desc: "Apresiasi bagi juara kompetisi teknologi, olahraga, atau seni tingkat regional/nasional." },
          { title: "Beasiswa Bantuan Studi", tag: "Internal", desc: "Keringanan biaya bagi mahasiswa yang mengalami kendala ekonomi mendesak." },
          { title: "Beasiswa Mitra & CSR", tag: "Eksternal", desc: "Dukungan dari yayasan, perusahaan mitra, dan pemerintah daerah." },
          { title: "Beasiswa Asisten Laboratorium", tag: "Internal", desc: "Insentif bagi mahasiswa yang menjadi asisten praktikum dan pengelola lab." },
        ],
      },
      {
        type: "steps",
        title: "Cara Mengajukan",
        items: [
          { title: "Cek Pengumuman", desc: "Pantau pengumuman beasiswa di laman prodi dan SIAKAD setiap awal semester." },
          { title: "Lengkapi Dokumen", desc: "Siapkan transkrip, KTM, surat keterangan penghasilan, dan sertifikat prestasi." },
          { title: "Ajukan ke Prodi", desc: "Serahkan berkas ke admin akademik prodi untuk verifikasi awal." },
          { title: "Seleksi & Penetapan", desc: "Wawancara bila diperlukan, lalu penetapan penerima melalui SK universitas." },
        ],
      },
    ],
  },
  "/kemahasiswaan/alumni": {
    eyebrow: "Kemahasiswaan",
    title: "Alumni & Tracer Study",
    description:
      "Lulusan Pendidikan Informatika UNISVET tersebar sebagai guru, developer, dan pelaku industri teknologi pendidikan.",
    metaTitle: "Alumni — Pendidikan Informatika UNISVET Semarang",
    blocks: [
      {
        type: "stats",
        title: "Hasil Tracer Study",
        items: [
          { label: "Total Alumni", value: "1000+" },
          { label: "Bekerja < 6 Bulan", value: "82%" },
          { label: "Bidang Pendidikan", value: "54%" },
          { label: "Industri TI & Wirausaha", value: "38%" },
        ],
      },
      {
        type: "quotes",
        title: "Cerita Alumni",
        items: [
          { name: "Rizky Aditama", role: "Guru Informatika SMK Negeri", quote: "Bekal microteaching dan praktikum membuat saya langsung siap mengajar di kelas pada hari pertama." },
          { name: "Melinda Putri", role: "Frontend Developer, Startup EdTech", quote: "Proyek capstone menjadi portofolio pertama saya saat melamar kerja sebagai developer." },
          { name: "Ahmad Fauzi", role: "Founder Bimbel Digital", quote: "Kombinasi ilmu pendidikan dan teknologi membuat saya percaya diri membangun usaha sendiri." },
          { name: "Nadia Rahma", role: "Instructional Designer", quote: "Mata kuliah media pembelajaran interaktif sangat relevan dengan pekerjaan saya sekarang." },
          { name: "Bagas Pratama", role: "Network Administrator", quote: "Praktikum jaringan dan IoT memberi fondasi kuat untuk sertifikasi profesional saya." },
          { name: "Sri Wahyuni", role: "Guru TIK & Pengelola LMS Sekolah", quote: "Saya terbiasa mengelola kelas digital sejak masih menjadi mahasiswa di prodi ini." },
        ],
      },
      {
        type: "list",
        title: "Program Ikatan Alumni",
        items: [
          "Pengisian kuesioner tracer study setiap tahun kelulusan.",
          "Mentoring karier dan simulasi wawancara kerja bagi mahasiswa akhir.",
          "Berbagi informasi lowongan kerja dan magang.",
          "Kuliah tamu praktisi dari alumni setiap semester.",
        ],
      },
    ],
  },
};