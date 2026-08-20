import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";

const PATH = "/riset/pengabdian";

export const Route = createFileRoute("/riset/pengabdian")({
  head: () => pageMeta(PATH),
  component: () => <SitePage path={PATH} />,
});
