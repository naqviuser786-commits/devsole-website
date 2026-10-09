import { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { siteSettings } from '@/data/siteData';

interface FAQData {
  q: string;
  a: string;
  icon: string;
}

const FAQS: FAQData[] = [
  {
    q: 'What is DEVSOLE’s typical project timeline and delivery pace?',
    icon: '⏱️',
    a: 'Most custom full-stack web applications and SaaS tools are engineered and live deployed within 2 to 4 weeks. We work in 1-week agile sprints with staging previews, allowing you to test and verify every module as it is built.',
  },
  {
    q: 'How does the payment milestone structure work?',
    icon: '💳',
    a: 'We work on transparent, risk-free milestones: typically 40% initial deposit to initiate architecture, 30% upon approval of the core feature build on staging, and 30% upon final production deployment and handover.',
  },
  {
    q: 'Do you sign an NDA (Non-Disclosure Agreement) before we discuss details?',
    icon: '🔒',
    a: 'Yes, absolutely. We strictly safeguard all client business logic and intellectual property. We are happy to sign your custom company NDA or provide our standard mutual NDA before you share confidential briefs.',
  },
  {
    q: 'Who owns the source code and database rights after completion?',
    icon: '📦',
    a: 'You retain 100% full intellectual property and code copyright ownership. Upon final milestone clearance, we hand over full GitHub repository control, hosting credentials, SQL database schemas, and documentation.',
  },
  {
    q: 'What happens after launch? Do you provide post-deployment support?',
    icon: '🛠️',
    a: 'Every project built by DEVSOLE includes 30 days of complimentary post-launch bug monitoring and performance tuning. We also offer dedicated monthly SLA retainer packages for ongoing feature expansion and server scaling.',
  },
  {
    q: 'Can DEVSOLE handle custom integrations (Payment Gateways, WhatsApp APIs, PDF Engines)?',
    icon: '🔌',
    a: 'Yes. Custom API pipelines are one of our core strengths. Whether you need Stripe/bank gateways, real-time WhatsApp notification webhooks, or automated PDF summary generators, we engineer rock-solid endpoints.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default
  const phone = siteSettings.whatsapp.replace(/\D/g, '');

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section
      id="faq"
      itemScope
      itemType="https://schema.org/FAQPage"
      aria-label="Frequently Asked Questions"
      className="relative mx-auto max-w-4xl px-4 sm:px-6 py-24 sm:py-28 overflow-hidden"
    >
      <SectionHeading
        eyebrow="Direct Clarity"
        title="Frequently Asked Questions"
        description="Everything you need to know about our engineering standards, payment security, and project lifecycle."
        align="center"
      />

      <div className="mt-12 sm:mt-14 space-y-4">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          const faqId = `faq-answer-${index}`;

          return (
            <div
              key={faq.q}
              itemScope
              itemType="https://schema.org/Question"
              itemProp="mainEntity"
              className={`overflow-hidden rounded-3xl border transition-all duration-300 ${
                isOpen
                  ? 'border-energy-bright/60 bg-gradient-to-b from-energy/10 via-navy-950/80 to-navy-950 shadow-[0_0_30px_rgba(0,240,255,0.12)]'
                  : 'border-white/10 bg-navy-950/60 hover:border-white/20 hover:bg-white/[0.03]'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                aria-controls={faqId}
                className="flex w-full items-center justify-between p-5 sm:p-7 text-left transition-colors"
              >
                <div className="flex items-center gap-3 sm:gap-4 pr-3">
                  <span className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-base sm:text-lg shadow-sm">
                    {faq.icon}
                  </span>

                  <span
                    itemProp="name"
                    className={`font-display text-sm sm:text-base font-semibold transition-colors ${
                      isOpen ? 'text-energy-bright' : 'text-white'
                    }`}
                  >
                    {faq.q}
                  </span>
                </div>

                {/* Animated Rotating + / - Badge */}
                <span
                  className={`ml-2 flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full border text-xs sm:text-sm font-bold transition-all duration-300 ${
                    isOpen
                      ? 'border-energy-bright bg-energy-bright text-navy-950 rotate-45 shadow-[0_0_15px_#00f0ff]'
                      : 'border-white/20 bg-white/5 text-chrome-300'
                  }`}
                >
                  +
                </span>
              </button>

              {isOpen && (
                <div
                  id={faqId}
                  itemScope
                  itemType="https://schema.org/Answer"
                  itemProp="acceptedAnswer"
                  className="px-5 pb-6 sm:px-7 sm:pb-7 text-xs sm:text-sm leading-relaxed text-chrome-300 border-t border-white/5 pt-4 animate-fade"
                >
                  <p itemProp="text">{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Direct Contact Prompt: 100% Responsive */}
      <div className="mt-12 rounded-3xl border border-white/10 bg-navy-950/80 p-6 sm:p-8 text-center backdrop-blur-md shadow-sm">
        <h4 className="font-display text-base sm:text-lg font-bold text-white">
          Have a unique requirement not covered here?
        </h4>
        <p className="mt-2 text-xs sm:text-sm text-chrome-400">
          Speak directly with founder & lead architect Aoun Abbas on WhatsApp.
        </p>
        <a
          href={`https://wa.me/${phone}?text=Hi%20Aoun,%20I%20have%20a%20specific%20question%20regarding%20a%20project.`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-energy-bright px-6 py-3 text-xs font-bold text-navy-950 shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-transform hover:scale-105 active:scale-95"
        >
          <span>💬 Ask Directly on WhatsApp →</span>
        </a>
      </div>
    </section>
  );
}