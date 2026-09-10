import { supabase } from "@/integrations/supabase/client";

export type GaleriItem = {
  id: string;
  judul: string;
  deskripsi: string | null;
  image_url: string;
  storage_path: string | null;
  tanggal: string;
  kategori: string;
  urutan: number;
  url: string;
};

const BUCKET = "galeri-prodi";

export async function fetchGaleri(): Promise<GaleriItem[]> {
  const { data, error } = await supabase
    .from("galeri")
    .select("id, judul, deskripsi, image_url, storage_path, tanggal, kategori, urutan")
    .order("urutan", { ascending: true })
    .order("tanggal", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) throw error;
  const rows = data ?? [];

  const paths = rows.map((r) => r.storage_path).filter((p): p is string => !!p);
  const signed = new Map<string, string>();

  if (paths.length > 0) {
    const { data: urls } = await supabase.storage.from(BUCKET).createSignedUrls(paths, 60 * 60 * 6);
    urls?.forEach((u) => {
      if (u.path && u.signedUrl) signed.set(u.path, u.signedUrl);
    });
  }

  return rows.map((r) => ({
    ...r,
    url: (r.storage_path ? signed.get(r.storage_path) : undefined) ?? r.image_url,
  }));
}

export async function uploadGaleri(input: {
  file: File;
  judul: string;
  deskripsi?: string;
  tanggal: string;
  kategori?: string;
  urutan?: number;
  userId: string;
}) {
  const ext = input.file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, input.file, { cacheControl: "3600", upsert: false });
  if (uploadError) throw uploadError;

  const publicUrl = supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;

  const { error } = await supabase.from("galeri").insert({
    judul: input.judul,
    deskripsi: input.deskripsi || null,
    image_url: publicUrl,
    storage_path: path,
    tanggal: input.tanggal,
    kategori: input.kategori || "Umum",
    urutan: input.urutan ?? 0,
    created_by: input.userId,
  });

  if (error) {
    await supabase.storage.from(BUCKET).remove([path]);
    throw error;
  }
}

export async function deleteGaleri(item: { id: string; storage_path: string | null }) {
  const { error } = await supabase.from("galeri").delete().eq("id", item.id);
  if (error) throw error;
  if (item.storage_path) await supabase.storage.from(BUCKET).remove([item.storage_path]);
}
