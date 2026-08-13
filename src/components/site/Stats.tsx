import { Users, GraduationCap, Handshake, Award } from "lucide-react";
import { Counter } from "./Counter";
import { Reveal } from "./Reveal";

const STATS = [
  { icon: Users, value: 428, suffix: "+", label: "Mahasiswa Aktif" },
  { icon: GraduationCap, value: 1250, suffix: "+", label: "Alumni Tersebar" },
  { icon: Handshake, value: 65, suffix: "+", label: "Mitra DUDI & Sekolah" },
  { icon: Award, value: 0, suffix: "", label: "Status Akreditasi", text: "Baik" },
];

export function Stats() {
  return (
    <section id="statistik" className="relative z-10 -mt-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-border bg-card p-6 shadow-[var(--shadow-lift)] sm:p-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="group flex flex-col items-center gap-3 rounded-2xl px-4 py-5 text-center transition-colors hover:bg-slate-surface">
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary/8 text-primary transition-transform duration-300 group-hover:scale-110">
                  <stat.icon className="size-5" />
                </span>
                <span className="text-3xl font-extrabold tracking-tight text-primary">
                  {stat.text ? stat.text : <Counter value={stat.value} suffix={stat.suffix} />}
                </span>
                <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}