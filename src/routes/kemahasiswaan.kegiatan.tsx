import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";

const PATH = "/kemahasiswaan/kegiatan";

export const Route = createFileRoute("/kemahasiswaan/kegiatan")({
  head: () => pageMeta(PATH),
  component: () => <SitePage path={PATH} />,
});
