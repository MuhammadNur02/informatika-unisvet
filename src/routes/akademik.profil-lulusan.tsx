import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";

const PATH = "/akademik/profil-lulusan";

export const Route = createFileRoute("/akademik/profil-lulusan")({
  head: () => pageMeta(PATH),
  component: () => <SitePage path={PATH} />,
});
