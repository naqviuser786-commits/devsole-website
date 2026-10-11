// FILE: src/components/sections/FAQ.tsx
import { useState, useMemo } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { siteSettings } from '@/data/siteData';
import { soundFX } from '@/lib/soundFx';

type FaqCategory = 'all' | 'pricing' | 'process' | 'ownership';

interface FAQData {
  id: string;
  q: string;
  a: string;
  category: 'pricing' | 'process' | 'ownership';
  badge: string;
  badgeColor: string;
}

const FAQS: FAQData[] = [
  {
    id: 'pricing',
    q: 'How much does a website or software project typically cost?',
    category: 'pricing',
    badge: 'Fixed Pricing (PKR & USD)',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    a: 'Our starter business websites start from PKR 125,000 ($450 USD), online shopping stores from PKR 150,000 ($550 USD), and specialized real estate portals from PKR 180,000 ($650 USD). You can also use our interactive Cost Calculator on this page to select your exact page count and features for an instant fixed quote with zero hidden charges.',
  },
  {
    id: 'timeline',
    q: 'How long does it take to design and launch my website?',
    category: 'process',
    badge: '2 - 3 Weeks Delivery',
    badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    a: 'Most custom websites, online stores, and portals are completed and launched within 2 to 3 weeks. We work in structured weekly stages and provide you with a private preview link at every step so you can click through, review the progress on your phone, and approve the work before we move forward.',
  },
  {
    id: 'payment',
    q: 'How do payments work? Do I have to pay everything upfront?',
    category: 'pricing',
    badge: '3 Safe Milestones',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    a: 'Never. We operate on a 100% safe 3-stage milestone framework: 40% initial deposit to start project planning and design, 30% only after you test and approve the working preview link on your phone, and the final 30% only after your website is live on your domain and all files are handed over to you.',
  },
  {
    id: 'ownership',
    q: 'Who owns the website, source code, and domain accounts after launch?',
    category: 'ownership',
    badge: '100% Client Owned',
    badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    a: 'You own 100% of your website, code files, database, and accounts. Upon final project completion, we hand over all GitHub repository files, hosting logins, and admin passwords directly to you. There are zero recurring monthly lock-in fees or proprietary platform dependencies.',
  },
  {
    id: 'mobile-speed',
    q: 'Will my website load fast on mobile phones and rank on Google?',
    category: 'process',
    badge: 'Under 1-Second Load Speed',
    badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    a: 'Yes, guaranteed. All our websites are built mobile-first and optimized to load in under 1 second (< 0.8s) even on mobile 4G. We also set up clean on-page SEO, Google sitemaps, and schema tags so your business ranks higher and gets discovered easily on Google search.',
  },
  {
    id: 'support',
    q: 'What happens after launch? Do you provide support if something breaks?',
    category: 'ownership',
    badge: 'Free 30-Day Support',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    a: 'Every project includes 30 days of free post-launch support and bug fixes. If you ever need technical help, updates, or new feature additions down the road, our lead developer Aoun Abbas is always available directly on WhatsApp for ongoing support.',
  },
  {
    id: 'integrations',
    q: 'Can you connect online card payments and direct WhatsApp buttons?',
    category: 'process',
    badge: 'WhatsApp & Card Payments',
    badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    a: 'Yes, absolutely. We integrate online card payment gateways, bank transfers, Cash on Delivery (COD), and direct WhatsApp buttons that allow customers to send pre-filled order or inquiry messages directly to your phone within seconds.',
  },
];

