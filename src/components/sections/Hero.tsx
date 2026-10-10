import { useState } from 'react';
import { siteSettings } from '@/data/siteData';

type ConsoleMode = 'showcase' | 'benchmark' | 'architecture';

interface ProjectShowcase {
  id: string;
  name: string;
  category: string;
  previewUrl: string;
  image: string;
  latency: string;
  turnaround: string;
  investment: string;
  tagline: string;
  tech: string[];
}

const PROJECTS: ProjectShowcase[] = [
  {
    id: 'proptech',
    name: 'Real Space Properties',
    category: 'PropTech & Real Estate Portal',
    previewUrl: 'devsolesoft.com/proptech/real-space',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    latency: '< 0.72s Global TTFB',
    turnaround: '2-3 Weeks Delivery',
    investment: '$650 USD / PKR 180K',
    tagline: 'Multi-parameter property search engine with direct WhatsApp agent routing and lead pipeline.',
    tech: ['HTML5 / Tailwind', 'PHP 8.2 Endpoints', 'Indexed MySQL', 'WhatsApp API'],
  },
  {
    id: 'saas',
    name: 'Universal Quote Estimator',
    category: 'SaaS Tool & PDF Automation',
    previewUrl: 'devsolesoft.com/saas/quote-estimator',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    latency: '< 0.58s Global TTFB',
    turnaround: '1-2 Weeks Delivery',
    investment: '$750 USD / PKR 210K',
    tagline: 'Dynamic real-time budget calculator with automated PDF proposal generation.',
    tech: ['React / TypeScript', 'Serverless PDF Engine', 'Multi-Currency', 'Webhooks'],
  },
  {
    id: 'logistics',
    name: 'Apex Global Logistics',
    category: 'Custom Full-Stack Web App',
    previewUrl: 'devsolesoft.com/apps/apex-transport',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    latency: '< 0.65s Global TTFB',
    turnaround: '3-4 Weeks Delivery',
    investment: '$850 USD / PKR 240K',
    tagline: 'Centralized consignment booking portal with secure RBAC and milestone reporting.',
    tech: ['TypeScript', 'Sanitized REST API', 'MySQL Cluster', 'Role-Based Access'],
  },
  {
    id: 'ecommerce',
    name: 'Nexus Marketplace Engine',
    category: 'High-Velocity E-Commerce',
    previewUrl: 'devsolesoft.com/shop/nexus-store',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    latency: '< 0.79s Global TTFB',
    turnaround: '2-3 Weeks Delivery',
    investment: '$550 USD / PKR 150K',
    tagline: 'Slide-out cart drawer, relational inventory indexing, and payment checkout flow.',
    tech: ['Tailwind CSS', 'Dynamic Cart Drawer', 'Promo Engine', 'Payment Gateway'],
  },
];

