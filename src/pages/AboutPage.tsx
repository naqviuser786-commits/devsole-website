// FILE: src/pages/AboutPage.tsx
import { useEffect } from 'react';
import { About } from '@/components/sections/About';
import { WhyDevsole } from '@/components/sections/WhyDevsole';
import { Team } from '@/components/sections/Team';
import { Contact } from '@/components/sections/Contact';

export function AboutPage() {
  useEffect(() => {
    // 1. Google Search Title & Meta Tags Optimization
    document.title = 'About DEVSOLE Soft — High-Performance Web Engineering Studio';
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Learn about DEVSOLE Soft: Our engineering philosophy, brand architecture, and commitment to sub-second full-stack web applications with 100% source code ownership.'
      );
    }

    // 2. Canonical URL update
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://devsolesoft.com/about');
    }
  }, []);

  return (
    <div className="relative pt-24 sm:pt-28 min-h-screen overflow-hidden">
      {/* Page-Specific Custom Background Aura (Royal Cobalt & Obsidian Blueprint) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-16 left-1/2 -translate-x-1/2 h-[550px] w-[900px] rounded-full bg-blue-600/[0.08] blur-[150px]" />
        <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_20%,#000_70%,transparent_100%)]" />
      </div>

      {/* Dedicated About Page Hero Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 pb-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-blue-400">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
          <span>Company Identity & Engineering Principles</span>
        </div>
        <h1 className="mt-4 font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          What is DEVSOLE Soft?
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm text-slate-400 leading-relaxed">
          An independent software studio built for fast, resilient full-stack web engineering, specialized real estate portals, and automated SaaS tools with zero technical debt.
        </p>
      </div>

      {/* Brand Architecture & Core Identity Bento Grid */}
      <About />

      {/* Engineering Comparison Benchmark Matrix */}
      <div className="border-t border-white/10 mt-12">
        <WhyDevsole />
      </div>

      {/* Technical Leadership & Core Team */}
      <div className="border-t border-white/10 mt-12">
        <Team />
      </div>

      {/* Direct Project Brief Desk */}
      <div className="border-t border-white/10 mt-12">
        <Contact />
      </div>
    </div>
  );
}

export default AboutPage;