import { Layers, CalendarClock, MonitorSmartphone, Network, Target, Eye } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

const ITEMS = [
  {
    icon: Layers,
    title: "Dual Capability",
    desc: "Lulusan siap menjadi pendidik IT profesional sekaligus software & web developer yang kompeten.",
  },
  {
    icon: CalendarClock,
    title: "Flexi-Learning",
    desc: "Kelas reguler dan kelas karyawan dengan skema blended learning yang fleksibel bagi mahasiswa pekerja.",
  },
  {
    icon: MonitorSmartphone,
    title: "Smart Lab & Microteaching Studio",
    desc: "Laboratorium komputer lanjut, IoT, multimedia, dan studio microteaching untuk latihan mengajar terekam.",
  },
  {
    icon: Network,
    title: "Kemitraan Industri & Sekolah Mitra",
    desc: "Kolaborasi luas dengan DUDI, startup teknologi, dan sekolah mitra untuk magang serta PLP.",
  },
];

export function Advantages() {
  return (
    <section id="akademik" className="bg-slate-surface py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Keunggulan Prodi"
          title="Mengapa Memilih Kami"
          description="Empat pilar yang membuat Pendidikan Informatika Universitas Ivet Semarang relevan dengan kebutuhan dunia pendidikan dan industri teknologi."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <article className="card-elevated group h-full rounded-3xl p-6">
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-[image:var(--gradient-hero)] text-primary-foreground shadow-[var(--shadow-card)] transition-transform duration-300 group-hover:scale-110">
                  <item.icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div id="profil" className="mt-16 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="card-elevated h-full rounded-3xl p-8">
              <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-accent/15 text-accent-foreground">
                <Eye className="size-5" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-foreground">Visi</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Menjadi program studi unggul penghasil pendidik informatika yang profesional,
                berkarakter, dan adaptif terhadap perkembangan teknologi informasi di tingkat
                nasional pada tahun 2030.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card-elevated h-full rounded-3xl p-8">
              <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-accent/15 text-accent-foreground">
                <Target className="size-5" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-foreground">Misi</h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                <li>• Menyelenggarakan pembelajaran berbasis proyek dan teknologi digital.</li>
                <li>• Mengembangkan penelitian bidang pendidikan informatika & EdTech.</li>
                <li>• Melaksanakan pengabdian masyarakat berbasis literasi digital.</li>
                <li>• Memperluas kemitraan dengan sekolah, industri, dan komunitas teknologi.</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}