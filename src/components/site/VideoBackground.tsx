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
        <source src="/tech-bg.webm" type="video/webm" />
        <source src="/tech-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-primary-deep/80 mix-blend-multiply" />
      <div className="absolute inset-0 bg-hero-gradient opacity-50" />
    </div>
  );
}