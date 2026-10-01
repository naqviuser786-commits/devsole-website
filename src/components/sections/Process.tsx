import { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { siteSettings } from '@/data/siteData';

interface SprintStage {
  step: string;
  days: string;
  phase: string;
  icon: string;
  title: string;
  summary: string;
  deliverables: string[];
  tag: string;
}

const SPRINTS: SprintStage[] = [
  {
    step: '01',
    days: 'Days 1 – 3',
    phase: 'Discovery & Modeling',
    icon: '📋',
    title: 'Requirement Blueprint & Schema Design',
    summary:
      'We deconstruct your business goals into exact technical specifications, design relational database schemas, and establish the user journey wireframes.',
    deliverables: [
      'Technical Scope & Feature Matrix',
      'Normalized Relational DB Schema',
      'UI/UX Architecture Wireframes',
      'Mutual NDA & Milestone Contract',
    ],
    tag: 'Foundation',
  },
  {
    step: '02',
    days: 'Days 4 – 10',
    phase: 'Frontend Engineering',
    icon: '💻',
    title: 'Mobile-First UI & Staging Sandbox',
    summary:
      'Developing responsive interfaces with modern CSS/Tailwind, fluid cyberpunk micro-interactions, and setting up an isolated live staging preview.',
    deliverables: [
      'Mobile-First Responsive Layouts',
      'Private Staging URL for Client Review',
      'Interactive Forms & Estimator UI',
      'Cross-Device Performance Tuning',
    ],
    tag: 'Visual Sprint',
  },
  {
    step: '03',
    days: 'Days 11 – 18',
    phase: 'Backend & Data',
    icon: '⚙️',
    title: 'PHP Logic & Relational MySQL Integration',
    summary:
      'Wiring up secure server-side PHP endpoints, structuring MySQL queries with composite indexing, and integrating automated third-party APIs.',
    deliverables: [
      'Sanitized PHP Backend Endpoints',
      'Relational MySQL DB Integration',
      'Payment Gateway / WhatsApp Webhooks',
      'Automated PDF / Email Notification Logic',
    ],
    tag: 'Core Execution',
  },
  {
    step: '04',
    days: 'Days 19 – 21',
    phase: 'Production & Handover',
    icon: '🚀',
    title: 'Cloud Deployment, QA & Full IP Transfer',
    summary:
      'Rigorous cross-browser stress testing, Lighthouse 99+ speed optimization, live server deployment, and complete handover of Git repository and credentials.',
    deliverables: [
      'Production Cloud Server Deployment',
      'Google 95+ PageSpeed Verification',
      'Complete GitHub Repository Handover',
      '30 Days Free Post-Launch Warranty',
    ],
    tag: 'Live Handover',
  },
];

export function Process() {
  const [activeSprint, setActiveSprint] = useState<number>(0);
  const phone = siteSettings.whatsapp.replace(/\D/g, '');

  return (
    <section id="process" className="relative mx-auto max-w-6xl px-4 sm:px-6 py-24 sm:py-28 overflow-hidden">
      <SectionHeading
        eyebrow="Agile Delivery"
        title="Predictable 4-Stage Sprint Roadmap"
        description="From technical blueprint to production cloud deployment, our transparent 21-day execution lifecycle."
        align="center"
      />

      {/* 4-Stage Sprint Cards: 1 col on phone, 2 on tablet, 4 on desktop */}
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SPRINTS.map((sprint, index) => {
          const isSelected = activeSprint === index;

          return (
            <div
              key={sprint.step}
              onClick={() => setActiveSprint(index)}
              className={`group relative flex cursor-pointer flex-col justify-between rounded-3xl p-6 sm:p-7 backdrop-blur-md transition-all duration-300 ${
                isSelected
                  ? 'border-2 border-energy-bright bg-gradient-to-b from-energy/20 via-navy-950/90 to-navy-950 shadow-[0_0_35px_rgba(0,240,255,0.25)] -translate-y-2'
                  : 'border border-white/10 bg-navy-950/60 hover:border-white/20 hover:bg-white/[0.03]'
              }`}
            >
              <div>
                {/* Step Top Bar: Icon + Step + Days */}
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-energy-bright/40 bg-energy/10 text-lg shadow-[0_0_12px_rgba(0,240,255,0.2)]">
                    <span>{sprint.icon}</span>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${
                      isSelected
                        ? 'border border-energy-bright/60 bg-energy-bright/20 text-energy-bright'
                        : 'border border-white/10 bg-white/5 text-chrome-400'
                    }`}
                  >
                    {sprint.days}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-energy-bright font-mono">
                    {sprint.phase}
                  </p>
                  <span
                    className={`font-mono text-xs font-bold ${
                      isSelected ? 'text-energy-bright' : 'text-chrome-600'
                    }`}
                  >
                    Stage {sprint.step}
                  </span>
                </div>

                <h3 className="mt-1 font-display text-base font-bold text-white leading-snug">
                  {sprint.title}
                </h3>

                <p className="mt-3 text-xs leading-relaxed text-chrome-400">
                  {sprint.summary}
                </p>
              </div>

              {/* Deliverables Checklist */}
              <div className="mt-6 border-t border-white/5 pt-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-chrome-500 font-mono">
                  Sprint Deliverables
                </p>
                <ul className="mt-2.5 space-y-1.5">
                  {sprint.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[11px] text-chrome-300">
                      <span className="text-energy-bright font-bold shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🛡️ Strict Delivery Assurance Card: 100% responsive across all screens */}
      <div className="mt-12 rounded-3xl border border-energy-bright/40 bg-navy-950/80 p-6 sm:p-8 backdrop-blur-md shadow-[0_0_35px_rgba(0,240,255,0.12)]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-energy-bright/40 bg-energy/10 px-3.5 py-1 text-xs font-semibold text-energy-bright">
              <span>🛡️</span>
              <span>Zero-Surprise Delivery Guarantee</span>
            </span>
            <h4 className="mt-3 font-display text-lg sm:text-xl font-bold text-white">
              You review, test, and approve staging builds before any milestone clearance.
            </h4>
            <p className="mt-1.5 text-xs sm:text-sm text-chrome-400">
              Direct sprint communication with lead architect Aoun Abbas ensures your project never gets delayed or derailed.
            </p>
          </div>

          <a
            href={`https://wa.me/${phone}?text=Hi%20Aoun!%20I%20reviewed%20your%20sprint%20roadmap%20and%20want%20to%20discuss%20a%20timeline%20for%20my%20project.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto shrink-0 rounded-full bg-energy-bright px-6 py-3.5 text-center text-xs font-bold text-navy-950 shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-transform hover:scale-105"
          >
            <span>💬 Lock In Your Sprint Slot →</span>
          </a>
        </div>
      </div>
    </section>
  );
}