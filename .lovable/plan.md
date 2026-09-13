# Penyempurnaan Menyeluruh Situs dan Dashboard

## Kondisi saat ini

Fondasi situs sudah lengkap dan identitas kampusnya kuat: maroon–gold konsisten, navigasi publik luas, pencarian tersedia, halaman responsif, serta dashboard telah mencakup konten, berita, galeri, media, dokumen, pesan, dan akun.

Hasil pemeriksaan tampilan berjalan dan kode menunjukkan beberapa hal yang paling membatasi kualitas saat ini:

- Bagian atas beranda terasa padat: portal, navigasi, pencarian, tombol PMB, judul panjang, dua tombol, badge, foto, dan label mengambang bersaing dalam satu layar.
- Pada ponsel, foto utama dan petunjuk ke bagian berikutnya belum terlihat di layar pertama; pengunjung menerima blok maroon yang panjang sebelum melihat konten visual lain.
- Banyak bagian memakai bentuk kartu dan radius besar yang sama, sehingga hierarki antarbagian kurang terasa dan halaman tampak berulang.
- Masih ada animasi latar cahaya/gradient mengambang dan efek berdenyut di beberapa bagian, walaupun animasi latar lama pernah diminta untuk dihapus.
- Gerakan belum menghormati pengaturan perangkat **kurangi gerakan**.
- Dropdown desktop bergantung pada arah mouse dan belum nyaman dioperasikan dengan keyboard.
- Bahasa dokumen masih ditandai sebagai bahasa Inggris, sementara seluruh konten berbahasa Indonesia.
- Dashboard sudah fungsional, tetapi editor panjang belum memiliki perlindungan perubahan yang belum disimpan; beberapa penghapusan juga belum meminta konfirmasi.
- Dashboard masih menyimpan bagian galeri lama yang tidak dipakai, sehingga file utama lebih sulit dirawat.

## Tahap 1 — Perbaikan wajib dan pengaman

- Ubah bahasa dokumen menjadi Indonesia, tambahkan tautan “Lewati ke konten”, fokus keyboard yang jelas, status buka/tutup menu, dan dukungan penuh keyboard untuk submenu.
- Pastikan kontras teks kecil pada navigasi, portal, badge, dan footer memenuhi standar keterbacaan.
- Tambahkan dukungan `prefers-reduced-motion`; hentikan video dan gerakan dekoratif bagi pengguna yang memilih pengurangan gerakan.
- Tambahkan konfirmasi sebelum menghapus dokumen dan media.
- Tambahkan peringatan ketika pengguna meninggalkan editor dengan perubahan yang belum disimpan.
- Pertahankan pemeriksaan hak admin di lapisan data; jangan hanya mengandalkan tampilan dashboard.
- Ubah halaman 404 dan halaman gagal menjadi bahasa Indonesia serta samakan dengan identitas situs.

## Tahap 2 — Penyederhanaan tampilan publik

### Beranda dan tata letak

- Ringankan layar pertama: prioritaskan nama prodi, manfaat utama, tombol PMB, dan foto kampus; pindahkan badge pendukung ke posisi yang tidak bersaing dengan judul.
- Susun versi ponsel agar foto kampus atau sedikit bagian berikutnya tetap terlihat tanpa menggulir terlalu jauh.
- Kurangi panjang judul dan lebar paragraf agar lebih cepat dipindai tanpa mengubah pesan utama.
- Satukan statistik dengan alur bagian pertama secara lebih alami dan hilangkan kesan panel mengambang yang terlalu besar.
- Variasikan komposisi antarbagian: tidak semua isi menjadi kartu; gunakan pemisah bidang, daftar, foto lebar, dan ruang kosong untuk menciptakan ritme.
- Kurangi radius besar dan bayangan tebal; gunakan kartu hanya untuk item yang memang perlu dikelompokkan.

### Navigasi

- Beri penanda aktif yang jelas pada menu induk dan submenu.
- Rapikan ukuran logo, teks kampus, menu, pencarian, dan tombol PMB agar seimbang pada laptop 1280 px.
- Jadikan menu ponsel lebih ringkas, kurangi lapisan kartu di dalam panel, dan pertahankan tombol utama tetap mudah dijangkau.
- Pertahankan pencarian situs, tetapi perjelas keadaan gagal sebagian dan arahkan hasil galeri/dokumen ke item yang dimaksud, bukan hanya halaman umumnya.

### Warna, tombol, dan tipografi

