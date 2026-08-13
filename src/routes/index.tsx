import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";
import { Stats } from "@/components/site/Stats";
import { Advantages } from "@/components/site/Advantages";
import { News } from "@/components/site/News";
import { Faculty } from "@/components/site/Faculty";
import { Testimonials } from "@/components/site/Testimonials";
import { CtaBanner } from "@/components/site/CtaBanner";
import { SiteFooter } from "@/components/site/SiteFooter";

const title = "Pendidikan Informatika — Universitas Ivet Semarang";
const description =
  "Program Studi Pendidikan Informatika Universitas Ivet Semarang: mencetak pendidik dan ahli teknologi informasi masa depan dengan kurikulum berbasis industri & EdTech.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <Stats />
        <Advantages />
        <News />
        <Faculty />
        <Testimonials />
        <CtaBanner />
      </main>
      <SiteFooter />
    </div>
  );
}
