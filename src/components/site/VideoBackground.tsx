import videoAsset from "@/assets/tech-bg.mp4.asset.json";

/**
 * Latar video teknologi yang diputar berulang (loop), muted, dan tidak
 * mengikuti scroll (dibungkus absolute di dalam section) agar tidak nge-bug.
 */
export function VideoBackground({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <video
        className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover"
        src={videoAsset.url}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
      />
      <div className="absolute inset-0 bg-primary-deep/70 mix-blend-multiply" />
      <div className="absolute inset-0 bg-hero-gradient opacity-70" />
    </div>
  );
}
