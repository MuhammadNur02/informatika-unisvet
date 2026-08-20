import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";

const PATH = "/akademik/cpl";

export const Route = createFileRoute("/akademik/cpl")({
  head: () => pageMeta(PATH),
  component: () => <SitePage path={PATH} />,
});
