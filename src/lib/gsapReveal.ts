// FILE: src/lib/gsapReveal.ts
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Elite Human-Crafted GSAP Motion Engine
 * Delivers 60fps/120fps masked typography reveals and hardware-accelerated stagger effects.
 */
export function initGsapReveal(): () => void {
  // Agar user ne system level par reduced motion chala rakha ho to animation skip karein
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) return () => {};

  const ctx = gsap.context(() => {
    // 1. Masked Typography Slide-Up (Words emerge smoothly from an invisible overflow mask)
    const maskElements = document.querySelectorAll<HTMLElement>('[data-gsap="mask-up"]');
    maskElements.forEach((el) => {
      gsap.fromTo(
        el,
        {
          yPercent: 100,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // 2. Subtle Cinematic Fade-Up (Cards and bento containers)
    const fadeElements = document.querySelectorAll<HTMLElement>('[data-gsap="fade-up"]');
    fadeElements.forEach((el) => {
      gsap.fromTo(
        el,
        {
          y: 35,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // 3. Staggered Grid Groups (Cards appear one after another with exact timing)
    const staggerGroups = document.querySelectorAll<HTMLElement>('[data-gsap="stagger-group"]');
    staggerGroups.forEach((group) => {
      const children = group.children;
      if (!children.length) return;

      gsap.fromTo(
        children,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: group,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // 4. Parallax Frame Scrub (Slight scale & vertical drift inside viewport)
    const parallaxFrames = document.querySelectorAll<HTMLElement>('[data-gsap="parallax"]');
    parallaxFrames.forEach((frame) => {
      gsap.fromTo(
        frame,
        {
          y: -15,
        },
        {
          y: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: frame,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );
    });
  });

  return () => {
    ctx.revert();
  };
}