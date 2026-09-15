import { useEffect, useState } from "react";
import { Instagram, Facebook, Youtube, Music2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo-unisvet.png";
import { useFooterContent } from "@/lib/site-content";
import Dither from "@/components/site/Dither";
import {
  GoogleMapsIcon,
  PhoneCallIcon,
  WhatsAppIcon,
  GmailIcon,
} from "@/components/site/BrandIcons";

// Merah maroon (mode terang) & biru (mode gelap) untuk gelombang Dither, sebagai
// pecahan RGB 0-1 (bukan hex) karena itu format yang dipakai shader-nya.
const WAVE_COLOR_LIGHT: [number, number, number] = [0x52 / 255, 0x00 / 255, 0x00 / 255];
const WAVE_COLOR_DARK: [number, number, number] = [0x07 / 255, 0x00 / 255, 0x43 / 255];

/**
 * Sinkron ke class "dark" di <html> yang di-toggle ThemeToggle. Tidak ada
 * event/context bersama untuk perubahan tema di app ini, jadi dipantau
 * langsung lewat MutationObserver supaya warna Dither ikut berubah seketika
 * saat tema di-toggle, bukan cuma pas footer di-mount ulang.
 */
function useIsDarkMode() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    setDark(root.classList.contains("dark"));
    const observer = new MutationObserver(() => setDark(root.classList.contains("dark")));
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return dark;
}

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

export function SiteFooter() {
  const footer = useFooterContent();
  const isDark = useIsDarkMode();
  const socials = [
    { label: "Instagram", icon: Instagram, href: footer.socials.instagram },
    { label: "YouTube", icon: Youtube, href: footer.socials.youtube },
    { label: "Facebook", icon: Facebook, href: footer.socials.facebook },
    { label: "TikTok", icon: Music2, href: footer.socials.tiktok },
  ].filter((s) => !!s.href);

  return (
    <footer
      id="kontak"
      className="relative overflow-hidden bg-[#520000] text-hero-foreground dark:bg-[#070043]"
    >
      {/* Fallback CSS di atas dipakai kalau WebGL gagal init; begitu Canvas Dither
          hidup, ia menutupinya total (shader-nya selalu opaque). */}
      <Dither
        className="absolute inset-0"
        waveColor={isDark ? WAVE_COLOR_DARK : WAVE_COLOR_LIGHT}
        backgroundColor={[0, 0, 0]}
        waveFrequency={6}
        waveAmplitude={0.11}
        waveSpeed={0.03}
        colorNum={2.5}
        mouseRadius={0.5}
        enableMouseInteraction
      />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-hero-foreground">
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
                <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-hero-foreground/60">
                  Universitas Ivet Semarang
                </span>
                <span className="block text-base font-bold">Pendidikan Informatika</span>
                <span className="block text-[10px] text-hero-foreground/55">UNISVET Semarang</span>
              </span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-hero-foreground/70">{footer.about}</p>
            <div className="mt-6 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-hero-foreground/15 bg-hero-foreground/5 text-hero-foreground/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-accent">
              Tautan Cepat
            </h3>
            <ul className="mt-5 space-y-3">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-hero-foreground/70 transition-colors hover:text-accent"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-accent">
              Portal Akademik
            </h3>
            <ul className="mt-5 space-y-3">
              {footer.portals.map((p) => (
                <li key={p.label}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-hero-foreground/70 transition-colors hover:text-accent"
                  >
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-accent">Kontak</h3>
            <ul className="mt-5 space-y-4 text-sm text-hero-foreground/70">
              <li className="flex items-start gap-3">
                <GoogleMapsIcon className="mt-0.5 size-5 shrink-0" />
                <span>{footer.address}</span>
              </li>
              {footer.phone ? (
                <li className="flex items-center gap-3">
                  <PhoneCallIcon className="size-5 shrink-0" />
                  <a
                    href={`tel:${footer.phone.replace(/\D/g, "")}`}
                    className="transition-colors hover:text-accent"
                  >
                    {footer.phone}
                  </a>
                </li>
              ) : null}
              {footer.waAdmin ? (
                <li className="flex items-center gap-3">
                  <WhatsAppIcon className="size-5 shrink-0" />
                  <a
                    href={`https://wa.me/${footer.waAdmin}`}
                    className="transition-colors hover:text-accent"
                  >
                    WhatsApp Admin {formatWa(footer.waAdmin)}
                  </a>
                </li>
              ) : null}
              {footer.waKaprodi ? (
                <li className="flex items-center gap-3">
                  <WhatsAppIcon className="size-5 shrink-0" />
                  <a
                    href={`https://wa.me/${footer.waKaprodi}`}
                    className="transition-colors hover:text-accent"
                  >
                    WhatsApp Kaprodi {formatWa(footer.waKaprodi)}
                  </a>
                </li>
              ) : null}
              {footer.email ? (
                <li className="flex items-center gap-3">
                  <GmailIcon className="size-5 shrink-0" />
                  <a
                    href={`mailto:${footer.email}`}
                    className="transition-colors hover:text-accent"
                  >
                    {footer.email}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-accent">
              Lokasi Kampus
            </h3>
            <div className="mt-5 overflow-hidden rounded-2xl border border-hero-foreground/15">
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

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-hero-foreground/10 pt-6 text-xs text-hero-foreground/55 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Program Studi Pendidikan Informatika — Universitas Ivet
            Semarang.
          </p>
          <p>{footer.note}</p>
        </div>
      </div>
    </footer>
  );
}
