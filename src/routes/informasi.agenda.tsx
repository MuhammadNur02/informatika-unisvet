import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";
import { BeritaList } from "@/components/site/BeritaList";

const PATH = "/informasi/agenda";

export const Route = createFileRoute("/informasi/agenda")({
  head: () => pageMeta(PATH),
  component: () => (
    <SitePage path={PATH}>
      <BeritaList
        kategori={["Agenda", "Event"]}
        heading="Agenda Kegiatan"
        emptyText="Belum ada agenda yang diterbitkan."
      />
    </SitePage>
  ),
});
