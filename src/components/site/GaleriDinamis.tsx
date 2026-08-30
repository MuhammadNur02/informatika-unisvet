import { useQuery } from "@tanstack/react-query";
import { Reveal } from "./Reveal";
import { fetchGaleri } from "@/lib/galeri";

export function GaleriDinamis() {
  const { data, isLoading } = useQuery({ queryKey: ["galeri"], queryFn: fetchGaleri });

  if (isLoading || !data || data.length === 0) return null;

  return (
    <section className="mt-14">
      <Reveal>
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Dokumentasi Terbaru
        </h2>
      </Reveal>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((item, i) => (
          <Reveal key={item.id} delay={(i % 3) * 0.06}>
            <article className="card-elevated group relative h-72 overflow-hidden rounded-3xl">
              <img
                src={item.url}
                alt={item.judul}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.21_0.075_265/0.92),transparent_60%)]" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">{item.tanggal}</p>
                <h3 className="mt-1 text-lg font-bold text-primary-foreground">{item.judul}</h3>
                {item.deskripsi ? (
                  <p className="mt-1 text-sm text-primary-foreground/75">{item.deskripsi}</p>
                ) : null}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
