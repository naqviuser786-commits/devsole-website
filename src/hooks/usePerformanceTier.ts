import { useEffect, useState } from 'react';

export type PerformanceTier = 'high' | 'low';

/**
 * Coarse heuristic — not a benchmark. Mobile/small-viewport or low core
 * count devices get fewer particles and lighter post-processing, per the
 * "reduce particle count / expensive effects on mobile" requirement.
 */
export function usePerformanceTier(): PerformanceTier {
  const [tier, setTier] = useState<PerformanceTier>('high');

  useEffect(() => {
    const isSmallViewport = window.innerWidth < 768;
    const isLowCore = (navigator.hardwareConcurrency ?? 8) <= 4;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    setTier(isSmallViewport || (isLowCore && isCoarsePointer) ? 'low' : 'high');
  }, []);

  return tier;
}
