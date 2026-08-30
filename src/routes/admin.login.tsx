import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, Loader2, Lock, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/admin/dashboard", replace: true });
    });
  }, [navigate]);

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

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-hero-gradient px-4 py-16">
      <div className="pointer-events-none absolute inset-0" />
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-24 top-1/4 size-72 rounded-full bg-accent/25 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="pointer-events-none absolute -right-20 bottom-10 size-80 rounded-full bg-primary-soft/40 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease }}
        className="relative w-full max-w-md"
      >
        <Link
          to="/"
          className="mb-5 inline-flex items-center gap-2 text-xs font-semibold text-primary-foreground/70 transition-colors hover:text-primary-foreground"
        >
          <ArrowLeft className="size-3.5" /> Kembali ke situs
        </Link>

        <div className="rounded-3xl border border-primary-foreground/12 bg-card/95 p-8 shadow-[0_30px_80px_-40px_oklch(0.21_0.075_265/0.8)] backdrop-blur">
          <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-[image:var(--gradient-hero)]">
            <Lock className="size-5 text-primary-foreground" />
          </div>
          <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-foreground">Panel Pengelola Prodi</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Masuk dengan akun pengelola untuk mengelola galeri dan konten kegiatan prodi.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@unisvet.ac.id"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Kata Sandi</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pr-11"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-1.5 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
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

            <Button type="submit" size="pill" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : <ShieldCheck />}
              {loading ? "Memverifikasi…" : "Masuk"}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Akses terbatas untuk pengelola prodi Pendidikan Informatika UNISVET.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
