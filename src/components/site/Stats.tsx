import { Users, GraduationCap, FlaskConical, Award } from "lucide-react";
import { Counter } from "./Counter";
import { Reveal } from "./Reveal";
import { useHomeContent } from "@/lib/site-content";

const ICONS = [Users, GraduationCap, Award, FlaskConical];

/** Pisahkan "500+" menjadi angka 500 dan akhiran "+"; nilai non-angka tetap teks. */
function parseValue(value: string) {
  const match = /^(\d+)(.*)$/.exec(value.trim());
  if (!match) return { text: value } as const;
  return { number: Number(match[1]), suffix: match[2] ?? "" } as const;
}

export function Stats() {
  const { stats } = useHomeContent();

  return (
    <section id="statistik" className="relative z-10 -mt-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-border bg-card p-6 shadow-[var(--shadow-lift)] sm:p-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = ICONS[i % ICONS.length]!;
            const parsed = parseValue(stat.value);
            return (
              <Reveal key={`${stat.label}-${i}`} delay={i * 0.08}>
                <div className="group flex flex-col items-center gap-3 rounded-2xl px-4 py-5 text-center transition-colors hover:bg-slate-surface">
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary/8 text-primary transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-5" />
                  </span>
                  <span className="text-3xl font-extrabold tracking-tight text-primary">
                    {"text" in parsed ? (
                      parsed.text
                    ) : (
                      <Counter value={parsed.number} suffix={parsed.suffix} />
                    )}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
