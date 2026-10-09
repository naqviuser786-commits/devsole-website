import { SectionHeading } from '@/components/ui/SectionHeading';
import { services, siteSettings } from '@/data/siteData';

const SERVICE_ICONS = ['⚡', '🏢', '🧮', '🛍️'] as const;
const SERVICE_BADGES = [
  'PHP 8.2 + MySQL · Sub-15ms Response',
  'Live Search Filters + WhatsApp Lead Pipeline',
  'Dynamic Pricing Engine + Automated PDF Quotes',
  'Dynamic Cart Drawer + Instant Payment Flow',
] as const;

export function Services() {
  const phone = siteSettings.whatsapp.replace(/\D/g, '');

  return (
    <section
      id="services"
      itemScope
      itemType="https://schema.org/ItemList"
      aria-label="DEVSOLE Engineering Capabilities"
      className="relative mx-auto max-w-6xl px-4 sm:px-6 py-24 sm:py-28 overflow-hidden"
    >
      <SectionHeading
        eyebrow="Specialized Capabilities"
        title="Services Built for Real Business Performance"
        description="Every solution is engineered with clean modular architecture, sub-second latency, and conversion-focused performance."
      />

      <div className="mt-12 sm:mt-14 grid gap-6 sm:gap-8 sm:grid-cols-2">
        {services.map((service, index) => {
          const icon = SERVICE_ICONS[index % SERVICE_ICONS.length];
          const badge = SERVICE_BADGES[index % SERVICE_BADGES.length];
          const waLink = `https://wa.me/${phone}?text=Hi%20DEVSOLE!%20I%20am%20interested%20in%20your%20service:%20${encodeURIComponent(
            service.title
          )}`;

          return (
            <article
              key={service.id}
              itemScope
              itemType="https://schema.org/Service"
              itemProp="itemListElement"
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-navy-950/70 p-6 sm:p-8 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-energy-bright/60 hover:bg-white/[0.03] hover:shadow-[0_0_35px_rgba(0,240,255,0.2)]"
            >
              {/* Google SEO Provider Microdata */}
              <meta itemProp="provider" content="DEVSOLE" />
              <meta itemProp="serviceType" content={service.title} />

              {/* Background Ambient Glow */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-energy/20 blur-[80px] opacity-40 transition-opacity duration-500 group-hover:opacity-75" />

              <div>
                {/* Header: Glowing Icon + Index Number */}
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border border-energy-bright/50 bg-gradient-to-br from-energy/30 to-navy-900 text-xl sm:text-2xl shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-transform duration-300 group-hover:scale-110">
                    <span>{icon}</span>
                  </div>

                  <span className="font-mono text-2xl sm:text-3xl font-extrabold text-chrome-700/60 transition-colors group-hover:text-energy-bright/80">
                    0{index + 1}
                  </span>
                </div>

                {/* Technical Micro-Badge */}
                <div className="mt-5">
                  <span className="inline-block rounded-full border border-energy-bright/30 bg-energy/10 px-3 py-1 font-mono text-[10px] font-bold text-energy-bright">
                    {badge}
                  </span>
                </div>

                {/* Title & Description with Google Semantic Properties */}
                <h3
                  itemProp="name"
                  className="mt-3 font-display text-lg sm:text-xl font-bold text-white transition-colors group-hover:text-energy-bright"
                >
                  {service.title}
                </h3>
                <p
                  itemProp="description"
                  className="mt-2.5 text-xs sm:text-sm leading-relaxed text-chrome-400"
                >
                  {service.description}
                </p>

                {/* Feature Checklist */}
                <ul className="mt-6 space-y-2.5 border-t border-white/5 pt-6">
                  {service.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-center gap-2.5 text-xs font-medium text-chrome-300 transition-colors group-hover:text-chrome-200"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-energy-bright shadow-[0_0_6px_#00f0ff]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct Action Link with Conversion Payload */}
              <div className="mt-8 border-t border-white/5 pt-4">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-energy-bright transition-all group-hover:gap-3 hover:underline"
                >
                  <span>Build this with DEVSOLE</span>
                  <span className="text-sm">→</span>
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}