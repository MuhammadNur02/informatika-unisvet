import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ command, mode }) => {
  // Semua variabel VITE_* (dari .env lokal atau Environment Variables di
  // Vercel) di-inline saat build — ke bundle browser sekaligus bundle server
  // SSR, supaya client Supabase di kedua sisi memakai nilai yang sama.
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const define = Object.fromEntries(
    Object.entries(env).map(([key, value]) => [`import.meta.env.${key}`, JSON.stringify(value)]),
  );

  return {
    define,
    css: { transformer: "lightningcss" },
    resolve: {
      alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    optimizeDeps: {
      include: ["react", "react-dom", "react-dom/client", "react/jsx-runtime", "react/jsx-dev-runtime"],
    },
    // Perlu supaya Vite mengenali card.glb (model 3D komponen Lanyard) sebagai aset,
    // bukan dicoba di-parse sebagai kode.
    assetsInclude: ["**/*.glb"],
    server: { host: "::", port: 8080 },
    plugins: [
      tailwindcss(),
      tanstackStart({
        importProtection: {
          behavior: "error",
          client: { files: ["**/server/**"], specifiers: ["server-only"] },
        },
        // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
        // nitro/vite builds from this
        server: { entry: "server" },
      }),
      // Hanya saat build: bungkus aplikasi jadi output Vercel (.vercel/output) —
      // aset statis ke CDN, SSR & route server (mis. sitemap.xml) ke Vercel Functions.
      command === "build" && nitro({ preset: "vercel" }),
      viteReact(),
    ],
  };
});
