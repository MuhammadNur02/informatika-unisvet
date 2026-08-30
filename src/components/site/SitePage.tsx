import { Link } from "@tanstack/react-router";
import { ChevronRight, Quote, ArrowRight } from "lucide-react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { Reveal } from "./Reveal";
import { Button } from "@/components/ui/button";
import type { Block, PageContent } from "@/content/types";
import { PAGES } from "@/content";
import { NAV } from "@/lib/site-nav";

export function pageMeta(path: string) {
  const page = PAGES[path];
  const title = page ? page.metaTitle : "Pendidikan Informatika UNISVET Semarang";
  const description = page ? page.description : "Program Studi Pendidikan Informatika UNISVET.";
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  };
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "prose":
      return (
        <SectionWrap title={block.title}>
          <div className="space-y-4">
            {block.paragraphs.map((p) => (
              <p key={p} className="text-base leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </div>
        </SectionWrap>
      );
    case "list":
      return (
        <SectionWrap title={block.title}>
          <ul className="grid gap-3 sm:grid-cols-2">
            {block.items.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-2xl border border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground transition-all duration-300 hover:border-accent/50 hover:shadow-[var(--shadow-card)]"
              >
                <ChevronRight className="mt-0.5 size-4 shrink-0 text-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </SectionWrap>
      );
    case "cards":
      return (
        <SectionWrap title={block.title}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {block.items.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 0.06}>
                <article className="card-elevated h-full rounded-3xl p-6">
                  {item.tag ? (
                    <span className="inline-flex rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent-foreground">
                      {item.tag}
                    </span>
                  ) : null}
                  <h3 className="mt-3 text-lg font-bold tracking-tight text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </SectionWrap>
      );
    case "steps":
      return (
        <SectionWrap title={block.title}>
          <ol className="space-y-4">
            {block.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <li className="card-elevated flex gap-5 rounded-3xl p-6">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[image:var(--gradient-hero)] text-sm font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </SectionWrap>
      );
    case "table":
      return (
        <SectionWrap title={block.title}>
          <div className="overflow-x-auto rounded-3xl border border-border bg-card shadow-[var(--shadow-card)]">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="bg-secondary">
                  {block.head.map((h) => (
                    <th key={h} className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-primary">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row) => (
                  <tr key={row.join("|")} className="border-t border-border transition-colors hover:bg-secondary/60">
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className={
                          ci === 0
                            ? "px-5 py-3.5 font-semibold text-foreground"
                            : "px-5 py-3.5 text-muted-foreground"
                        }
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.note ? <p className="mt-3 text-xs text-muted-foreground">{block.note}</p> : null}
        </SectionWrap>
      );
    case "people":
      return (
        <SectionWrap title={block.title}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {block.items.map((p, i) => (
              <Reveal key={p.name} delay={(i % 3) * 0.06}>
                <article className="card-elevated group h-full overflow-hidden rounded-3xl">
                  <div className="aspect-[4/5] overflow-hidden bg-secondary">
                    <img
                      src={p.photo}
                      alt={`Foto ${p.name}`}
                      loading="lazy"
                      width={640}
                      height={800}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold leading-snug text-foreground">
                      {p.name}
                      <span className="text-primary/70">, {p.degree}</span>
                    </h3>
                    <p className="mt-1 text-sm font-medium text-primary/70">{p.role}</p>
                    <p className="mt-3 inline-flex rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent-foreground">
                      {p.interest}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </SectionWrap>
      );
    case "org":
      return (
        <SectionWrap title={block.title}>
          <Reveal>
            <div className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
              <div className="mx-auto max-w-sm rounded-2xl bg-[image:var(--gradient-hero)] p-5 text-center text-primary-foreground">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/70">
                  {block.top}
                </p>
                <p className="mt-1 text-base font-bold">{block.topName}</p>
              </div>
              <div className="mx-auto h-8 w-px bg-border" />
              <div className="grid gap-4 border-t border-dashed border-border pt-8 sm:grid-cols-2 lg:grid-cols-3">
                {block.nodes.map((n, i) => (
                  <Reveal key={n.role} delay={(i % 3) * 0.06}>
                    <div className="h-full rounded-2xl border border-border bg-slate-surface p-5 transition-all duration-300 hover:border-accent/50 hover:shadow-[var(--shadow-card)]">
                      <p className="text-xs font-semibold uppercase tracking-widest text-accent-foreground">
                        {n.role}
                      </p>
                      <p className="mt-1.5 text-sm font-bold text-foreground">{n.name}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </SectionWrap>
      );
    case "gallery":
      return (
        <SectionWrap title={block.title}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {block.items.map((f, i) => (
              <Reveal key={f.name} delay={(i % 3) * 0.06}>
                <article className="card-elevated group relative h-72 overflow-hidden rounded-3xl">
                  <img
                    src={f.image}
                    alt={f.name}
                    loading="lazy"
                    width={900}
                    height={700}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.21_0.075_265/0.92),transparent_60%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="text-lg font-bold text-primary-foreground">{f.name}</h3>
                    <p className="mt-1 text-sm text-primary-foreground/75">{f.desc}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </SectionWrap>
      );
    case "faq":
      return (
        <SectionWrap title={block.title}>
          <div className="space-y-3">
            {block.items.map((item, i) => (
              <Reveal key={item.q} delay={i * 0.04}>
                <details className="group rounded-2xl border border-border bg-card p-5 transition-colors hover:border-accent/50">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-foreground">
                    {item.q}
                    <ChevronRight className="size-4 shrink-0 text-accent transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </SectionWrap>
      );
    case "stats":
      return (
        <SectionWrap title={block.title}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {block.items.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06}>
                <div className="card-elevated h-full rounded-3xl p-6 text-center">
                  <p className="text-3xl font-extrabold tracking-tight text-primary">{s.value}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </SectionWrap>
      );
    case "timeline":
      return (
        <SectionWrap title={block.title}>
          <div className="relative space-y-5 border-l border-border pl-6">
            {block.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="relative rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
                  <span className="absolute -left-[31px] top-6 size-3 rounded-full bg-accent ring-4 ring-background" />
                  <p className="text-xs font-bold uppercase tracking-widest text-accent-foreground">{item.date}</p>
                  <h3 className="mt-1.5 text-base font-bold text-foreground">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </SectionWrap>
      );
    case "quotes":
      return (
        <SectionWrap title={block.title}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {block.items.map((q, i) => (
              <Reveal key={q.name} delay={(i % 3) * 0.06}>
                <figure className="card-elevated h-full rounded-3xl p-6">
                  <Quote className="size-6 text-accent" />
                  <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">"{q.quote}"</blockquote>
                  <figcaption className="mt-5 border-t border-border pt-4">
                    <p className="text-sm font-bold text-foreground">{q.name}</p>
                    <p className="text-xs text-muted-foreground">{q.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </SectionWrap>
      );
    case "cta":
      return (
        <Reveal>
          <div className="mt-4 overflow-hidden rounded-3xl bg-[image:var(--gradient-hero)] p-8 sm:p-10">
            <h3 className="text-2xl font-bold text-primary-foreground">{block.title}</h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-primary-foreground/75">{block.desc}</p>
            <Button asChild variant="pmb" size="pill" className="mt-6">
              <a href={block.href} target="_blank" rel="noreferrer">
                {block.label} <ArrowRight />
              </a>
            </Button>
          </div>
        </Reveal>
      );
    default:
      return null;
  }
}

function SectionWrap({ title, children }: { title?: string | undefined; children: React.ReactNode }) {
  return (
    <section className="mt-14 first:mt-0">
      {title ? (
        <Reveal>
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h2>
        </Reveal>
      ) : null}
      {children}
    </section>
  );
}

function useBreadcrumb(path: string) {
  for (const group of NAV) {
    const child = group.children?.find((c) => c.to === path);
    if (child) return { group: group.label, child: child.label };
  }
  return { group: "Halaman", child: "" };
}

export function SitePage({ path, children }: { path: string; children?: React.ReactNode }) {
  const page: PageContent | undefined = PAGES[path];
  const crumb = useBreadcrumb(path);

  if (!page) return null;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden bg-primary-deep pb-16 pt-36 sm:pb-20 sm:pt-44">
          <SmokeLayer />
          <div className="absolute -right-24 -top-24 size-72 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal y={16}>
              <nav className="flex flex-wrap items-center gap-2 text-xs font-medium text-primary-foreground/60">
                <Link to="/" className="transition-colors hover:text-accent">
                  Beranda
                </Link>
                <ChevronRight className="size-3" />
                <span>{crumb.group}</span>
                {crumb.child ? (
                  <>
                    <ChevronRight className="size-3" />
                    <span className="text-accent">{crumb.child}</span>
                  </>
                ) : null}
              </nav>
              <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
                {page.eyebrow}
              </span>
              <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl">
                {page.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/70">
                {page.description}
              </p>
            </Reveal>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          {page.blocks.map((block, i) => (
            <BlockView key={i} block={block} />
          ))}
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}