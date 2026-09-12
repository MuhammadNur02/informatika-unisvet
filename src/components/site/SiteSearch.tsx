import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { FileDown, Images, Loader2, Newspaper, Search, Text } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { PAGES } from "@/content";
import { supabase } from "@/integrations/supabase/client";
import { fetchBeritaPublik } from "@/lib/berita";
import { fetchDokumen } from "@/lib/dokumen";
import { fetchGaleri } from "@/lib/galeri";

const PAGE_LABELS = Object.fromEntries(
  Object.values(PAGES).map((page) => [page.title, page.title]),
);

type SearchItem = {
  id: string;
  type: "Halaman" | "Berita" | "Galeri" | "Dokumen";
  title: string;
  description: string;
  href: string;
  keywords: string;
};

function pageHref(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

async function fetchSearchItems(): Promise<SearchItem[]> {
  const [overridesResult, beritaResult, galeriResult, dokumenResult] = await Promise.allSettled([
    supabase.from("page_content").select("path, title, description, blocks"),
    fetchBeritaPublik(),
    fetchGaleri(),
    fetchDokumen(),
  ]);

  const overrides = overridesResult.status === "fulfilled" ? overridesResult.value.data ?? [] : [];
  const berita = beritaResult.status === "fulfilled" ? beritaResult.value : [];
  const galeri = galeriResult.status === "fulfilled" ? galeriResult.value : [];
  const dokumen = dokumenResult.status === "fulfilled" ? dokumenResult.value : [];
  const edited = new Map(overrides.map((row) => [row.path, row]));
  const pages = Object.entries(PAGES).map(([path, fallback]) => {
    const override = edited.get(path);
    const title = override?.title || fallback.title;
    const description = override?.description || fallback.description;
    const blocks = override?.blocks ?? fallback.blocks;
    return {
      id: `page-${path}`,
      type: "Halaman" as const,
      title,
      description,
      href: pageHref(path),
      keywords: `${title} ${description} ${JSON.stringify(blocks)} ${PAGE_LABELS[title] ?? ""}`,
    };
  });

  return [
    ...pages,
    ...berita.map((item) => ({
      id: `berita-${item.id}`,
      type: "Berita" as const,
      title: item.judul,
      description: item.ringkasan || item.kategori,
      href: `/informasi/berita/${item.slug}`,
      keywords: `${item.judul} ${item.ringkasan} ${item.isi} ${item.kategori} ${item.tag}`,
    })),
    ...galeri.map((item) => ({
      id: `galeri-${item.id}`,
      type: "Galeri" as const,
      title: item.judul,
      description: item.deskripsi || item.kategori,
      href: "/informasi/galeri",
      keywords: `${item.judul} ${item.deskripsi ?? ""} ${item.kategori}`,
    })),
    ...dokumen.map((item) => ({
      id: `dokumen-${item.id}`,
      type: "Dokumen" as const,
      title: item.judul,
      description: item.deskripsi || item.kategori,
      href: "/informasi/dokumen",
      keywords: `${item.judul} ${item.deskripsi} ${item.kategori}`,
    })),
  ];
}

const TYPE_ICONS = { Halaman: Text, Berita: Newspaper, Galeri: Images, Dokumen: FileDown };

export function SiteSearch({ compact = false }: { compact?: boolean }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchQuery = useQuery({
    queryKey: ["site-search"],
    queryFn: fetchSearchItems,
    enabled: open,
    staleTime: 60_000,
  });

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("id-ID");
    if (!normalized) return [];
    return (searchQuery.data ?? [])
      .filter((item) => item.keywords.toLocaleLowerCase("id-ID").includes(normalized))
      .slice(0, 30);
  }, [query, searchQuery.data]);

  function openResult(href: string) {
    setOpen(false);
    setQuery("");
    void navigate({ to: href });
  }

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size={compact ? "default" : "icon"}
        aria-label="Cari isi situs"
        title="Cari isi situs"
        onClick={() => setOpen(true)}
        className={compact ? "w-full justify-start" : "rounded-full"}
      >
        <Search />
        {compact ? <span>Cari isi situs</span> : null}
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          value={query}
          onValueChange={setQuery}
          placeholder="Cari halaman, berita, galeri, atau dokumen…"
        />
        <CommandList className="max-h-[min(60vh,480px)]">
          {searchQuery.isLoading ? (
            <div className="flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" /> Memuat isi situs…
            </div>
          ) : query.trim() ? (
            <>
              <CommandEmpty>Tidak ada hasil yang cocok.</CommandEmpty>
              <CommandGroup heading={`${results.length} hasil ditemukan`}>
                {results.map((item) => {
                  const Icon = TYPE_ICONS[item.type];
                  return (
                    <CommandItem
                      key={item.id}
                      value={`${item.title} ${item.keywords}`}
                      onSelect={() => openResult(item.href)}
                      className="items-start gap-3 rounded-xl px-3 py-3"
                    >
                      <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                        <Icon />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-semibold">{item.title}</span>
                        <span className="mt-0.5 block line-clamp-2 text-xs text-muted-foreground">
                          {item.type} · {item.description}
                        </span>
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </>
          ) : (
            <div className="px-4 py-10 text-center text-sm text-muted-foreground">
              Ketik kata kunci untuk mencari seluruh isi situs.
            </div>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
