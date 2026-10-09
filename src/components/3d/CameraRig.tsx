import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollProgress } from '@/lib/scrollProgress';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const BASE_POSITION = new THREE.Vector3(0, 0.1, 6.2);
const LOOK_AT = new THREE.Vector3(0, 0.3, 0);

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

    const safeDelta = Math.min(delta, 0.033);
    const progress = scrollProgress.value;

    const targetX = BASE_POSITION.x + pointer.x * 0.25 + progress * 0.35;
    const targetY = BASE_POSITION.y + pointer.y * 0.15 - progress * 0.12;
    const targetZ = BASE_POSITION.z - progress * 0.5;

    // Stable dampening that matches Lenis smooth scroll
    current.current.x = THREE.MathUtils.damp(current.current.x, targetX, 3.5, safeDelta);
    current.current.y = THREE.MathUtils.damp(current.current.y, targetY, 3.5, safeDelta);
    current.current.z = THREE.MathUtils.damp(current.current.z, targetZ, 3.5, safeDelta);

    camera.position.copy(current.current);
    camera.lookAt(LOOK_AT);
  });

  return null;
}