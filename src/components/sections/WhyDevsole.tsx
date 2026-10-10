import { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { siteSettings } from '@/data/siteData';

export function WhyDevsole() {
  const [activeView, setActiveView] = useState<'devsole' | 'legacy'>('devsole');
  const phone = (siteSettings?.whatsapp || '+923706492398').replace(/\D/g, '');

  return (
    <section
      id="why-devsole"
      aria-label="Engineering Benchmark Comparison"
      className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28 overflow-hidden bg-transparent"
    >
      {/* Subtle Studio Grid Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <SectionHeading
        eyebrow="The Engineering Standard"
        title="Why High-Growth Businesses Choose DEVSOLE Soft"
        description="A direct technical comparison between bloated generic CMS themes and our high-performance custom architecture."
        align="center"
      />

      {/* Segmented Architecture Switcher */}
      <div className="mt-8 sm:mt-10 flex justify-center">
        <div className="inline-flex max-w-full items-center rounded-xl border border-white/10 bg-[#080c18] p-1 shadow-2xs overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveView('devsole')}
            className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-xs font-semibold transition-all duration-150 ${
              activeView === 'devsole'
                ? 'bg-white/10 text-white shadow-2xs border border-white/15 font-bold'
                : 'text-slate-400 hover:text-white font-medium'
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
            <span>DEVSOLE Soft Custom Standard</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveView('legacy')}
            className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-xs font-semibold transition-all duration-150 ${
              activeView === 'legacy'
                ? 'bg-white/10 text-white shadow-2xs border border-white/15 font-bold'
                : 'text-slate-400 hover:text-white font-medium'
            }`}
          >
            <span>Generic Theme / Multi-Plugin CMS</span>
          </button>
        </div>
      </div>

      {/* Dynamic Comparison Dashboard Card */}
      <div className="mt-7 rounded-2xl border border-white/10 bg-[#0c101d] p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
        {activeView === 'devsole' ? (
          <div className="animate-fade">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                  DEVSOLE Soft Custom Full-Stack Architecture
                </h3>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 font-mono text-xs font-semibold text-emerald-300">
                Core Web Vitals: 99 / 100 Verified
              </span>
            </div>

            <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-slate-400 max-w-3xl font-normal">
              Hand-crafted lightweight architecture using lean server endpoints, composite relational MySQL indexing, zero plugin bloat, and sub-second reactive frontend rendering.
            </p>

            {/* Benchmark Latency Meter */}
            <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-slate-300 font-semibold">Global Response Latency (TTFB):</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  &lt; 0.58s (Instant Sub-Second Response)
                </span>
              </div>
              <div className="mt-2.5 h-2 w-full rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-[96%] rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
              </div>
            </div>

            {/* Telemetry Matrix Grid */}
            <div className="mt-5 grid gap-3 sm:grid-cols-3 font-mono text-xs">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                <span className="text-slate-500 text-[10px] uppercase block font-semibold">Database Architecture</span>
                <span className="text-white font-bold mt-1 block">
                  Composite Indexing, &lt;15ms SQL
                </span>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                <span className="text-slate-500 text-[10px] uppercase block font-semibold">Security Posture</span>
                <span className="text-white font-bold mt-1 block">
                  Sanitized REST Inputs, Zero Bloat
                </span>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                <span className="text-slate-500 text-[10px] uppercase block font-semibold">IP Handover</span>
                <span className="text-white font-bold mt-1 block">
                  100% Full Git & DB Rights
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
              <span className="text-xs text-slate-400 font-medium">
                Ready to build without technical debt?
              </span>
              <a
                href={`https://wa.me/${phone}?text=Hi%20DEVSOLE%20Soft!%20I%20want%20to%20build%20on%20the%20DEVSOLE%20Soft%20standard.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 text-xs font-semibold shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-colors"
              >
                <span>Build on the DEVSOLE Soft Standard</span>
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        ) : (
          <div className="animate-fade">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-200 tracking-tight">
                  Generic Drag-and-Drop CMS Templates
                </h3>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-0.5 font-mono text-xs font-semibold text-rose-400">
                High Latency Vulnerability
              </span>
            </div>

            <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-slate-400 max-w-3xl font-normal">
              Relies on bloated page builders, 30+ unvetted third-party plugins, unindexed database queries, and redundant CSS/JS assets that degrade mobile conversion rates.
            </p>

            <div className="mt-5 rounded-xl border border-rose-500/20 bg-rose-500/5 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-slate-300 font-semibold">Average Response Latency:</span>
                <span className="font-mono font-bold text-rose-400 text-sm">
                  &gt; 3.82s (Fails Google Web Vitals)
                </span>
              </div>
              <div className="mt-2.5 h-2 w-full rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-[26%] rounded-full bg-rose-500" />
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3 font-mono text-xs">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                <span className="text-slate-500 text-[10px] uppercase block font-semibold">Database Strategy</span>
                <span className="text-slate-300 font-bold mt-1 block">
                  Slow Unindexed SQL Queries
                </span>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                <span className="text-slate-500 text-[10px] uppercase block font-semibold">Security Posture</span>
                <span className="text-slate-300 font-bold mt-1 block">
                  Plugin Patch Vulnerabilities
                </span>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                <span className="text-slate-500 text-[10px] uppercase block font-semibold">Vendor Lock-in</span>
                <span className="text-slate-300 font-bold mt-1 block">
                  Proprietary CMS Dependency
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
              <span className="text-xs text-slate-400 font-medium">
                Tired of recurring plugin maintenance and sluggish mobile speeds?
              </span>
              <button
                type="button"
                onClick={() => setActiveView('devsole')}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white hover:bg-white/[0.08] transition-colors shadow-2xs"
              >
                <span>Switch to DEVSOLE Soft Standard</span>
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3 Core Client Pillars */}
      <div className="mt-8 sm:mt-10 grid gap-5 sm:grid-cols-3">
        <div className="group rounded-2xl border border-white/10 bg-[#0c101d] p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-blue-500/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.7)] transition-all duration-300 hover:-translate-y-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-blue-400 shadow-2xs">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <h4 className="mt-4 font-display text-base sm:text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
            Direct Founder Access
          </h4>
          <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-400 font-normal">
            Collaborate directly with founder and lead architect Aoun Abbas. No non-technical account managers or communication delays.
          </p>
        </div>

        <div className="group rounded-2xl border border-white/10 bg-[#0c101d] p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-blue-500/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.7)] transition-all duration-300 hover:-translate-y-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-blue-400 shadow-2xs">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <h4 className="mt-4 font-display text-base sm:text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
            Sprint-Based Transparency
          </h4>
          <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-400 font-normal">
            Review live private staging sandboxes weekly. You test and approve every module before any milestone clearance.
          </p>
        </div>

        <div className="group rounded-2xl border border-white/10 bg-[#0c101d] p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-blue-500/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.7)] transition-all duration-300 hover:-translate-y-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-blue-400 shadow-2xs">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h4 className="mt-4 font-display text-base sm:text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
            Full Code & IP Ownership
          </h4>
          <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-400 font-normal">
            Zero vendor lock-in. Full GitHub repository history, database schemas, and cloud deployment credentials transferred upon handover.
          </p>
        </div>
      </div>
    </section>
  );
}

export default WhyDevsole;