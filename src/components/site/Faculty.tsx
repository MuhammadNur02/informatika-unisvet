import { Reveal, SectionHeading } from "./Reveal";
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

export function Faculty() {
  return (
    <section id="dosen" className="bg-slate-surface py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Profil Pengajar"
          title="Dosen & Tenaga Pendidik"
          description="Didampingi dosen berkualifikasi magister dan doktor dengan fokus riset pendidikan dan teknologi informasi."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DOSEN.map((d, i) => (
            <Reveal key={d.name} delay={(i % 3) * 0.08}>
              <article className="card-elevated flex h-full flex-col items-center text-center rounded-3xl p-7">
                {/* Foto Profil */}
                <div className="w-36 h-36 shrink-0 overflow-hidden rounded-3xl bg-[image:var(--gradient-hero)] shadow-md mb-5 flex items-center justify-center">
                  {d.image ? (
                    <img src={d.image} alt={d.name} className="h-full w-full object-cover object-top" />
                  ) : (
                    <span className="text-4xl font-bold text-primary-foreground">{d.name.charAt(0)}</span>
                  )}
                </div>
                
                {/* Informasi Teks dengan tinggi minimum agar simetris */}
                <div className="flex flex-col flex-grow justify-between w-full">
                  <div>
                    {/* Mengatur min-height untuk nama agar muat 2 baris dengan rapi */}
                    <div className="min-h-[3.5rem] flex items-center justify-center">
                      <h3 className="text-lg font-bold leading-snug text-foreground">{d.name}</h3>
                    </div>
                    {/* Mengatur min-height untuk jabatan */}
                    <div className="min-h-[2rem] flex items-center justify-center mt-1">
                      <p className="text-sm font-semibold text-primary/80">{d.role}</p>
                    </div>
                  </div>

                  {/* Badge Bidang Keahlian */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-center flex-grow">
                    <span className="inline-block rounded-full bg-accent/15 px-3.5 py-1.5 text-xs font-semibold text-accent-foreground">
                      {d.interest}
                    </span>
                  </div>
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