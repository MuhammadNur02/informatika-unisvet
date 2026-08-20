import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";

const PATH = "/pmb/faq";

export const Route = createFileRoute("/pmb/faq")({
  head: () => pageMeta(PATH),
  component: () => <SitePage path={PATH} />,
});
