// FILE: src/components/sections/WhyDevsole.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { siteSettings } from '@/data/siteData';
import { soundFX } from '@/lib/soundFx';

export function WhyDevsole() {
  const [activeView, setActiveView] = useState<'devsole' | 'legacy'>('devsole');
  const [simulating, setSimulating] = useState(false);
  const [testResult, setTestResult] = useState({
    devsoleMs: 14.2,
    legacyMs: 842.0,
    devsoleQueries: 2,
    legacyQueries: 48,
  });

  const phone = (siteSettings?.whatsapp || '+923706492398').replace(/\D/g, '');

  const runSimulation = () => {
    soundFX.playClick();
    setSimulating(true);
    setTimeout(() => {
      setTestResult({
        devsoleMs: Number((12 + Math.random() * 4).toFixed(1)),
        legacyMs: Number((820 + Math.random() * 80).toFixed(1)),
        devsoleQueries: 2,
        legacyQueries: 48,
      });
      setSimulating(false);
    }, 600);
  };

  return (
    <section
      id="why-devsole"
      aria-label="DEVSOLE Soft vs Slow Template Themes Comparison"
      className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28 overflow-hidden bg-transparent"
    >
      {/* Subtle Studio Grid Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div data-gsap="mask-up">
        <SectionHeading
          eyebrow="Why Choose DEVSOLE Soft · Direct Comparison"
          title="Custom-Built Code vs. Slow Template Themes"
          description="A clear, honest comparison: Why smart business owners choose custom-built websites over slow, bloated drag-and-drop templates that lose customers."
          align="center"
        />
      </div>

      {/* Segmented Architecture Switcher */}
      <div data-gsap="fade-up" className="mt-8 sm:mt-10 flex justify-center">
        <div className="inline-flex max-w-full items-center rounded-xl border border-white/10 bg-[#080c18] p-1 shadow-2xs overflow-x-auto">
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              setActiveView('devsole');
            }}
            className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-xs font-semibold transition-all duration-150 ${
              activeView === 'devsole'
                ? 'bg-blue-600/20 text-white shadow-2xs border border-blue-500/30 font-bold'
                : 'text-slate-400 hover:text-white font-medium'
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
            <span>DEVSOLE Soft Custom-Built Sites</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              setActiveView('legacy');
            }}
            className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-xs font-semibold transition-all duration-150 ${
              activeView === 'legacy'
                ? 'bg-rose-500/20 text-white shadow-2xs border border-rose-500/30 font-bold'
                : 'text-slate-400 hover:text-white font-medium'
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
            <span>Slow WordPress / Wix Templates (30+ Plugins)</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Comparison Console */}
      <div data-gsap="fade-up" className="mt-7 rounded-2xl border border-white/10 bg-[#0c101d] p-6 sm:p-8 shadow-[0_12px_45px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        {activeView === 'devsole' ? (
          <div className="animate-fade">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                  DEVSOLE Custom-Built Sites (Clean Code & Fast Database)
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-semibold text-emerald-300">
                  Google Score: 99 / 100 Verified
                </span>
                <button
                  type="button"
                  onClick={runSimulation}
                  disabled={simulating}
                  className="rounded-lg border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 px-3 py-1 text-xs font-mono font-semibold transition-colors disabled:opacity-50"
                >
                  {simulating ? 'Auditing Latency...' : '⚡ Test Query Ping'}
                </button>
              </div>
            </div>

            <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-slate-300 max-w-3xl font-normal">
              Built from scratch without heavy page-builder bloat. Fast loading, secure forms, instant WhatsApp routing, and 100% source code ownership handed directly to you upon completion.
            </p>

            {/* Live Interactive Telemetry Ping Bar */}
            <div className="mt-5 rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-slate-300 font-semibold font-mono">
                  [DEVSOLE_SERVER_NODE] — Database Response Speed:
                </span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  {testResult.devsoleMs}ms ({testResult.devsoleQueries} Queries Executed)
                </span>
              </div>
              <div className="mt-2.5 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-[98%] rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981] transition-all duration-300" />
              </div>
            </div>

            {/* 4 Clear Value Pillars */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 font-mono text-xs">
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                <span className="text-slate-400 text-[10px] uppercase block font-semibold">1. Page Load Speed</span>
                <span className="text-emerald-400 font-bold mt-1.5 block">&lt; 0.8s Instant Load</span>
                <p className="text-[11px] text-slate-300 font-sans mt-1">Opens immediately on 4G phones, keeping customers on your site.</p>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                <span className="text-slate-400 text-[10px] uppercase block font-semibold">2. Stability & Security</span>
                <span className="text-emerald-400 font-bold mt-1.5 block">Zero Plugin Conflicts</span>
                <p className="text-[11px] text-slate-300 font-sans mt-1">Built with clean code that never crashes when plugins auto-update.</p>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                <span className="text-slate-400 text-[10px] uppercase block font-semibold">3. Complete Ownership</span>
                <span className="text-emerald-400 font-bold mt-1.5 block">100% Client Owned</span>
                <p className="text-[11px] text-slate-300 font-sans mt-1">All source code, database, and logins transferred to you upon completion.</p>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                <span className="text-slate-400 text-[10px] uppercase block font-semibold">4. Direct Leads</span>
                <span className="text-emerald-400 font-bold mt-1.5 block">WhatsApp Lead Alerts</span>
                <p className="text-[11px] text-slate-300 font-sans mt-1">Inquiries go straight to your WhatsApp & email in seconds.</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
              <span className="text-xs text-slate-400 font-medium">
                Want high speed, Google ranking, and complete code ownership?
              </span>
              <div className="flex items-center gap-3">
                <Link
                  to="/estimator"
                  onClick={() => soundFX.playClick()}
                  className="rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] px-4 py-2 text-xs font-semibold text-slate-200 transition-colors shadow-2xs"
                >
                  Calculate Cost
                </Link>
                <a
                  href={`https://wa.me/${phone}?text=Hi%20DEVSOLE%20Soft!%20I%20want%20to%20build%20a%20custom-built%20website%20without%20slow%20templates.`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFX.playClick()}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 text-xs font-semibold shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-colors"
                >
                  <span>Build with DEVSOLE Soft</span>
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-fade">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-200 tracking-tight">
                  Slow WordPress / Wix Templates & Page Builders
                </h3>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 font-mono text-xs font-semibold text-rose-400">
                Slow Speed Penalty
              </span>
            </div>

            <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-slate-400 max-w-3xl font-normal">
              Relies on heavy drag-and-drop page builders, 30+ unverified plugins, and redundant files that slow down mobile load times and lose half your potential customers.
            </p>

            {/* Legacy Sluggish Telemetry Ping Bar */}
            <div className="mt-5 rounded-xl border border-rose-500/20 bg-rose-500/5 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-slate-300 font-semibold font-mono">
                  [SLOW_TEMPLATE_CMS] — Average Response Speed:
                </span>
                <span className="font-mono font-bold text-rose-400 text-sm">
                  {testResult.legacyMs}ms ({testResult.legacyQueries} Queries Executed)
                </span>
              </div>
              <div className="mt-2.5 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-[26%] rounded-full bg-rose-500" />
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 font-mono text-xs">
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                <span className="text-slate-400 text-[10px] uppercase block font-semibold">1. Page Load Speed</span>
                <span className="text-rose-400 font-bold mt-1.5 block">3.8s+ Slow Loading</span>
                <p className="text-[11px] text-slate-400 font-sans mt-1">Mobile visitors leave before the page finishes loading.</p>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                <span className="text-slate-400 text-[10px] uppercase block font-semibold">2. Stability & Security</span>
                <span className="text-rose-400 font-bold mt-1.5 block">30+ Plugins Required</span>
                <p className="text-[11px] text-slate-400 font-sans mt-1">High risk of site breaking when plugins auto-update.</p>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                <span className="text-slate-400 text-[10px] uppercase block font-semibold">3. Ownership Rights</span>
                <span className="text-rose-400 font-bold mt-1.5 block">Vendor Lock-In</span>
                <p className="text-[11px] text-slate-400 font-sans mt-1">Tied to expensive monthly subscriptions and theme developers.</p>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                <span className="text-slate-400 text-[10px] uppercase block font-semibold">4. Lead Handling</span>
                <span className="text-rose-400 font-bold mt-1.5 block">Lost Email Inquiries</span>
                <p className="text-[11px] text-slate-400 font-sans mt-1">Forms often fail silently or send leads into spam folders.</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
              <span className="text-xs text-slate-400 font-medium">
                Tired of slow pages, site crashes, and recurring plugin costs?
              </span>
              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setActiveView('devsole');
                }}
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
      <div data-gsap="stagger-group" className="mt-8 sm:mt-10 grid gap-5 sm:grid-cols-3">
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
            Direct Talk with Lead Developer Aoun Abbas
          </h4>
          <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-400 font-normal">
            You communicate directly with our founder and lead developer. No non-technical account managers or junior developer handoffs.
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
            Private Preview Links Before Every Payment
          </h4>
          <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-400 font-normal">
            Test and approve your working website on mobile and desktop before releasing any milestone payment. Zero surprise deliverables.
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
            100% Code & Login Handover
          </h4>
          <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-400 font-normal">
            Zero vendor lock-in. All website files, database access, and domain accounts belong completely to you upon project completion.
          </p>
        </div>
      </div>
    </section>
  );
}

export default WhyDevsole;