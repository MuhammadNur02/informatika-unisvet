import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";
import { DokumenList } from "@/components/site/DokumenList";

const PATH = "/informasi/dokumen";

export const Route = createFileRoute("/informasi/dokumen")({
  head: () => pageMeta(PATH),
  component: () => (
    <SitePage path={PATH}>
      <DokumenList />
    </SitePage>
  ),
});
