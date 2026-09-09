CREATE TABLE public.pesan_kontak (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nama text NOT NULL,
  email text NOT NULL,
  telepon text NOT NULL DEFAULT '',
  subjek text NOT NULL DEFAULT '',
  pesan text NOT NULL,
  dibaca boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);
GRANT INSERT ON public.pesan_kontak TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.pesan_kontak TO authenticated;
GRANT ALL ON public.pesan_kontak TO service_role;
ALTER TABLE public.pesan_kontak ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can send a message" ON public.pesan_kontak FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view messages" ON public.pesan_kontak FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update messages" ON public.pesan_kontak FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete messages" ON public.pesan_kontak FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.dokumen (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  judul text NOT NULL,
  deskripsi text NOT NULL DEFAULT '',
  kategori text NOT NULL DEFAULT 'Umum',
  file_url text NOT NULL,
  storage_path text,
  ukuran bigint NOT NULL DEFAULT 0,
  urutan integer NOT NULL DEFAULT 0,
  created_by uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);
GRANT SELECT ON public.dokumen TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.dokumen TO authenticated;
GRANT ALL ON public.dokumen TO service_role;
ALTER TABLE public.dokumen ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Dokumen is publicly viewable" ON public.dokumen FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can insert dokumen" ON public.dokumen FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update dokumen" ON public.dokumen FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete dokumen" ON public.dokumen FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

ALTER TABLE public.galeri ADD COLUMN IF NOT EXISTS kategori text NOT NULL DEFAULT 'Kegiatan';
ALTER TABLE public.galeri ADD COLUMN IF NOT EXISTS urutan integer NOT NULL DEFAULT 0;