import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { DevsoleLogo } from './DevsoleLogo';

export function LogoRig() {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Mouse Parallax effect
    const targetX = pointer.x * 0.3;
    // 0.25 se model viewport ke theek center me balance rahega
    const targetY = 0.25 + pointer.y * 0.2;

    groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, targetX, 4, delta);
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      targetY + Math.sin(state.clock.elapsedTime * 1.5) * 0.06,
      4,
      delta
    );
  });

  return (
    <group ref={groupRef}>
      {/* scale={3.6} screen ka 2/3 hissa cover karega */}
      <DevsoleLogo scale={2.5} isMobile={isMobile} />
    </group>
  );
}