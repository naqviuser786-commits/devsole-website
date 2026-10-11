// FILE: src/crm/pages/CrmPricing.tsx
import { useEffect, useState, useCallback, type FormEvent } from 'react';
import { supabase } from '@/lib/supabase';
import { useCrmAuth } from '../CrmAuthContext';

interface PricingItem {
  id: string;
  name: string;
  icon?: string;
  priceUSD: number;
  pricePKR: number;
}

// 🎯 New Synchronized Client-Friendly Defaults
const DEFAULT_PROJECT_TYPES: PricingItem[] = [
  { id: 'fullstack', name: 'Custom Website or Web App', icon: '💻', priceUSD: 450, pricePKR: 125000 },
  { id: 'proptech', name: 'Real Estate & Business Portal', icon: '🏢', priceUSD: 650, pricePKR: 180000 },
  { id: 'saas', name: 'Calculators & Custom Business Tool', icon: '⚙️', priceUSD: 750, pricePKR: 210000 },
  { id: 'ecommerce', name: 'E-Commerce Online Store', icon: '🛒', priceUSD: 550, pricePKR: 150000 },
];

const DEFAULT_SCOPES: PricingItem[] = [
  { id: 'mvp', name: 'Starter Website (1-5 Pages)', icon: '📄', priceUSD: 0, pricePKR: 0 },
  { id: 'growth', name: 'Standard Business (6-12 Pages)', icon: '📑', priceUSD: 150, pricePKR: 40000 },
  { id: 'enterprise', name: 'Large Platform (13+ Pages)', icon: '📚', priceUSD: 350, pricePKR: 100000 },
];

const DEFAULT_ADDONS: PricingItem[] = [
  { id: 'admin', name: 'Custom Admin Panel (Manage Content & Leads)', icon: '🛡️', priceUSD: 100, pricePKR: 30000 },
  { id: 'auth', name: 'User Accounts & Secure Login System', icon: '🔐', priceUSD: 75, pricePKR: 20000 },
  { id: 'payment', name: 'Online Card & Bank Payment Gateway', icon: '💳', priceUSD: 75, pricePKR: 20000 },
  { id: 'pdf', name: 'Automated PDF Quotes & Invoices', icon: '📄', priceUSD: 40, pricePKR: 12000 },
  { id: 'filters', name: 'Advanced Search & Product/Property Filters', icon: '🔍', priceUSD: 60, pricePKR: 15000 },
  { id: 'seo', name: 'SEO & Google Search Ranking Setup', icon: '🚀', priceUSD: 70, pricePKR: 20000 },
];

const DEFAULT_TIMELINES: PricingItem[] = [
  { id: 'standard', name: 'Standard Delivery (2-3 Weeks)', icon: '⏳', priceUSD: 0, pricePKR: 0 },
  { id: 'express', name: 'Priority Fast Delivery (1-2 Weeks)', icon: '⚡', priceUSD: 100, pricePKR: 30000 },
];

