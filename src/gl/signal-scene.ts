/**
 * The "signal in the dark" field in raw WebGL2: one POINTS draw of curl-noise particles that
 * morph between four section shapes, over an attribute-less full-screen haze. All motion lives
 * in the vertex shader; the CPU uploads random seeds once and a few uniforms per frame.
 * No DOM or GL access at module scope, so the module is safe to import during SSR.
 */
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
  /** 0..1: lock the contact waveform into a clean sine (a channel is hovered or focused). */
  setTune: (target: number) => void;
}

const FOV = 35;
const TAN_HALF_FOV = Math.tan((FOV * Math.PI) / 360);
const CAMERA_Z = 10;
const NEAR = 0.1;
const FAR = 60;
const INTRO_SECONDS = 2.6;
/** Time used for static frames (reduced motion, software GL): every shape is fully formed. */
const STATIC_TIME = 14;
const SOFTWARE_RENDERER = /swiftshader|llvmpipe|softpipe|software|basic render/i;

const PARTICLE_UNIFORMS = [
  "uAspect",
  "uEdges",
  "uIntro",
  "uLayout",
  "uMorph",
  "uNodes",
  "uOpacity",
  "uPixelRatio",
  "uPointer",
  "uPointerActive",
  "uProj",
  "uSize",
  "uTanHalfFov",
  "uTime",
  "uTune",
  "uView",
] as const;
const HAZE_UNIFORMS = ["uAspect", "uCenter", "uStrength", "uTime"] as const;

