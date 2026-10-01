import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lenis: Lenis | null = null;

/**
 * Starts Lenis smooth scrolling and drives it from GSAP's own ticker so
 * ScrollTrigger (which reads the native scroll position) stays perfectly
 * in sync with the smoothed scroll. Returns a cleanup function.
 */
export function initSmoothScroll(): () => void {
  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  lenis = new Lenis({
    duration: prefersReducedMotion ? 0 : 1.1,
    smoothWheel: !prefersReducedMotion,
    syncTouch: false, // native touch scroll feels better on mobile than smoothed touch
  });

  lenis.on('scroll', ScrollTrigger.update);

  const tickerCallback = (time: number) => {
    lenis?.raf(time * 1000);
  };
  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tickerCallback);
    lenis?.destroy();
    lenis = null;
  };
}

export function getLenis() {
  return lenis;
}
