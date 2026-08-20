import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";

const PATH = "/profil/akreditasi";

export const Route = createFileRoute("/profil/akreditasi")({
  head: () => pageMeta(PATH),
  component: () => <SitePage path={PATH} />,
});
