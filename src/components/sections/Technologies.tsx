// FILE: src/components/sections/Technologies.tsx
import { useState, useMemo, type ReactNode } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { soundFX } from '@/lib/soundFx';

type TechCategory = 'all' | 'frontend' | 'backend' | 'cloud';

interface TechItem {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'cloud';
  categoryLabel: string;
  badge: string;
  icon: ReactNode;
  iconColor: string;
  role: string;
  telemetry: {
    metric1Label: string;
    metric1Value: string;
    metric2Label: string;
    metric2Value: string;
    benchmarkLabel: string;
    benchmarkValue: string;
  };
  cliCommand: string;
  cliDescription: string;
  whyDevsole: string;
}

const TECH_STACK: TechItem[] = [
  {
    id: 'react-ts',
    name: 'React & Modern JavaScript',
    category: 'frontend',
    categoryLabel: 'Frontend & Mobile',
    badge: 'Interactive UI',
    iconColor: 'text-blue-400',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
    role: 'Fast, smooth interactive pages that update instantly without reloading the whole screen.',
    telemetry: {
      metric1Label: 'Code Reliability',
      metric1Value: '100% Tested (Zero Runtime Bugs)',
      metric2Label: 'Page Weight',
      metric2Value: '38 KB (Compressed & Fast)',
      benchmarkLabel: 'Mobile Smoothness',
      benchmarkValue: 'Smooth 60 FPS on Phones',
    },
    cliCommand: 'pnpm vite build --mode production',
    cliDescription: 'Removes all unused code so your website loads instantly on mobile.',
    whyDevsole:
      'We use React so your customers experience instant button clicks, live calculators, and smooth filter navigation without waiting for slow page refreshes.',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS & Mobile Design',
    category: 'frontend',
    categoryLabel: 'Frontend & Mobile',
    badge: 'Lightweight Styling',
    iconColor: 'text-cyan-400',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
      </svg>
    ),
    role: 'Clean styling that looks great on iPhone, Android, tablets, and desktop monitors.',
    telemetry: {
      metric1Label: 'Design Loading Time',
      metric1Value: 'Under 0.05s Instant Paint',
      metric2Label: 'File Size',
      metric2Value: 'Only 14 KB (Extremely Light)',
      benchmarkLabel: 'First Screen Load',
      benchmarkValue: '< 0.4s on 4G Mobile',
    },
    cliCommand: 'npx tailwindcss -o dist/styles.min.css --minify',
    cliDescription: 'Packages only active styles into a tiny, fast-loading design file.',
    whyDevsole:
      'Old websites load huge style files that take 4 seconds to open. We only ship the exact styles used on your site so customers never see a blank screen.',
  },
  {
    id: 'php',
    name: 'PHP 8.2 (Secure Server Code)',
    category: 'backend',
    categoryLabel: 'Backend & Databases',
    badge: 'Fast Server Logic',
    iconColor: 'text-indigo-400',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    role: 'Fast, secure server logic that processes form inquiries, user logins, and order data.',
    telemetry: {
      metric1Label: 'Server Memory Used',
      metric1Value: 'Under 15 MB / Request (Very Low)',
      metric2Label: 'Crash Protection',
      metric2Value: 'Handles High Traffic Spikes',
      benchmarkLabel: 'Server Response Time',
      benchmarkValue: '16.4ms (Instant Execution)',
    },
    cliCommand: 'php -d opcache.enable=1 api/router.php',
    cliDescription: 'High-speed server code execution with bytecode acceleration.',
    whyDevsole:
      'Unlike slow platforms that need expensive $100/month hosting servers, our clean PHP code runs fast on affordable hosting and never slows down.',
  },
  {
    id: 'mysql',
    name: 'MySQL Fast Databases',
    category: 'backend',
    categoryLabel: 'Backend & Databases',
    badge: 'Organized Data',
    iconColor: 'text-amber-400',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    role: 'Secure, organized database storage for property listings, products, customer leads, and orders.',
    telemetry: {
      metric1Label: 'Search Efficiency',
      metric1Value: 'Indexed (Zero Unnecessary Disk Scans)',
      metric2Label: 'Data Protection',
      metric2Value: '100% Safe Customer Records',
      benchmarkLabel: 'Database Search Speed',
      benchmarkValue: '3.8ms Across 100K+ Items',
    },
    cliCommand: 'EXPLAIN SELECT * FROM properties WHERE status="ACTIVE";',
    cliDescription: 'Verifies database indexes so search queries never freeze the server.',
    whyDevsole:
      'We set up custom database indexes so your visitors can filter through thousands of houses, products, or records in milliseconds without lag.',
  },
  {
    id: 'pdf-automation',
    name: 'Automated PDF & Email Systems',
    category: 'backend',
    categoryLabel: 'Backend & Databases',
    badge: 'Business Automation',
    iconColor: 'text-rose-400',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    role: 'Instant downloadable branded PDF quote estimates, invoices, and automated notifications.',
    telemetry: {
      metric1Label: 'PDF Generation Speed',
      metric1Value: 'Under 0.3s Download Ready',
      metric2Label: 'Document Quality',
      metric2Value: 'Crisp Vector PDF (Print Ready)',
      benchmarkLabel: 'Memory Required',
      benchmarkValue: 'Ultra-Lean Temporary Memory',
    },
    cliCommand: 'php generate_quote.php --output=estimate.pdf',
    cliDescription: 'Generates branded PDF proposals automatically on the server.',
    whyDevsole:
      'Saves your sales team hours of manual paperwork by allowing customers to calculate a price and download an official branded proposal on the spot.',
  },
  {
    id: 'edge-cdn',
    name: 'Cloud Edge Hosting & Fast CDN',
    category: 'cloud',
    categoryLabel: 'Cloud & Security',
    badge: 'Global Speed',
    iconColor: 'text-emerald-400',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    role: 'Global edge network that delivers your website from the nearest server to your customer.',
    telemetry: {
      metric1Label: 'Global Server Coverage',
      metric1Value: '300+ Edge Locations Worldwide',
      metric2Label: 'Security Protocol',
      metric2Value: 'TLS 1.3 / Modern HTTP/2',
      benchmarkLabel: 'Page Load Guarantee',
      benchmarkValue: '< 0.8s Anywhere in the World',
    },
    cliCommand: 'curl -I https://devsolesoft.com/ --compressed',
    cliDescription: 'Verifies global edge caching and fast compressed delivery.',
    whyDevsole:
      'Ensures your website loads in under 1 second whether your client is browsing from Lahore, Karachi, Dubai, London, or New York.',
  },
  {
    id: 'ssl-security',
    name: 'SSL Security & Data Protection',
    category: 'cloud',
    categoryLabel: 'Cloud & Security',
    badge: 'Bank-Grade Security',
    iconColor: 'text-cyan-400',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    role: 'Bank-grade HTTPS encryption, spam protection, and safe form data transmission.',
    telemetry: {
      metric1Label: 'SSL Certificate',
      metric1Value: '256-Bit HTTPS Encryption',
      metric2Label: 'Spam Protection',
      metric2Value: 'Automated Bot & Spam Filtering',
      benchmarkLabel: 'Uptime Reliability',
      benchmarkValue: '99.9% Production Availability',
    },
    cliCommand: 'openssl s_client -connect devsolesoft.com:443',
    cliDescription: 'Verifies active HTTPS certificate and secure data handshake.',
    whyDevsole:
      'Protects your business reputation, shows the trusted green padlock in browsers, and ensures customer inquiries reach you securely.',
  },
  {
    id: 'github',
    name: '100% Complete GitHub Handover',
    category: 'cloud',
    categoryLabel: 'Code Handover',
    badge: '100% Client Owned',
    iconColor: 'text-white',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
    role: 'All source code files, database architecture, and credentials handed directly to you.',
    telemetry: {
      metric1Label: 'Code Ownership',
      metric1Value: '100% Owned by Your Company',
      metric2Label: 'Version Tracking',
      metric2Value: 'Clean Git History & Documentation',
      benchmarkLabel: 'Vendor Lock-in',
      benchmarkValue: 'Zero Monthly Lock-in Fees',
    },
    cliCommand: 'git clone https://github.com/your-company/website.git',
    cliDescription: 'Transfers master code repository directly to your organization.',
    whyDevsole:
      'You are never held hostage. When your final milestone is cleared, all code files, database schemas, and hosting logins belong 100% to you.',
  },
];

