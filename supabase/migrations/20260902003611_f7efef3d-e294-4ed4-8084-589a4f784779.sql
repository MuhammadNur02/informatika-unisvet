ALTER TABLE public.page_content
  ADD COLUMN IF NOT EXISTS meta_description text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS og_title text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS og_description text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS og_image text NOT NULL DEFAULT '';

CREATE TABLE public.berita (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  judul text NOT NULL,
  slug text NOT NULL UNIQUE,
  kategori text NOT NULL DEFAULT 'Berita',
  tag text NOT NULL DEFAULT '',
  tanggal date NOT NULL DEFAULT current_date,
  ringkasan text NOT NULL DEFAULT '',
  isi text NOT NULL DEFAULT '',
  gambar_url text NOT NULL DEFAULT '',
  published boolean NOT NULL DEFAULT true,
  created_by uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT ON public.berita TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.berita TO authenticated;
GRANT ALL ON public.berita TO service_role;

ALTER TABLE public.berita ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published berita is publicly viewable" ON public.berita FOR SELECT USING (published = true);
CREATE POLICY "Admins can view all berita" ON public.berita FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert berita" ON public.berita FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update berita" ON public.berita FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete berita" ON public.berita FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_berita_updated_at
BEFORE UPDATE ON public.berita
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.site_settings (
  key text NOT NULL PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_by uuid,
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Site settings are publicly viewable" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins can insert site settings" ON public.site_settings FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update site settings" ON public.site_settings FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete site settings" ON public.site_settings FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();