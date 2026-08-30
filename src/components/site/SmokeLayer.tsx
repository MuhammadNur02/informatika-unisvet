type SmokeBlob = {
  top: string
  size: number
  duration: number
  delay: number
  opacity: number
  from: 'left' | 'right'
}

const BLOBS: Array<SmokeBlob> = [
  { top: '4%', size: 420, duration: 34, delay: 0, opacity: 0.75, from: 'left' },
  { top: '18%', size: 300, duration: 27, delay: 6, opacity: 0.6, from: 'right' },
  { top: '34%', size: 520, duration: 42, delay: 12, opacity: 0.7, from: 'left' },
  { top: '48%', size: 260, duration: 24, delay: 3, opacity: 0.55, from: 'right' },
  { top: '60%', size: 460, duration: 38, delay: 18, opacity: 0.7, from: 'right' },
  { top: '72%', size: 340, duration: 30, delay: 9, opacity: 0.65, from: 'left' },
  { top: '12%', size: 380, duration: 36, delay: 22, opacity: 0.6, from: 'right' },
  { top: '82%', size: 300, duration: 28, delay: 15, opacity: 0.55, from: 'left' },
  { top: '55%', size: 240, duration: 22, delay: 26, opacity: 0.5, from: 'left' },
]

/** Lapisan kabut/smoke maroon gelap yang bergerak acak dari kiri & kanan. */
export function SmokeLayer({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {BLOBS.map((blob, i) => (
        <div
          key={i}
          className="smoke-blob"
          style={
            {
              top: blob.top,
              left: blob.from === 'left' ? '-20%' : 'auto',
              right: blob.from === 'right' ? '-20%' : 'auto',
              width: blob.size,
              height: blob.size * 0.62,
              '--smoke-opacity': blob.opacity,
              animation: `${blob.from === 'left' ? 'smoke-from-left' : 'smoke-from-right'} ${blob.duration}s linear ${blob.delay}s infinite`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
