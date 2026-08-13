import { Reveal, SectionHeading } from "./Reveal";
import labIot from "@/assets/lab-iot.jpg";
import labSmart from "@/assets/lab-smart.jpg";
import labMicroteaching from "@/assets/lab-microteaching.jpg";
import libCampus from "@/assets/lib-campus.jpg";

const DOSEN = [
  { name: "Dr. Rahmawati Saputri, M.Kom.", role: "Koordinator Program Studi", interest: "Educational Data Mining" },
  { name: "Adi Nugroho, S.Pd., M.Cs.", role: "Dosen Rekayasa Perangkat Lunak", interest: "Web Engineering & DevOps" },
  { name: "Siti Halimah, M.Pd.", role: "Dosen Kurikulum & Pembelajaran", interest: "Digital Pedagogy" },
  { name: "Bayu Prakoso, M.T.", role: "Dosen Jaringan & IoT", interest: "Smart Systems & IoT" },
  { name: "Nurul Aini, M.Kom.", role: "Dosen Multimedia", interest: "Interactive Media Learning" },
  { name: "Fajar Ramadhan, M.Cs.", role: "Dosen Kecerdasan Artifisial", interest: "Machine Learning for Education" },
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

function initials(name: string) {
  return name
    .replace(/(Dr\.|S\.Pd\.|M\.Kom\.|M\.Cs\.|M\.Pd\.|M\.T\.|,)/g, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

export function Faculty() {
  return (
    <section id="dosen" className="bg-slate-surface py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Profil Pengajar"
          title="Dosen & Tenaga Pendidik"
          description="Didampingi dosen berkualifikasi magister dan doktor dengan fokus riset pendidikan dan teknologi informasi."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DOSEN.map((d, i) => (
            <Reveal key={d.name} delay={(i % 3) * 0.08}>
              <article className="card-elevated flex h-full items-start gap-4 rounded-3xl p-5">
                <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[image:var(--gradient-hero)] text-base font-bold text-primary-foreground">
                  {initials(d.name)}
                </span>
                <div>
                  <h3 className="text-base font-bold leading-snug text-foreground">{d.name}</h3>
                  <p className="mt-1 text-sm font-medium text-primary/70">{d.role}</p>
                  <p className="mt-2 inline-flex rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent-foreground">
                    {d.interest}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div id="fasilitas" className="mt-20">
          <SectionHeading
            eyebrow="Fasilitas"
            title="Ruang Belajar & Laboratorium"
            description="Fasilitas penunjang praktik yang mendukung pembelajaran berbasis proyek."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FASILITAS.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.08}>
                <article className="card-elevated group relative h-72 overflow-hidden rounded-3xl">
                  <img
                    src={f.image}
                    alt={f.name}
                    loading="lazy"
                    width={900}
                    height={700}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.21_0.075_265/0.92),transparent_60%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="text-lg font-bold text-primary-foreground">{f.name}</h3>
                    <p className="mt-1 text-sm text-primary-foreground/75">{f.desc}</p>
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