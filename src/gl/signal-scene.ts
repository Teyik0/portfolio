/**
 * The "signal in the dark" field: one Points draw of curl-noise particles that morph between
 * four section shapes, over a full-screen lavender haze. Browser-only and loaded with a dynamic
 * import, so three.js never touches the SSG HTML or the initial route chunk.
 */
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  Vector4,
  WebGLRenderer,
} from "three";
import {
  EDGE_COUNT,
  HAZE_FRAGMENT,
  HAZE_VERTEX,
  NODE_COUNT,
  PARTICLE_FRAGMENT,
  PARTICLE_VERTEX,
} from "./shaders";

export interface SignalSceneOptions {
  /** false under prefers-reduced-motion: frames are rendered on demand, never animated. */
  animate: boolean;
  onContextLost: () => void;
  onFirstFrame: () => void;
}

export interface SignalScene {
  clearPointer: () => void;
  dispose: () => void;
  resize: () => void;
  setActive: (active: boolean) => void;
  /** 0..1: how much to quiet the field while text-dense content scrolls over it. */
  setDim: (target: number) => void;
  setMorph: (target: number) => void;
  setPointer: (ndcX: number, ndcY: number) => void;
}

const FOV = 35;
const TAN_HALF_FOV = Math.tan((FOV * Math.PI) / 360);
const CAMERA_Z = 10;
const INTRO_SECONDS = 2.6;
/** Time used for the single static frame under reduced motion: every shape is fully formed. */
const STATIC_TIME = 14;

/** Tens of thousands of points on desktops; fewer on phones and low-power devices. */
function pickParticleCount(): number {
  const narrow = window.matchMedia("(max-width: 767px)").matches;
  const cores = navigator.hardwareConcurrency ?? 8;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  return narrow || cores <= 4 || memory <= 4 ? 18_000 : 52_000;
}

/**
 * Deterministic Park-Miller PRNG so every visit (and every screenshot) gets the same
 * constellation. Products stay below 2^53, so plain number arithmetic is exact.
 */
function seededRandom(seed: number): () => number {
  let state = seed % 2_147_483_647;
  return () => {
    state = (state * 48_271) % 2_147_483_647;
    return (state - 1) / 2_147_483_646;
  };
}

