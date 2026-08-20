import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";

const PATH = "/riset/kerja-sama";

export const Route = createFileRoute("/riset/kerja-sama")({
  head: () => pageMeta(PATH),
  component: () => <SitePage path={PATH} />,
});
