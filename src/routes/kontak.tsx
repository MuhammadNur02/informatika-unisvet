import { createFileRoute } from "@tanstack/react-router";
import { SitePage, pageMeta } from "@/components/site/SitePage";
import { KontakForm } from "@/components/site/KontakForm";

const PATH = "/kontak";

export const Route = createFileRoute("/kontak")({
  head: () => pageMeta(PATH),
  component: () => (
    <SitePage path={PATH}>
      <KontakForm />
    </SitePage>
  ),
});
