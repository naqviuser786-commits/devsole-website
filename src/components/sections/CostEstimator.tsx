import { useState, useMemo, useEffect, type ReactNode } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { siteSettings } from '@/data/siteData';
import { supabase } from '@/lib/supabase';

interface Option {
  id: string;
  name: string;
  icon?: string;
  priceUSD: number;
  pricePKR: number;
}

const DEFAULT_PROJECT_TYPES: Option[] = [
  { id: 'fullstack', name: 'Custom Web Application', priceUSD: 450, pricePKR: 125000 },
  { id: 'proptech', name: 'PropTech and Real Estate Portal', priceUSD: 650, pricePKR: 180000 },
  { id: 'saas', name: 'SaaS Tool and Automation', priceUSD: 750, pricePKR: 210000 },
  { id: 'ecommerce', name: 'E-Commerce Marketplace', priceUSD: 550, pricePKR: 150000 },
];

const DEFAULT_SCOPES: Option[] = [
  { id: 'mvp', name: 'Starter MVP (1-5 Views)', priceUSD: 0, pricePKR: 0 },
  { id: 'growth', name: 'Growth Platform (6-12 Views)', priceUSD: 150, pricePKR: 40000 },
  { id: 'enterprise', name: 'Enterprise Scale (13+ Views)', priceUSD: 350, pricePKR: 100000 },
];

const DEFAULT_ADDONS: Option[] = [
  { id: 'admin', name: 'Admin Panel Dashboard', priceUSD: 100, pricePKR: 30000 },
  { id: 'auth', name: 'Authentication and RBAC Roles', priceUSD: 75, pricePKR: 20000 },
  { id: 'payment', name: 'Payment Gateway Integration', priceUSD: 75, pricePKR: 20000 },
  { id: 'pdf', name: 'Automated PDF Quote Generator', priceUSD: 40, pricePKR: 12000 },
  { id: 'filters', name: 'Indexed Multi-Parameter Filters', priceUSD: 60, pricePKR: 15000 },
  { id: '3d', name: 'Interactive Performance UI Elements', priceUSD: 150, pricePKR: 40000 },
];

const DEFAULT_TIMELINES: Option[] = [
  { id: 'standard', name: 'Standard Delivery (3-4 Weeks)', priceUSD: 0, pricePKR: 0 },
  { id: 'express', name: 'Priority Sprint (1-2 Weeks)', priceUSD: 100, pricePKR: 30000 },
];

function getCategoryIcon(id: string): ReactNode {
  switch (id) {
    case 'fullstack':
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case 'proptech':
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      );
    case 'saas':
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="8" y1="6" x2="16" y2="6" />
          <line x1="16" y1="14" x2="16" y2="18" />
        </svg>
      );
    case 'ecommerce':
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
        </svg>
      );
    default:
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
}

