import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";
import { BeritaList } from "@/components/site/BeritaList";

const PATH = "/informasi/berita";

export const Route = createFileRoute("/informasi/berita")({
  head: () => pageMeta(PATH),
  component: () => (
    <SitePage path={PATH}>
      <BeritaList />
    </SitePage>
  ),
});
