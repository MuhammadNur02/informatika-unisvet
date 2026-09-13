import { Reveal } from "./Reveal";
import labIot from "@/assets/lab-iot.jpg";
import labSmart from "@/assets/lab-smart.jpg";
import labMicroteaching from "@/assets/lab-microteaching.jpg";
import libCampus from "@/assets/lib-campus.jpg";
import dosen1 from "@/assets/dosen-1.jpg";
import dosen2 from "@/assets/dosen-2.jpg";
import dosen3 from "@/assets/dosen-3.jpg";
import dosen4 from "@/assets/dosen-4.jpg";
import dosen5 from "@/assets/dosen-5.jpg";
import dosen6 from "@/assets/dosen-6.jpg";

const DOSEN = [
  { 
    name: "R. Irlanto Sudomo, M.Pd.", 
    role: "Wakil Rektor II Unisvet", 
    interest: "Pendidikan, Profesi Kependidikan, & Manajemen Tata Kelola Institusi",
    image: dosen1 
  },
  { 
    name: "Dr. Herry Sulendro Mangiri, S.T., M.Eng.", 
    role: "Dekan F. Maritim", 
    interest: "Teknik, Invensi Teknologi Terapan, & Penjaminan Mutu",
    image: dosen2 
  },
  { 
    name: "Dr. Afis Pratama, S.T., M.Pd.", 
    role: "Ka. LPPM Unisvet", 
    interest: "Pendidikan Informatika & Penjaminan Mutu Akademik",
    image: dosen3 
  },
  { 
    name: "Handini Arga Damar Rani, M.Kom.", 
    role: "Ka. Lab. TIK F.SAINTEK", 
    interest: "Data Mining & Ilmu Komputer",
    image: dosen4 
  },
  { 
    name: "Adi Nova Trisetiyanto, S.Pd., M.Pd.", 
    role: "Ka. Prodi P. Informatika", 
    interest: "Media Pembelajaran Digital & Research & Development",
    image: dosen5 
  },
  { 
    name: "Henny Prasetyani, M.Pd.", 
    role: "Koord. PMB P. Informatika", 
    interest: "Teknologi Informasi & Pengabdian Masyarakat",
    image: dosen6 
  },
];

const FASILITAS = [
  {
    name: "Laboratorium Komputer Lanjut",
    image: labIot,
    desc: "Workstation pemrograman, jaringan, IoT, dan purwarupa sistem cerdas.",
  },
  {
    name: "Microteaching Studio",
    image: labMicroteaching,
    desc: "Studio latihan mengajar dengan perekaman video untuk evaluasi pedagogi.",
  },
  {
    name: "Smart Classroom",
    image: labSmart,
    desc: "Ruang kelas interaktif dengan papan digital dan konferensi hibrida.",
  },
  {
    name: "Perpustakaan & E-Library",
    image: libCampus,
    desc: "Ruang baca modern dengan akses jurnal digital dan repositori kampus.",
  },
];

/** Heading versi terang-di-atas-gelap — section ini beda dari section terang lain di beranda. */
function DarkSectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-hero-foreground/20 bg-hero-foreground/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-hero-foreground sm:text-4xl">{title}</h2>
      <p className="mt-3 text-base leading-relaxed text-hero-foreground/70">{description}</p>
    </Reveal>
  );
}

/** Section gelap ("team spotlight") — pita gelap kedua di beranda, kontras dengan section terang sekitarnya. */
export function Faculty() {
  return (
    <section id="dosen" className="relative overflow-hidden bg-hero-gradient py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-mesh opacity-40" aria-hidden />
      <div className="pointer-events-none absolute top-20 right-10 h-80 w-80 rounded-full bg-accent/10 blur-3xl float-shape-delayed" aria-hidden />
      <div className="pointer-events-none absolute bottom-20 left-1/4 h-64 w-64 rounded-full bg-hero-foreground/5 blur-3xl float-shape-slow" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <DarkSectionHeading
          eyebrow="Profil Pengajar"
          title="Dosen & Tenaga Pendidik"
          description="Didampingi dosen berkualifikasi magister dan doktor dengan fokus riset pendidikan dan teknologi informasi."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DOSEN.map((d, i) => (
            <Reveal key={d.name} delay={(i % 3) * 0.08}>
              <article className="card-glass-dark flex h-full flex-col items-center rounded-3xl p-7 text-center">
                <div className="mb-5 h-36 w-36 shrink-0 overflow-hidden rounded-3xl bg-hero-foreground/10">
                  {d.image ? (
                    <img src={d.image} alt={d.name} className="h-full w-full object-cover object-top" />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-4xl font-bold text-hero-foreground">
                      {d.name.charAt(0)}
                    </span>
                  )}
                </div>

                <h3 className="min-h-14 text-lg font-bold leading-snug text-hero-foreground">{d.name}</h3>
                <p className="mt-1 min-h-8 text-sm font-semibold text-accent">{d.role}</p>

                <div className="mt-auto flex w-full items-center justify-center border-t border-hero-foreground/15 pt-4">
                  <span className="inline-block rounded-full bg-hero-foreground/10 px-3.5 py-1.5 text-xs font-semibold text-hero-foreground/85">
                    {d.interest}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div id="fasilitas" className="mt-20">
          <DarkSectionHeading
            eyebrow="Fasilitas"
            title="Ruang Belajar & Laboratorium"
            description="Fasilitas penunjang praktik yang mendukung pembelajaran berbasis proyek."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FASILITAS.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.08}>
                <article className="card-glass-dark group relative h-72 overflow-hidden rounded-3xl">
                  <img
                    src={f.image}
                    alt={f.name}
                    loading="lazy"
                    width={900}
                    height={700}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.1_0.04_25/0.95),transparent_60%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="text-lg font-bold text-hero-foreground">{f.name}</h3>
                    <p className="mt-1 text-sm text-hero-foreground/75">{f.desc}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
