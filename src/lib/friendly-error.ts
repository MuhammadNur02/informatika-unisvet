/** Terjemahkan pesan error teknis (Supabase/Postgres) menjadi bahasa yang mudah dipahami pengelola. */
export function friendlyError(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err ?? "");
  const lower = raw.toLowerCase();

  if (lower.includes("row-level security") || lower.includes("permission denied")) {
    return "Akun Anda belum memiliki hak admin untuk menyimpan perubahan ini. Hubungi pengelola utama untuk mengaktifkan peran admin.";
  }
  if (lower.includes("jwt") || lower.includes("session") || lower.includes("not authenticated")) {
    return "Sesi login Anda sudah berakhir. Silakan keluar lalu masuk kembali, kemudian coba lagi.";
  }
  if (lower.includes("failed to fetch") || lower.includes("networkerror") || lower.includes("network request failed")) {
    return "Tidak dapat terhubung ke server. Periksa koneksi internet Anda lalu coba lagi.";
  }
  if (lower.includes("duplicate key") || lower.includes("already exists") || lower.includes("unique constraint")) {
    return "Data dengan judul/nama yang sama sudah ada. Gunakan judul yang berbeda.";
  }
  if (lower.includes("payload too large") || lower.includes("exceeded the maximum") || lower.includes("file size")) {
    return "Ukuran berkas terlalu besar. Gunakan berkas yang lebih kecil.";
  }
  if (lower.includes("timeout") || lower.includes("timed out")) {
    return "Permintaan memakan waktu terlalu lama. Coba lagi dalam beberapa saat.";
  }

  return raw || "Terjadi kesalahan yang tidak diketahui. Silakan coba lagi.";
}
