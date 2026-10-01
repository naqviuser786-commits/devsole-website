/**
 * Multiple 3D components (logo groups, camera rig, particles) need to read
 * "how far through the page has the user scrolled" every animation frame.
 * Routing that through React state/context would re-render the whole tree
 * 60x/second, so instead we keep one mutable object that GSAP's
 * ScrollTrigger writes to and R3F's useFrame reads from directly.
 */
export const scrollProgress = {
  /** Normalized 0–1 progress across the full page scroll. */
  value: 0,
  /** -1..1, positive when scrolling down. Useful for directional effects. */
  velocitySign: 0,
};

export function setScrollProgress(next: number, direction: number) {
  scrollProgress.value = next;
  scrollProgress.velocitySign = direction;
}
