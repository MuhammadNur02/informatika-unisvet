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

export const KATEGORI_DOKUMEN = [
  "Kurikulum",
  "Panduan",
  "Formulir",
  "Akreditasi",
  "Umum",
] as const;

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

export async function updateDokumen(
  id: string,
  input: {
    judul?: string;
    deskripsi?: string;
    kategori?: string;
    urutan?: number;
    file?: File;
    oldStoragePath?: string | null;
  }
) {
  let updatePayload: Record<string, any> = {
    ...(input.judul && { judul: input.judul }),
    ...(input.deskripsi !== undefined && { deskripsi: input.deskripsi }),
    ...(input.kategori && { kategori: input.kategori }),
    ...(input.urutan !== undefined && { urutan: input.urutan }),
  };

  if (input.file) {
    const ext = input.file.name.split(".").pop()?.toLowerCaseKode TypeScript yang disajikan sudah mengimplementasikan *CRUD* (Create, Read, Update, Delete) data dokumen dengan integrasi **Supabase Database** dan **Supabase Storage**.

---

### **Analisis Kode & Catatan Utama**

* **Mekanisme Storage Dual-URL:** Kode mendukung file lokal via Storage Path (`createSignedUrls` berdurasi 6 jam) dan URL eksternal langsung (`file_url`). Jika signed URL gagal/tidak ada, sistem otomatis memilih `file_url`.
* **Prosedur *Rollback* saat Upload:** Jika `insert` ke tabel database `dokumen` gagal setelah file terunggah, file yang berada di Supabase Storage otomatis dihapus kembali melalui `remove([path])` untuk mencegah *orphan files*.
* **Penataan Urutan (*Ordering*):** Pengambilan data (`fetchDokumen`) diurutkan berdasarkan `urutan` (secara *ascending*), disusul `created_at` (secara *descending*).

---

### **Rekomendasi Peningkatan Kode**

1. **Efisiensi Batch Signed URLs:**  
   Metode `createSignedUrls` menerima daftar `paths`. Namun, pastikan jumlah *array* tidak terlalu besar (misalnya di atas 100 file) agar tidak memicu pembatasan *payload* request dari Supabase Storage. Jika jumlah file banyak, terapkan paginasi pada query `dokumen`.
2. **Validasi Input Tipe Kategori:**  
   Parameter `kategori` pada fungsi `uploadDokumen` dapat diperketat tipe datanya agar sesuai dengan konstanta `KATEGORI_DOKUMEN`:
   ```typescript
   export type KategoriDokumen = typeof KATEGORI_DOKUMEN[number];

   export async function uploadDokumen(input: {
     file: File;
     judul: string;
     deskripsi: string;
     kategori: KategoriDokumen;
     urutan: number;
     userId: string;
   }) { ... }