import { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

// Komponen "Splash Cursor" ala React Bits — jejak warna pelangi yang
// menyembur mengikuti gerakan kursor lalu meluruh perlahan. Versi RINGAN dari
// simulasi fluida penuh (Navier–Stokes lengkap dengan proyeksi tekanan) —
// cuma dua lapis: peluruhan + sedikit blur (kesan "menyebar") tiap frame, dan
// "splat" warna baru disuntik di posisi kursor saat bergerak. Cukup untuk
// kesan cairan berkilau tanpa risiko bug numerik solver tekanan penuh.
//
// Dipasang lewat DUA render target (ping-pong, lewat THREE.WebGLRenderTarget)
// pada resolusi diperkecil (SIM_SCALE) untuk performa, lalu hasil akhirnya
// digambar ke kanvas asli lewat pass tampil terpisah. mix-blend-mode:screen
// di CSS pembungkusnya membuat warnanya menyatu berkilau di atas latar gelap,
// bukan menutupi apa yang ada di baliknya.

const vert = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const updateFrag = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uPrev;
uniform vec2 uRes;
uniform vec2 uSplatPos;
uniform vec3 uSplatColor;
uniform float uSplatOn;
uniform float uRadius;

void main() {
  vec2 texel = 1.0 / uRes;
  vec3 c = texture2D(uPrev, vUv).rgb;
  vec3 blur = c;
  blur += texture2D(uPrev, vUv + vec2(texel.x, 0.0)).rgb;
  blur += texture2D(uPrev, vUv - vec2(texel.x, 0.0)).rgb;
  blur += texture2D(uPrev, vUv + vec2(0.0, texel.y)).rgb;
  blur += texture2D(uPrev, vUv - vec2(0.0, texel.y)).rgb;
  blur /= 5.0;
  c = mix(c, blur, 0.5) * 0.965;

  vec2 aspectUv = vUv;
  aspectUv.x *= uRes.x / uRes.y;
  vec2 sp = uSplatPos;
  sp.x *= uRes.x / uRes.y;
  float d = distance(aspectUv, sp);
  float g = exp(-(d * d) / (2.0 * uRadius * uRadius));
  c += uSplatColor * g * uSplatOn;

  gl_FragColor = vec4(c, 1.0);
}
`;

const displayFrag = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex;

void main() {
  vec3 c = texture2D(uTex, vUv).rgb;
  float a = clamp(max(max(c.r, c.g), c.b) * 1.4, 0.0, 1.0);
  gl_FragColor = vec4(c, a);
}
`;

const SIM_SCALE = 0.55;

function hueToRgb(h: number): [number, number, number] {
  h = h % 1;
  if (h < 0) h += 1;
  const r = Math.abs(h * 6 - 3) - 1;
  const g = 2 - Math.abs(h * 6 - 2);
  const b = 2 - Math.abs(h * 6 - 4);
  return [Math.min(1, Math.max(0, r)), Math.min(1, Math.max(0, g)), Math.min(1, Math.max(0, b))];
}

export default function SplashCursor({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Efek murni dekoratif yang bereaksi ke gerakan kursor — dimatikan total
    // untuk prefers-reduced-motion, bukan cuma dibekukan (beda dari Silk/
    // GradientWaves yang tetap render satu frame diam; di sini tidak ada
    // "frame diam" yang bermakna karena isinya cuma jejak warna kosong).
    const reduceMotion =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, premultipliedAlpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry);
    scene.add(mesh);

    const updateUniforms = {
      uPrev: { value: null as THREE.Texture | null },
      uRes: { value: new THREE.Vector2(1, 1) },
      uSplatPos: { value: new THREE.Vector2(0.5, 0.5) },
      uSplatColor: { value: new THREE.Vector3(0, 0, 0) },
      uSplatOn: { value: 0 },
      uRadius: { value: 0.045 },
    };
    const updateMaterial = new THREE.ShaderMaterial({ uniforms: updateUniforms, vertexShader: vert, fragmentShader: updateFrag });

    const displayUniforms = { uTex: { value: null as THREE.Texture | null } };
    const displayMaterial = new THREE.ShaderMaterial({
      uniforms: displayUniforms,
      vertexShader: vert,
      fragmentShader: displayFrag,
      transparent: true,
    });

    let rtA: THREE.WebGLRenderTarget | null = null;
    let rtB: THREE.WebGLRenderTarget | null = null;
    let src: THREE.WebGLRenderTarget | null = null;
    let dst: THREE.WebGLRenderTarget | null = null;

    const setupTargets = (w: number, h: number) => {
      rtA?.dispose();
      rtB?.dispose();
      const simW = Math.max(32, Math.floor(w * SIM_SCALE));
      const simH = Math.max(32, Math.floor(h * SIM_SCALE));
      rtA = new THREE.WebGLRenderTarget(simW, simH, { depthBuffer: false, stencilBuffer: false });
      rtB = new THREE.WebGLRenderTarget(simW, simH, { depthBuffer: false, stencilBuffer: false });
      src = rtA;
      dst = rtB;
      updateUniforms.uRes.value.set(simW, simH);
    };

    const onResize = () => {
      if (container.clientWidth === 0 || container.clientHeight === 0) return;
      renderer.setSize(container.clientWidth, container.clientHeight);
      setupTargets(container.clientWidth, container.clientHeight);
    };
    onResize();
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);

    let pointerX = 0.5, pointerY = 0.5, prevX = 0.5, prevY = 0.5;
    let hasSplat = false, hue = 0, lastMoveT = 0;

    const onMove = (clientX: number, clientY: number) => {
      prevX = pointerX;
      prevY = pointerY;
      pointerX = clientX / window.innerWidth;
      pointerY = 1 - clientY / window.innerHeight;
      hue += 0.01 + Math.min(0.05, Math.hypot(pointerX - prevX, pointerY - prevY) * 0.6);
      hasSplat = true;
      lastMoveT = performance.now();
    };
    const onPointerMove = (e: PointerEvent) => onMove(e.clientX, e.clientY);
    const onPointerDown = (e: PointerEvent) => onMove(e.clientX, e.clientY);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerdown", onPointerDown);

    let rafId = 0;
    const tick = () => {
      if (!src || !dst) { rafId = requestAnimationFrame(tick); return; }

      const recentMove = performance.now() - lastMoveT < 120;
      const on = hasSplat && recentMove ? 1 : 0;
      const [r, g, b] = hueToRgb(hue);

      mesh.material = updateMaterial;
      updateUniforms.uPrev.value = src.texture;
      updateUniforms.uSplatPos.value.set(pointerX, pointerY);
      updateUniforms.uSplatColor.value.set(r * 0.9, g * 0.9, b * 0.9);
      updateUniforms.uSplatOn.value = on;
      renderer.setRenderTarget(dst);
      renderer.render(scene, camera);

      mesh.material = displayMaterial;
      displayUniforms.uTex.value = dst.texture;
      renderer.setRenderTarget(null);
      renderer.render(scene, camera);

      const tmp = src;
      src = dst;
      dst = tmp;

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      resizeObserver.disconnect();
      updateMaterial.dispose();
      displayMaterial.dispose();
      geometry.dispose();
      rtA?.dispose();
      rtB?.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className={cn("h-full w-full", className)} />;
}