export function CrmPricing() {
  const { profile } = useCrmAuth();
  const [exchangeRate, setExchangeRate] = useState<number>(280);
  const [fetchingRate, setFetchingRate] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  // Pricing Categories
  const [projectTypes, setProjectTypes] = useState<PricingItem[]>(DEFAULT_PROJECT_TYPES);
  const [scopes, setScopes] = useState<PricingItem[]>(DEFAULT_SCOPES);
  const [addons, setAddons] = useState<PricingItem[]>(DEFAULT_ADDONS);
  const [timelines, setTimelines] = useState<PricingItem[]>(DEFAULT_TIMELINES);

  // Load Pricing from Supabase
  const loadPricing = useCallback(async () => {
    try {
      const { data } = await supabase
        .from('pricing_catalog')
        .select('*')
        .eq('id', 'default_pricing')
        .maybeSingle();

      if (data) {
        setExchangeRate(Number(data.usd_to_pkr_rate) || 280);
        if (data.project_types?.length) setProjectTypes(data.project_types);
        if (data.scopes?.length) setScopes(data.scopes);
        if (data.addons?.length) {
          // Filter out legacy 3D addon if still saved in DB
          const cleanedAddons = data.addons.filter((a: PricingItem) => a.id !== '3d');
          // Ensure SEO addon is present
          if (!cleanedAddons.some((a: PricingItem) => a.id === 'seo')) {
            cleanedAddons.push({
              id: 'seo',
              name: 'SEO & Google Search Ranking Setup',
              icon: '🚀',
              priceUSD: 70,
              pricePKR: 20000,
            });
          }
          setAddons(cleanedAddons);
        }
        if (data.timelines?.length) setTimelines(data.timelines);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPricing();
  }, [loadPricing]);

  // ⚡ Live Daily Dollar Rate Fetcher
  async function fetchLiveDollarRate() {
    setFetchingRate(true);
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      const data = await res.json();
      if (data && data.rates && data.rates.PKR) {
        const liveRate = Math.round(data.rates.PKR);
        setExchangeRate(liveRate);
        recalculateAllPKR(liveRate);
        alert(`Today's Live USD Rate Fetched: $1 = PKR ${liveRate}`);
      }
    } catch {
      alert('Could not fetch live rate. You can manually enter the rate.');
    } finally {
      setFetchingRate(false);
    }
  }

  // 🔢 Round to nearest 500 or 1,000 for clean figures
  function roundToCleanPKR(num: number): number {
    if (num <= 0) return 0;
    if (num < 10000) return Math.round(num / 500) * 500;
    return Math.round(num / 1000) * 1000;
  }

  // Auto Recalculate all PKR prices based on Dollar rate
  function recalculateAllPKR(rate: number) {
    setProjectTypes((prev) =>
      prev.map((item) => ({ ...item, pricePKR: roundToCleanPKR(item.priceUSD * rate) }))
    );
    setScopes((prev) =>
      prev.map((item) => ({ ...item, pricePKR: roundToCleanPKR(item.priceUSD * rate) }))
    );
    setAddons((prev) =>
      prev.map((item) => ({ ...item, pricePKR: roundToCleanPKR(item.priceUSD * rate) }))
    );
    setTimelines((prev) =>
      prev.map((item) => ({ ...item, pricePKR: roundToCleanPKR(item.priceUSD * rate) }))
    );
  }

  // 1-Click Reset to Recommended Easy Names
  function loadRecommendedDefaults() {
    if (!window.confirm('Reset all categories to recommended client-friendly names and prices?')) return;
    setProjectTypes(DEFAULT_PROJECT_TYPES);
    setScopes(DEFAULT_SCOPES);
    setAddons(DEFAULT_ADDONS);
    setTimelines(DEFAULT_TIMELINES);
  }

  // Save Everything to Supabase
  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      await supabase.from('pricing_catalog').upsert({
        id: 'default_pricing',
        usd_to_pkr_rate: exchangeRate,
        project_types: projectTypes,
        scopes,
        addons,
        timelines,
        updated_at: new Date().toISOString(),
      });

      await supabase.from('crm_activities').insert({
        entity_type: 'pricing',
        action: `Updated Live Website Pricing (Rate: 1 USD = ${exchangeRate} PKR)`,
        performed_by: profile?.id,
      });

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="py-12 text-center text-xs text-chrome-500 font-mono">Loading pricing data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Live Pricing & Currency Manager</h1>
          <p className="text-xs text-chrome-500">
            Control live prices and service names shown in the website Cost Estimator. Updates apply in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadRecommendedDefaults}
            className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-chrome-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            🔄 Load Easy Client-Friendly Defaults
          </button>

          {savedSuccess && (
            <span className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-xs font-bold text-emerald-400 animate-fade">
              ✓ Live Prices Updated on Website!
            </span>
          )}
        </div>
      </div>

      {/* 💱 Currency Exchange Rate Controller Card */}
      <div className="rounded-3xl border border-energy-bright/40 bg-gradient-to-r from-energy/15 via-navy-900 to-navy-950 p-6 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-energy-bright">
              CURRENCY CONVERSION ENGINE
            </span>
            <h3 className="mt-1 font-display text-lg font-bold text-white">
              Exchange Rate: 1 USD ($) = PKR (₨)
            </h3>
            <p className="text-xs text-chrome-400 mt-0.5">
              Enter manual rate or fetch daily market rate with one click.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-xl border border-white/10 bg-navy-950 px-3 py-1.5">
              <span className="text-xs text-chrome-500 mr-2 font-mono">PKR:</span>
              <input
                type="number"
                value={exchangeRate}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setExchangeRate(val);
                  recalculateAllPKR(val);
                }}
                className="w-20 bg-transparent text-sm font-mono font-bold text-energy-bright focus:outline-none"
              />
            </div>

            <button
              type="button"
              onClick={fetchLiveDollarRate}
              disabled={fetchingRate}
              className="rounded-xl border border-energy-bright/60 bg-energy/20 px-4 py-2 text-xs font-bold text-white shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:bg-energy-bright hover:text-navy-950 transition-all disabled:opacity-50"
            >
              {fetchingRate ? 'Fetching...' : '⚡ Fetch Today\'s Live USD Rate'}
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Project Architecture Types */}
        <PricingSection
          title="1. Website & Project Types"
          subtitle="Base starting price for different categories"
          items={projectTypes}
          onUpdate={setProjectTypes}
        />

        {/* Section 2: Scopes */}
        <PricingSection
          title="2. Project Scale & Page Views"
          subtitle="Additional price depending on number of pages"
          items={scopes}
          onUpdate={setScopes}
        />

        {/* Section 3: Engineering Addons */}
        <PricingSection
          title="3. Extra Features & Tools"
          subtitle="Modular add-on features (Admin panel, User login, SEO setup, Payments)"
          items={addons}
          onUpdate={setAddons}
        />

        {/* Section 4: Timelines */}
        <PricingSection
          title="4. Delivery Timeline Options"
          subtitle="Standard delivery vs Priority fast delivery"
          items={timelines}
          onUpdate={setTimelines}
        />

        {/* Sticky Save Button */}
        <div className="sticky bottom-4 z-20 flex justify-end rounded-2xl border border-white/10 bg-navy-900/90 p-4 shadow-2xl backdrop-blur-xl">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-energy-bright px-8 py-3 text-xs font-bold text-navy-950 shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {saving ? 'Publishing Changes...' : 'Save & Publish All Prices to Live Website →'}
          </button>
        </div>
      </form>
    </div>
  );
}

