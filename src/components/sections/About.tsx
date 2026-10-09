import { SectionHeading } from '@/components/ui/SectionHeading';
import { brandDetails } from '@/data/siteData';

const STRENGTH_ICONS = [
  { icon: '⚡', label: 'Speed Benchmark', metric: '< 0.8s' },
  { icon: '🛡️', label: 'Code Standard', metric: '100% Clean' },
  { icon: '☁️', label: 'Deployment', metric: 'Global CDN' },
];

export function About() {
  return (
    <section
      id="about"
      itemScope
      itemType="https://schema.org/AboutPage"
      className="relative mx-auto max-w-6xl px-4 sm:px-6 py-24 sm:py-28 overflow-hidden"
    >
      <SectionHeading
        eyebrow="Who We Are"
        title="What is DEVSOLE?"
        description="The dedicated single destination for high-velocity full-stack engineering, PropTech platforms, and custom SaaS tools."
      />

      <div className="mt-12 sm:mt-14 grid gap-8 lg:grid-cols-12">
        {/* Left Col: Brand Story (7 cols) */}
        <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-navy-950/70 p-7 sm:p-10 backdrop-blur-md transition-all hover:border-energy/40 hover:shadow-[0_0_35px_rgba(0,240,255,0.12)] lg:col-span-7">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-energy-bright/40 bg-energy/10 px-3.5 py-1 text-xs font-semibold text-energy-bright">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-energy-bright" />
              <span>Core Origin & Philosophy</span>
            </div>

            <h3 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
              Brand Identity & Engineering Vision
            </h3>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-chrome-300">
              {brandDetails.meaning}
            </p>

            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-chrome-400">
              {brandDetails.essence}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 border-t border-white/5 pt-6">
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-energy-bright/40 bg-energy/15 px-4 py-2 text-xs font-bold text-energy-bright shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              <span>⚡</span>
              <span>Dev = Innovation & Engineering</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-chrome-300">
              <span>🎯</span>
              <span>Sole = Dedicated Single Solution</span>
            </span>
          </div>
        </div>

        {/* Right Col: Verified Delivery Architecture Card (5 cols) */}
        <div className="flex flex-col justify-between rounded-3xl border border-energy-bright/40 bg-gradient-to-b from-energy/20 via-navy-950 to-navy-950 p-7 sm:p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(0,240,255,0.15)] lg:col-span-5">
          <div>
            {/* Authentic Agency Quality Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-energy-bright shadow-[0_0_8px_#00f0ff]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                  Delivery Commitments
                </span>
              </div>
              <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase text-emerald-400 font-mono">
                Verified
              </span>
            </div>

            {/* Mission & Vision Modules */}
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-energy-bright/20 text-xs text-energy-bright">
                    🎯
                  </span>
                  <h4 className="font-display text-sm font-bold text-white">Our Mission</h4>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-chrome-300">
                  {brandDetails.mission}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-energy-bright/20 text-xs text-energy-bright">
                    🔭
                  </span>
                  <h4 className="font-display text-sm font-bold text-white">Our Vision</h4>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-chrome-300">
                  {brandDetails.vision}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Live Delivery Standard Banner */}
          <div className="mt-6 flex items-center justify-between rounded-xl border border-energy-bright/30 bg-energy/10 px-4 py-2.5 text-xs">
            <span className="flex items-center gap-2 text-chrome-300 font-medium">
              <span className="h-2 w-2 animate-ping rounded-full bg-energy-bright" />
              <span>100% Source Code & IP Handover</span>
            </span>
            <span className="font-mono font-bold text-energy-bright">Guaranteed</span>
          </div>
        </div>
      </div>

      {/* 3 Core Strengths Grid */}
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {brandDetails.strengths.map((s, index) => {
          const meta = STRENGTH_ICONS[index] || STRENGTH_ICONS[0];

          return (
            <div
              key={s.title}
              className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-navy-950/60 p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-energy-bright/60 hover:bg-white/[0.04] hover:shadow-[0_0_25px_rgba(0,240,255,0.15)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-energy-bright/40 bg-energy/10 text-xl shadow-[0_0_15px_rgba(0,240,255,0.25)] transition-transform duration-300 group-hover:scale-110">
                    <span>{meta.icon}</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-energy-bright">
                    {meta.metric}
                  </span>
                </div>

                <h4 className="mt-5 font-display text-base font-bold text-white group-hover:text-energy-bright transition-colors">
                  {s.title}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-chrome-400">
                  {s.desc}
                </p>
              </div>

              <div className="mt-6 h-1 w-full rounded-full bg-white/5 overflow-hidden">
                <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-energy to-energy-bright group-hover:w-full transition-all duration-700" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}