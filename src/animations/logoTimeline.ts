/**
 * Maps normalized page-scroll progress (0–1) to the DEVSOLE logo's pose.
 *
 * Zones:
 *   [0            .. deconstructStart]  fully assembled (post-intro idle)
 *   (deconstructStart .. deconstructEnd] easing OUT: I left, C right, symbols up
 *   (deconstructEnd   .. reassembleStart] holding — components live in the
 *                                          environment while content scrolls
 *   (reassembleStart  .. reassembleEnd]  easing back IN to fully assembled
 *   (reassembleEnd    .. 1]              fully assembled (final CTA)
 *
 * Kept as pure functions (no GSAP/Three dependency) so the timeline math is
 * easy to reason about and unit-test independently of the render layer.
 */

export const LOGO_ZONES = {
  deconstructStart: 0.08,
  deconstructEnd: 0.8,
  reassembleStart: 0.92,
  reassembleEnd: 1.0,
} as const;

/** World-unit travel distances; tuned for the default camera distance in Scene.tsx. */
export const LOGO_TRAVEL = {
  iX: -1.9,
  cX: 1.9,
  symbolsY: 0.55,
  iRotationZ: -0.1,
  cRotationZ: 0.1,
} as const;

function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n));
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

export interface LogoPose {
  /** 0 = fully assembled, 1 = fully deconstructed. */
  t: number;
  iX: number;
  cX: number;
  symbolsY: number;
  iRotationZ: number;
  cRotationZ: number;
  /** 0..1, drives bloom strength / particle activity. */
  energyIntensity: number;
}

export function getLogoPose(progress: number): LogoPose {
  const { deconstructStart, deconstructEnd, reassembleStart, reassembleEnd } = LOGO_ZONES;
  const p = clamp01(progress);

  let t: number;
  let isTransitioning: boolean;

  if (p <= deconstructStart) {
    t = 0;
    isTransitioning = false;
  } else if (p <= deconstructEnd) {
    t = smoothstep(deconstructStart, deconstructEnd, p);
    isTransitioning = true;
  } else if (p <= reassembleStart) {
    t = 1;
    isTransitioning = false;
  } else if (p <= reassembleEnd) {
    t = 1 - smoothstep(reassembleStart, reassembleEnd, p);
    isTransitioning = true;
  } else {
    t = 0;
    isTransitioning = false;
  }

  const holdEnergy = 0.3;
  const transitionEnergy = 0.55 + 0.45 * Math.sin(clamp01(t) * Math.PI);
  const energyIntensity = clamp01(isTransitioning ? transitionEnergy : holdEnergy);

  return {
    t,
    iX: LOGO_TRAVEL.iX * t,
    cX: LOGO_TRAVEL.cX * t,
    symbolsY: LOGO_TRAVEL.symbolsY * Math.min(1, t * 1.3),
    iRotationZ: LOGO_TRAVEL.iRotationZ * t,
    cRotationZ: LOGO_TRAVEL.cRotationZ * t,
    energyIntensity,
  };
}

/** True once the reassembly has essentially completed — used to fire the one-shot final burst VFX. */
export function isFinalReassembly(progress: number): boolean {
  return progress >= LOGO_ZONES.reassembleEnd - 0.001;
}
