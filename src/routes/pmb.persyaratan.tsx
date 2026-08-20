import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";

const PATH = "/pmb/persyaratan";

export const Route = createFileRoute("/pmb/persyaratan")({
  head: () => pageMeta(PATH),
  component: () => <SitePage path={PATH} />,
});
