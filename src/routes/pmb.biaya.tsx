import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";

const PATH = "/pmb/biaya";

export const Route = createFileRoute("/pmb/biaya")({
  head: () => pageMeta(PATH),
  component: () => <SitePage path={PATH} />,
});
