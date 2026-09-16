import { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

// Komponen "Gradient Waves" ala React Bits — laut gelombang hasil raymarching
// heightfield (bukan mesh 3D sungguhan), kamera menghadap horizon dengan
// parallax halus mengikuti kursor. Ditulis sendiri (bukan hasil adaptasi
// source resmi React Bits) mengikuti spesifikasi visual yang diminta: horizon
// nyaris hitam, badan gelombang maroon, puncak gelombang maroon-terang dengan
// kilau keperakan tipis di tepi crest (fresnel).
//
// Satu hal penting yang diperbaiki dari draf awal: warna "langit" (saat rd.y
// mendekati/di atas horizon) dan warna "kabut jauh"/"meleset" pada cabang laut
// awalnya dua formula TERPISAH — menghasilkan garis sambungan tajam persis di
// garis horizon. Sekarang keduanya diturunkan dari SATU fungsi fogColor(rd.y)
// yang sama, jadi menyatu mulus di titik manapun kamera mengarah.
//
// Setup WebGL cuma sekali saat mount (pola sama seperti Silk.tsx) — resize
// lewat ResizeObserver pada div pembungkus, bukan window resize saja.

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

uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform vec3 uTrough;
uniform vec3 uBody;
uniform vec3 uPeak;
uniform vec3 uFogLow;
uniform vec3 uFogHigh;

float waveH(vec2 p, float t) {
  float h = 0.0;
  float amp = 0.42;
  vec2 dir = vec2(0.82, 0.55);
  float freq = 0.32;
  float spd = t * 0.16;
  for (int i = 0; i < 4; i++) {
    h += amp * sin(dot(p, dir) * freq + spd * (1.0 + float(i) * 0.22));
    dir = normalize(vec2(dir.x * 0.74 - dir.y * 0.68, dir.x * 0.68 + dir.y * 0.74));
    freq *= 1.85;
    amp *= 0.46;
    spd *= 1.05;
  }
  return h * 0.34;
}

vec3 normalAt(vec2 p, float t) {
  float e = 0.09;
  float hL = waveH(p - vec2(e, 0.0), t);
  float hR = waveH(p + vec2(e, 0.0), t);
  float hD = waveH(p - vec2(0.0, e), t);
  float hU = waveH(p + vec2(0.0, e), t);
  return normalize(vec3(hL - hR, 2.2 * e, hD - hU));
}

void main() {
  vec2 fragCoord = vUv * uRes;
  vec2 uv = (fragCoord - 0.5 * uRes) / uRes.y;

  vec3 ro = vec3(uMouse.x * 0.5, 1.55, -3.4 + uMouse.y * 0.25);
  vec3 la = vec3(uMouse.x * 0.9, 0.85, 2.4);
  vec3 fwd = normalize(la - ro);
  vec3 rightV = normalize(cross(vec3(0.0, 1.0, 0.0), fwd));
  vec3 upV = cross(fwd, rightV);
  vec3 rd = normalize(fwd * 1.7 + rightV * uv.x + upV * uv.y);

  vec3 fogCol = mix(uFogLow, uFogHigh, clamp(rd.y * 3.2 + 0.06, 0.0, 1.0));
  vec3 col;

  if (rd.y > -0.012) {
    col = fogCol;
  } else {
    float t = 0.15;
    vec3 p = ro;
    bool hit = false;
    for (int i = 0; i < 40; i++) {
      p = ro + rd * t;
      float h = waveH(p.xz, uTime);
      float d = p.y - h;
      if (d < 0.012) { hit = true; break; }
      t += clamp(d * 0.55, 0.02, 0.6);
      if (t > 46.0) break;
    }

    if (hit) {
      vec3 n = normalAt(p.xz, uTime);
      vec3 lightDir = normalize(vec3(0.35, 0.55, -0.4));
      float diff = clamp(dot(n, lightDir), 0.0, 1.0);
      float fres = pow(1.0 - clamp(dot(n, -rd), 0.0, 1.0), 3.0);
      float hn = clamp((waveH(p.xz, uTime) + 0.30) / 0.6, 0.0, 1.0);

      vec3 base = mix(uTrough, uBody, smoothstep(0.12, 0.62, hn));
      base = mix(base, uPeak, smoothstep(0.72, 1.0, hn) * (0.35 + 0.65 * diff));
      vec3 silverFres = vec3(0.52, 0.53, 0.58);
      col = base + silverFres * fres * 0.22 * (0.4 + 0.6 * diff);

      float fog = 1.0 - exp(-t * 0.045);
      col = mix(col, fogCol, fog);
    } else {
      col = fogCol;
    }
  }

  vec2 vc = fragCoord / uRes - 0.5;
  float vig = smoothstep(0.95, 0.25, length(vc));
  col *= mix(0.55, 1.0, vig);

  float grain = fract(sin(dot(fragCoord, vec2(12.9898, 78.233))) * 43758.5453);
  col += (grain - 0.5) * 0.012;

  gl_FragColor = vec4(col, 1.0);
}
`;

interface GradientWavesProps {
  className?: string;
  trough?: string;
  body?: string;
  peak?: string;
  fogLow?: string;
  fogHigh?: string;
}

export default function GradientWaves({
  className,
  trough = "#071013",
  body = "#450821",
  peak = "#8f1519",
  fogLow = "#0a0304",
  fogHigh = "#170406",
}: GradientWavesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x0a0304, 1);
    container.appendChild(renderer.domElement);

    const uniforms = {
      uRes: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uTrough: { value: new THREE.Color(trough) },
      uBody: { value: new THREE.Color(body) },
      uPeak: { value: new THREE.Color(peak) },
      uFogLow: { value: new THREE.Color(fogLow) },
      uFogHigh: { value: new THREE.Color(fogHigh) },
    };

    const material = new THREE.ShaderMaterial({ uniforms, vertexShader: vert, fragmentShader: frag });
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    const onResize = () => {
      if (container.clientWidth === 0 || container.clientHeight === 0) return;
      renderer.setSize(container.clientWidth, container.clientHeight);
      uniforms.uRes.value.set(container.clientWidth, container.clientHeight);
    };
    onResize();
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);

    // Target mouse langsung dari window (bukan cuma area kanvas) supaya parallax
    // tetap terasa hidup walau kursor sedang di atas kartu login yang ada di
    // tengah (kanvas ini fixed di seluruh viewport, tapi z-index-nya di bawah).
    let mx = 0, my = 0, targetX = 0, targetY = 0;
    const onPointerMove = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointerMove);

    let rafId = 0;
    const start = performance.now();
    const tick = (now: number) => {
      mx += (targetX - mx) * 0.04;
      my += (targetY - my) * 0.04;
      uniforms.uTime.value = reduceMotion ? 0 : (now - start) / 1000;
      uniforms.uMouse.value.set(mx * 0.6, -my * 0.6);
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      resizeObserver.disconnect();
      material.dispose();
      quad.geometry.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      container.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={containerRef} className={cn("h-full w-full", className)} />;
}
