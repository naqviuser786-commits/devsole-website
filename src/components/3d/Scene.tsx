import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { LogoRig } from './LogoRig';
import { EnergyParticles } from './EnergyParticles';
import { CameraRig } from './CameraRig';
import { usePerformanceTier } from '@/hooks/usePerformanceTier';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function Scene() {
  const tier = usePerformanceTier();
  const reducedMotion = useReducedMotion();
  const particleCount = tier === 'low' ? 60 : 160;

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        dpr={tier === 'low' ? [1, 1.25] : [1, 1.6]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        camera={{ fov: 35, near: 0.1, far: 50, position: [0, 0.1, 6.2] }}
      >
        <color attach="background" args={['#03050a']} />
        <fog attach="fog" args={['#03050a', 8, 22]} />

        {/* Ambient & Chrome Reflection Lights */}
        <ambientLight intensity={0.5} />
        
        {/* Soft Key Light: Chrome ki mirror shine ke liye (Calibrated to prevent flash) */}
        <directionalLight position={[4, 5, 5]} intensity={1.5} color="#ffffff" />
        
        {/* Neon Cyan Rim Light: Logo edges outline */}
        <directionalLight position={[-4, 3, -2]} intensity={1.2} color="#00e5ff" />
        
        {/* Fill Blue Light from bottom */}
        <directionalLight position={[0, -4, 2]} intensity={0.6} color="#1d4ed8" />
        
        {/* Center Point Light */}
        <pointLight position={[0, 0.5, 2.5]} intensity={0.9} color="#38bdf8" distance={8} />

        <Suspense fallback={null}>
          <LogoRig />
          <EnergyParticles count={particleCount} />
        </Suspense>

        <CameraRig />

        {!reducedMotion && (
          <EffectComposer multisampling={tier === 'low' ? 0 : 2}>
            <Bloom
              luminanceThreshold={0.88} // Prevents unwanted flashing/glare on chrome edges
              luminanceSmoothing={0.3}
              mipmapBlur
              intensity={tier === 'low' ? 0.4 : 0.65}
            />
            <Vignette eskil={false} offset={0.25} darkness={0.65} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}