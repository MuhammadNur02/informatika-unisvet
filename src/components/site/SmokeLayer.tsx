/** Latar belakang grid sirkuit digital futuristik dengan efek garis aliran data pulsa cahaya tipis. */
export function SmokeLayer({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none bg-[#0a0205] ${className}`}
      style={{ zIndex: -1 }}
      aria-hidden
    >
      {/* Garis Grid Sirkuit Komputer */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(212, 175, 55, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(212, 175, 55, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Garis Pulsa Cahaya Data Mengalir */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        <div
          className="absolute -inset-[100%] animate-circuit-pulse"
          style={{
            background: "radial-gradient(circle at center, rgba(212, 175, 55, 0.2) 0%, transparent 60%)",
          }}
        />
      </div>

      <style>{`
        @keyframes circuitPulse {
          0% { transform: scale(0.9); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.6; }
          100% { transform: scale(0.9); opacity: 0.3; }
        }
        .animate-circuit-pulse {
          animation: circuitPulse 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
