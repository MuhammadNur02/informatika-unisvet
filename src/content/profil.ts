import type { PageContent } from "./types";
import labIot from "@/assets/lab-iot.jpg";
import labSmart from "@/assets/lab-smart.jpg";
import labMicroteaching from "@/assets/lab-microteaching.jpg";
import libCampus from "@/assets/lib-campus.jpg";
import dosen1 from "@/assets/dosen-1.jpg";
import dosen2 from "@/assets/dosen-2.jpg";
import dosen3 from "@/assets/dosen-3.jpg";
import dosen4 from "@/assets/dosen-4.jpg";
import dosen5 from "@/assets/dosen-5.jpg";
import dosen6 from "@/assets/dosen-6.jpg";

export const PROFIL_PAGES: Record<string, PageContent> = {
  "/profil/tentang": {
    eyebrow: "Profil",
    title: "Tentang Program Studi Pendidikan Informatika",
    description:
      "Program studi S1 di bawah Fakultas Ilmu Pendidikan Universitas Ivet (UNISVET) Semarang yang memadukan kompetensi kependidikan dengan keahlian teknologi informasi.",
    metaTitle: "Tentang Prodi — Pendidikan Informatika UNISVET Semarang",
    blocks: [
      {
        type: "prose",
        title: "Sekilas Prodi",
        paragraphs: [
          "Program Studi Pendidikan Informatika Universitas Ivet Semarang hadir untuk menjawab kebutuhan guru informatika dan tenaga profesional teknologi di era transformasi digital. Kurikulum disusun berbasis Outcome Based Education (OBE) dan mengacu pada KKNI level 6.",
          "Mahasiswa dibekali dua kompetensi sekaligus: kemampuan pedagogi untuk mengajar mata pelajaran Informatika di sekolah, serta keahlian teknis pengembangan perangkat lunak, jaringan, multimedia, dan kecerdasan artifisial.",
          "Pembelajaran diselenggarakan dalam kelas reguler dan kelas karyawan dengan skema blended learning, sehingga fleksibel bagi mahasiswa yang telah bekerja maupun lulusan SMA/SMK/MA.",
        ],
      },
      {
        type: "stats",
        title: "Profil Singkat",
        items: [
          { label: "Jenjang", value: "S1" },
          { label: "Gelar Lulusan", value: "S.Pd." },
          { label: "Beban Studi", value: "146 SKS" },
          { label: "Masa Studi", value: "8 Semester" },
        ],
      },
      {
        type: "cards",
        title: "Nilai yang Kami Tanamkan",
        items: [
          { title: "Profesional", desc: "Menguasai kompetensi pedagogik, kepribadian, sosial, dan profesional secara utuh.", tag: "Karakter" },
          { title: "Adaptif Teknologi", desc: "Terbiasa belajar mandiri mengikuti perkembangan bahasa, framework, dan tools baru.", tag: "Kompetensi" },
          { title: "Kolaboratif", desc: "Berkarya melalui proyek tim bersama sekolah mitra, komunitas, dan industri.", tag: "Kolaborasi" },
        ],
      },
      {
        type: "cta",
        title: "Siap bergabung bersama kami?",
        desc: "Pendaftaran mahasiswa baru UNISVET Semarang dibuka sepanjang tahun dengan beberapa jalur seleksi dan skema beasiswa.",
        label: "Daftar PMB UNISVET",
        href: "https://pmb.ivet.ac.id",
      },
    ],
  },
  "/profil/visi-misi": {
    eyebrow: "Profil",
    title: "Visi, Misi & Tujuan",
    description:
      "Arah pengembangan Program Studi Pendidikan Informatika UNISVET Semarang hingga tahun 2030.",
    metaTitle: "Visi & Misi — Pendidikan Informatika UNISVET Semarang",
    blocks: [
      {
        type: "prose",
        title: "Visi",
        paragraphs: [
          "Menjadi program studi unggul penghasil pendidik informatika yang profesional, berkarakter, dan adaptif terhadap perkembangan teknologi informasi di tingkat nasional pada tahun 2030.",
        ],
      },
      {
        type: "list",
        title: "Misi",
        items: [
          "Menyelenggarakan pembelajaran berbasis proyek dan teknologi digital yang berorientasi capaian pembelajaran lulusan.",
          "Mengembangkan penelitian pada bidang pendidikan informatika, EdTech, IoT, dan kecerdasan artifisial.",
          "Melaksanakan pengabdian kepada masyarakat berbasis literasi digital dan penguatan guru informatika.",
          "Memperluas kemitraan dengan sekolah, dunia usaha dan dunia industri, serta komunitas teknologi.",
          "Membangun budaya mutu, integritas akademik, dan karakter kebangsaan di lingkungan program studi.",
        ],
      },
      {
        type: "list",
        title: "Tujuan",
        items: [
          "Menghasilkan lulusan yang kompeten sebagai guru informatika dan praktisi teknologi informasi.",
          "Menghasilkan karya penelitian dan publikasi ilmiah yang bermanfaat bagi dunia pendidikan.",
          "Meningkatkan literasi dan keterampilan digital masyarakat melalui program pengabdian.",
          "Memperkuat jejaring kerja sama nasional untuk magang, PLP, dan rekognisi pembelajaran.",
        ],
      },
      {
        type: "steps",
        title: "Sasaran Strategis",
        items: [
          { title: "Penguatan Mutu Akademik", desc: "Peninjauan kurikulum berkala, sertifikasi kompetensi mahasiswa, dan penguatan pembelajaran berbasis proyek." },
          { title: "Produktivitas Riset", desc: "Peningkatan jumlah publikasi terindeks nasional/internasional dan luaran HKI setiap tahun." },
          { title: "Perluasan Kemitraan", desc: "Penambahan sekolah mitra PLP dan mitra industri untuk magang serta MBKM." },
          { title: "Rekognisi Lulusan", desc: "Peningkatan masa tunggu kerja lulusan di bawah enam bulan dan kepuasan pengguna lulusan." },
        ],
      },
    ],
  },
  "/profil/struktur-organisasi": {
    eyebrow: "Profil",
    title: "Struktur Organisasi Program Studi",
    description:
      "Tata kelola program studi yang menjamin pelaksanaan tridharma perguruan tinggi berjalan efektif dan akuntabel.",
    metaTitle: "Struktur Organisasi — Pendidikan Informatika UNISVET Semarang",
    blocks: [
      {
        type: "org",
        title: "Bagan Organisasi",
        top: "Koordinator Program Studi",
        topName: "Dr. Rahmawati Saputri, M.Kom.",
        nodes: [
          { role: "Sekretaris Prodi", name: "Adi Nugroho, S.Pd., M.Cs." },
          { role: "Gugus Kendali Mutu", name: "Siti Halimah, M.Pd." },
          { role: "Koordinator Kurikulum", name: "Nurul Aini, M.Kom." },
          { role: "Koordinator Laboratorium", name: "Bayu Prakoso, M.T." },
          { role: "Koordinator Riset & PkM", name: "Fajar Ramadhan, M.Cs." },
          { role: "Koordinator Kemahasiswaan", name: "Adi Nugroho, S.Pd., M.Cs." },
          { role: "Koordinator PLP & MBKM", name: "Siti Halimah, M.Pd." },
          { role: "Admin Akademik", name: "Dwi Lestari, S.Kom." },
          { role: "Teknisi Laboratorium", name: "Rian Setiawan, A.Md.Kom." },
        ],
      },
      {
        type: "table",
        title: "Tugas Pokok",
        head: ["Unit", "Tugas Utama"],
        rows: [
          ["Koordinator Prodi", "Perencanaan, pengelolaan, dan evaluasi seluruh kegiatan tridharma prodi."],
          ["Gugus Kendali Mutu", "Monitoring pelaksanaan SPMI, audit mutu internal, dan tindak lanjut perbaikan."],
          ["Koordinator Kurikulum", "Pengembangan RPS, peninjauan kurikulum OBE, dan pemetaan CPL."],
          ["Koordinator Laboratorium", "Penjadwalan praktikum, perawatan perangkat, dan keselamatan kerja lab."],
          ["Koordinator Riset & PkM", "Pendampingan proposal hibah, publikasi, dan kegiatan pengabdian."],
          ["Koordinator PLP & MBKM", "Penempatan mahasiswa di sekolah mitra dan mitra industri."],
        ],
      },
    ],
  },
  "/profil/dosen-tendik": {
    eyebrow: "Profil",
    title: "Dosen & Tenaga Kependidikan",
    description:
      "Didampingi dosen berkualifikasi magister dan doktor dengan fokus riset pendidikan dan teknologi informasi, serta tenaga kependidikan yang siap melayani.",
    metaTitle: "Dosen & Tendik — Pendidikan Informatika UNISVET Semarang",
    blocks: [
      {
        type: "people",
        title: "Dosen Tetap Program Studi",
        items: [
          { name: "Rahmawati Saputri", degree: "Dr., M.Kom.", role: "Koordinator Program Studi", interest: "Educational Data Mining", photo: dosen1 },
          { name: "Adi Nugroho", degree: "S.Pd., M.Cs.", role: "Dosen Rekayasa Perangkat Lunak", interest: "Web Engineering & DevOps", photo: dosen2 },
          { name: "Siti Halimah", degree: "S.Pd., M.Pd.", role: "Dosen Kurikulum & Pembelajaran", interest: "Digital Pedagogy", photo: dosen3 },
          { name: "Bayu Prakoso", degree: "S.T., M.T.", role: "Dosen Jaringan & IoT", interest: "Smart Systems & IoT", photo: dosen4 },
          { name: "Nurul Aini", degree: "S.Kom., M.Kom.", role: "Dosen Multimedia Pembelajaran", interest: "Interactive Media Learning", photo: dosen5 },
          { name: "Fajar Ramadhan", degree: "S.Kom., M.Cs.", role: "Dosen Kecerdasan Artifisial", interest: "Machine Learning for Education", photo: dosen6 },
        ],
      },
      {
        type: "table",
        title: "Tenaga Kependidikan",
        head: ["Nama", "Jabatan", "Layanan"],
        rows: [
          ["Dwi Lestari, S.Kom.", "Administrasi Akademik", "KRS, transkrip, legalisir, surat keterangan"],
          ["Rian Setiawan, A.Md.Kom.", "Teknisi Laboratorium", "Peminjaman perangkat & dukungan praktikum"],
          ["Ayu Kartika, S.I.Pust.", "Pustakawan Prodi", "Referensi skripsi, akses jurnal digital"],
        ],
      },
      {
        type: "stats",
        title: "Kualifikasi Dosen",
        items: [
          { label: "Doktor (S3)", value: "1" },
          { label: "Magister (S2)", value: "5" },
          { label: "Sertifikasi Pendidik", value: "4" },
          { label: "Sertifikasi Kompetensi Industri", value: "3" },
        ],
      },
    ],
  },
  "/profil/fasilitas": {
    eyebrow: "Profil",
    title: "Fasilitas & Laboratorium",
    description:
      "Ruang belajar modern dan laboratorium penunjang praktik yang mendukung pembelajaran berbasis proyek.",
    metaTitle: "Fasilitas — Pendidikan Informatika UNISVET Semarang",
    blocks: [
      {
        type: "gallery",
        title: "Laboratorium & Ruang Belajar",
        items: [
          { name: "Laboratorium Komputer Lanjut", image: labIot, desc: "Workstation pemrograman, jaringan, IoT, dan purwarupa sistem cerdas." },
          { name: "Microteaching Studio", image: labMicroteaching, desc: "Studio latihan mengajar dengan perekaman video untuk evaluasi pedagogi." },
          { name: "Smart Classroom", image: labSmart, desc: "Ruang kelas interaktif dengan papan digital dan konferensi hibrida." },
          { name: "Perpustakaan & E-Library", image: libCampus, desc: "Ruang baca modern dengan akses jurnal digital dan repositori kampus." },
        ],
      },
      {
        type: "list",
        title: "Fasilitas Penunjang",
        items: [
          "Akses internet kampus berkecepatan tinggi di seluruh area belajar.",
          "Lisensi perangkat lunak pengembangan dan akun cloud untuk praktikum.",
          "Learning Management System (E-Learning) untuk kelas blended.",
          "Ruang HIMA dan coworking space untuk kegiatan komunitas mahasiswa.",
          "Musala, kantin, dan area parkir kampus Pawiyatan Luhur.",
          "Klinik karier dan pendampingan sertifikasi kompetensi.",
        ],
      },
    ],
  },
  "/profil/akreditasi": {
    eyebrow: "Profil",
    title: "Akreditasi & Penjaminan Mutu",
    description:
      "Program studi terakreditasi LAMDIK dengan sistem penjaminan mutu internal yang berjalan berkelanjutan.",
    metaTitle: "Akreditasi — Pendidikan Informatika UNISVET Semarang",
    blocks: [
      {
        type: "stats",
        title: "Status Akreditasi",
        items: [
          { label: "Peringkat Prodi (LAMDIK)", value: "Baik" },
          { label: "Akreditasi Institusi (BAN-PT)", value: "B" },
          { label: "Kurikulum", value: "OBE / KKNI 6" },
          { label: "Audit Mutu Internal", value: "1x / Tahun" },
        ],
      },
      {
        type: "prose",
        title: "Komitmen Mutu",
        paragraphs: [
          "Program studi menjalankan siklus PPEPP (Penetapan, Pelaksanaan, Evaluasi, Pengendalian, Peningkatan) sebagai bagian dari Sistem Penjaminan Mutu Internal (SPMI) Universitas Ivet Semarang.",
          "Evaluasi pembelajaran dilakukan setiap akhir semester melalui monitoring kehadiran, kesesuaian RPS, kuesioner kepuasan mahasiswa, dan rapat tinjauan manajemen program studi.",
        ],
      },
      {
        type: "steps",
        title: "Siklus Penjaminan Mutu",
        items: [
          { title: "Penetapan Standar", desc: "Penyusunan standar akademik dan non-akademik prodi mengacu SN-Dikti." },
          { title: "Pelaksanaan", desc: "Implementasi standar pada pembelajaran, riset, dan pengabdian." },
          { title: "Evaluasi & Audit", desc: "Audit mutu internal oleh gugus kendali mutu dan LPM universitas." },
          { title: "Peningkatan", desc: "Tindak lanjut temuan audit menjadi program kerja tahun berikutnya." },
        ],
      },
      {
        type: "list",
        title: "Dokumen Mutu",
        items: [
          "Sertifikat akreditasi program studi (LAMDIK).",
          "Dokumen kurikulum OBE dan RPS seluruh mata kuliah.",
          "Laporan audit mutu internal dan rencana tindak lanjut.",
          "Laporan tracer study lulusan dan kepuasan pengguna.",
        ],
      },
    ],
  },
};