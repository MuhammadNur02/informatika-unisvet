import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";

const PATH = "/kemahasiswaan/alumni";

export const Route = createFileRoute("/kemahasiswaan/alumni")({
  head: () => pageMeta(PATH),
  component: () => <SitePage path={PATH} />,
});
