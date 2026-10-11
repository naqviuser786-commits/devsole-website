// FILE: src/components/ui/TechMarquee.tsx

const TICKER_ITEMS = [
  'Custom Web Development',
  'SEO & Google Search Ranking',
  'Real Estate & Business Portals',
  'E-Commerce Online Stores',
  'Under 1-Second Page Load Speed',
  '100% Complete Code Ownership',
  'Direct WhatsApp Lead Alerts',
  'Mobile-First Responsive Design',
  'Direct Developer Consultation',
  'Fixed 21-Day Delivery Timeline',
];

export function TechMarquee() {
  return (
    <div
      aria-label="Core Services and Capabilities"
      className="relative w-full overflow-hidden border-y border-white/10 bg-[#080c18]/80 py-3.5 backdrop-blur-md"
    >
      {/* Side Obsidian Dark Gradient Masks (Zero Hard Edges) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-28 bg-gradient-to-r from-[#06080f] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-28 bg-gradient-to-l from-[#06080f] to-transparent" />

      {/* Infinite Seamless Track */}
      <div className="animate-marquee flex items-center gap-8 text-[11px] font-mono font-medium tracking-[0.2em] text-slate-400 uppercase">
        {TICKER_ITEMS.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 whitespace-nowrap transition-colors duration-200 hover:text-white"
          >
            <span className="text-blue-500 font-bold">/</span>
            <span>{item}</span>
          </span>
        ))}

        {TICKER_ITEMS.map((item, i) => (
          <span
            key={`dup-${i}`}
            className="flex items-center gap-3 whitespace-nowrap transition-colors duration-200 hover:text-white"
          >
            <span className="text-blue-500 font-bold">/</span>
            <span>{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default TechMarquee;