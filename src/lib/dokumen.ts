import { supabase } from "@/integrations/supabase/client";

export type DokumenItem = {
  id: string;
  judul: string;
  deskripsi: string;
  kategori: string;
  file_url: string;
  storage_path: string | null;
  ukuran: number;
  urutan: number;
  created_at: string;
  url: string;
};

export const KATEGORI_DOKUMEN = ["Kurikulum", "Panduan", "Formulir", "Akreditasi", "Umum"] as const;

export type KategoriDokumen = (typeof KATEGORI_DOKUMEN)[number];

const BUCKET = "dokumen-prodi";
const SELECT = "id, judul, deskripsi, kategori, file_url, storage_path, ukuran, urutan, created_at";

export function formatUkuran(bytes: number) {
  if (!bytes) return "—";
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export async function fetchDokumen(): Promise<DokumenItem[]> {
  const { data, error } = await supabase
    .from("dokumen")
    .select(SELECT)
    .order("urutan", { ascending: true })
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
    url: (r.storage_path ? signed.get(r.storage_path) : undefined) ?? r.file_url,
  }));
}

export async function uploadDokumen(input: {
  file: File;
  judul: string;
  deskripsi: string;
  kategori: string;
  urutan: number;
  userId: string;
}) {
  const ext = input.file.name.split(".").pop()?.toLowerCase() ?? "pdf";
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, input.file, { cacheControl: "3600", upsert: false });
  if (uploadError) throw uploadError;

  const publicUrl = supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;

  const { error } = await supabase.from("dokumen").insert({
    judul: input.judul,
    deskripsi: input.deskripsi,
    kategori: input.kategori,
    file_url: publicUrl,
    storage_path: path,
    ukuran: input.file.size,
    urutan: input.urutan,
    created_by: input.userId,
  });

  if (error) {
    await supabase.storage.from(BUCKET).remove([path]);
    throw error;
  }
}

export async function updateDokumen(input: {
  id: string;
  judul: string;
  deskripsi: string;
  kategori: string;
  urutan: number;
  file?: File;
  oldStoragePath?: string | null;
}) {
  let newStoragePath = input.oldStoragePath;
  let newFileUrl: string | undefined;

  if (input.file) {
    const ext = input.file.name.split(".").pop()?.toLowerCase() ?? "pdf";
    const path = `${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(path, input.file, { cacheControl: "3600", upsert: false });

    if (uploadError) throw uploadError;

    newStoragePath = path;
    newFileUrl = supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
  }

  const { error: updateError } = await supabase
    .from("dokumen")
    .update({
      judul: input.judul,
      deskripsi: input.deskripsi,
      kategori: input.kategori,
      urutan: input.urutan,
      ...(newFileUrl && { file_url: newFileUrl }),
      ...(newStoragePath !== undefined && { storage_path: newStoragePath }),
      ...(input.file && { ukuran: input.file.size }),
    })
    .eq("id", input.id);

  if (updateError) {
    if (input.file && newStoragePath) {
      await supabase.storage.from(BUCKET).remove([newStoragePath]);
    }
    throw updateError;
  }

  if (input.file && input.oldStoragePath) {
    await supabase.storage.from(BUCKET).remove([input.oldStoragePath]);
  }
}

export async function updateDokumenUrutan(id: string, urutan: number) {
  const { error } = await supabase.from("dokumen").update({ urutan }).eq("id", id);
  if (error) throw error;
}

export async function deleteDokumen(item: { id: string; storage_path: string | null }) {
  const { error } = await supabase.from("dokumen").delete().eq("id", item.id);
  if (error) throw error;
  if (item.storage_path) await supabase.storage.from(BUCKET).remove([item.storage_path]);
}
