import { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';

interface TechItem {
  name: string;
  badge: string;
  icon: string;
  role: string;
  whyDevsole: string;
  color: string;
}

interface TechCategory {
  title: string;
  subtitle: string;
  items: TechItem[];
}

const TECH_CATEGORIES: TechCategory[] = [
  {
    title: 'Frontend & Reactive UI',
    subtitle: 'High-speed, accessible, and responsive user interfaces',
    items: [
      {
        name: 'React & TypeScript',
        badge: 'Component Architecture',
        icon: '⚛️',
        role: 'Type-safe reactive state & modular components',
        whyDevsole:
          'Strict static typing eliminates 95% of runtime bugs while React virtual DOM delivers instant state updates without page flashes.',
        color: '#00f0ff',
      },
      {
        name: 'Tailwind CSS',
        badge: 'Utility CSS Engine',
        icon: '🎨',
        role: 'Zero-runtime stylesheet optimization',
        whyDevsole:
          'Purges unused styles on production build, resulting in minified stylesheets under 15KB for blazing-fast mobile rendering.',
        color: '#38bdf8',
      },
      {
        name: 'HTML5 & Modern CSS3',
        badge: 'Semantic Web',
        icon: '🌐',
        role: 'Responsive Flexbox, CSS Grid & micro-animations',
        whyDevsole:
          'Native semantic markup ensures top Google SEO indexing, accessibility compliance, and 100% cross-device compatibility.',
        color: '#f97316',
      },
      {
        name: 'Three.js & WebGL 3D',
        badge: 'Hardware Acceleration',
        icon: '🧊',
        role: 'Hardware-accelerated interactive 3D elements',
        whyDevsole:
          'Delivers high-end 60fps 3D visuals with adaptive performance tiers to keep memory consumption low on mobile devices.',
        color: '#a855f7',
      },
    ],
  },
  {
    title: 'Backend & Relational Logic',
    subtitle: 'Sub-millisecond endpoints and ACID-compliant storage',
    items: [
      {
        name: 'PHP 8.2 Server-Side',
        badge: 'Native Backend Logic',
        icon: '🐘',
        role: 'Lightweight REST APIs & form data pipelines',
        whyDevsole:
          'Executes requests in under 15ms without bloated framework overhead, reducing required server memory and infrastructure costs.',
        color: '#818cf8',
      },
      {
        name: 'MySQL Database',
        badge: 'Relational Database',
        icon: '🗄️',
        role: 'Structured schemas, indexes & foreign keys',
        whyDevsole:
          'Composite index optimization allows high-concurrency queries across tens of thousands of records to execute in milliseconds.',
        color: '#38bdf8',
      },
      {
        name: 'Automated PDF Engines',
        badge: 'SaaS Document Automation',
        icon: '📄',
        role: 'Instant PDF quotes & analytics exports',
        whyDevsole:
          'Generates branded, downloadable client estimates and invoices directly on the server in under 1 second.',
        color: '#ef4444',
      },
      {
        name: 'RESTful API Pipelines',
        badge: 'Data Integrations',
        icon: '🔌',
        role: 'Secure JSON endpoints & third-party webhooks',
        whyDevsole:
          'Sanitized input validation and token security protect against SQL injections, CSRF attacks, and unauthorized payloads.',
        color: '#10b981',
      },
    ],
  },
  {
    title: 'DevOps & Cloud Environment',
    subtitle: 'Containerization, version control, and global edge CDNs',
    items: [
      {
        name: 'GitHub Version Control',
        badge: 'Atomic Versioning',
        icon: '🐙',
        role: 'Atomic commit tracking & collaboration',
        whyDevsole:
          'Guarantees 100% transparent version history and seamless complete code handover upon milestone clearance.',
        color: '#ffffff',
      },
      {
        name: 'Docker & Staging Sandboxes',
        badge: 'Isolated Environments',
        icon: '🐳',
        role: 'Isolated Apache, PHP & MySQL staging review',
        whyDevsole:
          'Allows our engineers to simulate production cloud environments and test builds before deploying live to public domains.',
        color: '#06b6d4',
      },
      {
        name: 'SQL Query Profiling',
        badge: 'Database Benchmarking',
        icon: '🔍',
        role: 'Query execution profiling & schema optimization',
        whyDevsole:
          'Used to benchmark and optimize query execution plans to eliminate database bottlenecks during high traffic spikes.',
        color: '#fbbf24',
      },
      {
        name: 'Global Cloud Edge CDN',
        badge: 'Global Production CDN',
        icon: '☁️',
        role: 'SSL encryption, HTTP/2 & edge caching',
        whyDevsole:
          'Deploys compiled assets across global edge points, guaranteeing sub-second response times worldwide.',
        color: '#00f0ff',
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
      aria-label="DEVSOLE Engineered Architecture & Tech Stack"
      className="relative mx-auto max-w-6xl px-4 sm:px-6 py-24 sm:py-28 overflow-hidden"
    >
      <SectionHeading
        eyebrow="Engineered Architecture"
        title="Battle-Tested, High-Velocity Tech Stack"
        description="Click or hover any technology to inspect our technical benchmarks and why we chose it for production speed and scalability."
        align="center"
      />

      {/* 3-Column Technology Matrix */}
      <div className="mt-12 sm:mt-14 grid gap-6 sm:gap-8 lg:grid-cols-3">
        {TECH_CATEGORIES.map((cat) => (
          <div
            key={cat.title}
            className="flex flex-col justify-between rounded-3xl border border-white/10 bg-navy-950/70 p-6 sm:p-7 backdrop-blur-md shadow-sm"
          >
            <div>
              <div className="border-b border-white/5 pb-4">
                <h3 className="font-display text-base sm:text-lg font-bold text-white">{cat.title}</h3>
                <p className="mt-1 text-xs text-chrome-400">{cat.subtitle}</p>
              </div>

              <div className="mt-5 space-y-3">
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
                      className={`group cursor-pointer rounded-2xl border p-3.5 sm:p-4 transition-all duration-300 ${
                        isInspected
                          ? 'border-energy-bright bg-energy/15 shadow-[0_0_20px_rgba(0,240,255,0.25)] scale-[1.02]'
                          : 'border-white/5 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-sm shadow-sm">
                            {tech.icon}
                          </span>
                          <h4
                            itemProp="headline"
                            className="text-xs sm:text-sm font-bold text-white group-hover:text-energy-bright transition-colors"
                          >
                            {tech.name}
                          </h4>
                        </div>
                        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] sm:text-[10px] font-medium text-chrome-300">
                          {tech.badge}
                        </span>
                      </div>

                      <p className="mt-2 text-[11px] sm:text-xs text-chrome-400 leading-relaxed">
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

      {/* 🔍 LIVE ARCHITECTURE INSPECTOR CARD */}
      <div className="mt-10 rounded-3xl border-2 border-energy-bright/50 bg-gradient-to-r from-energy/15 via-navy-950/90 to-navy-950 p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(0,240,255,0.18)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-energy-bright/60 bg-navy-900 text-2xl shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              {inspectedTech.icon}
            </span>
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-energy-bright">
                Architecture Inspector
              </span>
              <h4 className="font-display text-lg sm:text-xl font-bold text-white">
                {inspectedTech.name}
              </h4>
            </div>
          </div>

          <span className="rounded-full border border-energy-bright/40 bg-energy/10 px-3.5 py-1 text-xs font-semibold text-energy-bright">
            {inspectedTech.badge}
          </span>
        </div>

        <div className="mt-5 border-t border-white/10 pt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-chrome-400 font-mono">
            Why DEVSOLE Engineers With This:
          </p>
          <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-chrome-200">
            {inspectedTech.whyDevsole}
          </p>
        </div>
      </div>
    </section>
  );
}