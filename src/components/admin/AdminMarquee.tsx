const SEQUENCE = ["Universitas Ivet Semarang", "Pendidikan Informatika"];
const REPEAT = 8;

/**
 * Pita teks berjalan (marquee) di bawah header admin — bergerak terus ke
 * kiri tanpa putus. Urutan teks dirender DUA KALI berdampingan lalu
 * animasinya cuma menggeser 50% dari lebar total; begitu salinan pertama
 * habis tergeser, salinan kedua sudah persis di posisi yang sama, jadi
 * loop-nya menyambung mulus tanpa lompatan.
 */
export function AdminMarquee() {
  const items = Array.from({ length: REPEAT }, () => SEQUENCE).flat();

  return (
    <div className="admin-marquee" aria-hidden>
      <div className="admin-marquee-track">
        {[0, 1].map((half) => (
          <div key={half} className="admin-marquee-set">
            {items.map((label, i) => (
              <span key={i} className="admin-marquee-item">
                <span className={i % 2 === 0 ? "text-gradient-gold" : "text-hero-foreground/55"}>{label}</span>
                <span className="admin-marquee-dot" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
