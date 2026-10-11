// FILE: src/pages/ContactPage.tsx
import { useEffect } from 'react';
import { Contact } from '@/components/sections/Contact';
import { FAQ } from '@/components/sections/FAQ';

export function ContactPage() {
  useEffect(() => {
    // 1. Google Search Title & Meta Tags Optimization
    document.title = 'Contact Engineering Desk & Start a Project — DEVSOLE Soft';
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Get in touch with the DEVSOLE Soft lead engineering desk. Submit your project requirements, schedule a direct WhatsApp founder consultation, or request a technical quote.'
      );
    }

    // 2. Canonical URL update
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://devsolesoft.com/contact');
    }
  }, []);

  return (
    <div className="relative pt-24 sm:pt-28 min-h-screen overflow-hidden">
      {/* Page-Specific Custom Background Aura (Emerald Desk Availability Wash) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-16 left-1/2 -translate-x-1/2 h-[550px] w-[900px] rounded-full bg-emerald-500/[0.07] blur-[160px]" />
        <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_20%,#000_70%,transparent_100%)]" />
      </div>

      {/* Dedicated Contact Page Hero Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 pb-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-pulse" />
          <span>Guaranteed Response Within 24 Hours</span>
        </div>
        <h1 className="mt-4 font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Direct Engineering Consultation & Project Inquiries
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm text-slate-400 leading-relaxed">
          Speak directly with founder and lead architect Aoun Abbas. Submit your project brief below or start an instant conversation via WhatsApp.
        </p>
      </div>

      {/* Main Contact Form & Supabase CRM Inquiries Pipeline */}
      <Contact />

      {/* Direct Clarity FAQs */}
      <div className="border-t border-white/10 mt-12">
        <FAQ />
      </div>
    </div>
  );
}

export default ContactPage;