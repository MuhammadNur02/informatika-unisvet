import { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

// Komponen "Silk" dari React Bits (reactbits.dev/backgrounds/silk) — tekstur kain
// mengalir halus (gelombang noise berulang) yang bergerak ke samping seiring waktu,
// dipakai sebagai latar hidup di kartu statistik beranda (gantinya "Grid Scan": efek
// terowongan 3D itu ternyata cocoknya untuk kanvas persegi, susah dibuat pas di kartu
// yang sangat lebar & pendek seperti ini — Silk murni pola 2D berbasis UV, jadi otomatis
// pas di rasio aspek berapa pun tanpa perlu diakali).
// - Dipakai lewat WebGLRenderer mentah (bukan <Canvas> react-three-fiber seperti sumber
//   aslinya) — alasan sama seperti GridScan sebelumnya: ResizeObserver internal r3f
//   (lewat react-use-measure) pernah bikin <canvas> Dither di footer nyangkut di ukuran
//   default 300x150. Di sini ukurannya diukur sendiri lewat ResizeObserver langsung pada
//   div pembungkus.
// - `lightMode` bawaan komponen ini dipertahankan sebagai prop opsional (default false,
//   sama seperti sumber aslinya) — false memberi tekstur abu-abu/perak lembut (warna
//   dikali pola, tanpa pencampuran ke putih), true memberi efek "kain terlipat" dengan
//   highlight memutih di area terang. Dipilih dari sisi pemanggil sesuai kebutuhan.
// - Setup WebGL (renderer/canvas/geometry) HANYA dibuat SEKALI saat mount (efek dengan
//   deps kosong) — sama seperti sumber aslinya (uniforms dibuat sekali lewat useMemo,
//   <Canvas> tidak pernah di-remount). Perubahan prop (mis. warna ikut tema terang/gelap)
//   diterapkan lewat effect KEDUA yang cuma meng-update NILAI uniform yang sudah ada,
//   BUKAN membongkar-pasang ulang renderer — sebelumnya semua prop (termasuk color) ada
//   di dependency array effect setup, jadi setiap toggle tema membongkar & bikin ulang
//   seluruh WebGL context, yang ternyata rawan gagal (context baru kadang tidak
//   ke-append) di lingkungan yang GPU-nya terbatas.

const vert = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const frag = `
precision highp float;
varying vec2 vUv;

uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;
uniform float uLightMode;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2  r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2  rot = mat2(c, -s, s, c);
  return rot * uv;
}

void main() {
  float rnd        = noise(gl_FragCoord.xy);
  vec2  uv         = rotateUvs(vUv * uScale, uRotation);
  vec2  tex        = uv * uScale;
  float tOffset    = uSpeed * uTime;

  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

  float pattern = 0.6 +
                  0.4 * sin(5.0 * (tex.x + tex.y +
                                   cos(3.0 * tex.x + 5.0 * tex.y) +
                                   0.02 * tOffset) +
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  float grain = rnd / 15.0 * uNoiseIntensity;
  vec3 result = uColor * pattern - vec3(grain);

  if (uLightMode > 0.5) {
    float fold = smoothstep(0.28, 0.9, pattern);
    float specular = smoothstep(0.72, 0.98, pattern);
    vec3 shadowColor = uColor * 0.72;
    vec3 bodyColor = min(uColor * 1.18, vec3(1.0));
    vec3 lightBase = mix(shadowColor, bodyColor, fold);
    lightBase = mix(lightBase, vec3(1.0), specular * 0.92);

    float fineNoise = noise(gl_FragCoord.xy * 0.63 + vec2(17.0, 41.0));
    float grainSignal = (rnd + fineNoise - 1.0);
    float grainStrength = clamp(uNoiseIntensity * 0.038, 0.0, 0.16);
    result = lightBase + grainSignal * grainStrength;
  }

  gl_FragColor = vec4(clamp(result, 0.0, 1.0), 1.0);
}
`;

interface SilkProps {
  className?: string;
  speed?: number;
  scale?: number;
  color?: string;
  noiseIntensity?: number;
  rotation?: number;
  lightMode?: boolean;
}

interface SilkUniforms {
  [key: string]: THREE.IUniform;
  uTime: { value: number };
  uColor: { value: THREE.Color };
  uSpeed: { value: number };
  uScale: { value: number };
  uRotation: { value: number };
  uNoiseIntensity: { value: number };
  uLightMode: { value: number };
}

export default function Silk({
  className,
  speed = 2.2,
  scale = 1,
  color = "#520000",
  noiseIntensity = 1.1,
  rotation = 0,
  lightMode = false,
}: SilkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniformsRef = useRef<SilkUniforms | null>(null);

  // Setup WebGL sekali di mount — lihat catatan di atas.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const uniforms: SilkUniforms = {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uSpeed: { value: speed },
      uScale: { value: scale },
      uRotation: { value: rotation },
      uNoiseIntensity: { value: noiseIntensity },
      uLightMode: { value: lightMode ? 1 : 0 },
    };
    uniformsRef.current = uniforms;

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: vert,
      fragmentShader: frag,
    });

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    const onResize = () => {
      if (container.clientWidth === 0 || container.clientHeight === 0) return;
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    onResize();
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);

    // Sumber aslinya (dan AdminStarfield/EmberField yang digantikan komponen
    // ini di halaman admin) tidak pernah beranimasi terus-menerus untuk
    // pengguna yang minta gerakan dikurangi — dihormati di sini juga: render
    // satu frame statis (teksturnya tetap tampil, cuma diam) alih-alih
    // menjalankan loop requestAnimationFrame tanpa henti.
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let rafId = 0;
    let last = performance.now();
    const tick = () => {
      const now = performance.now();
      const delta = (now - last) / 1000;
      last = now;
      uniforms.uTime.value += 0.1 * delta;
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    };
    if (reduceMotion) {
      renderer.render(scene, camera);
    } else {
      rafId = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      material.dispose();
      quad.geometry.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      container.removeChild(renderer.domElement);
      uniformsRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update NILAI uniform yang sudah ada saat prop berubah (mis. warna ikut toggle
  // tema) — tidak menyentuh renderer/canvas sama sekali.
  useEffect(() => {
    const u = uniformsRef.current;
    if (!u) return;
    u.uColor.value.set(color);
    u.uSpeed.value = speed;
    u.uScale.value = scale;
    u.uRotation.value = rotation;
    u.uNoiseIntensity.value = noiseIntensity;
    u.uLightMode.value = lightMode ? 1 : 0;
  }, [color, speed, scale, rotation, noiseIntensity, lightMode]);

  return <div ref={containerRef} className={cn("h-full w-full", className)} />;
}
