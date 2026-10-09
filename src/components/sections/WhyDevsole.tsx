import { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { siteSettings } from '@/data/siteData';

export function WhyDevsole() {
  const [activeView, setActiveView] = useState<'devsole' | 'legacy'>('devsole');
  const phone = siteSettings.whatsapp.replace(/\D/g, '');

  return (
    <section
      id="why-devsole"
      aria-label="Engineering Comparison"
      className="relative mx-auto max-w-6xl px-4 sm:px-6 py-24 sm:py-28 overflow-hidden"
    >
      <SectionHeading
        eyebrow="The Engineering Standard"
        title="Why Serious Businesses Choose DEVSOLE"
        description="A direct technical comparison between bloated generic CMS themes and our high-performance custom architecture."
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
            <span>DEVSOLE Custom Architecture</span>
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
            <span>Generic Theme / CMS Template</span>
          </button>
        </div>
      </div>

      {/* Comparison Grid: Stacks on mobile, 2 columns on desktop */}
      <div className="mt-10 grid gap-6 lg:gap-8 lg:grid-cols-2">
        {/* 1. Conventional Off-the-Shelf Theme Model */}
        <div
          className={`relative rounded-3xl border p-6 sm:p-8 backdrop-blur-md transition-all duration-500 ${
            activeView === 'legacy'
              ? 'border-red-500/50 bg-red-950/15 shadow-[0_0_35px_rgba(239,68,68,0.18)]'
              : 'border-white/5 bg-navy-950/40 opacity-70 hover:opacity-90'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="rounded-full border border-red-500/40 bg-red-500/10 px-3 py-1 text-[10px] sm:text-[11px] font-bold text-red-400">
              Commercial Template Model
            </span>
            <span className="font-mono text-xs font-bold text-red-400">High Latency</span>
          </div>

          <h3 className="mt-4 font-display text-lg sm:text-xl font-bold text-white">
            Generic Drag-and-Drop / Pre-made Templates
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-chrome-400">
            Relies on bloated multi-purpose builders, 30+ unvetted third-party plugins, unindexed database queries, and redundant CSS/JS assets that degrade mobile conversion rates.
          </p>

          {/* Performance Benchmark Meter */}
          <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-950/20 p-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-chrome-400">Average TTFB / Load Latency:</span>
              <span className="font-mono font-bold text-red-400">&gt; 3.8s (Fails Core Web Vitals)</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-white/5 overflow-hidden">
              <div className="h-full w-[30%] rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
            </div>
          </div>

          <div className="mt-6 space-y-3.5 border-t border-white/5 pt-6 text-xs text-chrome-300">
            <div className="flex items-center justify-between">
              <span className="text-chrome-400">Database Optimization:</span>
              <span className="font-semibold text-red-400">Slow unindexed SQL queries</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-chrome-400">Security Posture:</span>
              <span className="font-semibold text-red-400">Frequent plugin patch dependencies</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-chrome-400">Scalability & Code:</span>
              <span className="font-semibold text-red-400">Heavy framework overhead, rigid layout</span>
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
            <span className="font-mono text-xs font-bold text-energy-bright">Core Web Vitals: 99+</span>
          </div>

          <h3 className="mt-4 font-display text-lg sm:text-xl font-bold text-white">
            Bespoke Full-Stack Engineering & SaaS
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-chrome-300">
            Hand-crafted lightweight architecture using lean server endpoints, composite relational MySQL indexing, zero plugin bloat, and sub-second reactive frontend rendering.
          </p>

          {/* Performance Benchmark Meter */}
          <div className="mt-5 rounded-2xl border border-energy-bright/30 bg-energy/10 p-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-chrome-300 font-medium">Average TTFB / Load Latency:</span>
              <span className="font-mono font-bold text-energy-bright">&lt; 0.8s (Instant Global Delivery)</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-white/5 overflow-hidden">
              <div className="h-full w-[96%] rounded-full bg-energy-bright shadow-[0_0_10px_#00f0ff]" />
            </div>
          </div>

          <div className="mt-6 space-y-3.5 border-t border-white/5 pt-6 text-xs text-chrome-200">
            <div className="flex items-center justify-between">
              <span className="text-chrome-400">Database Optimization:</span>
              <span className="font-semibold text-energy-bright">Composite indexing, sub-15ms queries</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-chrome-400">Security Posture:</span>
              <span className="font-semibold text-energy-bright">Sanitized inputs & zero-bloat attack vector</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-chrome-400">Scalability & Code:</span>
              <span className="font-semibold text-energy-bright">Modular architecture, 100% IP handover</span>
            </div>
          </div>

          <div className="mt-7">
            <a
              href={`https://wa.me/${phone}?text=Hi%20DEVSOLE!%20I%20want%20to%20build%20a%20high-performance%20custom%20web%20application.`}
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
            Collaborate directly with founder & lead architect Aoun Abbas. No non-technical middle layers or communication delays.
          </p>
        </div>

        <div className="rounded-2xl border border-white/5 bg-navy-950/60 p-6 backdrop-blur-md transition-colors hover:border-energy/40">
          <div className="h-1.5 w-7 rounded-full bg-energy-bright shadow-[0_0_6px_#00f0ff]" />
          <h4 className="mt-4 font-display text-base font-semibold text-white">
            Sprint-Based Transparency
          </h4>
          <p className="mt-2 text-xs leading-relaxed text-chrome-400">
            Review live staging sandboxes weekly. You test and verify every module before any milestone clearance.
          </p>
        </div>

        <div className="rounded-2xl border border-white/5 bg-navy-950/60 p-6 backdrop-blur-md transition-colors hover:border-energy/40">
          <div className="h-1.5 w-7 rounded-full bg-energy-bright shadow-[0_0_6px_#00f0ff]" />
          <h4 className="mt-4 font-display text-base font-semibold text-white">
            Full Code & IP Ownership
          </h4>
          <p className="mt-2 text-xs leading-relaxed text-chrome-400">
            Zero vendor lock-in. Full GitHub repository history, database schemas, and credentials transferred upon completion.
          </p>
        </div>
      </div>
    </section>
  );
}