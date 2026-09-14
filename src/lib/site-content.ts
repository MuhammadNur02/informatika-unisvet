import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/* ------------------------------- Tipe konten ------------------------------- */

export type HomeContent = {
  seo: { title: string; description: string; ogTitle: string; ogDescription: string; ogImage: string };
  hero: {
    badge: string;
    /** Satu kata tetap di awal judul, sebelum bagian yang berganti-ganti. */
    titleFixed: string;
    /** Judul-judul yang bergantian tampil dengan animasi ketik & hapus (biasanya 3). */
    titleRotating: string[];
    subtitle: string;
    primaryLabel: string;
    secondaryLabel: string;
    badges: string[];
    image: string;
    floating: string[];
  };
  stats: { value: string; label: string }[];
  advantages: { eyebrow: string; title: string; description: string; items: { title: string; desc: string }[] };
  visi: { title: string; text: string };
  misi: { title: string; items: string[] };
  tracks: {
    eyebrow: string;
    title: string;
    description: string;
    items: {
      id: string;
      label: string;
      headline: string;
      desc: string;
      points: string[];
      careers: string[];
    }[];
  };
  news: { eyebrow: string; title: string; description: string };
  alumni: {
    eyebrow: string;
    title: string;
    description: string;
    items: { name: string; year: string; role: string; quote: string }[];
  };
  cta: {
    badge: string;
    title: string;
    desc: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
};

export type FooterContent = {
  about: string;
  address: string;
  phone: string;
  waAdmin: string;
  waKaprodi: string;
  email: string;
  socials: { instagram: string; youtube: string; facebook: string; tiktok: string };
  portals: { label: string; href: string }[];
  mapQuery: string;
  note: string;
};

/* -------------------------------- Bawaan ---------------------------------- */

export const DEFAULT_HOME: HomeContent = {
  seo: {
    title: "Pendidikan Informatika — Universitas Ivet (UNISVET) Semarang",
    description:
      "S1 Pendidikan Informatika UNISVET Semarang, terakreditasi Baik Sekali (LAMDIK): menyiapkan guru Informatika dan tenaga profesional bidang rekayasa perangkat lunak, jaringan, serta EdTech.",
    ogTitle: "Pendidikan Informatika — Universitas Ivet (UNISVET) Semarang",
    ogDescription:
      "Kuliah S1 Pendidikan Informatika di Semarang: kurikulum industri & EdTech, laboratorium modern, kelas reguler dan karyawan.",
    ogImage: "",
  },
  hero: {
    badge: "S1 Pendidikan Informatika — UNISVET",
    titleFixed: "Mencetak",
    titleRotating: [
      "Pendidik IT Profesional & Inovator Teknologi Masa Depan",
      "Talenta Digital Siap Kerja di Industri & Dunia Pendidikan",
      "Generasi Guru Informatika yang Kreatif & Adaptif",
    ],
    subtitle:
      "Program studi yang memadukan ilmu kependidikan dengan keahlian informatika — pemrograman, jaringan, multimedia, hingga kecerdasan artifisial — di Universitas Ivet Semarang.",
    primaryLabel: "Daftar PMB Sekarang",
    secondaryLabel: "Lihat Kurikulum",
    badges: ["Akreditasi LAMDIK Baik Sekali", "Kelas Reguler & Karyawan", "4 Laboratorium Praktik"],
    image: "/banner-kampus.jpg",
    floating: ["Akreditasi Baik Sekali", "Kurikulum Berbasis Proyek", "Kelas Reguler & Karyawan"],
  },
  stats: [
    { value: "500+", label: "Mahasiswa Aktif" },
    { value: "1000+", label: "Alumni Berkarier" },
    { value: "Baik Sekali", label: "Akreditasi LAMDIK" },
    { value: "4", label: "Laboratorium Praktik" },
  ],
  advantages: {
    eyebrow: "Keunggulan Prodi",
    title: "Mengapa Memilih Kami",
    description:
      "Empat hal yang membuat Pendidikan Informatika UNISVET jadi pilihan tepat bagi calon guru informatika sekaligus praktisi teknologi.",
    items: [
      {
        title: "Dua Bekal Sekaligus",
        desc: "Lulusan disiapkan menjadi guru Informatika bersertifikat sekaligus pengembang web/software yang kompeten — bukan salah satu saja.",
      },
      {
        title: "Kelas Ramah Pekerja",
        desc: "Ada kelas reguler dan kelas karyawan dengan perkuliahan blended, jadi tetap bisa kuliah sambil bekerja.",
      },
      {
        title: "Laboratorium & Studio Microteaching",
        desc: "Praktik langsung di lab komputer, lab IoT, dan studio microteaching berkamera untuk latihan mengajar.",
      },
      {
        title: "Sekolah Mitra & Mitra Industri",
        desc: "Jaringan sekolah mitra untuk PLP dan mitra dunia usaha/industri untuk magang mahasiswa.",
      },
    ],
  },
  visi: {
    title: "Visi",
    text: "Menjadi program studi unggul penghasil pendidik informatika yang profesional, berkarakter, dan adaptif terhadap perkembangan teknologi informasi di tingkat nasional pada tahun 2030.",
  },
  misi: {
    title: "Misi",
    items: [
      "Menyelenggarakan pembelajaran berbasis proyek dan teknologi digital.",
      "Mengembangkan penelitian bidang pendidikan informatika & EdTech.",
      "Melaksanakan pengabdian masyarakat berbasis literasi digital.",
      "Memperluas kemitraan dengan sekolah, industri, dan komunitas teknologi.",
    ],
  },
  tracks: {
    eyebrow: "Kurikulum & Profil Lulusan",
    title: "Tiga Jalur Karier Lulusan",
    description: "Kurikulum OBE dengan capaian pembelajaran lulusan (CPL) yang membuka tiga jalur profesi utama.",
    items: [
      {
        id: "pendidik",
        label: "Tenaga Pendidik & Duta Digital",
        headline: "Track 1 — Guru Informatika & Duta Digital Sekolah",
        desc: "Menguasai pedagogi informatika, perancangan pembelajaran berbasis proyek, serta kepemimpinan transformasi digital di sekolah.",
        points: [
          "Pedagogi & Kurikulum Informatika (CPL Kependidikan)",
          "Microteaching & Praktik Lapangan Persekolahan (PLP)",
          "Asesmen Digital & Manajemen Kelas Berbasis LMS",
          "Literasi Data, AI, dan Etika Digital untuk Sekolah",
        ],
        careers: ["Guru Informatika SMP/SMA/SMK", "Instruktur TIK", "Koordinator Digitalisasi Sekolah"],
      },
      {
        id: "developer",
        label: "Software & Web Developer",
        headline: "Track 2 — Software Engineer & Web/Mobile Developer",
        desc: "Fokus rekayasa perangkat lunak modern: dari algoritma dan basis data hingga pengembangan aplikasi web serta mobile siap industri.",
        points: [
          "Algoritma, Struktur Data & Basis Data",
          "Rekayasa Perangkat Lunak, Git & DevOps Dasar",
          "Pemrograman Web (React & TypeScript) dan Mobile",
          "Keamanan Siber & Jaringan Komputer Terapan",
        ],
        careers: ["Frontend/Backend Developer", "Mobile Developer", "QA & Teknisi Dukungan Informatika"],
      },
      {
        id: "edtech",
        label: "EdTech Content & Design",
        headline: "Track 3 — EdTech Content Creator & Instructional Designer",
        desc: "Merancang media dan pengalaman belajar digital: modul interaktif, video pembelajaran, gamifikasi, hingga produk EdTech.",
        points: [
          "Desain Instruksional & Model ADDIE",
          "Produksi Video, Animasi & Multimedia Pembelajaran",
          "Gamifikasi dan Pengembangan Media Interaktif",
          "Kewirausahaan Digital & Manajemen Produk EdTech",
        ],
        careers: ["Instructional Designer", "EdTech Content Creator", "Digital Learning Specialist"],
      },
    ],
  },
  news: {
    eyebrow: "Informasi Terkini",
    title: "Berita, Pengumuman & Agenda",
    description:
      "Kabar terbaru dari Program Studi Pendidikan Informatika Universitas Ivet Semarang.",
  },
  alumni: {
    eyebrow: "Alumni",
    title: "Cerita Alumni",
    description:
      "Sebagian cerita alumni Pendidikan Informatika UNISVET yang kini berkarya sebagai guru, software engineer, hingga perintis usaha EdTech.",
    items: [
      {
        name: "Dewi Larasati",
        year: "Alumni 2021",
        role: "Guru Informatika, SMKN 7 Semarang",
        quote:
          "Bekal pedagogik dan kemampuan koding membuat saya percaya diri mengajar kurikulum informatika terbaru.",
      },
      {
        name: "Yoga Pratama",
        year: "Alumni 2020",
        role: "Software Engineer, Startup Fintech Jakarta",
        quote:
          "Proyek kelas dan lab pemrograman melatih saya berpikir sistematis — transisi ke industri terasa mulus.",
      },
      {
        name: "Anisa Rahma",
        year: "Alumni 2022",
        role: "Founder, EdTech Belajar Pintar",
        quote:
          "Prodi ini mengajarkan cara menggabungkan teknologi dan pendidikan, fondasi yang saya pakai membangun startup.",
      },
    ],
  },
  cta: {
    badge: "Penerimaan Mahasiswa Baru 2026/2027",
    title: "Siap Kuliah di Pendidikan Informatika UNISVET?",
    desc: "Bergabunglah dengan Program Studi Pendidikan Informatika Universitas Ivet Semarang. Kuota terbatas tiap gelombang, tersedia beasiswa prestasi dan keringanan biaya studi.",
    primaryLabel: "Daftar di Portal PMB",
    primaryHref: "https://pmb.unisvet.ac.id/",
    secondaryLabel: "Konsultasi Admisi",
    secondaryHref: "https://wa.me/6282138562161",
  },
};

export const DEFAULT_FOOTER: FooterContent = {
  about:
    "Program Studi Pendidikan Informatika Universitas Ivet Semarang — memadukan ilmu kependidikan dengan keahlian informatika untuk menyiapkan guru dan praktisi teknologi.",
  address:
    "Universitas Ivet, Jl. Pawiyatan Luhur IV No.18, Bendan Duwur, Kec. Gajahmungkur, Kota Semarang, Jawa Tengah 50235",
  phone: "(024) 8316375",
  waAdmin: "6282138562161",
  waKaprodi: "6285226154744",
  email: "pendidikaninformatika@ivet.ac.id",
  socials: {
    instagram: "https://www.instagram.com/informatikaunisvet/",
    youtube: "https://youtube.com/@informatika_unisvet?si=_wI6qWN7IdWkW4-z",
    facebook: "https://home.s.id/lo/id#",
    tiktok: "https://www.tiktok.com/@informatika.unisvet?_r=1&_t=ZS-99J4eAdzfLJ",
  },
  portals: [
    { label: "SIAKAD", href: "https://siakad.ivet.ac.id" },
    { label: "E-Learning LMS", href: "https://elearning.ivet.ac.id" },
    { label: "E-Library", href: "https://library.ivet.ac.id" },
    { label: "SPMI Mutu", href: "https://spmi.ivet.ac.id" },
    { label: "Portal PMB UNISVET", href: "https://pmb.unisvet.ac.id/" },
  ],
  mapQuery: "Universitas Ivet Semarang Jl. Pawiyatan Luhur IV No.18 Semarang",
  note: "Dikembangkan dengan semangat pendidikan digital.",
};

/* ------------------------------ Akses database ----------------------------- */

function merge<T>(base: T, patch: unknown): T {
  if (!patch || typeof patch !== "object" || Array.isArray(patch)) return base;
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [key, value] of Object.entries(patch as Record<string, unknown>)) {
    const current = out[key];
    if (
      current &&
      typeof current === "object" &&
      !Array.isArray(current) &&
      value &&
      typeof value === "object" &&
      !Array.isArray(value)
    ) {
      out[key] = merge(current, value);
    } else if (value !== undefined && value !== null) {
      out[key] = value;
    }
  }
  return out as T;
}

