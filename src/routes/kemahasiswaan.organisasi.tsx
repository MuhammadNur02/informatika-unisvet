import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";

const PATH = "/kemahasiswaan/organisasi";

export const Route = createFileRoute("/kemahasiswaan/organisasi")({
  head: () => pageMeta(PATH),
  component: () => <SitePage path={PATH} />,
});
