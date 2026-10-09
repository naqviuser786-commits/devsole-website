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

      // 1. Stable Premium Metallic Chrome Material (Controlled highlights so Bloom never flashes)
      const chromeNeonMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#cdd8e6'),
        metalness: 0.88,
        roughness: 0.22,
        emissive: new THREE.Color('#031224'),
        emissiveIntensity: 0.2,
      });

      // Fresnel Rim Shader with Soft Clamping to completely eliminate harsh flashing fireflies
      chromeNeonMaterial.onBeforeCompile = (shader) => {
        shader.uniforms.rimColor = { value: new THREE.Color('#00e5ff') };
        shader.uniforms.rimIntensity = { value: 1.25 };
        shader.uniforms.rimPower = { value: 2.2 };

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
           float rim = clamp(1.0 - abs(dot(n, viewDir)), 0.0, 1.0);
           rim = pow(rim, rimPower);
           gl_FragColor.rgb += rimColor * (rim * rimIntensity);`
        );
      };

      // 2. Inner Symbols glowing neon cyan material
      const innerNeonMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#00d8ff'),
        emissive: new THREE.Color('#00e5ff'),
        emissiveIntensity: 1.2,
        roughness: 0.25,
        metalness: 0.6,
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
          child.castShadow = false;
          child.receiveShadow = false;
        }
      });

      return clone;
    }, [scene]);

    // Constant, ultra-smooth continuous rotation (clamped delta prevents scroll frame stutters)
    useFrame((_, delta) => {
      if (groupRef.current) {
        const safeDelta = Math.min(delta, 0.033); // Avoid wild delta jumps on scroll
        groupRef.current.rotation.y += safeDelta * 0.35;
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