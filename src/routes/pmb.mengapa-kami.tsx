import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";

const PATH = "/pmb/mengapa-kami";

export const Route = createFileRoute("/pmb/mengapa-kami")({
  head: () => pageMeta(PATH),
  component: () => <SitePage path={PATH} />,
});
