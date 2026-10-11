// FILE: src/components/sections/CostEstimator.tsx
import { useState, useMemo, useEffect, type ReactNode } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { siteSettings } from '@/data/siteData';
import { supabase } from '@/lib/supabase';
import { soundFX } from '@/lib/soundFx';

interface Option {
  id: string;
  name: string;
  icon?: string;
  priceUSD: number;
  pricePKR: number;
}

// 🎯 Crystal-Clear, Client-Friendly Default Options (USD & PKR)
const DEFAULT_PROJECT_TYPES: Option[] = [
  { id: 'fullstack', name: 'Custom Website or Web App', priceUSD: 450, pricePKR: 125000 },
  { id: 'proptech', name: 'Real Estate & Business Portal', priceUSD: 650, pricePKR: 180000 },
  { id: 'saas', name: 'Calculators & Custom Business Tool', priceUSD: 750, pricePKR: 210000 },
  { id: 'ecommerce', name: 'E-Commerce Online Store', priceUSD: 550, pricePKR: 150000 },
];

const DEFAULT_SCOPES: Option[] = [
  { id: 'mvp', name: 'Starter Website (1-5 Pages)', priceUSD: 0, pricePKR: 0 },
  { id: 'growth', name: 'Standard Business (6-12 Pages)', priceUSD: 150, pricePKR: 40000 },
  { id: 'enterprise', name: 'Large Platform (13+ Pages)', priceUSD: 350, pricePKR: 100000 },
];

const DEFAULT_ADDONS: Option[] = [
  { id: 'admin', name: 'Custom Admin Panel (Manage Content & Leads)', priceUSD: 100, pricePKR: 30000 },
  { id: 'auth', name: 'User Accounts & Secure Login System', priceUSD: 75, pricePKR: 20000 },
  { id: 'payment', name: 'Online Card & Bank Payment Gateway', priceUSD: 75, pricePKR: 20000 },
  { id: 'pdf', name: 'Automated PDF Quotes & Invoices', priceUSD: 40, pricePKR: 12000 },
  { id: 'filters', name: 'Advanced Search & Product/Property Filters', priceUSD: 60, pricePKR: 15000 },
  { id: 'seo', name: 'SEO & Google Search Ranking Setup', priceUSD: 70, pricePKR: 20000 },
];

