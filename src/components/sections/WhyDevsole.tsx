import { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { siteSettings } from '@/data/siteData';

export function WhyDevsole() {
  const [activeView, setActiveView] = useState<'devsole' | 'legacy'>('devsole');
  const phone = siteSettings.whatsapp.replace(/\D/g, '');

  return (
    <section id="why-devsole" className="relative mx-auto max-w-6xl px-4 sm:px-6 py-24 sm:py-28 overflow-hidden">
      <SectionHeading
        eyebrow="The Engineering Standard"
        title="Why Serious Businesses Choose DEVSOLE"
        description="A direct side-by-side comparison between bloated conventional web templates and our high-performance custom architecture."
        align="center"
      />

      {/* Interactive Switcher: 100% Responsive for Mobile & Desktop */}
      <div className="mt-8 sm:mt-10 flex justify-center">
        <div className="inline-flex max-w-full flex-wrap sm:flex-nowrap items-center justify-center gap-1.5 rounded-2xl sm:rounded-full border border-white/10 bg-navy-950/80 p-1.5 backdrop-blur-md shadow-inner">
          <button
            type="button"
            onClick={() => setActiveView('devsole')}
            className={`flex items-center gap-1.5 rounded-full px-4 sm:px-5 py-2 text-[11px] sm:text-xs font-bold transition-all duration-300 ${
              activeView === 'devsole'
                ? 'bg-energy-bright text-navy-950 shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                : 'text-chrome-400 hover:text-white'
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-navy-950 shrink-0" />
            <span>DEVSOLE Standard (99 Score)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveView('legacy')}
            className={`flex items-center gap-1.5 rounded-full px-4 sm:px-5 py-2 text-[11px] sm:text-xs font-bold transition-all duration-300 ${
              activeView === 'legacy'
                ? 'border border-red-500/40 bg-red-500/20 text-red-300 shadow-[0_0_20px_rgba(239,68,68,0.25)]'
                : 'text-chrome-400 hover:text-white'
            }`}
          >
            <span>Conventional Web</span>
          </button>
        </div>
      </div>

      {/* Comparison Grid: Stacks on mobile, 2 columns on desktop */}
      <div className="mt-10 grid gap-6 lg:gap-8 lg:grid-cols-2">
        {/* 1. Conventional Agency / Template Model */}
        <div
          className={`relative rounded-3xl border p-6 sm:p-8 backdrop-blur-md transition-all duration-500 ${
            activeView === 'legacy'
              ? 'border-red-500/50 bg-red-950/15 shadow-[0_0_35px_rgba(239,68,68,0.18)]'
              : 'border-white/5 bg-navy-950/40 opacity-70 hover:opacity-90'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="rounded-full border border-red-500/40 bg-red-500/10 px-3 py-1 text-[10px] sm:text-[11px] font-bold text-red-400">
              Legacy Freelancer Approach
            </span>
            <span className="font-mono text-xs font-bold text-red-400">Score: 41 / 100</span>
          </div>

          <h3 className="mt-4 font-display text-lg sm:text-xl font-bold text-white">
            Conventional Freelancer / Theme Template
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-chrome-400">
            Relies on bloated multi-purpose themes, 35+ third-party plugins, unindexed database queries, and generic page builders that slow down user conversions.
          </p>

          {/* Visual Performance Meter for Legacy */}
          <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-950/20 p-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-chrome-400">Page Load Latency:</span>
              <span className="font-mono font-bold text-red-400">4.8s (Sluggish)</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-white/5 overflow-hidden">
              <div className="h-full w-[25%] rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
            </div>
          </div>

          <div className="mt-6 space-y-3.5 border-t border-white/5 pt-6 text-xs text-chrome-300">
            <div className="flex items-center justify-between">
              <span className="text-chrome-400">Database Efficiency:</span>
              <span className="font-bold text-red-400">Unindexed queries, sluggish TTFB</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-chrome-400">Security Architecture:</span>
              <span className="font-bold text-red-400">Vulnerable plugin exploit vector</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-chrome-400">Code Quality:</span>
              <span className="font-bold text-red-400">Spaghetti code, hard to scale</span>
            </div>
          </div>
        </div>

        {/* 2. DEVSOLE High-Performance Custom Architecture */}
        <div
          className={`relative rounded-3xl border-2 p-6 sm:p-8 backdrop-blur-md transition-all duration-500 ${
            activeView === 'devsole'
              ? 'border-energy-bright/60 bg-gradient-to-b from-energy/20 via-navy-950/90 to-navy-950 shadow-[0_0_50px_rgba(0,240,255,0.2)] lg:-translate-y-2'
              : 'border-white/5 bg-navy-950/40 opacity-70 hover:opacity-90'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-energy-bright bg-navy-950 px-3.5 py-1 text-[10px] sm:text-[11px] font-bold text-energy-bright shadow-[0_0_15px_rgba(0,240,255,0.4)]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-energy-bright" />
              The DEVSOLE Standard
            </span>
            <span className="font-mono text-xs font-bold text-energy-bright">Google Score: 99 / 100</span>
          </div>

          <h3 className="mt-4 font-display text-lg sm:text-xl font-bold text-white">
            Custom Full-Stack Engineering & SaaS
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-chrome-300">
            Hand-crafted lightweight architecture using clean PHP backend endpoints, optimized relational MySQL schemas, and fast responsive UI engineered for exponential growth.
          </p>

          {/* Visual Performance Meter for DEVSOLE */}
          <div className="mt-5 rounded-2xl border border-energy-bright/30 bg-energy/10 p-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-chrome-300 font-medium">Page Load Latency:</span>
              <span className="font-mono font-bold text-energy-bright">0.8s (Sub-Second Delivery)</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-white/5 overflow-hidden">
              <div className="h-full w-[95%] rounded-full bg-energy-bright shadow-[0_0_10px_#00f0ff]" />
            </div>
          </div>

          <div className="mt-6 space-y-3.5 border-t border-white/10 pt-6 text-xs text-chrome-200">
            <div className="flex items-center justify-between">
              <span className="text-chrome-400">Database Efficiency:</span>
              <span className="font-bold text-energy-bright">Structured indexes, millisecond queries</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-chrome-400">Security Architecture:</span>
              <span className="font-bold text-energy-bright">Sanitized inputs & zero-bloat attack surface</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-chrome-400">Code Quality:</span>
              <span className="font-bold text-energy-bright">Clean modular components, 100% IP ownership</span>
            </div>
          </div>

          <div className="mt-7">
            <a
              href={`https://wa.me/${phone}?text=Hi%20DEVSOLE!%20I%20want%20to%20upgrade%20to%20a%20high-performance%20custom%20web%20app.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-energy-bright py-3 text-xs font-bold text-navy-950 shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-transform hover:scale-102"
            >
              <span>⚡ Build on the DEVSOLE Standard →</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3 Core Client Pillars: 1 col on mobile, 3 cols on tablet & PC */}
      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/5 bg-navy-950/60 p-6 backdrop-blur-md transition-colors hover:border-energy/40">
          <div className="h-1.5 w-7 rounded-full bg-energy-bright shadow-[0_0_6px_#00f0ff]" />
          <h4 className="mt-4 font-display text-base font-semibold text-white">
            Direct Founder Access
          </h4>
          <p className="mt-2 text-xs leading-relaxed text-chrome-400">
            No endless layers of non-technical account managers. You collaborate directly with founder & lead architect Aoun Abbas.
          </p>
        </div>

        <div className="rounded-2xl border border-white/5 bg-navy-950/60 p-6 backdrop-blur-md transition-colors hover:border-energy/40">
          <div className="h-1.5 w-7 rounded-full bg-energy-bright shadow-[0_0_6px_#00f0ff]" />
          <h4 className="mt-4 font-display text-base font-semibold text-white">
            Sprint-Based Transparency
          </h4>
          <p className="mt-2 text-xs leading-relaxed text-chrome-400">
            Weekly live staging demonstrations. You see, test, and approve features in real-time as they are engineered.
          </p>
        </div>

        <div className="rounded-2xl border border-white/5 bg-navy-950/60 p-6 backdrop-blur-md transition-colors hover:border-energy/40">
          <div className="h-1.5 w-7 rounded-full bg-energy-bright shadow-[0_0_6px_#00f0ff]" />
          <h4 className="mt-4 font-display text-base font-semibold text-white">
            100% IP & Code Ownership
          </h4>
          <p className="mt-2 text-xs leading-relaxed text-chrome-400">
            No proprietary lock-in. Full Git repository commits, database schemas, and documentation handed over on completion.
          </p>
        </div>
      </div>
    </section>
  );
}