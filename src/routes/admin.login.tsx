import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Lock, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin/login")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Login Pengelola — Pendidikan Informatika UNISVET" },
      { name: "description", content: "Halaman masuk khusus pengelola Program Studi Pendidikan Informatika UNISVET." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      setError("Email atau kata sandi tidak sesuai.");
      return;
    }
    navigate({ to: "/admin/dashboard", replace: true });
  }

  return (
    <div className="tech-grid flex min-h-screen items-center justify-center bg-primary-deep px-4 py-16">
      <div className="w-full max-w-md">
        <div className="card-elevated rounded-3xl bg-card p-8">
          <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-[image:var(--gradient-hero)]">
            <Lock className="size-5 text-primary-foreground" />
          </div>
          <h1 className="mt-5 text-2xl font-bold tracking-tight text-foreground">Panel Pengelola Prodi</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Masuk dengan akun pengelola untuk mengelola galeri kegiatan.
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
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            {error ? (
              <p className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </p>
            ) : null}

            <Button type="submit" size="pill" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : <ShieldCheck />} Masuk
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Akses terbatas untuk pengelola prodi.{" "}
            <Link to="/" className="font-semibold text-primary hover:text-accent">
              Kembali ke situs
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
