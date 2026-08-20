import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";

const PATH = "/informasi/event";

export const Route = createFileRoute("/informasi/event")({
  head: () => pageMeta(PATH),
  component: () => <SitePage path={PATH} />,
});
