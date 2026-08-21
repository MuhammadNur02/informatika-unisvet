# Lanjutkan: Perbaikan Tautan Beranda

## Tujuan
Menyelesaikan pekerjaan sisa dari iterasi sebelumnya: mengarahkan tombol/tautan di beranda dari anchor lama (`#pmb`, `#kurikulum`, `#berita`) ke halaman rute baru yang sudah dibuat, menggunakan `<Link>` TanStack Router agar navigasi client-side tetap aktif.

## Langkah Pengerjaan

1. **Perbarui `src/components/site/Hero.tsx`**
   - Tambahkan import `Link` dari `@tanstack/react-router`.
   - Ganti `<a href="#pmb">` menjadi `<Link to="/pmb/daftar">`.
   - Ganti `<a href="#kurikulum">` menjadi `<Link to="/akademik/kurikulum">`.
   - Pertahankan styling dan ikon yang ada.

2. **Perbarui `src/components/site/News.tsx`**
   - Tambahkan import `Link` dari `@tanstack/react-router`.
   - Ganti `<a href="#berita">` pada tautan "Baca Selengkapnya" menjadi `<Link to="/informasi/berita">`.
   - Pertahankan className dan ikon panah.

3. **Verifikasi**
   - Jalankan typecheck untuk memastikan tidak ada error impor atau tipe.
   - Verifikasi rute `/`, `/pmb/daftar`, `/akademik/kurikulum`, dan `/informasi/berita` merespons dengan benar.

## Hasil Akhir
Seluruh tombol CTA dan tautan "Baca Selengkapnya" di beranda mengarah ke halaman rute yang sesuai, bukan lagi ke anchor yang tidak lagi relevan.
