import { Users, GraduationCap, FlaskConical, Award } from "lucide-react";
import { Counter } from "./Counter";
import { useHomeContent } from "@/lib/site-content";
import { onSpotlightMove } from "@/lib/use-spotlight";

const ICONS = [Users, GraduationCap, Award, FlaskConical];

/** Pisahkan "500+" menjadi angka 500 dan akhiran "+"; nilai non-angka tetap teks. */
function parseValue(value: string) {
  const match = /^(\d+)(.*)$/.exec(value.trim());
  if (!match) return { text: value } as const;
  return { number: Number(match[1]), suffix: match[2] ?? "" } as const;
}

/**
 * Pita statistik yang menumpang di tepi bawah hero. Sebelumnya dilatari
 * shader WebGL "Silk" yang terus dirender tiap frame (dan tampil seperti
 * motif zebra di mode terang) — sekarang panel solid + spotlight CSS
 * (pola SpotlightCard React Bits) yang hanya bereaksi saat mouse lewat.
 */
export function Stats() {
  const { stats } = useHomeContent();

  return (
    <section id="statistik" className="relative z-10 -mt-12 px-4 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[1.75rem] border border-primary/10 bg-card shadow-(--shadow-lift) dark:border-white/10">
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
          aria-hidden
        />
        <ul className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = ICONS[i % ICONS.length]!;
            const parsed = parseValue(stat.value);
            return (
              <li
                key={`${stat.label}-${i}`}
                onPointerMove={onSpotlightMove}
                className="spotlight flex flex-col items-center gap-2 border-border px-4 py-6 text-center sm:py-8 max-lg:[&:nth-child(-n+2)]:border-b max-lg:[&:nth-child(odd)]:border-r lg:[&:not(:last-child)]:border-r"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-accent/15 text-accent-foreground ring-1 ring-accent/25 dark:text-accent">
                  <Icon className="size-4.5" />
                </span>
                <span className="text-2xl font-extrabold tracking-tight text-primary sm:text-3xl dark:text-hero-foreground">
                  {"text" in parsed ? (
                    parsed.text
                  ) : (
                    <Counter value={parsed.number} suffix={parsed.suffix} />
                  )}
                </span>
                <span className="text-xs font-medium text-muted-foreground sm:text-sm">{stat.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
