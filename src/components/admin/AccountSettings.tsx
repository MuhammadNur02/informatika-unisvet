import { useState } from "react";
import { Eye, EyeOff, KeyRound, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export function AccountSettings({ email }: { email: string }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (newPassword.length < 8) {
      toast.error("Kata sandi baru minimal 8 karakter.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Konfirmasi kata sandi baru belum sama.");
      return;
    }
    if (currentPassword === newPassword) {
      toast.error("Kata sandi baru harus berbeda dari kata sandi saat ini.");
      return;
    }

    setBusy(true);
    const toastId = toast.loading("Memperbarui kata sandi…");
    try {
      const { error: verifyError } = await supabase.auth.signInWithPassword({
        email,
        password: currentPassword,
      });
      if (verifyError) throw new Error("Kata sandi saat ini tidak sesuai.");

      const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
      if (updateError) throw updateError;

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Kata sandi berhasil diperbarui", { id: toastId });
    } catch (error) {
      toast.error("Kata sandi gagal diperbarui", {
        id: toastId,
        description: error instanceof Error ? error.message : "Silakan coba kembali.",
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <section className="card-elevated rounded-3xl bg-card p-6 sm:p-8">
        <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
          <KeyRound className="size-5" />
        </span>
        <h2 className="mt-5 text-xl font-bold text-foreground">Ubah Kata Sandi</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          Masukkan kata sandi saat ini untuk memastikan perubahan dilakukan oleh pemilik akun.
        </p>
        <p className="mt-4 rounded-2xl bg-secondary/60 px-4 py-3 text-sm text-foreground">
          Akun: <strong>{email}</strong>
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="current-password">Kata Sandi Saat Ini</Label>
            <Input
              id="current-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">Kata Sandi Baru</Label>
            <Input
              id="new-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              minLength={8}
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
            <p className="text-xs text-muted-foreground">Gunakan minimal 8 karakter.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Ulangi Kata Sandi Baru</Label>
            <Input
              id="confirm-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>
          <label className="flex cursor-pointer items-center gap-3 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(event) => setShowPassword(event.target.checked)}
              className="size-4 accent-[hsl(var(--accent))]"
            />
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            Tampilkan kata sandi
          </label>
          <Button type="submit" size="pill" disabled={busy}>
            {busy ? <Loader2 className="animate-spin" /> : <KeyRound />}
            {busy ? "Menyimpan…" : "Perbarui Kata Sandi"}
          </Button>
        </form>
      </section>
    </div>
  );
}
