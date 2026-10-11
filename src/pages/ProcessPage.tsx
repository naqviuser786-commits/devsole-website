// FILE: src/pages/ProcessPage.tsx
import { useEffect } from 'react';
import { Process } from '@/components/sections/Process';
import { FAQ } from '@/components/sections/FAQ';
import { Contact } from '@/components/sections/Contact';

export function ProcessPage() {
  useEffect(() => {
    // 1. Google Search Title & Meta Tags Optimization
    document.title = 'Agile 21-Day Sprint Process & Delivery Roadmap — DEVSOLE Soft';
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Discover our transparent 4-stage, 21-day agile web engineering process. From technical architecture blueprints to private staging reviews and live cloud handovers.'
      );
    }

    // 2. Canonical URL update
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://devsolesoft.com/process');
    }
  }, []);

  return (
    <div className="pt-24 sm:pt-28 min-h-screen">
      {/* Dedicated Page Hero Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 pb-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-blue-400">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
          <span>Predictable Execution Lifecycle</span>
        </div>
        <h1 className="mt-4 font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Transparent 21-Day Agile Sprint Roadmap
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm text-slate-400 leading-relaxed">
          Zero surprise deliveries. You test, inspect, and approve private staging environments during every weekly sprint before clearing any milestone payment.
        </p>
      </div>

      {/* Main 4-Stage Sprint Process Section */}
      <Process />

      {/* Process FAQ & Clarity Section */}
      <div className="border-t border-white/10 mt-12">
        <FAQ />
      </div>

      {/* Direct Project Brief Desk */}
      <div className="border-t border-white/10 mt-12">
        <Contact />
      </div>
    </div>
  );
}

export default ProcessPage;