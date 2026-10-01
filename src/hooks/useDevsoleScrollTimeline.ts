import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setScrollProgress } from '@/lib/scrollProgress';

gsap.registerPlugin(ScrollTrigger);

/**
 * Creates a single ScrollTrigger spanning the entire document height and
 * reports normalized progress (0 at top, 1 at bottom) both to the shared
 * `scrollProgress` store (read by 3D components in their useFrame loops)
 * and to an optional callback (used for one-shot DOM-side effects).
 */
export function useDevsoleScrollTimeline(onProgress?: (progress: number) => void) {
  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.6,
      onUpdate: (self) => {
        setScrollProgress(self.progress, self.direction);
        onProgressRef.current?.(self.progress);
      },
    });

    // The 3D canvas and page content mount slightly asynchronously; make
    // sure ScrollTrigger has correct measurements once everything settles.
    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      window.clearTimeout(refreshId);
      trigger.kill();
    };
  }, []);
}
