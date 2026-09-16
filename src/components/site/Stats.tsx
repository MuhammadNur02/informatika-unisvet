import { Users, GraduationCap, FlaskConical, Award } from "lucide-react";
import { Counter } from "./Counter";
import { Reveal } from "./Reveal";
import Silk from "./Silk";
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
      <div className="relative mx-auto max-w-6xl rounded-[2rem] border-2 border-black bg-stats-panel p-5 shadow-[var(--shadow-lift)] dark:border-accent/40 dark:bg-white sm:p-7">
        {/* Subtle gradient accent at top */}
        <div
          className="absolute -top-1 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
          aria-hidden
        />

        {/* Satu instance Silk (React Bits) di belakang SELURUH kartu — bukan per item —
            supaya animasinya terasa menyatu sebagai satu latar hidup, bukan potongan
            terpisah. Kartu ini selalu putih di kedua mode (dark:bg-white), jadi warnanya
            dikunci ke maroon brand; tidak bergantung tema situs. */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]" aria-hidden>
          <Silk color="#f2eced" speed={2.5} scale={0.7} noiseIntensity={2.8} rotation={0.43} />
        </div>

        <div className="relative z-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x-2 lg:divide-black/20">
          {stats.map((stat, i) => {
            const Icon = ICONS[i % ICONS.length]!;
            const parsed = parseValue(stat.value);
            return (
              <Reveal key={`${stat.label}-${i}`} delay={i * 0.08}>
                <div className="group flex flex-col items-center gap-1.5 rounded-2xl bg-white/65 px-3 py-1.5 text-center backdrop-blur-sm lg:px-6">
                  <span className="flex min-h-11 items-center justify-center text-xl font-semibold tracking-tight text-primary sm:min-h-12 sm:text-2xl dark:text-black">
                    {"text" in parsed ? (
                      parsed.text
                    ) : (
                      <Counter value={parsed.number} suffix={parsed.suffix} />
                    )}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground dark:text-neutral-600">
                    <Icon className="size-3 text-accent dark:text-neutral-600" /> {stat.label}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
