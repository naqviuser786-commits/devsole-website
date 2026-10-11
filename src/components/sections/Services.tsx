// FILE: src/components/sections/Services.tsx
import { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { siteSettings } from '@/data/siteData';
import { soundFX } from '@/lib/soundFx';

type PropertyType = 'all' | 'villas' | 'commercial' | 'apartments';

export function Services() {
  const phone = (siteSettings?.whatsapp || '+923706492398').replace(/\D/g, '');

  // 1. Interactive Property Filter Simulation State
  const [selectedProperty, setSelectedProperty] = useState<PropertyType>('villas');

  // 2. Interactive Calculator Simulation State
  const [calcTier, setCalcTier] = useState<number>(3);

  // 3. Interactive E-Commerce Cart Simulation State (Now actively used with +/- buttons)
  const [cartItemsCount, setCartItemsCount] = useState<number>(2);

  const handlePropertyFilter = (type: PropertyType) => {
    soundFX.playClick();
    setSelectedProperty(type);
  };

  return (
    <section
      id="services"
      itemScope
      itemType="https://schema.org/ItemList"
      aria-label="DEVSOLE Soft Web Development, SEO and Software Services"
      className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28 overflow-hidden bg-transparent"
    >
      {/* Subtle Studio Grid Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <div data-gsap="mask-up">
        <SectionHeading
          eyebrow="What We Do · Core Services"
          title="Everything Your Business Needs to Grow Online"
          description="From fast modern websites and Google SEO ranking to online stores and custom business software — we build reliable digital solutions that bring you real paying clients."
        />
      </div>

      {/* Asymmetric Studio Bento Matrix (Visual Rhythm without Card Fatigue) */}
      <div data-gsap="stagger-group" className="mt-12 sm:mt-14 grid gap-6 lg:grid-cols-12">
        
        {/* ================= 1. WEB DEVELOPMENT (7-COLS) ================= */}
        <article
          itemScope
          itemType="https://schema.org/Service"
          itemProp="itemListElement"
          className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c101d] p-5 sm:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:border-blue-500/40 hover:shadow-[0_8px_35px_rgba(0,0,0,0.7)] transition-all duration-300 lg:col-span-7 overflow-hidden"
        >
          <meta itemProp="provider" content="DEVSOLE Soft" />
          <meta itemProp="serviceType" content="Custom Web Development" />

          <div className="bg-grid absolute inset-0 opacity-15 pointer-events-none rounded-2xl" />

          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 font-mono text-[10px] font-semibold text-blue-400 uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_#3b82f6]" />
                Web Development
              </span>
              <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded font-semibold">
                Speed: &lt; 0.8s Global Load
              </span>
            </div>

            <h3
              itemProp="name"
              className="mt-4 font-display text-xl sm:text-2xl font-bold text-white tracking-tight"
            >
              Custom Web Development & Modern Web Apps
            </h3>

            <p
              itemProp="description"
              className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-400 font-normal"
            >
              Custom-built websites and business applications that look high-end, load in under 1 second, and work smoothly on all mobile phones, tablets, and laptops. Zero slow templates.
            </p>

            {/* Bespoke Visual: Live Page Load Speed Gauge Comparison */}
            <div className="mt-5 rounded-xl border border-white/10 bg-[#06080f] p-4 shadow-inner">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5 text-[11px] font-mono">
                <span className="text-slate-300 font-semibold">PAGE SPEED BENCHMARK (MOBILE 4G)</span>
                <span className="text-emerald-400 font-bold">100% Core Web Vitals Pass</span>
              </div>

              <div className="mt-3.5 space-y-3 font-mono text-xs">
                <div>
                  <div className="flex justify-between text-[11px] text-slate-300">
                    <span>DEVSOLE Custom Code:</span>
                    <strong className="text-emerald-400 font-bold">0.6 Seconds (Instant Load)</strong>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-[96%] rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Slow WordPress / Wix Themes:</span>
                    <strong className="text-rose-400 font-medium">3.8 Seconds (High Bounce Rate)</strong>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-[28%] rounded-full bg-rose-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Deliverables List */}
            <ul className="mt-5 grid sm:grid-cols-2 gap-2 border-t border-white/10 pt-4 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <svg className="h-3.5 w-3.5 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Mobile-First & 100% Responsive</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-3.5 w-3.5 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Fast Forms with WhatsApp Alerts</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-3.5 w-3.5 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Clean Code & 100% Client Ownership</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-3.5 w-3.5 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Free 30-Day Post-Launch Support</span>
              </li>
            </ul>
          </div>

          <div className="relative z-10 mt-6 border-t border-white/10 pt-4 flex items-center justify-between">
            <span className="font-mono text-xs text-slate-400">Delivery Pace: 2-3 Weeks</span>
            <a
              href={`https://wa.me/${phone}?text=Hi%20DEVSOLE%20Soft!%20I%20am%20interested%20in%20Web%20Development%20for%20my%20business.`}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFX.playClick()}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>Build a Custom Website</span>
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </article>

        {/* ================= 2. SEO & GOOGLE RANKING (5-COLS) ================= */}
        <article
          itemScope
          itemType="https://schema.org/Service"
          itemProp="itemListElement"
          className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c101d] p-5 sm:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:border-blue-500/40 hover:shadow-[0_8px_35px_rgba(0,0,0,0.7)] transition-all duration-300 lg:col-span-5 overflow-hidden"
        >
          <meta itemProp="provider" content="DEVSOLE Soft" />
          <meta itemProp="serviceType" content="Search Engine Optimization (SEO)" />

          <div className="bg-grid absolute inset-0 opacity-15 pointer-events-none rounded-2xl" />

          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[10px] font-semibold text-emerald-400 uppercase">
                Organic Traffic · SEO
              </span>
              <span className="font-mono text-[10px] text-slate-400 bg-white/[0.03] border border-white/10 px-2 py-0.5 rounded">
                Google #1 Rank Focus
              </span>
            </div>

            <h3
              itemProp="name"
              className="mt-4 font-display text-lg sm:text-xl font-bold text-white tracking-tight"
            >
              SEO & Google Search Ranking
            </h3>

            <p
              itemProp="description"
              className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-400 font-normal"
            >
              Get your business found on Google when customers search for your services. We optimize your website code, speed, and local keywords to generate organic inbound leads.
            </p>

            {/* Bespoke Visual: Realistic Google Search Result Card Mockup */}
            <div className="mt-5 rounded-xl border border-white/10 bg-[#06080f] p-3.5 sm:p-4 shadow-inner space-y-2">
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-[10px]">
                  G
                </span>
                <span className="truncate text-slate-300 font-mono text-[10px]">
                  https://yourcompany.com &gt; services
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-blue-400 hover:underline cursor-pointer leading-tight">
                Your Company — Top Rated Services in Lahore & Global
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                ★ 5.0 Rating · Verified local business · Fast response · Get an instant quotation directly via WhatsApp or online.
              </p>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-emerald-400">
                <span>INDEX_STATUS: RANK_#1</span>
                <span>ORGANIC CLICKS: +340%</span>
              </div>
            </div>

            <ul className="mt-5 space-y-1.5 text-xs text-slate-300 border-t border-white/10 pt-4">
              <li className="flex items-center gap-2">
                <svg className="h-3.5 w-3.5 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>On-Page SEO & Keyword Tagging</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-3.5 w-3.5 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Google Search Console & Sitemap Setup</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-3.5 w-3.5 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Google Maps & Local Business Profile</span>
              </li>
            </ul>
          </div>

          <div className="relative z-10 mt-6 border-t border-white/10 pt-4 flex items-center justify-between">
            <span className="font-mono text-xs text-slate-400">Ranking: Ongoing Boost</span>
            <a
              href={`https://wa.me/${phone}?text=Hi%20DEVSOLE%20Soft!%20I%20want%20to%20rank%20my%20website%20on%20Google%20with%20SEO.`}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFX.playClick()}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>Rank Higher on Google</span>
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </article>

        {/* ================= 3. E-COMMERCE & ONLINE STORES (5-COLS) ================= */}
        <article
          itemScope
          itemType="https://schema.org/Service"
          itemProp="itemListElement"
          className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c101d] p-5 sm:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:border-blue-500/40 hover:shadow-[0_8px_35px_rgba(0,0,0,0.7)] transition-all duration-300 lg:col-span-5 overflow-hidden"
        >
          <meta itemProp="provider" content="DEVSOLE Soft" />
          <meta itemProp="serviceType" content="E-Commerce & Online Stores" />

          <div className="bg-grid absolute inset-0 opacity-15 pointer-events-none rounded-2xl" />

          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 font-mono text-[10px] font-semibold text-purple-400 uppercase">
                Online Sales · E-Commerce
              </span>
              <span className="font-mono text-[10px] text-slate-400 bg-white/[0.03] border border-white/10 px-2 py-0.5 rounded">
                Quick Slide Cart
              </span>
            </div>

            <h3
              itemProp="name"
              className="mt-4 font-display text-lg sm:text-xl font-bold text-white tracking-tight"
            >
              E-Commerce Stores & Fast Online Sales
            </h3>

            <p
              itemProp="description"
              className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-400 font-normal"
            >
              Clean, fast online shopping stores with slide-out cart drawers, discount coupons, credit card/debit card gateways, Cash on Delivery, and instant WhatsApp order alerts.
            </p>

            {/* Bespoke Visual: Interactive Cart & Checkout Telemetry (With Active +/- buttons) */}
            <div className="mt-5 rounded-xl border border-white/10 bg-[#06080f] p-3.5 sm:p-4 shadow-inner space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-slate-300 font-semibold text-[11px]">SHOPPING CART DRAWER</span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      soundFX.playClick();
                      setCartItemsCount((prev) => Math.max(1, prev - 1));
                    }}
                    className="h-5 w-5 rounded bg-white/10 text-white flex items-center justify-center font-bold hover:bg-white/20 transition-colors text-[10px]"
                    title="Remove Item"
                  >
                    -
                  </button>
                  <span className="text-purple-400 font-bold px-1">{cartItemsCount} Items in Cart</span>
                  <button
                    type="button"
                    onClick={() => {
                      soundFX.playClick();
                      setCartItemsCount((prev) => Math.min(10, prev + 1));
                    }}
                    className="h-5 w-5 rounded bg-white/10 text-white flex items-center justify-center font-bold hover:bg-white/20 transition-colors text-[10px]"
                    title="Add Item"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Payment Gateway:</span>
                <span className="text-white font-semibold">Card, Bank Transfer & COD</span>
              </div>

              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Order Alerts:</span>
                <span className="text-emerald-400 font-bold">Direct WhatsApp Notification</span>
              </div>

              <div className="rounded-lg border border-white/5 bg-[#0a0e17] p-2 flex items-center justify-between text-[10px] text-slate-400">
                <span>Checkout Speed:</span>
                <span className="text-emerald-400 font-bold">1-Click Fast Checkout</span>
              </div>
            </div>

            <ul className="mt-5 space-y-1.5 text-xs text-slate-300 border-t border-white/10 pt-4">
              <li className="flex items-center gap-2">
                <svg className="h-3.5 w-3.5 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Instant Slide-Out Shopping Cart Drawer</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-3.5 w-3.5 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Stripe, Credit Cards & COD Support</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-3.5 w-3.5 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Easy Admin Panel to Add Products & Prices</span>
              </li>
            </ul>
          </div>

          <div className="relative z-10 mt-6 border-t border-white/10 pt-4 flex items-center justify-between">
            <span className="font-mono text-xs text-slate-400">Delivery: 2-3 Weeks</span>
            <a
              href={`https://wa.me/${phone}?text=Hi%20DEVSOLE%20Soft!%20I%20want%20to%20build%20an%20E-Commerce%20online%20store.`}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFX.playClick()}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>Start an Online Store</span>
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </article>

        {/* ================= 4. REAL ESTATE & BUSINESS PORTALS (7-COLS) ================= */}
        <article
          itemScope
          itemType="https://schema.org/Service"
          itemProp="itemListElement"
          className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c101d] p-5 sm:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:border-blue-500/40 hover:shadow-[0_8px_35px_rgba(0,0,0,0.7)] transition-all duration-300 lg:col-span-7 overflow-hidden"
        >
          <meta itemProp="provider" content="DEVSOLE Soft" />
          <meta itemProp="serviceType" content="Real Estate & Custom Business Portals" />

          <div className="bg-grid absolute inset-0 opacity-15 pointer-events-none rounded-2xl" />

          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[10px] font-semibold text-emerald-400 uppercase">
                Specialized Solutions · Portals
              </span>
              <span className="font-mono text-[10px] text-slate-400 bg-white/[0.03] border border-white/10 px-2.5 py-0.5 rounded">
                Property & Lead Filters
              </span>
            </div>

            <h3
              itemProp="name"
              className="mt-4 font-display text-xl sm:text-2xl font-bold text-white tracking-tight"
            >
              Real Estate & Custom Business Portals
            </h3>

            <p
              itemProp="description"
              className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-400 font-normal"
            >
              High-converting real estate portals, customer management dashboards, and booking platforms with instant location filters, photo galleries, and direct agent WhatsApp contact buttons.
            </p>

            {/* Bespoke Visual: Interactive Property Filter & WhatsApp Lead Flow */}
            <div className="mt-5 rounded-xl border border-white/10 bg-[#06080f] p-3.5 sm:p-4 shadow-inner">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5 text-[11px] font-mono">
                <span className="text-slate-300 font-semibold">LIVE PROPERTY FILTER SIMULATOR</span>
                <span className="text-emerald-400 font-bold">Results in 0.2s</span>
              </div>

              {/* Filter Buttons */}
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                {(['all', 'villas', 'commercial', 'apartments'] as PropertyType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handlePropertyFilter(type)}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-mono capitalize transition-all ${
                      selectedProperty === type
                        ? 'bg-blue-600/20 text-white border border-blue-500/40 font-bold shadow-2xs'
                        : 'border border-white/10 text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Live Preview Card */}
              <div className="mt-3 rounded-lg border border-white/5 bg-[#0a0e17] p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-blue-400 font-mono uppercase block">Active Search:</span>
                  <strong className="text-white font-display text-sm">
                    {selectedProperty === 'villas'
                      ? '5 Marla & 1 Kanal Luxury Villas'
                      : selectedProperty === 'commercial'
                      ? 'Prime Commercial Plazas & Shops'
                      : selectedProperty === 'apartments'
                      ? 'Modern City Center Apartments'
                      : 'All Active Real Estate Listings'}
                  </strong>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1 font-semibold text-[11px] flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
                    Direct WhatsApp Button
                  </span>
                </div>
              </div>
            </div>

            <ul className="mt-5 grid sm:grid-cols-2 gap-2 border-t border-white/10 pt-4 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <svg className="h-3.5 w-3.5 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Instant Property Search by City & Price</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-3.5 w-3.5 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Direct Agent WhatsApp Contact Buttons</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-3.5 w-3.5 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Admin Panel to Add & Edit Listings Easily</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-3.5 w-3.5 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>High-Resolution Photo & Map Galleries</span>
              </li>
            </ul>
          </div>

          <div className="relative z-10 mt-6 border-t border-white/10 pt-4 flex items-center justify-between">
            <span className="font-mono text-xs text-slate-400">Delivery: 2-3 Weeks</span>
            <a
              href={`https://wa.me/${phone}?text=Hi%20DEVSOLE%20Soft!%20I%20want%20to%20build%20a%20Real%20Estate%20Portal%20or%20Business%20Dashboard.`}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFX.playClick()}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>Build a Real Estate Portal</span>
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </article>

        {/* ================= 5. CUSTOM CALCULATORS & AUTOMATION (6-COLS) ================= */}
        <article
          itemScope
          itemType="https://schema.org/Service"
          itemProp="itemListElement"
          className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c101d] p-5 sm:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:border-blue-500/40 hover:shadow-[0_8px_35px_rgba(0,0,0,0.7)] transition-all duration-300 lg:col-span-6 overflow-hidden"
        >
          <meta itemProp="provider" content="DEVSOLE Soft" />
          <meta itemProp="serviceType" content="Interactive Calculators & Automation" />

          <div className="bg-grid absolute inset-0 opacity-15 pointer-events-none rounded-2xl" />

          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 font-mono text-[10px] font-semibold text-blue-400 uppercase">
                Tools & Automation
              </span>
              <span className="font-mono text-[10px] text-slate-400 bg-white/[0.03] border border-white/10 px-2 py-0.5 rounded">
                Instant PDF Export
              </span>
            </div>

            <h3
              itemProp="name"
              className="mt-4 font-display text-lg sm:text-xl font-bold text-white tracking-tight"
            >
              Custom Calculators & Business Tools
            </h3>

            <p
              itemProp="description"
              className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-400 font-normal"
            >
              Interactive price quote calculators, automated PDF proposal generators, and custom web tools that pre-qualify clients and save hours of manual sales work.
            </p>

            {/* Interactive Stepper */}
            <div className="mt-5 rounded-xl border border-white/10 bg-[#06080f] p-4 font-mono text-xs space-y-3 shadow-inner">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-[11px]">Selected Features Count:</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      soundFX.playClick();
                      setCalcTier((p) => Math.max(1, p - 1));
                    }}
                    className="h-6 w-6 rounded bg-white/10 text-white flex items-center justify-center font-bold hover:bg-white/20"
                  >
                    -
                  </button>
                  <span className="font-bold text-white w-4 text-center">{calcTier}</span>
                  <button
                    type="button"
                    onClick={() => {
                      soundFX.playClick();
                      setCalcTier((p) => Math.min(8, p + 1));
                    }}
                    className="h-6 w-6 rounded bg-white/10 text-white flex items-center justify-center font-bold hover:bg-white/20"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="rounded-lg border border-white/5 bg-[#0a0e17] p-2.5 flex items-center justify-between">
                <span className="text-slate-400 text-[10px]">Calculated Output:</span>
                <span className="text-emerald-400 font-bold text-sm">
                  PKR {(calcTier * 45000).toLocaleString()} / ${(calcTier * 160).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-white/5 pt-2">
                <span>PDF QUOTE EXPORT: READY</span>
                <span className="text-blue-400 font-semibold">1-Click Client Download</span>
              </div>
            </div>

            <ul className="mt-5 space-y-1.5 text-xs text-slate-300 border-t border-white/10 pt-4">
              <li className="flex items-center gap-2">
                <svg className="h-3.5 w-3.5 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Live Real-Time Price Quote Calculators</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-3.5 w-3.5 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Instant Downloadable Branded PDF Proposals</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-3.5 w-3.5 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Multi-Currency (PKR & USD) Support</span>
              </li>
            </ul>
          </div>

          <div className="relative z-10 mt-6 border-t border-white/10 pt-4 flex items-center justify-between">
            <span className="font-mono text-xs text-slate-400">Delivery: 1-2 Weeks</span>
            <a
              href={`https://wa.me/${phone}?text=Hi%20DEVSOLE%20Soft!%20I%20am%20interested%20in%20a%20Custom%20Price%20Calculator%20or%20PDF%20Tool.`}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFX.playClick()}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>Build a Custom Calculator</span>
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </article>

        {/* ================= 6. UI/UX DESIGN & WEBSITE REDESIGN (6-COLS) ================= */}
        <article
          itemScope
          itemType="https://schema.org/Service"
          itemProp="itemListElement"
          className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c101d] p-5 sm:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:border-blue-500/40 hover:shadow-[0_8px_35px_rgba(0,0,0,0.7)] transition-all duration-300 lg:col-span-6 overflow-hidden"
        >
          <meta itemProp="provider" content="DEVSOLE Soft" />
          <meta itemProp="serviceType" content="UI/UX Design & Website Redesign" />

          <div className="bg-grid absolute inset-0 opacity-15 pointer-events-none rounded-2xl" />

          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-[10px] font-semibold text-cyan-400 uppercase">
                Brand Identity · Modern Look
              </span>
              <span className="font-mono text-[10px] text-slate-400 bg-white/[0.03] border border-white/10 px-2 py-0.5 rounded">
                Mobile-First Design
              </span>
            </div>

            <h3
              itemProp="name"
              className="mt-4 font-display text-lg sm:text-xl font-bold text-white tracking-tight"
            >
              UI/UX Design & Website Modern Redesign
            </h3>

            <p
              itemProp="description"
              className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-400 font-normal"
            >
              Transform your outdated, slow website into a clean, modern, luxury digital presence that builds immediate credibility with high-value customers.
            </p>

            {/* Design Spec Highlights */}
            <div className="mt-5 rounded-xl border border-white/10 bg-[#06080f] p-4 font-mono text-xs space-y-2.5 shadow-inner">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-slate-300 font-semibold text-[11px]">DESIGN SYSTEM SPEC</span>
                <span className="text-cyan-400">Tailwind & CSS Tokens</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-300">
                <span>Color Palette:</span>
                <span className="text-white font-bold">Obsidian Graphite (#07090e)</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-300">
                <span>Mobile Usability:</span>
                <span className="text-emerald-400 font-bold">100% Touch-Friendly Targets</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-300">
                <span>Visual Clutter:</span>
                <span className="text-emerald-400 font-bold">Zero Broken Elements or Lag</span>
              </div>
            </div>

            <ul className="mt-5 space-y-1.5 text-xs text-slate-300 border-t border-white/10 pt-4">
              <li className="flex items-center gap-2">
                <svg className="h-3.5 w-3.5 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Clean Luxury Dark & Light Modern Layouts</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-3.5 w-3.5 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Intuitive Navigation for Mobile & Laptops</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-3.5 w-3.5 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Conversion-Focused Call-to-Action Buttons</span>
              </li>
            </ul>
          </div>

          <div className="relative z-10 mt-6 border-t border-white/10 pt-4 flex items-center justify-between">
            <span className="font-mono text-xs text-slate-400">Delivery: 1-2 Weeks</span>
            <a
              href={`https://wa.me/${phone}?text=Hi%20DEVSOLE%20Soft!%20I%20want%20to%20redesign%20my%20website%20with%20a%20modern%20UI/UX.`}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFX.playClick()}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>Redesign My Website</span>
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </article>

      </div>

      {/* Direct Founder Consultation Banner */}
      <div className="relative mt-12 rounded-2xl border border-white/10 bg-[#0c101d] p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.5)] overflow-hidden">
        <div className="bg-grid absolute inset-0 opacity-20 pointer-events-none rounded-2xl" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-blue-400 block">
              Direct Project Consultation
            </span>
            <h4 className="mt-1 font-display text-lg sm:text-xl font-bold text-white">
              Not sure which service fits your project?
            </h4>
            <p className="mt-1 text-xs text-slate-400 font-normal max-w-xl">
              Discuss your project directly with founder Aoun Abbas on WhatsApp. We evaluate your requirements and suggest the exact right plan within 15 minutes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${phone}?text=Hi%20Aoun%20Abbas!%20I%20want%20to%20discuss%20a%20project%20with%20DEVSOLE%20Soft.`}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFX.playClick()}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 text-xs font-semibold shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-colors"
            >
              <span>Ask Directly on WhatsApp</span>
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a
              href="#estimator"
              onClick={() => soundFX.playClick()}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] px-4 py-3 text-xs font-semibold text-slate-200 transition-colors shadow-2xs"
            >
              <span>Calculate Budget</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;