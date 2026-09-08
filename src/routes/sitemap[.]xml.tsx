import { createFileRoute } from "@tanstack/react-router";
import { NAV } from "@/lib/site-nav";

function staticPaths() {
  const paths = new Set<string>(["/"]);
  for (const group of NAV) {
    paths.add(group.to);
    for (const child of group.children ?? []) paths.add(child.to);
  }
  return [...paths];
}

async function beritaSlugs(): Promise<string[]> {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) return [];
  try {
    const res = await fetch(
      `${url}/rest/v1/berita?select=slug&published=eq.true&order=tanggal.desc`,
      { headers: { apikey: key } },
    );
    if (!res.ok) return [];
    const rows = (await res.json()) as { slug: string }[];
    return rows.map((r) => r.slug).filter(Boolean);
  } catch {
    return [];
  }
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        const slugs = await beritaSlugs();
        const urls = [
          ...staticPaths().map((p) => ({ loc: `${origin}${p}`, priority: p === "/" ? "1.0" : "0.8" })),
          ...slugs.map((s) => ({ loc: `${origin}/informasi/berita/${s}`, priority: "0.6" })),
        ];
        const today = new Date().toISOString().slice(0, 10);
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${u.loc}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${u.priority}</priority></url>`,
  )
  .join("\n")}
</urlset>
`;
        return new Response(body, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
