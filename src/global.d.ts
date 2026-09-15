// File ini SENGAJA tidak punya import/export di scope teratas (bukan
// "module") — deklarasi wildcard (`declare module "*.ext"`) di bawah cuma
// dikenali sebagai ambient module global kalau file-nya berupa script biasa.
// Begitu file ini sudah punya `export {}` di atas (jadi "module"), pencocokan
// wildcard-nya diam-diam berhenti bekerja meski TypeScript tetap memasukkan
// file-nya ke kompilasi tanpa keluhan — sudah dites & dikonfirmasi langsung.

// Vite sudah mendeklarasikan modul aset umum (*.png, *.jpg, dst) lewat
// "vite/client" di tsconfig.json — di sini cuma menambah yang belum ada:
// model 3D (*.glb) untuk komponen Lanyard.
declare module "*.glb" {
  const src: string;
  export default src;
}

// meshline tidak menyertakan tipenya sendiri, jadi diketik "any" di sini.
declare module "meshline" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const MeshLineGeometry: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const MeshLineMaterial: any;
}

// Catatan: elemen JSX kustom <meshLineGeometry />/<meshLineMaterial /> yang
// didaftarkan lewat extend() di Lanyard.tsx TIDAK dideklarasikan di sini —
// @react-three/fiber v9 (React 19) memakai interface ThreeElements-nya
// sendiri untuk itu, bukan JSX.IntrinsicElements global. Deklarasinya ada
// langsung di Lanyard.tsx, dekat impor MeshLineGeometry/MeshLineMaterial.
