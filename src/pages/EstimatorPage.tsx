// FILE: src/pages/EstimatorPage.tsx
import { useEffect } from 'react';
import { CostEstimator } from '@/components/sections/CostEstimator';
import { FAQ } from '@/components/sections/FAQ';
import { Contact } from '@/components/sections/Contact';

export function EstimatorPage() {
  useEffect(() => {
    // 1. Google Search Title & Meta Tags Optimization
    document.title = 'Interactive Web Development Cost Estimator — DEVSOLE Soft';
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Calculate your custom web application, PropTech portal, or SaaS development cost in real time with our live multi-currency (USD & PKR) estimator engine.'
      );
    }

    // 2. Canonical URL update
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://devsolesoft.com/estimator');
    }
  }, []);

  return (
    <div className="pt-24 sm:pt-28 min-h-screen">
      {/* Dedicated Page Hero Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 pb-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-blue-400">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
          <span>Transparent Financial Forecasting</span>
        </div>
        <h1 className="mt-4 font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Interactive Web Development Cost Calculator
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm text-slate-400 leading-relaxed">
          Configure your platform architecture, user view scope, and technical add-on modules. Receive an upfront investment estimate in USD or PKR, and lock it directly with our engineering desk.
        </p>
      </div>

      {/* Main Cost Estimator Engine (Supabase Live Pricing Sync + WhatsApp Lock) */}
      <CostEstimator />

      {/* Pricing Clarity & FAQs */}
      <div className="border-t border-white/10 mt-12">
        <FAQ />
      </div>

      {/* Direct Project Brief Desk */}
      <div className="border-t border-white/10 mt-12">
        <Contact />
      </div>
    </div>
  );
}

export default EstimatorPage;