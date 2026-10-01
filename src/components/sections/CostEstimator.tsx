import { useState, useMemo, useEffect } from 'react';
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
  { id: 'fullstack', name: 'Custom Web Application', icon: '⚡', priceUSD: 450, pricePKR: 125000 },
  { id: 'proptech', name: 'PropTech / Real Estate Portal', icon: '🏢', priceUSD: 650, pricePKR: 180000 },
  { id: 'saas', name: 'SaaS Tool & Automation', icon: '🧮', priceUSD: 750, pricePKR: 210000 },
  { id: 'ecommerce', name: 'E-Commerce Marketplace', icon: '🛍️', priceUSD: 550, pricePKR: 150000 },
];

const DEFAULT_SCOPES: Option[] = [
  { id: 'mvp', name: 'Starter MVP (1–5 Screens)', icon: '📱', priceUSD: 0, pricePKR: 0 },
  { id: 'growth', name: 'Growth Platform (6–12 Screens)', icon: '💻', priceUSD: 150, pricePKR: 40000 },
  { id: 'enterprise', name: 'Enterprise Scale (13+ Screens)', icon: '🌐', priceUSD: 350, pricePKR: 100000 },
];

const DEFAULT_ADDONS: Option[] = [
  { id: 'admin', name: 'Admin Panel Dashboard', icon: '📊', priceUSD: 100, pricePKR: 30000 },
  { id: 'auth', name: 'Authentication & Roles', icon: '🔐', priceUSD: 75, pricePKR: 20000 },
  { id: 'payment', name: 'Payment Gateway (Stripe/Card)', icon: '💳', priceUSD: 75, pricePKR: 20000 },
  { id: 'pdf', name: 'Automated PDF Quote Generator', icon: '📄', priceUSD: 40, pricePKR: 12000 },
  { id: 'filters', name: 'Live Instant Search & Filters', icon: '🔍', priceUSD: 60, pricePKR: 15000 },
  { id: '3d', name: 'Interactive 3D WebGL Element', icon: '🧊', priceUSD: 150, pricePKR: 40000 },
];

