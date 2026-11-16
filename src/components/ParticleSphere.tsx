import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// 3D Simplex noise GLSL implementation
const simplexNoiseGLSL = /* glsl */ `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
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
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }
`;

const vertexShader = /* glsl */ `
  ${simplexNoiseGLSL}

  uniform float uTime;
  uniform float uMouseX;
  uniform float uMouseY;
  uniform float uPixelRatio;

  attribute float aRandom;
  attribute float aSize;

  varying float vAlpha;
  varying vec3 vColor;

  void main() {
    vec3 pos = position;

    // Organic 3D Simplex Noise displacement for the spiky, turbulent surface
    float noise = snoise(pos * 0.9 + vec3(uTime * 0.2, uTime * 0.15, 0.0)) * 0.38;
    pos += normalize(pos) * noise;

    // Subtle continuous breathing pulsation
    float pulse = sin(uTime * 1.4 + aRandom * 6.28) * 0.06;
    pos *= (1.0 + pulse);

    // Mouse attraction / gentle gravity influence
    vec3 mouseVec = vec3(uMouseX * 1.5, uMouseY * 1.5, 0.0);
    float distToMouse = length(pos - mouseVec);
    float mousePull = smoothstep(3.2, 0.0, distToMouse) * 0.28;
    pos += normalize(mouseVec - pos + vec3(0.0001)) * mousePull;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Attenuated point size based on depth and screen resolution
    float pointSize = aSize * uPixelRatio * (240.0 / -mvPosition.z);
    gl_PointSize = clamp(pointSize, 1.5, 12.0);

    // Depth and flicker alpha
    float depth = smoothstep(-3.0, 3.0, pos.z);
    vAlpha = (0.55 + 0.45 * depth) * (0.8 + 0.2 * sin(uTime * 2.0 + aRandom * 12.0));

    // Vibrant color palette inspired by Roshis's portfolio:
    // Electric Cyan, Bright Sky Blue, Indigo, and Pure White Highlights
    vec3 cyanColor = vec3(0.0, 0.88, 1.0);      // #00e1ff
    vec3 skyColor = vec3(0.35, 0.75, 1.0);      // #59bfff
    vec3 indigoColor = vec3(0.40, 0.45, 1.0);   // #6673ff
    vec3 highlightColor = vec3(0.95, 0.98, 1.0);// Bright white-blue

    float colorMix = sin(pos.y * 1.5 + uTime * 0.3 + aRandom * 3.14) * 0.5 + 0.5;
    vec3 baseColor = mix(cyanColor, indigoColor, colorMix);

    // Add bright highlights on outermost points
    if (length(pos) > 1.85) {
      baseColor = mix(baseColor, highlightColor, 0.65);
    }

    vColor = mix(baseColor, skyColor, 0.3);
  }
`;

const fragmentShader = /* glsl */ `
  varying float vAlpha;
  varying vec3 vColor;

  void main() {
    // Render smooth circular particle with glowing core & soft halo
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;

    float halo = smoothstep(0.5, 0.12, dist);
    float core = smoothstep(0.20, 0.0, dist);
    float alpha = (halo * 0.55 + core * 0.95) * vAlpha;

    vec3 finalColor = vColor * (0.95 + core * 0.45);
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

export const ParticleSphere: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMotionChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMotionChange);
      }
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || reducedMotion) return;

    // Detect mobile device for performance optimization
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 3200 : 7000;
    const sphereRadius = 1.65;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    });

    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
    renderer.setPixelRatio(dpr);

    const resize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      if (material) {
        material.uniforms.uPixelRatio.value = dpr;
      }
    };

    // Uniform random points in/on a sphere volume with outer density bias
    const positions = new Float32Array(particleCount * 3);
    const aRandom = new Float32Array(particleCount);
    const aSize = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Golden spiral distribution with depth volume
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      // Cube-root distribution for uniform volume, slightly biased to the surface
      const r = sphereRadius * (0.65 + 0.35 * Math.cbrt(Math.random()));

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      aRandom[i] = Math.random();
      aSize[i] = Math.random() * 1.4 + 1.2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aRandom', new THREE.BufferAttribute(aRandom, 1));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(aSize, 1));

    // Custom Shader Material
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouseX: { value: 0 },
        uMouseY: { value: 0 },
        uPixelRatio: { value: dpr },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    resize();
    window.addEventListener('resize', resize);

    // Mouse Tracking with smooth interpolation
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = x;
      targetMouseY = y;
    };

    const handleMouseLeave = () => {
      targetMouseX = 0;
      targetMouseY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Continuous Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      material.uniforms.uTime.value = elapsedTime;
      material.uniforms.uMouseX.value = mouseX;
      material.uniforms.uMouseY.value = mouseY;

      // Continuous subtle 3D rotation
      points.rotation.y = elapsedTime * 0.18 + mouseX * 0.35;
      points.rotation.x = Math.sin(elapsedTime * 0.12) * 0.15 - mouseY * 0.25;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Clean up WebGL resources and event listeners
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (container) {
        container.removeEventListener('mouseleave', handleMouseLeave);
      }

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div className="relative w-full aspect-square max-w-[420px] mx-auto flex items-center justify-center">
        <div className="w-56 h-56 rounded-full bg-gradient-to-tr from-accent/30 via-accent-cyan/40 to-purple-500/30 blur-2xl animate-pulse" />
        <div className="absolute w-44 h-44 rounded-full border border-accent/40 bg-surface/50 backdrop-blur-sm" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square max-w-[420px] mx-auto flex items-center justify-center"
    >
      {/* Ambient background bloom matching the particle glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-accent/25 via-accent-cyan/20 to-sky-400/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-subtle" />
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        title="Interactive 3D Particle Sphere"
      />
    </div>
  );
};
