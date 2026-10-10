import { SectionHeading } from '@/components/ui/SectionHeading';
import { services, siteSettings } from '@/data/siteData';

const SERVICE_WALLPAPERS = {
  proptech: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  saas: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  ecommerce: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
  fullstack: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
};

const FALLBACK_SERVICES = [
  {
    id: '1',
    title: 'Custom Full-Stack Web Apps',
    description: 'Bespoke web applications built on modern JavaScript, clean server-side endpoints, and relational MySQL architecture designed for long-term scalability.',
    features: ['Modular Component Architecture', 'Relational MySQL Optimization', 'Custom Client & Admin Portals', 'Responsive Cross-Device Layouts']
  },
  {
    id: '2',
    title: 'PropTech & Real Estate Solutions',
    description: 'High-converting real estate portals with instant multi-parameter filtering, interactive property showcases, and direct agent WhatsApp routing.',
    features: ['Sub-Second Property Search & Filters', 'Interactive Media & Floorplan Cards', 'Direct WhatsApp Agent Routing', 'Automated Lead Capture Pipeline']
  },
  {
    id: '3',
    title: 'SaaS Tools & Cost Calculators',
    description: 'Interactive real-time estimation engines, dynamic quotation builders, and automated PDF export systems that pre-qualify prospective clients.',
    features: ['Real-Time Mathematical Logic', 'Instant Automated PDF Export', 'Multi-Currency (PKR & USD) Support', 'Direct Sales Webhook Integrations']
  },
  {
    id: '4',
    title: 'E-Commerce & Dynamic Portals',
    description: 'Lightweight, conversion-optimized online commerce platforms featuring slide-out cart drawers, dynamic inventory filtering, and secure payment flows.',
    features: ['Instant Dynamic Cart Drawer', 'Relational Inventory Filtering', 'Custom Promo & Discount Engine', 'Verified Payment Gateway Flow']
  }
];

