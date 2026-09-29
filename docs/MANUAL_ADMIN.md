# BUKU PANDUAN ADMIN

## Sistem Pengelolaan Konten (Dashboard Admin) Website Program Studi Pendidikan Informatika — Universitas Ivet Semarang

**Versi Dokumen:** 1.0
**Terakhir Diperbarui:** [isi tanggal]
**Disusun oleh:** [isi nama penyusun]

> **Catatan tentang gambar dalam panduan ini:** Setiap penanda `![Gambar](link)` adalah tempat untuk menyisipkan tangkapan layar (*screenshot*) sesuai konteksnya. Disarankan menyimpan seluruh gambar panduan pada folder `docs/images/manual/` dengan format penamaan berurutan, misalnya `01-login.png`, `02-dashboard.png`, dan seterusnya, agar tautan pada dokumen ini tetap konsisten.

---

## Daftar Isi

1. [Pendahuluan](#1-pendahuluan)
2. [Panduan Ukuran & Format Gambar](#2-panduan-ukuran--format-gambar)
3. [Cara Masuk ke Dashboard](#3-cara-masuk-ke-dashboard)
4. [Mengenal Tampilan Dashboard](#4-mengenal-tampilan-dashboard)
5. [Ringkasan (Beranda Dashboard)](#5-ringkasan-beranda-dashboard)
6. [Mengelola Beranda & Footer](#6-mengelola-beranda--footer)
7. [Mengelola Editor Konten Halaman](#7-mengelola-editor-konten-halaman)
8. [Mengelola Berita & Agenda](#8-mengelola-berita--agenda)
9. [Mengelola Galeri Kegiatan](#9-mengelola-galeri-kegiatan)
10. [Mengelola Pustaka Media](#10-mengelola-pustaka-media)
11. [Mengelola Dokumen Unduhan](#11-mengelola-dokumen-unduhan)
12. [Mengelola Pesan Masuk](#12-mengelola-pesan-masuk)
13. [Pengaturan Akun & Keluar](#13-pengaturan-akun--keluar)
14. [Troubleshooting (Pemecahan Masalah)](#14-troubleshooting-pemecahan-masalah)
15. [Penutup](#15-penutup)

---

## 1. Pendahuluan

Dokumen ini merupakan panduan penggunaan dashboard admin (*Content Management System*/CMS) Website Program Studi Pendidikan Informatika Universitas Ivet Semarang. Dashboard ini memungkinkan pengelola program studi memperbarui seluruh konten yang tampil di situs publik — mulai dari beranda, berita, galeri kegiatan, dokumen unduhan, hingga pesan masuk dari pengunjung — **tanpa perlu keterlibatan pengembang** dan tanpa perlu menulis kode sama sekali.

### 1.1 Fitur Utama

| Fitur | Fungsi Singkat |
|---|---|
| Ringkasan | Statistik singkat kondisi konten situs |
| Beranda & Footer | Mengubah hero, statistik, keunggulan, dan kontak footer |
| Editor Konten | Mengubah isi setiap halaman prodi (profil, akademik, dll.) |
| Berita & Agenda | Menulis dan menerbitkan berita/agenda |
| Galeri Kegiatan | Mengunggah dan mengelola foto kegiatan |
| Pustaka Media | Mengunggah foto/video untuk dipakai di berbagai halaman |
| Dokumen Unduhan | Mengunggah berkas (PDF/Word/Excel/PowerPoint) untuk diunduh publik |
| Pesan Masuk | Membaca pesan dari formulir kontak situs |
| Akun Saya | Mengubah kata sandi akun sendiri |

### 1.2 Siapa yang Menggunakan Panduan Ini

Panduan ini ditujukan bagi staf/dosen yang diberi hak akses **Admin** untuk mengelola konten situs prodi. Setiap pengguna wajib memiliki akun yang telah didaftarkan oleh pengelola sistem sebelumnya — dashboard ini **tidak memiliki fitur pendaftaran akun mandiri** demi menjaga keamanan.

---

## 2. Panduan Ukuran & Format Gambar

Agar tampilan situs tetap rapi dan cepat dimuat, gunakan acuan ukuran berikut setiap kali mengunggah gambar:

| Jenis Gambar | Rasio/Ukuran Ideal | Format Disarankan | Keterangan |
|---|---|---|---|
| Foto Hero/Banner Beranda | ± 1600 × 1100 piksel (lanskap) | JPG/WEBP | Tampil penuh di bagian atas beranda |
| Foto Galeri Kegiatan | Rasio 4:3 (mis. 1200 × 900 px) | JPG/WEBP | Dipangkas otomatis mengikuti rasio 4:3 |
| Foto Berita | Rasio 4:3 hingga 16:9 (mis. 1200 × 800 px) | JPG, PNG, atau WEBP | Tampil sebagai gambar sampul berita |
| Gambar Pustaka Media | Rasio 4:3, minimal 1200 × 900 px | JPG/WEBP | Dipakai ulang di berbagai halaman |
| Gambar OG/Bagikan Sosial Media | Tepat 1200 × 630 piksel | JPG/PNG | Tampil saat tautan situs dibagikan ke media sosial |

**Tips umum:**

- Kompres gambar sebelum diunggah (disarankan di bawah 1 MB per gambar) agar situs tetap cepat diakses pengunjung.
- Gunakan foto beresolusi cukup — hindari mengunggah gambar buram atau hasil perbesaran (*zoom in*) berlebihan.
- Untuk berkas dokumen (PDF/Word/Excel/PowerPoint), disarankan ukuran berkas di bawah 10 MB agar mudah diunduh pengunjung dengan koneksi internet terbatas.
- Format WEBP disarankan untuk foto karena ukuran berkasnya lebih kecil dibanding JPG/PNG pada kualitas visual yang setara.

---

## 3. Cara Masuk ke Dashboard

1. Buka peramban (*browser*), lalu akses alamat halaman masuk admin, contoh: `https://[domain-situs-anda]/admin/login`.
2. Masukkan **Email** dan **Kata Sandi** akun admin yang telah didaftarkan.
3. Gunakan ikon mata pada kolom kata sandi apabila ingin menampilkan/menyembunyikan karakter yang diketik.
4. Klik tombol **"Masuk ke Dashboard"**.
5. Jika email/kata sandi tidak sesuai, sistem akan menampilkan pesan kesalahan — periksa kembali ejaan email dan kata sandi, perhatikan huruf besar/kecil (*case sensitive*).
6. Setelah berhasil masuk, Anda akan diarahkan otomatis ke halaman **Ringkasan** dashboard.

![Gambar: Tampilan halaman masuk (login) admin](docs/images/manual/01-login.png)

> **Keamanan:** Jangan membagikan email dan kata sandi akun admin kepada pihak yang tidak berwenang. Segera ubah kata sandi melalui menu **Akun Saya** apabila Anda menduga kredensial telah diketahui pihak lain (lihat [Bagian 13](#13-pengaturan-akun--keluar)).

---

## 4. Mengenal Tampilan Dashboard

Dashboard terbagi menjadi tiga bagian utama:

1. **Sidebar (menu navigasi kiri)** — daftar seluruh menu pengelolaan konten, dikelompokkan menjadi: Utama, Halaman, Publikasi, dan Layanan. Pada tampilan perangkat kecil (ponsel/tablet), sidebar ini dapat dibuka/ditutup melalui tombol menu (ikon garis tiga) di pojok kiri atas.
2. **Header (bagian atas)** — menampilkan judul menu yang sedang aktif, status verifikasi akun admin, tautan **"Lihat situs"** untuk membuka halaman publik di tab baru, serta tombol untuk menyembunyikan/menampilkan sidebar pada layar besar.
3. **Area konten utama** — menampilkan formulir/tabel pengelolaan sesuai menu yang dipilih.

![Gambar: Tampilan keseluruhan dashboard dengan sidebar, header, dan area konten ditandai](docs/images/manual/02-tampilan-dashboard.png)

> Jika di header muncul label **"Tanpa hak admin"** (bukan "Terverifikasi Admin"), artinya akun Anda belum diberi peran admin oleh pengelola sistem sehingga seluruh aksi simpan/unggah/hapus akan ditolak sistem. Hubungi pengelola utama untuk mengaktifkan peran admin pada akun Anda.

---

## 5. Ringkasan (Beranda Dashboard)

Halaman **Ringkasan** adalah tampilan pertama setelah masuk, berisi:

- Ringkasan statistik: jumlah berita terbit, pesan belum dibaca, halaman yang sudah diedit, jumlah foto galeri, dokumen, dan media yang tersimpan.
- **Menu Cepat** — pintasan langsung menuju menu pengelolaan yang sering digunakan.
- **Panduan singkat** — pengingat aturan dasar penggunaan dashboard.

![Gambar: Halaman Ringkasan dashboard beserta kartu statistik](docs/images/manual/03-ringkasan.png)

---

## 6. Mengelola Beranda & Footer

Menu ini digunakan untuk mengubah seluruh konten yang tampil di halaman beranda situs beserta bagian footer (kaki halaman), yang terbagi menjadi beberapa tab berikut:

| Tab | Isi yang Dapat Diubah |
|---|---|
| Hero & SEO | Judul utama, kata tetap, tombol ajakan, chip keterangan, foto hero, serta pengaturan SEO/Open Graph beranda |
| Statistik | Angka-angka statistik (mis. jumlah mahasiswa, akreditasi, jumlah laboratorium) |
| Keunggulan | Poin-poin keunggulan program studi |
| Visi & Misi | Teks visi dan daftar poin misi |
| Jalur Karier | Daftar prospek karier lulusan |
| Alumni & Berita | Testimoni alumni dan pengaturan tampilan berita terbaru di beranda |
| Ajakan Daftar | Teks dan tombol ajakan pendaftaran (*call to action*) |
| Footer | Deskripsi singkat, tautan portal akademik, kontak WhatsApp, dan informasi kontak lain di footer |

### Langkah Mengubah Konten

1. Pada sidebar, klik menu **"Beranda & Footer"**.
2. Pilih tab sesuai bagian yang ingin diubah, misalnya **"Hero & SEO"**.
3. Ubah isi kolom yang tersedia sesuai kebutuhan. Kolom bertanda kotak berwarna (biru/hijau muda) menandakan kelompok isian yang saling terkait.
4. Untuk mengganti foto, isikan tautan (URL) gambar secara langsung, atau pilih foto yang sudah tersedia melalui menu tarik-turun **"Pilih foto dari pustaka media…"** (lihat [Bagian 10](#10-mengelola-pustaka-media) untuk cara menambah foto ke pustaka media terlebih dahulu).
5. Setelah selesai, klik tombol **"Simpan"** yang terletak di bagian bawah/atas formulir.
6. Perubahan akan **langsung tampil** di situs publik begitu tombol Simpan berhasil ditekan.

![Gambar: Tab Hero & SEO pada menu Beranda & Footer](docs/images/manual/04-beranda-hero.png)

![Gambar: Tab Statistik pada menu Beranda & Footer](docs/images/manual/05-beranda-statistik.png)

> Tombol **"Kembalikan Konten Asli"** akan mengembalikan seluruh isi beranda ke konten bawaan. Gunakan dengan hati-hati karena tindakan ini akan meminta konfirmasi dan **tidak dapat dibatalkan**.

---

## 7. Mengelola Editor Konten Halaman

Menu **"Editor Konten"** digunakan untuk mengubah isi halaman-halaman prodi lainnya (Profil, Akademik, Kemahasiswaan, Riset & Inovasi, PMB, dan seterusnya) menggunakan sistem susun blok (*page builder*).

### Langkah Mengubah Isi Halaman

1. Klik menu **"Editor Konten"** pada sidebar.
2. Pilih halaman yang ingin diubah dari daftar yang tersedia.
3. Halaman tersusun dari beberapa **blok konten**. Jenis blok yang tersedia:
   - **Prose** — paragraf teks biasa
   - **List** — daftar poin
   - **Cards** — kartu-kartu ringkas (judul + deskripsi)
   - **Image** — gambar tunggal
   - **Video** — video tersemat
   - **CTA** — ajakan bertindak dengan tombol tautan
4. Klik tombol jenis blok (mis. **"+ Prose"**, **"+ List"**, **"+ Cards"**) untuk menambahkan blok baru di akhir halaman.
5. Isi/ubah konten pada tiap blok sesuai kebutuhan. Blok dapat dihapus atau diurutkan ulang melalui tombol yang tersedia pada masing-masing blok.
6. Klik **"Simpan"** setelah selesai mengedit.

![Gambar: Tampilan Editor Konten dengan beberapa jenis blok tersusun](docs/images/manual/06-editor-konten.png)

> Sama seperti menu Beranda & Footer, tombol **"Kembalikan Konten Asli"** pada halaman ini akan mengembalikan halaman ke isi bawaan dan **tidak dapat dibatalkan** — selalu pastikan terlebih dahulu sebelum menekan tombol ini.

---

## 8. Mengelola Berita & Agenda

Menu ini digunakan untuk menulis, menyunting, dan menerbitkan berita atau agenda prodi.

### Langkah Menambah Berita Baru

1. Klik menu **"Berita & Agenda"** pada sidebar.
2. Klik tombol **"Tulis Berita Baru"** (atau tombol serupa pada bagian atas halaman).
3. Isi kolom yang tersedia:
   - **Judul** — judul berita
   - **Kategori** dan **Tag** — pengelompokan berita
   - **Tanggal** — tanggal publikasi
   - **Ringkasan** — cuplikan singkat yang tampil pada daftar berita
   - **Isi** — isi lengkap berita
   - **Gambar sampul** — unggah gambar sesuai [panduan ukuran gambar](#2-panduan-ukuran--format-gambar)
4. Aktifkan sakelar **"Terbitkan"/"Published"** apabila berita siap ditampilkan ke publik. Jika dimatikan, berita akan tersimpan sebagai draf dan tidak tampil di situs publik.
5. Klik **"Simpan"**.

![Gambar: Formulir penulisan berita baru](docs/images/manual/07-berita-tulis.png)

### Langkah Menyunting atau Menghapus Berita

1. Pada daftar berita, klik berita yang ingin diubah untuk membuka kembali formulirnya.
2. Ubah kolom yang diperlukan, lalu klik **"Simpan"**.
3. Untuk menghapus, klik tombol/ikon hapus pada berita yang dimaksud, lalu konfirmasi penghapusan.

![Gambar: Daftar berita beserta tombol sunting dan hapus](docs/images/manual/08-berita-daftar.png)

---

## 9. Mengelola Galeri Kegiatan

Menu ini digunakan untuk mengunggah dan mengatur foto-foto kegiatan yang tampil pada halaman Galeri situs publik.

### Langkah Menambah Foto

1. Klik menu **"Galeri Kegiatan"** pada sidebar.
2. Klik tombol **"Tambah Foto"**.
3. Unggah foto dengan menyeret berkas ke kotak unggah atau mengklik kotak tersebut untuk memilih berkas — perhatikan rasio 4:3 sesuai [panduan ukuran gambar](#2-panduan-ukuran--format-gambar).
4. Isi **Judul**, **Deskripsi**, **Kategori**, dan **Tanggal** kegiatan.
5. Klik **"Simpan"**.

![Gambar: Formulir tambah foto galeri](docs/images/manual/09-galeri-tambah.png)

### Mengatur Urutan dan Menghapus Foto

- Gunakan tombol panah naik/turun pada tiap foto untuk mengatur urutan tampilnya di situs publik.
- Klik tombol hapus (ikon tempat sampah) pada foto yang ingin dihapus, lalu konfirmasi penghapusan.

![Gambar: Daftar foto galeri dengan tombol urutkan dan hapus](docs/images/manual/10-galeri-daftar.png)

---

## 10. Mengelola Pustaka Media

Pustaka Media adalah tempat penyimpanan foto/video terpusat yang dapat dipakai ulang di berbagai halaman (mis. foto hero beranda, gambar pada Editor Konten), tanpa perlu mengunggah ulang berkas yang sama berkali-kali.

### Langkah Menambah Media

1. Klik menu **"Pustaka Media"** pada sidebar.
2. Klik tombol **"Unggah Media"**.
3. Pilih berkas foto/video dari perangkat Anda, lalu isi **Judul** media agar mudah dicari kembali.
4. Klik **"Simpan"**.
5. Media yang telah diunggah akan muncul pada daftar pustaka dan dapat dipilih dari menu tarik-turun **"Pilih foto dari pustaka media…"** di berbagai formulir lain (Beranda & Footer, Editor Konten, dsb.).

![Gambar: Tampilan Pustaka Media beserta tombol unggah](docs/images/manual/11-pustaka-media.png)

---

## 11. Mengelola Dokumen Unduhan

Menu ini digunakan untuk mengunggah berkas yang dapat diunduh publik, seperti formulir, brosur, atau dokumen akreditasi.

### Langkah Menambah Dokumen

1. Klik menu **"Dokumen Unduhan"** pada sidebar.
2. Klik tombol **"Tambah Dokumen"**.
3. Unggah berkas berformat **PDF, Word, Excel, atau PowerPoint**.
4. Isi **Judul**, **Deskripsi**, dan **Kategori** dokumen.
5. Klik **"Simpan"**.

![Gambar: Formulir tambah dokumen unduhan](docs/images/manual/12-dokumen-tambah.png)

### Mengunduh, Menyunting, atau Menghapus Dokumen

- Klik ikon unduh untuk mengunduh salinan dokumen yang telah diunggah.
- Klik dokumen pada daftar untuk menyunting judul/deskripsi/kategori, atau mengganti berkasnya.
- Klik ikon hapus untuk menghapus dokumen, lalu konfirmasi penghapusan.

![Gambar: Daftar dokumen unduhan beserta tombol unduh, sunting, dan hapus](docs/images/manual/13-dokumen-daftar.png)

---

## 12. Mengelola Pesan Masuk

Seluruh pesan yang dikirim pengunjung melalui formulir kontak di situs publik akan masuk ke menu ini.

### Langkah Membaca dan Mengelola Pesan

1. Klik menu **"Pesan Masuk"** pada sidebar. Jumlah pesan yang belum dibaca ditandai lingkaran kecil berwarna pada menu sidebar.
2. Klik salah satu pesan untuk membuka isi lengkapnya (nama pengirim, email, telepon, subjek, dan isi pesan) — pesan otomatis ditandai telah dibaca.
3. Hapus pesan yang sudah tidak diperlukan melalui tombol hapus, lalu konfirmasi penghapusan.

![Gambar: Daftar pesan masuk dari formulir kontak](docs/images/manual/14-pesan-masuk.png)

---

## 13. Pengaturan Akun & Keluar

### 13.1 Mengubah Kata Sandi

1. Klik menu **"Akun Saya"** pada sidebar.
2. Masukkan kata sandi baru sesuai ketentuan yang diminta sistem (panjang minimal karakter, dsb.).
3. Klik **"Simpan"** untuk menerapkan kata sandi baru.
4. Gunakan kata sandi baru tersebut pada proses masuk (*login*) berikutnya.

![Gambar: Halaman pengaturan akun untuk mengubah kata sandi](docs/images/manual/15-akun-saya.png)

### 13.2 Keluar dari Dashboard

1. Klik tombol **"Keluar"** pada bagian bawah sidebar.
2. Anda akan otomatis diarahkan kembali ke halaman masuk (*login*).
3. Selalu keluar dari dashboard setelah selesai menggunakannya, terutama apabila menggunakan perangkat/komputer bersama.

---

## 14. Troubleshooting (Pemecahan Masalah)

| Masalah | Kemungkinan Penyebab | Solusi |
|---|---|---|
| Tidak bisa masuk (*login*) meski email & kata sandi benar | Salah ketik, huruf besar/kecil tertukar, atau *Caps Lock* aktif | Periksa kembali ejaan; pastikan *Caps Lock* tidak aktif; gunakan ikon mata untuk memastikan kata sandi terketik benar |
| Muncul label **"Tanpa hak admin"** setelah masuk | Akun belum diberi peran admin oleh pengelola sistem | Hubungi pengelola utama/pengembang untuk mengaktifkan peran admin pada akun Anda |
| Tombol Simpan tidak berfungsi/perubahan tidak tersimpan | Koneksi internet terputus, atau sesi masuk telah kedaluwarsa | Periksa koneksi internet; muat ulang (*refresh*) halaman lalu masuk kembali; ulangi perubahan |
| Foto/dokumen gagal diunggah | Format berkas tidak didukung atau ukuran berkas terlalu besar | Periksa format berkas sesuai [panduan ukuran gambar](#2-panduan-ukuran--format-gambar); kompres berkas terlebih dahulu |
| Gambar tampil buram/terpotong tidak rapi di situs publik | Ukuran/rasio gambar tidak sesuai anjuran | Unggah ulang gambar mengikuti rasio & ukuran pada [Bagian 2](#2-panduan-ukuran--format-gambar) |
| Perubahan sudah disimpan tetapi belum tampil di situs publik | Tampilan peramban masih menyimpan versi lama (*cache*) | Muat ulang halaman situs publik dengan menekan Ctrl+F5 (Windows) atau Cmd+Shift+R (Mac) |
| Lupa kata sandi dan tidak bisa masuk sama sekali | — | Hubungi pengelola sistem/pengembang untuk dibuatkan ulang kata sandi melalui panel pengelola basis data |

---

## 15. Penutup

Panduan ini akan terus diperbarui mengikuti perkembangan fitur dashboard. Apabila menemukan kendala yang tidak tercakup dalam panduan ini, silakan hubungi:

- **Kontak Dukungan Teknis:** [isi nama/kontak penanggung jawab teknis]
- **Email:** [isi alamat email dukungan]

---

*Dokumen ini adalah milik Program Studi Pendidikan Informatika, Universitas Ivet Semarang, dan disusun untuk keperluan internal pengelolaan situs.*
