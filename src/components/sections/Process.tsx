import { useState, type ReactNode } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { siteSettings } from '@/data/siteData';

interface SprintStage {
  step: string;
  days: string;
  phase: string;
  icon: ReactNode;
  title: string;
  summary: string;
  deliverables: string[];
}

const SPRINTS: SprintStage[] = [
  {
    step: '01',
    days: 'Days 1 - 3',
    phase: 'Discovery and Architecture',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    title: 'Requirement Blueprint & Schema Design',
    summary:
      'We deconstruct your business goals into technical specifications, design normalized relational database schemas, and establish user journey wireframes.',
    deliverables: [
      'Technical Scope & Feature Matrix',
      'Normalized Relational DB Schema',
      'UI/UX Architecture Wireframes',
      'Mutual NDA & Milestone Contract',
    ],
  },
  {
    step: '02',
    days: 'Days 4 - 10',
    phase: 'Frontend Engineering',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Mobile-First UI & Staging Sandbox',
    summary:
      'Developing responsive interfaces with modern CSS/Tailwind, intuitive high-converting micro-interactions, and setting up an isolated staging sandbox for review.',
    deliverables: [
      'Mobile-First Responsive Layouts',
      'Private Staging URL for Client Review',
      'Interactive Forms & Estimator UI',
      'Cross-Device Performance Tuning',
    ],
  },
  {
    step: '03',
    days: 'Days 11 - 18',
    phase: 'Backend & Data',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    title: 'PHP Logic & Relational MySQL Integration',
    summary:
      'Wiring up secure server-side PHP endpoints, structuring MySQL queries with composite indexing, and integrating automated third-party APIs.',
    deliverables: [
      'Sanitized PHP Backend Endpoints',
      'Relational MySQL DB Integration',
      'Payment Gateway / WhatsApp Webhooks',
      'Automated PDF / Email Notification Logic',
    ],
  },
  {
    step: '04',
    days: 'Days 19 - 21',
    phase: 'Production & Handover',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      </svg>
    ),
    title: 'Cloud Deployment, QA & Full IP Transfer',
    summary:
      'Rigorous cross-browser stress testing, Lighthouse 95+ speed verification, live server deployment, and complete handover of Git repository and credentials.',
    deliverables: [
      'Production Cloud Server Deployment',
      'Google 95+ PageSpeed Verification',
      'Complete GitHub Repository Handover',
      '30 Days Free Post-Launch Warranty',
    ],
  },
];

export function Process() {
  const [activeSprint, setActiveSprint] = useState<number>(0);
  const phone = (siteSettings?.whatsapp || '+923706492398').replace(/\D/g, '');

  return (
    <section
      id="process"
      itemScope
      itemType="https://schema.org/HowTo"
      aria-label="DEVSOLE Soft Agile Engineering Process"
      className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28 overflow-hidden bg-transparent"
    >
      <meta itemProp="name" content="DEVSOLE Soft 21-Day Agile Web Engineering Process" />
      <meta
        itemProp="description"
        content="From technical blueprint to production cloud deployment, our transparent 21-day execution lifecycle."
      />

      {/* Subtle Studio Grid Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <SectionHeading
        eyebrow="Agile Delivery"
        title="Predictable 4-Stage Sprint Roadmap"
        description="From technical blueprint to production cloud deployment, our transparent 21-day execution lifecycle."
        align="center"
      />

      {/* 4-Stage Sprint Cards Grid */}
      <div className="mt-12 sm:mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SPRINTS.map((sprint, index) => {
          const isSelected = activeSprint === index;

          return (
            <div
              key={sprint.step}
              itemScope
              itemType="https://schema.org/HowToStep"
              itemProp="step"
              onClick={() => setActiveSprint(index)}
              className={`group relative flex cursor-pointer flex-col justify-between rounded-2xl p-5 sm:p-6 transition-all duration-200 border ${
                isSelected
                  ? 'border-blue-500/60 bg-[#0c101d] shadow-[0_8px_35px_rgba(59,130,246,0.2)] ring-1 ring-blue-500/30 -translate-y-1'
                  : 'border-white/10 bg-[#0c101d] hover:border-white/20 shadow-[0_4px_25px_rgba(0,0,0,0.5)]'
              }`}
            >
              <meta itemProp="position" content={sprint.step} />

              <div>
                {/* Header: Stage Icon + Days Pill */}
                <div className="flex items-center justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl border shadow-2xs ${
                    isSelected ? 'border-blue-500 bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.3)]' : 'border-white/10 bg-white/[0.04] text-blue-400'
                  }`}>
                    {sprint.icon}
                  </div>

                  <span className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[10px] font-semibold text-slate-300 uppercase">
                    {sprint.days}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-blue-400">
                    {sprint.phase}
                  </p>
                  <span className="font-mono text-xs font-semibold text-slate-500">
                    Stage {sprint.step}
                  </span>
                </div>

                <h3
                  itemProp="name"
                  className="mt-1 font-display text-sm sm:text-base font-bold text-white leading-snug"
                >
                  {sprint.title}
                </h3>

                <p
                  itemProp="text"
                  className="mt-2 text-xs leading-relaxed text-slate-400 font-normal"
                >
                  {sprint.summary}
                </p>
              </div>

              {/* Deliverables Checklist */}
              <div className="mt-5 border-t border-white/10 pt-3.5">
                <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                  Sprint Deliverables
                </p>
                <ul className="mt-2 space-y-1.5">
                  {sprint.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[11px] text-slate-300 font-medium">
                      <svg className="h-3.5 w-3.5 shrink-0 mt-0.5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Delivery Assurance Guarantee Card */}
      <div className="mt-12 rounded-2xl border border-white/10 bg-[#0c101d] p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-xs font-mono font-semibold text-emerald-400 shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981] animate-pulse" />
              <span>Zero-Surprise Delivery Assurance</span>
            </div>
            <h4 className="mt-2.5 font-display text-lg sm:text-xl font-bold text-white">
              You review, test, and approve staging builds before any milestone clearance.
            </h4>
            <p className="mt-1 text-xs sm:text-sm text-slate-400 font-normal max-w-xl">
              Direct sprint communication with founder Aoun Abbas ensures your project is delivered on schedule without technical debt.
            </p>
          </div>

          <a
            href={`https://wa.me/${phone}?text=Hi%20DEVSOLE%20Soft!%20I%20reviewed%20your%20sprint%20roadmap%20and%20want%20to%20reserve%20a%20timeline%20slot.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 text-xs font-semibold shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-colors"
          >
            <span>Reserve Sprint Slot</span>
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Process;