import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
import { useEffect, useRef } from 'react';

type GalaxyRuntimeSettings = {
  starSpeed: number;
  density: number;
  hueShift: number;
  speed: number;
  glowIntensity: number;
  saturation: number;
  twinkleIntensity: number;
  rotationSpeed: number;
  repulsionStrength: number;
  autoCenterRepulsion: number;
  backgroundMix: number;
};

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform vec2 uFocal;
uniform vec2 uRotation;
uniform float uStarSpeed;
uniform float uDensity;
uniform float uHueShift;
uniform float uSpeed;
uniform vec2 uMouse;
uniform float uGlowIntensity;
uniform float uSaturation;
uniform bool uMouseRepulsion;
uniform float uTwinkleIntensity;
uniform float uRotationSpeed;
uniform float uRepulsionStrength;
uniform float uMouseActiveFactor;
uniform float uAutoCenterRepulsion;
uniform float uBackgroundMix;
uniform bool uTransparent;

varying vec2 vUv;

#define NUM_LAYER 4.0
#define STAR_COLOR_CUTOFF 0.2
#define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)
#define PERIOD 3.0

float Hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float tri(float x) {
  return abs(fract(x) * 2.0 - 1.0);
}

float tris(float x) {
  float t = fract(x);
  return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0));
}

float trisn(float x) {
  float t = fract(x);
  return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0;
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float Star(vec2 uv, float flare) {
  float d = length(uv);
  float m = (0.05 * uGlowIntensity) / d;
  float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * flare * uGlowIntensity;
  uv *= MAT45;
  rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * 0.3 * flare * uGlowIntensity;
  m *= smoothstep(1.0, 0.2, d);
  return m;
}

vec3 StarLayer(vec2 uv) {
  vec3 col = vec3(0.0);

  vec2 gv = fract(uv) - 0.5; 
  vec2 id = floor(uv);

  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 offset = vec2(float(x), float(y));
      vec2 si = id + vec2(float(x), float(y));
      float seed = Hash21(si);
      float size = fract(seed * 345.32);
      float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));
      float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;


      vec3 base = vec3(0.3, 0.8, 1.0);
      
      float hue = atan(base.g - base.r, base.b - base.r) / (2.0 * 3.14159) + 0.5;
      hue = fract(hue + uHueShift / 360.0);
      float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;
      float val = max(max(base.r, base.g), base.b);
      base = hsv2rgb(vec3(hue, sat, val));

      vec2 pad = vec2(tris(seed * 34.0 + uTime * uSpeed / 10.0), tris(seed * 38.0 + uTime * uSpeed / 30.0)) - 0.5;

      float star = Star(gv - offset - pad, flareSize);
      vec3 color = base;

      float twinkle = trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0;
      twinkle = mix(1.0, twinkle, uTwinkleIntensity);
      star *= twinkle;
      
      col += star * size * color;
    }
  }

  return col;
}

