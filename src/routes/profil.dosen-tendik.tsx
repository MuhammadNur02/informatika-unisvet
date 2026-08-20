import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";

const PATH = "/profil/dosen-tendik";

export const Route = createFileRoute("/profil/dosen-tendik")({
  head: () => pageMeta(PATH),
  component: () => <SitePage path={PATH} />,
});
