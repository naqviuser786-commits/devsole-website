import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollProgress } from '@/lib/scrollProgress';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const BASE_POSITION = new THREE.Vector3(0, 0.1, 6.2);
const LOOK_AT = new THREE.Vector3(0, 0.3, 0);

/**
 * Keeps camera movement subtle and intentional, per the brief: parallax
 * follows the pointer a little, and the camera drifts slightly on scroll,
 * but never spins or swings dramatically enough to distract from content.
 */
export function CameraRig() {
  const { camera, pointer } = useThree();
  const reducedMotion = useReducedMotion();
  const current = useRef(BASE_POSITION.clone());

  useFrame((_, delta) => {
    if (reducedMotion) {
      camera.position.copy(BASE_POSITION);
      camera.lookAt(LOOK_AT);
      return;
    }

    const progress = scrollProgress.value;

    const targetX = BASE_POSITION.x + pointer.x * 0.35 + progress * 0.4;
    const targetY = BASE_POSITION.y + pointer.y * 0.2 - progress * 0.15;
    const targetZ = BASE_POSITION.z - progress * 0.6;

    // Critically-damped-ish smoothing so parallax never feels jittery.
    const smoothing = 1 - Math.pow(0.001, delta);
    current.current.x += (targetX - current.current.x) * smoothing;
    current.current.y += (targetY - current.current.y) * smoothing;
    current.current.z += (targetZ - current.current.z) * smoothing;

    camera.position.copy(current.current);
    camera.lookAt(LOOK_AT);
  });

  return null;
}
