import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Layers,
  List,
  Loader2,
  Plus,
  RotateCcw,
  Save,
  Trash2,
  Video,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Block, PageContent } from "@/content/types";
import {
  editablePaths,
  fetchEditedPaths,
  fetchMedia,
  fetchPageOverride,
  resetPageContent,
  savePageContent,
  staticPage,
} from "@/lib/cms";

const BLOCK_LABEL: Record<string, string> = {
  prose: "Teks / Paragraf",
  list: "Daftar Poin",
  cards: "Kartu",
  steps: "Langkah",
  table: "Tabel",
  people: "Profil Orang",
  org: "Struktur Organisasi",
  gallery: "Galeri",
  faq: "Tanya Jawab",
  stats: "Statistik",
  timeline: "Kronologi",
  quotes: "Kutipan",
  cta: "Ajakan (CTA)",
  image: "Gambar",
  video: "Video",
};

function newBlock(type: string): Block {
  switch (type) {
    case "prose":
      return { type: "prose", title: "Judul Bagian", paragraphs: ["Tulis paragraf di sini."] };
    case "list":
      return { type: "list", title: "Daftar", items: ["Poin pertama"] };
    case "cards":
      return { type: "cards", title: "Kartu", items: [{ title: "Judul kartu", desc: "Keterangan kartu" }] };
    case "image":
      return { type: "image", title: "Gambar", url: "", caption: "" };
    case "video":
      return { type: "video", title: "Video", url: "", caption: "" };
    default:
      return {
        type: "cta",
        title: "Siap bergabung?",
        desc: "Daftar sekarang melalui portal PMB UNISVET.",
        label: "Daftar Sekarang",
        href: "https://pmb.unisvet.ac.id/",
      };
  }
}

