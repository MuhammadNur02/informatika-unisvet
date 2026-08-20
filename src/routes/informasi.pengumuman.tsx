import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";

const PATH = "/informasi/pengumuman";

export const Route = createFileRoute("/informasi/pengumuman")({
  head: () => pageMeta(PATH),
  component: () => <SitePage path={PATH} />,
});
