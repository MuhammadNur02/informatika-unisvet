import { useState } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Block } from "@/content/types";

export type MediaOption = { id: string; judul: string; kind: string; url: string };

function Picker({
  media,
  kind,
  onPick,
}: {
  media: MediaOption[];
  kind: "image" | "video";
  onPick: (url: string) => void;
}) {
  const options = media.filter((m) => m.kind === kind);
  return (
    <select
      value=""
      onChange={(e) => e.target.value && onPick(e.target.value)}
      className="h-11 w-full rounded-xl border border-input bg-background px-3.5 text-sm text-foreground outline-none focus-visible:border-accent"
    >
      <option value="">
        {options.length ? "Pilih foto dari pustaka media…" : "Pustaka media belum berisi foto"}
      </option>
      {options.map((m) => (
        <option key={m.id} value={m.url}>
          {m.judul}
        </option>
      ))}
    </select>
  );
}

function TitleField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-2">
      <Label>Judul Bagian (opsional)</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

/** Kerangka daftar item: tambah, hapus, naik, turun. */
function Repeater<T>({
  label,
  items,
  onChange,
  blank,
  render,
  addLabel = "Tambah item",
}: {
  label: string;
  items: T[];
  onChange: (next: T[]) => void;
  blank: () => T;
  render: (item: T, update: (next: T) => void) => React.ReactNode;
  addLabel?: string;
}) {
  function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    const a = next[index]!;
    next[index] = next[target]!;
    next[target] = a;
    onChange(next);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Label>{label}</Label>
        <Button type="button" variant="outline" size="sm" onClick={() => onChange([...items, blank()])}>
          <Plus /> {addLabel}
        </Button>
      </div>

      {items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border p-4 text-xs text-muted-foreground">
          Belum ada isian. Klik "{addLabel}".
        </p>
      ) : null}

      {items.map((item, index) => (
        <div key={index} className="rounded-2xl border border-border bg-background p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              #{index + 1}
            </span>
            <div className="flex gap-1.5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                aria-label="Naikkan"
                onClick={() => move(index, -1)}
                disabled={index === 0}
              >
                <ArrowUp />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                aria-label="Turunkan"
                onClick={() => move(index, 1)}
                disabled={index === items.length - 1}
              >
                <ArrowDown />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                aria-label="Hapus"
                onClick={() => onChange(items.filter((_, i) => i !== index))}
                className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <Trash2 />
              </Button>
            </div>
          </div>
          {render(item, (next) => onChange(items.map((it, i) => (i === index ? next : it))))}
        </div>
      ))}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  rows,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {rows ? (
        <Textarea rows={rows} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <Input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

/** Editor untuk blok berstruktur khusus (tabel, profil orang, tanya jawab, dll). */
export function StructuredBlockFields({
  block,
  media,
  onChange,
}: {
  block: Block;
  media: MediaOption[];
  onChange: (next: Block) => void;
}) {
  if (block.type === "steps") {
    return (
      <div className="space-y-5">
        <TitleField value={block.title ?? ""} onChange={(title) => onChange({ ...block, title })} />
        <Repeater
          label="Langkah"
          addLabel="Tambah langkah"
          items={block.items}
          blank={() => ({ title: "", desc: "" })}
          onChange={(items) => onChange({ ...block, items })}
          render={(item, update) => (
            <div className="space-y-3">
              <Field label="Judul langkah" value={item.title} onChange={(title) => update({ ...item, title })} />
              <Field label="Keterangan" rows={2} value={item.desc} onChange={(desc) => update({ ...item, desc })} />
            </div>
          )}
        />
      </div>
    );
  }

  if (block.type === "table") {
    const colCount = block.head.length;
    function setHead(index: number, value: string) {
      onChange({ ...block, head: block.head.map((h, i) => (i === index ? value : h)) });
    }
    function addColumn() {
      onChange({
        ...block,
        head: [...block.head, `Kolom ${colCount + 1}`],
        rows: block.rows.map((r) => [...r, ""]),
      });
    }
    function removeColumn(index: number) {
      onChange({
        ...block,
        head: block.head.filter((_, i) => i !== index),
        rows: block.rows.map((r) => r.filter((_, i) => i !== index)),
      });
    }
    function addRow() {
      onChange({ ...block, rows: [...block.rows, Array.from({ length: colCount }, () => "")] });
    }
    function setCell(rowIndex: number, colIndex: number, value: string) {
      onChange({
        ...block,
        rows: block.rows.map((r, i) => (i === rowIndex ? r.map((c, ci) => (ci === colIndex ? value : c)) : r)),
      });
    }

    return (
      <div className="space-y-5">
        <TitleField value={block.title ?? ""} onChange={(title) => onChange({ ...block, title })} />

        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Label>Judul kolom</Label>
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="sm" onClick={addColumn}>
                <Plus /> Kolom
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={addRow}>
                <Plus /> Baris
              </Button>
            </div>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {block.head.map((h, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input value={h} onChange={(e) => setHead(i, e.target.value)} />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  aria-label="Hapus kolom"
                  onClick={() => removeColumn(i)}
                  disabled={colCount <= 1}
                  className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Trash2 />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label>Isi baris</Label>
          {block.rows.map((row, rowIndex) => (
            <div key={rowIndex} className="rounded-2xl border border-border bg-background p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Baris {rowIndex + 1}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  aria-label="Hapus baris"
                  onClick={() => onChange({ ...block, rows: block.rows.filter((_, i) => i !== rowIndex) })}
                  className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Trash2 />
                </Button>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {block.head.map((h, colIndex) => (
                  <div key={colIndex} className="space-y-1">
                    <span className="text-xs text-muted-foreground">{h}</span>
                    <Input
                      value={row[colIndex] ?? ""}
                      onChange={(e) => setCell(rowIndex, colIndex, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Field
          label="Catatan di bawah tabel (opsional)"
          value={block.note ?? ""}
          onChange={(note) => onChange({ ...block, note })}
        />
      </div>
    );
  }

  if (block.type === "people") {
    return (
      <div className="space-y-5">
        <TitleField value={block.title ?? ""} onChange={(title) => onChange({ ...block, title })} />
        <Repeater
          label="Daftar orang"
          addLabel="Tambah orang"
          items={block.items}
          blank={() => ({ name: "", role: "", degree: "", interest: "", photo: "" })}
          onChange={(items) => onChange({ ...block, items })}
          render={(item, update) => (
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Nama" value={item.name} onChange={(name) => update({ ...item, name })} />
              <Field label="Gelar" value={item.degree} onChange={(degree) => update({ ...item, degree })} />
              <Field label="Jabatan" value={item.role} onChange={(role) => update({ ...item, role })} />
              <Field
                label="Bidang minat"
                value={item.interest}
                onChange={(interest) => update({ ...item, interest })}
              />
              <div className="space-y-2 sm:col-span-2">
                <Label>Foto</Label>
                <Picker media={media} kind="image" onPick={(photo) => update({ ...item, photo })} />
                <Input
                  value={item.photo}
                  placeholder="atau tempel URL foto"
                  onChange={(e) => update({ ...item, photo: e.target.value })}
                />
                {item.photo ? (
                  <img src={item.photo} alt="Pratinjau" className="h-28 w-24 rounded-xl object-cover" />
                ) : null}
              </div>
            </div>
          )}
        />
      </div>
    );
  }

  if (block.type === "org") {
    return (
      <div className="space-y-5">
        <TitleField value={block.title ?? ""} onChange={(title) => onChange({ ...block, title })} />
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Jabatan puncak" value={block.top} onChange={(top) => onChange({ ...block, top })} />
          <Field
            label="Nama pejabat puncak"
            value={block.topName}
            onChange={(topName) => onChange({ ...block, topName })}
          />
        </div>
        <Repeater
          label="Jabatan lain"
          addLabel="Tambah jabatan"
          items={block.nodes}
          blank={() => ({ role: "", name: "" })}
          onChange={(nodes) => onChange({ ...block, nodes })}
          render={(item, update) => (
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Jabatan" value={item.role} onChange={(role) => update({ ...item, role })} />
              <Field label="Nama" value={item.name} onChange={(name) => update({ ...item, name })} />
            </div>
          )}
        />
      </div>
    );
  }

  if (block.type === "gallery") {
    return (
      <div className="space-y-5">
        <TitleField value={block.title ?? ""} onChange={(title) => onChange({ ...block, title })} />
        <Repeater
          label="Daftar foto"
          addLabel="Tambah foto"
          items={block.items}
          blank={() => ({ name: "", desc: "", image: "" })}
          onChange={(items) => onChange({ ...block, items })}
          render={(item, update) => (
            <div className="space-y-3">
              <Field label="Nama" value={item.name} onChange={(name) => update({ ...item, name })} />
              <Field label="Keterangan" value={item.desc} onChange={(desc) => update({ ...item, desc })} />
              <div className="space-y-2">
                <Label>Foto</Label>
                <Picker media={media} kind="image" onPick={(image) => update({ ...item, image })} />
                <Input
                  value={item.image}
                  placeholder="atau tempel URL foto"
                  onChange={(e) => update({ ...item, image: e.target.value })}
                />
                {item.image ? (
                  <img src={item.image} alt="Pratinjau" className="h-32 w-full rounded-xl object-cover" />
                ) : null}
              </div>
            </div>
          )}
        />
      </div>
    );
  }

  if (block.type === "faq") {
    return (
      <div className="space-y-5">
        <TitleField value={block.title ?? ""} onChange={(title) => onChange({ ...block, title })} />
        <Repeater
          label="Tanya jawab"
          addLabel="Tambah pertanyaan"
          items={block.items}
          blank={() => ({ q: "", a: "" })}
          onChange={(items) => onChange({ ...block, items })}
          render={(item, update) => (
            <div className="space-y-3">
              <Field label="Pertanyaan" value={item.q} onChange={(q) => update({ ...item, q })} />
              <Field label="Jawaban" rows={3} value={item.a} onChange={(a) => update({ ...item, a })} />
            </div>
          )}
        />
      </div>
    );
  }

  if (block.type === "stats") {
    return (
      <div className="space-y-5">
        <TitleField value={block.title ?? ""} onChange={(title) => onChange({ ...block, title })} />
        <Repeater
          label="Angka statistik"
          addLabel="Tambah angka"
          items={block.items}
          blank={() => ({ label: "", value: "" })}
          onChange={(items) => onChange({ ...block, items })}
          render={(item, update) => (
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Angka" value={item.value} onChange={(value) => update({ ...item, value })} />
              <Field label="Keterangan" value={item.label} onChange={(label) => update({ ...item, label })} />
            </div>
          )}
        />
      </div>
    );
  }

  if (block.type === "timeline") {
    return (
      <div className="space-y-5">
        <TitleField value={block.title ?? ""} onChange={(title) => onChange({ ...block, title })} />
        <Repeater
          label="Kronologi / agenda"
          addLabel="Tambah baris"
          items={block.items}
          blank={() => ({ date: "", title: "", desc: "" })}
          onChange={(items) => onChange({ ...block, items })}
          render={(item, update) => (
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field
                  label="Tanggal / waktu"
                  value={item.date}
                  placeholder="contoh: 12 Juli 2026"
                  onChange={(date) => update({ ...item, date })}
                />
                <Field label="Judul" value={item.title} onChange={(title) => update({ ...item, title })} />
              </div>
              <Field label="Keterangan" rows={2} value={item.desc} onChange={(desc) => update({ ...item, desc })} />
            </div>
          )}
        />
      </div>
    );
  }

  if (block.type === "quotes") {
    return (
      <div className="space-y-5">
        <TitleField value={block.title ?? ""} onChange={(title) => onChange({ ...block, title })} />
        <Repeater
          label="Kutipan"
          addLabel="Tambah kutipan"
          items={block.items}
          blank={() => ({ name: "", role: "", quote: "" })}
          onChange={(items) => onChange({ ...block, items })}
          render={(item, update) => (
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Nama" value={item.name} onChange={(name) => update({ ...item, name })} />
                <Field label="Keterangan / angkatan" value={item.role} onChange={(role) => update({ ...item, role })} />
              </div>
              <Field label="Isi kutipan" rows={3} value={item.quote} onChange={(quote) => update({ ...item, quote })} />
            </div>
          )}
        />
      </div>
    );
  }

  return <RawFields block={block} onChange={onChange} />;
}

function RawFields({ block, onChange }: { block: Block; onChange: (next: Block) => void }) {
  const [text, setText] = useState(() => JSON.stringify(block, null, 2));
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      <Label>Editor lanjutan (format data)</Label>
      <Textarea
        rows={10}
        value={text}
        spellCheck={false}
        className="font-mono text-xs"
        onChange={(e) => {
          setText(e.target.value);
          try {
            const parsed = JSON.parse(e.target.value) as Block;
            setError(null);
            onChange(parsed);
          } catch {
            setError("Format belum valid — perubahan belum diterapkan.");
          }
        }}
      />
      {error ? <p className="text-xs font-semibold text-destructive">{error}</p> : null}
    </div>
  );
}
