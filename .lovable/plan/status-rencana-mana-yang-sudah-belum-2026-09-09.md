# Status Rencana: Mana yang Sudah & Belum

## Sudah selesai

1. **Formulir ramah pengguna untuk semua jenis bagian halaman** — dosen & tendik, tabel (mata kuliah/biaya), struktur organisasi, FAQ, langkah/alur, statistik, linimasa, kutipan, dan galeri kini punya formulir dengan tombol tambah, hapus, naik, turun. Editor data mentah hanya tersisa untuk jenis bagian tak dikenal.
2. **Halaman berita per judul** — setiap berita punya alamat sendiri (slug), lengkap dengan judul, tanggal, foto besar, isi, berita terkait, serta judul/foto pratinjau saat tautan dibagikan.
3. **Pengumuman, Event, dan Agenda dinamis** — mengambil isian dari dashboard sesuai kategori; kategori Event dan Agenda sudah tersedia di editor berita.
4. **Peta situs & robots** — `/sitemap.xml` aktif (halaman navigasi + berita terbit), robots.txt menutup `/admin`.
5. **Dashboard dirapikan** — menu dikelompokkan (Utama, Halaman, Publikasi), judul halaman berketerangan, tombol "Lihat situs", pintasan cepat di Ringkasan.
6. Sebelumnya: beranda & footer bisa diedit, berita draf/terbit, galeri unggah/hapus, judul & deskripsi Google per halaman.

## Belum dikerjakan

### A. Kenyamanan pengelola di dashboard
- Pratinjau halaman berdampingan saat mengedit + peringatan bila keluar sebelum menyimpan.
- Catatan "terakhir diubah oleh & kapan" pada setiap halaman.
- Panduan singkat per bagian (contoh isian, ukuran foto disarankan).
- Pencarian & pengurutan pada daftar berita dan galeri; kategori serta urutan foto galeri.
- Ubah kata sandi dan menambah pengelola baru dari dashboard.

### B. Kelengkapan khas web prodi
- Halaman Kontak dengan formulir pesan yang masuk ke dashboard + peta lokasi.
- Pencarian isi web di menu atas.
- Unduhan dokumen (kurikulum, panduan, formulir) yang bisa diunggah dari dashboard.
- Tombol bahasa Indonesia/Inggris — opsional, hanya jika diinginkan.

### C. Perapian teknis kecil
- Peta situs masih memakai asal alamat dari permintaan dan diam-diam melewatkan berita bila pembacaan data gagal; sebaiknya dipatok ke domain publik dan menampilkan galat.

## Usulan urutan lanjutan

1. Kontak + formulir pesan masuk ke dashboard (paling terasa bagi calon mahasiswa).
2. Kenyamanan dashboard: pratinjau, peringatan simpan, pencarian & pengurutan berita/galeri, kategori galeri.
3. Dokumen unduhan + pencarian isi web.
4. Kelola pengelola & ubah kata sandi, lalu perapian peta situs.

## Catatan teknis

- Kontak: tabel `pesan_kontak` (insert untuk anon, select untuk admin, plus GRANT), pengiriman via server function, tab baru di dashboard, halaman `src/routes/kontak.tsx`.
- Dokumen: bucket `dokumen-prodi` + tabel `dokumen`, dikelola dari Pustaka Media.
- Kategori/urutan galeri: kolom tambahan pada tabel `galeri` + kontrol urut di dashboard.
- Riwayat perubahan: kolom `updated_by`/`updated_at` pada `page_content` dan `site_content`.
- Kelola pengelola: server function memakai admin client setelah verifikasi peran admin, menulis ke `user_roles`.
- Pencarian web: indeks sisi klien dari isi CMS + berita, tanpa layanan luar.
- Peta situs: patok `BASE_URL` ke `https://informatika-unisvet.lovable.app` dan lempar galat saat kueri gagal.
