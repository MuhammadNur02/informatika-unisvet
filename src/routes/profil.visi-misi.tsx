import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";

const PATH = "/profil/visi-misi";

export const Route = createFileRoute("/profil/visi-misi")({
  head: () => pageMeta(PATH),
  component: () => <SitePage path={PATH} />,
});
