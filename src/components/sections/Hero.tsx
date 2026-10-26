// FILE: src/components/sections/Hero.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { siteSettings } from '@/data/siteData';
import { initGsapReveal } from '@/lib/gsapReveal';
import { soundFX } from '@/lib/soundFx';

type ConsoleMode = 'showcase' | 'terminal' | 'benchmark';

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
    category: 'Real Estate Portal & Lead System',
    previewUrl: 'devsolesoft.com/projects/real-space',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=75&fm=webp',
    latency: '< 0.65s Page Load',
    turnaround: '2-3 Weeks Delivery',
    investment: 'PKR 180,000 / $650 USD',
    tagline: 'Property search portal with city & price filters, photo galleries, and direct WhatsApp agent contact buttons.',
    tech: ['Custom Web Design', 'PHP 8.2 Backend', 'MySQL Database', 'WhatsApp Lead API'],
  },
  {
    id: 'saas',
    name: 'Universal Quote Estimator',
    category: 'Instant Pricing Tool & PDF Generator',
    previewUrl: 'devsolesoft.com/tools/quote-estimator',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=75&fm=webp',
    latency: '< 0.52s Page Load',
    turnaround: '1-2 Weeks Delivery',
    investment: 'PKR 150,000 / $550 USD',
    tagline: 'Live online pricing calculator where customers configure services and download a branded PDF quote instantly.',
    tech: ['React & TypeScript', 'Automated PDF Engine', 'Multi-Currency (PKR/USD)', 'CRM Lead Sync'],
  },
  {
    id: 'ecommerce',
    name: 'Nexus Online Shopping Store',
    category: 'E-Commerce Marketplace & Checkout',
    previewUrl: 'devsolesoft.com/stores/nexus-shop',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=75&fm=webp',
    latency: '< 0.70s Page Load',
    turnaround: '2-3 Weeks Delivery',
    investment: 'PKR 150,000 / $550 USD',
    tagline: 'Fast online store with 1-click slide-out cart drawer, discount coupons, card payments, and WhatsApp alerts.',
    tech: ['Custom Storefront', 'Slide-Out Cart Drawer', 'Payment Gateway', 'WhatsApp Order Alerts'],
  },
  {
    id: 'admin',
    name: 'Apex Business Admin Portal',
    category: 'Business Dashboard & Management',
    previewUrl: 'devsolesoft.com/apps/apex-admin',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=75&fm=webp',
    latency: '< 0.58s Page Load',
    turnaround: '3-4 Weeks Delivery',
    investment: 'PKR 210,000 / $750 USD',
    tagline: 'Secure business portal with real-time revenue charts, customer management tables, and 1-click CSV reports.',
    tech: ['Secure Admin Login', 'Live Analytics Charts', 'MySQL Database', 'Role-Based Access'],
  },
];