export function FAQ() {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const phone = (siteSettings?.whatsapp || '+923706492398').replace(/\D/g, '');

  const filteredFaqs = useMemo(() => {
    if (activeCategory === 'all') return FAQS;
    return FAQS.filter((f) => f.category === activeCategory);
  }, [activeCategory]);

  const toggle = (i: number) => {
    soundFX.playClick();
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section
      id="faq"
      itemScope
      itemType="https://schema.org/FAQPage"
      aria-label="Frequently Asked Questions about Web Development and Pricing"
      className="relative mx-auto max-w-5xl px-4 sm:px-6 py-20 sm:py-28 overflow-hidden bg-transparent"
    >
      {/* Subtle Studio Grid Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <div data-gsap="mask-up">
        <SectionHeading
          eyebrow="Questions & Answers · Clarity"
          title="Frequently Asked Questions"
          description="Everything you need to know about our project pricing, 3-stage milestone payments, delivery timelines, mobile speed, and 100% code ownership."
          align="center"
        />
      </div>

      {/* Segmented Category Filter Bar */}
      <div data-gsap="fade-up" className="mt-8 flex justify-center">
        <div className="inline-flex max-w-full items-center rounded-xl border border-white/10 bg-[#080c18] p-1 shadow-2xs overflow-x-auto">
          {[
            { id: 'all', label: 'All Questions (7)' },
            { id: 'pricing', label: 'Pricing & Payments' },
            { id: 'process', label: 'Timelines & Speed' },
            { id: 'ownership', label: 'Ownership & Support' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                soundFX.playClick();
                setActiveCategory(cat.id as FaqCategory);
                setOpenIndex(0);
              }}
              className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all duration-150 ${
                activeCategory === cat.id
                  ? 'bg-blue-600/20 text-white shadow-2xs border border-blue-500/30 font-bold'
                  : 'text-slate-400 hover:text-white font-medium'
              }`}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List with Stagger Animation */}
      <div data-gsap="stagger-group" className="mt-8 sm:mt-10 space-y-3">
        {filteredFaqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const faqId = `faq-answer-${faq.id}`;

          return (
            <div
              key={faq.id}
              itemScope
              itemType="https://schema.org/Question"
              itemProp="mainEntity"
              className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
                isOpen
                  ? 'border-blue-500/50 bg-[#0c101d] shadow-[0_4px_25px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/30'
                  : 'border-white/10 bg-[#0c101d] hover:border-white/20 hover:bg-[#0e1322]'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                onMouseEnter={() => soundFX.playHover()}
                aria-expanded={isOpen}
                aria-controls={faqId}
                className="flex w-full items-center justify-between p-5 sm:p-6 text-left transition-colors"
              >
                <div className="pr-4 space-y-1.5">
                  <span className={`inline-block rounded border px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider ${faq.badgeColor}`}>
                    {faq.badge}
                  </span>
                  <h3
                    itemProp="name"
                    className={`font-display text-sm sm:text-base font-bold transition-colors ${
                      isOpen ? 'text-white' : 'text-slate-200'
                    }`}
                  >
                    {faq.q}
                  </h3>
                </div>

                {/* Animated Plus/Minus Toggle Icon */}
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border text-xs font-bold transition-all duration-200 ${
                    isOpen
                      ? 'border-blue-500/40 bg-blue-600 text-white rotate-45 shadow-[0_0_12px_rgba(59,130,246,0.3)]'
                      : 'border-white/10 bg-white/[0.04] text-slate-400'
                  }`}
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
                  className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm leading-relaxed text-slate-300 border-t border-white/10 pt-4 animate-fade font-normal"
                >
                  <p itemProp="text">{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Direct Clarification Desk Banner */}
      <div data-gsap="fade-up" className="mt-12 rounded-2xl border border-white/10 bg-[#0c101d] p-6 sm:p-8 text-center shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-blue-400 shadow-2xs mb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_#3b82f6]" />
          <span>Have a Specific Question?</span>
        </div>

        <h4 className="font-display text-base sm:text-lg font-bold text-white mt-1">
          Have a question about your project that isn't answered here?
        </h4>
        <p className="mt-1 text-xs sm:text-sm text-slate-400 font-normal max-w-lg mx-auto">
          Ask founder and lead developer Aoun Abbas directly on WhatsApp. We typically reply within 15 minutes.
        </p>

        <a
          href={`https://wa.me/${phone}?text=Hi%20Aoun%20Abbas!%20I%20have%20a%20question%20about%20a%20website%20project%20with%20DEVSOLE%20Soft.`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundFX.playClick()}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 text-xs font-semibold shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-colors"
        >
          <span>Ask Directly on WhatsApp</span>
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </section>
  );
}

export default FAQ;