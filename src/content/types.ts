export type Block =
  | { type: "prose"; title?: string; paragraphs: string[] }
  | { type: "list"; title?: string; items: string[] }
  | { type: "cards"; title?: string; items: { title: string; desc: string; tag?: string }[] }
  | { type: "steps"; title?: string; items: { title: string; desc: string }[] }
  | { type: "table"; title?: string; note?: string; head: string[]; rows: string[][] }
  | {
      type: "people";
      title?: string;
      items: { name: string; role: string; degree: string; interest: string; photo: string }[];
    }
  | { type: "org"; title?: string; top: string; topName: string; nodes: { role: string; name: string }[] }
  | { type: "gallery"; title?: string; items: { name: string; desc: string; image: string }[] }
  | { type: "faq"; title?: string; items: { q: string; a: string }[] }
  | { type: "stats"; title?: string; items: { label: string; value: string }[] }
  | { type: "timeline"; title?: string; items: { date: string; title: string; desc: string }[] }
  | { type: "quotes"; title?: string; items: { name: string; role: string; quote: string }[] }
  | { type: "cta"; title: string; desc: string; label: string; href: string }
  | { type: "image"; title?: string; url: string; caption?: string }
  | { type: "video"; title?: string; url: string; caption?: string; poster?: string };

export type PageContent = {
  eyebrow: string;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  blocks: Block[];
};