/** Tens of thousands of points on desktops; fewer on phones, low-power devices and software GL. */
function pickParticleCount(software: boolean): number {
  if (software) {
    return 6000;
  }
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
function buildSwarm(random: () => number): { edges: Float32Array; nodes: Float32Array } {
  const nodes = new Float32Array(NODE_COUNT * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < NODE_COUNT; i += 1) {
    const y = 1 - (i / (NODE_COUNT - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const radius = 1.75 + random() * 0.75;
    nodes.set(
      [Math.cos(theta) * r * radius * 1.25, y * radius * 0.92, Math.sin(theta) * r * radius],
      i * 3
    );
  }
  const distance = (i: number, j: number) =>
    Math.hypot(
      (nodes[i * 3] as number) - (nodes[j * 3] as number),
      (nodes[i * 3 + 1] as number) - (nodes[j * 3 + 1] as number),
      (nodes[i * 3 + 2] as number) - (nodes[j * 3 + 2] as number)
    );
  const seen = new Set<string>();
  const pairs: [number, number][] = [];
  for (let i = 0; i < NODE_COUNT && pairs.length < EDGE_COUNT; i += 1) {
    const nearest = Array.from({ length: NODE_COUNT }, (_, j) => j)
      .filter((j) => j !== i)
      .sort((left, right) => distance(i, left) - distance(i, right))
      .slice(0, 3);
    for (const j of nearest) {
      const key = i < j ? `${i}:${j}` : `${j}:${i}`;
      if (!seen.has(key) && pairs.length < EDGE_COUNT) {
        seen.add(key);
        pairs.push([i, j]);
      }
    }
  }
  while (pairs.length < EDGE_COUNT) {
    const i = Math.floor(random() * NODE_COUNT);
    pairs.push([i, (i + 5) % NODE_COUNT]);
  }
  return { edges: new Float32Array(pairs.flat()), nodes };
}

const smoothstep = (edge0: number, edge1: number, x: number): number => {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};
const mix = (a: number, b: number, t: number): number => a + (b - a) * t;

/**
 * Where each section's shape sits, as [x, y, z, scale] × 4. On wide screens the shapes sit beside
 * the editorial text column; on narrow screens they centre above it and shrink to fit.
 */
function layoutFor(aspect: number, out: Float32Array): void {
  const halfW = CAMERA_Z * TAN_HALF_FOV * aspect;
  const wide = smoothstep(0.8, 1.35, aspect);
  const narrowScale = Math.min(1, Math.max(0.42, halfW / 3.3));
  const scale = mix(narrowScale, 1, wide);
  const presets: [number, number, number, number, number][] = [
    // [desktop x as a fraction of half-width, desktop y, mobile y, z, desktop size]
    [0.5, 0.35, 1.2, 0, 0.9],
    [0.52, 1.05, 1.45, 0, 0.9],
    [-0.48, 0.95, 1.4, -0.4, 1],
    [0, -0.15, 1.55, 0, 1],
  ];
  presets.forEach(([fx, dy, my, z, size], i) => {
    out.set([fx * halfW * wide, mix(my, dy, wide), z, scale * mix(1, size, wide)], i * 4);
  });
}

function compileProgram(gl: WebGL2RenderingContext, vs: string, fs: string): WebGLProgram {
  const program = gl.createProgram();
  for (const [type, source] of [
    [gl.VERTEX_SHADER, vs],
    [gl.FRAGMENT_SHADER, fs],
  ] as const) {
    const shader = gl.createShader(type) as WebGLShader;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    gl.attachShader(program, shader);
  }
  gl.linkProgram(program);
  return program;
}

/** Waits for KHR_parallel_shader_compile so linking never blocks the main thread. */
function linked(gl: WebGL2RenderingContext, programs: WebGLProgram[]): Promise<void> {
  const ext = gl.getExtension("KHR_parallel_shader_compile");
  return new Promise((resolve, reject) => {
    const check = () => {
      if (ext && !programs.every((p) => gl.getProgramParameter(p, ext.COMPLETION_STATUS_KHR))) {
        setTimeout(check, 16);
        return;
      }
      const failed = programs.find((p) => !gl.getProgramParameter(p, gl.LINK_STATUS));
      if (failed) {
        reject(new Error(`[signal] ${gl.getProgramInfoLog(failed)}`));
        return;
      }
      resolve();
    };
    check();
  });
}

function uniformLocations<Name extends string>(
  gl: WebGL2RenderingContext,
  program: WebGLProgram,
  names: readonly Name[]
): { [K in Name]: WebGLUniformLocation | null } {
  return Object.fromEntries(names.map((name) => [name, gl.getUniformLocation(program, name)])) as {
    [K in Name]: WebGLUniformLocation | null;
  };
}

/** Ends the current task so hydration, input and paint can run between boot phases. */
function yieldToMain(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

/** Resolves to null without WebGL2: the CSS poster under the canvas is the intended fallback. */
export async function createSignalScene(
  canvas: HTMLCanvasElement,
  options: SignalSceneOptions
): Promise<SignalScene | null> {
  const context = canvas.getContext("webgl2", {
    alpha: false,
    antialias: false,
    depth: false,
    powerPreference: "high-performance",
    stencil: false,
  });
  if (!context) {
    return null;
  }
  const gl = context;

  // Without a GPU, animating tens of thousands of noise-driven points would block the main
  // thread for seconds per frame: render a lighter field as static frames instead.
  const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
  const rendererName = debugInfo ? String(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)) : "";
  const software = SOFTWARE_RENDERER.test(rendererName);
  const animate = options.animate && !software;

  const particleProgram = compileProgram(gl, PARTICLE_VERTEX, PARTICLE_FRAGMENT);
  const hazeProgram = compileProgram(gl, HAZE_VERTEX, HAZE_FRAGMENT);
  await yieldToMain();

  const random = seededRandom(20_260_519);
  const count = pickParticleCount(software);
  const seeds = new Float32Array(count * 8);
  for (let i = 0; i < seeds.length; i += 1) {
    seeds[i] = random();
  }
  const swarm = buildSwarm(random);
  await linked(gl, [particleProgram, hazeProgram]);

  const pu = uniformLocations(gl, particleProgram, PARTICLE_UNIFORMS);
  const hu = uniformLocations(gl, hazeProgram, HAZE_UNIFORMS);

  // Interleaved seeds: aRandA = floats 0-3, aRandB = floats 4-7 of each particle.
  const particleVao = gl.createVertexArray();
  const seedBuffer = gl.createBuffer();
  gl.bindVertexArray(particleVao);
  gl.bindBuffer(gl.ARRAY_BUFFER, seedBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, seeds, gl.STATIC_DRAW);
  for (const [name, offset] of [
    ["aRandA", 0],
    ["aRandB", 16],
  ] as const) {
    const location = gl.getAttribLocation(particleProgram, name);
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, 4, gl.FLOAT, false, 32, offset);
  }
  const hazeVao = gl.createVertexArray();
  gl.bindVertexArray(null);

  function bindProgram(program: WebGLProgram): void {
    // biome-ignore lint/correctness/useHookAtTopLevel: WebGL2RenderingContext.useProgram, not a React hook.
    gl.useProgram(program);
  }

  // Static uniforms.
  const view = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -CAMERA_Z, 1]);
  const projection = new Float32Array(16);
  const layout = new Float32Array(16);
  bindProgram(particleProgram);
  gl.uniformMatrix4fv(pu.uView, false, view);
  gl.uniform3fv(pu.uNodes, swarm.nodes);
  gl.uniform2fv(pu.uEdges, swarm.edges);
  gl.uniform1f(pu.uTanHalfFov, TAN_HALF_FOV);

  // ---- state
  const isNarrow = window.matchMedia("(max-width: 767px)").matches;
  // Phones put text and field closer together: keep the field quieter there, and dim harder.
  const baseOpacity = isNarrow ? 0.72 : 1;
  const maxDim = isNarrow ? 0.85 : 0.5;
  // Smaller sprites on phones keep the shapes crisp at a lower particle count.
  const pointSize = isNarrow ? 2.6 : 3.0;
  let dpr = Math.min(window.devicePixelRatio || 1, software ? 1 : 2);
  let aspect = 1;
  let morph = 0;
  let morphTarget = 0;
  let dim = 0;
  let dimTarget = 0;
  let tune = 0;
  let tuneTarget = 0;
  let intro = animate ? 0 : 1;
  let elapsed = animate ? 0 : STATIC_TIME;
  let last = performance.now();
  // The intro runs on wall-clock time so slow GPUs never get stuck mid-unfold.
  let introStart = -1;
  const pointer = { active: 0, target: 0, tx: 0, ty: 0, x: 0, y: 0 };

  function layoutScene(): void {
    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;
    aspect = width / Math.max(1, height);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    const f = 1 / TAN_HALF_FOV;
    projection.set([
      f / aspect,
      0,
      0,
      0,
      0,
      f,
      0,
      0,
      0,
      0,
      (FAR + NEAR) / (NEAR - FAR),
      -1,
      0,
      0,
      (2 * FAR * NEAR) / (NEAR - FAR),
      0,
    ]);
    layoutFor(aspect, layout);
  }

  /** The haze glows behind the active shape: its section anchor projected to screen space. */
  const center = new Float32Array(2);
  function hazeCenter(): Float32Array {
    const i0 = Math.min(Math.floor(morph), 2);
    const f = smoothstep(0, 1, morph - i0);
    const x = mix(layout[i0 * 4] as number, layout[(i0 + 1) * 4] as number, f);
    const y = mix(layout[i0 * 4 + 1] as number, layout[(i0 + 1) * 4 + 1] as number, f);
    const halfH = CAMERA_Z * TAN_HALF_FOV;
    center[0] = 0.5 + x / (2 * halfH * aspect);
    center[1] = 0.5 + y / (2 * halfH);
    return center;
  }

  let firstFrame = false;
  function draw(): void {
    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.disable(gl.BLEND);
    bindProgram(hazeProgram);
    gl.uniform1f(hu.uAspect, aspect);
    gl.uniform2fv(hu.uCenter, hazeCenter());
    // The contact waveform is calmer: dim the haze as the page settles.
    gl.uniform1f(hu.uStrength, 1 - smoothstep(2, 3, morph) * 0.35);
    gl.uniform1f(hu.uTime, elapsed);
    gl.bindVertexArray(hazeVao);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    bindProgram(particleProgram);
    gl.uniformMatrix4fv(pu.uProj, false, projection);
    gl.uniform4fv(pu.uLayout, layout);
    gl.uniform1f(pu.uAspect, aspect);
    gl.uniform1f(pu.uPixelRatio, dpr);
    gl.uniform1f(pu.uSize, pointSize);
    gl.uniform1f(pu.uTime, elapsed);
    gl.uniform1f(pu.uIntro, intro);
    gl.uniform1f(pu.uMorph, morph);
    gl.uniform1f(pu.uTune, tune);
    gl.uniform1f(pu.uOpacity, baseOpacity * (1 - dim * maxDim));
    gl.uniform2f(pu.uPointer, pointer.x, pointer.y);
    gl.uniform1f(pu.uPointerActive, pointer.active);
    gl.bindVertexArray(particleVao);
    gl.drawArrays(gl.POINTS, 0, count);
    gl.bindVertexArray(null);

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
    intro = Math.min(1, (last - introStart) / 1000 / INTRO_SECONDS);
    morph += (morphTarget - morph) * (1 - Math.exp(-dt * 2.6));
    dim += (dimTarget - dim) * (1 - Math.exp(-dt * 4));
    tune += (tuneTarget - tune) * (1 - Math.exp(-dt * 5));
    pointer.active += (pointer.target - pointer.active) * (1 - Math.exp(-dt * 4));
    pointer.x += (pointer.tx - pointer.x) * (1 - Math.exp(-dt * 10));
    pointer.y += (pointer.ty - pointer.y) * (1 - Math.exp(-dt * 10));
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
    const shouldRun = animate && active && document.visibilityState === "visible";
    if (shouldRun && !running) {
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    } else if (running && !shouldRun) {
      running = false;
      cancelAnimationFrame(raf);
    }
  }

  // Static frames (or a paused loop): coalesce on-demand redraws into one frame.
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

  // Without animation, eased targets jump straight to their value and redraw once.
  const settle = (apply: () => void) => {
    if (!animate) {
      apply();
      requestStaticFrame();
    }
  };

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
      gl.deleteBuffer(seedBuffer);
      gl.deleteVertexArray(particleVao);
      gl.deleteVertexArray(hazeVao);
      gl.deleteProgram(particleProgram);
      gl.deleteProgram(hazeProgram);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
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
      settle(() => {
        dim = target;
      });
    },
    setMorph(target) {
      morphTarget = target;
      settle(() => {
        morph = target;
      });
    },
    setPointer(ndcX, ndcY) {
      pointer.tx = ndcX;
      pointer.ty = ndcY;
      pointer.target = animate ? 1 : 0;
    },
    setTune(target) {
      tuneTarget = target;
      settle(() => {
        tune = target;
      });
    },
  };
}
