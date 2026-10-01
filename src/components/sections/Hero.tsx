import { siteSettings } from '@/data/siteData';
import { ButtonLink } from '@/components/ui/Button';

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-4 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-40 lg:pb-24"
    >
      <div className="mx-auto w-full max-w-4xl text-center">
        {/* Availability Badge */}
        <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-energy/40 bg-energy/10 px-4 py-1.5 backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.2)]">
          <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-energy-bright shadow-[0_0_8px_#00f0ff]" />
          <span className="truncate font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-energy-bright">
            {siteSettings.activeStatus}
          </span>
        </div>

        {/* Responsive Heading: Scales smoothly from phone (3xl) to large screens (7xl) */}
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl leading-[1.15] text-balance">
          {siteSettings.heroHeading}
        </h1>

        {/* Subtitle with proper responsive line-height */}
        <p className="mx-auto mt-4 max-w-2xl text-xs sm:text-base md:text-lg leading-relaxed text-chrome-300 sm:mt-6 text-balance">
          {siteSettings.heroSubtitle}
        </p>

        {/* Responsive Action Buttons: Full width on phone, side-by-side on tablet/desktop */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 sm:mt-10">
          <ButtonLink
            href="#projects"
            className="w-full sm:w-auto !px-7 !py-3.5 text-xs sm:text-sm font-bold shadow-[0_0_25px_rgba(0,240,255,0.4)]"
          >
            {siteSettings.ctaProjects} →
          </ButtonLink>
          <ButtonLink
            href="#estimator"
            variant="ghost"
            className="w-full sm:w-auto !px-7 !py-3.5 text-xs sm:text-sm font-semibold border-white/10 hover:border-energy-bright/60 hover:text-white"
          >
            ⚡ Calculate Project Cost
          </ButtonLink>
        </div>

        {/* Responsive High-Impact Trust Pills: Wraps cleanly without horizontal overflow */}
        <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-chrome-300">
          <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-navy-950/80 px-3.5 py-1.5 backdrop-blur-md shadow-sm">
            <span className="text-energy-bright text-xs">⚡</span>
            <span className="font-medium">Sub-Second Latency</span>
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-navy-950/80 px-3.5 py-1.5 backdrop-blur-md shadow-sm">
            <span className="text-energy-bright text-xs">🔒</span>
            <span className="font-medium">100% Code & IP Ownership</span>
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-navy-950/80 px-3.5 py-1.5 backdrop-blur-md shadow-sm">
            <span className="text-energy-bright text-xs">🤝</span>
            <span className="font-medium">Direct Founder Sprints</span>
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-energy-bright/30 bg-energy/10 px-3.5 py-1.5 backdrop-blur-md shadow-[0_0_12px_rgba(0,240,255,0.15)]">
            <span className="text-yellow-400 font-bold">★</span>
            <span className="font-semibold text-energy-bright">5.0 Client Rating</span>
          </div>
        </div>
      </div>

      {/* Smooth Bottom Gradient Fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-navy-950 via-navy-950/70 to-transparent" />
    </section>
  );
}