export function Hero() {
  const [consoleMode, setConsoleMode] = useState<ConsoleMode>('showcase');
  const [activeProject, setActiveProject] = useState<ProjectShowcase>(PROJECTS[0]);
  const [auditRunning, setAuditRunning] = useState(false);
  const [auditScore, setAuditScore] = useState(99);

  const phone = (siteSettings?.whatsapp || '+923706492398').replace(/\D/g, '');

  const runAuditSimulator = () => {
    setAuditRunning(true);
    setAuditScore(84);
    setTimeout(() => setAuditScore(92), 250);
    setTimeout(() => {
      setAuditScore(99);
      setAuditRunning(false);
    }, 600);
  };

  return (
    <section
      id="home"
      aria-label="DEVSOLE Soft Engineering Studio"
      className="relative flex min-h-[92svh] flex-col justify-center px-4 pt-28 pb-16 sm:px-6 sm:pt-36 sm:pb-24 lg:px-8 overflow-hidden bg-transparent"
    >
      {/* Refined Architectural Atmosphere (Top Glow & Blueprint Grid) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        {/* Soft Ambient Light Gradient Top Wash (Electric Cobalt) */}
        <div className="absolute -top-32 left-1/2 h-[550px] w-[950px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-600/15 via-indigo-600/5 to-transparent blur-[140px]" />

        {/* Central Radial Aura behind the Command Deck */}
        <div className="absolute top-[45%] left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.05] blur-[150px]" />
        
        {/* Crisp Architectural Grid Wallpaper Layer */}
        <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_20%,#000_70%,transparent_100%)]" />
      </div>

      <div className="mx-auto w-full max-w-7xl">
        {/* ================= 1. THE HERO MASTHEAD ================= */}
        <div className="mx-auto max-w-4xl text-center">
          
          {/* Studio Engineering Status Pill */}
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 shadow-2xs backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_#10b981]" />
            </span>
            <span className="font-mono text-[11px] font-semibold tracking-wider text-slate-300 uppercase">
              DEVSOLE SOFT · BESPOKE FULL-STACK ENGINEERING STUDIO
            </span>
          </div>

          {/* High-Impact Display Heading */}
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.08] text-balance">
            Engineering High-Impact Web Systems.{' '}
            <span className="text-blue-500 font-extrabold">
              Built with Unmatched Speed & Scale.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-5 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed text-slate-400 text-balance font-normal">
            We architect bespoke web applications, specialized PropTech platforms, and automated SaaS calculators that achieve sub-second global response times (<span className="font-mono font-semibold text-slate-200">&lt; 0.8s TTFB</span>) with 100% source code ownership.
          </p>

          {/* Action Triggers */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-3.5">
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 text-xs sm:text-sm font-semibold shadow-[0_0_25px_rgba(59,130,246,0.35)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Explore Production Deployments</span>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </a>

            <a
              href="#estimator"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 px-6 py-3.5 text-xs sm:text-sm font-semibold text-slate-200 shadow-2xs transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>Calculate Project Budget</span>
              <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="2" width="16" height="20" rx="2" />
                <line x1="8" y1="6" x2="16" y2="6" />
                <line x1="16" y1="14" x2="16" y2="18" />
              </svg>
            </a>

            <a
              href={`https://wa.me/${phone}?text=Hi%20Aoun%20Abbas!%20I%20am%20reviewing%20the%20DEVSOLE%20Soft%20platform%20and%20want%20to%20discuss%20a%20project%20roadmap.`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 px-4 py-3.5 text-xs font-semibold transition-colors shadow-[0_0_15px_rgba(16,185,129,0.15)]"
              title="Direct WhatsApp Consultation with Founder"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
              <span>Direct WhatsApp Channel</span>
            </a>
          </div>
        </div>

        {/* ================= 2. THE LIVE STUDIO COMMAND DECK ================= */}
        <div className="relative mt-12 sm:mt-16 rounded-2xl border border-white/10 bg-[#0c101d]/90 p-3 sm:p-5 shadow-[0_12px_45px_rgba(0,0,0,0.6)] backdrop-blur-xl overflow-hidden">
          
          {/* Subtle Technical Blueprint Grid Watermark Layer */}
          <div className="bg-grid absolute inset-0 opacity-20 pointer-events-none rounded-2xl" />

          {/* Top Console Mode Selector Bar */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3.5">
            <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1 shadow-2xs overflow-x-auto max-w-full">
              <button
                type="button"
                onClick={() => setConsoleMode('showcase')}
                className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all duration-150 ${
                  consoleMode === 'showcase'
                    ? 'bg-white/10 text-white shadow-2xs border border-white/15'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                <span>Production Deployments</span>
              </button>

              <button
                type="button"
                onClick={() => setConsoleMode('benchmark')}
                className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all duration-150 ${
                  consoleMode === 'benchmark'
                    ? 'bg-white/10 text-white shadow-2xs border border-white/15'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 14 4-4" />
                  <path d="M3.34 19a10 10 0 1 1 17.32 0" />
                </svg>
                <span>Performance Benchmarks</span>
              </button>

              <button
                type="button"
                onClick={() => setConsoleMode('architecture')}
                className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all duration-150 ${
                  consoleMode === 'architecture'
                    ? 'bg-white/10 text-white shadow-2xs border border-white/15'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="16" y="16" width="6" height="6" rx="1" />
                  <rect x="2" y="16" width="6" height="6" rx="1" />
                  <rect x="9" y="2" width="6" height="6" rx="1" />
                  <path d="M5 16v-4h14v4" />
                  <path d="M12 12V8" />
                </svg>
                <span>System Architecture</span>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-3 font-mono text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981] animate-pulse" />
                Verified Staging Sandbox
              </span>
              <span className="text-white/20">/</span>
              <span className="font-semibold text-slate-300">100% Code Handover</span>
            </div>
          </div>

          {/* ================= TAB 1: PRODUCTION SHOWCASE ================= */}
          {consoleMode === 'showcase' && (
            <div className="relative z-10 mt-4 grid gap-5 lg:grid-cols-12 items-center animate-fade">
              
              {/* Left Selector Column (4 cols) */}
              <div className="lg:col-span-4 space-y-2">
                <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Select Shipped Platform to Inspect:
                </p>

                {PROJECTS.map((proj) => {
                  const isSelected = activeProject.id === proj.id;
                  return (
                    <button
                      key={proj.id}
                      type="button"
                      onClick={() => setActiveProject(proj)}
                      className={`w-full text-left rounded-xl p-3 transition-all duration-150 border ${
                        isSelected
                          ? 'border-blue-500/60 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/30'
                          : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display text-xs sm:text-sm font-bold text-white">
                          {proj.name}
                        </span>
                        <span className="font-mono text-[10px] font-semibold text-blue-400">
                          {proj.latency}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-slate-400 line-clamp-1">
                        {proj.category}
                      </p>
                    </button>
                  );
                })}

                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5 text-xs shadow-2xs">
                  <span className="font-bold text-white block">Need a similar architecture?</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    We deliver customized production platforms in structured 2 to 3-week sprints.
                  </span>
                  <a
                    href={`https://wa.me/${phone}?text=Hi%20DEVSOLE%20Soft!%20I%20reviewed%20${encodeURIComponent(activeProject.name)}%20and%20want%20to%20discuss%20a%20similar%20roadmap.`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 mt-2"
                  >
                    <span>Request Technical Roadmap</span>
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Right Browser Viewport (8 cols) */}
              <div className="lg:col-span-8">
                <div className="relative group rounded-xl border border-white/10 bg-[#080c18] p-2 shadow-2xl">
                  
                  {/* Subtle Studio Display Ambient Glow Aura */}
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-transparent blur-xl pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity" />

                  {/* Browser Chrome Bar */}
                  <div className="relative z-10 flex items-center justify-between rounded-t-lg bg-[#06080f] border-b border-white/10 px-3 py-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                      <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                      <div className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                    </div>

                    <div className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-0.5 font-mono text-[10px] text-slate-300 shadow-2xs max-w-xs truncate">
                      <svg className="h-2.5 w-2.5 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <span className="truncate">{activeProject.previewUrl}</span>
                    </div>

                    <span className="font-mono text-[9px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                      99 Core Web Vitals
                    </span>
                  </div>

                  {/* Browser Screen Preview Frame */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-b-lg bg-slate-950">
                    <img
                      key={activeProject.id}
                      src={activeProject.image}
                      alt={activeProject.name}
                      loading="eager"
                      className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-102"
                    />

                    {/* Studio Glass Retina Display Diagonal Reflection */}
                    <div 
                      className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 30%, transparent 60%)'
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent" />

                    {/* Floating Metric Badges */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-2 rounded-lg border border-white/15 bg-black/70 px-2.5 py-1 text-xs font-mono font-semibold text-white shadow-md backdrop-blur-md">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span>{activeProject.latency}</span>
                    </div>

                    <div className="absolute top-2.5 right-2.5 rounded-lg border border-white/15 bg-black/70 px-2 py-0.5 text-[10px] font-mono font-medium text-slate-200 shadow-md backdrop-blur-md">
                      {activeProject.category}
                    </div>

                    {/* Bottom Scope Card */}
                    <div className="absolute inset-x-2.5 bottom-2.5 flex flex-wrap items-center justify-between gap-2.5 rounded-lg border border-white/15 bg-[#080c18]/90 p-3 text-white shadow-lg backdrop-blur-md">
                      <div className="max-w-md">
                        <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-semibold">
                          Base Sprint Investment: <strong className="text-white">{activeProject.investment}</strong>
                        </span>
                        <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">
                          {activeProject.tagline}
                        </p>
                      </div>

                      <a
                        href="#estimator"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 px-3 py-1.5 text-xs font-semibold text-white shadow-xs transition-colors"
                      >
                        <span>Configure Scope</span>
                        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Tech Chips */}
                <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 px-1 text-xs">
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.tech.map((t) => (
                      <span key={t} className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] font-medium text-slate-300 shadow-2xs">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="font-mono text-[11px] font-semibold text-slate-400">
                    {activeProject.turnaround}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 2: PERFORMANCE BENCHMARKS ================= */}
          {consoleMode === 'benchmark' && (
            <div className="relative z-10 mt-4 p-4 sm:p-5 rounded-xl border border-white/10 bg-white/[0.02] animate-fade">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-3.5">
                <div>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-blue-400">
                    Architectural Latency Audit
                  </span>
                  <h3 className="font-display text-base sm:text-lg font-bold text-white">
                    Real-World Performance Comparison
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Why custom compiled architecture outperforms generic theme templates in client conversion rates.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={runAuditSimulator}
                  disabled={auditRunning}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-1.5 text-xs font-semibold shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-colors disabled:opacity-50"
                >
                  <svg className={`h-3.5 w-3.5 ${auditRunning ? 'animate-spin' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 4 23 10 17 10" />
                    <polyline points="1 20 1 14 7 14" />
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                  </svg>
                  <span>{auditRunning ? 'Running Audit...' : 'Run Audit Simulation'}</span>
                </button>
              </div>

              {/* Head to Head Grid */}
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-xs sm:text-sm text-slate-200">
                      Generic Template / Multi-Plugin CMS
                    </span>
                    <span className="rounded-md border border-rose-500/30 bg-rose-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-rose-400">
                      Failed Web Vitals
                    </span>
                  </div>

                  <div className="mt-3.5 space-y-2.5 font-mono text-xs">
                    <div>
                      <div className="flex justify-between text-slate-400 text-[11px]">
                        <span>Global Latency (TTFB):</span>
                        <strong className="text-rose-400 font-semibold">3.82 Seconds</strong>
                      </div>
                      <div className="mt-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full w-[25%] bg-rose-500" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-400 text-[11px]">
                        <span>Asset Bundle Payload:</span>
                        <strong className="text-rose-400 font-semibold">4.8 MB (Uncompressed)</strong>
                      </div>
                      <div className="mt-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full w-[30%] bg-rose-500" />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-rose-500/20 text-[11px] text-slate-400 leading-relaxed font-sans">
                      <strong>Client Impact:</strong> Sluggish mobile load speeds cause approximately 48% of prospective customers to abandon the site before contacting sales.
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-emerald-500/30 bg-emerald-50/5 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-xs sm:text-sm text-white">
                      DEVSOLE Soft Custom Architecture
                    </span>
                    <span className="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                      Score: {auditScore} / 100 Verified
                    </span>
                  </div>

                  <div className="mt-3.5 space-y-2.5 font-mono text-xs">
                    <div>
                      <div className="flex justify-between text-slate-300 text-[11px]">
                        <span>Global Latency (TTFB):</span>
                        <strong className="text-emerald-400 font-bold">&lt; 0.58 Seconds (Sub-Second)</strong>
                      </div>
                      <div className="mt-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full w-[98%] bg-emerald-500 transition-all duration-500" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 text-[11px]">
                        <span>Asset Bundle Payload:</span>
                        <strong className="text-emerald-400 font-bold">185 KB (Gzip Compressed)</strong>
                      </div>
                      <div className="mt-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full w-[95%] bg-emerald-500 transition-all duration-500" />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-emerald-500/20 text-[11px] text-emerald-300 leading-relaxed font-sans">
                      <strong>Client Impact:</strong> Sub-second mobile rendering captures user intent immediately, significantly increasing completed inquiries.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 3: SYSTEM ARCHITECTURE ================= */}
          {consoleMode === 'architecture' && (
            <div className="relative z-10 mt-4 p-4 sm:p-5 rounded-xl border border-white/10 bg-white/[0.02] animate-fade">
              <div className="border-b border-white/10 pb-3">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-blue-400">
                  Engineering Stack
                </span>
                <h3 className="font-display text-base sm:text-lg font-bold text-white">
                  Full-Stack Architecture & Data Flow
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Sanitized input validation, indexed SQL schemas, and sub-millisecond edge delivery.
                </p>
              </div>

              {/* Node Graph Grid */}
              <div className="mt-4 grid gap-2.5 sm:grid-cols-2 md:grid-cols-5 font-mono text-xs">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center flex flex-col items-center">
                  <span className="font-bold text-white block">1. Client Device</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Responsive UI</span>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center flex flex-col items-center">
                  <span className="font-bold text-white block">2. Edge CDN</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">&lt; 20ms Caching</span>
                </div>

                <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-3 text-center flex flex-col items-center">
                  <span className="font-bold text-blue-300 block">3. PHP 8.2 API</span>
                  <span className="text-[10px] text-blue-400 block mt-0.5">Sanitized Logic</span>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center flex flex-col items-center">
                  <span className="font-bold text-white block">4. MySQL Database</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">&lt; 15ms Queries</span>
                </div>

                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-center flex flex-col items-center sm:col-span-2 md:col-span-1">
                  <span className="font-bold text-emerald-300 block">5. Automation</span>
                  <span className="text-[10px] text-emerald-400 block mt-0.5">WhatsApp / Webhooks</span>
                </div>
              </div>

              <div className="mt-3.5 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-xs text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span><strong>100% IP Handover Guarantee:</strong> Complete GitHub repository access and database dumps transferred upon milestone completion.</span>
                <a href="#estimator" className="font-semibold text-blue-400 hover:text-blue-300 hover:underline shrink-0">Estimate Architecture &rarr;</a>
              </div>
            </div>
          )}
        </div>

        {/* ================= 3. FOUR CRUCIAL STUDIO METRIC CARDS ================= */}
        <div className="mt-6 sm:mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Card 1: Deployments */}
          <div className="rounded-xl border border-white/10 bg-[#0c101d] p-4 shadow-2xs hover:border-white/20 transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono font-medium">
              <span>DEPLOYMENTS</span>
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
            </div>
            <div className="mt-2 font-mono text-2xl font-bold text-white">15+ Shipped</div>
            <p className="mt-1 text-xs text-slate-400">
              Live web applications, PropTech portals, and SaaS tools running in production.
            </p>
          </div>

          {/* Card 2: Latency */}
          <div className="rounded-xl border border-white/10 bg-[#0c101d] p-4 shadow-2xs hover:border-white/20 transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono font-medium">
              <span>LATENCY SLA</span>
              <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_6px_#3b82f6]" />
            </div>
            <div className="mt-2 font-mono text-2xl font-bold text-white">&lt; 0.8s TTFB</div>
            <p className="mt-1 text-xs text-slate-400">
              Core Web Vitals compliance via lean server logic and indexed database queries.
            </p>
          </div>

          {/* Card 3: IP Protection */}
          <div className="rounded-xl border border-white/10 bg-[#0c101d] p-4 shadow-2xs hover:border-white/20 transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono font-medium">
              <span>IP PROTECTION</span>
              <span className="h-2 w-2 rounded-full bg-indigo-400 shadow-[0_0_6px_#6366f1]" />
            </div>
            <div className="mt-2 font-mono text-2xl font-bold text-white">100% Handover</div>
            <p className="mt-1 text-xs text-slate-400">
              Full GitHub source code, schema architecture, and hosting transferred directly to you.
            </p>
          </div>

          {/* Card 4: Client Rating */}
          <div className="rounded-xl border border-white/10 bg-[#0c101d] p-4 shadow-2xs hover:border-white/20 transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono font-medium">
              <span>CLIENT SATISFACTION</span>
              <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
            </div>
            <div className="mt-2 font-mono text-2xl font-bold text-white">5.0 / 5.0 Rating</div>
            <p className="mt-1 text-xs text-slate-400">
              Direct founder communication with weekly staging test deployments and reviews.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;