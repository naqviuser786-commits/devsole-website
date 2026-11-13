// FILE: src/pages/TechnologiesPage.tsx
import { useSeo } from '@/seo/useSeo';
import { Technologies } from '@/components/sections/Technologies';
import { WhyDevsole } from '@/components/sections/WhyDevsole';
import { Contact } from '@/components/sections/Contact';

export function TechnologiesPage() {
  useSeo('/technologies');

  return (
    <div className="pt-24 sm:pt-28 min-h-screen">
      {/* Dedicated Page Hero Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 pb-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-blue-400">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
          <span>Full-Stack Engineering Infrastructure</span>
        </div>
        <h1 className="mt-4 font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Battle-Tested, High-Velocity Tech Stack
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm text-slate-400 leading-relaxed">
          We engineer applications with zero framework bloat, sanitised server logic, and composite database indexing to ensure your web systems scale reliably under enterprise load.
        </p>
      </div>

      {/* Main Technologies Section & Live Architecture Inspector */}
      <Technologies />

      {/* Architectural Benchmark Comparison */}
      <div className="border-t border-white/10 mt-12">
        <WhyDevsole />
      </div>

      {/* Project Brief Channel */}
      <div className="border-t border-white/10 mt-12">
        <Contact />
      </div>
    </div>
  );
}

export default TechnologiesPage;