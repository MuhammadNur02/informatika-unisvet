import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";

const PATH = "/riset/inovasi";

export const Route = createFileRoute("/riset/inovasi")({
  head: () => pageMeta(PATH),
  component: () => <SitePage path={PATH} />,
});
