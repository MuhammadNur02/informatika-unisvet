import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";
import { GaleriDinamis } from "@/components/site/GaleriDinamis";

const PATH = "/informasi/galeri";

export const Route = createFileRoute("/informasi/galeri")({
  head: () => pageMeta(PATH),
  component: () => (
    <SitePage path={PATH}>
      <GaleriDinamis />
    </SitePage>
  ),
});