const DEFAULT_TIMELINES: Option[] = [
  { id: 'standard', name: 'Standard Delivery (3–4 Weeks)', icon: '🗓️', priceUSD: 0, pricePKR: 0 },
  { id: 'express', name: 'Priority Sprint (1–2 Weeks)', icon: '⚡', priceUSD: 100, pricePKR: 30000 },
];

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

  // Fetch Live Pricing Catalog from Supabase
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

    const text = `Hi DEVSOLE! I just generated a project estimate on your website:
• Architecture: ${selectedType.name}
• Scale: ${selectedScope.name}
• Features: ${addonNames || 'Standard'}
• Timeline: ${selectedTimeline.name}
• Estimated Cost: $${totals.totalUSD.toLocaleString()} USD / PKR ${totals.totalPKR.toLocaleString()}

I would like to discuss this roadmap with your engineering team.`;

    const phone = siteSettings.whatsapp.replace(/\D/g, '');
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  const formatPrice = (usd: number, pkr: number) => {
    if (currency === 'USD') {
      return `$${usd.toLocaleString()}`;
    }
    return `PKR ${pkr.toLocaleString()}`;
  };

  return (
    <section id="estimator" className="relative mx-auto max-w-6xl px-4 sm:px-6 py-24 sm:py-28 overflow-hidden">
      <SectionHeading
        eyebrow="Instant Project Calculator"
        title="Estimate Your Project Cost in Real-Time"
        description="Select your platform scope and features to get an upfront estimate, then send it directly to our lead engineer."
        align="center"
      />

      {/* Currency Switcher */}
      <div className="mt-8 flex justify-center">
        <div className="inline-flex max-w-full items-center rounded-full border border-white/10 bg-navy-950/80 p-1 backdrop-blur-md shadow-inner">
          <button
            type="button"
            onClick={() => setCurrency('USD')}
            className={`rounded-full px-5 py-1.5 text-xs font-bold transition-all ${
              currency === 'USD'
                ? 'bg-energy-bright text-navy-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                : 'text-chrome-400 hover:text-white'
            }`}
          >
            USD ($)
          </button>
          <button
            type="button"
            onClick={() => setCurrency('PKR')}
            className={`rounded-full px-5 py-1.5 text-xs font-bold transition-all ${
              currency === 'PKR'
                ? 'bg-energy-bright text-navy-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                : 'text-chrome-400 hover:text-white'
            }`}
          >
            PKR (₨)
          </button>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        {/* Left 2 Columns: Options Selector */}
        <div className="space-y-8 lg:col-span-2">
          {/* Step 1: Project Type */}
          <div className="rounded-3xl border border-white/10 bg-navy-950/70 p-6 sm:p-7 backdrop-blur-md">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-energy-bright">
              Step 01
            </span>
            <h3 className="mt-1 font-display text-base sm:text-lg font-bold text-white">
              Select Platform Architecture
            </h3>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {projectTypes.map((type) => {
                const isSelected = selectedType.id === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type)}
                    className={`flex items-center justify-between rounded-2xl border p-3.5 sm:p-4 text-left transition-all ${
                      isSelected
                        ? 'border-energy-bright bg-energy/15 text-white shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                        : 'border-white/10 bg-white/[0.02] text-chrome-300 hover:border-white/30 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 text-base shrink-0">
                        {type.icon}
                      </span>
                      <div>
                        <span className="block text-xs sm:text-sm font-semibold">{type.name}</span>
                        <span className="font-mono text-[10px] text-chrome-500">
                          {currency === 'USD'
                            ? `PKR ${type.pricePKR.toLocaleString()}`
                            : `$${type.priceUSD}`}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold text-energy-bright shrink-0">
                      {formatPrice(type.priceUSD, type.pricePKR)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Scope */}
          <div className="rounded-3xl border border-white/10 bg-navy-950/70 p-6 sm:p-7 backdrop-blur-md">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-energy-bright">
              Step 02
            </span>
            <h3 className="mt-1 font-display text-base sm:text-lg font-bold text-white">
              Project Scale & Views
            </h3>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {scopes.map((scope) => {
                const isSelected = selectedScope.id === scope.id;
                return (
                  <button
                    key={scope.id}
                    type="button"
                    onClick={() => setSelectedScope(scope)}
                    className={`flex flex-col justify-between rounded-2xl border p-4 text-left transition-all ${
                      isSelected
                        ? 'border-energy-bright bg-energy/15 text-white shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                        : 'border-white/10 bg-white/[0.02] text-chrome-300 hover:border-white/30 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{scope.icon}</span>
                      <span className="text-xs sm:text-sm font-semibold">{scope.name}</span>
                    </div>
                    <span className="mt-3 font-mono text-xs font-bold text-energy-bright">
                      {scope.priceUSD === 0
                        ? 'Included'
                        : `+${formatPrice(scope.priceUSD, scope.pricePKR)}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Add-on Features */}
          <div className="rounded-3xl border border-white/10 bg-navy-950/70 p-6 sm:p-7 backdrop-blur-md">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-energy-bright">
              Step 03
            </span>
            <h3 className="mt-1 font-display text-base sm:text-lg font-bold text-white">
              Advanced Engineering Add-ons
            </h3>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {addons.map((addon) => {
                const isSelected = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddon(addon.id)}
                    className={`flex items-center justify-between rounded-2xl border p-3.5 sm:p-4 text-left transition-all ${
                      isSelected
                        ? 'border-energy-bright bg-energy/15 text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                        : 'border-white/10 bg-white/[0.02] text-chrome-300 hover:border-white/30 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-md border text-[10px] font-bold ${
                          isSelected
                            ? 'border-energy-bright bg-energy-bright text-navy-950'
                            : 'border-white/20'
                        }`}
                      >
                        {isSelected && '✓'}
                      </div>
                      <span className="text-base shrink-0">{addon.icon}</span>
                      <span className="text-xs sm:text-sm font-medium">{addon.name}</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-energy-bright shrink-0">
                      +{formatPrice(addon.priceUSD, addon.pricePKR)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Timeline */}
          <div className="rounded-3xl border border-white/10 bg-navy-950/70 p-6 sm:p-7 backdrop-blur-md">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-energy-bright">
              Step 04
            </span>
            <h3 className="mt-1 font-display text-base sm:text-lg font-bold text-white">
              Deployment Timeline
            </h3>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {timelines.map((t) => {
                const isSelected = selectedTimeline.id === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTimeline(t)}
                    className={`flex items-center justify-between rounded-2xl border p-3.5 sm:p-4 text-left transition-all ${
                      isSelected
                        ? 'border-energy-bright bg-energy/15 text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                        : 'border-white/10 bg-white/[0.02] text-chrome-300 hover:border-white/30 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{t.icon}</span>
                      <span className="text-xs sm:text-sm font-medium">{t.name}</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-energy-bright">
                      {t.priceUSD === 0 ? 'Standard' : `+${formatPrice(t.priceUSD, t.pricePKR)}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Real-Time Sticky Summary Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 rounded-3xl border-2 border-energy-bright/50 bg-gradient-to-b from-energy/20 via-navy-950 to-navy-950 p-6 sm:p-7 backdrop-blur-xl shadow-[0_0_40px_rgba(0,240,255,0.18)]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-energy-bright">
                Live Estimate
              </span>
              <span className="h-2 w-2 animate-pulse rounded-full bg-energy-bright shadow-[0_0_6px_#00f0ff]" />
            </div>

            <div className="mt-4 border-b border-white/10 pb-5">
              <p className="text-xs text-chrome-400">Estimated Project Cost</p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                  {currency === 'USD'
                    ? `$${totals.totalUSD.toLocaleString()}`
                    : `PKR ${totals.totalPKR.toLocaleString()}`}
                </span>
                <span className="font-mono text-xs font-semibold text-chrome-400">
                  {currency === 'USD' ? 'USD' : 'PKR'}
                </span>
              </div>
              <p className="mt-1 font-mono text-xs text-energy-bright/90">
                {currency === 'USD'
                  ? `≈ PKR ${totals.totalPKR.toLocaleString()}`
                  : `≈ $${totals.totalUSD.toLocaleString()} USD`}
              </p>
            </div>

            <div className="mt-5 space-y-2.5 text-xs text-chrome-300">
              <div className="flex justify-between">
                <span>Architecture:</span>
                <strong className="text-white font-medium">{selectedType.name}</strong>
              </div>
              <div className="flex justify-between">
                <span>Scale:</span>
                <strong className="text-white font-medium">{selectedScope.name}</strong>
              </div>
              <div className="flex justify-between">
                <span>Add-ons:</span>
                <strong className="text-energy-bright">{selectedAddons.length} selected</strong>
              </div>
              <div className="flex justify-between">
                <span>Timeline:</span>
                <strong className="text-white font-medium">{selectedTimeline.name}</strong>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-energy-bright py-3.5 text-xs sm:text-sm font-bold text-navy-950 shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all hover:scale-105 active:scale-95"
              >
                <span>💬 Lock Estimate & Send to WhatsApp →</span>
              </a>
              <a
                href="#contact"
                className="block text-center text-xs font-medium text-chrome-400 transition-colors hover:text-white"
              >
                Or submit inquiry via form below ↓
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}