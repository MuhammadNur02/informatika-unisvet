import { useQuery } from "@tanstack/react-query";
import { Reveal } from "./Reveal";
import { LensFlare } from "./LensFlare";
import { fetchPageOverride, staticPage } from "@/lib/cms";
import type { Block } from "@/content/types";

const DOSEN_PATH = "/profil/dosen-tendik";
const FASILITAS_PATH = "/profil/fasilitas";

/** Sumber data sama dengan halaman CMS terkait, supaya edit dosen/fasilitas di dashboard otomatis tampil di beranda juga. */
function usePageBlocks(path: string) {
  const query = useQuery({
    queryKey: ["page-content", path],
    queryFn: () => fetchPageOverride(path),
    staleTime: 60_000,
  });
  return (query.data ?? staticPage(path))?.blocks ?? [];
}

function usePeople(path: string) {
  const blocks = usePageBlocks(path);
  const block = blocks.find((b): b is Extract<Block, { type: "people" }> => b.type === "people");
  return block?.items ?? [];
}

function useGallery(path: string) {
  const blocks = usePageBlocks(path);
  const block = blocks.find((b): b is Extract<Block, { type: "gallery" }> => b.type === "gallery");
  return block?.items ?? [];
}

/** Heading versi terang-di-atas-gelap — section ini beda dari section terang lain di beranda. */
function DarkSectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-hero-foreground/20 bg-hero-foreground/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-hero-foreground sm:text-4xl">{title}</h2>
      <p className="mt-3 text-base leading-relaxed text-hero-foreground/70">{description}</p>
    </Reveal>
  );
}

/** Section gelap ("team spotlight") — pita gelap kedua di beranda, kontras dengan section terang sekitarnya. */
export function Faculty() {
  const dosen = usePeople(DOSEN_PATH);
  const fasilitas = useGallery(FASILITAS_PATH);

  return (
    <section id="dosen" className="relative overflow-hidden bg-hero-gradient py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-mesh opacity-40" aria-hidden />
      <LensFlare seed="dosen" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <DarkSectionHeading
          eyebrow="Profil Pengajar"
          title="Dosen & Tenaga Pendidik"
          description="Didampingi dosen berkualifikasi magister dan doktor dengan fokus riset pendidikan dan informatika."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dosen.map((d, i) => (
            <Reveal key={d.name} delay={(i % 3) * 0.08}>
              <article className="card-glass-dark flex h-full flex-col items-center rounded-3xl p-7 text-center">
                <div className="mb-5 h-36 w-36 shrink-0 overflow-hidden rounded-3xl bg-hero-foreground/10">
                  {d.photo ? (
                    <img
                      src={d.photo}
                      alt={d.name}
                      className="h-full w-full object-cover"
                      style={{ objectPosition: `${d.photoPosX ?? 50}% ${d.photoPosY ?? 25}%` }}
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-4xl font-bold text-hero-foreground">
                      {d.name.charAt(0)}
                    </span>
                  )}
                </div>

                <h3 className="min-h-14 text-lg font-bold leading-snug text-hero-foreground">{d.name}</h3>
                <p className="mt-1 min-h-8 text-sm font-semibold text-accent">{d.role}</p>

                <div className="mt-auto flex w-full items-center justify-center border-t border-hero-foreground/15 pt-4">
                  <span className="inline-block rounded-full bg-hero-foreground/10 px-3.5 py-1.5 text-xs font-semibold text-hero-foreground/85">
                    {d.interest}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div id="fasilitas" className="mt-20">
          <DarkSectionHeading
            eyebrow="Fasilitas"
            title="Ruang Belajar & Laboratorium"
            description="Fasilitas penunjang praktik yang mendukung pembelajaran berbasis proyek."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {fasilitas.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.08}>
                <article className="card-glass-dark group relative h-72 overflow-hidden rounded-3xl">
                  <img
                    src={f.image}
                    alt={f.name}
                    loading="lazy"
                    width={900}
                    height={700}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.1_0.04_25/0.95),transparent_60%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="text-lg font-bold text-hero-foreground">{f.name}</h3>
                    <p className="mt-1 text-sm text-hero-foreground/75">{f.desc}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
