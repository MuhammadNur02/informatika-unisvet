import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";

const PATH = "/akademik/mata-kuliah";

export const Route = createFileRoute("/akademik/mata-kuliah")({
  head: () => pageMeta(PATH),
  component: () => <SitePage path={PATH} />,
});
