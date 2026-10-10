import { useState, type ReactNode } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';

interface TechItem {
  name: string;
  badge: string;
  iconBg: string;
  iconColor: string;
  icon: ReactNode;
  role: string;
  whyDevsole: string;
}

interface TechCategory {
  title: string;
  subtitle: string;
  badgeColor: string;
  items: TechItem[];
}

const TECH_CATEGORIES: TechCategory[] = [
  {
    title: 'Frontend & Reactive UI',
    subtitle: 'High-speed, accessible, and responsive user interfaces',
    badgeColor: 'border-white/10 bg-white/[0.04] text-blue-400',
    items: [
      {
        name: 'React & TypeScript',
        badge: 'Component Architecture',
        iconBg: 'bg-white/[0.04] border-white/10',
        iconColor: 'text-blue-400',
        icon: (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          </svg>
        ),
        role: 'Type-safe reactive state and modular component architecture',
        whyDevsole:
          'Strict static typing eliminates runtime bugs while React virtual DOM delivers instant state updates without full page reloads.',
      },
      {
        name: 'Tailwind CSS',
        badge: 'Utility CSS Engine',
        iconBg: 'bg-white/[0.04] border-white/10',
        iconColor: 'text-sky-400',
        icon: (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
          </svg>
        ),
        role: 'Zero-runtime stylesheet optimization for sub-second page loads',
        whyDevsole:
          'Purges unused styles on production build, resulting in minified stylesheets under 15KB for blazing-fast mobile rendering.',
      },
      {
        name: 'HTML5 & Modern CSS3',
        badge: 'Semantic Web',
        iconBg: 'bg-white/[0.04] border-white/10',
        iconColor: 'text-amber-400',
        icon: (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        ),
        role: 'Responsive Flexbox, CSS Grid, and fluid micro-animations',
        whyDevsole:
          'Native semantic markup ensures top Google SEO indexing, accessibility compliance, and 100% cross-device compatibility.',
      },
      {
        name: 'High-Performance UI Engine',
        badge: 'Hardware Acceleration',
        iconBg: 'bg-white/[0.04] border-white/10',
        iconColor: 'text-indigo-400',
        icon: (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          </svg>
        ),
        role: 'Hardware-accelerated rendering and fluid micro-interactions',
        whyDevsole:
          'Delivers high-end 60 to 120 FPS visual fluidness with low battery overhead on mobile screens.',
      },
    ],
  },
  {
    title: 'Backend & Relational Logic',
    subtitle: 'Sub-millisecond endpoints and ACID-compliant storage',
    badgeColor: 'border-white/10 bg-white/[0.04] text-blue-400',
    items: [
      {
        name: 'PHP 8.2 Server-Side',
        badge: 'Native Backend Logic',
        iconBg: 'bg-white/[0.04] border-white/10',
        iconColor: 'text-indigo-400',
        icon: (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        ),
        role: 'Lightweight REST APIs and sanitized data pipelines',
        whyDevsole:
          'Executes requests in under 15ms without bloated framework overhead, reducing required server memory and infrastructure costs.',
      },
      {
        name: 'MySQL Database',
        badge: 'Relational Database',
        iconBg: 'bg-white/[0.04] border-white/10',
        iconColor: 'text-cyan-400',
        icon: (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          </svg>
        ),
        role: 'Structured schemas, indexes, and foreign keys',
        whyDevsole:
          'Composite index optimization allows high-concurrency queries across tens of thousands of records to execute in milliseconds.',
      },
      {
        name: 'Automated PDF Engines',
        badge: 'SaaS Document Automation',
        iconBg: 'bg-white/[0.04] border-white/10',
        iconColor: 'text-rose-400',
        icon: (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        ),
        role: 'Instant PDF quotes and analytics exports',
        whyDevsole:
          'Generates branded, downloadable client estimates and invoices directly on the server in under 1 second.',
      },
      {
        name: 'RESTful API Pipelines',
        badge: 'Data Integrations',
        iconBg: 'bg-white/[0.04] border-white/10',
        iconColor: 'text-emerald-400',
        icon: (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="18" r="3" />
            <circle cx="6" cy="6" r="3" />
            <path d="M13 6h3a2 2 0 0 1 2 2v7" />
            <line x1="6" y1="9" x2="6" y2="21" />
          </svg>
        ),
        role: 'Secure JSON endpoints and third-party webhooks',
        whyDevsole:
          'Sanitized input validation and token security protect against SQL injections, CSRF attacks, and unauthorized payloads.',
      },
    ],
  },
  {
    title: 'DevOps & Cloud Infrastructure',
    subtitle: 'Version control, staging isolation, and global edge CDNs',
    badgeColor: 'border-white/10 bg-white/[0.04] text-blue-400',
    items: [
      {
        name: 'GitHub Enterprise Control',
        badge: 'Atomic Versioning',
        iconBg: 'bg-white/[0.04] border-white/10',
        iconColor: 'text-slate-200',
        icon: (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        ),
        role: 'Atomic commit tracking and structured code branches',
        whyDevsole:
          'Guarantees 100% transparent version history and seamless complete code handover upon milestone clearance.',
      },
      {
        name: 'Docker & Staging Sandboxes',
        badge: 'Isolated Environments',
        iconBg: 'bg-white/[0.04] border-white/10',
        iconColor: 'text-cyan-400',
        icon: (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        ),
        role: 'Isolated staging sandbox review for client testing',
        whyDevsole:
          'Allows our engineers to simulate production cloud environments and test builds before deploying live to public domains.',
      },
      {
        name: 'SQL Query Profiling',
        badge: 'Database Benchmarking',
        iconBg: 'bg-white/[0.04] border-white/10',
        iconColor: 'text-amber-400',
        icon: (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        ),
        role: 'Query execution profiling and schema optimization',
        whyDevsole:
          'Used to benchmark and optimize query execution plans to eliminate database bottlenecks during high traffic spikes.',
      },
      {
        name: 'Global Cloud Edge CDN',
        badge: 'Global Production CDN',
        iconBg: 'bg-white/[0.04] border-white/10',
        iconColor: 'text-blue-400',
        icon: (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        ),
        role: 'SSL encryption, HTTP/2, and edge caching',
        whyDevsole:
          'Deploys compiled assets across global edge points, guaranteeing sub-second response times worldwide.',
      },
    ],
  },
];

