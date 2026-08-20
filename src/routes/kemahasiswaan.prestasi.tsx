import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";

const PATH = "/kemahasiswaan/prestasi";

export const Route = createFileRoute("/kemahasiswaan/prestasi")({
  head: () => pageMeta(PATH),
  component: () => <SitePage path={PATH} />,
});
