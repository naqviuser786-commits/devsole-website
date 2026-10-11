// FILE: src/components/sections/Process.tsx
import { useState, type ReactNode } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { siteSettings } from '@/data/siteData';
import { soundFX } from '@/lib/soundFx';

interface SprintStage {
  step: string;
  days: string;
  phase: string;
  gate: string;
  gateBadge: string;
  icon: ReactNode;
  title: string;
  summary: string;
  sandboxPreview: string;
  deliverables: string[];
  verificationCriteria: string;
}

const SPRINTS: SprintStage[] = [
  {
    step: '01',
    days: 'Days 1 - 3',
    phase: 'Planning & Scope Lock',
    gate: 'Milestone 1 · 40% Initiation Deposit',
    gateBadge: 'Fixed Budget & Scope Lock',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    title: 'Project Planning, Requirements & Fixed Budget',
    summary:
      'We discuss your business goals, list the exact pages and features you need, and agree on a fixed budget and delivery timeline with zero hidden costs.',
    sandboxPreview: 'docs.devsolesoft.com/scope/project-plan-v1',
    deliverables: [
      'Written List of All Pages & Features',
      'Fixed Budget & Delivery Timeline Contract',
      'Database & Form Requirements Document',
      'Signed Mutual NDA (Non-Disclosure Agreement)',
    ],
    verificationCriteria: 'Client reviews and approves the project plan and feature list before any coding starts.',
  },
  {
    step: '02',
    days: 'Days 4 - 8',
    phase: 'Design & Mobile Preview',
    gate: 'Design Approval Checkpoint',
    gateBadge: 'Private Preview Link',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Mobile-First UI Design & Interactive Preview',
    summary:
      'We design modern, mobile-friendly screens and share a private link so you can click through, review the look, and request any changes before we write the code.',
    sandboxPreview: 'staging.devsolesoft.com/preview/design-approval',
    deliverables: [
      'Mobile-Friendly Screens for Phones & Laptops',
      'Private Password-Protected Preview Link',
      'Interactive Buttons, Menus & Form Layouts',
      'Brand Colors, Logo & Typography Polish',
    ],
    verificationCriteria: 'Client tests the layout on mobile and desktop and gives approval on the visual design.',
  },
  {
    step: '03',
    days: 'Days 9 - 17',
    phase: 'Development & Testing',
    gate: 'Milestone 2 · 30% Feature Approval',
    gateBadge: 'Core Working Demo Sign-Off',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    title: 'Coding, Forms Setup & Database Connections',
    summary:
      'We code the website, connect forms to send leads directly to your WhatsApp and email, set up fast databases and payment gateways, and verify under 1-second load speed.',
    sandboxPreview: 'staging.devsolesoft.com/app/live-testing',
    deliverables: [
      'Fast, Clean Code Built for Mobile & Laptops',
      'Forms Connected to WhatsApp & Email Alerts',
      'Online Payment Gateways & Secure Database',
      'Speed Optimization for Instant Page Loading',
    ],
    verificationCriteria: 'Client submits test inquiries, tries payment flows, and verifies all features work smoothly.',
  },
  {
    step: '04',
    days: 'Days 18 - 21',
    phase: 'Live Launch & Handover',
    gate: 'Milestone 3 · 30% Final Handover',
    gateBadge: '100% Complete Client Handover',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      </svg>
    ),
    title: 'Domain Launch, Speed Check & Complete Handover',
    summary:
      'We launch your website on your custom domain, verify Google speed scores, set up free SSL security, and hand over all admin logins, passwords, and source code files.',
    sandboxPreview: 'yourcompany.com (Live Domain Launch)',
    deliverables: [
      'Live Launch on Your Domain with Free SSL',
      'Google Core Web Vitals Speed Score Verification',
      'All Admin Logins, Passwords & Source Code Handed Over',
      'Free 30-Day Post-Launch Bug Support Guarantee',
    ],
    verificationCriteria: 'Website is live on client domain, all logins are verified, and client owns 100% of the project.',
  },
];

