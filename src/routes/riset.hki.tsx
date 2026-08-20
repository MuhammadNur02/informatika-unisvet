import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";

const PATH = "/riset/hki";

export const Route = createFileRoute("/riset/hki")({
  head: () => pageMeta(PATH),
  component: () => <SitePage path={PATH} />,
});
