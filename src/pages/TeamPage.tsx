// FILE: src/pages/TeamPage.tsx
import { useEffect } from 'react';
import { Team } from '@/components/sections/Team';
import { Contact } from '@/components/sections/Contact';

export function TeamPage() {
  useEffect(() => {
    // 1. Google Search Title & Meta Tags Optimization
    document.title = 'Leadership & Senior Engineering Team — DEVSOLE Soft';
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Meet the engineering leadership and senior full-stack architects behind DEVSOLE Soft, led by founder Aoun Abbas. Direct technical leadership on every client sprint.'
      );
    }

    // 2. Canonical URL update
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://devsolesoft.com/team');
    }
  }, []);

  return (
    <div className="pt-24 sm:pt-28 min-h-screen">
      {/* Dedicated Page Hero Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 pb-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-blue-400">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
          <span>Core Engineering Roster</span>
        </div>
        <h1 className="mt-4 font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Executive Leadership & Full-Stack Engineers
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm text-slate-400 leading-relaxed">
          You work directly with senior software architects and database engineers. No outsourced code, no junior handoffs, and 100% transparent milestone delivery.
        </p>
      </div>

      {/* Main Team Profiles Section (Founder & Core Engineers) */}
      <Team />

      {/* Direct Project Consultation Channel */}
      <div className="border-t border-white/10 mt-12">
        <Contact />
      </div>
    </div>
  );
}

export default TeamPage;