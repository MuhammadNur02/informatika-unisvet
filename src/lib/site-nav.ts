export type NavChild = { label: string; to: string };
export type NavGroup = { label: string; to: string; children?: NavChild[] };

export const NAV: NavGroup[] = [
  { label: "Beranda", to: "/" },
  {
    label: "Profil",
    to: "/profil/tentang",
    children: [
      { label: "Tentang Prodi", to: "/profil/tentang" },
      { label: "Visi & Misi", to: "/profil/visi-misi" },
      { label: "Struktur Organisasi", to: "/profil/struktur-organisasi" },
      { label: "Dosen & Tendik", to: "/profil/dosen-tendik" },
      { label: "Fasilitas", to: "/profil/fasilitas" },
      { label: "Akreditasi", to: "/profil/akreditasi" },
    ],
  },
  {
    label: "Akademik",
    to: "/akademik/kurikulum",
    children: [
      { label: "Kurikulum", to: "/akademik/kurikulum" },
      { label: "Profil Lulusan", to: "/akademik/profil-lulusan" },
      { label: "CPL", to: "/akademik/cpl" },
      { label: "Mata Kuliah", to: "/akademik/mata-kuliah" },
      { label: "Praktikum & Proyek", to: "/akademik/praktikum-proyek" },
      { label: "Magang / MBKM", to: "/akademik/magang-mbkm" },
    ],
  },
  {
    label: "Kemahasiswaan",
    to: "/kemahasiswaan/organisasi",
    children: [
      { label: "Organisasi & Komunitas", to: "/kemahasiswaan/organisasi" },
      { label: "Prestasi", to: "/kemahasiswaan/prestasi" },
      { label: "Kegiatan", to: "/kemahasiswaan/kegiatan" },
      { label: "Beasiswa", to: "/kemahasiswaan/beasiswa" },
      { label: "Alumni", to: "/kemahasiswaan/alumni" },
    ],
  },
  {
    label: "Riset & Inovasi",
    to: "/riset/penelitian",
    children: [
      { label: "Penelitian", to: "/riset/penelitian" },
      { label: "Publikasi", to: "/riset/publikasi" },
      { label: "Pengabdian", to: "/riset/pengabdian" },
      { label: "HKI", to: "/riset/hki" },
      { label: "Inovasi", to: "/riset/inovasi" },
      { label: "Kerja Sama", to: "/riset/kerja-sama" },
    ],
  },
  {
    label: "Informasi",
    to: "/informasi/berita",
    children: [
      { label: "Berita", to: "/informasi/berita" },
      { label: "Event", to: "/informasi/event" },
      { label: "Pengumuman", to: "/informasi/pengumuman" },
      { label: "Agenda", to: "/informasi/agenda" },
      { label: "Galeri", to: "/informasi/galeri" },
      { label: "Unduh Dokumen", to: "/informasi/dokumen" },
    ],
  },
  {
    label: "PMB",
    to: "/pmb/mengapa-kami",
    children: [
      { label: "Mengapa Kami?", to: "/pmb/mengapa-kami" },
      { label: "Jalur Pendaftaran", to: "/pmb/jalur-pendaftaran" },
      { label: "Persyaratan", to: "/pmb/persyaratan" },
      { label: "Biaya", to: "/pmb/biaya" },
      { label: "Beasiswa", to: "/pmb/beasiswa" },
      { label: "FAQ", to: "/pmb/faq" },
      { label: "Daftar", to: "/pmb/daftar" },
    ],
  },
  { label: "Kontak", to: "/kontak" },
];

/** Kelompokkan halaman yang bisa diedit sesuai kategori menu situs publik, untuk dropdown di Editor Konten. */
export function pageGroups(availablePaths: string[]): { label: string; items: NavChild[] }[] {
  const available = new Set(availablePaths);
  const groups: { label: string; items: NavChild[] }[] = [];
  const loose: NavChild[] = [];

  for (const g of NAV) {
    if (g.children && g.children.length) {
      const items = g.children.filter((c) => available.has(c.to));
      if (items.length) groups.push({ label: g.label, items });
    } else if (available.has(g.to)) {
      loose.push({ label: g.label, to: g.to });
    }
  }
  if (loose.length) groups.push({ label: "Lainnya", items: loose });

  const known = new Set(groups.flatMap((g) => g.items.map((i) => i.to)));
  const unmatched = availablePaths.filter((p) => !known.has(p));
  if (unmatched.length) groups.push({ label: "Lainnya", items: unmatched.map((to) => ({ label: to, to })) });

  return groups;
}

export const PORTAL_LINKS = [
  { label: "SIAKAD", href: "https://siakad.ivet.ac.id" },
  { label: "E-Learning", href: "https://elearning.ivet.ac.id" },
  { label: "E-Library", href: "https://library.ivet.ac.id" },
  { label: "SPMI Mutu", href: "https://spmi.ivet.ac.id" },
];