export function CostEstimator() {
  const [currency, setCurrency] = useState<'USD' | 'PKR'>('USD');
  const [projectTypes, setProjectTypes] = useState<Option[]>(DEFAULT_PROJECT_TYPES);
  const [scopes, setScopes] = useState<Option[]>(DEFAULT_SCOPES);
  const [addons, setAddons] = useState<Option[]>(DEFAULT_ADDONS);
  const [timelines, setTimelines] = useState<Option[]>(DEFAULT_TIMELINES);

  const [selectedType, setSelectedType] = useState<Option>(DEFAULT_PROJECT_TYPES[0]);
  const [selectedScope, setSelectedScope] = useState<Option>(DEFAULT_SCOPES[0]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['admin', 'auth']);
  const [selectedTimeline, setSelectedTimeline] = useState<Option>(DEFAULT_TIMELINES[0]);

  // Fetch Live Pricing from Supabase CRM (Preserving CRM live sync)
  useEffect(() => {
    async function fetchPricing() {
      try {
        const { data, error } = await supabase
          .from('pricing_catalog')
          .select('*')
          .eq('id', 'default_pricing')
          .maybeSingle();

        if (!error && data) {
          if (data.project_types?.length) {
            setProjectTypes(data.project_types);
            setSelectedType(data.project_types[0]);
          }
          if (data.scopes?.length) {
            setScopes(data.scopes);
            setSelectedScope(data.scopes[0]);
          }
          if (data.addons?.length) {
            setAddons(data.addons);
          }
          if (data.timelines?.length) {
            setTimelines(data.timelines);
            setSelectedTimeline(data.timelines[0]);
          }
        }
      } catch {
        // Fallback to defaults
      }
    }

    fetchPricing();
  }, []);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const totals = useMemo(() => {
    const addonsUSD = selectedAddons.reduce((sum, id) => {
      const addon = addons.find((a) => a.id === id);
      return sum + (addon ? addon.priceUSD : 0);
    }, 0);

    const addonsPKR = selectedAddons.reduce((sum, id) => {
      const addon = addons.find((a) => a.id === id);
      return sum + (addon ? addon.pricePKR : 0);
    }, 0);

    const totalUSD =
      selectedType.priceUSD + selectedScope.priceUSD + addonsUSD + selectedTimeline.priceUSD;
    const totalPKR =
      selectedType.pricePKR + selectedScope.pricePKR + addonsPKR + selectedTimeline.pricePKR;

    return { totalUSD, totalPKR };
  }, [selectedType, selectedScope, selectedAddons, selectedTimeline, addons]);

  const generateWhatsAppLink = () => {
    const addonNames = selectedAddons
      .map((id) => addons.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const text = `Hi DEVSOLE Soft! I just generated a project estimate on your website:
- Architecture: ${selectedType.name}
- Scale: ${selectedScope.name}
- Features: ${addonNames || 'Standard Core'}
- Timeline: ${selectedTimeline.name}
- Estimated Investment: $${totals.totalUSD.toLocaleString()} USD / PKR ${totals.totalPKR.toLocaleString()}

I would like to discuss this development roadmap with your engineering team.`;

    const phone = (siteSettings?.whatsapp || '+923706492398').replace(/\D/g, '');
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  const formatPrice = (usd: number, pkr: number) => {
    if (currency === 'USD') {
      return `$${usd.toLocaleString()}`;
    }
    return `PKR ${pkr.toLocaleString()}`;
  };

  return (
    <section
      id="estimator"
      itemScope
      itemType="https://schema.org/PriceSpecification"
      aria-label="DEVSOLE Soft Web Development Cost Estimator"
      className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28 overflow-hidden bg-transparent"
    >
      {/* Subtle Studio Grid Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <SectionHeading
        eyebrow="Instant Project Calculator"
        title="Estimate Your Project Cost in Real-Time"
        description="Select your platform architecture, views, and required feature modules to receive an upfront estimate, then transmit it directly to our lead engineering desk."
        align="center"
      />

      {/* Segmented Currency Switcher */}
      <div className="mt-8 flex justify-center">
        <div className="inline-flex items-center rounded-xl border border-white/10 bg-[#080c18] p-1 shadow-2xs">
          <button
            type="button"
            onClick={() => setCurrency('USD')}
            className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-all duration-150 ${
              currency === 'USD'
                ? 'bg-white/10 text-white shadow-2xs border border-white/15 font-bold'
                : 'text-slate-400 hover:text-white font-medium'
            }`}
          >
            USD ($)
          </button>
          <button
            type="button"
            onClick={() => setCurrency('PKR')}
            className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-all duration-150 ${
              currency === 'PKR'
                ? 'bg-white/10 text-white shadow-2xs border border-white/15 font-bold'
                : 'text-slate-400 hover:text-white font-medium'
            }`}
          >
            PKR (Rs)
          </button>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        {/* Left 2 Columns: Configurator Steps */}
        <div className="space-y-6 sm:space-y-7 lg:col-span-2">
          
          {/* Step 1: Platform Architecture */}
          <div className="rounded-2xl border border-white/10 bg-[#0c101d] p-5 sm:p-6 shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded border border-blue-500/20">
              Step 01
            </span>
            <h3 className="mt-2 font-display text-base sm:text-lg font-bold text-white tracking-tight">
              Select Platform Architecture
            </h3>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {projectTypes.map((type) => {
                const isSelected = selectedType.id === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedType(type)}
                    className={`flex items-center justify-between rounded-xl border p-3.5 text-left transition-all duration-150 ${
                      isSelected
                        ? 'border-blue-500/60 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/30'
                        : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`flex h-8 w-8 items-center justify-center rounded-lg border shadow-2xs shrink-0 ${
                        isSelected ? 'border-blue-500 bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.3)]' : 'border-white/10 bg-white/[0.04] text-slate-300'
                      }`}>
                        {getCategoryIcon(type.id)}
                      </span>
                      <div>
                        <span className="block text-xs font-bold text-white">{type.name}</span>
                        <span className="font-mono text-[10px] text-slate-400">
                          {currency === 'USD'
                            ? `PKR ${type.pricePKR.toLocaleString()}`
                            : `$${type.priceUSD}`}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold text-blue-400 shrink-0">
                      {formatPrice(type.priceUSD, type.pricePKR)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Project Scale & Views */}
          <div className="rounded-2xl border border-white/10 bg-[#0c101d] p-5 sm:p-6 shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded border border-blue-500/20">
              Step 02
            </span>
            <h3 className="mt-2 font-display text-base sm:text-lg font-bold text-white tracking-tight">
              Project Scale & Number of Views
            </h3>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {scopes.map((scope) => {
                const isSelected = selectedScope.id === scope.id;
                return (
                  <button
                    key={scope.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedScope(scope)}
                    className={`flex flex-col justify-between rounded-xl border p-3.5 text-left transition-all duration-150 ${
                      isSelected
                        ? 'border-blue-500/60 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/30'
                        : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]'
                    }`}
                  >
                    <span className="text-xs font-bold text-white">{scope.name}</span>
                    <span className="mt-2.5 font-mono text-xs font-semibold text-slate-300">
                      {scope.priceUSD === 0
                        ? 'Included'
                        : `+${formatPrice(scope.priceUSD, scope.pricePKR)}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Add-on Feature Modules */}
          <div className="rounded-2xl border border-white/10 bg-[#0c101d] p-5 sm:p-6 shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded border border-blue-500/20">
              Step 03
            </span>
            <h3 className="mt-2 font-display text-base sm:text-lg font-bold text-white tracking-tight">
              Engineering Add-on Modules
            </h3>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {addons.map((addon) => {
                const isSelected = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => toggleAddon(addon.id)}
                    className={`flex items-center justify-between rounded-xl border p-3 text-left transition-all duration-150 ${
                      isSelected
                        ? 'border-blue-500/60 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/30'
                        : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                          isSelected
                            ? 'border-blue-500 bg-blue-600 text-white shadow-[0_0_8px_#3b82f6]'
                            : 'border-white/20 bg-white/[0.04]'
                        }`}
                      >
                        {isSelected && (
                          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <span className="text-xs font-semibold text-slate-200">{addon.name}</span>
                    </div>
                    <span className="font-mono text-xs font-semibold text-blue-400 shrink-0">
                      +{formatPrice(addon.priceUSD, addon.pricePKR)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Sprint Delivery Timeline */}
          <div className="rounded-2xl border border-white/10 bg-[#0c101d] p-5 sm:p-6 shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded border border-blue-500/20">
              Step 04
            </span>
            <h3 className="mt-2 font-display text-base sm:text-lg font-bold text-white tracking-tight">
              Sprint Delivery Pace
            </h3>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {timelines.map((t) => {
                const isSelected = selectedTimeline.id === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedTimeline(t)}
                    className={`flex items-center justify-between rounded-xl border p-3.5 text-left transition-all duration-150 ${
                      isSelected
                        ? 'border-blue-500/60 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/30'
                        : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]'
                    }`}
                  >
                    <span className="text-xs font-bold text-white">{t.name}</span>
                    <span className="font-mono text-xs font-semibold text-slate-300">
                      {t.priceUSD === 0 ? 'Standard' : `+${formatPrice(t.priceUSD, t.pricePKR)}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Executive Financial Summary Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 sm:top-28 rounded-2xl border border-white/10 bg-[#0c101d] p-5 sm:p-6 shadow-[0_12px_45px_rgba(0,0,0,0.6)] backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                Live Calculation
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-pulse" />
            </div>

            <div className="mt-4 border-b border-white/10 pb-4">
              <p className="text-xs text-slate-400 font-medium">Estimated Project Investment</p>
              <div className="mt-1 flex items-baseline gap-2">
                <span
                  itemProp="price"
                  className="font-mono text-3xl sm:text-4xl font-extrabold text-white"
                >
                  {currency === 'USD'
                    ? `$${totals.totalUSD.toLocaleString()}`
                    : `PKR ${totals.totalPKR.toLocaleString()}`}
                </span>
                <span
                  itemProp="priceCurrency"
                  className="font-mono text-xs font-bold text-blue-400"
                >
                  {currency === 'USD' ? 'USD' : 'PKR'}
                </span>
              </div>
              <p className="mt-1 font-mono text-[11px] text-slate-400">
                {currency === 'USD'
                  ? `≈ PKR ${totals.totalPKR.toLocaleString()}`
                  : `≈ $${totals.totalUSD.toLocaleString()} USD`}
              </p>
            </div>

            {/* Scope Breakdown */}
            <div className="mt-4 space-y-2.5 text-xs text-slate-400">
              <div className="flex justify-between items-center">
                <span>Architecture:</span>
                <strong className="text-white font-semibold">{selectedType.name}</strong>
              </div>
              <div className="flex justify-between items-center">
                <span>Scale:</span>
                <strong className="text-white font-semibold">{selectedScope.name}</strong>
              </div>
              <div className="flex justify-between items-center">
                <span>Add-ons:</span>
                <strong className="text-blue-400 font-mono font-semibold bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.5 rounded">
                  {selectedAddons.length} selected
                </strong>
              </div>
              <div className="flex justify-between items-center">
                <span>Timeline:</span>
                <strong className="text-white font-semibold">{selectedTimeline.name}</strong>
              </div>
            </div>

            <div className="mt-6 space-y-2.5">
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white py-3.5 text-xs sm:text-sm font-semibold shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all hover:-translate-y-0.5 active:translate-y-0 text-center"
              >
                <span>Lock Estimate on WhatsApp</span>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a
                href="#contact"
                className="inline-flex w-full items-center justify-center gap-1.5 text-center text-xs font-semibold text-slate-400 hover:text-white transition-colors pt-1"
              >
                <span>Submit Technical Brief via Form</span>
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CostEstimator;