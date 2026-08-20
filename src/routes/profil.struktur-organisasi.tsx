import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";

const PATH = "/profil/struktur-organisasi";

export const Route = createFileRoute("/profil/struktur-organisasi")({
  head: () => pageMeta(PATH),
  component: () => <SitePage path={PATH} />,
});
