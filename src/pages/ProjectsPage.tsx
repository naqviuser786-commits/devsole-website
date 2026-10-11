// FILE: src/pages/ProjectsPage.tsx
import { useEffect } from 'react';
import { Projects } from '@/components/sections/Projects';
import { Testimonials } from '@/components/sections/Testimonials';
import { Contact } from '@/components/sections/Contact';

export function ProjectsPage() {
  useEffect(() => {
    // 1. Google Search Title & Meta Tags Optimization
    document.title = 'Production Portfolio & Shipped Web Systems — DEVSOLE Soft';
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Explore live production web applications, specialized PropTech real estate platforms, and custom SaaS tools built by DEVSOLE Soft with verified sub-second latency.'
      );
    }

    // 2. Canonical URL update
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://devsolesoft.com/projects');
    }
  }, []);

  return (
    <div className="relative pt-24 sm:pt-28 min-h-screen overflow-hidden">
      {/* Page-Specific Custom Background Aura (Cyan & Deep Electric Blue) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-16 left-1/2 -translate-x-1/2 h-[550px] w-[950px] rounded-full bg-cyan-500/[0.07] blur-[160px]" />
        <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_20%,#000_70%,transparent_100%)]" />
      </div>

      {/* Dedicated Projects Page Hero Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 pb-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-cyan-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
          <span>15+ Shipped Deployments · &lt; 0.8s Global Latency</span>
        </div>
        <h1 className="mt-4 font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Production Work & Live Case Studies
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm text-slate-400 leading-relaxed">
          Filter through our live deployments across PropTech, SaaS tools, and high-velocity commerce engines. Inspect any project for full architectural breakdowns and live links.
        </p>
      </div>

      {/* Main Interactive Portfolio (Supabase Live Projects + Modal Inspector) */}
      <Projects />

      {/* Verified Client Testimonials */}
      <div className="border-t border-white/10 mt-12">
        <Testimonials />
      </div>

      {/* Direct Project Brief Desk */}
      <div className="border-t border-white/10 mt-12">
        <Contact />
      </div>
    </div>
  );
}

export default ProjectsPage;