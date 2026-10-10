import { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { siteSettings } from '@/data/siteData';

interface FAQData {
  q: string;
  a: string;
}

const FAQS: FAQData[] = [
  {
    q: "What is DEVSOLE Soft's typical project timeline and delivery pace?",
    a: 'Most custom full-stack web applications and SaaS tools are engineered and live deployed within 2 to 4 weeks. We work in 1-week agile sprints with staging previews, allowing you to test and verify every module as it is built.',
  },
  {
    q: 'How does the payment milestone structure work?',
    a: 'We work on transparent, risk-free milestones: typically 40% initial deposit to initiate architecture, 30% upon approval of the core feature build on staging, and 30% upon final production deployment and handover.',
  },
  {
    q: 'Do you sign an NDA (Non-Disclosure Agreement) before we discuss details?',
    a: 'Yes, absolutely. We strictly safeguard all client business logic and intellectual property. We are happy to sign your custom company NDA or provide our standard mutual NDA before you share confidential briefs.',
  },
  {
    q: 'Who owns the source code and database rights after completion?',
    a: 'You retain 100% full intellectual property and code copyright ownership. Upon final milestone clearance, we hand over full GitHub repository control, hosting credentials, SQL database schemas, and documentation.',
  },
  {
    q: 'What happens after launch? Do you provide post-deployment support?',
    a: 'Every project built by DEVSOLE Soft includes 30 days of complimentary post-launch bug monitoring and performance tuning. We also offer dedicated monthly SLA retainer packages for ongoing feature expansion and server scaling.',
  },
  {
    q: 'Can DEVSOLE Soft handle custom integrations (Payment Gateways, WhatsApp APIs, PDF Engines)?',
    a: 'Yes. Custom API pipelines are one of our core strengths. Whether you need Stripe/bank gateways, real-time WhatsApp notification webhooks, or automated PDF summary generators, we engineer rock-solid endpoints.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const phone = (siteSettings?.whatsapp || '+923706492398').replace(/\D/g, '');

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section
      id="faq"
      itemScope
      itemType="https://schema.org/FAQPage"
      aria-label="Frequently Asked Questions"
      className="relative mx-auto max-w-5xl px-4 sm:px-6 py-20 sm:py-28 overflow-hidden bg-transparent"
    >
      {/* Subtle Studio Grid Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <SectionHeading
        eyebrow="Direct Clarity"
        title="Frequently Asked Questions"
        description="Everything you need to know about our engineering standards, payment security, and project lifecycle."
        align="center"
      />

      {/* Accordion Cards */}
      <div className="mt-12 sm:mt-14 space-y-3">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          const faqId = `faq-answer-${index}`;

          return (
            <div
              key={faq.q}
              itemScope
              itemType="https://schema.org/Question"
              itemProp="mainEntity"
              className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
                isOpen
                  ? 'border-blue-500/40 bg-[#0c101d] shadow-[0_4px_25px_rgba(59,130,246,0.1)]'
                  : 'border-white/10 bg-[#0c101d] hover:border-white/20'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                aria-controls={faqId}
                className="flex w-full items-center justify-between p-5 sm:p-6 text-left transition-colors"
              >
                <span
                  itemProp="name"
                  className={`font-display text-sm sm:text-base font-bold transition-colors pr-4 ${
                    isOpen ? 'text-blue-400' : 'text-slate-200'
                  }`}
                >
                  {faq.q}
                </span>

                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-xs font-bold transition-transform duration-200 ${
                    isOpen
                      ? 'border-blue-500/30 bg-blue-500/20 text-blue-400 rotate-45'
                      : 'border-white/10 bg-white/[0.04] text-slate-400'
                  }`}
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </button>

              {isOpen && (
                <div
                  id={faqId}
                  itemScope
                  itemType="https://schema.org/Answer"
                  itemProp="acceptedAnswer"
                  className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm leading-relaxed text-slate-400 border-t border-white/10 pt-3 animate-fade font-normal"
                >
                  <p itemProp="text">{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Direct Contact Prompt Banner */}
      <div className="mt-12 rounded-2xl border border-white/10 bg-[#0c101d] p-6 sm:p-8 text-center shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
        <h4 className="font-display text-base sm:text-lg font-bold text-white">
          Have a unique requirement not covered here?
        </h4>
        <p className="mt-1 text-xs sm:text-sm text-slate-400 font-normal">
          Speak directly with founder and lead architect Aoun Abbas on WhatsApp.
        </p>
        <a
          href={`https://wa.me/${phone}?text=Hi%20Aoun%20Abbas!%20I%20have%20a%20specific%20question%20regarding%20a%20project%20with%20DEVSOLE%20Soft.`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 text-xs font-semibold shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-colors"
        >
          <span>Ask Directly on WhatsApp</span>
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </section>
  );
}

export default FAQ;