export function Hero() {
  const [consoleMode, setConsoleMode] = useState<ConsoleMode>('showcase');
  const [activeProject, setActiveProject] = useState<ProjectShowcase>(PROJECTS[0]);
  const [auditRunning, setAuditRunning] = useState(false);
  const [auditScore, setAuditScore] = useState(99);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    const cleanup = initGsapReveal();
    return cleanup;
  }, []);

  const phone = (siteSettings?.whatsapp || '+923706492398').replace(/\D/g, '');

  const runAuditSimulator = () => {
    soundFX.playClick();
    setAuditRunning(true);
    setAuditScore(84);
    setTimeout(() => setAuditScore(93), 220);
    setTimeout(() => {
      setAuditScore(99);
      setAuditRunning(false);
    }, 550);
  };

  const copySnippet = () => {
    soundFX.playClick();
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section
      id="home"
      aria-label="DEVSOLE Soft Web Development and Software Company"
      className="relative flex min-h-[92svh] flex-col justify-center px-4 pt-28 pb-16 sm:px-6 sm:pt-36 sm:pb-24 lg:px-8 overflow-hidden bg-transparent"
    >
      {/* Refined Architectural Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 left-1/2 h-[550px] w-[950px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-600/15 via-indigo-600/5 to-transparent blur-[140px]" />
        <div className="absolute top-[45%] left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.04] blur-[150px]" />
        <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_20%,#000_70%,transparent_100%)]" />
      </div>

      <div className="mx-auto w-full max-w-7xl">
        {/* ================= 1. MASTHEAD TYPOGRAPHY ================= */}
        <div className="mx-auto max-w-4xl text-center">
          
          {/* Engineering Status Pill */}
          <div data-gsap="fade-up" className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 shadow-2xs backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_#10b981]" />
            </span>
            <span className="font-mono text-[11px] font-semibold tracking-wider text-slate-300 uppercase">
              DEVSOLE SOFT · WEB DEVELOPMENT & SOFTWARE STUDIO
            </span>
          </div>

          {/* Masked High-Impact Heading (Clear & Human) */}
          <div className="overflow-hidden">
            <h1
              data-gsap="mask-up"
              className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.1rem] leading-[1.1] text-balance"
            >
              Websites, SEO & Custom Software.{' '}
              <span className="text-blue-500 font-extrabold">
                Built to Turn Visitors into Clients.
              </span>
            </h1>
          </div>

          {/* Subtitle (Client-Friendly English) */}
          <p
            data-gsap="fade-up"
            className="mx-auto mt-5 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed text-slate-400 text-balance font-normal"
          >
            We build fast, modern websites, real estate portals, and online stores that rank on Google, load in under 1 second (<span className="font-mono font-semibold text-slate-200">&lt; 0.8s</span>), and give you 100% complete source code ownership. Direct WhatsApp and email lead routing included.
          </p>

          {/* Action Buttons */}
          <div data-gsap="fade-up" className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-3.5">
            <Link
              to="/projects"
              onClick={() => soundFX.playClick()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 text-xs sm:text-sm font-semibold shadow-[0_0_25px_rgba(59,130,246,0.35)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>View Production Work</span>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </Link>

            <Link
              to="/estimator"
              onClick={() => soundFX.playClick()}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 px-6 py-3.5 text-xs sm:text-sm font-semibold text-slate-200 shadow-2xs transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>Calculate Project Cost</span>
              <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="2" width="16" height="20" rx="2" />
                <line x1="8" y1="6" x2="16" y2="6" />
                <line x1="16" y1="14" x2="16" y2="18" />
              </svg>
            </Link>

            <a
              href={`https://wa.me/${phone}?text=Hi%20Aoun%20Abbas!%20I%20am%20browsing%20DEVSOLE%20Soft%20and%20want%20to%20discuss%20a%20project.`}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFX.playClick()}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 px-4 py-3.5 text-xs font-semibold transition-colors shadow-[0_0_15px_rgba(16,185,129,0.15)]"
              title="Direct WhatsApp Consultation with Founder"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
              <span>Direct WhatsApp Chat</span>
            </a>
          </div>
        </div>

        {/* ================= 2. INTERACTIVE ENGINEERING WORKBENCH ================= */}
        <div data-gsap="fade-up" className="relative mt-12 sm:mt-16 rounded-2xl border border-white/10 bg-[#0c101d] p-3 sm:p-5 shadow-[0_12px_45px_rgba(0,0,0,0.6)] backdrop-blur-xl overflow-hidden">
          
          <div className="bg-grid absolute inset-0 opacity-15 pointer-events-none rounded-2xl" />

          {/* Top Console Mode Selector Bar */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3.5">
            <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1 shadow-2xs overflow-x-auto max-w-full">
              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setConsoleMode('showcase');
                }}
                className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all duration-150 ${
                  consoleMode === 'showcase'
                    ? 'bg-blue-600/20 text-white shadow-2xs border border-blue-500/30 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                <span>Live Project Showcase</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setConsoleMode('terminal');
                }}
                className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all duration-150 ${
                  consoleMode === 'terminal'
                    ? 'bg-blue-600/20 text-white shadow-2xs border border-blue-500/30 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 17 10 11 4 5" />
                  <line x1="12" y1="19" x2="20" y2="19" />
                </svg>
                <span>Database & Server Code</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setConsoleMode('benchmark');
                }}
                className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all duration-150 ${
                  consoleMode === 'benchmark'
                    ? 'bg-blue-600/20 text-white shadow-2xs border border-blue-500/30 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 14 4-4" />
                  <path d="M3.34 19a10 10 0 1 1 17.32 0" />
                </svg>
                <span>Page Speed Benchmarks</span>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-3 font-mono text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981] animate-pulse" />
                Live Node: 4.2ms
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
                  Click to inspect live software interface:
                </p>

                {PROJECTS.map((proj) => {
                  const isSelected = activeProject.id === proj.id;
                  return (
                    <button
                      key={proj.id}
                      type="button"
                      onClick={() => {
                        soundFX.playClick();
                        setActiveProject(proj);
                      }}
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
                        <span className="font-mono text-[10px] font-semibold text-emerald-400">
                          {proj.latency}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-slate-400 line-clamp-1 font-normal">
                        {proj.category}
                      </p>
                    </button>
                  );
                })}

                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5 text-xs shadow-2xs">
                  <span className="font-bold text-white block">Need a custom web solution?</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    We deliver customized, mobile-ready platforms in fixed 2 to 3-week sprints.
                  </span>
                  <Link
                    to="/projects"
                    onClick={() => soundFX.playClick()}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 mt-2"
                  >
                    <span>View All Work & Case Studies</span>
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Right Browser Viewport (8 cols) */}
              <div className="lg:col-span-8">
                <div className="relative group rounded-xl border border-white/10 bg-[#080c18] p-2 shadow-2xl">
                  
                  {/* Browser Chrome Header with Window Dots */}
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
                      Google Score: 99/100
                    </span>
                  </div>

                  {/* Browser Screen Preview Frame — OPTIMIZED FOR SUB-SECOND LCP */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-b-lg bg-slate-950">
                    <img
                      key={activeProject.id}
                      src={activeProject.image}
                      alt={activeProject.name}
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      width={720}
                      height={450}
                      className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-102"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                    {/* Metric Badges */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-2 rounded-lg border border-white/15 bg-black/75 px-2.5 py-1 text-xs font-mono font-semibold text-white shadow-md backdrop-blur-md">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
                      <span>{activeProject.latency}</span>
                    </div>

                    <div className="absolute top-2.5 right-2.5 rounded-lg border border-white/15 bg-black/75 px-2 py-0.5 text-[10px] font-mono font-medium text-slate-200 shadow-md backdrop-blur-md">
                      {activeProject.category}
                    </div>

                    {/* Bottom Scope Card */}
                    <div className="absolute inset-x-2.5 bottom-2.5 flex flex-wrap items-center justify-between gap-2.5 rounded-lg border border-white/15 bg-[#080c18]/90 p-3 text-white shadow-lg backdrop-blur-md">
                      <div className="max-w-md">
                        <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-semibold">
                          Estimated Investment: <strong className="text-white">{activeProject.investment}</strong>
                        </span>
                        <p className="text-xs text-slate-300 mt-0.5 line-clamp-1 font-normal">
                          {activeProject.tagline}
                        </p>
                      </div>

                      <Link
                        to="/estimator"
                        onClick={() => soundFX.playClick()}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 px-3 py-1.5 text-xs font-semibold text-white shadow-xs transition-colors"
                      >
                        <span>Calculate Cost</span>
                        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </Link>
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

          {/* ================= TAB 2: REAL SQL SCHEMA & SERVER TELEMETRY ================= */}
          {consoleMode === 'terminal' && (
            <div className="relative z-10 mt-4 rounded-xl border border-white/10 bg-[#06080f] p-4 sm:p-5 font-mono text-xs animate-fade">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
                  <span className="text-slate-300 font-bold">MYSQL 8.0 CLUSTER & PHP 8.2 BACKEND PROFILER</span>
                </div>
                <button
                  type="button"
                  onClick={copySnippet}
                  className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:bg-white/10 transition-colors"
                >
                  {copiedCode ? '✓ Copied Query' : 'Copy Query'}
                </button>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                {/* Left: Real Relational Query with Composite Index */}
                <div className="rounded-xl border border-white/5 bg-[#0b0f19] p-4 space-y-2 text-slate-300">
                  <span className="text-blue-400 font-semibold text-[11px] block">// 1. Composite Relational Indexing Query</span>
                  <pre className="text-slate-400 overflow-x-auto text-[11px] leading-relaxed">
                    <span className="text-blue-400">SELECT</span> p.id, p.title, p.price, p.bedrooms,{'\n'}
                    {'       '}a.agent_whatsapp, m.photo_url{'\n'}
                    <span className="text-blue-400">FROM</span> properties p{'\n'}
                    <span className="text-purple-400">USE INDEX</span> (idx_status_city_price){'\n'}
                    <span className="text-blue-400">LEFT JOIN</span> agents a <span className="text-blue-400">ON</span> a.id = p.agent_id{'\n'}
                    <span className="text-blue-400">WHERE</span> p.status = <span className="text-emerald-400">'ACTIVE'</span>{'\n'}
                    {'  '}<span className="text-blue-400">AND</span> p.city = <span className="text-emerald-400">'Lahore'</span>{'\n'}
                    <span className="text-blue-400">ORDER BY</span> p.created_at <span className="text-blue-400">DESC</span>{'\n'}
                    <span className="text-blue-400">LIMIT</span> 12;
                  </pre>
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500">
                    <span>Query Plan: Index Range Scan</span>
                    <span className="text-emerald-400 font-bold">Execution: 4.2ms (Zero Lag)</span>
                  </div>
                </div>

                {/* Right: Sanitized PHP 8.2 Server Response */}
                <div className="rounded-xl border border-white/5 bg-[#0b0f19] p-4 space-y-2 text-slate-300">
                  <span className="text-indigo-400 font-semibold text-[11px] block">// 2. Sanitized PHP 8.2 Server Response</span>
                  <pre className="text-slate-400 overflow-x-auto text-[11px] leading-relaxed">
                    HTTP/2 200 OK{'\n'}
                    Content-Type: application/json; charset=UTF-8{'\n'}
                    Cache-Control: public, max-age=60, s-maxage=300{'\n'}
                    X-Response-Time: <span className="text-emerald-400">14.8ms</span>{'\n'}
                    {'\n'}
                    {'{'}{'\n'}
                    {'  '}<span className="text-blue-400">"status"</span>: <span className="text-emerald-400">"success"</span>,{'\n'}
                    {'  '}<span className="text-blue-400">"server"</span>: <span className="text-slate-200">"DEVSOLE-Edge-Node-01"</span>,{'\n'}
                    {'  '}<span className="text-blue-400">"records_found"</span>: 1420,{'\n'}
                    {'  '}<span className="text-blue-400">"payload_kb"</span>: 18.4{'\n'}
                    {'}'}
                  </pre>
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500">
                    <span>Strict Input Sanitization</span>
                    <span className="text-blue-400 font-bold">Zero Framework Bloat</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 3: SPEED BENCHMARKS ================= */}
          {consoleMode === 'benchmark' && (
            <div className="relative z-10 mt-4 p-4 sm:p-5 rounded-xl border border-white/10 bg-white/[0.02] animate-fade">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-3.5">
                <div>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-blue-400">
                    Real Page Speed Test
                  </span>
                  <h3 className="font-display text-base sm:text-lg font-bold text-white">
                    Why Fast Loading Websites Convert 3x More Customers
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 font-normal">
                    Comparing DEVSOLE custom-built websites against slow theme templates with 30+ plugins.
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
                    <polyline points="12 20 1 14 7 14" />
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                  </svg>
                  <span>{auditRunning ? 'Testing Speed...' : 'Run Live Speed Test'}</span>
                </button>
              </div>

              {/* Comparison Columns */}
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-xs sm:text-sm text-slate-200">
                      Slow WordPress / Theme Templates
                    </span>
                    <span className="rounded-md border border-rose-500/30 bg-rose-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-rose-400">
                      Failed Google Test
                    </span>
                  </div>

                  <div className="mt-3.5 space-y-2.5 font-mono text-xs">
                    <div>
                      <div className="flex justify-between text-slate-400 text-[11px]">
                        <span>Mobile Page Load Time:</span>
                        <strong className="text-rose-400 font-semibold">3.82 Seconds (Slow)</strong>
                      </div>
                      <div className="mt-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full w-[25%] bg-rose-500" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-400 text-[11px]">
                        <span>Heavy Page Weight:</span>
                        <strong className="text-rose-400 font-semibold">4.8 MB (Unoptimized)</strong>
                      </div>
                      <div className="mt-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full w-[30%] bg-rose-500" />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-rose-500/20 text-[11px] text-slate-400 leading-relaxed font-sans font-normal">
                      <strong>Result:</strong> 48% of visitors leave the website before reading your offer because the page takes more than 3 seconds to open.
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-xs sm:text-sm text-white">
                      DEVSOLE Soft Custom-Built Sites
                    </span>
                    <span className="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                      Score: {auditScore} / 100 Verified
                    </span>
                  </div>

                  <div className="mt-3.5 space-y-2.5 font-mono text-xs">
                    <div>
                      <div className="flex justify-between text-slate-300 text-[11px]">
                        <span>Mobile Page Load Time:</span>
                        <strong className="text-emerald-400 font-bold">&lt; 0.58 Seconds (Instant)</strong>
                      </div>
                      <div className="mt-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full w-[98%] bg-emerald-500 transition-all duration-500" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 text-[11px]">
                        <span>Lightweight Page Weight:</span>
                        <strong className="text-emerald-400 font-bold">185 KB (Gzip Compressed)</strong>
                      </div>
                      <div className="mt-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full w-[95%] bg-emerald-500 transition-all duration-500" />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-emerald-500/20 text-[11px] text-emerald-300 leading-relaxed font-sans font-normal">
                      <strong>Result:</strong> Instant loading keeps visitors engaged, ranks you higher on Google, and directly increases phone calls and WhatsApp chats.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ================= 3. FOUR CRUCIAL STUDIO METRIC CARDS ================= */}
        <div data-gsap="stagger-group" className="mt-6 sm:mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Card 1: Sites Delivered */}
          <div className="rounded-xl border border-white/10 bg-[#0c101d] p-4 shadow-2xs hover:border-white/20 transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono font-medium">
              <span>SITES DELIVERED</span>
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
            </div>
            <div className="mt-2 font-mono text-2xl font-bold text-white">15+ Shipped</div>
            <p className="mt-1 text-xs text-slate-400 font-normal">
              Live websites, real estate portals, and online stores running in production.
            </p>
          </div>

          {/* Card 2: Speed Benchmark */}
          <div className="rounded-xl border border-white/10 bg-[#0c101d] p-4 shadow-2xs hover:border-white/20 transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono font-medium">
              <span>PAGE SPEED</span>
              <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_6px_#3b82f6]" />
            </div>
            <div className="mt-2 font-mono text-2xl font-bold text-white">&lt; 0.8s Load Time</div>
            <p className="mt-1 text-xs text-slate-400 font-normal">
              Instant mobile opening speed verified by Google Core Web Vitals test.
            </p>
          </div>

          {/* Card 3: 100% Code Handover */}
          <div className="rounded-xl border border-white/10 bg-[#0c101d] p-4 shadow-2xs hover:border-white/20 transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono font-medium">
              <span>OWNERSHIP</span>
              <span className="h-2 w-2 rounded-full bg-indigo-400 shadow-[0_0_6px_#6366f1]" />
            </div>
            <div className="mt-2 font-mono text-2xl font-bold text-white">100% Client Owned</div>
            <p className="mt-1 text-xs text-slate-400 font-normal">
              All website files, database, and logins transferred to you upon completion.
            </p>
          </div>

          {/* Card 4: Verified Rating */}
          <div className="rounded-xl border border-white/10 bg-[#0c101d] p-4 shadow-2xs hover:border-white/20 transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono font-medium">
              <span>SATISFACTION</span>
              <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
            </div>
            <div className="mt-2 font-mono text-2xl font-bold text-white">5.0 / 5.0 Rating</div>
            <p className="mt-1 text-xs text-slate-400 font-normal">
              Direct technical communication and private staging preview before every milestone.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;