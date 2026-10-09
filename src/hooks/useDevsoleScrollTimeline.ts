import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setScrollProgress } from '@/lib/scrollProgress';

gsap.registerPlugin(ScrollTrigger);

/**
 * Creates a single ScrollTrigger spanning the entire document height and
 * reports normalized progress (0 at top, 1 at bottom) directly to the shared
 * `scrollProgress` store and DOM-side effect callback.
 * 
 * Synchronized with Lenis smooth scroll using direct scrub lockstep.
 */
export function useDevsoleScrollTimeline(onProgress?: (progress: number) => void) {
  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;

  useEffect(() => {
    // Lenis handles the smooth inertia, so scrub: true ensures 1:1 real-time lockstep without delay
    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        setScrollProgress(self.progress, self.direction);
        onProgressRef.current?.(self.progress);
      },
    });

    // Make sure measurements are recalculated once 3D canvas and DOM elements settle
    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      window.clearTimeout(refreshId);
      trigger.kill();
    };
  }, []);
}