export function Services() {
  const currentServices = services && services.length > 0 ? services : FALLBACK_SERVICES;
  const phone = (siteSettings?.whatsapp || '+923706492398').replace(/\D/g, '');

  const fullstackService = currentServices.find((s) => s.id === '1') || currentServices[0];
  const proptechService = currentServices.find((s) => s.id === '2') || currentServices[1];
  const saasService = currentServices.find((s) => s.id === '3') || currentServices[2];
  const ecommerceService = currentServices.find((s) => s.id === '4') || currentServices[3];

  return (
    <section
      id="services"
      itemScope
      itemType="https://schema.org/ItemList"
      aria-label="DEVSOLE Soft Capabilities & Engineering Services"
      className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28 overflow-hidden bg-transparent"
    >
      {/* Subtle Studio Grid Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <SectionHeading
        eyebrow="Specialized Capabilities"
        title="Engineering Services Built for Revenue & Scale"
        description="Every platform is engineered with clean modular architecture, sub-second latency, and conversion-focused performance."
      />

      {/* Asymmetric Bento Matrix */}
      <div className="mt-12 sm:mt-14 grid gap-6 lg:grid-cols-12">
        {/* ================= BENTO 1: PropTech & Real Estate (7-Cols) ================= */}
        <article
          itemScope
          itemType="https://schema.org/Service"
          itemProp="itemListElement"
          className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c101d] p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:border-blue-500/40 hover:shadow-[0_8px_35px_rgba(0,0,0,0.7)] transition-all duration-300 lg:col-span-7 overflow-hidden"
        >
          <meta itemProp="provider" content="DEVSOLE Soft" />
          <meta itemProp="serviceType" content={proptechService.title} />

          {/* Subtle Circuit Blueprint Grid Watermark */}
          <div className="bg-grid absolute inset-0 opacity-15 pointer-events-none rounded-2xl" />

          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] font-semibold text-slate-300 uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
                Flagship Specialization
              </span>
              <span className="rounded-md border border-white/10 bg-white/[0.02] px-2.5 py-0.5 font-mono text-[10px] font-semibold text-slate-400">
                Sub-15ms SQL Queries
              </span>
            </div>

            <h3
              itemProp="name"
              className="mt-4 font-display text-xl sm:text-2xl font-bold text-white tracking-tight"
            >
              {proptechService.title}
            </h3>

            <p
              itemProp="description"
              className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-400 font-normal"
            >
              {proptechService.description}
            </p>

            {/* macOS Browser Frame */}
            <div className="mt-5 relative aspect-[16/8] w-full overflow-hidden rounded-xl border border-white/10 bg-[#080c18] shadow-2xl">
              {/* Domain Ambient Aura Backlight */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-transparent blur-xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10 flex items-center justify-between bg-[#06080f] border-b border-white/10 px-3 py-1.5 backdrop-blur-md">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-[#ff5f56]" />
                  <div className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
                  <div className="h-2 w-2 rounded-full bg-[#27c93f]" />
                </div>
                <span className="font-mono text-[9px] text-slate-400">devsolesoft.com/proptech/real-space</span>
                <span className="text-[9px] font-mono text-emerald-400 font-semibold">&lt; 0.7s TTFB</span>
              </div>

              <div className="relative h-full w-full overflow-hidden">
                <img
                  src={SERVICE_WALLPAPERS.proptech}
                  alt="PropTech and Real Estate Platform Architecture"
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-102"
                />

                {/* Studio Display Glass Reflection */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-35 mix-blend-screen"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 30%, transparent 60%)'
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs font-mono">
                  <span className="bg-black/80 px-2.5 py-1 rounded-md backdrop-blur-md border border-white/15 text-[11px] font-medium">
                    Live Property Search Engine
                  </span>
                  <span className="bg-emerald-600 px-2 py-0.5 rounded text-[10px] font-semibold shadow-xs">
                    Verified Funnel
                  </span>
                </div>
              </div>
            </div>

            {/* Features Checklist */}
            <ul className="mt-6 grid sm:grid-cols-2 gap-2.5 border-t border-white/10 pt-4">
              {proptechService.features.map((feat) => (
                <li key={feat} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <svg className="h-3.5 w-3.5 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10 mt-6 border-t border-white/10 pt-4">
            <a
              href={`https://wa.me/${phone}?text=Hi%20DEVSOLE%20Soft!%20I%20want%20to%20engineer%20a%20PropTech%20or%20Real%20Estate%20Portal.`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>Discuss PropTech Architecture with Us</span>
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </article>

        {/* ================= BENTO 2: SaaS Tools & Estimators (5-Cols) ================= */}
        <article
          itemScope
          itemType="https://schema.org/Service"
          itemProp="itemListElement"
          className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c101d] p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:border-blue-500/40 hover:shadow-[0_8px_35px_rgba(0,0,0,0.7)] transition-all duration-300 lg:col-span-5 overflow-hidden"
        >
          <meta itemProp="provider" content="DEVSOLE Soft" />
          <meta itemProp="serviceType" content={saasService.title} />

          <div className="bg-grid absolute inset-0 opacity-15 pointer-events-none rounded-2xl" />

          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] font-semibold text-slate-300 uppercase">
                Conversion Engine
              </span>
              <span className="rounded-md border border-white/10 bg-white/[0.02] px-2.5 py-0.5 font-mono text-[10px] font-semibold text-slate-400">
                PDF Automation
              </span>
            </div>

            <h3
              itemProp="name"
              className="mt-4 font-display text-lg sm:text-xl font-bold text-white tracking-tight"
            >
              {saasService.title}
            </h3>

            <p
              itemProp="description"
              className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-400 font-normal"
            >
              {saasService.description}
            </p>

            {/* macOS Browser Frame */}
            <div className="mt-5 relative aspect-[16/8] w-full overflow-hidden rounded-xl border border-white/10 bg-[#080c18] shadow-2xl">
              {/* Domain Ambient Aura Backlight */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-transparent blur-xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10 flex items-center justify-between bg-[#06080f] border-b border-white/10 px-3 py-1.5 backdrop-blur-md">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-[#ff5f56]" />
                  <div className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
                  <div className="h-2 w-2 rounded-full bg-[#27c93f]" />
                </div>
                <span className="font-mono text-[9px] text-slate-400">devsolesoft.com/saas/calculator</span>
                <span className="text-[9px] font-mono text-slate-300 font-semibold">Reactive Math</span>
              </div>

              <div className="relative h-full w-full overflow-hidden">
                <img
                  src={SERVICE_WALLPAPERS.saas}
                  alt="SaaS Tools and Cost Estimators Engine"
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-102"
                />

                <div 
                  className="absolute inset-0 pointer-events-none opacity-35 mix-blend-screen"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 30%, transparent 60%)'
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-3 text-white text-xs font-mono">
                  <span className="bg-black/80 px-2.5 py-1 rounded-md backdrop-blur-md border border-white/15 text-[11px] font-medium">
                    Dynamic Real-Time Math Pipeline
                  </span>
                </div>
              </div>
            </div>

            <ul className="mt-5 space-y-2 border-t border-white/10 pt-4">
              {saasService.features.map((feat) => (
                <li key={feat} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <svg className="h-3.5 w-3.5 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10 mt-6 border-t border-white/10 pt-4">
            <a
              href={`https://wa.me/${phone}?text=Hi%20DEVSOLE%20Soft!%20I%20am%20interested%20in%20a%20custom%20SaaS%20calculator%20or%20pricing%20tool.`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>Build an Interactive SaaS Tool</span>
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </article>

        {/* ================= BENTO 3: E-Commerce Platforms (5-Cols) ================= */}
        <article
          itemScope
          itemType="https://schema.org/Service"
          itemProp="itemListElement"
          className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c101d] p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:border-blue-500/40 hover:shadow-[0_8px_35px_rgba(0,0,0,0.7)] transition-all duration-300 lg:col-span-5 overflow-hidden"
        >
          <meta itemProp="provider" content="DEVSOLE Soft" />
          <meta itemProp="serviceType" content={ecommerceService.title} />

          <div className="bg-grid absolute inset-0 opacity-15 pointer-events-none rounded-2xl" />

          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] font-semibold text-slate-300 uppercase">
                Digital Commerce
              </span>
              <span className="rounded-md border border-white/10 bg-white/[0.02] px-2.5 py-0.5 font-mono text-[10px] font-semibold text-slate-400">
                Slide-Out Drawer
              </span>
            </div>

            <h3
              itemProp="name"
              className="mt-4 font-display text-lg sm:text-xl font-bold text-white tracking-tight"
            >
              {ecommerceService.title}
            </h3>

            <p
              itemProp="description"
              className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-400 font-normal"
            >
              {ecommerceService.description}
            </p>

            {/* macOS Browser Frame */}
            <div className="mt-5 relative aspect-[16/8] w-full overflow-hidden rounded-xl border border-white/10 bg-[#080c18] shadow-2xl">
              {/* Domain Ambient Aura Backlight */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-transparent blur-xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10 flex items-center justify-between bg-[#06080f] border-b border-white/10 px-3 py-1.5 backdrop-blur-md">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-[#ff5f56]" />
                  <div className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
                  <div className="h-2 w-2 rounded-full bg-[#27c93f]" />
                </div>
                <span className="font-mono text-[9px] text-slate-400">devsolesoft.com/shop/nexus</span>
                <span className="text-[9px] font-mono text-slate-300 font-semibold">1-Click Cart</span>
              </div>

              <div className="relative h-full w-full overflow-hidden">
                <img
                  src={SERVICE_WALLPAPERS.ecommerce}
                  alt="E-Commerce Dynamic Marketplace Architecture"
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-102"
                />

                <div 
                  className="absolute inset-0 pointer-events-none opacity-35 mix-blend-screen"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 30%, transparent 60%)'
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-3 text-white text-xs font-mono">
                  <span className="bg-black/80 px-2.5 py-1 rounded-md backdrop-blur-md border border-white/15 text-[11px] font-medium">
                    Frictionless Checkout Flow
                  </span>
                </div>
              </div>
            </div>

            <ul className="mt-5 space-y-2 border-t border-white/10 pt-4">
              {ecommerceService.features.map((feat) => (
                <li key={feat} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <svg className="h-3.5 w-3.5 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10 mt-6 border-t border-white/10 pt-4">
            <a
              href={`https://wa.me/${phone}?text=Hi%20DEVSOLE%20Soft!%20I%20am%20interested%20in%20an%20E-Commerce%20marketplace%20build.`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>Build an E-Commerce Engine</span>
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </article>

        {/* ================= BENTO 4: Custom Full-Stack Web Apps (7-Cols) ================= */}
        <article
          itemScope
          itemType="https://schema.org/Service"
          itemProp="itemListElement"
          className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c101d] p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:border-blue-500/40 hover:shadow-[0_8px_35px_rgba(0,0,0,0.7)] transition-all duration-300 lg:col-span-7 overflow-hidden"
        >
          <meta itemProp="provider" content="DEVSOLE Soft" />
          <meta itemProp="serviceType" content={fullstackService.title} />

          <div className="bg-grid absolute inset-0 opacity-15 pointer-events-none rounded-2xl" />

          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] font-semibold text-slate-300 uppercase">
                Core Systems Engineering
              </span>
              <span className="rounded-md border border-white/10 bg-white/[0.02] px-2.5 py-0.5 font-mono text-[10px] font-semibold text-slate-400">
                100% IP Handover
              </span>
            </div>

            <h3
              itemProp="name"
              className="mt-4 font-display text-xl sm:text-2xl font-bold text-white tracking-tight"
            >
              {fullstackService.title}
            </h3>

            <p
              itemProp="description"
              className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-400 font-normal"
            >
              {fullstackService.description}
            </p>

            {/* macOS Browser Frame */}
            <div className="mt-5 relative aspect-[16/8] w-full overflow-hidden rounded-xl border border-white/10 bg-[#080c18] shadow-2xl">
              {/* Domain Ambient Aura Backlight */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-blue-600/10 to-transparent blur-xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10 flex items-center justify-between bg-[#06080f] border-b border-white/10 px-3 py-1.5 backdrop-blur-md">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-[#ff5f56]" />
                  <div className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
                  <div className="h-2 w-2 rounded-full bg-[#27c93f]" />
                </div>
                <span className="font-mono text-[9px] text-slate-400">devsolesoft.com/apps/custom-core</span>
                <span className="text-[9px] font-mono text-slate-300 font-semibold">&lt; 15ms Relational SQL</span>
              </div>

              <div className="relative h-full w-full overflow-hidden">
                <img
                  src={SERVICE_WALLPAPERS.fullstack}
                  alt="Custom Full-Stack Web Application Infrastructure"
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-102"
                />

                <div 
                  className="absolute inset-0 pointer-events-none opacity-35 mix-blend-screen"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 30%, transparent 60%)'
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-3 text-white text-xs font-mono">
                  <span className="bg-black/80 px-2.5 py-1 rounded-md backdrop-blur-md border border-white/15 text-[11px] font-medium">
                    PHP 8.2 + Relational MySQL Infrastructure
                  </span>
                </div>
              </div>
            </div>

            {/* Features Checklist */}
            <ul className="mt-6 grid sm:grid-cols-2 gap-2.5 border-t border-white/10 pt-4">
              {fullstackService.features.map((feat) => (
                <li key={feat} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <svg className="h-3.5 w-3.5 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10 mt-6 border-t border-white/10 pt-4">
            <a
              href={`https://wa.me/${phone}?text=Hi%20DEVSOLE%20Soft!%20I%20want%20to%20build%20a%20custom%20full-stack%20web%20application.`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>Engineer a Custom Web Application</span>
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </article>
      </div>

      {/* ================= BOTTOM STUDIO CONSULTATION BANNER ================= */}
      <div className="relative mt-12 rounded-2xl border border-white/10 bg-[#0c101d] p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Integrated Grid Watermark & Ambient Aura Glow */}
        <div className="bg-grid absolute inset-0 opacity-20 pointer-events-none rounded-2xl" />
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-blue-400 block">
              Bespoke Architecture Consultation
            </span>
            <h4 className="mt-1 font-display text-lg sm:text-xl font-bold text-white">
              Have a custom platform requirement not listed above?
            </h4>
            <p className="mt-1 text-xs text-slate-400 font-normal max-w-xl">
              We design and engineer bespoke relational database schemas, automated PDF pipelines, and custom payment webhooks for specialized business models.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${phone}?text=Hi%20DEVSOLE%20Soft!%20I%20have%20a%20unique%20project%20requirement%20I%20would%20like%20to%20discuss.`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 text-xs font-semibold shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-colors"
            >
              <span>Discuss Custom Scope</span>
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a
              href="#estimator"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] px-4 py-3 text-xs font-semibold text-slate-200 transition-colors shadow-2xs"
            >
              <span>Instant Cost Calculator</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;