function PricingSection({
  title,
  subtitle,
  items,
  onUpdate,
}: {
  title: string;
  subtitle: string;
  items: PricingItem[];
  onUpdate: React.Dispatch<React.SetStateAction<PricingItem[]>>;
}) {
  const updateItem = (index: number, field: keyof PricingItem, value: string | number) => {
    onUpdate((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-md">
      <div className="border-b border-white/5 pb-3">
        <h3 className="font-display text-base font-bold text-white">{title}</h3>
        <p className="text-xs text-chrome-500">{subtitle}</p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl border border-white/5 bg-navy-950/60 p-4"
          >
            <div className="flex items-center gap-2.5 flex-1 w-full sm:w-auto">
              <span className="text-base shrink-0">{item.icon || '✦'}</span>
              <input
                type="text"
                value={item.name}
                onChange={(e) => updateItem(index, 'name', e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-white focus:outline-none border-b border-transparent focus:border-energy-bright pb-0.5"
                placeholder="Service Name"
              />
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              <div className="flex items-center rounded-lg border border-white/10 bg-white/[0.02] px-2 py-1">
                <span className="text-[10px] text-chrome-500 mr-1">$</span>
                <input
                  type="number"
                  value={item.priceUSD}
                  onChange={(e) => updateItem(index, 'priceUSD', Number(e.target.value))}
                  className="w-16 bg-transparent text-xs font-mono font-bold text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center rounded-lg border border-white/10 bg-white/[0.02] px-2 py-1">
                <span className="text-[10px] text-chrome-500 mr-1">PKR</span>
                <input
                  type="number"
                  value={item.pricePKR}
                  onChange={(e) => updateItem(index, 'pricePKR', Number(e.target.value))}
                  className="w-24 bg-transparent text-xs font-mono font-bold text-energy-bright focus:outline-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}