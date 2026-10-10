import { useState, type FormEvent } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { siteSettings } from '@/data/siteData';
import { supabase } from '@/lib/supabase';

const inputClass =
  'w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:bg-white/[0.05] focus:outline-none transition-all';

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [clientData, setClientData] = useState({ name: '', service: '', phone: '', budget: '' });

  const phone = (siteSettings?.whatsapp || '+923706492398').replace(/\D/g, '');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const name = (form.elements.namedItem('clientName') as HTMLInputElement)?.value;
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value;
    const clientPhone = (form.elements.namedItem('phone') as HTMLInputElement)?.value;
    const service = (form.elements.namedItem('service') as HTMLSelectElement)?.value;
    const budget = (form.elements.namedItem('budget') as HTMLSelectElement)?.value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement)?.value;

    let estValue = 500;
    if (budget.includes('750 - $1,200') || budget.includes('750')) estValue = 950;
    if (budget.includes('1,200+') || budget.includes('1,200')) estValue = 1500;

    // 1. Dispatch Lead Directly into Supabase Cloud CRM (Preserving CRM connection)
    try {
      const { data: newLead } = await supabase
        .from('leads')
        .insert({
          name,
          email,
          phone: clientPhone,
          whatsapp: clientPhone,
          service_interested: service,
          estimated_value: estValue,
          currency: 'USD',
          notes: `[Budget: ${budget}]\n\nProject Brief:\n${message}`,
          source: 'Website Public Form',
          status: 'new',
          priority: estValue >= 1000 ? 'high' : 'medium',
        })
        .select()
        .single();

      if (newLead) {
        await supabase.from('crm_activities').insert({
          entity_type: 'lead',
          entity_id: newLead.id,
          action: `New Project Inquiry: ${name} (${service})`,
        });
      }
    } catch {
      // CRM sync fallback
    }

    // 2. Email Dispatch via FormSubmit (Preserved)
    const payload = {
      _subject: `New Project Inquiry: ${name} (${service}) - DEVSOLE Soft`,
      _template: 'table',
      _captcha: 'false',
      Client_Name: name,
      Email_Address: email,
      Phone_WhatsApp: clientPhone,
      Service_Required: service,
      Estimated_Budget: budget,
      Project_Brief: message,
    };

    try {
      await fetch('https://formsubmit.co/ajax/devsole.official@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      setClientData({ name, service, phone: clientPhone, budget });
      setShowSuccessModal(true);
      form.reset();
    } catch {
      setClientData({ name, service, phone: clientPhone, budget });
      setShowSuccessModal(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  const getWhatsAppLeadLink = () => {
    const text = `Hi DEVSOLE Soft! I just submitted an inquiry on your website:
- Name: ${clientData.name}
- Service: ${clientData.service}
- Budget: ${clientData.budget}
- WhatsApp: ${clientData.phone}

Looking forward to discussing the project roadmap.`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section
      id="contact"
      itemScope
      itemType="https://schema.org/ContactPage"
      className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28 overflow-hidden bg-transparent"
    >
      {/* Subtle Studio Grid Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <SectionHeading
        eyebrow="Start a Project"
        title="Let's Build Something Exceptional"
        description="Share your project requirements with DEVSOLE Soft - our lead engineering team will respond with a tailored roadmap and estimate within 24 hours."
        align="center"
      />

      {/* Direct Contact Badges */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
        <a
          href={`mailto:${siteSettings.email}`}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-slate-300 shadow-2xs transition-colors hover:border-white/20 hover:text-white"
        >
          <svg className="h-4 w-4 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <span className="font-semibold">{siteSettings.email}</span>
        </a>

        <a
          href={`https://wa.me/${phone}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-emerald-400 shadow-2xs transition-colors hover:bg-emerald-500/20"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
          <span className="font-semibold">WhatsApp Direct: {siteSettings.whatsapp}</span>
        </a>
      </div>

      {/* Main High-Conversion Contact Form Card */}
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-10 max-w-2xl space-y-4 sm:space-y-5 rounded-2xl border border-white/10 bg-[#0c101d] p-6 sm:p-9 shadow-[0_12px_45px_rgba(0,0,0,0.6)]"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-300">Client Name *</label>
            <input name="clientName" required placeholder="Your Full Name" className={inputClass} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-300">Work Email *</label>
            <input name="email" required type="email" placeholder="you@company.com" className={inputClass} />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-300">Phone / WhatsApp *</label>
            <input name="phone" required placeholder="+92 300 0000000" className={inputClass} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-300">Service Category *</label>
            <select name="service" required className={inputClass} defaultValue="">
              <option value="" disabled className="bg-[#0c101d] text-slate-500">Select a Service</option>
              <option value="Custom Web Application" className="bg-[#0c101d] text-white">Custom Web Application ($450 / PKR 125K)</option>
              <option value="PropTech / Real Estate Portal" className="bg-[#0c101d] text-white">PropTech / Real Estate Portal ($650 / PKR 180K)</option>
              <option value="SaaS Tool & Automation" className="bg-[#0c101d] text-white">SaaS Tool & Automation ($750 / PKR 210K)</option>
              <option value="E-Commerce Marketplace" className="bg-[#0c101d] text-white">E-Commerce Marketplace ($550 / PKR 150K)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-300">Estimated Budget Range</label>
          <select name="budget" className={inputClass} defaultValue="$450 - $750 (PKR 125,000 - 210,000)">
            <option value="$450 - $750 (PKR 125K - 210K) - Starter MVP" className="bg-[#0c101d] text-white">
              $450 - $750 (PKR 125,000 - 210,000) - Starter MVP
            </option>
            <option value="$750 - $1,200 (PKR 210K - 330K) - Full-Stack and Add-ons" className="bg-[#0c101d] text-white">
              $750 - $1,200 (PKR 210,000 - 330,000) - Full-Stack and Add-ons
            </option>
            <option value="$1,200+ (PKR 330K+) - Enterprise Platform" className="bg-[#0c101d] text-white">
              $1,200+ (PKR 330,000+) - Enterprise Platform
            </option>
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-300">Project Overview & Technical Scope *</label>
          <textarea
            name="message"
            required
            rows={4}
            placeholder="Tell us about the project goals, required feature modules, and target launch timeline..."
            className={inputClass}
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white py-3.5 text-xs sm:text-sm font-semibold shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Transmitting Project Brief...</span>
              </span>
            ) : (
              <>
                <span>Submit Project Brief to Engineering Desk</span>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Submission Confirmation Modal */}
      {showSuccessModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(12px)' }}
          onClick={() => setShowSuccessModal(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0c101d] text-slate-100 p-6 sm:p-8 text-center shadow-2xl animate-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-2xs">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h3 className="mt-4 font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
              Inquiry Received
            </h3>

            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-300 font-normal">
              Thank you {clientData.name ? <strong className="text-white">{clientData.name}</strong> : 'for reaching out'}. 
              Your project brief has been recorded directly into our engineering pipeline. Lead architect Aoun Abbas will review your technical requirements and respond within 24 hours.
            </p>

            <div className="mt-6 flex flex-col gap-2.5">
              <a
                href={getWhatsAppLeadLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 py-3 text-xs sm:text-sm font-semibold text-white shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-colors"
              >
                <span>Confirm on WhatsApp Channel</span>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="rounded-xl border border-white/10 px-5 py-2.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Contact;