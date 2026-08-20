import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";

const PATH = "/riset/publikasi";

export const Route = createFileRoute("/riset/publikasi")({
  head: () => pageMeta(PATH),
  component: () => <SitePage path={PATH} />,
});
