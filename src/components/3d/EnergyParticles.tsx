import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollProgress } from '@/lib/scrollProgress';
import { getLogoPose } from '@/animations/logoTimeline';

interface EnergyParticlesProps {
  count?: number;
}

export function EnergyParticles({ count = 160 }: EnergyParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate lightweight digital dust particle coordinates once
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 2.4 + Math.random() * 4.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3 + 0] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.cos(phi) * 0.55; // Flatten vertically
      pos[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta) - 1.2;
    }

    return pos;
  }, [count]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: new THREE.Color('#00f0ff'),
        size: 0.032,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  // 100% GPU-accelerated group rotation (Zero CPU-to-GPU memory transfer on frame render)
  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const safeDelta = Math.min(delta, 0.033);
    const pose = getLogoPose(scrollProgress.value);

    // Organic continuous ambient drift on GPU
    pointsRef.current.rotation.y += safeDelta * 0.03;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.04;

    // React cleanly to scroll energy
    material.opacity = 0.35 + pose.energyIntensity * 0.35;
    material.size = 0.028 + pose.energyIntensity * 0.015;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <primitive object={material} attach="material" />
    </points>
  );
}