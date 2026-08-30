type WaveLine = {
  top: string;
  duration: number;
  delay: number;
  opacity: number;
};

const WAVES: Array<WaveLine> = [
  { top: "15%", duration: 12, delay: 0, opacity: 0.7 },
  { top: "35%", duration: 16, delay: -4, opacity: 0.5 },
  { top: "55%", duration: 14, delay: -2, opacity: 0.6 },
  { top: "75%", duration: 18, delay: -6, opacity: 0.4 },
];

/** Lapisan animasi gelombang kain/bendera elegan berwarna maroon tua. */
export function SmokeLayer({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden>
      {WAVES.map((wave, i) => (
        <div
          key={i}
          className="absolute left-[-20%] right-[-20%] h-[300px] animate-wave"
          style={{
            top: wave.top,
            opacity: wave.opacity,
            animationDuration: `${wave.duration}s`,
            animationDelay: `${wave.delay}s`,
            animationIterationCount: "infinite",
            animationTimingFunction: "ease-in-out",
            background:
              "linear-gradient(90deg, transparent, rgba(128, 0, 32, 0.35), rgba(80, 0, 20, 0.6), rgba(128, 0, 32, 0.35), transparent)",
            clipPath:
              "polygon(0% 50%, 10% 30%, 20% 50%, 30% 70%, 40% 50%, 50% 30%, 60% 50%, 70% 70%, 80% 50%, 90% 30%, 100% 50%, 100% 100%, 0% 100%)",
            filter: "blur(35px)",
          }}
        />
      ))}

      <style>{`
        @keyframes waveMotion {
          0% {
            transform: translateX(0%) translateY(0%) rotate(0deg) scaleY(1);
          }
          50% {
            transform: translateX(10%) translateY(-25px) rotate(2deg) scaleY(1.2);
          }
          100% {
            transform: translateX(0%) translateY(0%) rotate(0deg) scaleY(1);
          }
        }
        .animate-wave {
          animation-name: waveMotion;
        }
      `}</style>
    </div>
  );
}