async function fetchSetting(key: string): Promise<unknown> {
  const { data, error } = await supabase.from("site_settings").select("value").eq("key", key).maybeSingle();
  if (error || !data) return null;
  return data.value;
}

export async function fetchHomeContent(): Promise<HomeContent> {
  return merge(DEFAULT_HOME, await fetchSetting("home"));
}

export async function fetchFooterContent(): Promise<FooterContent> {
  return merge(DEFAULT_FOOTER, await fetchSetting("footer"));
}

export async function saveSetting(key: string, value: unknown, userId: string) {
  const { error } = await supabase
    .from("site_settings")
    .upsert({ key, value: value as never, updated_by: userId }, { onConflict: "key" });
  if (error) throw error;
}

export async function resetSetting(key: string) {
  const { error } = await supabase.from("site_settings").delete().eq("key", key);
  if (error) throw error;
}

/* --------------------------------- Hooks ---------------------------------- */

export function useHomeContent() {
  const query = useQuery({ queryKey: ["site-settings", "home"], queryFn: fetchHomeContent, staleTime: 60_000 });
  return query.data ?? DEFAULT_HOME;
}

export function useFooterContent() {
  const query = useQuery({ queryKey: ["site-settings", "footer"], queryFn: fetchFooterContent, staleTime: 60_000 });
  return query.data ?? DEFAULT_FOOTER;
}
