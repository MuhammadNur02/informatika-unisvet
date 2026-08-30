/** Komponen latar belakang dengan pola titik-titik padat (halftone dot matrix) bernuansa hitam & maroon, beranimasi mengalir seperti ombak dari atas. */
export function SmokeLayer({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none bg-[#120204] ${className}`} aria-hidden>
      {/* Lapisan Pola Titik-Titik Padat (Halftone Dot Matrix) Hitam & Maroon */}
      <div
        className="absolute inset-0 z-0 animate-wave-flow opacity-70"
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(165, 20, 45, 0.75) 1.5px, transparent 1.5px),
            radial-gradient(circle, rgba(0, 0, 0, 0.85) 1.5px, transparent 1.5px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 10px 10px",
          width: "200%",
          height: "200%",
          top: "-50%",
          left: "-50%",
        }}
      />

      {/* Lapisan Gradien Overlay agar transisi gelap di pinggir & tengah tetap menjaga keterbacaan teks */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(25,2,6,0.3)_0%,rgba(10,1,3,0.85)_100%)] z-10" />

      <style>{`
        @keyframes waveFlow {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(-5%, -5%, 0) rotate(1deg) scale(1.05);
          }
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
        }
        .animate-wave-flow {
          animation: waveFlow 12s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}
