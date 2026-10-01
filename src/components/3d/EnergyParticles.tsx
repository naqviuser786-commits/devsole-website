import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollProgress } from '@/lib/scrollProgress';
import { getLogoPose } from '@/animations/logoTimeline';

interface EnergyParticlesProps {
  count?: number;
}

/**
 * A lightweight blue "digital dust" field. Deliberately simple (no external
 * noise library) — per-particle sine drift with randomized phase/frequency
 * gives organic-looking motion cheaply. Particle brightness/size pulses
 * with the logo's energyIntensity so the field visibly reacts as the D
 * deconstructs and reassembles, without ever fighting for readability with
 * page content (kept subtle by design — see the "do not overload" rule).
 */
export function EnergyParticles({ count = 220 }: EnergyParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count * 3); // [phase, freq, radius]

    for (let i = 0; i < count; i++) {
      const radius = 2.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3 + 0] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi) * 0.6; // flatten vertically
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta) - 1.5;

      seeds[i * 3 + 0] = Math.random() * Math.PI * 2; // phase
      seeds[i * 3 + 1] = 0.15 + Math.random() * 0.35; // frequency
      seeds[i * 3 + 2] = 0.15 + Math.random() * 0.5; // drift amplitude
    }

    return { positions, seeds };
  }, [count]);

  const basePositions = useMemo(() => positions.slice(), [positions]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: new THREE.Color('#5b8bff'),
        size: 0.035,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );

  useFrame((state) => {
    const geom = pointsRef.current?.geometry;
    if (!geom) return;

    const pose = getLogoPose(scrollProgress.value);
    const posAttr = geom.getAttribute('position') as THREE.BufferAttribute;
    const t = state.clock.elapsedTime;

    // Convergence pulls particles toward the logo core briefly at the very
    // end of the reassembly (a "particles converge" beat) and relaxes back
    // out otherwise.
    const convergence = pose.t < 0.02 && scrollProgress.value > 0.85 ? 0.35 : 0;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const phase = seeds[idx];
      const freq = seeds[idx + 1];
      const amp = seeds[idx + 2];

      const bx = basePositions[idx];
      const by = basePositions[idx + 1];
      const bz = basePositions[idx + 2];

      const driftX = Math.sin(t * freq + phase) * amp;
      const driftY = Math.cos(t * freq * 0.8 + phase) * amp * 0.6;
      const driftZ = Math.sin(t * freq * 0.6 + phase * 1.3) * amp;

      posAttr.setXYZ(
        i,
        bx * (1 - convergence) + driftX,
        by * (1 - convergence) + driftY,
        bz * (1 - convergence) + driftZ,
      );
    }
    posAttr.needsUpdate = true;

    material.opacity = 0.35 + pose.energyIntensity * 0.45;
    material.size = 0.03 + pose.energyIntensity * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <primitive object={material} attach="material" />
    </points>
  );
}
