import { supabase } from "@/integrations/supabase/client";
import type { Block, PageContent } from "@/content/types";
import { PAGES } from "@/content";

const BUCKET = "galeri-prodi";
const YEAR = 60 * 60 * 24 * 365;

export type PageRow = {
  path: string;
  eyebrow: string;
  title: string;
  description: string;
  meta_title: string;
  blocks: Block[];
};

export type MediaItem = {
  id: string;
  judul: string;
  kind: string;
  url: string;
  storage_path: string | null;
  created_at: string;
};

/** Semua path halaman yang bisa diedit (dari konten statis). */
export function editablePaths(): string[] {
  return Object.keys(PAGES).sort();
}

export function staticPage(path: string): PageContent | undefined {
  return PAGES[path];
}

/** Ambil override konten dari database untuk satu halaman. */
export async function fetchPageOverride(path: string): Promise<PageContent | null> {
  const { data, error } = await supabase
    .from("page_content")
    .select("eyebrow, title, description, meta_title, blocks")
    .eq("path", path)
    .maybeSingle();

  if (error || !data) return null;

  const fallback = PAGES[path];
  return {
    eyebrow: data.eyebrow || fallback?.eyebrow || "",
    title: data.title || fallback?.title || "",
    description: data.description || fallback?.description || "",
    metaTitle: data.meta_title || fallback?.metaTitle || "",
    blocks: Array.isArray(data.blocks) ? (data.blocks as unknown as Block[]) : (fallback?.blocks ?? []),
  };
}

/** Daftar halaman yang sudah pernah diedit. */
export async function fetchEditedPaths(): Promise<string[]> {
  const { data, error } = await supabase.from("page_content").select("path");
  if (error) return [];
  return (data ?? []).map((r) => r.path);
}

export async function savePageContent(input: {
  path: string;
  content: PageContent;
  userId: string;
}) {
  const { error } = await supabase.from("page_content").upsert(
    {
      path: input.path,
      eyebrow: input.content.eyebrow,
      title: input.content.title,
      description: input.content.description,
      meta_title: input.content.metaTitle,
      blocks: input.content.blocks as never,
      updated_by: input.userId,
    },
    { onConflict: "path" },
  );
  if (error) throw error;
}

export async function resetPageContent(path: string) {
  const { error } = await supabase.from("page_content").delete().eq("path", path);
  if (error) throw error;
}

/* ------------------------------- Pustaka media ------------------------------ */

export async function fetchMedia(): Promise<MediaItem[]> {
  const { data, error } = await supabase
    .from("media")
    .select("id, judul, kind, url, storage_path, created_at")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function uploadMedia(input: { file: File; judul: string; userId: string }) {
  const isVideo = input.file.type.startsWith("video/");
  const ext = input.file.name.split(".").pop()?.toLowerCase() ?? (isVideo ? "mp4" : "jpg");
  const path = `media/${crypto.randomUUID()}.${ext}`;

  const { error: upErr } = await supabase.storage
    .from(BUCKET)
    .upload(path, input.file, { cacheControl: "3600", upsert: false });
  if (upErr) throw upErr;

  const { data: signed } = await supabase.storage.from(BUCKET).createSignedUrl(path, YEAR);
  const url = signed?.signedUrl ?? supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;

  const { error } = await supabase.from("media").insert({
    judul: input.judul || input.file.name,
    kind: isVideo ? "video" : "image",
    url,
    storage_path: path,
    created_by: input.userId,
  });

  if (error) {
    await supabase.storage.from(BUCKET).remove([path]);
    throw error;
  }

  return url;
}

export async function deleteMedia(item: { id: string; storage_path: string | null }) {
  const { error } = await supabase.from("media").delete().eq("id", item.id);
  if (error) throw error;
  if (item.storage_path) await supabase.storage.from(BUCKET).remove([item.storage_path]);
}
