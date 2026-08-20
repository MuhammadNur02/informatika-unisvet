import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";

const PATH = "/pmb/jalur-pendaftaran";

export const Route = createFileRoute("/pmb/jalur-pendaftaran")({
  head: () => pageMeta(PATH),
  component: () => <SitePage path={PATH} />,
});