export function Process() {
  const [activeSprintIndex, setActiveSprintIndex] = useState<number>(0);
  const activeSprint = SPRINTS[activeSprintIndex];

  const phone = (siteSettings?.whatsapp || '+923706492398').replace(/\D/g, '');

  return (
    <section
      id="process"
      itemScope
      itemType="https://schema.org/HowTo"
      aria-label="DEVSOLE Soft 21-Day Sprint Roadmap and Delivery Process"
      className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28 overflow-hidden bg-transparent"
    >
      <meta itemProp="name" content="DEVSOLE Soft 21-Day Agile Web Development Process" />
      <meta
        itemProp="description"
        content="From planning and mobile design preview to coding and live domain launch — our transparent 21-day delivery roadmap."
      />

      {/* Subtle Studio Grid Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <div data-gsap="mask-up">
        <SectionHeading
          eyebrow="How We Work · 21-Day Roadmap"
          title="Simple, Transparent 21-Day Delivery Process"
          description="Zero surprises. You inspect and approve working private preview links at every stage before releasing any milestone payment."
          align="center"
        />
      </div>

      {/* Visual Sprint Progress Rail */}
      <div data-gsap="fade-up" className="mt-8 sm:mt-10 max-w-4xl mx-auto overflow-x-auto pb-2">
        <div className="flex items-center justify-between min-w-[560px] rounded-xl border border-white/10 bg-[#080c18] p-2 text-xs font-mono">
          {SPRINTS.map((sprint, idx) => {
            const isSelected = activeSprintIndex === idx;
            return (
              <button
                key={sprint.step}
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setActiveSprintIndex(idx);
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg transition-all ${
                  isSelected
                    ? 'bg-blue-600/20 text-white border border-blue-500/40 font-bold shadow-2xs'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-blue-400 shadow-[0_0_6px_#3b82f6]' : 'bg-slate-600'}`} />
                <span>Stage {sprint.step} ({sprint.days})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4-Stage Sprint Cards Grid */}
      <div data-gsap="stagger-group" className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SPRINTS.map((sprint, index) => {
          const isSelected = activeSprintIndex === index;

          return (
            <div
              key={sprint.step}
              itemScope
              itemType="https://schema.org/HowToStep"
              itemProp="step"
              onClick={() => {
                soundFX.playClick();
                setActiveSprintIndex(index);
              }}
              onMouseEnter={() => soundFX.playHover()}
              className={`group relative flex cursor-pointer flex-col justify-between rounded-2xl p-5 sm:p-6 transition-all duration-200 border ${
                isSelected
                  ? 'border-blue-500/60 bg-[#0c101d] shadow-[0_8px_35px_rgba(59,130,246,0.2)] ring-1 ring-blue-500/40 -translate-y-1'
                  : 'border-white/10 bg-[#0c101d] hover:border-white/20 hover:bg-[#0e1322]'
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
                    0{index + 1}
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
                  className="mt-2 text-xs leading-relaxed text-slate-400 font-normal line-clamp-3"
                >
                  {sprint.summary}
                </p>
              </div>

              {/* Bottom Milestone Gate Pill */}
              <div className="mt-5 border-t border-white/10 pt-3 flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400 truncate max-w-[170px]">{sprint.gateBadge}</span>
                <span className={isSelected ? 'text-blue-400 font-bold' : 'text-slate-500'}>
                  Details →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= LIVE STAGE INSPECTION CARD ================= */}
      <div data-gsap="fade-up" className="mt-8 rounded-2xl border border-white/10 bg-[#0c101d] p-5 sm:p-7 shadow-[0_12px_45px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#06080f] text-blue-400 shadow-2xs">
              {activeSprint.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981] animate-pulse" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-blue-400">
                  STAGE 0{activeSprint.step} · {activeSprint.days.toUpperCase()}
                </span>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-white mt-0.5">
                {activeSprint.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-semibold text-emerald-400">
              {activeSprint.gate}
            </span>
          </div>
        </div>

        {/* Deliverables & Preview Grid */}
        <div className="mt-5 grid gap-6 lg:grid-cols-12">
          
          {/* Left: Deliverables Checklist (7 Cols) */}
          <div className="lg:col-span-7 space-y-3.5">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              What You Receive in this Stage:
            </span>
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {activeSprint.deliverables.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 font-medium rounded-xl border border-white/5 bg-[#06080f] p-3">
                  <svg className="h-4 w-4 shrink-0 text-blue-400 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5 text-xs">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1">
                Your Approval Gate Before Moving Forward:
              </span>
              <p className="text-slate-300 font-normal leading-relaxed">
                {activeSprint.verificationCriteria}
              </p>
            </div>
          </div>

          {/* Right: Live Staging Link Preview Box (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-white/10 bg-[#06080f] p-4 font-mono text-xs shadow-inner">
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2.5 text-[10px] text-slate-500">
                <span>STAGE_PREVIEW_LINK</span>
                <span className="text-emerald-400 font-bold">PASSWORD_PROTECTED</span>
              </div>

              <div className="mt-3 flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/60 px-3 py-1.5 text-[11px] text-slate-300">
                <svg className="h-3 w-3 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span className="truncate text-slate-200">{activeSprint.sandboxPreview}</span>
              </div>

              <div className="mt-3 space-y-2 text-[11px] text-slate-400">
                <div className="flex justify-between">
                  <span>Client Review Window:</span>
                  <strong className="text-white">48 Hours for Feedback</strong>
                </div>
                <div className="flex justify-between">
                  <span>Testing Access:</span>
                  <strong className="text-blue-400">Direct Mobile & PC Link</strong>
                </div>
                <div className="flex justify-between">
                  <span>Lead Developer:</span>
                  <strong className="text-white">Aoun Abbas</strong>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500">
              <span>ZERO SURPRISE CHARGES</span>
              <span className="text-emerald-400 font-semibold">100% TRANSPARENT</span>
            </div>
          </div>

        </div>

      </div>

      {/* Milestone Guarantee Banner */}
      <div className="mt-10 rounded-2xl border border-white/10 bg-[#0c101d] p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-emerald-400 shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981] animate-pulse" />
              <span>100% Risk-Free Milestone Guarantee</span>
            </div>
            <h4 className="mt-2.5 font-display text-lg sm:text-xl font-bold text-white">
              You inspect, test, and approve preview links before releasing payments.
            </h4>
            <p className="mt-1 text-xs sm:text-sm text-slate-400 font-normal max-w-xl">
              Direct technical communication with founder Aoun Abbas ensures your project finishes on time without delays, confusion, or unexpected costs.
            </p>
          </div>

          <a
            href={`https://wa.me/${phone}?text=Hi%20DEVSOLE%20Soft!%20I%20reviewed%20your%2021-day%20delivery%20process%20and%20want%20to%20reserve%20a%20project%20slot.`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFX.playClick()}
            className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 text-xs font-semibold shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-colors"
          >
            <span>Reserve a Project Slot on WhatsApp</span>
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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