import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { DevsoleLogo, type DevsoleLogoHandle } from '@/components/3d/DevsoleLogo';
import { isWebGLAvailable } from '@/lib/webgl';

function HeaderLogoScene({ hovered }: { hovered: boolean }) {
  const handleRef = useRef<DevsoleLogoHandle>(null);

  useFrame((_state, delta) => {
    const root = handleRef.current?.root;
    if (!root) return;

    // Hover par smooth gentle scale (Canvas se bahar nahi nikalega)
    const targetScale = hovered ? 1.15 : 1.0;
    const s = THREE.MathUtils.damp(root.scale.x, targetScale, 10, delta);
    root.scale.setScalar(s);
  });

  // Scale 1.05 model ko pure frame me perfect fit karega bina kinare kate
  return <DevsoleLogo ref={handleRef} scale={1.05} />;
}

export function HeaderLogo() {
  const [hovered, setHovered] = useState(false);
  const [webglOk] = useState(isWebGLAvailable);

  if (!webglOk) {
    return (
      <img
        src="/images/devsole-logo-reference.png"
        alt="DEVSOLE"
        className="h-10 w-10 object-contain"
      />
    );
  }

  return (
    <div
      className="relative flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas
        dpr={[1, 2]} // High-resolution crispness
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        // Camera distance 3.0 rotating logo ko ample space deta hai taaki koi side clip na ho
        camera={{ fov: 32, position: [0, 0, 3.0] }}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
      >
        {/* Balanced, clean lights: No harsh pixel burning or noise */}
        <ambientLight intensity={0.7} />
        
        {/* Soft Key Light for Chrome reflection */}
        <directionalLight position={[3, 4, 3]} intensity={1.8} color="#ffffff" />
        
        {/* Neon Cyan Rim Light */}
        <directionalLight position={[-3, 2, -1]} intensity={1.2} color="#00e5ff" />
        
        {/* Center Point Fill */}
        <pointLight position={[0, 0, 2]} intensity={1.0} color="#38bdf8" distance={6} />

        <Suspense fallback={null}>
          <HeaderLogoScene hovered={hovered} />
        </Suspense>
      </Canvas>
    </div>
  );
}