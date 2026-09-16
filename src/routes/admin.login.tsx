import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, Loader2, Lock, Mail, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GradientWaves from "@/components/site/GradientWaves";
import SplashCursor from "@/components/site/SplashCursor";

export const Route = createFileRoute("/admin/login")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Login Pengelola — Pendidikan Informatika UNISVET" },
      {
        name: "description",
        content: "Halaman masuk khusus pengelola Program Studi Pendidikan Informatika UNISVET.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLogin,
});

const ease = [0.22, 1, 0.36, 1] as const;

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Posisi spotlight di dalam kartu, dalam px relatif ke kartu itu sendiri
  // (bukan viewport) — dipakai radial-gradient yang mengikuti kursor.
  const [spot, setSpot] = useState({ x: 50, y: 10, active: false });

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/admin/dashboard", replace: true });
    });
  }, [navigate]);

  // Pakai identitas warna dashboard admin (maroon gelap & hitam dengan aksen
  // emas, beda dari situs publik) sejak gerbang login — konsisten dengan
  // tampilan setelah masuk. Dipasang di <html> (BUKAN <body>) — lihat
  // catatan lengkap soal kenapa di AdminShell.tsx: token Tailwind semantik
  // (text-foreground, border-input, dst.) dijembatani "@theme inline" yang
  // dihitung sekali di :root/<html>, jadi override di <body> saja tidak
  // ikut kebawa ke utility tersebut.
  useEffect(() => {
    document.documentElement.classList.add("admin-theme");
    return () => document.documentElement.classList.remove("admin-theme");
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signInError) {
      setError("Email atau kata sandi tidak sesuai. Silakan periksa kembali.");
      return;
    }
    navigate({ to: "/admin/dashboard", replace: true });
  }

  function handleCardPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpot({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0304] px-4 py-16">
      {/* Latar "Gradient Waves" ala React Bits — laut raymarching maroon-hitam
          yang bergerak pelan, dengan parallax halus mengikuti kursor. Ganti
          total dari Silk sebelumnya, sesuai desain baru yang diminta. */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
        <GradientWaves />
      </div>

      {/* Vignette — menggelapkan area di belakang & di bawah kartu supaya
          kartu tidak menyatu secara visual dengan gelombang di baliknya. */}
      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 640px 560px at 50% 54%, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.22) 46%, transparent 72%)," +
            "radial-gradient(ellipse 120% 60% at 50% 100%, rgba(0,0,0,0.7), transparent 60%)," +
            "radial-gradient(ellipse 120% 45% at 50% 0%, rgba(0,0,0,0.55), transparent 55%)",
        }}
      />

      {/* Kursor "Splash" ala React Bits — jejak warna pelangi mengikuti
          kursor, screen-blend supaya berkilau tanpa menutupi apa pun di
          baliknya. z-index di ATAS vignette, di BAWAH kartu login. */}
      <SplashCursor className="pointer-events-none fixed inset-0 z-[2] opacity-90 mix-blend-screen" />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease }}
        className="relative z-[3] w-full max-w-md"
      >
        <Link
          to="/"
          className="mb-5 inline-flex items-center gap-2 text-xs font-semibold text-white/70 transition-colors hover:text-white"
        >
          <ArrowLeft className="size-3.5" /> Kembali ke situs
        </Link>

        <div className="mb-6 flex items-center justify-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45">
          <span className="size-1.5 rounded-full bg-[#8c1d29] shadow-[0_0_10px_2px_rgba(140,29,41,0.8)]" />
          Panel Pengelola &middot; UNISVET
        </div>

        {/* Kartu: border conic-gradient berputar (maroon + putih + perak,
            login-border-glow) + spotlight radial yang mengikuti kursor. */}
        <div
          className="login-border-glow relative overflow-hidden rounded-[30px] px-8 pb-9 pt-10 backdrop-blur-2xl sm:px-10 sm:pt-11"
          style={{
            // Latar sedikit lebih tembus pandang dari sebelumnya (0.94-0.98)
            // supaya backdrop-blur kelihatan hasilnya — efek kaca buram tipis
            // di atas GradientWaves, bukan kartu yang nyaris solid. Dicoba
            // sempat diturunkan jauh lebih rendah (0.62-0.82) tapi gelombang
            // di belakang jadi terlalu dominan menembus & menabrak teks label
            // — jadi cuma diturunkan SEDIKIT sesuai yang diminta.
            background:
              "radial-gradient(140% 100% at 20% 0%, rgba(140,29,41,0.18), transparent 55%)," +
              "linear-gradient(168deg, rgba(28,7,10,0.86) 0%, rgba(10,3,4,0.91) 65%, rgba(6,2,3,0.94) 100%)",
            boxShadow: "0 50px 100px -34px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
          onPointerMove={handleCardPointerMove}
          onPointerLeave={() => setSpot((s) => ({ ...s, active: false }))}
        >
          {/* Spotlight mengikuti kursor — diperbesar & dinaikkan opacity-nya
              (sebelumnya 280px/0.09) supaya jelas terlihat bergerak, dengan
              rona maroon-keemasan tipis di tepinya alih-alih putih polos. */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
            aria-hidden
            style={{
              background: `radial-gradient(360px circle at ${spot.x}px ${spot.y}px, rgba(255,255,255,0.14), rgba(224,122,92,0.06) 45%, transparent 68%)`,
              opacity: spot.active ? 1 : 0,
            }}
          />

          <h1 className="font-display relative text-[28px] font-semibold tracking-tight text-balance text-white sm:text-[30px]">
            Masuk ke Panel
          </h1>
          <p className="relative mt-2.5 max-w-[34ch] text-sm leading-relaxed text-[#c8b3b4]">
            Kelola beranda, berita, galeri, dan konten Program Studi Pendidikan Informatika UNISVET.
          </p>

          <form onSubmit={handleSubmit} className="relative mt-8 space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#b8404a]"
              >
                Email
              </Label>
              <div className="flex items-center rounded-xl border border-white/[0.09] bg-white/[0.035] transition-colors focus-within:border-white/40 focus-within:bg-white/[0.055]">
                <Mail className="mx-3 size-[15px] shrink-0 text-white/40" />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@unisvet.ac.id"
                  className="h-[42px] border-0 bg-transparent px-0 pr-3 text-[13.5px] leading-none text-white placeholder:text-white/35 focus-visible:ring-0"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#b8404a]"
              >
                Kata Sandi
              </Label>
              <div className="flex items-center rounded-xl border border-white/[0.09] bg-white/[0.035] transition-colors focus-within:border-white/40 focus-within:bg-white/[0.055]">
                <Lock className="mx-3 size-[15px] shrink-0 text-white/40" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-[42px] border-0 bg-transparent px-0 text-[13.5px] leading-none text-white placeholder:text-white/35 focus-visible:ring-0"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                  onClick={() => setShowPassword((v) => !v)}
                  className="mr-1 flex size-[32px] shrink-0 items-center justify-center rounded-[9px] text-white/40 transition-colors hover:bg-white/10 hover:text-[#d7dae0]"
                >
                  {showPassword ? (
                    <EyeOff className="size-[15px]" />
                  ) : (
                    <Eye className="size-[15px]" />
                  )}
                </button>
              </div>
            </div>

            {error ? (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
              >
                {error}
              </motion.p>
            ) : null}

            <Button
              type="submit"
              size="pill"
              disabled={loading}
              className="btn-shine-loop mt-1 w-full border border-white/10 text-white shadow-[0_20px_40px_-18px_rgba(140,29,41,0.75)] transition-transform duration-300 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #8c1d29 0%, #55101a 55%, #170406 100%)",
              }}
            >
              {loading ? <Loader2 className="animate-spin" /> : <ShieldCheck />}
              {loading ? "Memverifikasi…" : "Masuk ke Dashboard"}
            </Button>
          </form>

          <p className="relative mt-6 text-center text-[11.5px] leading-relaxed text-white/40">
            Akses khusus pengelola Prodi Pendidikan Informatika UNISVET.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
