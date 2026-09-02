import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import bannerAsset from "@/assets/banner-kampus.jpg.asset.json";

/* ------------------------------- Tipe konten ------------------------------- */

export type HomeContent = {
  seo: { title: string; description: string; ogTitle: string; ogDescription: string; ogImage: string };
  hero: {
    badge: string;
    titleLead: string;
    titleAccent: string;
    titleTail: string;
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
      "S1 Pendidikan Informatika UNISVET Semarang: mencetak pendidik IT profesional & inovator teknologi dengan kurikulum software development, cyber security, dan digital EdTech.",
    ogTitle: "Pendidikan Informatika — Universitas Ivet (UNISVET) Semarang",
    ogDescription:
      "Kuliah S1 Pendidikan Informatika di Semarang: kurikulum industri & EdTech, laboratorium modern, kelas reguler dan karyawan.",
    ogImage: "",
  },
  hero: {
    badge: "S1 Pendidikan Informatika — UNISVET",
    titleLead: "Mencetak Pendidik IT Profesional &",
    titleAccent: "Inovator Teknologi",
    titleTail: "Masa Depan",
    subtitle:
      "Mengintegrasikan keahlian pedagogi kependidikan dengan skill software development, cyber security & digital EdTech di Universitas Ivet Semarang.",
    primaryLabel: "Daftar PMB Sekarang",
    secondaryLabel: "Lihat Kurikulum",
    badges: ["Akreditasi LAMDIK Baik", "Kuliah Reguler & Blended Learning", "4 Laboratorium Modern"],
    image: bannerAsset.url,
    floating: ["Akreditasi Baik", "Kurikulum Berbasis Industri & EdTech", "Kelas Reguler & Karyawan"],
  },
  stats: [
    { value: "500+", label: "Mahasiswa Aktif" },
    { value: "1000+", label: "Alumni Berkarier" },
    { value: "Baik", label: "Akreditasi LAMDIK" },
    { value: "4", label: "Laboratorium Modern" },
  ],
  advantages: {
    eyebrow: "Keunggulan Prodi",
    title: "Mengapa Memilih Kami",
    description:
      "Empat pilar yang membuat Pendidikan Informatika Universitas Ivet Semarang relevan dengan kebutuhan dunia pendidikan dan industri teknologi.",
    items: [
      {
        title: "Dual Capability",
        desc: "Lulusan siap menjadi pendidik IT profesional sekaligus software & web developer yang kompeten.",
      },
      {
        title: "Flexi-Learning",
        desc: "Kelas reguler dan kelas karyawan dengan skema blended learning yang fleksibel bagi mahasiswa pekerja.",
      },
      {
        title: "Smart Lab & Microteaching Studio",
        desc: "Laboratorium komputer lanjut, IoT, multimedia, dan studio microteaching untuk latihan mengajar terekam.",
      },
      {
        title: "Kemitraan Industri & Sekolah Mitra",
        desc: "Kolaborasi luas dengan DUDI, startup teknologi, dan sekolah mitra untuk magang serta PLP.",
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
  news: {
    eyebrow: "Informasi Terkini",
    title: "Berita, Pengumuman & Agenda",
    description:
      "Ikuti perkembangan terbaru dari Program Studi Pendidikan Informatika Universitas Ivet Semarang.",
  },
  alumni: {
    eyebrow: "Alumni",
    title: "Cerita Sukses Lulusan",
    description:
      "Alumni kami berkarya sebagai pendidik, spesialis TI, software engineer, hingga wirausahawan EdTech.",
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
    title: "Mulai Langkahmu Menjadi Pendidik & Inovator Teknologi",
    desc: "Bergabunglah dengan Program Studi Pendidikan Informatika Universitas Ivet Semarang. Kuota terbatas, tersedia beasiswa prestasi dan keringanan biaya studi.",
    primaryLabel: "Daftar di Portal PMB",
    primaryHref: "https://pmb.unisvet.ac.id/",
    secondaryLabel: "Konsultasi Admisi",
    secondaryHref: "https://wa.me/6282138562161",
  },
};

export const DEFAULT_FOOTER: FooterContent = {
  about:
    "Program studi yang memadukan kompetensi kependidikan dan teknologi informasi untuk mencetak pendidik serta profesional TI masa depan.",
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