export function Technologies() {
  const [activeCategory, setActiveCategory] = useState<TechCategory>('all');
  const [inspectedTech, setInspectedTech] = useState<TechItem>(TECH_STACK[0]);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const filteredTech = useMemo(() => {
    if (activeCategory === 'all') return TECH_STACK;
    return TECH_STACK.filter((t) => t.category === activeCategory);
  }, [activeCategory]);

  const handleCopyCli = (cmd: string) => {
    soundFX.playClick();
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(cmd);
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 2000);
    }
  };

  return (
    <section
      id="technologies"
      itemScope
      itemType="https://schema.org/ItemList"
      aria-label="DEVSOLE Soft Web Development Tech Stack and Tools"
      className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28 overflow-hidden bg-transparent"
    >
      {/* Subtle Studio Grid Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <div data-gsap="mask-up">
        <SectionHeading
          eyebrow="Modern Tools · Built for Speed"
          title="The Modern Technologies We Use to Build Your Website"
          description="We build with modern, clean tools that load under 1 second, never crash under heavy traffic, and give you 100% complete source code ownership. Zero slow templates or monthly lock-in."
          align="center"
        />
      </div>

      {/* Segmented Category Filter Bar */}
      <div data-gsap="fade-up" className="mt-8 flex justify-center">
        <div className="inline-flex max-w-full items-center rounded-xl border border-white/10 bg-[#080c18] p-1 shadow-2xs overflow-x-auto">
          {[
            { id: 'all', label: 'All Technologies (8)' },
            { id: 'frontend', label: 'Frontend & Mobile' },
            { id: 'backend', label: 'Backend & Databases' },
            { id: 'cloud', label: 'Cloud, Security & Handover' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                soundFX.playClick();
                setActiveCategory(cat.id as TechCategory);
              }}
              className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-xs font-semibold transition-all duration-150 ${
                activeCategory === cat.id
                  ? 'bg-blue-600/20 text-white shadow-2xs border border-blue-500/30 font-bold'
                  : 'text-slate-400 hover:text-white font-medium'
              }`}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Technology Grid Cards */}
      <div data-gsap="stagger-group" className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filteredTech.map((tech) => {
          const isSelected = inspectedTech.id === tech.id;

          return (
            <div
              key={tech.id}
              itemScope
              itemType="https://schema.org/TechArticle"
              itemProp="itemListElement"
              onClick={() => {
                soundFX.playClick();
                setInspectedTech(tech);
              }}
              onMouseEnter={() => {
                soundFX.playHover();
                setInspectedTech(tech);
              }}
              className={`group cursor-pointer rounded-2xl border p-4 sm:p-5 transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'border-blue-500/60 bg-[#0c101d] shadow-[0_0_25px_rgba(59,130,246,0.2)] ring-1 ring-blue-500/40 -translate-y-1'
                  : 'border-white/10 bg-[#0c101d] hover:border-white/20 hover:bg-[#0e1322]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] shadow-2xs ${tech.iconColor}`}>
                    {tech.icon}
                  </div>
                  <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[9px] font-mono font-semibold text-slate-300 uppercase">
                    {tech.badge}
                  </span>
                </div>

                <h4
                  itemProp="headline"
                  className="mt-3.5 font-display text-sm sm:text-base font-bold text-white group-hover:text-blue-400 transition-colors"
                >
                  {tech.name}
                </h4>

                <p className="mt-1 text-xs text-slate-400 leading-relaxed font-normal">
                  {tech.role}
                </p>
              </div>

              <div className="mt-4 border-t border-white/10 pt-3 flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-500">{tech.categoryLabel}</span>
                <span className={`font-semibold ${isSelected ? 'text-blue-400' : 'text-slate-400'}`}>
                  Inspect →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= LIVE ARCHITECTURE WORKBENCH ================= */}
      <div data-gsap="fade-up" className="mt-8 rounded-2xl border border-white/10 bg-[#0c101d] p-5 sm:p-7 shadow-[0_12px_45px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        
        {/* Terminal Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#06080f] shadow-2xs ${inspectedTech.iconColor}`}>
              {inspectedTech.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981] animate-pulse" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-blue-400">
                  SYSTEM_INSPECTOR://{inspectedTech.id.toUpperCase()}
                </span>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-white mt-0.5">
                {inspectedTech.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs font-semibold text-slate-300">
              {inspectedTech.badge}
            </span>
            <button
              type="button"
              onClick={() => handleCopyCli(inspectedTech.cliCommand)}
              className="rounded-lg border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 px-3 py-1 text-xs font-mono font-semibold text-blue-400 transition-colors"
            >
              {copiedSnippet ? '✓ Snippet Copied' : 'Copy Command'}
            </button>
          </div>
        </div>

        {/* 3 Real Production Telemetry Pillars */}
        <div className="mt-5 grid gap-3 sm:grid-cols-3 font-mono text-xs">
          <div className="rounded-xl border border-white/5 bg-[#06080f] p-3.5">
            <span className="text-[10px] text-slate-500 uppercase block font-semibold">
              {inspectedTech.telemetry.metric1Label}
            </span>
            <strong className="text-white text-sm block mt-1">
              {inspectedTech.telemetry.metric1Value}
            </strong>
          </div>

          <div className="rounded-xl border border-white/5 bg-[#06080f] p-3.5">
            <span className="text-[10px] text-slate-500 uppercase block font-semibold">
              {inspectedTech.telemetry.metric2Label}
            </span>
            <strong className="text-emerald-400 text-sm block mt-1">
              {inspectedTech.telemetry.metric2Value}
            </strong>
          </div>

          <div className="rounded-xl border border-white/5 bg-[#06080f] p-3.5">
            <span className="text-[10px] text-slate-500 uppercase block font-semibold">
              {inspectedTech.telemetry.benchmarkLabel}
            </span>
            <strong className="text-blue-400 text-sm block mt-1">
              {inspectedTech.telemetry.benchmarkValue}
            </strong>
          </div>
        </div>

        {/* Real CLI / Schema Command Terminal Box */}
        <div className="mt-4 rounded-xl border border-white/10 bg-[#06080f] p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-white/5 pb-2">
            <span>TERMINAL COMMAND / BUILD REPLICATION:</span>
            <span className="text-slate-400">{inspectedTech.cliDescription}</span>
          </div>
          <div className="mt-2.5 flex items-center justify-between gap-4 overflow-x-auto text-[11px] sm:text-xs">
            <code className="text-slate-200 select-all whitespace-nowrap">
              <span className="text-emerald-400 font-bold">$ </span>
              {inspectedTech.cliCommand}
            </code>
            <button
              type="button"
              onClick={() => handleCopyCli(inspectedTech.cliCommand)}
              className="text-slate-500 hover:text-white shrink-0 text-[11px] underline"
            >
              {copiedSnippet ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Why DEVSOLE Builds With This */}
        <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-xs sm:text-sm">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Why DEVSOLE Soft Builds With This:
          </span>
          <p className="text-slate-300 leading-relaxed font-normal">
            {inspectedTech.whyDevsole}
          </p>
        </div>

      </div>
    </section>
  );
}

export default Technologies;