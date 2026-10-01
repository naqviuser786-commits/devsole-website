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
  const particleCount = tier === 'low' ? 70 : 200;

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        dpr={[1, tier === 'low' ? 1.5 : 2]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        camera={{ fov: 35, near: 0.1, far: 50, position: [0, 0.1, 6.2] }}
      >
        <color attach="background" args={['#03050a']} />
        <fog attach="fog" args={['#03050a', 8, 22]} />

        {/* Ambient & Chrome Reflection Lights */}
        <ambientLight intensity={0.45} />
        
        {/* Bright White Key Light: Chrome ki mirror shine aur highlights ke liye */}
        <directionalLight position={[4, 5, 5]} intensity={2.0} color="#ffffff" />
        
        {/* Neon Cyan Rim Light: Logo ke outer edges ko neon glow dene ke liye */}
        <directionalLight position={[-4, 3, -2]} intensity={1.5} color="#00e5ff" />
        
        {/* Fill Blue Light from bottom */}
        <directionalLight position={[0, -4, 2]} intensity={0.8} color="#1d4ed8" />
        
        {/* Center Point Light */}
        <pointLight position={[0, 0.5, 2.5]} intensity={1.2} color="#38bdf8" distance={8} />

        <Suspense fallback={null}>
          <LogoRig />
          <EnergyParticles count={particleCount} />
        </Suspense>

        <CameraRig />

        {!reducedMotion && (
          <EffectComposer multisampling={tier === 'low' ? 0 : 4}>
            <Bloom
              luminanceThreshold={0.75} // Sirf neon edges aur chrome glints glow karein, background saaf rahe
              luminanceSmoothing={0.25}
              mipmapBlur
              intensity={tier === 'low' ? 0.5 : 0.85}
            />
            <Vignette eskil={false} offset={0.25} darkness={0.65} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}