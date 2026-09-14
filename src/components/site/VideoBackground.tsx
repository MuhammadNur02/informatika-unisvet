import { useEffect, useRef, useState } from "react";

/**
 * Video baru dimuat & diputar begitu section-nya mendekati viewport, bukan langsung
 * saat halaman dibuka. Perlu begini karena beberapa section (Hero, CtaBanner, dll)
 * sama-sama memakai video ini — memutar semuanya sekaligus di awal membuat instance
 * yang posisinya di bawah (misalnya CtaBanner) kehilangan "rebutan" bandwidth dan
 * gagal diputar (request-nya dibatalkan browser), sehingga cuma tampil gradien polos.
 */
export function VideoBackground({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (active) videoRef.current?.play().catch(() => {});
  }, [active]);

  return (
    <div ref={containerRef} className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {active ? (
        <video
          ref={videoRef}
          className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
        >
          <source src="/tech-bg.mp4" type="video/mp4" />
        </video>
      ) : null}
      <div className="absolute inset-0 bg-primary-deep/80 mix-blend-multiply dark:bg-primary-deep/40" />
      <div className="absolute inset-0 bg-hero-gradient opacity-50 dark:opacity-25" />
    </div>
  );
}
