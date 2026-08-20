import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";

const PATH = "/pmb/daftar";

export const Route = createFileRoute("/pmb/daftar")({
  head: () => pageMeta(PATH),
  component: () => <SitePage path={PATH} />,
});