- Pertahankan maroon, putih, slate, dan gold; gunakan gold terutama untuk tindakan utama dan penekanan penting agar tidak kehilangan makna.
- Tetapkan tiga tingkat tombol yang konsisten: utama, sekunder, dan tindakan teks.
- Samakan tinggi tombol, ukuran ikon, fokus, keadaan nonaktif, dan posisi ikon di seluruh situs.
- Kurangi teks huruf kapital kecil dan jarak huruf lebar pada elemen yang sering dibaca.
- Gunakan lebar teks optimal, ukuran isi minimum yang nyaman, serta jarak vertikal konsisten untuk halaman panjang.

## Tahap 3 — Animasi dan media yang lebih profesional

- Hapus sisa animasi latar cahaya, blob, mesh bergerak, dan `pulse` berulang dari bagian konten.
- Pertahankan video teknologi hanya sebagai aksen terkontrol pada area utama, dengan gambar pengganti agar tidak berkedip hitam saat memuat.
- Gunakan animasi hanya untuk tiga tujuan: masuknya bagian, perpindahan tab, dan umpan balik tombol/dialog.
- Samakan durasi gerakan pada kisaran singkat dan halus; hindari elemen yang terus bergerak karena mengalihkan perhatian dari isi akademik.
- Optimalkan foto utama agar dimuat lebih cepat, sementara foto di bawah tetap dimuat bertahap.

## Tahap 4 — Penyempurnaan dashboard

### Kejelasan alur kerja

- Ubah ringkasan menjadi pusat pekerjaan: status konten terbaru, draf, pesan belum dibaca, dan pintasan berdasarkan pekerjaan yang paling sering dilakukan.
- Kelompokkan editor menjadi langkah yang jelas: informasi dasar, isi, media, SEO, pratinjau, lalu terbitkan.
- Tambahkan bilah tindakan simpan/pratinjau yang tetap mudah dijangkau pada editor panjang.
- Buat blok konten dapat dilipat, dengan “buka semua/tutup semua”, agar halaman panjang tidak melelahkan.
- Ganti pemilih media berbentuk daftar teks dengan galeri thumbnail yang dapat dicari.
- Tambahkan penghitung karakter dan petunjuk batas ideal untuk judul, ringkasan, deskripsi pencarian, dan teks media sosial.

### Keamanan dan efisiensi

- Tambahkan indikator **belum disimpan**, waktu simpan terakhir, dan pesan berhasil yang tidak mengganggu.
- Tambahkan pilihan tindakan massal untuk galeri/media hanya setelah alur hapus satu item aman dan konsisten.
- Simpan pencarian, filter, dan urutan di alamat halaman agar tidak hilang saat berpindah bagian atau menekan tombol kembali.
- Tampilkan pratinjau desktop dan ponsel sebelum konten diterbitkan.
- Hapus kode galeri lama yang sudah tidak dirender setelah memastikan fungsi baru mencakup semuanya.

## Tahap 5 — Kualitas institusional

- Audit semua halaman untuk memastikan hanya satu judul utama, metadata unik lengkap, tautan benar, gambar memiliki teks alternatif, dan tabel nyaman di ponsel.
- Satukan pengelolaan metadata agar tidak terjadi perubahan judul halaman setelah layar terbuka.
- Tambahkan indikator perpindahan halaman yang halus dan keadaan kosong/gagal yang konsisten.
- Periksa semua formulir dengan keyboard dan pembaca layar.
- Ukur kecepatan halaman utama, kestabilan tata letak, ukuran video/foto, dan waktu respons pencarian.
- Uji pada ponsel kecil, tablet, laptop 1280 px, dan desktop lebar; periksa menu, pencarian, PMB, formulir kontak, berita, galeri, dokumen, serta seluruh dashboard.

## Urutan pelaksanaan yang disarankan

1. **Keamanan data dan aksesibilitas** — risiko tertinggi, perubahan visual kecil.
2. **Beranda dan navigasi** — dampak terbesar bagi kesan pertama dan kenyamanan pengunjung.
3. **Sistem visual dan animasi** — menyatukan tampilan tanpa menambah efek berlebihan.
4. **Editor dashboard** — mempercepat pekerjaan dan mencegah kehilangan konten.
5. **Audit akhir lintas perangkat, performa, dan SEO** — memastikan semua bagian benar-benar siap dipakai.

## Batas perlindungan

- Tidak mengubah `.env`, koneksi otomatis, kebijakan penyimpanan, atau konten yang sudah tersimpan.
- Tidak menggunakan reset, checkout, pull, atau operasi lain yang dapat menimpa kode terbaru.
- Perubahan dilakukan bertahap dan diperiksa per bagian, bukan mengganti proyek dengan template baru.
- Identitas maroon–gold, logo, foto kampus, struktur informasi, dan fungsi dashboard yang sudah berjalan tetap dipertahankan.
