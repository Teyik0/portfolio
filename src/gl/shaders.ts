/**
 * GLSL for the signal field. Written in GLSL ES 1.0 style; three.js upgrades it to
 * `#version 300 es` on WebGL2, which is what allows dynamic indexing of the node/edge
 * uniform arrays in the swarm shape.
 */

export const NODE_COUNT = 13;
export const EDGE_COUNT = 26;

/** Simplex noise with analytic gradient (Ashima Arts / Stefan Gustavson, MIT). */
const NOISE = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v, out vec3 gradient) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.5 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  vec4 m2 = m * m;
  vec4 m4 = m2 * m2;
  vec4 pdotx = vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3));
  vec4 temp = m2 * m * pdotx;
  gradient = -8.0 * (temp.x * x0 + temp.y * x1 + temp.z * x2 + temp.w * x3);
  gradient += m4.x * p0 + m4.y * p1 + m4.z * p2 + m4.w * p3;
  gradient *= 105.0;
  return 105.0 * dot(m4, pdotx);
}

// Divergence-free flow: the cross product of two noise gradients (Bridson-style curl noise).
vec3 curl(vec3 p) {
  vec3 g1;
  vec3 g2;
  snoise(p, g1);
  snoise(p + vec3(31.416, 17.23, 9.71), g2);
  return cross(g1, g2);
}
`;

export const PARTICLE_VERTEX = /* glsl */ `
#define PI 3.14159265
#define TAU 6.28318531
#define NODE_COUNT ${NODE_COUNT}
#define EDGE_COUNT ${EDGE_COUNT}

uniform float uTime;
uniform float uMorph;
uniform float uIntro;
uniform float uPixelRatio;
uniform float uSize;
uniform float uOpacity;
uniform vec2 uPointer;
uniform float uPointerActive;
uniform float uAspect;
uniform float uTanHalfFov;
uniform vec4 uLayout[4];
uniform vec3 uNodes[NODE_COUNT];
uniform vec2 uEdges[EDGE_COUNT];

attribute vec4 aRandA;
attribute vec4 aRandB;

varying vec3 vColor;
varying float vAlpha;

${NOISE}

vec3 rotX(vec3 p, float a) { float c = cos(a); float s = sin(a); return vec3(p.x, c * p.y - s * p.z, s * p.y + c * p.z); }
vec3 rotY(vec3 p, float a) { float c = cos(a); float s = sin(a); return vec3(c * p.x + s * p.z, p.y, -s * p.x + c * p.z); }
vec3 rotZ(vec3 p, float a) { float c = cos(a); float s = sin(a); return vec3(c * p.x - s * p.y, s * p.x + c * p.y, p.z); }

// Per-shape colour position on the lime (0) -> cyan (1) ramp, written by each shape function.
float gHue;

// Normal-ish sample from two uniforms (Box-Muller).
float gauss(float u, float v) { return sqrt(-2.0 * log(max(u, 1e-4))) * cos(TAU * v); }

// 0 · Index: a three-armed vortex, the old site's particle vortex rebuilt in 3D.
vec4 shapeVortex(vec4 a, vec4 b, float t) {
  float r = 0.16 + pow(a.x, 0.75) * 3.3;
  float arm = floor(a.y * 3.0);
  float spread = gauss(b.x, b.y) * (0.09 + 0.05 * r);
  float theta = arm * (TAU / 3.0) + log(r + 0.3) * 2.7 + spread - t * 0.5 / (0.5 + r * 0.6);
  float h = gauss(b.z, a.z) * 0.06 * (1.0 + 1.4 / (r + 0.35));
  vec3 p = vec3(cos(theta) * r, h, sin(theta) * r);
  p = rotX(p, 0.92);
  p = rotZ(p, -0.42);
  float core = exp(-r * 1.35);
  gHue = clamp(1.05 - r / 2.4, 0.0, 1.0);
  return vec4(p, 0.5 + core * 1.6);
}

