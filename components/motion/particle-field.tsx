"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { fragmentShader, vertexShader } from "./cinematic-shader";

const PARTICLE_COUNT = 1200;
const FIELD_RADIUS = 9;

/** Fullscreen volumetric haze. Sits behind everything else in the canvas. */
function HazePlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport, size, pointer } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    [],
  );

  useFrame((state, delta) => {
    const material = materialRef.current;
    if (!material) return;

    material.uniforms.uTime.value += delta;
    material.uniforms.uResolution.value.set(size.width, size.height);
    // Damped pointer so the parallax lags behind the cursor like a heavy rig.
    material.uniforms.uPointer.value.lerp(pointer, 0.03);

    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    material.uniforms.uScroll.value = scrollable > 0 ? window.scrollY / scrollable : 0;
    void state;
  });

  return (
    <mesh position={[0, 0, -6]}>
      <planeGeometry args={[viewport.width * 3, viewport.height * 3]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthWrite={false}
      />
    </mesh>
  );
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const { pointer } = useThree();

  // Fibonacci-sphere distribution: even coverage, no clustering at the poles.
  const positions = useMemo(() => {
    const buffer = new Float32Array(PARTICLE_COUNT * 3);
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const y = 1 - (i / (PARTICLE_COUNT - 1)) * 2;
      const ringRadius = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * i;
      // Jitter the radius so the sphere reads as a cloud rather than a shell.
      const radius = FIELD_RADIUS * (0.65 + Math.random() * 0.35);

      buffer[i * 3] = Math.cos(theta) * ringRadius * radius;
      buffer[i * 3 + 1] = y * radius;
      buffer[i * 3 + 2] = Math.sin(theta) * ringRadius * radius;
    }

    return buffer;
  }, []);

  useFrame((state, delta) => {
    const points = pointsRef.current;
    if (!points) return;

    points.rotation.y += delta * 0.03;

    // Ease toward the pointer instead of snapping, so the parallax feels heavy.
    points.rotation.x += (pointer.y * 0.15 - points.rotation.x) * 0.015;
    points.rotation.z += (pointer.x * 0.25 - points.rotation.z) * 0.015;

    // Slow breathing keeps the field alive when the pointer is still.
    points.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.25) * 0.03);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#ffffff"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/**
 * Ambient WebGL layer behind the page content. Pointer events are disabled so it
 * never intercepts clicks, and DPR is capped at 1.5 to keep the GPU cost
 * negligible on retina laptops.
 */
export default function ParticleField() {
  return (
    <Canvas
      className="pointer-events-none"
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: false, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 14], fov: 45 }}
    >
      <HazePlane />
      <Particles />
    </Canvas>
  );
}
