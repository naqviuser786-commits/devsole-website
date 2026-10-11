// FILE: src/components/sections/About.tsx
import { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { brandDetails, siteSettings } from '@/data/siteData';
import { soundFX } from '@/lib/soundFx';

type BrandFocus = 'dev' | 'sole';

export function About() {
  const [activeFocus, setActiveFocus] = useState<BrandFocus>('dev');
  const phone = (siteSettings?.whatsapp || '+923706492398').replace(/\D/g, '');

  return (
    <section
      id="about"
      itemScope
      itemType="https://schema.org/AboutPage"
      className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28 overflow-hidden bg-transparent"
    >
      {/* Subtle Studio Grid Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <div data-gsap="mask-up">
        <SectionHeading
          eyebrow="About DEVSOLE Soft · Who We Are"
          title="A Dedicated Web Development Team Built for Your Growth"
          description="We are an independent software development team based in Lahore. We build websites, online stores, and custom web portals that load in under 1 second, rank on Google, and turn everyday visitors into real paying clients."
        />
      </div>

      {/* Main Bento Matrix (7 Cols Origin + 5 Cols Commitments) */}
      <div data-gsap="fade-up" className="mt-12 sm:mt-14 grid gap-6 lg:gap-8 lg:grid-cols-12">
        
        {/* ================= LEFT BENTO: Brand Meaning (7 cols) ================= */}
        <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c101d] p-6 sm:p-9 shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:border-white/20 transition-all duration-300 lg:col-span-7 overflow-hidden">
          <div className="bg-grid absolute inset-0 opacity-10 pointer-events-none rounded-2xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-blue-400 shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#3b82f6]" />
              <span>What DEVSOLE Means</span>
            </div>

            <h3 className="mt-4 font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Complete Web Solutions from One Trusted Team
            </h3>

            <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-slate-300 font-normal">
              {brandDetails.meaning}
            </p>

            <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-400 font-normal">
              {brandDetails.essence}
            </p>
          </div>

          {/* Dev + Sole Interactive Tiles */}
          <div className="relative z-10 mt-7 grid sm:grid-cols-2 gap-3.5 border-t border-white/10 pt-6">
            {/* Tile 1: DEV */}
            <div
              onMouseEnter={() => {
                soundFX.playHover();
                setActiveFocus('dev');
              }}
              className={`flex items-start gap-3 rounded-xl border p-4 transition-all cursor-pointer ${
                activeFocus === 'dev'
                  ? 'border-blue-500/60 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/30'
                  : 'border-white/10 bg-white/[0.02] hover:border-white/20'
              }`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-blue-400 shadow-2xs">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <div>
                <span className="block font-display text-sm font-bold text-white">DEV · Development</span>
                <span className="block text-xs text-blue-400 font-mono mt-0.5">Fast, Modern Code</span>
                <p className="mt-1 text-[11px] text-slate-400 leading-relaxed font-normal">
                  Clean websites and web apps built to load fast, rank on Google, and work smoothly on all devices.
                </p>
              </div>
            </div>

            {/* Tile 2: SOLE */}
            <div
              onMouseEnter={() => {
                soundFX.playHover();
                setActiveFocus('sole');
              }}
              className={`flex items-start gap-3 rounded-xl border p-4 transition-all cursor-pointer ${
                activeFocus === 'sole'
                  ? 'border-blue-500/60 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/30'
                  : 'border-white/10 bg-white/[0.02] hover:border-white/20'
              }`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-blue-400 shadow-2xs">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <div>
                <span className="block font-display text-sm font-bold text-white">SOLE · Dedicated</span>
                <span className="block text-xs text-blue-400 font-mono mt-0.5">Your Single Tech Partner</span>
                <p className="mt-1 text-[11px] text-slate-400 leading-relaxed font-normal">
                  Direct communication with our lead developer from day one — zero middle-men, zero junior handoffs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT BENTO: Mission & Commitments (5 cols) ================= */}
        <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c101d] p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:border-white/20 transition-all duration-300 lg:col-span-5 overflow-hidden">
          <div className="bg-grid absolute inset-0 opacity-10 pointer-events-none rounded-2xl" />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Our Commitments to You
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-400 uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
                Guaranteed
              </span>
            </div>

            {/* Mission & Vision */}
            <div className="mt-5 space-y-3.5">
              {/* Mission */}
              <div className="rounded-xl border border-white/5 bg-[#06080f] p-4">
                <span className="font-mono text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                  OUR MISSION
                </span>
                <h4 className="mt-1 font-display text-sm font-bold text-white">
                  Fast Websites That Actually Bring Business
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-slate-400 font-normal">
                  {brandDetails.mission}
                </p>
              </div>

              {/* Vision */}
              <div className="rounded-xl border border-white/5 bg-[#06080f] p-4">
                <span className="font-mono text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                  OUR VISION
                </span>
                <h4 className="mt-1 font-display text-sm font-bold text-white">
                  Zero Jargon, Fixed Timelines, Honest Pricing
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-slate-400 font-normal">
                  {brandDetails.vision}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Complete Handover Guarantee */}
          <div className="relative z-10 mt-6 flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-xs shadow-2xs">
            <span className="flex items-center gap-2 font-semibold text-white">
              <svg className="h-4 w-4 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>100% Complete Source Code Ownership</span>
            </span>
            <span className="font-mono text-[11px] font-bold text-emerald-400 uppercase">Always Included</span>
          </div>
        </div>
      </div>

      {/* ================= 3 CORE PRINCIPLES ================= */}
      <div data-gsap="stagger-group" className="mt-8 sm:mt-10 grid gap-5 sm:grid-cols-3">
        {brandDetails.strengths.map((s, index) => (
          <div
            key={s.title}
            onMouseEnter={() => soundFX.playHover()}
            className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c101d] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-blue-500/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.7)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            <div className="bg-grid absolute inset-0 opacity-10 pointer-events-none rounded-2xl" />

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-blue-400 shadow-2xs group-hover:scale-105 transition-transform">
                  {index === 0 && (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  )}
                  {index === 1 && (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  )}
                  {index === 2 && (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  )}
                </div>
                <span className="font-mono text-xs font-bold text-slate-500">
                  STANDARD_0{index + 1}
                </span>
              </div>

              <h4 className="mt-4 font-display text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                {s.title}
              </h4>

              <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-400 font-normal">
                {s.desc}
              </p>
            </div>

            <div className="relative z-10 mt-5 border-t border-white/10 pt-3 flex items-center justify-between font-mono text-[10px] text-slate-500">
              <span>DEVSOLE_COMMITMENT</span>
              <span className="text-emerald-400 font-semibold">100% VERIFIED</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Direct Founder Consultation Banner */}
      <div data-gsap="fade-up" className="mt-10 rounded-2xl border border-white/10 bg-[#0c101d] p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-blue-400 shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_#3b82f6]" />
              <span>Direct Developer Consultation</span>
            </div>
            <h4 className="mt-2.5 font-display text-lg sm:text-xl font-bold text-white">
              Ready to build a website that actually grows your business?
            </h4>
            <p className="mt-1 text-xs sm:text-sm text-slate-400 font-normal max-w-xl">
              Discuss your project directly with founder and lead developer Aoun Abbas. We evaluate your requirements and suggest a clear, fixed timeline.
            </p>
          </div>

          <a
            href={`https://wa.me/${phone}?text=Hi%20Aoun%20Abbas!%20I%20reviewed%20DEVSOLE%20Soft%20and%20want%20to%20discuss%20a%20project.`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFX.playClick()}
            className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 text-xs font-semibold shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-colors"
          >
            <span>Discuss on WhatsApp</span>
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

export default About;