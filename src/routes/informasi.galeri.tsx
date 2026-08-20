import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";

const PATH = "/informasi/galeri";

export const Route = createFileRoute("/informasi/galeri")({
  head: () => pageMeta(PATH),
  component: () => <SitePage path={PATH} />,
});