export function Technologies() {
  const [inspectedTech, setInspectedTech] = useState<TechItem>(TECH_CATEGORIES[0].items[0]);

  return (
    <section
      id="technologies"
      itemScope
      itemType="https://schema.org/ItemList"
      aria-label="DEVSOLE Soft Engineered Architecture & Tech Stack"
      className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28 overflow-hidden bg-transparent"
    >
      {/* Subtle Studio Grid Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <SectionHeading
        eyebrow="Engineered Architecture"
        title="Battle-Tested, High-Velocity Tech Stack"
        description="Select or inspect any technology to review our technical benchmarks and why we chose it for speed and reliability."
        align="center"
      />

      {/* 3-Column Technology Matrix */}
      <div className="mt-12 sm:mt-14 grid gap-6 lg:grid-cols-3">
        {TECH_CATEGORIES.map((cat) => (
          <div
            key={cat.title}
            className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c101d] p-5 sm:p-6 shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:border-white/20 transition-colors"
          >
            <div>
              <div className="border-b border-white/10 pb-3.5">
                <span className={`inline-block rounded-md border px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase mb-1.5 ${cat.badgeColor}`}>
                  {cat.title}
                </span>
                <p className="text-xs text-slate-400 font-medium">{cat.subtitle}</p>
              </div>

              <div className="mt-4 space-y-2">
                {cat.items.map((tech) => {
                  const isInspected = inspectedTech.name === tech.name;

                  return (
                    <div
                      key={tech.name}
                      itemScope
                      itemType="https://schema.org/TechArticle"
                      itemProp="itemListElement"
                      onClick={() => setInspectedTech(tech)}
                      onMouseEnter={() => setInspectedTech(tech)}
                      className={`group cursor-pointer rounded-xl border p-3 transition-all duration-150 ${
                        isInspected
                          ? 'border-blue-500/60 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/30'
                          : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className={`flex h-7 w-7 items-center justify-center rounded-lg border shadow-2xs ${tech.iconBg} ${tech.iconColor}`}>
                            {tech.icon}
                          </span>
                          <h4
                            itemProp="headline"
                            className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors"
                          >
                            {tech.name}
                          </h4>
                        </div>
                        <span className="rounded border border-white/10 bg-white/[0.03] px-1.5 py-0.5 text-[9px] font-mono text-slate-400 font-medium">
                          {tech.badge}
                        </span>
                      </div>

                      <p className="mt-1.5 text-[11px] text-slate-400 leading-relaxed font-normal">
                        {tech.role}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live Architecture Inspector Studio Panel */}
      <div className="mt-8 rounded-2xl border border-white/10 bg-[#0c101d] p-6 sm:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className={`flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] shadow-2xs ${inspectedTech.iconColor}`}>
              {inspectedTech.icon}
            </span>
            <div>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded">
                Live Architecture Inspector
              </span>
              <h4 className="font-display text-base sm:text-lg font-bold text-white mt-1">
                {inspectedTech.name}
              </h4>
            </div>
          </div>

          <span className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-mono font-semibold text-slate-300 shadow-2xs">
            {inspectedTech.badge}
          </span>
        </div>

        <div className="mt-4 border-t border-white/10 pt-3.5">
          <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400">
            Why DEVSOLE Soft Engineers With This:
          </p>
          <p className="mt-1 text-xs sm:text-sm leading-relaxed text-slate-300 font-normal">
            {inspectedTech.whyDevsole}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Technologies;