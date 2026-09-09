import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { kirimPesan } from "@/lib/kontak";
import { useFooterContent } from "@/lib/site-content";
import { Reveal } from "./Reveal";

export function KontakForm() {
  const footer = useFooterContent();
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [telepon, setTelepon] = useState("");
  const [subjek, setSubjek] = useState("");
  const [pesan, setPesan] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await kirimPesan({ nama, email, telepon, subjek, pesan });
      setSent(true);
      setNama("");
      setEmail("");
      setTelepon("");
      setSubjek("");
      setPesan("");
      toast.success("Pesan terkirim", { description: "Tim prodi akan membalas melalui email Anda." });
    } catch (err) {
      toast.error("Pesan gagal terkirim", {
        description: err instanceof Error ? err.message : "Silakan coba lagi beberapa saat.",
      });
    } finally {
      setBusy(false);
    }
  }

  const kontak = [
    { icon: MapPin, label: "Alamat", value: footer.address },
    { icon: Phone, label: "Telepon / WhatsApp", value: footer.phone || footer.waAdmin },
    { icon: Mail, label: "Email", value: footer.email },
  ].filter((k) => k.value);

  return (
    <section className="mt-14 grid gap-8 lg:grid-cols-[1fr_420px]">
      <Reveal>
        <form onSubmit={handleSubmit} className="card-elevated rounded-3xl bg-card p-6 sm:p-8">
          <h2 className="text-xl font-bold tracking-tight text-foreground">Kirim Pesan</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Isi data berikut. Pesan Anda langsung masuk ke panel pengelola prodi.
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="k-nama">Nama Lengkap</Label>
              <Input id="k-nama" required value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama Anda" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="k-email">Email</Label>
              <Input
                id="k-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="k-telepon">Nomor WhatsApp (opsional)</Label>
              <Input id="k-telepon" value={telepon} onChange={(e) => setTelepon(e.target.value)} placeholder="08xxxxxxxxxx" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="k-subjek">Perihal</Label>
              <Input
                id="k-subjek"
                value={subjek}
                onChange={(e) => setSubjek(e.target.value)}
                placeholder="Pertanyaan pendaftaran"
              />
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <Label htmlFor="k-pesan">Pesan</Label>
            <Textarea
              id="k-pesan"
              required
              rows={6}
              value={pesan}
              onChange={(e) => setPesan(e.target.value)}
              placeholder="Tuliskan pertanyaan atau keperluan Anda…"
            />
          </div>

          <Button type="submit" size="pill" className="mt-6" disabled={busy}>
            {busy ? <Loader2 className="animate-spin" /> : <Send />}
            {busy ? "Mengirim…" : "Kirim Pesan"}
          </Button>

          {sent ? (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-2xl bg-accent/15 px-4 py-3 text-sm font-medium text-accent-foreground"
            >
              Terima kasih, pesan Anda sudah kami terima.
            </motion.p>
          ) : null}
        </form>
      </Reveal>

      <div className="space-y-5">
        <Reveal delay={0.08}>
          <div className="card-elevated rounded-3xl bg-card p-6">
            <h3 className="text-base font-bold text-foreground">Informasi Kontak</h3>
            <ul className="mt-4 space-y-4">
              {kontak.map((k) => (
                <li key={k.label} className="flex gap-3">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
                    <k.icon className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{k.label}</p>
                    <p className="mt-0.5 break-words text-sm leading-relaxed text-foreground">{k.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {footer.mapQuery ? (
          <Reveal delay={0.14}>
            <div className="card-elevated overflow-hidden rounded-3xl">
              <iframe
                title="Peta lokasi kampus"
                loading="lazy"
                className="h-64 w-full border-0"
                src={`https://www.google.com/maps?q=${encodeURIComponent(footer.mapQuery)}&output=embed`}
              />
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