// 1 · Furin: a wind chime (風鈴) whose sound leaves as expanding rings.
vec4 shapeChime(vec4 a, vec4 b, float t) {
  vec3 p;
  float w;
  if (a.z < 0.68) {
    float rings = 6.0;
    float ring = floor(a.x * rings);
    float phase = fract(ring / rings + t * 0.065);
    float ang = a.y * TAU;
    float radius = 0.62 + phase * 3.5 + sin(ang * 3.0 + t * 0.7 + ring) * 0.035 * phase;
    p = vec3(cos(ang) * radius, sin(ang) * radius, gauss(b.x, b.y) * 0.025);
    p.xy += vec2(gauss(b.z, b.w), gauss(b.w, b.z)) * 0.01 * (1.0 + phase * 5.0);
    p = rotY(p, -0.62);
    p = rotX(p, 0.16);
    p.y += 0.1;
    w = pow(1.0 - phase, 1.3) * smoothstep(0.0, 0.08, phase) * 1.7;
    gHue = 0.95 - phase * 0.85;
  } else {
    float k = (a.z - 0.68) / 0.32;
    if (k < 0.1) {
      p = vec3(0.0, 0.62 + a.x * 1.0, 0.0);
    } else if (k < 0.62) {
      float th = a.x * TAU;
      float ph = acos(1.0 - a.y * 1.55);
      p = vec3(sin(ph) * cos(th), cos(ph), sin(ph) * sin(th)) * 0.5 + vec3(0.0, 0.12, 0.0);
    } else if (k < 0.7) {
      p = vec3(0.0, -0.1 - a.x * 0.72, 0.0);
    } else {
      float flutter = sin(t * 1.7 + a.y * 3.0) * 0.06 * a.y;
      p = vec3((a.x - 0.5) * 0.34 + flutter, -0.82 - a.y * 1.12, gauss(b.x, b.y) * 0.008);
    }
    float sway = sin(t * 0.9) * 0.07 + sin(t * 2.3) * 0.015;
    p.y -= 1.62;
    p = rotZ(p, sway);
    p.y += 1.62;
    p = rotY(p, sin(t * 0.4) * 0.3);
    p *= 1.35;
    w = 1.35;
    gHue = 0.92;
  }
  return vec4(p, w);
}

// 2 · Tofu: a peer swarm. Clusters are peers, streams along the edges are pieces in flight.
vec4 shapeSwarm(vec4 a, vec4 b, float t) {
  vec3 p;
  float w;
  if (a.z < 0.4) {
    int n = int(floor(a.x * float(NODE_COUNT)));
    vec3 c = uNodes[n];
    vec3 dir = normalize(vec3(gauss(b.x, b.y), gauss(b.y, b.z), gauss(b.z, b.w)) + 1e-4);
    float size = 0.08 + fract(float(n) * 0.618) * 0.2;
    p = c + dir * size * pow(b.w, 1.6) * (1.0 + sin(t * 2.0 + float(n)) * 0.08);
    w = 1.15;
    gHue = 0.9;
  } else {
    int e = int(floor(a.x * float(EDGE_COUNT)));
    vec2 ed = uEdges[e];
    vec3 A = uNodes[int(ed.x)];
    vec3 B = uNodes[int(ed.y)];
    float dir = b.y > 0.5 ? 1.0 : -1.0;
    float s = fract(a.y + t * (0.045 + b.x * 0.06) * dir);
    vec3 m = mix(A, B, s);
    m += normalize(m + 1e-4) * sin(s * PI) * 0.32;
    m += vec3(gauss(b.z, b.w), gauss(b.w, b.z), gauss(b.x, b.z)) * 0.018;
    p = m;
    float packet = pow(0.5 + 0.5 * sin((a.y * 7.0 + float(e)) * TAU), 8.0);
    w = 0.32 + packet * 1.1;
    gHue = 0.12 + packet * 0.45;
  }
  p = rotY(p, t * 0.08);
  p = rotX(p, 0.28);
  return vec4(p, w);
}

// 3 · Contact: a single waveform. The signal, quiet and readable.
vec4 shapeSignal(vec4 a, vec4 b, float t) {
  float x = (a.x - 0.5) * 13.0;
  float env = exp(-x * x * 0.045);
  float y = sin(x * 1.8 - t * 1.3) * 0.6 * env + sin(x * 4.6 + t * 2.1) * 0.13 * env;
  y += gauss(b.x, b.y) * (0.012 + 0.02 * env);
  float stray = step(0.9, a.y);
  y += stray * gauss(b.z, b.w) * 0.4 * env;
  gHue = clamp(0.15 + env * 0.85, 0.0, 1.0);
  return vec4(x, y, gauss(b.w, b.x) * 0.05, (0.45 + env) * (1.0 - stray * 0.45));
}

vec4 shapeAt(float index, vec4 a, vec4 b, float t) {
  if (index < 0.5) return shapeVortex(a, b, t);
  if (index < 1.5) return shapeChime(a, b, t);
  if (index < 2.5) return shapeSwarm(a, b, t);
  return shapeSignal(a, b, t);
}

