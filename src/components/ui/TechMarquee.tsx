const TICKER_ITEMS = [
  '✦ PropTech & Real Estate Platforms',
  '✦ Sub-Second Full-Stack Web Apps',
  '✦ Automated SaaS Pricing Calculators',
  '✦ Custom PHP & Relational MySQL Architecture',
  '✦ < 0.8s Global Core Web Vitals Benchmark',
  '✦ Dynamic E-Commerce Marketplaces',
  '✦ 100% IP & Source Code Ownership',
  '✦ High-Performance Responsive UI & 3D WebGL',
  '✦ Direct Founder Consultations',
];

export function TechMarquee() {
  return (
    <div
      aria-label="Core Capabilities Ticker"
      className="relative w-full overflow-hidden border-y border-white/5 bg-navy-950/60 py-4 backdrop-blur-md"
    >
      {/* Left and Right Gradient Fade Overlays */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-20 bg-gradient-to-r from-navy-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-20 bg-gradient-to-l from-navy-950 to-transparent" />

      {/* Infinite Seamless Moving Track */}
      <div className="animate-marquee flex items-center gap-8 text-xs font-semibold uppercase tracking-[0.2em] text-chrome-400">
        {/* First Set */}
        {TICKER_ITEMS.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-2 whitespace-nowrap transition-colors hover:text-energy-bright hover:drop-shadow-[0_0_8px_#00f0ff]"
          >
            {item}
          </span>
        ))}

        {/* Duplicate Set for Seamless Continuous Loop */}
        {TICKER_ITEMS.map((item, i) => (
          <span
            key={`dup-${i}`}
            className="flex items-center gap-2 whitespace-nowrap transition-colors hover:text-energy-bright hover:drop-shadow-[0_0_8px_#00f0ff]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}