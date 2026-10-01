import { useRef, useMemo, forwardRef, useImperativeHandle } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';

export interface DevsoleLogoHandle {
  root: THREE.Group | null;
}

export interface DevsoleLogoProps {
  scale?: number;
  isMobile?: boolean;
}

export const DevsoleLogo = forwardRef<DevsoleLogoHandle, DevsoleLogoProps>(
  function DevsoleLogo({ scale = 1, isMobile = false }, ref) {
    const { scene } = useGLTF('/models/logo.glb');
    const groupRef = useRef<THREE.Group>(null);

    useImperativeHandle(ref, () => ({
      root: groupRef.current,
    }));

    const clonedScene = useMemo(() => {
      const clone = scene.clone(true);

      // 1. Chrome + Neon Edge Material (Center: Chrome, Edges: Neon Glow)
      const chromeNeonMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#d8e2ec'), // Silver Chrome metal
        metalness: 0.95,                   // Maximum chrome reflection
        roughness: 0.1,                    // Smooth mirror polish
        emissive: new THREE.Color('#021526'), // Deep navy base shadow
      });

      // Fresnel Rim Shader: Edges par Neon glow, Center par pure Chrome shine
      chromeNeonMaterial.onBeforeCompile = (shader) => {
        shader.uniforms.rimColor = { value: new THREE.Color('#00f0ff') }; // Electric neon cyan
        shader.uniforms.rimIntensity = { value: 2.2 };
        shader.uniforms.rimPower = { value: 2.0 };

        shader.fragmentShader = `
          uniform vec3 rimColor;
          uniform float rimIntensity;
          uniform float rimPower;
          ${shader.fragmentShader}
        `.replace(
          '#include <dithering_fragment>',
          `#include <dithering_fragment>
           vec3 viewDir = normalize(vViewPosition);
           vec3 n = normalize(vNormal);
           float rim = 1.0 - max(0.0, abs(dot(n, viewDir)));
           rim = pow(rim, rimPower);
           gl_FragColor.rgb += rimColor * rim * rimIntensity;`
        );
      };

      // 2. Inner Symbols (< aur .) ke liye Glowing Neon Material
      const innerNeonMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#00d8ff'),
        emissive: new THREE.Color('#00f0ff'),
        emissiveIntensity: 1.6,
        roughness: 0.15,
        metalness: 0.8,
      });

      clone.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const name = child.name.toLowerCase();
          const isInnerSymbol =
            name.includes('symbol') ||
            name.includes('bracket') ||
            name.includes('chevron') ||
            name.includes('inner') ||
            name.includes('dot');

          child.material = isInnerSymbol ? innerNeonMaterial : chromeNeonMaterial;
        }
      });

      return clone;
    }, [scene]);

    // Smooth continuous rotation
    useFrame((_, delta) => {
      if (groupRef.current) {
        groupRef.current.rotation.y += delta * 0.35;
      }
    });

    const finalScale = isMobile ? scale * 0.65 : scale;

    return (
      <group ref={groupRef} scale={finalScale} dispose={null}>
        <Center>
          <primitive object={clonedScene} />
        </Center>
      </group>
    );
  }
);

useGLTF.preload('/models/logo.glb');