import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";
import { BeritaList } from "@/components/site/BeritaList";

const PATH = "/informasi/pengumuman";

export const Route = createFileRoute("/informasi/pengumuman")({
  head: () => pageMeta(PATH),
  component: () => (
    <SitePage path={PATH}>
      <BeritaList
        kategori="Pengumuman"
        heading="Pengumuman Terbaru"
        emptyText="Belum ada pengumuman yang diterbitkan."
      />
    </SitePage>
  ),
});
