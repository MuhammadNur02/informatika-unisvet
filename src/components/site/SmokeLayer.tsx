type NebulaOrb = {
  top: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
  color: string;
};

const ORBS: Array<NebulaOrb> = [
  { top: "10%", left: "15%", size: 450, duration: 20, delay: 0, color: "from-primary/40 to-purple-600/30" },
  { top: "40%", left: "70%", size: 550, duration: 25, delay: 5, color: "from-blue-600/30 to-indigo-500/20" },
  { top: "70%", left: "25%", size: 500, duration: 22, delay: 2, color: "from-pink-600/30 to-purple-600/20" },
  { top: "20%", left: "80%", size: 400, duration: 18, delay: 8, color: "from-violet-500/30 to-primary/30" },
];

/** Lapisan background Aurora/Cosmic Nebula modern yang elegan dan dinamis. */
export function SmokeLayer({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden>
      {/* Efek Noise / Grain halus opsional untuk kesan cinematic */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Floating Glowing Orbs */}
      {ORBS.map((orb, i) => (
        <div
          key={i}
          className={`absolute rounded-full mix-blend-screen filter blur-[90px] animate-aurora opacity-60 bg-gradient-to-r ${orb.color}`}
          style={{
            top: orb.top,
            left: orb.left,
            width: orb.size,
            height: orb.size,
            animationDuration: `${orb.duration}s`,
            animationDelay: `${orb.delay}s`,
            animationIterationCount: "infinite",
            animationTimingFunction: "ease-in-out",
          }}
        />
      ))}

      {/* Keyframe tambahan langsung di style inline atau masukkan ke CSS utama Anda jika belum ada */}
      <style>{`
        @keyframes aurora {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(50px, -70px) scale(1.15);
          }
          66% {
            transform: translate(-40px, 40px) scale(0.9);
          }
        }
        .animate-aurora {
          animation-name: aurora;
        }
      `}</style>
    </div>
  );
}