const DEFAULT_TIMELINES: Option[] = [
  { id: 'standard', name: 'Standard Delivery (2-3 Weeks)', priceUSD: 0, pricePKR: 0 },
  { id: 'express', name: 'Priority Fast Delivery (1-2 Weeks)', priceUSD: 100, pricePKR: 30000 },
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
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['admin', 'seo']);
  const [selectedTimeline, setSelectedTimeline] = useState<Option>(DEFAULT_TIMELINES[0]);
  
  // Interactive Slider for exact screen count (1 - 25 views)
  const [screenCount, setScreenCount] = useState<number>(5);

  // Live Supabase CRM Pricing Sync
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
        // Fallback to static defaults
      }
    }

    fetchPricing();
  }, []);

  // Sync screen count slider with presets
  const handleScreenSlider = (val: number) => {
    setScreenCount(val);
    if (val <= 5 && scopes[0]) {
      setSelectedScope(scopes[0]);
    } else if (val <= 12 && scopes[1]) {
      setSelectedScope(scopes[1]);
    } else if (scopes[2]) {
      setSelectedScope(scopes[2]);
    }
  };

  const handleScopeSelect = (scope: Option) => {
    soundFX.playClick();
    setSelectedScope(scope);
    if (scope.id === 'mvp') setScreenCount(5);
    else if (scope.id === 'growth') setScreenCount(10);
    else setScreenCount(18);
  };

  const toggleAddon = (id: string) => {
    soundFX.playClick();
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

    const baseUSD = selectedType.priceUSD;
    const scopeUSD = selectedScope.priceUSD;
    const timelineUSD = selectedTimeline.priceUSD;
    const totalUSD = baseUSD + scopeUSD + addonsUSD + timelineUSD;

    const basePKR = selectedType.pricePKR;
    const scopePKR = selectedScope.pricePKR;
    const timelinePKR = selectedTimeline.pricePKR;
    const totalPKR = basePKR + scopePKR + addonsPKR + timelinePKR;

    // Percentages for Distribution Bar
    const pctBase = Math.round((baseUSD / totalUSD) * 100);
    const pctScope = Math.round((scopeUSD / totalUSD) * 100);
    const pctAddons = Math.round((addonsUSD / totalUSD) * 100);
    const pctTimeline = Math.max(0, 100 - (pctBase + pctScope + pctAddons));

    return {
      totalUSD,
      totalPKR,
      pctBase,
      pctScope,
      pctAddons,
      pctTimeline,
    };
  }, [selectedType, selectedScope, selectedAddons, selectedTimeline, addons]);

  const generateWhatsAppLink = () => {
    const addonNames = selectedAddons
      .map((id) => addons.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const costString = currency === 'USD'
      ? `$${totals.totalUSD.toLocaleString()} USD`
      : `PKR ${totals.totalPKR.toLocaleString()}`;

    const text = `Hi DEVSOLE Soft! I just calculated an estimate for my project on your website:
- Project Type: ${selectedType.name}
- Number of Pages: ${screenCount} Pages (${selectedScope.name})
- Extra Features: ${addonNames || 'Core Website Only'}
- Delivery Timeline: ${selectedTimeline.name}
- Estimated Total Cost: ${costString}

I want to discuss this project and get started.`;

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
      aria-label="DEVSOLE Soft Website Development Cost Estimator"
      className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28 overflow-hidden bg-transparent"
    >
      {/* Subtle Studio Grid Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <div data-gsap="mask-up">
        <SectionHeading
          eyebrow="Instant Cost Calculator · Transparent Pricing"
          title="Interactive Project Cost & Budget Calculator"
          description="Select your website type, required pages, and add-on features to see an instant, upfront cost estimate in PKR or USD. No hidden charges, 100% fixed pricing."
          align="center"
        />
      </div>

      {/* Segmented Currency Switcher */}
      <div data-gsap="fade-up" className="mt-8 flex justify-center">
        <div className="inline-flex items-center rounded-xl border border-white/10 bg-[#080c18] p-1 shadow-2xs">
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              setCurrency('USD');
            }}
            className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-all duration-150 ${
              currency === 'USD'
                ? 'bg-blue-600/20 text-white shadow-2xs border border-blue-500/30 font-bold'
                : 'text-slate-400 hover:text-white font-medium'
            }`}
          >
            USD ($)
          </button>
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              setCurrency('PKR');
            }}
            className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-all duration-150 ${
              currency === 'PKR'
                ? 'bg-blue-600/20 text-white shadow-2xs border border-blue-500/30 font-bold'
                : 'text-slate-400 hover:text-white font-medium'
            }`}
          >
            PKR (₨)
          </button>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        {/* Left 7 Columns: Step-by-Step Configurator */}
        <div className="space-y-6 sm:space-y-7 lg:col-span-7">
          
          {/* Step 1: Website or Software Type */}
          <div className="rounded-2xl border border-white/10 bg-[#0c101d] p-5 sm:p-6 shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded border border-blue-500/20">
                Step 01 · Project Type
              </span>
              <span className="font-mono text-[10px] text-slate-500">100% Code Handover</span>
            </div>

            <h3 className="mt-2 font-display text-base sm:text-lg font-bold text-white tracking-tight">
              What are you looking to build?
            </h3>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {projectTypes.map((type) => {
                const isSelected = selectedType.id === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => {
                      soundFX.playClick();
                      setSelectedType(type);
                    }}
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

          {/* Step 2: Number of Pages / User Views */}
          <div className="rounded-2xl border border-white/10 bg-[#0c101d] p-5 sm:p-6 shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded border border-blue-500/20">
                Step 02 · Project Scale
              </span>
              <span className="font-mono text-xs font-bold text-emerald-400">
                {screenCount} Pages Selected
              </span>
            </div>

            <h3 className="mt-2 font-display text-base sm:text-lg font-bold text-white tracking-tight">
              How many pages does your project need?
            </h3>

            {/* Range Slider */}
            <div className="mt-5 rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <div className="flex justify-between items-center text-xs font-mono text-slate-300">
                <span>Page Count Slider:</span>
                <span className="font-bold text-white bg-white/10 px-2 py-0.5 rounded">
                  {screenCount} {screenCount === 1 ? 'Page' : 'Pages'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                value={screenCount}
                onChange={(e) => handleScreenSlider(Number(e.target.value))}
                className="mt-3 w-full accent-blue-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
              />
              <div className="mt-2 flex justify-between text-[10px] font-mono text-slate-500">
                <span>1 Page (Landing)</span>
                <span>8 Pages (Standard)</span>
                <span>25+ Pages (Large Platform)</span>
              </div>
            </div>

            {/* Scope Preset Buttons */}
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {scopes.map((scope) => {
                const isSelected = selectedScope.id === scope.id;
                return (
                  <button
                    key={scope.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => handleScopeSelect(scope)}
                    className={`flex flex-col justify-between rounded-xl border p-3.5 text-left transition-all duration-150 ${
                      isSelected
                        ? 'border-blue-500/60 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/30'
                        : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]'
                    }`}
                  >
                    <span className="text-xs font-bold text-white">{scope.name}</span>
                    <span className="mt-2.5 font-mono text-xs font-semibold text-slate-300">
                      {scope.priceUSD === 0
                        ? 'Base Included'
                        : `+${formatPrice(scope.priceUSD, scope.pricePKR)}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Add-on Features & Tools */}
          <div className="rounded-2xl border border-white/10 bg-[#0c101d] p-5 sm:p-6 shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded border border-blue-500/20">
                Step 03 · Extra Features
              </span>
              <span className="font-mono text-[10px] text-slate-400">
                {selectedAddons.length} Selected
              </span>
            </div>

            <h3 className="mt-2 font-display text-base sm:text-lg font-bold text-white tracking-tight">
              Select any extra features you need:
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

          {/* Step 4: Delivery Timeline */}
          <div className="rounded-2xl border border-white/10 bg-[#0c101d] p-5 sm:p-6 shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded border border-blue-500/20">
              Step 04 · Delivery Speed
            </span>
            <h3 className="mt-2 font-display text-base sm:text-lg font-bold text-white tracking-tight">
              How fast do you need the project launched?
            </h3>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {timelines.map((t) => {
                const isSelected = selectedTimeline.id === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => {
                      soundFX.playClick();
                      setSelectedTimeline(t);
                    }}
                    className={`flex items-center justify-between rounded-xl border p-3.5 text-left transition-all duration-150 ${
                      isSelected
                        ? 'border-blue-500/60 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/30'
                        : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]'
                    }`}
                  >
                    <span className="text-xs font-bold text-white">{t.name}</span>
                    <span className="font-mono text-xs font-semibold text-slate-300">
                      {t.priceUSD === 0 ? 'Standard Included' : `+${formatPrice(t.priceUSD, t.pricePKR)}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Sticky Summary Card */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 sm:top-28 rounded-2xl border border-white/10 bg-[#0c101d] p-6 shadow-[0_12px_45px_rgba(0,0,0,0.6)] backdrop-blur-xl">
            
            {/* Header Status Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-pulse" />
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-300">
                  INSTANT COST BREAKDOWN
                </span>
              </div>
              <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-bold">
                100% Fixed Quote
              </span>
            </div>

            {/* Big Headline Investment Display */}
            <div className="mt-5">
              <span className="text-[11px] text-slate-400 font-mono uppercase tracking-wider block">
                Estimated Project Investment:
              </span>
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

            {/* Budget Allocation Bar */}
            <div className="mt-5 rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                <span>Budget Allocation:</span>
                <span className="text-white font-bold">{totals.pctBase}% Base / {totals.pctAddons}% Features</span>
              </div>
              
              <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden flex">
                <div style={{ width: `${totals.pctBase}%` }} className="bg-blue-500 h-full" title="Core Website" />
                <div style={{ width: `${totals.pctScope}%` }} className="bg-indigo-500 h-full" title="Pages Scope" />
                <div style={{ width: `${totals.pctAddons}%` }} className="bg-emerald-500 h-full" title="Extra Features" />
                <div style={{ width: `${totals.pctTimeline}%` }} className="bg-amber-500 h-full" title="Delivery Speed" />
              </div>

              <div className="mt-2.5 grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-blue-500" /> Core Website
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" /> Extra Features
                </span>
              </div>
            </div>

            {/* Scope Summary Line Items */}
            <div className="mt-5 space-y-2.5 text-xs text-slate-400 border-t border-white/10 pt-4 font-mono">
              <div className="flex justify-between items-center">
                <span>Project Type:</span>
                <strong className="text-white truncate max-w-[200px] text-right font-sans">{selectedType.name}</strong>
              </div>
              <div className="flex justify-between items-center">
                <span>Total Scope:</span>
                <strong className="text-white">{screenCount} Pages ({selectedScope.name})</strong>
              </div>
              <div className="flex justify-between items-center">
                <span>Selected Add-ons:</span>
                <strong className="text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded font-bold">
                  {selectedAddons.length} Features Added
                </strong>
              </div>
              <div className="flex justify-between items-center">
                <span>Delivery Timeline:</span>
                <strong className="text-white font-sans">{selectedTimeline.name}</strong>
              </div>
            </div>

            {/* Guarantee Box */}
            <div className="mt-5 rounded-xl border border-white/10 bg-[#06080f] p-3.5 font-mono text-[11px] space-y-1.5 text-slate-400">
              <div className="flex justify-between">
                <span>SOURCE_CODE:</span>
                <span className="text-emerald-400 font-bold">100% Client Owned ($0 IP Fee)</span>
              </div>
              <div className="flex justify-between">
                <span>PREVIEW_LINK:</span>
                <span className="text-white font-bold">Private Staging Link Included</span>
              </div>
              <div className="flex justify-between">
                <span>PAYMENTS:</span>
                <span className="text-blue-400 font-semibold">3 Milestone Checkpoints</span>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="mt-6 space-y-2.5">
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFX.playClick()}
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
                onClick={() => soundFX.playClick()}
                className="inline-flex w-full items-center justify-center gap-1.5 text-center text-xs font-semibold text-slate-400 hover:text-white transition-colors pt-1"
              >
                <span>Or Submit via Project Brief Form</span>
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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