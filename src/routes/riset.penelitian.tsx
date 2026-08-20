import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";

const PATH = "/riset/penelitian";

export const Route = createFileRoute("/riset/penelitian")({
  head: () => pageMeta(PATH),
  component: () => <SitePage path={PATH} />,
});
