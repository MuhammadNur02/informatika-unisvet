import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";
import { BeritaList } from "@/components/site/BeritaList";

const PATH = "/informasi/event";

export const Route = createFileRoute("/informasi/event")({
  head: () => pageMeta(PATH),
  component: () => (
    <SitePage path={PATH}>
      <BeritaList
        kategori="Event"
        heading="Event Terbaru"
        emptyText="Belum ada event yang diterbitkan."
      />
    </SitePage>
  ),
});