void main() {
  vec2 focalPx = uFocal * uResolution.xy;
  vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;

  vec2 mouseNorm = uMouse - vec2(0.5);
  
  if (uAutoCenterRepulsion > 0.0) {
    vec2 centerUV = vec2(0.0, 0.0);
    float centerDist = length(uv - centerUV);
    vec2 repulsion = normalize(uv - centerUV) * (uAutoCenterRepulsion / (centerDist + 0.1));
    uv += repulsion * 0.05;
  } else if (uMouseRepulsion) {
    vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y;
    float mouseDist = length(uv - mousePosUV);
    vec2 repulsion = normalize(uv - mousePosUV) * (uRepulsionStrength / (mouseDist + 0.1));
    uv += repulsion * 0.05 * uMouseActiveFactor;
  } else {
    vec2 mouseOffset = mouseNorm * 0.1 * uMouseActiveFactor;
    uv += mouseOffset;
  }

  float autoRotAngle = uTime * uRotationSpeed;
  mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));
  uv = autoRot * uv;

  uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;

  vec3 col = vec3(0.0);

  for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {
    float depth = fract(i + uStarSpeed * uSpeed);
    float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);
    float fade = depth * smoothstep(1.0, 0.9, depth);
    col += StarLayer(uv * scale + i * 453.32) * fade;
  }

  col *= uBackgroundMix;

  if (uTransparent) {
    float alpha = length(col);
    alpha = smoothstep(0.0, 0.3, alpha);
    alpha = min(alpha, 1.0);
    gl_FragColor = vec4(col, alpha);
  } else {
    gl_FragColor = vec4(col, 1.0);
  }
}
`;

interface GalaxyProps {
  focal?: [number, number];
  rotation?: [number, number];
  starSpeed?: number;
  density?: number;
  hueShift?: number;
  disableAnimation?: boolean;
  speed?: number;
  mouseInteraction?: boolean;
  glowIntensity?: number;
  saturation?: number;
  mouseRepulsion?: boolean;
  twinkleIntensity?: number;
  rotationSpeed?: number;
  repulsionStrength?: number;
  autoCenterRepulsion?: number;
  transparent?: boolean;
  backgroundMix?: number;
}

function createRuntimeSettings({
  starSpeed,
  density,
  hueShift,
  speed,
  glowIntensity,
  saturation,
  twinkleIntensity,
  rotationSpeed,
  repulsionStrength,
  autoCenterRepulsion,
  backgroundMix,
}: Required<
  Pick<
    GalaxyProps,
    | 'starSpeed'
    | 'density'
    | 'hueShift'
    | 'speed'
    | 'glowIntensity'
    | 'saturation'
    | 'twinkleIntensity'
    | 'rotationSpeed'
    | 'repulsionStrength'
    | 'autoCenterRepulsion'
    | 'backgroundMix'
  >
>): GalaxyRuntimeSettings {
  return {
    starSpeed,
    density,
    hueShift,
    speed,
    glowIntensity,
    saturation,
    twinkleIntensity,
    rotationSpeed,
    repulsionStrength,
    autoCenterRepulsion,
    backgroundMix,
  };
}

export default function Galaxy({
  focal = [0.5, 0.5],
  rotation = [1.0, 0.0],
  starSpeed = 0.5,
  density = 1,
  hueShift = 140,
  disableAnimation = false,
  speed = 1.0,
  mouseInteraction = true,
  glowIntensity = 0.3,
  saturation = 0.0,
  mouseRepulsion = true,
  repulsionStrength = 2,
  twinkleIntensity = 0.3,
  rotationSpeed = 0.1,
  autoCenterRepulsion = 0,
  transparent = true,
  backgroundMix = 1,
  ...rest
}: GalaxyProps) {
  const ctnDom = useRef<HTMLDivElement>(null);
  const targetMousePos = useRef({ x: 0.5, y: 0.5 });
  const smoothMousePos = useRef({ x: 0.5, y: 0.5 });
  const targetMouseActive = useRef(0.0);
  const smoothMouseActive = useRef(0.0);
  const focalRef = useRef(focal);
  const rotationRef = useRef(rotation);
  const mouseRepulsionRef = useRef(mouseRepulsion);
  const programRef = useRef<Program | null>(null);
  const disableAnimationRef = useRef(disableAnimation);
  const targetSettingsRef = useRef(
    createRuntimeSettings({
      starSpeed,
      density,
      hueShift,
      speed,
      glowIntensity,
      saturation,
      twinkleIntensity,
      rotationSpeed,
      repulsionStrength,
      autoCenterRepulsion,
      backgroundMix,
    }),
  );
  const currentSettingsRef = useRef(targetSettingsRef.current);

  useEffect(() => {
    disableAnimationRef.current = disableAnimation;
  }, [disableAnimation]);

  useEffect(() => {
    targetSettingsRef.current = createRuntimeSettings({
      starSpeed,
      density,
      hueShift,
      speed,
      glowIntensity,
      saturation,
      twinkleIntensity,
      rotationSpeed,
      repulsionStrength,
      autoCenterRepulsion,
      backgroundMix,
    });
  }, [
    starSpeed,
    density,
    hueShift,
    speed,
    glowIntensity,
    saturation,
    twinkleIntensity,
    rotationSpeed,
    repulsionStrength,
    autoCenterRepulsion,
    backgroundMix,
  ]);

  useEffect(() => {
    focalRef.current = focal;
    if (!programRef.current) return;
    programRef.current.uniforms.uFocal.value = new Float32Array(focal);
  }, [focal]);

  useEffect(() => {
    rotationRef.current = rotation;
    if (!programRef.current) return;
    programRef.current.uniforms.uRotation.value = new Float32Array(rotation);
  }, [rotation]);

  useEffect(() => {
    mouseRepulsionRef.current = mouseRepulsion;
    if (!programRef.current) return;
    programRef.current.uniforms.uMouseRepulsion.value = mouseRepulsion;
  }, [mouseRepulsion]);

  useEffect(() => {
    if (!ctnDom.current) return;
    const ctn = ctnDom.current;
    let renderer: Renderer;

    try {
      renderer = new Renderer({
        alpha: transparent,
        premultipliedAlpha: false,
      });
    } catch (e) {
      console.warn('WebGL not supported');
      return;
    }

    const gl = renderer.gl;

    // ❗ Safari fix
    if (!gl) {
      console.warn('WebGL context is null');
      return;
    }

    if (transparent) {
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.clearColor(0, 0, 0, 0);
    } else {
      gl.clearColor(0, 0, 0, 1);
    }

    let program: Program;

    function resize() {
      const scale = 1;
      renderer.setSize(ctn.offsetWidth * scale, ctn.offsetHeight * scale);
      if (program) {
        program.uniforms.uResolution.value = new Color(
          gl.canvas.width,
          gl.canvas.height,
          gl.canvas.width / gl.canvas.height,
        );
      }
    }
    window.addEventListener('resize', resize, false);
    resize();

    const geometry = new Triangle(gl);
    const initialSettings = currentSettingsRef.current;
    program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height),
        },
        uFocal: { value: new Float32Array(focalRef.current) },
        uRotation: { value: new Float32Array(rotationRef.current) },
        uStarSpeed: { value: initialSettings.starSpeed },
        uDensity: { value: initialSettings.density },
        uHueShift: { value: initialSettings.hueShift },
        uSpeed: { value: initialSettings.speed },
        uMouse: {
          value: new Float32Array([smoothMousePos.current.x, smoothMousePos.current.y]),
        },
        uGlowIntensity: { value: initialSettings.glowIntensity },
        uSaturation: { value: initialSettings.saturation },
        uMouseRepulsion: { value: mouseRepulsionRef.current },
        uTwinkleIntensity: { value: initialSettings.twinkleIntensity },
        uRotationSpeed: { value: initialSettings.rotationSpeed },
        uRepulsionStrength: { value: initialSettings.repulsionStrength },
        uMouseActiveFactor: { value: 0.0 },
        uAutoCenterRepulsion: { value: initialSettings.autoCenterRepulsion },
        uBackgroundMix: { value: initialSettings.backgroundMix },
        uTransparent: { value: transparent },
      },
    });
    programRef.current = program;

    const mesh = new Mesh(gl, { geometry, program });
    let animateId: number;

    function update(t: number) {
      animateId = requestAnimationFrame(update);
      const nextSettings = targetSettingsRef.current;
      const currentSettings = currentSettingsRef.current;
      const uniformLerpFactor = 0.035;

      currentSettings.starSpeed +=
        (nextSettings.starSpeed - currentSettings.starSpeed) * uniformLerpFactor;
      currentSettings.density +=
        (nextSettings.density - currentSettings.density) * uniformLerpFactor;
      currentSettings.hueShift +=
        (nextSettings.hueShift - currentSettings.hueShift) * uniformLerpFactor;
      currentSettings.speed += (nextSettings.speed - currentSettings.speed) * uniformLerpFactor;
      currentSettings.glowIntensity +=
        (nextSettings.glowIntensity - currentSettings.glowIntensity) * uniformLerpFactor;
      currentSettings.saturation +=
        (nextSettings.saturation - currentSettings.saturation) * uniformLerpFactor;
      currentSettings.twinkleIntensity +=
        (nextSettings.twinkleIntensity - currentSettings.twinkleIntensity) * uniformLerpFactor;
      currentSettings.rotationSpeed +=
        (nextSettings.rotationSpeed - currentSettings.rotationSpeed) * uniformLerpFactor;
      currentSettings.repulsionStrength +=
        (nextSettings.repulsionStrength - currentSettings.repulsionStrength) * uniformLerpFactor;
      currentSettings.autoCenterRepulsion +=
        (nextSettings.autoCenterRepulsion - currentSettings.autoCenterRepulsion) *
        uniformLerpFactor;
      currentSettings.backgroundMix +=
        (nextSettings.backgroundMix - currentSettings.backgroundMix) * uniformLerpFactor;

      if (!disableAnimationRef.current) {
        program.uniforms.uTime.value = t * 0.001;
        program.uniforms.uStarSpeed.value = (t * 0.001 * currentSettings.starSpeed) / 10.0;
      }

      program.uniforms.uDensity.value = currentSettings.density;
      program.uniforms.uHueShift.value = currentSettings.hueShift;
      program.uniforms.uSpeed.value = currentSettings.speed;
      program.uniforms.uGlowIntensity.value = currentSettings.glowIntensity;
      program.uniforms.uSaturation.value = currentSettings.saturation;
      program.uniforms.uTwinkleIntensity.value = currentSettings.twinkleIntensity;
      program.uniforms.uRotationSpeed.value = currentSettings.rotationSpeed;
      program.uniforms.uRepulsionStrength.value = currentSettings.repulsionStrength;
      program.uniforms.uAutoCenterRepulsion.value = currentSettings.autoCenterRepulsion;
      program.uniforms.uBackgroundMix.value = currentSettings.backgroundMix;

      const lerpFactor = 0.05;
      smoothMousePos.current.x +=
        (targetMousePos.current.x - smoothMousePos.current.x) * lerpFactor;
      smoothMousePos.current.y +=
        (targetMousePos.current.y - smoothMousePos.current.y) * lerpFactor;

      smoothMouseActive.current +=
        (targetMouseActive.current - smoothMouseActive.current) * lerpFactor;

      program.uniforms.uMouse.value[0] = smoothMousePos.current.x;
      program.uniforms.uMouse.value[1] = smoothMousePos.current.y;
      program.uniforms.uMouseActiveFactor.value = smoothMouseActive.current;

      renderer.render({ scene: mesh });
    }
    animateId = requestAnimationFrame(update);
    ctn.appendChild(gl.canvas);

    function handleMouseMove(e: MouseEvent) {
      const rect = ctn.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      targetMousePos.current = { x, y };
      targetMouseActive.current = 1.0;
    }

    function handleMouseLeave() {
      targetMouseActive.current = 0.0;
    }

    if (mouseInteraction) {
      ctn.addEventListener('mousemove', handleMouseMove);
      ctn.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      cancelAnimationFrame(animateId);
      programRef.current = null;
      window.removeEventListener('resize', resize);
      if (mouseInteraction) {
        ctn.removeEventListener('mousemove', handleMouseMove);
        ctn.removeEventListener('mouseleave', handleMouseLeave);
      }
      ctn.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [mouseInteraction, transparent]);

  return <div ref={ctnDom} className="galaxy-container" {...rest} />;
}
