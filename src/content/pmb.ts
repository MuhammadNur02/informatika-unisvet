import type { PageContent } from "./types";

export const PMB_PAGES: Record<string, PageContent> = {
  "/pmb/mengapa-kami": {
    eyebrow: "PMB UNISVET",
    title: "Mengapa Memilih Pendidikan Informatika UNISVET?",
    description:
      "Satu prodi, dua kompetensi: menjadi pendidik TI profesional sekaligus pengembang teknologi digital.",
    metaTitle: "Mengapa Memilih Kami — PMB Pendidikan Informatika UNISVET",
    blocks: [
      {
        type: "cards",
        title: "Alasan Utama",
        items: [
          {
            title: "Dual Competency",
            desc: "Lulusan siap menjadi guru informatika bersertifikat maupun software/web developer.",
            tag: "Keunggulan",
          },
          {
            title: "Kurikulum Berbasis OBE & Industri",
            desc: "Capaian pembelajaran disusun mengikuti KKNI, kebutuhan sekolah mitra, dan tren industri TI.",
            tag: "Akademik",
          },
          {
            title: "Flexi-Learning",
            desc: "Kelas reguler dan blended learning yang ramah bagi mahasiswa yang sudah bekerja.",
            tag: "Fleksibel",
          },
          {
            title: "Laboratorium Modern",
            desc: "Lab komputer, lab IoT, studio microteaching, dan smart classroom.",
            tag: "Fasilitas",
          },
          {
            title: "Jaringan Mitra Luas",
            desc: "Sekolah mitra PPL, DUDI, serta komunitas EdTech untuk magang dan rekrutmen.",
            tag: "Karier",
          },
          {
            title: "Beasiswa & Biaya Terjangkau",
            desc: "Tersedia KIP-Kuliah, beasiswa prestasi, dan skema angsuran UKT.",
            tag: "Pembiayaan",
          },
        ],
      },
      {
        type: "stats",
        title: "Angka Singkat",
        items: [
          { label: "Mahasiswa Aktif", value: "500+" },
          { label: "Alumni Tersebar", value: "1000+" },
          { label: "Akreditasi", value: "LAMDIK" },
          { label: "Laboratorium", value: "4 Lab" },
        ],
      },
      {
        type: "cta",
        title: "Siap bergabung tahun ini?",
        desc: "Lihat jalur pendaftaran dan siapkan berkasmu sekarang.",
        label: "Lihat Jalur Pendaftaran",
        href: "/pmb/jalur-pendaftaran",
      },
    ],
  },
  "/pmb/jalur-pendaftaran": {
    eyebrow: "PMB UNISVET",
    title: "Jalur Pendaftaran",
    description: "Pilih jalur masuk yang paling sesuai dengan profil dan prestasi calon mahasiswa.",
    metaTitle: "Jalur Pendaftaran — PMB Pendidikan Informatika UNISVET",
    blocks: [
      {
        type: "cards",
        title: "Pilihan Jalur",
        items: [
          { title: "Jalur Reguler", desc: "Seleksi berkas dan wawancara akademik, dibuka sepanjang periode PMB.", tag: "Umum" },
          { title: "Jalur Prestasi", desc: "Bagi pemilik prestasi akademik/non-akademik tingkat kota hingga nasional.", tag: "Prestasi" },
          { title: "Jalur KIP-Kuliah", desc: "Bagi calon mahasiswa berprestasi dengan keterbatasan ekonomi.", tag: "Beasiswa" },
          { title: "Jalur Kerja Sama Sekolah", desc: "Kuota khusus lulusan SMA/SMK/MA mitra UNISVET.", tag: "Mitra" },
          { title: "Jalur Alih Jenjang / Transfer", desc: "Bagi lulusan D3 atau mahasiswa pindahan dengan konversi mata kuliah.", tag: "Transfer" },
          { title: "Jalur Karyawan (Blended)", desc: "Perkuliahan akhir pekan dan daring untuk peserta yang sudah bekerja.", tag: "Fleksibel" },
        ],
      },
      {
        type: "steps",
        title: "Alur Pendaftaran",
        items: [
          { title: "1. Registrasi Akun", desc: "Buat akun pada portal PMB UNISVET dan isi data diri." },
          { title: "2. Unggah Berkas", desc: "Lengkapi ijazah/SKL, rapor, KTP/KK, dan foto." },
          { title: "3. Bayar Biaya Pendaftaran", desc: "Lakukan pembayaran melalui kanal resmi yang tertera di portal." },
          { title: "4. Seleksi & Wawancara", desc: "Mengikuti tes potensi dan wawancara akademik prodi." },
          { title: "5. Pengumuman", desc: "Hasil seleksi diumumkan melalui portal dan email." },
          { title: "6. Registrasi Mahasiswa Baru", desc: "Pembayaran awal, pengambilan KTM, dan orientasi." },
        ],
      },
      {
        type: "cta",
        title: "Sudah menentukan jalurmu?",
        desc: "Cek persyaratan dokumen sebelum mendaftar.",
        label: "Lihat Persyaratan",
        href: "/pmb/persyaratan",
      },
    ],
  },
  "/pmb/persyaratan": {
    eyebrow: "PMB UNISVET",
    title: "Persyaratan Pendaftaran",
    description: "Dokumen dan ketentuan yang perlu disiapkan calon mahasiswa Pendidikan Informatika.",
    metaTitle: "Persyaratan — PMB Pendidikan Informatika UNISVET",
    blocks: [
      {
        type: "list",
        title: "Persyaratan Umum",
        items: [
          "Lulusan SMA/SMK/MA atau sederajat dari semua jurusan.",
          "Salinan ijazah atau Surat Keterangan Lulus (SKL) yang dilegalisasi.",
          "Salinan rapor semester 1–5 (untuk jalur prestasi).",
          "Salinan KTP dan Kartu Keluarga.",
          "Foto berwarna terbaru latar biru/merah ukuran 3x4.",
          "Mengisi formulir pendaftaran daring secara lengkap dan benar.",
        ],
      },
      {
        type: "list",
        title: "Persyaratan Tambahan per Jalur",
        items: [
          "Jalur Prestasi: sertifikat prestasi tingkat kota/provinsi/nasional.",
          "Jalur KIP-Kuliah: nomor pendaftaran KIP-Kuliah dan surat keterangan penghasilan orang tua.",
          "Jalur Transfer: transkrip nilai dan surat keterangan pindah dari perguruan tinggi asal.",
          "Jalur Karyawan: surat keterangan kerja dari instansi.",
        ],
      },
      {
        type: "faq",
        title: "Pertanyaan Seputar Berkas",
        items: [
          { q: "Apakah lulusan SMK non-TI boleh mendaftar?", a: "Boleh. Prodi menerima lulusan semua jurusan dan menyediakan mata kuliah dasar pemrograman dari nol." },
          { q: "Belum menerima ijazah, bagaimana?", a: "Gunakan Surat Keterangan Lulus (SKL) terlebih dahulu, ijazah dapat menyusul saat registrasi." },
        ],
      },
    ],
  },
  "/pmb/biaya": {
    eyebrow: "PMB UNISVET",
    title: "Biaya Pendidikan",
    description: "Rincian estimasi biaya kuliah Program Studi Pendidikan Informatika UNISVET Semarang.",
    metaTitle: "Biaya Pendidikan — PMB Pendidikan Informatika UNISVET",
    blocks: [
      {
        type: "table",
        title: "Estimasi Komponen Biaya",
        note: "Angka bersifat estimasi dan dapat berubah. Nominal resmi mengikuti surat keputusan PMB UNISVET tahun berjalan.",
        head: ["Komponen", "Keterangan", "Estimasi"],
        rows: [
          ["Biaya Pendaftaran", "Dibayar sekali saat mendaftar", "Rp 250.000"],
          ["Dana Pengembangan", "Dapat diangsur beberapa tahap", "Rp 2.000.000 – Rp 3.500.000"],
          ["SPP / UKT per Semester", "Termasuk praktikum dasar", "Rp 2.500.000 – Rp 3.500.000"],
          ["Praktikum & Lab", "Lab komputer, IoT, microteaching", "Rp 400.000 / semester"],
          ["Jas Almamater & Orientasi", "Dibayar sekali di awal", "Rp 750.000"],
        ],
      },
      {
        type: "list",
        title: "Skema Keringanan",
        items: [
          "Angsuran dana pengembangan hingga 4 tahap.",
          "Potongan bagi pendaftar gelombang awal.",
          "Potongan khusus bagi kakak-adik atau alumni UNISVET.",
          "Kombinasi dengan KIP-Kuliah dan beasiswa prestasi.",
        ],
      },
      {
        type: "cta",
        title: "Butuh rincian resmi?",
        desc: "Hubungi panitia PMB untuk simulasi biaya sesuai jalur yang dipilih.",
        label: "Daftar & Konsultasi",
        href: "/pmb/daftar",
      },
    ],
  },
  "/pmb/beasiswa": {
    eyebrow: "PMB UNISVET",
    title: "Beasiswa Calon Mahasiswa",
    description: "Peluang beasiswa yang dapat dimanfaatkan sejak proses pendaftaran.",
    metaTitle: "Beasiswa PMB — Pendidikan Informatika UNISVET",
    blocks: [
      {
        type: "cards",
        title: "Jenis Beasiswa",
        items: [
          { title: "KIP-Kuliah", desc: "Pembebasan biaya kuliah dan bantuan biaya hidup dari pemerintah.", tag: "Pemerintah" },
          { title: "Beasiswa Prestasi Akademik", desc: "Potongan SPP bagi pendaftar dengan nilai rapor terbaik.", tag: "Prestasi" },
          { title: "Beasiswa Prestasi Non-Akademik", desc: "Bagi juara olimpiade, olahraga, seni, atau kompetisi TI.", tag: "Prestasi" },
          { title: "Beasiswa Hafiz & Keagamaan", desc: "Apresiasi bagi penghafal Al-Qur'an dan aktivis keagamaan.", tag: "Khusus" },
          { title: "Beasiswa Mitra Sekolah", desc: "Kuota potongan bagi lulusan sekolah mitra UNISVET.", tag: "Mitra" },
          { title: "Beasiswa Alumni & Keluarga", desc: "Potongan bagi keluarga alumni UNISVET.", tag: "Keluarga" },
        ],
      },
      {
        type: "steps",
        title: "Cara Mengajukan",
        items: [
          { title: "1. Pilih Skema", desc: "Tentukan beasiswa yang sesuai saat mengisi formulir PMB." },
          { title: "2. Lengkapi Bukti", desc: "Unggah sertifikat, rapor, atau dokumen pendukung ekonomi." },
          { title: "3. Verifikasi", desc: "Panitia melakukan verifikasi berkas dan wawancara." },
          { title: "4. Penetapan", desc: "Hasil beasiswa diinformasikan bersama pengumuman kelulusan." },
        ],
      },
    ],
  },
  "/pmb/faq": {
    eyebrow: "PMB UNISVET",
    title: "FAQ Penerimaan Mahasiswa Baru",
    description: "Jawaban atas pertanyaan yang paling sering diajukan calon mahasiswa dan orang tua.",
    metaTitle: "FAQ PMB — Pendidikan Informatika UNISVET",
    blocks: [
      {
        type: "faq",
        title: "Pertanyaan Umum",
        items: [
          { q: "Apa gelar lulusan prodi ini?", a: "Lulusan menyandang gelar Sarjana Pendidikan (S.Pd.) bidang Pendidikan Informatika." },
          { q: "Apakah bisa bekerja di industri TI, bukan hanya mengajar?", a: "Ya. Kurikulum dual competency membekali kemampuan pengembangan web, aplikasi, jaringan, dan multimedia sehingga lulusan juga terserap di industri." },
          { q: "Apakah tersedia kelas untuk yang sudah bekerja?", a: "Tersedia kelas blended dengan perkuliahan akhir pekan dan daring." },
          { q: "Berapa lama masa studi?", a: "Delapan semester (empat tahun) dengan total sekitar 146 SKS." },
          { q: "Apakah harus punya laptop sendiri?", a: "Sangat disarankan, namun laboratorium komputer kampus tersedia untuk praktikum dan tugas." },
          { q: "Apakah ada program magang?", a: "Ada, melalui MBKM, magang industri, serta PPL di sekolah mitra." },
          { q: "Bagaimana status akreditasinya?", a: "Prodi terakreditasi oleh LAMDIK dan menjalankan penjaminan mutu internal secara berkala." },
          { q: "Kapan pendaftaran ditutup?", a: "Pendaftaran dibuka bergelombang; gelombang awal memberi potongan biaya dan pilihan kelas lebih leluasa." },
        ],
      },
      {
        type: "cta",
        title: "Masih ada pertanyaan lain?",
        desc: "Tim PMB siap membantu melalui WhatsApp dan email prodi.",
        label: "Hubungi & Daftar",
        href: "/pmb/daftar",
      },
    ],
  },
  "/pmb/daftar": {
    eyebrow: "PMB UNISVET",
    title: "Daftar Sekarang",
    description:
      "Mulai langkahmu menjadi pendidik dan profesional teknologi informasi bersama Pendidikan Informatika UNISVET Semarang.",
    metaTitle: "Daftar Sekarang — PMB Pendidikan Informatika UNISVET",
    blocks: [
      {
        type: "steps",
        title: "Tiga Langkah Cepat",
        items: [
          { title: "1. Buka Portal PMB", desc: "Akses portal resmi PMB UNISVET dan buat akun pendaftar." },
          { title: "2. Isi Formulir & Unggah Berkas", desc: "Pilih Program Studi Pendidikan Informatika serta jalur yang diinginkan." },
          { title: "3. Ikuti Seleksi", desc: "Selesaikan pembayaran pendaftaran, lalu ikuti tes dan wawancara." },
        ],
      },
      {
        type: "prose",
        title: "Kontak Panitia",
        paragraphs: [
          "WhatsApp: +62 812-3456-7890 (jam kerja 08.00–16.00 WIB).",
          "Email: pendidikaninformatika@ivet.ac.id — Telepon: (024) 8316375.",
          "Sekretariat: Universitas Ivet, Jl. Pawiyatan Luhur IV No.18, Bendan Duwur, Gajahmungkur, Kota Semarang, Jawa Tengah 50235.",
        ],
      },
      {
        type: "cta",
        title: "Buka Portal PMB UNISVET",
        desc: "Pendaftaran daring dibuka sepanjang periode PMB tahun akademik berjalan.",
        label: "Ke Portal PMB",
        href: "https://pmb.ivet.ac.id",
      },
    ],
  },
};