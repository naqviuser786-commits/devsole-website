// FILE: src/pages/BlogPage.tsx
import { useEffect } from 'react';
import { Blog } from '@/components/sections/Blog';
import { Contact } from '@/components/sections/Contact';

export function BlogPage() {
  useEffect(() => {
    // 1. Google Search Title & Meta Tags Optimization
    document.title = 'Engineering Insights & Technical Case Studies — DEVSOLE Soft';
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Deep dives into full-stack web engineering, PropTech innovations, database query indexing, and automated SaaS calculators written by the DEVSOLE Soft core team.'
      );
    }

    // 2. Canonical URL update
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://devsolesoft.com/blog');
    }
  }, []);

  return (
    <div className="relative pt-24 sm:pt-28 min-h-screen overflow-hidden">
      {/* Page-Specific Custom Background Aura (Intellectual Deep Violet & Grid) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-indigo-600/[0.08] blur-[150px]" />
        <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_20%,#000_70%,transparent_100%)]" />
      </div>

      {/* Dedicated Page Hero Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 pb-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-indigo-400">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_#818cf8]" />
          <span>Technical Engineering Desk</span>
        </div>
        <h1 className="mt-4 font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Engineering Insights & System Case Studies
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm text-slate-400 leading-relaxed">
          Architectural breakdowns, performance optimization audits, and real-world implementation strategies directly from lead architect Aoun Abbas and our engineering desk.
        </p>
      </div>

      {/* Main Blog & Case Studies Engine (Interactive Reading Modal + Author Badges) */}
      <Blog />

      {/* Direct Project Brief Desk */}
      <div className="border-t border-white/10 mt-12">
        <Contact />
      </div>
    </div>
  );
}

export default BlogPage;