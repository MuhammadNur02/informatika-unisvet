import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";

const PATH = "/akademik/magang-mbkm";

export const Route = createFileRoute("/akademik/magang-mbkm")({
  head: () => pageMeta(PATH),
  component: () => <SitePage path={PATH} />,
});
