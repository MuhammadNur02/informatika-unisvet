# Menyempurnakan Web Prodi & Kemudahan Edit dari Dashboard

Berikut hasil pemeriksaan isi web dan dashboard saat ini, lalu daftar yang kurang dan usulan perbaikan.

## Kondisi sekarang (sudah baik)

- Semua menu publik sudah ada: Profil, Akademik, Kemahasiswaan, Riset & Inovasi, Informasi, PMB.
- Beranda (hero, statistik, keunggulan, visi–misi, alumni, ajakan daftar) dan footer sudah bisa diedit dari dashboard.
- Berita bisa ditulis, diunggah fotonya, disimpan sebagai draf/terbit, dan tampil di beranda serta halaman Berita.
- Galeri kegiatan bisa diunggah dan dihapus, langsung tampil di halaman publik.
- Judul & deskripsi Google (SEO/Open Graph) tiap halaman bisa diisi dari dashboard.

## Yang masih kurang / perlu diperbaiki

### 1. Bagian penting halaman masih sulit diedit (prioritas utama)
Isi seperti daftar Dosen & Tendik, tabel Mata Kuliah, struktur organisasi, FAQ PMB, langkah pendaftaran, tabel biaya, angka statistik, linimasa agenda, dan kutipan alumni saat ini hanya bisa diubah lewat kotak "editor lanjutan" berisi data mentah. Satu tanda kutip terhapus dan isian gagal disimpan — ini bikin pengelola takut menyentuhnya.
Perbaikan: buat formulir ramah pengguna untuk setiap jenis bagian:
- Dosen & Tendik: kartu per orang (nama, gelar, jabatan, bidang minat, foto dari pustaka media), tambah/hapus/urutkan.
- Tabel (mata kuliah, biaya, kurikulum): editor tabel dengan tambah/hapus baris & kolom.
- FAQ, langkah/alur, statistik, linimasa, kutipan, struktur organisasi, galeri fasilitas: masing-masing formulir baris-per-item dengan tombol tambah, hapus, naik, turun.

### 2. Berita belum punya halaman bacaan sendiri
Sekarang isi berita hanya terbuka lewat "Baca selengkapnya" di daftar; tidak ada tautan yang bisa dibagikan ke WhatsApp/Instagram dengan judul dan foto berita.
Perbaikan: halaman berita per judul (alamat memakai slug yang sudah tersimpan), lengkap dengan judul, tanggal, foto besar, isi, tombol bagikan, dan berita terkait. Judul & foto berita otomatis jadi pratinjau saat tautan dibagikan.

### 3. Halaman Event, Pengumuman, dan Agenda masih statis
Berita yang diunggah admin hanya muncul di beranda dan halaman Berita.
Perbaikan: Pengumuman dan Event/Agenda mengambil isian dari dashboard sesuai kategori, sehingga sekali unggah langsung tampil di halaman yang tepat. Tambah kategori "Agenda/Event" pada editor berita.

### 4. Kenyamanan pengelola di dashboard
- Pratinjau halaman berdampingan saat mengedit, plus peringatan bila keluar sebelum menyimpan.
- Riwayat "terakhir diubah oleh & kapan" pada setiap halaman.
- Panduan singkat di setiap bagian (contoh isian, ukuran foto yang disarankan).
- Pencarian & pengurutan pada daftar berita dan galeri, serta kategori galeri agar mudah dikelola saat foto sudah banyak.
- Tombol ubah kata sandi dan penambahan pengelola baru dari dashboard.

### 5. Kelengkapan khas web prodi kampus
- Halaman Kontak dengan formulir pesan (masuk ke dashboard) + peta lokasi.
- Pencarian isi web di menu atas.
- Unduhan dokumen (kurikulum, panduan, formulir) yang bisa diunggah dari dashboard.
- Sitemap.xml agar seluruh halaman terbaca Google (robots.txt sudah ada, sitemap belum).
- Tombol bahasa Indonesia/Inggris — opsional, hanya jika diinginkan.

## Usulan urutan pengerjaan

1. Formulir ramah pengguna untuk semua jenis bagian halaman (poin 1).
2. Halaman berita per judul + Pengumuman/Event/Agenda dinamis (poin 2 & 3).
3. Kenyamanan dashboard: pratinjau, pencarian, kategori galeri, kelola pengelola (poin 4).
4. Kontak + formulir pesan, pencarian web, dokumen unduhan, sitemap (poin 5).

## Catatan teknis

- Blok baru ditangani di `src/components/admin/PageEditor.tsx` (mengganti fallback JSON `AdvancedFields`) dengan editor per tipe pada `Block` di `src/content/types.ts`; struktur data tidak berubah sehingga isi lama tetap aman.
- Halaman berita: route baru `src/routes/informasi.berita.$slug.tsx` memakai `slug` dari tabel `berita`, `head()` dengan title/description/og:image dari data berita; daftar tetap di `/informasi/berita`.
- Pengumuman/Event/Agenda: komponen daftar berbagi filter kategori dari `src/lib/berita.ts`, dirender sebagai children `SitePage` seperti `BeritaList`.
- Kontak: tabel `pesan_kontak` (insert untuk anon, select untuk admin, plus GRANT), server function untuk kirim, tab baru di dashboard.
- Dokumen: bucket storage `dokumen-prodi` + tabel `dokumen`, dikelola di Pustaka Media.
- Sitemap: `src/routes/sitemap[.]xml.tsx` menghasilkan daftar route statis + slug berita.
- Kelola pengelola: server function memakai admin client (verifikasi peran admin dulu) untuk undang/atur peran di `user_roles`.
