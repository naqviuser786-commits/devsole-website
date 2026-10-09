import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lenis: Lenis | null = null;

/**
 * Starts Lenis smooth scrolling and drives it from GSAP's own ticker so
 * ScrollTrigger stays in perfect sync with the smoothed scroll.
 * 
 * Optimized for 60Hz, 120Hz, and 144Hz high-refresh displays.
 */
export function initSmoothScroll(): () => void {
  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  lenis = new Lenis({
    duration: prefersReducedMotion ? 0 : 1.1,
    smoothWheel: !prefersReducedMotion,
    syncTouch: false, // native touch scroll on mobile is superior to virtual touch
  });

  lenis.on('scroll', ScrollTrigger.update);

  const tickerCallback = (time: number) => {
    lenis?.raf(time * 1000);
  };

  gsap.ticker.add(tickerCallback);

  // Standard lag smoothing prevents stutter jumps during high refresh rate frame drops
  gsap.ticker.lagSmoothing(500, 33);

  return () => {
    gsap.ticker.remove(tickerCallback);
    lenis?.destroy();
    lenis = null;
  };
}

export function getLenis() {
  return lenis;
}