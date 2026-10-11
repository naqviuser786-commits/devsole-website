// FILE: src/pages/ServicesPage.tsx
import { useEffect } from 'react';
import { Services } from '@/components/sections/Services';
import { CostEstimator } from '@/components/sections/CostEstimator';
import { Contact } from '@/components/sections/Contact';

export function ServicesPage() {
  useEffect(() => {
    // 1. Google Search Title & Meta Tags Optimization
    document.title = 'Web Development, SEO & Custom Software Services — DEVSOLE Soft';
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Explore DEVSOLE Soft services: Custom web development, Google SEO ranking, E-Commerce online stores, real estate property portals, and custom business calculators.'
      );
    }

    // 2. Canonical URL update
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://devsolesoft.com/services');
    }
  }, []);

  return (
    <div className="relative pt-24 sm:pt-28 min-h-screen overflow-hidden">
      {/* Background Aura */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-16 left-1/2 -translate-x-1/2 h-[550px] w-[900px] rounded-full bg-blue-600/[0.09] blur-[150px]" />
        <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_20%,#000_70%,transparent_100%)]" />
      </div>

      {/* Dedicated Page Hero Header (Simple & Client-Friendly) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 pb-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-blue-400">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
          <span>Core Development Services</span>
        </div>
        <h1 className="mt-4 font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Websites, SEO & Custom Software Built for Real Growth
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
          From fast business websites and Google SEO ranking to online stores and custom business software — we build clean, reliable digital solutions that bring you real paying clients.
        </p>
      </div>

      {/* Main Services Section */}
      <Services />

      {/* Live Financial Cost Estimator */}
      <div className="border-t border-white/10 mt-12">
        <CostEstimator />
      </div>

      {/* Direct Project Brief Desk */}
      <div className="border-t border-white/10 mt-12">
        <Contact />
      </div>
    </div>
  );
}

export default ServicesPage;