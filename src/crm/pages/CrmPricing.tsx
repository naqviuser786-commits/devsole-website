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

export function CrmPricing() {
  const { profile } = useCrmAuth();
  const [exchangeRate, setExchangeRate] = useState<number>(280);
  const [fetchingRate, setFetchingRate] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  // Pricing Categories
  const [projectTypes, setProjectTypes] = useState<PricingItem[]>([]);
  const [scopes, setScopes] = useState<PricingItem[]>([]);
  const [addons, setAddons] = useState<PricingItem[]>([]);
  const [timelines, setTimelines] = useState<PricingItem[]>([]);

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
        setProjectTypes(data.project_types || []);
        setScopes(data.scopes || []);
        setAddons(data.addons || []);
        setTimelines(data.timelines || []);
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

  // 🔢 Round to nearest 500 or 1,000 for clean figures (e.g. 125,000 instead of 124,783)
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
    return <div className="py-12 text-center text-xs text-chrome-500">Loading pricing data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Live Pricing & Currency Manager</h1>
          <p className="text-xs text-chrome-500">
            Control live prices shown in the website Cost Estimator. Updates apply in real-time.
          </p>
        </div>

        {savedSuccess && (
          <span className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-xs font-bold text-emerald-400 animate-fade">
            ✓ Live Prices Updated on Website!
          </span>
        )}
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
          title="1. Platform Architecture Services"
          subtitle="Base price for different web application frameworks"
          items={projectTypes}
          onUpdate={setProjectTypes}
        />

        {/* Section 2: Scopes */}
        <PricingSection
          title="2. Project Scale & Views"
          subtitle="Additional price by number of screens/views"
          items={scopes}
          onUpdate={setScopes}
        />

        {/* Section 3: Engineering Addons */}
        <PricingSection
          title="3. Advanced Engineering Add-ons"
          subtitle="Modular feature add-ons"
          items={addons}
          onUpdate={setAddons}
        />

        {/* Section 4: Timelines */}
        <PricingSection
          title="4. Delivery Sprint Timeline"
          subtitle="Delivery speed pricing"
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
  const updateItem = (index: number, field: 'priceUSD' | 'pricePKR', value: number) => {
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
            className="flex items-center justify-between rounded-2xl border border-white/5 bg-navy-950/60 p-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{item.icon || '✦'}</span>
              <span className="text-xs font-semibold text-white">{item.name}</span>
            </div>

            <div className="flex items-center gap-2">
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