// FILE: src/components/sections/Contact.tsx
import { useState, type FormEvent } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { siteSettings } from '@/data/siteData';
import { supabase } from '@/lib/supabase';
import { soundFX } from '@/lib/soundFx';

const inputClass =
  'w-full rounded-xl border border-white/10 bg-[#06080f] px-3.5 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:bg-white/[0.04] focus:outline-none transition-all font-sans';

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [clientData, setClientData] = useState({ name: '', service: '', phone: '', budget: '' });

  const phone = (siteSettings?.whatsapp || '+923706492398').replace(/\D/g, '');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    soundFX.playClick();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const name = (form.elements.namedItem('clientName') as HTMLInputElement)?.value;
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value;
    const clientPhone = (form.elements.namedItem('phone') as HTMLInputElement)?.value;
    const service = (form.elements.namedItem('service') as HTMLSelectElement)?.value;
    const budget = (form.elements.namedItem('budget') as HTMLSelectElement)?.value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement)?.value;

    let estValue = 500;
    if (budget.includes('750') || budget.includes('210,000')) estValue = 950;
    if (budget.includes('1,250') || budget.includes('350,000')) estValue = 1500;

    // 1. Dispatch Lead Directly into Supabase Cloud CRM (100% Preserved)
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
          source: 'Website Public Contact Form',
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

    // 2. Email Dispatch via FormSubmit Webhook (100% Preserved)
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
    const text = `Hi DEVSOLE Soft! I just submitted my project inquiry on your website:
- Name: ${clientData.name}
- Service Needed: ${clientData.service}
- Estimated Budget: ${clientData.budget}
- My WhatsApp: ${clientData.phone}

Looking forward to discussing the project.`;

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
        <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <div data-gsap="mask-up">
        <SectionHeading
          eyebrow="Get in Touch · Start a Project"
          title="Let's Build Something Great for Your Business"
          description="Speak directly with founder and lead developer Aoun Abbas. Submit your project requirements below, or send us a quick WhatsApp message to get an instant reply."
          align="center"
        />
      </div>

      {/* Main Intake Grid (5 Cols Info + 7 Cols Form) */}
      <div data-gsap="fade-up" className="mt-12 sm:mt-14 grid gap-8 lg:grid-cols-12 items-start">
        
        {/* Left Column: Direct Developer Channels & Commitments (5 Cols) */}
        <div className="space-y-4 lg:col-span-5">
          
          {/* Status Card */}
          <div className="rounded-2xl border border-white/10 bg-[#0c101d] p-5 sm:p-6 shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-pulse" />
                AVAILABLE FOR NEW PROJECTS
              </span>
              <span className="font-mono text-[10px] text-slate-400">Reply &lt; 15 mins</span>
            </div>

            <h3 className="mt-3.5 font-display text-lg sm:text-xl font-bold text-white">
              Direct Communication with Lead Developer
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
              You communicate directly with founder and lead developer Aoun Abbas. No non-technical sales agents, no communication delays, and no junior handoffs.
            </p>

            {/* Direct Channels List */}
            <div className="mt-5 space-y-2.5 font-mono text-xs">
              <a
                href={`https://wa.me/${phone}?text=Hi%20Aoun%20Abbas!%20I%20want%20to%20discuss%20a%20project%20with%20DEVSOLE%20Soft.`}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundFX.playClick()}
                className="flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 p-3.5 text-emerald-400 transition-colors shadow-2xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
                  <span className="font-bold font-sans">Priority WhatsApp Channel:</span>
                </div>
                <strong className="text-white">{siteSettings.whatsapp}</strong>
              </a>

              <a
                href={`mailto:${siteSettings.email}`}
                onClick={() => soundFX.playClick()}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-[#06080f] hover:border-white/20 p-3.5 text-slate-300 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="h-4 w-4 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span className="font-sans">Official Email Desk:</span>
                </div>
                <span className="text-slate-400 truncate max-w-[170px]">{siteSettings.email}</span>
              </a>

              <div className="flex items-center justify-between rounded-xl border border-white/5 bg-[#06080f] p-3.5 text-slate-400 text-[11px]">
                <div className="flex items-center gap-2">
                  <svg className="h-3.5 w-3.5 text-slate-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Office Location:</span>
                </div>
                <span className="text-slate-300 font-semibold">{siteSettings.address}</span>
              </div>
            </div>
          </div>

          {/* Confidentiality & Security Card */}
          <div className="rounded-2xl border border-white/10 bg-[#0c101d] p-5 shadow-[0_4px_25px_rgba(0,0,0,0.5)] flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-400">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <h4 className="font-display text-xs sm:text-sm font-bold text-white">
                100% Confidential Project Discussions
              </h4>
              <p className="mt-1 text-[11px] text-slate-400 leading-relaxed font-normal">
                Your business ideas, customer data, and requirements remain strictly confidential. We are happy to sign a mutual NDA before you share project files.
              </p>
            </div>
          </div>

        </div>

        {/* Right Column: Project Inquiry Form (7 Cols) */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-[#0c101d] p-6 sm:p-8 shadow-[0_12px_45px_rgba(0,0,0,0.6)] lg:col-span-7 space-y-4 sm:space-y-5"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-blue-400">
              PROJECT INQUIRY FORM
            </span>
            <span className="font-mono text-[10px] text-slate-500">Secure Direct Lead</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-300">Your Full Name *</label>
              <input name="clientName" required placeholder="e.g. Ali Khan / John Doe" className={inputClass} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-300">Email Address *</label>
              <input name="email" required type="email" placeholder="you@company.com" className={inputClass} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-300">WhatsApp / Phone Number *</label>
              <input name="phone" required placeholder="+92 300 0000000 / +1..." className={inputClass} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-300">Service Required *</label>
              <select name="service" required className={inputClass} defaultValue="Web Development">
                <option value="Web Development" className="bg-[#0c101d] text-white">
                  Custom Website or Web App
                </option>
                <option value="SEO & Google Ranking" className="bg-[#0c101d] text-white">
                  SEO & Google Search Ranking
                </option>
                <option value="E-Commerce Online Store" className="bg-[#0c101d] text-white">
                  E-Commerce Online Store
                </option>
                <option value="Real Estate & Business Portal" className="bg-[#0c101d] text-white">
                  Real Estate & Business Portal
                </option>
                <option value="Custom Calculators & Automation" className="bg-[#0c101d] text-white">
                  Custom Calculators & Business Tools
                </option>
                <option value="UI/UX & Website Redesign" className="bg-[#0c101d] text-white">
                  UI/UX Design & Website Redesign
                </option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-300">Estimated Budget Bracket</label>
            <select name="budget" className={inputClass} defaultValue="PKR 125,000 - 210,000 ($450 - $750)">
              <option value="PKR 125,000 - 210,000 ($450 - $750) - Starter Website" className="bg-[#0c101d] text-white">
                PKR 125,000 - 210,000 ($450 - $750) — Starter Website
              </option>
              <option value="PKR 210,000 - 350,000 ($750 - $1,250) - Standard Business / Store" className="bg-[#0c101d] text-white">
                PKR 210,000 - 350,000 ($750 - $1,250) — Standard Business / Store
              </option>
              <option value="PKR 350,000+ ($1,250+) - Custom Platform / Portal" className="bg-[#0c101d] text-white">
                PKR 350,000+ ($1,250+) — Custom Platform / Portal
              </option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-300">Tell Us About Your Project *</label>
            <textarea
              name="message"
              required
              rows={4}
              placeholder="What does your business do, which pages or features do you need, and when do you want to launch..."
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
                  <span>Submitting Details to Developers...</span>
                </span>
              ) : (
                <>
                  <span>Send Project Details & Get Reply</span>
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>

      </div>

      {/* Confirmation Modal */}
      {showSuccessModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade"
          style={{ backgroundColor: 'rgba(3, 5, 10, 0.85)', backdropFilter: 'blur(16px)' }}
          onClick={() => setShowSuccessModal(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0c101d] text-slate-100 p-6 sm:p-8 text-center shadow-[0_25px_60px_rgba(0,0,0,0.8)] animate-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-2xs">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h3 className="mt-4 font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
              Inquiry Received!
            </h3>

            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-300 font-normal">
              Thank you {clientData.name ? <strong className="text-white">{clientData.name}</strong> : ''}! 
              Your project details have been sent to our lead developer Aoun Abbas. We will review your requirements and reply within 15 minutes.
            </p>

            <div className="mt-6 flex flex-col gap-2.5">
              <a
                href={getWhatsAppLeadLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFX.playClick()}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 py-3 text-xs sm:text-sm font-semibold text-white shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-colors"
              >
                <span>Continue on WhatsApp (Faster Reply)</span>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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