void main() {
  float t = uTime;
  float m = clamp(uMorph, 0.0, 3.0);
  float i0 = min(floor(m), 2.0);
  float f = m - i0;
  float delay = aRandB.w * 0.4;
  float k = smoothstep(delay, delay + 0.6, f);

  vec4 s0 = shapeAt(i0, aRandA, aRandB, t);
  float h0 = gHue;
  vec4 s1 = shapeAt(i0 + 1.0, aRandA, aRandB, t);
  float h1 = gHue;
  vec4 L0 = uLayout[int(i0)];
  vec4 L1 = uLayout[int(i0) + 1];
  vec3 p = mix(s0.xyz * L0.w + L0.xyz, s1.xyz * L1.w + L1.xyz, k);
  float w = mix(s0.w, s1.w, k);
  float transit = sin(k * PI);

  // A slice of particles is ambient dust that never joins a shape.
  float dust = step(0.86, aRandA.w);
  vec3 dustPos = (vec3(aRandA.x, aRandA.y, aRandB.x) - 0.5) * vec3(19.0, 11.0, 8.0);
  p = mix(p, dustPos, dust);
  w = mix(w, 0.28, dust);

  // Page-load: everything starts as one point of light, then unfolds.
  float ik = clamp((uIntro - aRandB.w * 0.3) / 0.7, 0.0, 1.0);
  ik = 1.0 - pow(1.0 - ik, 4.0);
  p = mix(uLayout[0].xyz + (aRandB.xyz - 0.5) * 0.08, p, ik);

  // Curl-noise flow: each particle drifts along the field over its life, then respawns.
  float life = fract(aRandB.z * 13.0 + t * (0.03 + aRandA.w * 0.05));
  float layoutScale = mix(L0.w, L1.w, k);
  float amp = mix((0.1 + transit * 1.2) * layoutScale, 1.2, dust);
  vec3 c1 = curl(p * 0.3 + vec3(0.0, 0.0, t * 0.035));
  vec3 q = p + c1 * amp * life * 0.5;
  vec3 c2 = curl(q * 0.3 + vec3(0.0, 0.0, t * 0.035));
  p = q + c2 * amp * life * 0.5;
  float speed = length(c1 + c2) * amp * 0.5;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  float depth = -mv.z;
  vec2 pointerView = uPointer * vec2(uAspect, 1.0) * uTanHalfFov * depth;
  vec2 d = pointerView - mv.xy;
  float fall = exp(-dot(d, d) / 0.8) * uPointerActive;
  mv.xy -= d * fall * 0.42;
  mv.xy += vec2(-d.y, d.x) * fall * 0.3;
  gl_Position = projectionMatrix * mv;

  float size = uSize * (0.45 + aRandB.x * aRandB.x * 1.7) * (1.0 + fall * 1.1 + transit * 0.3);
  gl_PointSize = max(size * uPixelRatio * (10.0 / depth), 1.0);

  float baseHue = mix(mix(h0, h1, k), aRandA.y, dust);
  float hue = clamp(baseHue + (life - 0.5) * 0.3 + speed * 0.25 + fall * 0.5 + (aRandA.y - 0.5) * 0.2, 0.0, 1.0);
  vec3 lime = vec3(0.73, 1.0, 0.2);
  vec3 green = vec3(0.25, 1.0, 0.52);
  vec3 cyan = vec3(0.2, 0.93, 1.0);
  vec3 col = hue < 0.5 ? mix(lime, green, hue * 2.0) : mix(green, cyan, hue * 2.0 - 1.0);
  vec3 lavender = vec3(0.62, 0.6, 1.0);
  vColor = mix(col, lavender, dust * step(0.55, aRandB.y));

  float lifeFade = smoothstep(0.0, 0.12, life) * (1.0 - smoothstep(0.72, 1.0, life));
  float depthFade = 1.0 - smoothstep(13.0, 20.0, depth);
  vAlpha = w * lifeFade * depthFade * mix(0.25, 1.0, ik) * uOpacity * (1.0 + fall * 0.8);
}
`;

export const PARTICLE_FRAGMENT = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;

void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d2 = dot(c, c);
  float a = (exp(-d2 * 30.0) * 0.85 + exp(-d2 * 9.0) * 0.15) * vAlpha;
  if (a < 0.003) discard;
  gl_FragColor = vec4(vColor, a);
}
`;

export const HAZE_VERTEX = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

/** Lavender-indigo volumetric haze: the old site's central radial glow, now drifting with the field. */
export const HAZE_FRAGMENT = /* glsl */ `
uniform vec2 uCenter;
uniform float uAspect;
uniform float uTime;
uniform float uStrength;
varying vec2 vUv;

float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

void main() {
  vec2 p = (vUv - uCenter) * vec2(uAspect, 1.0);
  float wobble = sin(atan(p.y, p.x) * 3.0 + uTime * 0.15) * 0.08;
  float g = exp(-dot(p, p) * (6.0 + wobble * 4.0));
  vec2 p2 = (vUv - vec2(0.08, 0.04)) * vec2(uAspect, 1.0);
  float g2 = exp(-dot(p2, p2) * 6.0);
  vec3 lavender = vec3(0.471, 0.467, 0.776);
  vec3 indigo = vec3(0.506, 0.549, 0.973);
  vec3 col = lavender * g * 0.34 * uStrength + indigo * g2 * 0.06;
  vec2 v = vUv - 0.5;
  col *= 1.0 - dot(v, v) * 0.9;
  col += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) / 255.0;
  gl_FragColor = vec4(max(col, 0.0), 1.0);
}
`;