export function PageEditor({ userId }: { userId: string }) {
  const queryClient = useQueryClient();
  const paths = useMemo(() => editablePaths(), []);
  const [path, setPath] = useState(paths[0] ?? "");
  const [draft, setDraft] = useState<PageContent | null>(null);
  const [busy, setBusy] = useState(false);

  const editedQuery = useQuery({ queryKey: ["edited-paths"], queryFn: fetchEditedPaths });
  const mediaQuery = useQuery({ queryKey: ["media"], queryFn: fetchMedia });
  const contentQuery = useQuery({
    queryKey: ["page-content", path],
    queryFn: () => fetchPageOverride(path),
    enabled: Boolean(path),
  });

  useEffect(() => {
    if (!path) return;
    const base = contentQuery.data ?? staticPage(path);
    if (base && !contentQuery.isFetching) {
      setDraft(structuredClone(base));
    }
  }, [path, contentQuery.data, contentQuery.isFetching]);

  function patch(next: Partial<PageContent>) {
    setDraft((d) => (d ? { ...d, ...next } : d));
  }

  function updateBlock(index: number, next: Block) {
    setDraft((d) => (d ? { ...d, blocks: d.blocks.map((b, i) => (i === index ? next : b)) } : d));
  }

  function moveBlock(index: number, dir: -1 | 1) {
    setDraft((d) => {
      if (!d) return d;
      const target = index + dir;
      if (target < 0 || target >= d.blocks.length) return d;
      const blocks = [...d.blocks];
      const a = blocks[index]!;
      blocks[index] = blocks[target]!;
      blocks[target] = a;
      return { ...d, blocks };
    });
  }

  function removeBlock(index: number) {
    setDraft((d) => (d ? { ...d, blocks: d.blocks.filter((_, i) => i !== index) } : d));
  }

  function addBlock(type: string) {
    setDraft((d) => (d ? { ...d, blocks: [...d.blocks, newBlock(type)] } : d));
  }

  async function handleSave() {
    if (!draft) return;
    setBusy(true);
    const id = toast.loading("Menyimpan konten…");
    try {
      await savePageContent({ path, content: draft, userId });
      toast.success("Konten tersimpan", { id, description: `Perubahan langsung tampil di ${path}` });
      await queryClient.invalidateQueries({ queryKey: ["page-content", path] });
      await queryClient.invalidateQueries({ queryKey: ["edited-paths"] });
    } catch (err) {
      toast.error("Gagal menyimpan konten", {
        id,
        description: err instanceof Error ? err.message : "Silakan coba lagi.",
      });
    } finally {
      setBusy(false);
    }
  }

  async function handleReset() {
    setBusy(true);
    const id = toast.loading("Mengembalikan konten asli…");
    try {
      await resetPageContent(path);
      const base = staticPage(path);
      if (base) setDraft(structuredClone(base));
      toast.success("Konten dikembalikan ke versi asli", { id });
      await queryClient.invalidateQueries({ queryKey: ["page-content", path] });
      await queryClient.invalidateQueries({ queryKey: ["edited-paths"] });
    } catch (err) {
      toast.error("Gagal mengembalikan konten", {
        id,
        description: err instanceof Error ? err.message : "Silakan coba lagi.",
      });
    } finally {
      setBusy(false);
    }
  }

  const media = mediaQuery.data ?? [];
  const editedPaths = editedQuery.data ?? [];

  return (
    <div className="space-y-8">
      <section className="card-elevated rounded-3xl bg-card p-6">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="space-y-2">
            <Label htmlFor="page-path">Pilih Halaman</Label>
            <select
              id="page-path"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              className="h-11 w-full rounded-xl border border-input bg-background px-3.5 text-sm text-foreground outline-none transition-colors focus-visible:border-accent"
            >
              {paths.map((p) => (
                <option key={p} value={p}>
                  {p}
                  {editedPaths.includes(p) ? "  •  sudah diedit" : ""}
                </option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground">
              Halaman yang belum pernah diedit memakai konten asli sebagai titik awal.
            </p>
          </div>
          <Button asChild variant="outline" size="pill">
            <a href={path} target="_blank" rel="noreferrer">
              Lihat halaman <ExternalLink />
            </a>
          </Button>
        </div>
      </section>

      {!draft ? (
        <div className="rounded-3xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
          Memuat konten halaman…
        </div>
      ) : (
        <>
          <section className="card-elevated space-y-5 rounded-3xl bg-card p-6">
            <h2 className="text-lg font-bold tracking-tight text-foreground">Kepala Halaman</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="eyebrow">Label Atas</Label>
                <Input id="eyebrow" value={draft.eyebrow} onChange={(e) => patch({ eyebrow: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Judul SEO</Label>
                <Input
                  id="metaTitle"
                  value={draft.metaTitle}
                  onChange={(e) => patch({ metaTitle: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Judul Halaman</Label>
              <Input id="title" value={draft.title} onChange={(e) => patch({ title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi Singkat</Label>
              <Textarea
                id="description"
                rows={3}
                value={draft.description}
                onChange={(e) => patch({ description: e.target.value })}
              />
            </div>
          </section>

          <section className="card-elevated space-y-5 rounded-3xl bg-card p-6">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-foreground">SEO & Open Graph</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Judul & deskripsi yang tampil di Google, serta pratinjau saat tautan dibagikan ke WhatsApp
                atau media sosial.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="metaDescription">Deskripsi SEO (maks. ±160 karakter)</Label>
              <Textarea
                id="metaDescription"
                rows={2}
                maxLength={200}
                value={draft.metaDescription ?? ""}
                onChange={(e) => patch({ metaDescription: e.target.value })}
                placeholder={draft.description}
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="ogTitle">Judul Open Graph</Label>
                <Input
                  id="ogTitle"
                  value={draft.ogTitle ?? ""}
                  onChange={(e) => patch({ ogTitle: e.target.value })}
                  placeholder={draft.metaTitle}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ogImage">Gambar Open Graph (URL)</Label>
                <Input
                  id="ogImage"
                  value={draft.ogImage ?? ""}
                  onChange={(e) => patch({ ogImage: e.target.value })}
                  placeholder="https://…"
                />
                <MediaPicker kind="image" media={media} onPick={(url) => patch({ ogImage: url })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ogDescription">Deskripsi Open Graph</Label>
              <Textarea
                id="ogDescription"
                rows={2}
                value={draft.ogDescription ?? ""}
                onChange={(e) => patch({ ogDescription: e.target.value })}
                placeholder={draft.metaDescription || draft.description}
              />
            </div>
          </section>

          <section className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold tracking-tight text-foreground">Blok Konten</h2>
                <p className="mt-1 text-sm text-muted-foreground">{draft.blocks.length} blok pada halaman ini</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => addBlock("prose")}>
                  <FileText /> Teks
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => addBlock("list")}>
                  <List /> Daftar
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => addBlock("cards")}>
                  <Layers /> Kartu
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => addBlock("image")}>
                  <ImageIcon /> Gambar
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => addBlock("video")}>
                  <Video /> Video
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => addBlock("cta")}>
                  <Plus /> CTA
                </Button>
              </div>
            </div>

            <AnimatePresence mode="popLayout">
              {draft.blocks.map((block, index) => (
                <motion.article
                  key={index}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className="card-elevated rounded-3xl bg-card p-6"
                >
                  <header className="flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-primary">
                      {index + 1}. {BLOCK_LABEL[block.type] ?? block.type}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        aria-label="Pindah ke atas"
                        onClick={() => moveBlock(index, -1)}
                        disabled={index === 0}
                      >
                        <ArrowUp />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        aria-label="Pindah ke bawah"
                        onClick={() => moveBlock(index, 1)}
                        disabled={index === draft.blocks.length - 1}
                      >
                        <ArrowDown />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        aria-label="Hapus blok"
                        onClick={() => removeBlock(index)}
                        className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  </header>

                  <div className="mt-5">
                    <BlockFields
                      block={block}
                      media={media}
                      onChange={(next) => updateBlock(index, next)}
                    />
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </section>

          <div className="sticky bottom-4 flex flex-wrap gap-3 rounded-3xl border border-border bg-card/95 p-4 backdrop-blur">
            <Button type="button" size="pill" onClick={handleSave} disabled={busy}>
              {busy ? <Loader2 className="animate-spin" /> : <Save />} Simpan Perubahan
            </Button>
            <Button type="button" variant="outline" size="pill" onClick={handleReset} disabled={busy}>
              <RotateCcw /> Kembalikan Konten Asli
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

type MediaOption = { id: string; judul: string; kind: string; url: string };

function MediaPicker({
  kind,
  media,
  onPick,
}: {
  kind: "image" | "video";
  media: MediaOption[];
  onPick: (url: string) => void;
}) {
  const options = media.filter((m) => m.kind === kind);
  return (
    <select
      value=""
      onChange={(e) => e.target.value && onPick(e.target.value)}
      className="h-11 w-full rounded-xl border border-input bg-background px-3.5 text-sm text-foreground outline-none focus-visible:border-accent"
    >
      <option value="">
        {options.length ? "Pilih dari pustaka media…" : "Pustaka media belum berisi berkas ini"}
      </option>
      {options.map((m) => (
        <option key={m.id} value={m.url}>
          {m.judul}
        </option>
      ))}
    </select>
  );
}

function BlockFields({
  block,
  media,
  onChange,
}: {
  block: Block;
  media: MediaOption[];
  onChange: (next: Block) => void;
}) {
  if (block.type === "prose") {
    return (
      <div className="space-y-4">
        <TitleField value={block.title ?? ""} onChange={(title) => onChange({ ...block, title })} />
        <div className="space-y-2">
          <Label>Paragraf (satu paragraf per baris)</Label>
          <Textarea
            rows={6}
            value={block.paragraphs.join("\n")}
            onChange={(e) =>
              onChange({ ...block, paragraphs: e.target.value.split("\n").filter((l) => l.trim() !== "") })
            }
          />
        </div>
      </div>
    );
  }

  if (block.type === "list") {
    return (
      <div className="space-y-4">
        <TitleField value={block.title ?? ""} onChange={(title) => onChange({ ...block, title })} />
        <div className="space-y-2">
          <Label>Poin (satu poin per baris)</Label>
          <Textarea
            rows={6}
            value={block.items.join("\n")}
            onChange={(e) =>
              onChange({ ...block, items: e.target.value.split("\n").filter((l) => l.trim() !== "") })
            }
          />
        </div>
      </div>
    );
  }

  if (block.type === "cards") {
    return (
      <div className="space-y-4">
        <TitleField value={block.title ?? ""} onChange={(title) => onChange({ ...block, title })} />
        <div className="space-y-2">
          <Label>Kartu — format: Judul | Keterangan | Label opsional</Label>
          <Textarea
            rows={6}
            value={block.items.map((i) => [i.title, i.desc, i.tag ?? ""].join(" | ")).join("\n")}
            onChange={(e) =>
              onChange({
                ...block,
                items: e.target.value
                  .split("\n")
                  .filter((l) => l.trim() !== "")
                  .map((line) => {
                    const [title = "", desc = "", tag = ""] = line.split("|").map((s) => s.trim());
                    return tag ? { title, desc, tag } : { title, desc };
                  }),
              })
            }
          />
          <p className="text-xs text-muted-foreground">Contoh: Kurikulum Adaptif | Disusun bersama industri | Unggulan</p>
        </div>
      </div>
    );
  }

  if (block.type === "image" || block.type === "video") {
    return (
      <div className="space-y-4">
        <TitleField value={block.title ?? ""} onChange={(title) => onChange({ ...block, title })} />
        <div className="space-y-2">
          <Label>Ambil dari pustaka media</Label>
          <MediaPicker
            kind={block.type === "video" ? "video" : "image"}
            media={media}
            onPick={(url) => onChange({ ...block, url })}
          />
        </div>
        <div className="space-y-2">
          <Label>URL {block.type === "video" ? "Video" : "Gambar"}</Label>
          <Input value={block.url} onChange={(e) => onChange({ ...block, url: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Keterangan (opsional)</Label>
          <Input value={block.caption ?? ""} onChange={(e) => onChange({ ...block, caption: e.target.value })} />
        </div>
        {block.url ? (
          block.type === "image" ? (
            <img src={block.url} alt="Pratinjau" className="max-h-56 w-full rounded-2xl object-cover" />
          ) : (
            <video src={block.url} controls className="max-h-56 w-full rounded-2xl bg-black" />
          )
        ) : null}
      </div>
    );
  }

  if (block.type === "cta") {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label>Judul</Label>
          <Input value={block.title} onChange={(e) => onChange({ ...block, title: e.target.value })} />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label>Deskripsi</Label>
          <Textarea rows={3} value={block.desc} onChange={(e) => onChange({ ...block, desc: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Label Tombol</Label>
          <Input value={block.label} onChange={(e) => onChange({ ...block, label: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Tautan Tombol</Label>
          <Input value={block.href} onChange={(e) => onChange({ ...block, href: e.target.value })} />
        </div>
      </div>
    );
  }

  return <StructuredBlockFields block={block} media={media} onChange={onChange} />;
}


function TitleField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-2">
      <Label>Judul Bagian (opsional)</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