/** Peers on a jittered Fibonacci sphere, each linked to its nearest neighbours. */
function buildSwarm(random: () => number): {
  edges: Vector2[];
  nodes: Vector3[];
} {
  const nodes: Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < NODE_COUNT; i += 1) {
    const y = 1 - (i / (NODE_COUNT - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const radius = 1.75 + random() * 0.75;
    nodes.push(
      new Vector3(
        Math.cos(theta) * r * radius * 1.25,
        y * radius * 0.92,
        Math.sin(theta) * r * radius
      )
    );
  }
  const seen = new Set<string>();
  const edges: Vector2[] = [];
  for (let i = 0; i < NODE_COUNT && edges.length < EDGE_COUNT; i += 1) {
    const origin = nodes[i] as Vector3;
    const nearest = nodes
      .map((node, j) => ({ distance: node.distanceTo(origin), j }))
      .filter(({ j }) => j !== i)
      .sort((left, right) => left.distance - right.distance)
      .slice(0, 3);
    for (const { j } of nearest) {
      const key = i < j ? `${i}:${j}` : `${j}:${i}`;
      if (!seen.has(key) && edges.length < EDGE_COUNT) {
        seen.add(key);
        edges.push(new Vector2(i, j));
      }
    }
  }
  while (edges.length < EDGE_COUNT) {
    const i = Math.floor(random() * NODE_COUNT);
    edges.push(new Vector2(i, (i + 5) % NODE_COUNT));
  }
  return { edges, nodes };
}

const smoothstep = (edge0: number, edge1: number, x: number): number => {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};
const mix = (a: number, b: number, t: number): number => a + (b - a) * t;

/**
 * Where each section's shape sits, as [x, y, z, scale]. On wide screens the shapes sit beside
 * the editorial text column; on narrow screens they centre above it and shrink to fit.
 */
function layoutFor(aspect: number, out: Vector4[]): void {
  const halfW = CAMERA_Z * TAN_HALF_FOV * aspect;
  const wide = smoothstep(0.8, 1.35, aspect);
  const narrowScale = Math.min(1, Math.max(0.42, halfW / 3.3));
  const scale = mix(narrowScale, 1, wide);
  const presets: [number, number, number, number][] = [
    // [desktop x as a fraction of half-width, desktop y, mobile y, z]
    [0.5, 0.35, 1.2, 0],
    [0.52, 1.05, 1.45, 0],
    [-0.48, 0.95, 1.4, -0.4],
    [0, -0.15, 1.55, 0],
  ];
  presets.forEach(([fx, dy, my, z], i) => {
    const sizes = [0.9, 0.9, 1.0, 1];
    const s = scale * mix(1, sizes[i] as number, wide);
    (out[i] as Vector4).set(fx * halfW * wide, mix(my, dy, wide), z, s);
  });
}

export function createSignalScene(
  canvas: HTMLCanvasElement,
  options: SignalSceneOptions
): SignalScene {
  const renderer = new WebGLRenderer({
    alpha: false,
    antialias: false,
    canvas,
    powerPreference: "high-performance",
    stencil: false,
  });
  renderer.setClearColor(0x00_00_00, 1);

  const camera = new PerspectiveCamera(FOV, 1, 0.1, 60);
  camera.position.set(0, 0, CAMERA_Z);
  const scene = new Scene();

  // Particles: all motion lives in the vertex shader; the CPU only uploads random seeds once.
  const random = seededRandom(20_260_519);
  const count = pickParticleCount();
  const randA = new Float32Array(count * 4);
  const randB = new Float32Array(count * 4);
  for (let i = 0; i < count * 4; i += 1) {
    randA[i] = random();
    randB[i] = random();
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(new Float32Array(count * 3), 3));
  geometry.setAttribute("aRandA", new BufferAttribute(randA, 4));
  geometry.setAttribute("aRandB", new BufferAttribute(randB, 4));

  const swarm = buildSwarm(random);
  const layout = [new Vector4(), new Vector4(), new Vector4(), new Vector4()];
  const particleUniforms = {
    uAspect: { value: 1 },
    uEdges: { value: swarm.edges },
    uIntro: { value: options.animate ? 0 : 1 },
    uLayout: { value: layout },
    uMorph: { value: 0 },
    uNodes: { value: swarm.nodes },
    uOpacity: { value: 1 },
    uPixelRatio: { value: 1 },
    uPointer: { value: new Vector2(0, 0) },
    uPointerActive: { value: 0 },
    uSize: { value: 2.4 },
    uTanHalfFov: { value: TAN_HALF_FOV },
    uTime: { value: options.animate ? 0 : STATIC_TIME },
  };
  const particleMaterial = new ShaderMaterial({
    blending: AdditiveBlending,
    depthTest: false,
    depthWrite: false,
    fragmentShader: PARTICLE_FRAGMENT,
    transparent: true,
    uniforms: particleUniforms,
    vertexShader: PARTICLE_VERTEX,
  });
  const points = new Points(geometry, particleMaterial);
  points.frustumCulled = false;
  points.renderOrder = 1;

  const hazeUniforms = {
    uAspect: { value: 1 },
    uCenter: { value: new Vector2(0.7, 0.62) },
    uStrength: { value: 1 },
    uTime: { value: 0 },
  };
  const hazeGeometry = new PlaneGeometry(2, 2);
  const hazeMaterial = new ShaderMaterial({
    depthTest: false,
    depthWrite: false,
    fragmentShader: HAZE_FRAGMENT,
    uniforms: hazeUniforms,
    vertexShader: HAZE_VERTEX,
  });
  const haze = new Mesh(hazeGeometry, hazeMaterial);
  haze.frustumCulled = false;
  haze.renderOrder = 0;
  scene.add(haze, points);

  // ---- state
  const isNarrow = window.matchMedia("(max-width: 767px)").matches;
  const maxDpr = 2;
  let dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
  let aspect = 1;
  let morph = 0;
  let morphTarget = 0;
  let dim = 0;
  let dimTarget = 0;
  // Phones put text and field closer together: keep the field quieter there, and dim harder.
  const baseOpacity = isNarrow ? 0.72 : 1;
  const maxDim = isNarrow ? 0.85 : 0.5;
  let elapsed = options.animate ? 0 : STATIC_TIME;
  let last = performance.now();
  // The intro runs on wall-clock time so slow GPUs never get stuck mid-unfold.
  let introStart = -1;
  const pointer = { active: 0, target: 0, tx: 0, ty: 0, x: 0, y: 0 };
  const hazeCenter = new Vector2();

  function layoutScene(): void {
    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;
    aspect = width / Math.max(1, height);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height, false);
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
    layoutFor(aspect, layout);
    particleUniforms.uAspect.value = aspect;
    particleUniforms.uPixelRatio.value = dpr;
    // Smaller sprites on phones keep the shapes crisp at a lower particle count.
    particleUniforms.uSize.value = isNarrow ? 2.6 : 3.0;
    // Phones put text and field closer together: keep the field a notch quieter there.
    hazeUniforms.uAspect.value = aspect;
  }

  /** Project the current section's anchor so the haze glows behind the active shape. */
  function updateHaze(): void {
    const i0 = Math.min(Math.floor(morph), 2);
    const f = smoothstep(0, 1, morph - i0);
    const a = layout[i0] as Vector4;
    const b = layout[i0 + 1] as Vector4;
    const x = mix(a.x, b.x, f);
    const y = mix(a.y, b.y, f);
    const halfH = CAMERA_Z * TAN_HALF_FOV;
    hazeCenter.set(0.5 + x / (2 * halfH * aspect), 0.5 + y / (2 * halfH));
    hazeUniforms.uCenter.value.copy(hazeCenter);
    // The contact waveform is calmer: dim the haze as the page settles.
    hazeUniforms.uStrength.value = 1 - smoothstep(2, 3, morph) * 0.35;
  }

  let firstFrame = false;
  function draw(): void {
    particleUniforms.uTime.value = elapsed;
    particleUniforms.uMorph.value = morph;
    particleUniforms.uOpacity.value = baseOpacity * (1 - dim * maxDim);
    hazeUniforms.uTime.value = elapsed;
    updateHaze();
    renderer.render(scene, camera);
    if (!firstFrame) {
      firstFrame = true;
      options.onFirstFrame();
    }
  }

  function step(dt: number): void {
    elapsed += dt;
    if (introStart < 0) {
      introStart = last;
    }
    particleUniforms.uIntro.value = Math.min(1, (last - introStart) / 1000 / INTRO_SECONDS);
    morph += (morphTarget - morph) * (1 - Math.exp(-dt * 2.6));
    dim += (dimTarget - dim) * (1 - Math.exp(-dt * 4));
    pointer.active += (pointer.target - pointer.active) * (1 - Math.exp(-dt * 4));
    pointer.x += (pointer.tx - pointer.x) * (1 - Math.exp(-dt * 10));
    pointer.y += (pointer.ty - pointer.y) * (1 - Math.exp(-dt * 10));
    particleUniforms.uPointer.value.set(pointer.x, pointer.y);
    particleUniforms.uPointerActive.value = pointer.active;
  }

  // Adaptive quality: step the pixel ratio down when frames run long.
  const perf = { acc: 0, frames: 0 };
  function adapt(frameMs: number): void {
    perf.acc += frameMs;
    perf.frames += 1;
    if (perf.frames < 90) {
      return;
    }
    const average = perf.acc / perf.frames;
    perf.acc = 0;
    perf.frames = 0;
    if (average > 24 && dpr > 1) {
      dpr = Math.max(1, dpr - 0.25);
      layoutScene();
    }
  }

  let running = false;
  let active = true;
  let raf = 0;
  function frame(now: number): void {
    raf = requestAnimationFrame(frame);
    const frameMs = now - last;
    last = now;
    // Cap the step so a returning tab doesn't jump, but let slow devices keep real time.
    step(Math.min(frameMs / 1000, 0.1));
    draw();
    adapt(frameMs);
  }
  function syncLoop(): void {
    const shouldRun = options.animate && active && document.visibilityState === "visible";
    if (shouldRun && !running) {
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    } else if (running && !shouldRun) {
      running = false;
      cancelAnimationFrame(raf);
    }
  }

  // Reduced motion (or a paused loop): coalesce on-demand redraws into one frame.
  let staticRaf = 0;
  function requestStaticFrame(): void {
    if (running || staticRaf) {
      return;
    }
    staticRaf = requestAnimationFrame(() => {
      staticRaf = 0;
      draw();
    });
  }

  const onVisibility = () => syncLoop();
  document.addEventListener("visibilitychange", onVisibility);
  const onContextLost = (event: Event) => {
    event.preventDefault();
    running = false;
    cancelAnimationFrame(raf);
    options.onContextLost();
  };
  canvas.addEventListener("webglcontextlost", onContextLost);

  layoutScene();
  draw();
  syncLoop();

  return {
    clearPointer() {
      pointer.target = 0;
    },
    dispose() {
      running = false;
      cancelAnimationFrame(raf);
      cancelAnimationFrame(staticRaf);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      geometry.dispose();
      particleMaterial.dispose();
      hazeGeometry.dispose();
      hazeMaterial.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    },
    resize() {
      layoutScene();
      requestStaticFrame();
    },
    setActive(next) {
      active = next;
      syncLoop();
    },
    setDim(target) {
      dimTarget = target;
      if (!options.animate) {
        dim = target;
        requestStaticFrame();
      }
    },
    setMorph(target) {
      morphTarget = target;
      if (!options.animate) {
        morph = target;
        requestStaticFrame();
      }
    },
    setPointer(ndcX, ndcY) {
      pointer.tx = ndcX;
      pointer.ty = ndcY;
      pointer.target = options.animate ? 1 : 0;
    },
  };
}
