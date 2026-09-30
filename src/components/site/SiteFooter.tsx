import { useState } from "react";
import { Instagram, Facebook, Youtube, Music2, MapPin, ExternalLink, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo-unisvet.png";
import { useFooterContent } from "@/lib/site-content";
import { GoogleMapsIcon, PhoneCallIcon, WhatsAppIcon, GmailIcon } from "@/components/site/BrandIcons";

const LINKS = [
  { label: "Beranda", to: "/" },
  { label: "Visi & Misi", to: "/profil/visi-misi" },
  { label: "Kurikulum", to: "/akademik/kurikulum" },
  { label: "Dosen & Tendik", to: "/profil/dosen-tendik" },
  { label: "Fasilitas", to: "/profil/fasilitas" },
  { label: "Berita & Agenda", to: "/informasi/berita" },
  { label: "Alumni", to: "/kemahasiswaan/alumni" },
  { label: "PMB", to: "/pmb/daftar" },
  { label: "Unduh Dokumen", to: "/informasi/dokumen" },
  { label: "Kontak", to: "/kontak" },
];

function formatWa(number: string) {
  const digits = number.replace(/\D/g, "");
  if (!digits.startsWith("62")) return `+${digits}`;
  const rest = digits.slice(2);
  return `+62 ${rest.slice(0, 3)}-${rest.slice(3, 7)}-${rest.slice(7)}`.replace(/-+$/, "");
}

/**
 * Peta dimuat HANYA saat diminta (pola "facade"). Iframe Google Maps menarik
 * ±1 MB JavaScript pihak ketiga — sebelumnya ikut termuat di footer SETIAP
 * halaman walau hampir tidak pernah dipakai.
 */
function MapFacade({ query, address }: { query: string; address: string }) {
  const [show, setShow] = useState(false);
  const openUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  if (show) {
    return (
      <iframe
        title="Peta lokasi Universitas Ivet Semarang"
        src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
        referrerPolicy="no-referrer-when-downgrade"
        className="h-52 w-full rounded-2xl border border-hero-foreground/15"
      />
    );
  }

  return (
    <div className="relative flex h-52 flex-col justify-between overflow-hidden rounded-2xl border border-hero-foreground/15 bg-hero-foreground/[0.04] p-5">
      <div className="bg-grid-faint pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div className="relative flex items-start gap-3">
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-primary-deep">
          <MapPin className="size-5" />
        </span>
        <p className="line-clamp-3 text-sm leading-relaxed text-hero-foreground/75">{address}</p>
      </div>
      <div className="relative flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setShow(true)}
          className="inline-flex items-center gap-1.5 rounded-full bg-hero-foreground px-4 py-2 text-xs font-semibold text-primary-deep transition-colors hover:bg-accent"
        >
          <GoogleMapsIcon className="size-4" /> Tampilkan peta
        </button>
        <a
          href={openUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-hero-foreground/25 px-4 py-2 text-xs font-semibold text-hero-foreground transition-colors hover:border-accent hover:text-accent"
        >
          Buka Maps <ExternalLink className="size-3.5" />
        </a>
      </div>
    </div>
  );
}

function FooterHeading({ children }: { children: string }) {
  return <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{children}</h3>;
}

const linkClass =
  "inline-flex items-center gap-1 text-sm text-hero-foreground/70 transition-colors hover:text-hero-foreground";

/**
 * Footer situs — struktur mengikuti 21st.dev "Large Name Footer": kolom
 * tautan di atas, wordmark raksasa memudar di dasar. Latar sepenuhnya CSS
 * (gradien + grid tipis) sebagai ganti shader WebGL "Dither", yang dulu
 * memaksa three.js + postprocessing (±400 KB gzip) termuat di SEMUA halaman
 * dan titik-titik merahnya mengganggu keterbacaan teks.
 */
export function SiteFooter() {
  const footer = useFooterContent();
  const socials = [
    { label: "Instagram", icon: Instagram, href: footer.socials.instagram },
    { label: "YouTube", icon: Youtube, href: footer.socials.youtube },
    { label: "Facebook", icon: Facebook, href: footer.socials.facebook },
    { label: "TikTok", icon: Music2, href: footer.socials.tiktok },
  ].filter((s) => !!s.href);

  return (
    <footer id="kontak" className="bg-footer relative overflow-hidden text-hero-foreground">
      <div
        className="bg-grid-faint pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-hero-foreground">
                <img
                  src={logo}
                  alt="Logo Universitas Ivet Semarang"
                  loading="lazy"
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain"
                />
              </span>
              <span className="leading-tight">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-hero-foreground/60">
                  Universitas Ivet Semarang
                </span>
                <span className="block text-base font-bold">Pendidikan Informatika</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-hero-foreground/70">{footer.about}</p>
            {socials.length > 0 ? (
              <div className="mt-6 flex gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-hero-foreground/15 bg-hero-foreground/5 text-hero-foreground/80 transition-[translate,border-color,color] duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
                  >
                    <s.icon className="size-4" />
                  </a>
                ))}
              </div>
            ) : null}
            <Link
              to="/pmb/daftar"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-gold)] px-5 py-2.5 text-sm font-semibold text-primary-deep shadow-(--shadow-card) transition-[translate,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-(--shadow-glow)"
            >
              Daftar PMB <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-[1fr_0.9fr_1.3fr]">
            <div>
              <FooterHeading>Tautan Cepat</FooterHeading>
              <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-1">
                {LINKS.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className={linkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <FooterHeading>Portal Akademik</FooterHeading>
              <ul className="mt-5 space-y-3">
                {footer.portals.map((p) => (
                  <li key={p.label}>
                    <a href={p.href} target="_blank" rel="noreferrer" className={linkClass}>
                      {p.label}
                      <ArrowUpRight className="size-3.5 opacity-50" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sm:col-span-2 xl:col-span-1">
              <FooterHeading>Kontak</FooterHeading>
              <ul className="mt-5 space-y-3.5 text-sm text-hero-foreground/75">
                {footer.phone ? (
                  <li className="flex items-center gap-3">
                    <PhoneCallIcon className="size-5 shrink-0" />
                    <a href={`tel:${footer.phone.replace(/\D/g, "")}`} className="transition-colors hover:text-accent">
                      {footer.phone}
                    </a>
                  </li>
                ) : null}
                {footer.waAdmin ? (
                  <li className="flex items-center gap-3">
                    <WhatsAppIcon className="size-5 shrink-0" />
                    <a href={`https://wa.me/${footer.waAdmin}`} className="transition-colors hover:text-accent">
                      Admin {formatWa(footer.waAdmin)}
                    </a>
                  </li>
                ) : null}
                {footer.waKaprodi ? (
                  <li className="flex items-center gap-3">
                    <WhatsAppIcon className="size-5 shrink-0" />
                    <a href={`https://wa.me/${footer.waKaprodi}`} className="transition-colors hover:text-accent">
                      Kaprodi {formatWa(footer.waKaprodi)}
                    </a>
                  </li>
                ) : null}
                {footer.email ? (
                  <li className="flex items-center gap-3">
                    <GmailIcon className="size-5 shrink-0" />
                    <a href={`mailto:${footer.email}`} className="break-all transition-colors hover:text-accent">
                      {footer.email}
                    </a>
                  </li>
                ) : null}
              </ul>
              <div className="mt-6">
                <MapFacade query={footer.mapQuery} address={footer.address} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-2 border-t border-hero-foreground/10 pt-6 text-center text-xs text-hero-foreground/55 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} Program Studi Pendidikan Informatika — Universitas Ivet Semarang.</p>
          <p>{footer.note}</p>
        </div>
      </div>

      {/* Wordmark raksasa (21st.dev "Large Name Footer") — dekoratif, terpotong di dasar. */}
      <div className="relative mt-4 select-none overflow-hidden text-center" aria-hidden>
        <span className="footer-wordmark block translate-y-[22%] text-[clamp(2.5rem,12.6vw,14rem)] font-extrabold leading-[0.9] tracking-tighter">
          INFORMATIKA
        </span>
      </div>
    </footer>
  );
}
