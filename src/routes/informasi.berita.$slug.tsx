import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, CalendarDays, ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Reveal } from "@/components/site/Reveal";
import { VideoBackground } from "@/components/site/VideoBackground";
import { fetchBeritaBySlug, fetchBeritaPublik, formatTanggalId } from "@/lib/berita";

export const Route = createFileRoute("/informasi/berita/$slug")({
  head: () => ({
    meta: [
      { title: "Baca Berita — Pendidikan Informatika UNISVET" },
      {
        name: "description",
        content: "Berita dan kegiatan terbaru Program Studi Pendidikan Informatika UNISVET Semarang.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Baca Berita — Pendidikan Informatika UNISVET" },
      {
        property: "og:description",
        content: "Berita dan kegiatan terbaru Program Studi Pendidikan Informatika UNISVET Semarang.",
      },
    ],
  }),
  component: BeritaDetail,
});

function setMeta(attr: "name" | "property", key: string, value: string) {
  if (!value) return;
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function BeritaDetail() {
  const { slug } = Route.useParams();

  const { data: berita, isLoading } = useQuery({
    queryKey: ["berita", "slug", slug],
    queryFn: () => fetchBeritaBySlug(slug),
    staleTime: 60_000,
  });

  const { data: semua } = useQuery({
    queryKey: ["berita", "publik"],
    queryFn: fetchBeritaPublik,
    staleTime: 60_000,
  });

  useEffect(() => {
    if (!berita) return;
    const desc = berita.ringkasan || berita.judul;
    document.title = `${berita.judul} — Pendidikan Informatika UNISVET`;
    setMeta("name", "description", desc);
    setMeta("property", "og:title", berita.judul);
    setMeta("property", "og:description", desc);
    if (berita.gambar_url?.startsWith("http")) {
      setMeta("property", "og:image", berita.gambar_url);
      setMeta("name", "twitter:image", berita.gambar_url);
    }
  }, [berita]);

  const lainnya = (semua ?? []).filter((b) => b.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden bg-primary-deep pb-14 pt-36 sm:pb-16 sm:pt-44">
          <VideoBackground />
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal y={16}>
              <nav className="flex flex-wrap items-center gap-2 text-xs font-medium text-primary-foreground/60">
                <Link to="/" className="transition-colors hover:text-accent">
                  Beranda
                </Link>
                <ChevronRight className="size-3" />
                <Link to="/informasi/berita" className="transition-colors hover:text-accent">
                  Berita
                </Link>
              </nav>
              {berita ? (
                <>
                  <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
                    {berita.kategori}
                  </span>
                  <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-primary-foreground sm:text-4xl">
                    {berita.judul}
                  </h1>
                  <p className="mt-4 inline-flex items-center gap-2 text-sm text-primary-foreground/70">
                    <CalendarDays className="size-4" /> {formatTanggalId(berita.tanggal)}
                    {berita.tag ? <span className="text-accent">#{berita.tag}</span> : null}
                  </p>
                </>
              ) : (
                <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-primary-foreground sm:text-4xl">
                  {isLoading ? "Memuat berita…" : "Berita tidak ditemukan"}
                </h1>
              )}
            </Reveal>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          {isLoading ? (
            <div className="space-y-4">
              <div className="h-64 animate-pulse rounded-3xl bg-secondary" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-secondary" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-secondary" />
            </div>
          ) : !berita ? (
            <div className="rounded-3xl border border-border bg-card p-8">
              <p className="text-sm text-muted-foreground">
                Berita yang Anda cari tidak tersedia atau belum diterbitkan.
              </p>
              <Link
                to="/informasi/berita"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                <ArrowLeft className="size-4" /> Kembali ke daftar berita
              </Link>
            </div>
          ) : (
            <article>
              {berita.gambar_url ? (
                <div className="overflow-hidden rounded-3xl border border-border bg-secondary">
                  <img src={berita.gambar_url} alt={berita.judul} className="w-full object-cover" />
                </div>
              ) : null}
              {berita.ringkasan ? (
                <p className="mt-8 text-lg font-medium leading-relaxed text-foreground">{berita.ringkasan}</p>
              ) : null}
              <div className="mt-6 space-y-4">
                {berita.isi
                  .split(/\n{2,}/)
                  .filter(Boolean)
                  .map((p, i) => (
                    <p key={i} className="text-base leading-relaxed text-muted-foreground">
                      {p}
                    </p>
                  ))}
              </div>
              <Link
                to="/informasi/berita"
                className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                <ArrowLeft className="size-4" /> Kembali ke daftar berita
              </Link>
            </article>
          )}

          {lainnya.length > 0 ? (
            <section className="mt-16">
              <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">Berita Lainnya</h2>
              <div className="grid gap-6 sm:grid-cols-3">
                {lainnya.map((b, i) => (
                  <Reveal key={b.id} delay={i * 0.06}>
                    <Link
                      to="/informasi/berita/$slug"
                      params={{ slug: b.slug }}
                      className="card-elevated group block h-full overflow-hidden rounded-3xl"
                    >
                      {b.gambar_url ? (
                        <div className="aspect-[16/10] overflow-hidden bg-secondary">
                          <img
                            src={b.gambar_url}
                            alt={b.judul}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                      ) : null}
                      <div className="p-5">
                        <p className="text-xs font-semibold text-accent-foreground">{b.kategori}</p>
                        <h3 className="mt-2 text-base font-bold leading-snug text-foreground">{b.judul}</h3>
                        <p className="mt-1.5 text-xs text-muted-foreground">{formatTanggalId(b.tanggal)}</p>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
