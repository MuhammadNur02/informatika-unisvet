import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";

const PATH = "/akademik/praktikum-proyek";

export const Route = createFileRoute("/akademik/praktikum-proyek")({
  head: () => pageMeta(PATH),
  component: () => <SitePage path={PATH} />,
});
