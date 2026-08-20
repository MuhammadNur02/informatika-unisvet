import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";

const PATH = "/akademik/kurikulum";

export const Route = createFileRoute("/akademik/kurikulum")({
  head: () => pageMeta(PATH),
  component: () => <SitePage path={PATH} />,
});
