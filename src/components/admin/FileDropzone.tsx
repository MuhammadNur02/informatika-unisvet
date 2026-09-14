import { useRef, useState } from "react";
import { FileText, UploadCloud, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/** Area tarik-lepas berkas yang konsisten dipakai di semua form unggah admin (foto, dokumen, media). */
export function FileDropzone({
  id,
  accept,
  hint,
  file,
  onFile,
  previewUrl,
  isImage = true,
  disabled = false,
}: {
  id: string;
  accept: string;
  hint: string;
  file: File | null;
  onFile: (file: File | null) => void;
  previewUrl?: string | null;
  isImage?: boolean;
  disabled?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function pick(next: File | null) {
    if (next && isImage && !next.type.startsWith("image/")) return;
    onFile(next);
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        if (!disabled) pick(e.dataTransfer.files?.[0] ?? null);
      }}
      className={`relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 ${
        dragging ? "border-accent bg-accent/10" : "border-border bg-secondary/50 hover:border-accent/60"
      } ${disabled ? "pointer-events-none opacity-60" : ""}`}
    >
      {isImage && previewUrl ? (
        <div className="relative">
          <img src={previewUrl} alt="Pratinjau" className="aspect-[4/3] w-full object-cover" />
          <Button
            type="button"
            size="icon"
            variant="outline"
            aria-label="Hapus pilihan berkas"
            onClick={() => {
              pick(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="absolute right-3 top-3"
          >
            <X className="size-4" />
          </Button>
        </div>
      ) : file ? (
        <div className="flex items-center gap-3 px-4 py-5">
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-card text-primary">
            <FileText className="size-4.5" />
          </span>
          <span className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground">{file.name}</span>
          <Button
            type="button"
            size="icon"
            variant="outline"
            aria-label="Hapus pilihan berkas"
            onClick={() => {
              pick(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
          >
            <X className="size-4" />
          </Button>
        </div>
      ) : (
        <label htmlFor={id} className="flex cursor-pointer flex-col items-center gap-2 px-6 py-9 text-center">
          <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-card text-primary shadow-sm">
            <UploadCloud className="size-5" />
          </span>
          <span className="text-sm font-semibold text-foreground">Tarik berkas ke sini atau klik untuk pilih</span>
          <span className="text-xs text-muted-foreground">{hint}</span>
        </label>
      )}
      <Input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        disabled={disabled}
        className="sr-only"
        onChange={(e) => pick(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}
