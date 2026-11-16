// FILE: src/components/sections/Services.tsx
// Service cards for the homepage and /services. Names, summaries and links come
// from src/seo/seo-data.json (the same source as the dedicated service pages),
// so a service is only ever described in one place.
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { siteSettings } from '@/data/siteData';
import seoData from '@/seo/seo-data.json';
import { soundFX } from '@/lib/soundFx';

interface ServiceExtras {
  /** Short label shown above the service name. */
  tag: string;
  /** Typical delivery time. */
  delivery: string;
  /** What the client receives. */
  includes: string[];
  /** Tailwind classes for the icon tile. */
  tone: string;
  icon: ReactNode;
}

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className: 'h-6 w-6',
  'aria-hidden': true,
};

const EXTRAS: Record<string, ServiceExtras> = {
  'web-development': {
    tag: 'Websites & web apps',
    delivery: '2–3 weeks',
    tone: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
    includes: [
      'Mobile-first, fully responsive design',
      'Contact forms with WhatsApp alerts',
      'Clean code that you fully own',
      'Free 30-day support after launch',
    ],
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M3 9h18M8 21h8M12 18v3" />
      </svg>
    ),
  },
  'seo-services': {
    tag: 'Google ranking',
    delivery: 'Ongoing, monthly',
    tone: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
    includes: [
      'On-page SEO and keyword targeting',
      'Search Console and sitemap setup',
      'Google Maps and Business Profile',
      'Page speed and technical fixes',
    ],
    icon: (
      <svg {...iconProps}>
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3M8.5 12.5l2-2 1.5 1.5 2-2.5" />
      </svg>
    ),
  },
  'ecommerce-development': {
    tag: 'Online stores',
    delivery: '2–3 weeks',
    tone: 'border-purple-500/30 bg-purple-500/10 text-purple-400',
    includes: [
      'Quick cart and simple checkout',
      'Card payments and Cash on Delivery',
      'WhatsApp alert for every order',
      'Admin panel for products and prices',
    ],
    icon: (
      <svg {...iconProps}>
        <path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 8H6.2" />
        <circle cx="9.5" cy="20" r="1.2" />
        <circle cx="17" cy="20" r="1.2" />
      </svg>
    ),
  },
  'real-estate-portal-development': {
    tag: 'Portals & dashboards',
    delivery: '2–3 weeks',
    tone: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
    includes: [
      'Property search by city and price',
      'Photo galleries and map views',
      'Direct agent WhatsApp buttons',
      'Admin panel to add and edit listings',
    ],
    icon: (
      <svg {...iconProps}>
        <path d="M3 21h18M5 21V8l7-5 7 5v13" />
        <path d="M10 21v-6h4v6M9 10h.01M15 10h.01" />
      </svg>
    ),
  },
  'custom-calculators-automation': {
    tag: 'Tools & automation',
    delivery: '1–2 weeks',
    tone: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400',
    includes: [
      'Live price quote calculators',
      'Branded PDF quotes and proposals',
      'PKR and USD pricing support',
      'Leads sent to WhatsApp and email',
    ],
    icon: (
      <svg {...iconProps}>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M8.5 7.5h7M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16h.01M12 16h.01M15.5 16h.01" />
      </svg>
    ),
  },
  'ui-ux-design-website-redesign': {
    tag: 'Design & redesign',
    delivery: '1–2 weeks',
    tone: 'border-rose-500/30 bg-rose-500/10 text-rose-400',
    includes: [
      'Modern, clean layouts for your brand',
      'Easy navigation on mobile and laptop',
      'Clear call-to-action buttons',
      'Faster pages than your current site',
    ],
    icon: (
      <svg {...iconProps}>
        <path d="M4 20l4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20z" />
        <path d="M14 7.5l3 3" />
      </svg>
    ),
  },
};

const FALLBACK_EXTRAS: ServiceExtras = {
  tag: 'Service',
  delivery: 'On request',
  tone: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
  includes: [],
  icon: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="8" />
    </svg>
  ),
};

function CheckIcon() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export function Services() {
  const phone = (siteSettings?.whatsapp || seoData.site.whatsapp).replace(/\D/g, '');
  const waLink = (text: string) => `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

  return (
    <section
      id="services"
      itemScope
      itemType="https://schema.org/ItemList"
      aria-label="DEVSOLE Soft Web Development, SEO and Software Services"
      className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28"
    >
      <SectionHeading
        eyebrow="What We Do · Core Services"
        title="Everything Your Business Needs to Grow Online"
        description="From fast websites and Google SEO to online stores and custom business software. Pick a service to see what is included, how long it takes, and how we work."
      />

      <ul className="mt-10 sm:mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {seoData.services.map((service, index) => {
          const extra = EXTRAS[service.slug] ?? FALLBACK_EXTRAS;

          return (
            <li
              key={service.slug}
              itemScope
              itemType="https://schema.org/Service"
              itemProp="itemListElement"
              className="group flex flex-col rounded-2xl border border-white/10 bg-[#0c101d] p-5 sm:p-6 transition-colors duration-200 hover:border-blue-500/40"
            >
              <meta itemProp="provider" content="DEVSOLE Soft" />
              <meta itemProp="serviceType" content={service.name} />

              <div className="flex items-start justify-between gap-3">
                <span className={`flex h-12 w-12 items-center justify-center rounded-xl border ${extra.tone}`}>
                  {extra.icon}
                </span>
                <span className="font-mono text-xs font-semibold text-slate-500" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <p className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                {extra.tag}
              </p>
              <h3 itemProp="name" className="mt-1.5 font-display text-xl font-bold leading-snug text-white">
                {service.name}
              </h3>
              <p itemProp="description" className="mt-2.5 text-sm leading-relaxed text-slate-400">
                {service.short}
              </p>

              <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5 text-sm text-slate-300">
                {extra.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6">
                <p className="text-xs text-slate-400">
                  Typical delivery: <strong className="font-semibold text-slate-200">{extra.delivery}</strong>
                </p>

                <div className="mt-4 flex flex-col gap-2.5 min-[420px]:flex-row sm:flex-col xl:flex-row">
                  <Link
                    to={`/services/${service.slug}`}
                    itemProp="url"
                    onClick={() => soundFX.playClick()}
                    aria-label={`View details: ${service.name}`}
                    className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
                  >
                    <span>View details</span>
                    <ArrowIcon />
                  </Link>
                  <a
                    href={waLink(service.whatsappText)}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => soundFX.playClick()}
                    aria-label={`Ask about ${service.name} on WhatsApp`}
                    className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 text-sm font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/20"
                  >
                    <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Direct consultation banner */}
      <div className="mt-10 sm:mt-12 rounded-2xl border border-white/10 bg-[#0c101d] p-6 sm:p-8">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
              Not sure which service fits your project?
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-400">
              Message founder Aoun Abbas directly on WhatsApp. Tell us what you need and we will suggest the
              right plan and a fixed price.
            </p>
          </div>

          <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row lg:shrink-0">
            <a
              href={waLink('Hi Aoun Abbas! I want to discuss a project with DEVSOLE Soft.')}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFX.playClick()}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
            >
              <span>Ask on WhatsApp</span>
              <ArrowIcon />
            </a>
            <Link
              to="/estimator"
              onClick={() => soundFX.playClick()}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-5 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/[0.08]"
            >
              Calculate budget
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
