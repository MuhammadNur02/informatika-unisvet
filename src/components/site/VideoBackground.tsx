import { useEffect, useRef, useState } from "react";
import { isSmallOrTouchScreen, prefersLightweight } from "@/lib/device";

const POSTER = "/tech-bg-poster.jpg";

/**
 * Latar "sirkuit" untuk section gelap (Hero, CTA, header subhalaman).
 *
 * Poster statis (±20 KB) SELALU tampil lebih dulu — ini juga satu-satunya yang
 * dimuat di HP, perangkat low-end, mode hemat data, atau reduced-motion.
 * Video (±1 MB) hanya dipasang di layar besar yang mampu, baru saat section
 * mendekati viewport, dan dijeda lagi begitu keluar layar supaya tidak ada
 * beberapa video yang di-decode bersamaan.
 */
export function VideoBackground({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [allowed, setAllowed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setAllowed(!prefersLightweight() && !isSmallOrTouchScreen());
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!allowed || !el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setMounted(true);
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [allowed]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${POSTER})` }}
      />
      {mounted ? (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
          onPlaying={() => setReady(true)}
        >
          <source src="/tech-bg.mp4" type="video/mp4" />
        </video>
      ) : null}
      <div className="absolute inset-0 bg-primary-deep/80 mix-blend-multiply" />
      <div className="absolute inset-0 bg-hero-gradient opacity-50" />
    </div>
  );
}
