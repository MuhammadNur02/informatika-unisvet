import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Loader2, Plus, RotateCcw, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DEFAULT_FOOTER,
  DEFAULT_HOME,
  fetchFooterContent,
  fetchHomeContent,
  resetSetting,
  saveSetting,
  type FooterContent,
  type HomeContent,
} from "@/lib/site-content";
import { fetchMedia } from "@/lib/cms";

const ease = [0.22, 1, 0.36, 1] as const;

function Field({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

function Area({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function Lines({
  label,
  items,
  onChange,
  hint,
}: {
  label: string;
  items: string[];
  onChange: (v: string[]) => void;
  hint?: string;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Textarea
        rows={4}
        value={items.join("\n")}
        onChange={(e) => onChange(e.target.value.split("\n").filter((l) => l.trim() !== ""))}
      />
      <p className="text-xs text-muted-foreground">{hint ?? "Satu item per baris."}</p>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="card-elevated rounded-3xl bg-card p-6">
      <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground">{title}</h3>
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

export function BerandaEditor({ userId }: { userId: string }) {
  const queryClient = useQueryClient();
  const [home, setHome] = useState<HomeContent | null>(null);
  const [footer, setFooter] = useState<FooterContent | null>(null);
  const [busy, setBusy] = useState(false);

  const homeQuery = useQuery({ queryKey: ["site-settings", "home"], queryFn: fetchHomeContent });
  const footerQuery = useQuery({ queryKey: ["site-settings", "footer"], queryFn: fetchFooterContent });
  const mediaQuery = useQuery({ queryKey: ["media"], queryFn: fetchMedia });
  const images = (mediaQuery.data ?? []).filter((m) => m.kind === "image");

  useEffect(() => {
    if (homeQuery.data && !home) setHome(homeQuery.data);
  }, [homeQuery.data, home]);
  useEffect(() => {
    if (footerQuery.data && !footer) setFooter(footerQuery.data);
  }, [footerQuery.data, footer]);

  async function handleSave() {
    if (!home || !footer) return;
    setBusy(true);
    const id = toast.loading("Menyimpan konten beranda…");
    try {
      await saveSetting("home", home, userId);
      await saveSetting("footer", footer, userId);
      await queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      toast.success("Konten beranda & footer tersimpan", {
        id,
        description: "Perubahan langsung tampil di halaman publik.",
      });
    } catch (err) {
      toast.error("Gagal menyimpan", {
        id,
        description: err instanceof Error ? err.message : "Silakan coba lagi.",
      });
    } finally {
      setBusy(false);
    }
  }

  async function handleReset() {
    setBusy(true);
    try {
      await resetSetting("home");
      await resetSetting("footer");
      setHome(DEFAULT_HOME);
      setFooter(DEFAULT_FOOTER);
      await queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      toast.success("Konten dikembalikan ke bawaan");
    } catch (err) {
      toast.error("Gagal mengembalikan konten", {
        description: err instanceof Error ? err.message : "Silakan coba lagi.",
      });
    } finally {
      setBusy(false);
    }
  }

  if (!home || !footer) {
    return (
      <div className="space-y-4">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-40 rounded-3xl" />
        ))}
      </div>
    );
  }

  const patchHome = (patch: Partial<HomeContent>) => setHome({ ...home, ...patch });

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease }}
      className="space-y-6"
    >
      <div className="rounded-3xl bg-hero-gradient p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Beranda & Footer</p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-primary-foreground">
          Ubah seluruh teks halaman depan
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-primary-foreground/70">
          Semua bagian beranda — hero, statistik, keunggulan, visi & misi, alumni, ajakan mendaftar — serta
          data kontak di footer dapat diubah di sini tanpa coding.
        </p>
      </div>

      <Tabs defaultValue="hero">
        <TabsList className="flex w-full flex-wrap gap-1">
          <TabsTrigger value="hero">Hero & SEO</TabsTrigger>
          <TabsTrigger value="statistik">Statistik</TabsTrigger>
          <TabsTrigger value="keunggulan">Keunggulan</TabsTrigger>
          <TabsTrigger value="visi">Visi & Misi</TabsTrigger>
          <TabsTrigger value="alumni">Alumni & Berita</TabsTrigger>
          <TabsTrigger value="cta">Ajakan Daftar</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="mt-5 space-y-6">
          <Card title="Bagian Hero">
            <Field label="Badge atas" value={home.hero.badge} onChange={(badge) => patchHome({ hero: { ...home.hero, badge } })} />
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Judul (awal)" value={home.hero.titleLead} onChange={(v) => patchHome({ hero: { ...home.hero, titleLead: v } })} />
              <Field label="Judul (aksen emas)" value={home.hero.titleAccent} onChange={(v) => patchHome({ hero: { ...home.hero, titleAccent: v } })} />
              <Field label="Judul (akhir)" value={home.hero.titleTail} onChange={(v) => patchHome({ hero: { ...home.hero, titleTail: v } })} />
            </div>
            <Area label="Subjudul" rows={3} value={home.hero.subtitle} onChange={(v) => patchHome({ hero: { ...home.hero, subtitle: v } })} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Tombol utama" value={home.hero.primaryLabel} onChange={(v) => patchHome({ hero: { ...home.hero, primaryLabel: v } })} />
              <Field label="Tombol kedua" value={home.hero.secondaryLabel} onChange={(v) => patchHome({ hero: { ...home.hero, secondaryLabel: v } })} />
            </div>
            <Lines label="Chip keterangan" items={home.hero.badges} onChange={(badges) => patchHome({ hero: { ...home.hero, badges } })} />
            <Lines label="Kartu mengapung pada foto" items={home.hero.floating} onChange={(floating) => patchHome({ hero: { ...home.hero, floating } })} hint="Maksimal tiga baris." />
            <Field label="URL foto hero" value={home.hero.image} onChange={(image) => patchHome({ hero: { ...home.hero, image } })} />
            <select
              value=""
              onChange={(e) => e.target.value && patchHome({ hero: { ...home.hero, image: e.target.value } })}
              className="h-11 w-full rounded-xl border border-input bg-background px-3.5 text-sm outline-none focus-visible:border-accent"
            >
              <option value="">{images.length ? "Pilih foto dari pustaka media…" : "Pustaka media masih kosong"}</option>
              {images.map((m) => (
                <option key={m.id} value={m.url}>
                  {m.judul}
                </option>
              ))}
            </select>
          </Card>

          <Card title="SEO & Open Graph Beranda">
            <Field label="Judul halaman (title)" value={home.seo.title} onChange={(v) => patchHome({ seo: { ...home.seo, title: v } })} />
            <Area label="Meta description" value={home.seo.description} onChange={(v) => patchHome({ seo: { ...home.seo, description: v } })} />
            <Field label="OG title" value={home.seo.ogTitle} onChange={(v) => patchHome({ seo: { ...home.seo, ogTitle: v } })} />
            <Area label="OG description" value={home.seo.ogDescription} onChange={(v) => patchHome({ seo: { ...home.seo, ogDescription: v } })} />
            <Field
              label="OG image (URL absolut https)"
              value={home.seo.ogImage}
              onChange={(v) => patchHome({ seo: { ...home.seo, ogImage: v } })}
              hint="Ukuran ideal 1200×630 piksel."
            />
          </Card>
        </TabsContent>

        <TabsContent value="statistik" className="mt-5">
          <Card title="Statistik Prodi">
            {home.stats.map((s, i) => (
              <div key={i} className="grid gap-3 rounded-2xl border border-border p-4 sm:grid-cols-[1fr_2fr_auto]">
                <Input
                  value={s.value}
                  placeholder="500+"
                  onChange={(e) => {
                    const next = [...home.stats];
                    next[i] = { ...s, value: e.target.value };
                    patchHome({ stats: next });
                  }}
                />
                <Input
                  value={s.label}
                  placeholder="Mahasiswa Aktif"
                  onChange={(e) => {
                    const next = [...home.stats];
                    next[i] = { ...s, label: e.target.value };
                    patchHome({ stats: next });
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="Hapus statistik"
                  onClick={() => patchHome({ stats: home.stats.filter((_, idx) => idx !== i) })}
                >
                  <Trash2 />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="pill" onClick={() => patchHome({ stats: [...home.stats, { value: "", label: "" }] })}>
              <Plus /> Tambah statistik
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="keunggulan" className="mt-5">
          <Card title="Keunggulan Prodi">
            <Field label="Eyebrow" value={home.advantages.eyebrow} onChange={(v) => patchHome({ advantages: { ...home.advantages, eyebrow: v } })} />
            <Field label="Judul" value={home.advantages.title} onChange={(v) => patchHome({ advantages: { ...home.advantages, title: v } })} />
            <Area label="Deskripsi" value={home.advantages.description} onChange={(v) => patchHome({ advantages: { ...home.advantages, description: v } })} />
            {home.advantages.items.map((it, i) => (
              <div key={i} className="space-y-3 rounded-2xl border border-border p-4">
                <div className="flex items-center gap-3">
                  <Input
                    value={it.title}
                    placeholder="Judul keunggulan"
                    onChange={(e) => {
                      const items = [...home.advantages.items];
                      items[i] = { ...it, title: e.target.value };
                      patchHome({ advantages: { ...home.advantages, items } });
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    aria-label="Hapus keunggulan"
                    onClick={() =>
                      patchHome({
                        advantages: { ...home.advantages, items: home.advantages.items.filter((_, idx) => idx !== i) },
                      })
                    }
                  >
                    <Trash2 />
                  </Button>
                </div>
                <Textarea
                  rows={2}
                  value={it.desc}
                  placeholder="Penjelasan singkat"
                  onChange={(e) => {
                    const items = [...home.advantages.items];
                    items[i] = { ...it, desc: e.target.value };
                    patchHome({ advantages: { ...home.advantages, items } });
                  }}
                />
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="pill"
              onClick={() =>
                patchHome({ advantages: { ...home.advantages, items: [...home.advantages.items, { title: "", desc: "" }] } })
              }
            >
              <Plus /> Tambah keunggulan
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="visi" className="mt-5 space-y-6">
          <Card title="Visi">
            <Field label="Judul" value={home.visi.title} onChange={(v) => patchHome({ visi: { ...home.visi, title: v } })} />
            <Area label="Isi visi" rows={4} value={home.visi.text} onChange={(v) => patchHome({ visi: { ...home.visi, text: v } })} />
          </Card>
          <Card title="Misi">
            <Field label="Judul" value={home.misi.title} onChange={(v) => patchHome({ misi: { ...home.misi, title: v } })} />
            <Lines label="Poin misi" items={home.misi.items} onChange={(items) => patchHome({ misi: { ...home.misi, items } })} />
          </Card>
        </TabsContent>

        <TabsContent value="alumni" className="mt-5 space-y-6">
          <Card title="Judul Bagian Berita">
            <Field label="Eyebrow" value={home.news.eyebrow} onChange={(v) => patchHome({ news: { ...home.news, eyebrow: v } })} />
            <Field label="Judul" value={home.news.title} onChange={(v) => patchHome({ news: { ...home.news, title: v } })} />
            <Area label="Deskripsi" value={home.news.description} onChange={(v) => patchHome({ news: { ...home.news, description: v } })} />
          </Card>
          <Card title="Cerita Alumni">
            <Field label="Eyebrow" value={home.alumni.eyebrow} onChange={(v) => patchHome({ alumni: { ...home.alumni, eyebrow: v } })} />
            <Field label="Judul" value={home.alumni.title} onChange={(v) => patchHome({ alumni: { ...home.alumni, title: v } })} />
            <Area label="Deskripsi" value={home.alumni.description} onChange={(v) => patchHome({ alumni: { ...home.alumni, description: v } })} />
            {home.alumni.items.map((a, i) => (
              <div key={i} className="space-y-3 rounded-2xl border border-border p-4">
                <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
                  <Input
                    value={a.name}
                    placeholder="Nama alumni"
                    onChange={(e) => {
                      const items = [...home.alumni.items];
                      items[i] = { ...a, name: e.target.value };
                      patchHome({ alumni: { ...home.alumni, items } });
                    }}
                  />
                  <Input
                    value={a.year}
                    placeholder="Alumni 2021"
                    onChange={(e) => {
                      const items = [...home.alumni.items];
                      items[i] = { ...a, year: e.target.value };
                      patchHome({ alumni: { ...home.alumni, items } });
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    aria-label="Hapus alumni"
                    onClick={() =>
                      patchHome({ alumni: { ...home.alumni, items: home.alumni.items.filter((_, idx) => idx !== i) } })
                    }
                  >
                    <Trash2 />
                  </Button>
                </div>
                <Input
                  value={a.role}
                  placeholder="Jabatan / instansi"
                  onChange={(e) => {
                    const items = [...home.alumni.items];
                    items[i] = { ...a, role: e.target.value };
                    patchHome({ alumni: { ...home.alumni, items } });
                  }}
                />
                <Textarea
                  rows={2}
                  value={a.quote}
                  placeholder="Kutipan testimoni"
                  onChange={(e) => {
                    const items = [...home.alumni.items];
                    items[i] = { ...a, quote: e.target.value };
                    patchHome({ alumni: { ...home.alumni, items } });
                  }}
                />
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="pill"
              onClick={() =>
                patchHome({
                  alumni: {
                    ...home.alumni,
                    items: [...home.alumni.items, { name: "", year: "", role: "", quote: "" }],
                  },
                })
              }
            >
              <Plus /> Tambah alumni
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="cta" className="mt-5">
          <Card title="Ajakan Mendaftar (CTA)">
            <Field label="Badge" value={home.cta.badge} onChange={(v) => patchHome({ cta: { ...home.cta, badge: v } })} />
            <Field label="Judul" value={home.cta.title} onChange={(v) => patchHome({ cta: { ...home.cta, title: v } })} />
            <Area label="Deskripsi" value={home.cta.desc} onChange={(v) => patchHome({ cta: { ...home.cta, desc: v } })} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Tombol utama" value={home.cta.primaryLabel} onChange={(v) => patchHome({ cta: { ...home.cta, primaryLabel: v } })} />
              <Field label="Tautan tombol utama" value={home.cta.primaryHref} onChange={(v) => patchHome({ cta: { ...home.cta, primaryHref: v } })} />
              <Field label="Tombol kedua" value={home.cta.secondaryLabel} onChange={(v) => patchHome({ cta: { ...home.cta, secondaryLabel: v } })} />
              <Field label="Tautan tombol kedua" value={home.cta.secondaryHref} onChange={(v) => patchHome({ cta: { ...home.cta, secondaryHref: v } })} />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="footer" className="mt-5 space-y-6">
          <Card title="Tentang & Kontak">
            <Area label="Deskripsi singkat prodi" rows={3} value={footer.about} onChange={(about) => setFooter({ ...footer, about })} />
            <Area label="Alamat" rows={3} value={footer.address} onChange={(address) => setFooter({ ...footer, address })} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Telepon" value={footer.phone} onChange={(phone) => setFooter({ ...footer, phone })} />
              <Field label="Email" value={footer.email} onChange={(email) => setFooter({ ...footer, email })} />
              <Field label="WhatsApp Admin" value={footer.waAdmin} onChange={(waAdmin) => setFooter({ ...footer, waAdmin })} hint="Format 62xxxxxxxxxx" />
              <Field label="WhatsApp Kaprodi" value={footer.waKaprodi} onChange={(waKaprodi) => setFooter({ ...footer, waKaprodi })} hint="Format 62xxxxxxxxxx" />
            </div>
            <Field label="Kata kunci peta lokasi" value={footer.mapQuery} onChange={(mapQuery) => setFooter({ ...footer, mapQuery })} />
            <Field label="Catatan bawah" value={footer.note} onChange={(note) => setFooter({ ...footer, note })} />
          </Card>
          <Card title="Media Sosial">
            <Field label="Instagram" value={footer.socials.instagram} onChange={(v) => setFooter({ ...footer, socials: { ...footer.socials, instagram: v } })} />
            <Field label="YouTube" value={footer.socials.youtube} onChange={(v) => setFooter({ ...footer, socials: { ...footer.socials, youtube: v } })} />
            <Field label="Facebook" value={footer.socials.facebook} onChange={(v) => setFooter({ ...footer, socials: { ...footer.socials, facebook: v } })} />
            <Field label="TikTok" value={footer.socials.tiktok} onChange={(v) => setFooter({ ...footer, socials: { ...footer.socials, tiktok: v } })} />
          </Card>
          <Card title="Portal Akademik">
            {footer.portals.map((p, i) => (
              <div key={i} className="grid gap-3 rounded-2xl border border-border p-4 sm:grid-cols-[1fr_2fr_auto]">
                <Input
                  value={p.label}
                  placeholder="Nama portal"
                  onChange={(e) => {
                    const portals = [...footer.portals];
                    portals[i] = { ...p, label: e.target.value };
                    setFooter({ ...footer, portals });
                  }}
                />
                <Input
                  value={p.href}
                  placeholder="https://…"
                  onChange={(e) => {
                    const portals = [...footer.portals];
                    portals[i] = { ...p, href: e.target.value };
                    setFooter({ ...footer, portals });
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="Hapus portal"
                  onClick={() => setFooter({ ...footer, portals: footer.portals.filter((_, idx) => idx !== i) })}
                >
                  <Trash2 />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="pill"
              onClick={() => setFooter({ ...footer, portals: [...footer.portals, { label: "", href: "" }] })}
            >
              <Plus /> Tambah portal
            </Button>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="sticky bottom-4 flex flex-wrap gap-3 rounded-3xl border border-border bg-card/95 p-4 backdrop-blur-md">
        <Button size="pill" onClick={handleSave} disabled={busy}>
          {busy ? <Loader2 className="animate-spin" /> : <Save />} Simpan Perubahan
        </Button>
        <Button variant="outline" size="pill" onClick={handleReset} disabled={busy}>
          <RotateCcw /> Kembalikan Konten Asli
        </Button>
      </div>
    </motion.div>
  );
}
