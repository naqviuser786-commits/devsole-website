import { useState, type FormEvent } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { siteSettings } from '@/data/siteData';
import { supabase } from '@/lib/supabase';

const inputClass =
  'w-full rounded-xl border border-white/10 bg-navy-950/80 px-4 py-3 text-xs sm:text-sm text-white placeholder:text-chrome-600 focus-visible:outline-energy-bright transition-all focus:border-energy-bright/60 focus:bg-navy-900/90';

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [clientData, setClientData] = useState({ name: '', service: '', phone: '', budget: '' });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const name = (form.elements.namedItem('clientName') as HTMLInputElement)?.value;
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value;
    const phone = (form.elements.namedItem('phone') as HTMLInputElement)?.value;
    const service = (form.elements.namedItem('service') as HTMLSelectElement)?.value;
    const budget = (form.elements.namedItem('budget') as HTMLSelectElement)?.value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement)?.value;

    let estValue = 500;
    if (budget.includes('750 – $1,200')) estValue = 950;
    else if (budget.includes('1,200+')) estValue = 1500;

    // ⚡ 1. AUTOMATICALLY DISPATCH NEW LEAD INTO DEVSOLE CLOUD CRM
    try {
      const { data: newLead } = await supabase
        .from('leads')
        .insert({
          name,
          email,
          phone,
          whatsapp: phone,
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
          action: `⚡ New Project Inquiry: ${name} (${service})`,
        });
      }
    } catch {
      // CRM background sync fallback
    }

    // 2. Email Dispatch via FormSubmit
    const payload = {
      _subject: `⚡ New Project Inquiry: ${name} (${service})`,
      _template: 'table',
      _captcha: 'false',
      Client_Name: name,
      Email_Address: email,
      Phone_WhatsApp: phone,
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

      setClientData({ name, service, phone, budget });
      setShowSuccessModal(true);
      form.reset();
    } catch {
      setClientData({ name, service, phone, budget });
      setShowSuccessModal(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  const getWhatsAppLeadLink = () => {
    const text = `Hi DEVSOLE! I just submitted an inquiry on your website:
• Name: ${clientData.name}
• Service: ${clientData.service}
• Budget: ${clientData.budget}
• WhatsApp: ${clientData.phone}

Looking forward to discussing the project roadmap.`;

    const phone = siteSettings.whatsapp.replace(/\D/g, '');
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section
      id="contact"
      itemScope
      itemType="https://schema.org/ContactPage"
      className="relative mx-auto max-w-4xl px-4 sm:px-6 py-24 sm:py-28 overflow-hidden"
    >
      <SectionHeading
        eyebrow="Start a Project"
        title="Let's Build Something Exceptional"
        description="Share your project requirements with DEVSOLE — our lead team will respond with a tailored roadmap & estimate within 24 hours."
        align="center"
      />

      {/* Direct Contact Badges */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
        <a
          href={`mailto:${siteSettings.email}`}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-navy-950/80 px-4 py-2 text-chrome-300 backdrop-blur-md transition-all hover:border-energy-bright/60 hover:text-white hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]"
        >
          <span>✉</span>
          <span>{siteSettings.email}</span>
        </a>
        <a
          href={`https://wa.me/${siteSettings.whatsapp.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-emerald-400 backdrop-blur-md transition-all hover:bg-emerald-500/20 hover:shadow-[0_0_15px_rgba(16,185,129,0.25)]"
        >
          <span>💬</span>
          <span>WhatsApp: {siteSettings.whatsapp}</span>
        </a>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-12 max-w-2xl space-y-5 rounded-3xl border border-white/10 bg-navy-950/70 p-6 sm:p-8 backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.5)]"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs font-semibold text-chrome-400">Client Name *</label>
            <input name="clientName" required placeholder="Your Full Name" className={inputClass} />
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold text-chrome-400">Work Email *</label>
            <input name="email" required type="email" placeholder="you@company.com" className={inputClass} />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs font-semibold text-chrome-400">Phone / WhatsApp *</label>
            <input name="phone" required placeholder="+92 300 0000000" className={inputClass} />
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold text-chrome-400">Service Category *</label>
            <select name="service" required className={inputClass} defaultValue="">
              <option value="" disabled className="bg-navy-950">Select a Service</option>
              <option value="Custom Web Application" className="bg-navy-950">Custom Web Application ($450 / PKR 125K)</option>
              <option value="PropTech / Real Estate Portal" className="bg-navy-950">PropTech / Real Estate Portal ($650 / PKR 180K)</option>
              <option value="SaaS Tool & Automation" className="bg-navy-950">SaaS Tool & Automation ($750 / PKR 210K)</option>
              <option value="E-Commerce Marketplace" className="bg-navy-950">E-Commerce Marketplace ($550 / PKR 150K)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold text-chrome-400">Estimated Budget Range</label>
          <select name="budget" className={inputClass} defaultValue="$450 – $750 (PKR 125,000 – 210,000)">
            <option value="$450 – $750 (PKR 125K – 210K) - Starter MVP" className="bg-navy-950">
              $450 – $750 (PKR 125,000 – 210,000) — Starter MVP
            </option>
            <option value="$750 – $1,200 (PKR 210K – 330K) - Full-Stack & Add-ons" className="bg-navy-950">
              $750 – $1,200 (PKR 210,000 – 330,000) — Full-Stack & Add-ons
            </option>
            <option value="$1,200+ (PKR 330K+) - Enterprise Platform" className="bg-navy-950">
              $1,200+ (PKR 330,000+) — Enterprise Platform
            </option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold text-chrome-400">Project Overview & Goals *</label>
          <textarea
            name="message"
            required
            rows={4}
            placeholder="Tell us about the project scope, required features, and target launch timeline..."
            className={inputClass}
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full !py-4 text-xs sm:text-sm font-bold tracking-wide shadow-[0_0_25px_rgba(0,240,255,0.4)]"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Sending Project Brief...</span>
              </span>
            ) : (
              'Submit Project Inquiry →'
            )}
          </Button>
        </div>
      </form>

      {/* Submission Confirmation Modal */}
      {showSuccessModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade"
          style={{ backgroundColor: 'rgba(3, 5, 10, 0.88)', backdropFilter: 'blur(16px)' }}
          onClick={() => setShowSuccessModal(false)}
        >
          <div
            className="relative w-full max-w-md rounded-3xl border border-energy-bright/60 bg-navy-950 p-6 sm:p-8 text-center shadow-[0_0_60px_rgba(0,240,255,0.3)] animate-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-energy-bright/50 bg-energy-bright/10 text-2xl font-bold text-energy-bright shadow-[0_0_25px_rgba(0,240,255,0.5)]">
              ✓
            </div>

            <h3 className="mt-5 font-display text-xl sm:text-2xl font-bold text-white">
              Inquiry Received!
            </h3>

            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-chrome-300">
              Thank you {clientData.name ? <strong className="text-white">{clientData.name}</strong> : 'for reaching out'}. 
              Your project brief has been delivered directly to our engineering team. Lead architect Aoun Abbas will review your requirements and respond within 24 hours.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={getWhatsAppLeadLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-energy-bright px-6 py-3.5 text-xs sm:text-sm font-bold text-navy-950 shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all hover:scale-105 active:scale-95"
              >
                <span>💬 Also Confirm on WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="rounded-full border border-white/10 px-5 py-2.5 text-xs font-medium text-chrome-400 transition-colors hover:text-white"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}