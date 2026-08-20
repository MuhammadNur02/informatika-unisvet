import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";

const PATH = "/profil/fasilitas";

export const Route = createFileRoute("/profil/fasilitas")({
  head: () => pageMeta(PATH),
  component: () => <SitePage path={PATH} />,
});
