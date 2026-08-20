import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";

const PATH = "/pmb/beasiswa";

export const Route = createFileRoute("/pmb/beasiswa")({
  head: () => pageMeta(PATH),
  component: () => <SitePage path={PATH} />,
});
