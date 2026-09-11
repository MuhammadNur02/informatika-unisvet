# Lanjutan Penyempurnaan dengan Perlindungan Kode Terbaru

## Jaminan ruang lingkup

- Kode yang sekarang ada menjadi sumber utama; perubahan dibuat sebagai tambahan kecil pada bagian terkait, bukan mengganti proyek dengan template atau versi lama.
- `.env`, file koneksi otomatis, file tipe otomatis, dan konfigurasi penyimpanan yang sudah ada tidak akan disentuh.
- Tidak menjalankan reset, checkout, pull, atau operasi Git lain yang dapat menimpa pekerjaan Anda.
- Sebelum setiap perubahan, isi file terbaru dibaca; sesudahnya, perubahan diperiksa melalui diff agar tidak ada bagian di luar rencana yang ikut berubah.
- Kondisi kerja saat pemeriksaan bersih, sehingga tidak ada perubahan lokal yang sedang tertunda atau berisiko tertimpa.

## Yang akan dibuat

### 1. Pencarian dan pengurutan berita di dashboard

- Tambahkan kolom pencarian pada daftar berita berdasarkan judul, ringkasan, tag, dan kategori.
- Tambahkan penyaring kategori dan status Terbit/Draf.
- Tambahkan pilihan urutan: terbaru, terlama, judul A–Z, dan judul Z–A.
- Pertahankan formulir tulis/edit, unggah foto, penerbitan, dan penghapusan yang sudah ada tanpa mengubah alurnya.

### 2. Pengelolaan galeri yang lebih lengkap

- Tambahkan isian kategori dan urutan pada formulir unggah foto.
- Tambahkan pencarian, penyaring kategori, dan pilihan pengurutan pada daftar foto.
- Tambahkan kontrol untuk mengubah kategori dan posisi foto yang sudah tersimpan tanpa mengunggah ulang.
- Gunakan kolom `kategori` dan `urutan` yang sudah tersedia; tidak membuat ulang tabel atau bucket penyimpanan.
- Pertahankan foto, alamat berkas, serta data galeri lama apa adanya.

### 3. Pencarian seluruh situs

- Tambahkan tombol pencarian yang mudah ditemukan pada navigasi desktop dan seluler.
- Tampilkan panel pencarian cepat yang mencakup halaman umum, isi hasil editor, berita/pengumuman/event/agenda, galeri, dan dokumen unduhan.
- Setiap hasil menampilkan jenis konten, judul, ringkasan singkat, lalu menuju halaman publik yang sesuai.
- Sediakan keadaan memuat, hasil kosong, penanganan kegagalan, navigasi keyboard, dan tampilan yang nyaman di ponsel.
- Pencarian memanfaatkan data publik yang sudah ada; tidak menyalin atau mengubah konten lama.

### 4. Akun admin: ubah kata sandi sendiri

- Tambahkan menu **Akun Saya** di dashboard.
- Form berisi kata sandi saat ini, kata sandi baru, dan konfirmasi kata sandi baru.
- Verifikasi kata sandi saat ini sebelum perubahan, validasi kecocokan/kekuatan kata sandi baru, serta tampilkan pesan berhasil atau gagal yang jelas.
- Fitur ini hanya mengubah kata sandi akun yang sedang masuk; tidak menambah, menghapus, atau mengubah hak admin lain.

## Perubahan teknis yang dibatasi

- Perubahan utama hanya pada editor berita, bagian galeri dashboard, pustaka data galeri, navigasi publik, serta komponen baru untuk pencarian situs dan pengaturan akun.
- Tidak ada migrasi database baru yang diperlukan karena kategori dan urutan galeri sudah tersedia.
- Tidak mengubah `.env`, autentikasi login yang sudah berjalan, kebijakan akses data, bucket, atau isi konten yang telah tersimpan.
- Komponen baru dibuat terpisah bila memungkinkan agar file dashboard tidak makin sulit dirawat.

## Pemeriksaan sebelum selesai

- Periksa diff akhir dan pastikan hanya file yang tercantum dalam ruang lingkup yang berubah.
- Jalankan pemeriksaan tipe dan build produksi.
- Uji dashboard: cari/urutkan berita, cari/filter/ubah kategori dan urutan galeri, serta ubah kata sandi dengan validasi.
- Uji situs publik pada desktop dan ponsel: buka pencarian, cari setiap jenis konten, dan buka hasilnya ke halaman yang benar.
- Pastikan foto, berita, dokumen, login, dan halaman publik yang sudah ada tetap berjalan.
