type CyberWave = {
  top: string;
  duration: number;
  delay: number;
  opacity: number;
  depth: number;
};

const CYBER_WAVES: Array<CyberWave> = [
  { top: "10%", duration: 14, delay: 0, opacity: 0.75, depth: 400 },
  { top: "30%", duration: 18, delay: -3, opacity: 0.6, depth: 300 },
  { top: "50%", duration: 15, delay: -6, opacity: 0.8, depth: 500 },
  { top: "70%", duration: 20, delay: -2, opacity: 0.55, depth: 350 },
  { top: "85%", duration: 16, delay: -8, opacity: 0.7, depth: 450 },
];

/** Lapisan animasi gelombang 3D futuristik bertema informatika (Neural Data Waves) berwarna maroon tua & emas. */
export function SmokeLayer({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ perspective: "1000px" }}
      aria-hidden
    >
      {/* Vignette gelap di pinggir & tengah agar kontras teks utama sangat tajam */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(40,0,10,0.4)_0%,rgba(15,0,5,0.9)_100%)] z-10" />

      {/* Lapisan Grid/Mesh 3D tipis ala Cyberpunk */}
      <div
        className="absolute inset-0 opacity-[0.08] z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(212,175,55,0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(212,175,55,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          transform: "rotateX(60deg) scale(2)",
          transformOrigin: "center top",
        }}
      />

      {/* Gelombang 3D Digital */}
      {CYBER_WAVES.map((wave, i) => (
        <div
          key={i}
          className="absolute left-[-25%] right-[-25%] h-[320px] animate-cyber-wave z-0"
          style={{
            top: wave.top,
            opacity: wave.opacity,
            animationDuration: `${wave.duration}s`,
            animationDelay: `${wave.delay}s`,
            animationIterationCount: "infinite",
            animationTimingFunction: "ease-in-out",
            background:
              "linear-gradient(90deg, rgba(80,0,20,0.2), rgba(139,0,37,0.7), rgba(212,175,55,0.25), rgba(139,0,37,0.7), rgba(80,0,20,0.2))",
            clipPath:
              "polygon(0% 45%, 12% 25%, 25% 55%, 38% 30%, 50% 60%, 65% 35%, 78% 50%, 90% 25%, 100% 45%, 100% 100%, 0% 100%)",
            filter: "blur(28px)",
            transform: `translateZ(${wave.depth}px) rotateX(15deg)`,
          }}
        />
      ))}

      <style>{`
        @keyframes cyberWaveMotion {
          0% {
            transform: translateX(0%) translateY(0%) rotateZ(0deg) scaleY(1);
          }
          33% {
            transform: translateX(6%) translateY(-18px) rotateZ(1deg) scaleY(1.15);
          }
          66% {
            transform: translateX(-4%) translateY(15px) rotateZ(-1deg) scaleY(0.95);
          }
          100% {
            transform: translateX(0%) translateY(0%) rotateZ(0deg) scaleY(1);
          }
        }
        .animate-cyber-wave {
          animation-name: cyberWaveMotion;
        }
      `}</style>
    </div>
  );
}
