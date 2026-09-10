import { supabase } from "@/integrations/supabase/client";

export type BeritaItem = {
  id: string;
  judul: string;
  slug: string;
  kategori: string;
  tag: string;
  tanggal: string;
  ringkasan: string;
  isi: string;
  gambar_url: string;
  published: boolean;
  views: number;
};

export type BeritaInput = Omit<BeritaItem, "id" | "slug" | "views"> & { id?: string; slug?: string };

export const KATEGORI_BERITA = ["Berita", "Kegiatan", "Pengumuman", "Event", "Agenda"] as const;

const SELECT = "id, judul, slug, kategori, tag, tanggal, ringkasan, isi, gambar_url, published, views";

export function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, 70) || "berita"
  );
}

/** Berita yang tampil di publik (hanya yang diterbitkan). */
export async function fetchBeritaPublik(): Promise<BeritaItem[]> {
  const { data, error } = await supabase
    .from("berita")
    .select(SELECT)
    .eq("published", true)
    .order("tanggal", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

/** Satu berita berdasarkan slug (hanya yang diterbitkan) + auto increment views. */
export async function fetchBeritaBySlug(slug: string): Promise<BeritaItem | null> {
  const { data, error } = await supabase
    .from("berita")
    .select(SELECT)
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) throw error;

  if (data) {
    // Tambah jumlah baca (views) secara asynchronous
    await supabase
      .from("berita")
      .update({ views: (data.views || 0) + 1 })
      .eq("id", data.id);
  }

  return data ?? null;
}

/** Semua berita termasuk draf — untuk dashboard admin. */
export async function fetchBeritaAdmin(): Promise<BeritaItem[]> {
  const { data, error } = await supabase.from("berita").select(SELECT).order("tanggal", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function saveBerita(input: BeritaInput & { userId: string }) {
  const slug = input.slug?.trim() || `${slugify(input.judul)}-${Date.now().toString(36).slice(-4)}`;
  const row = {
    judul: input.judul,
    slug,
    kategori: input.kategori,
    tag: input.tag,
    tanggal: input.tanggal,
    ringkasan: input.ringkasan,
    isi: input.isi,
    gambar_url: input.gambar_url,
    published: input.published,
  };

  if (input.id) {
    const { error } = await supabase.from("berita").update(row).eq("id", input.id);
    if (error) throw error;
    return input.id;
  }

  const { data, error } = await supabase
    .from("berita")
    .insert({ ...row, created_by: input.userId })
    .select("id")
    .single();
  if (error) throw error;
  return data.id;
}

export async function deleteBerita(id: string) {
  const { error } = await supabase.from("berita").delete().eq("id", id);
  if (error) throw error;
}

export function formatTanggalId(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}
