import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";

const PATH = "/profil/tentang";

export const Route = createFileRoute("/profil/tentang")({
  head: () => pageMeta(PATH),
  component: () => <SitePage path={PATH} />,
});
