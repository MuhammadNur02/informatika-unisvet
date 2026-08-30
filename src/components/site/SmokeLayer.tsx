/** Komponen latar belakang piksel/titik padat bergaya halftone, statis di belakang, dengan animasi perubahan warna dinamis tanpa menutupi konten. */
export function SmokeLayer({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none bg-[#0a0102] ${className}`}
      style={{ zIndex: -1 }}
      aria-hidden
    >
      {/* Lapisan Pixel / Titik-titik Padat Rapet yang Berubah-ubah Warna (Animasi Color Shifting) */}
      <div
        className="absolute inset-[-50%] z-0 animate-color-shift opacity-85"
        style={{
          backgroundImage: `
            radial-gradient(circle, var(--pixel-color-1, rgba(160, 20, 40, 0.9)) 1px, transparent 1px),
            radial-gradient(circle, rgba(0, 0, 0, 0.95) 1px, transparent 1px)
          `,
          backgroundSize: "8px 8px",
          backgroundPosition: "0 0, 4px 4px",
        }}
      />

      <style>{`
        @keyframes colorShift {
          0% {
            filter: hue-rotate(0deg) brightness(1);
          }
          50% {
            filter: hue-rotate(45deg) brightness(1.2);
          }
          100% {
            filter: hue-rotate(0deg) brightness(1);
          }
        }
        .animate-color-shift {
          animation: colorShift 8s ease-in-out infinite;
          will-change: filter;
        }
      `}</style>
    </div>
  );
}
