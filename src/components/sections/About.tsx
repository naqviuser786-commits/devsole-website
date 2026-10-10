import { SectionHeading } from '@/components/ui/SectionHeading';
import { brandDetails } from '@/data/siteData';

export function About() {
  return (
    <section
      id="about"
      itemScope
      itemType="https://schema.org/AboutPage"
      className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28 overflow-hidden bg-transparent"
    >
      {/* Subtle Studio Grid Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <SectionHeading
        eyebrow="Company Identity"
        title="What is DEVSOLE Soft?"
        description="An independent software studio built for fast, resilient full-stack web engineering, specialized real estate portals, and automated SaaS tools."
      />

      {/* Main Bento Cards Grid */}
      <div className="mt-12 sm:mt-14 grid gap-6 lg:gap-8 lg:grid-cols-12">
        {/* ================= LEFT BENTO: Brand Architecture (7 cols) ================= */}
        <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c101d] p-6 sm:p-9 shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:border-white/20 transition-all duration-300 lg:col-span-7">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-xs font-mono font-semibold text-blue-400 shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
              <span>Core Origin & Engineering Philosophy</span>
            </div>

            <h3 className="mt-4 font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Brand Architecture & Engineering Vision
            </h3>

            <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-slate-300 font-normal">
              {brandDetails.meaning}
            </p>

            <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-400 font-normal">
              {brandDetails.essence}
            </p>
          </div>

          {/* Dev + Sole Monochromatic Visual Tiles */}
          <div className="mt-7 grid sm:grid-cols-2 gap-3.5 border-t border-white/10 pt-6">
            {/* Tile 1: DEV */}
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3.5 shadow-2xs">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-blue-400 shadow-2xs">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <div>
                <span className="block font-display text-xs sm:text-sm font-bold text-white">Dev · Innovation</span>
                <span className="block text-[11px] text-slate-400 font-medium">Web Systems & Architecture</span>
              </div>
            </div>

            {/* Tile 2: SOLE */}
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3.5 shadow-2xs">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-blue-400 shadow-2xs">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <div>
                <span className="block font-display text-xs sm:text-sm font-bold text-white">Sole · Dedicated</span>
                <span className="block text-[11px] text-slate-400 font-medium">Single Software Partner</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT BENTO: Mission & Commitments (5 cols) ================= */}
        <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c101d] p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:border-white/20 transition-all duration-300 lg:col-span-5">
          <div>
            {/* Header with Verified Badge */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Delivery Commitments
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-mono font-semibold text-emerald-400 shadow-2xs uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
                Verified SLA
              </span>
            </div>

            {/* Mission & Vision Studio Tiles */}
            <div className="mt-5 space-y-3">
              {/* Mission */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-semibold text-blue-400 uppercase">Mission</span>
                </div>
                <h4 className="mt-1 font-display text-sm font-bold text-white">
                  Engineering Reliability
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-slate-400 font-normal">
                  {brandDetails.mission}
                </p>
              </div>

              {/* Vision */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-semibold text-blue-400 uppercase">Vision</span>
                </div>
                <h4 className="mt-1 font-display text-sm font-bold text-white">
                  Scalable Standards
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-slate-400 font-normal">
                  {brandDetails.vision}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom IP Handover Guarantee Banner */}
          <div className="mt-6 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs shadow-2xs">
            <span className="flex items-center gap-2 font-semibold text-white">
              <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>100% Complete Source Code Ownership</span>
            </span>
            <span className="font-mono text-[11px] font-bold text-emerald-400">Guaranteed</span>
          </div>
        </div>
      </div>

      {/* ================= 3 CORE STRENGTHS: Unified Studio Cards ================= */}
      <div className="mt-8 sm:mt-10 grid gap-5 sm:grid-cols-3">
        {brandDetails.strengths.map((s, index) => (
          <div
            key={s.title}
            className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c101d] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-blue-500/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.7)] transition-all duration-300 hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-blue-400 shadow-2xs">
                  {index === 0 && (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  )}
                  {index === 1 && (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  )}
                  {index === 2 && (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
                    </svg>
                  )}
                </div>
                <span className="font-mono text-xs font-semibold text-slate-500">0{index + 1}</span>
              </div>

              <h4 className="mt-4 font-display text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                {s.title}
              </h4>

              <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-400 font-normal">
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default About;