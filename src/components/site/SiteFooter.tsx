import { MapPin, Mail, Phone, MessageCircle, Instagram, Facebook, Youtube, Music2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo-unisvet.png";
import { useFooterContent } from "@/lib/site-content";

const LINKS = [
  { label: "Beranda", to: "/" },
  { label: "Visi & Misi", to: "/profil/visi-misi" },
  { label: "Kurikulum", to: "/akademik/kurikulum" },
  { label: "Dosen & Tendik", to: "/profil/dosen-tendik" },
  { label: "Fasilitas", to: "/profil/fasilitas" },
  { label: "Berita & Agenda", to: "/informasi/berita" },
  { label: "Alumni", to: "/kemahasiswaan/alumni" },
  { label: "PMB", to: "/pmb/daftar" },
];

function formatWa(number: string) {
  const digits = number.replace(/\D/g, "");
  if (!digits.startsWith("62")) return `+${digits}`;
  const rest = digits.slice(2);
  return `+62 ${rest.slice(0, 3)}-${rest.slice(3, 7)}-${rest.slice(7)}`.replace(/-+$/, "");
}

export function SiteFooter() {
  const footer = useFooterContent();
  const socials = [
    { label: "Instagram", icon: Instagram, href: footer.socials.instagram },
    { label: "YouTube", icon: Youtube, href: footer.socials.youtube },
    { label: "Facebook", icon: Facebook, href: footer.socials.facebook },
    { label: "TikTok", icon: Music2, href: footer.socials.tiktok },
  ].filter((s) => !!s.href);

  return (
    <footer id="kontak" className="bg-primary-deep text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary-foreground">
                <img
                  src={logo}
                  alt="Logo Universitas Ivet Semarang"
                  loading="lazy"
                  width={48}
                  height={48}
                  className="h-9 w-9 object-contain"
                />
              </span>
              <span className="leading-tight">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/60">
                  Universitas Ivet Semarang
                </span>
              <span className="block text-base font-bold">Pendidikan Informatika</span>
              <span className="block text-[10px] text-primary-foreground/55">UNISVET Semarang</span>
              </span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-primary-foreground/70">{footer.about}</p>
            <div className="mt-6 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-primary-foreground/15 bg-primary-foreground/5 text-primary-foreground/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-accent">Tautan Cepat</h3>
            <ul className="mt-5 space-y-3">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-accent">Portal Akademik</h3>
            <ul className="mt-5 space-y-3">
              {footer.portals.map((p) => (
                <li key={p.label}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                  >
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-accent">Kontak</h3>
            <ul className="mt-5 space-y-4 text-sm text-primary-foreground/70">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
                <span>{footer.address}</span>
              </li>
              {footer.phone ? (
                <li className="flex gap-3">
                  <Phone className="size-4 shrink-0 text-accent" />
                  <a
                    href={`tel:${footer.phone.replace(/\D/g, "")}`}
                    className="transition-colors hover:text-accent"
                  >
                    {footer.phone}
                  </a>
                </li>
              ) : null}
              {footer.waAdmin ? (
                <li className="flex gap-3">
                  <MessageCircle className="size-4 shrink-0 text-accent" />
                  <a href={`https://wa.me/${footer.waAdmin}`} className="transition-colors hover:text-accent">
                    WhatsApp Admin {formatWa(footer.waAdmin)}
                  </a>
                </li>
              ) : null}
              {footer.waKaprodi ? (
                <li className="flex gap-3">
                  <MessageCircle className="size-4 shrink-0 text-accent" />
                  <a href={`https://wa.me/${footer.waKaprodi}`} className="transition-colors hover:text-accent">
                    WhatsApp Kaprodi {formatWa(footer.waKaprodi)}
                  </a>
                </li>
              ) : null}
              {footer.email ? (
                <li className="flex gap-3">
                  <Mail className="size-4 shrink-0 text-accent" />
                  <a href={`mailto:${footer.email}`} className="transition-colors hover:text-accent">
                    {footer.email}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-accent">Lokasi Kampus</h3>
            <div className="mt-5 overflow-hidden rounded-2xl border border-primary-foreground/15">
              <iframe
                title="Peta lokasi Universitas Ivet Semarang"
                src={`https://www.google.com/maps?q=${encodeURIComponent(footer.mapQuery)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-56 w-full border-0"
              />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-primary-foreground/10 pt-6 text-xs text-primary-foreground/55 sm:flex-row">
          <p>© {new Date().getFullYear()} Program Studi Pendidikan Informatika — Universitas Ivet Semarang.</p>
          <p>{footer.note}</p>
        </div>
      </div>
    </footer>
  );
}
