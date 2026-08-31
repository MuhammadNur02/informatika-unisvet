import mp4Asset from "@/assets/tech-bg.mp4.asset.json";
import webmAsset from "@/assets/tech-bg.webm.asset.json";

/**
 * Latar video teknologi HD yang diputar berulang (loop), tanpa suara, dan
 * dipasang absolute di dalam section agar tidak bergeser/bug saat scroll.
 */
export function VideoBackground({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <video
        className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
      >
        <source src={webmAsset.url} type="video/webm" />
        <source src={mp4Asset.url} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-primary-deep/60 mix-blend-multiply" />
      <div className="absolute inset-0 bg-hero-gradient opacity-45" />
    </div>
  );
}
