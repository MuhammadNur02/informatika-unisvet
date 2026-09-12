import { supabase } from "@/integrations/supabase/client";

export type PesanKontak = {
  id: string;
  nama: string;
  email: string;
  telepon: string;
  subjek: string;
  pesan: string;
  dibaca: boolean;
  created_at: string;
};

const SELECT = "id, nama, email, telepon, subjek, pesan, dibaca, created_at";

export async function kirimPesan(input: {
  nama: string;
  email: string;
  telepon: string;
  subjek: string;
  pesan: string;
}) {
  const { error } = await supabase.from("pesan_kontak").insert({
    nama: input.nama.trim(),
    email: input.email.trim(),
    telepon: input.telepon.trim(),
    subjek: input.subjek.trim(),
    pesan: input.pesan.trim(),
    dibaca: false,
  });
  if (error) throw error;
}

export async function fetchPesan(): Promise<PesanKontak[]> {
  const { data, error } = await supabase.from("pesan_kontak").select(SELECT).order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function tandaiPesan(id: string, dibaca: boolean) {
  const { error } = await supabase.from("pesan_kontak").update({ dibaca }).eq("id", id);
  if (error) throw error;
}

export async function hapusPesan(id: string) {
  const { error } = await supabase.from("pesan_kontak").delete().eq("id", id);
  if (error) throw error;
}
