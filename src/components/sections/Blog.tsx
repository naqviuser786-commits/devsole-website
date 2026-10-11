// FILE: src/components/sections/Blog.tsx
import { useState, useMemo } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { siteSettings } from '@/data/siteData';
import { soundFX } from '@/lib/soundFx';

type BlogCategory = 'all' | 'calculators' | 'proptech' | 'speed';

interface ArticleDetail {
  id: string;
  title: string;
  category: 'calculators' | 'proptech' | 'speed';
  tag: string;
  readTime: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
  metricBadge: string;
  content: {
    intro: string;
    codeSnippet?: string;
    points: { title: string; desc: string }[];
    conclusion: string;
  };
}

const ARTICLES: ArticleDetail[] = [
  {
    id: '1',
    title: 'How an Instant Price Calculator Can 3x Your Website Inquiries',
    category: 'calculators',
    tag: 'Calculators & Tools',
    readTime: '3 min read',
    author: 'Aoun Abbas · Founder & Lead Developer',
    date: 'Case Study',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    metricBadge: '3x More Leads',
    excerpt:
      'Clients hate waiting 24 hours for a manual quote email. Discover how interactive online price calculators pre-qualify customers and send you ready-to-buy leads.',
    content: {
      intro:
        'In today’s fast-moving business world, potential customers expect instant answers. When a client visits your website and has to wait 24 to 48 hours for someone to email them a quote, over 60% of them look up your competitors in the meantime. Adding an instant price calculator to your website completely changes how fast visitors turn into buyers.',
      codeSnippet: `// Instant Live Cost Calculation (Zero Lag)
const totalCost = useMemo(() => {
  const basePrice = selectedPackage.price;
  const extraFeatures = activeAddons.reduce((sum, item) => sum + item.cost, 0);
  return (basePrice + extraFeatures) * pageCountMultiplier;
}, [selectedPackage, activeAddons, pageCountMultiplier]);`,
      points: [
        {
          title: '1. Customers Pre-Qualify Themselves Before Calling You',
          desc: 'Instead of wasting time on calls with people who cannot afford your services, clients select their own features and see the price upfront. When they message you, they already know and accept your price bracket.',
        },
        {
          title: '2. Instant Downloadable Branded PDF Proposals',
          desc: 'With our automated PDF engine, visitors can click one button and download an official PDF quote with your company logo to show their boss or business partners immediately.',
        },
        {
          title: '3. Direct WhatsApp Lead Message with Calculation Details',
          desc: 'When a customer clicks to book, their exact selected options, pages count, and total budget are automatically typed into WhatsApp so you know exactly what they need before you even say hello.',
        },
      ],
      conclusion:
        'At DEVSOLE Soft, we build custom interactive calculators for real estate firms, agencies, and service businesses to turn casual visitors into confident buyers on the spot.',
    },
  },
  {
    id: '2',
    title: 'Why Real Estate Websites Need Direct WhatsApp Routing to Close Deals',
    category: 'proptech',
    tag: 'Real Estate Portals',
    readTime: '4 min read',
    author: 'Aoun Abbas · Founder & Lead Developer',
    date: 'Real Estate Guide',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    metricBadge: 'Instant Agent WhatsApp',
    excerpt:
      'Traditional email contact forms lose over half of property buyers on mobile. Discover how instant search filters and direct WhatsApp buttons close property deals on the spot.',
    content: {
      intro:
        'Most real estate websites use heavy, slow templates where property pages take forever to load on mobile phones. When an interested buyer finally clicks a property, they are forced to fill out a long contact form that sits in an email inbox for days. By that time, the buyer has already found another broker.',
      codeSnippet: `SELECT id, title, price, agent_whatsapp 
FROM properties 
WHERE status = 'ACTIVE' AND city = 'Lahore' 
ORDER BY created_at DESC LIMIT 20;`,
      points: [
        {
          title: '1. Instant Property Filters that Never Freeze',
          desc: 'Buyers can filter by city, price bracket, house size (5 Marla, 10 Marla, 1 Kanal), or commercial type in under a second without the whole page reloading.',
        },
        {
          title: '2. Direct WhatsApp Agent Buttons with Pre-Filled Details',
          desc: 'Every property card has a direct WhatsApp button. When clicked, the message automatically says: "Hi! I am interested in [Property Name] listed for PKR [Price]" so your agents can reply immediately.',
        },
        {
          title: '3. Mobile-First High-Resolution Photo Galleries',
          desc: 'Over 80% of property searches happen on smartphones. We build clean, lightweight photo and floorplan galleries that open instantly even on normal 4G mobile connections.',
        },
      ],
      conclusion:
        'Our custom real estate platforms help brokers and real estate agencies capture and close high-value buyer leads with zero delays and zero lost inquiries.',
    },
  },
  {
    id: '3',
    title: 'How We Make Websites Load in Under 1 Second (And Why It Matters)',
    category: 'speed',
    tag: 'Speed & SEO',
    readTime: '4 min read',
    author: 'Aoun Abbas · Founder & Lead Developer',
    date: 'Speed & Google Rank',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    metricBadge: '< 0.8s Load Speed',
    excerpt:
      'Slow websites kill ad campaigns and Google rankings. Discover how clean code and indexed databases make websites open instantly on 4G phones without expensive server costs.',
    content: {
      intro:
        'There is a common myth that making a website fast requires expensive $200/month hosting servers. In reality, websites are slow because they are built on heavy templates filled with 30+ unverified plugins that bog down mobile phones. We achieve under 1-second load speeds through clean code and efficient database indexing.',
      codeSnippet: `// Fast Server Response (Instant 14ms Execution)
header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: public, max-age=60');
header('X-Response-Time: 14.2ms');
echo json_encode(['status' => 'success', 'data' => $cleanRecords]);`,
      points: [
        {
          title: '1. Zero Unnecessary Plugins to Slow You Down',
          desc: 'We write clean, bespoke code that runs only the exact features your business needs. This eliminates the heavy background files that slow down standard WordPress and page-builder themes.',
        },
        {
          title: '2. Fast Database Indexes that Prevent Lag',
          desc: 'When an unindexed website searches through thousands of products or listings, it freezes the server. We add custom database indexes so searches return results in milliseconds.',
        },
        {
          title: '3. Global Fast Edge CDN Delivery',
          desc: 'We deliver your website files from global edge servers closest to your visitor, ensuring sub-second opening speeds in Pakistan, the UAE, the UK, and the USA alike.',
        },
      ],
      conclusion:
        'Speed directly drives revenue. A website that loads in under 1 second keeps visitors happy, ranks higher on Google, and gets more phone calls and WhatsApp messages.',
    },
  },
];

export function Blog() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>('all');
  const [activeArticle, setActiveArticle] = useState<ArticleDetail | null>(null);
  const phone = (siteSettings?.whatsapp || '+923706492398').replace(/\D/g, '');

  const filteredArticles = useMemo(() => {
    if (activeCategory === 'all') return ARTICLES;
    return ARTICLES.filter((a) => a.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="blog"
      itemScope
      itemType="https://schema.org/Blog"
      aria-label="DEVSOLE Soft Articles and Case Studies"
      className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28 overflow-hidden bg-transparent"
    >
      <meta itemProp="name" content="DEVSOLE Soft Case Studies & Guides" />
      <meta
        itemProp="description"
        content="Practical guides on fast web development, real estate portals, online price calculators, and Google SEO ranking."
      />

      {/* Subtle Studio Grid Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <div data-gsap="mask-up">
        <SectionHeading
          eyebrow="Practical Guides · Real Results"
          title="Case Studies & Business Guides"
          description="Read how fast loading websites, instant online calculators, and direct WhatsApp routing help businesses get more clients and close more sales."
          align="center"
        />
      </div>

      {/* Segmented Category Filter Bar */}
      <div data-gsap="fade-up" className="mt-8 flex justify-center">
        <div className="inline-flex max-w-full items-center rounded-xl border border-white/10 bg-[#080c18] p-1 shadow-2xs overflow-x-auto">
          {[
            { id: 'all', label: 'All Articles (3)' },
            { id: 'calculators', label: 'Online Calculators' },
            { id: 'proptech', label: 'Real Estate Portals' },
            { id: 'speed', label: 'Speed & SEO' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                soundFX.playClick();
                setActiveCategory(cat.id as BlogCategory);
              }}
              className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-xs font-semibold transition-all duration-150 ${
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

      {/* Article Cards Grid (Clean Human Studio Cards — Zero AI Window Dots) */}
      <div data-gsap="stagger-group" className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((post) => (
          <article
            key={post.id}
            itemScope
            itemType="https://schema.org/BlogPosting"
            itemProp="blogPost"
            onClick={() => {
              soundFX.playClick();
              setActiveArticle(post);
            }}
            onMouseEnter={() => soundFX.playHover()}
            className="group flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0c101d] p-3 shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:border-blue-500/40 hover:shadow-[0_8px_35px_rgba(0,0,0,0.7)] transition-all duration-300 hover:-translate-y-1"
          >
            <meta itemProp="headline" content={post.title} />
            <meta itemProp="image" content={post.image} />
            <div itemProp="author" itemScope itemType="https://schema.org/Person">
              <meta itemProp="name" content="Aoun Abbas" />
            </div>

            <div>
              {/* Media Preview Frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-[#080c18] shadow-inner">
                <img
                  src={post.image}
                  alt={`${post.title} - DEVSOLE Soft`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-102"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent opacity-80" />
                
                {/* Clean Badges */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="rounded-md border border-white/20 bg-black/75 px-2 py-0.5 text-[10px] font-mono font-semibold text-white backdrop-blur-md">
                    {post.tag}
                  </span>
                </div>

                <div className="absolute top-2.5 right-2.5">
                  <span className="rounded-md border border-emerald-500/30 bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-400 backdrop-blur-md">
                    {post.metricBadge}
                  </span>
                </div>

                <span className="absolute bottom-2.5 right-2.5 font-mono text-[10px] text-slate-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-md">
                  {post.readTime}
                </span>
              </div>

              {/* Text Description */}
              <div className="p-3.5 sm:p-4">
                <h3 className="font-display text-base sm:text-lg font-bold leading-snug text-white transition-colors group-hover:text-blue-400">
                  {post.title}
                </h3>
                <p
                  itemProp="description"
                  className="mt-1.5 text-xs leading-relaxed text-slate-400 line-clamp-3 font-normal"
                >
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4 pt-0">
              <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs font-semibold text-blue-400 group-hover:text-blue-300">
                <span>Read Full Case Study</span>
                <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ================= CASE STUDY READING MODAL ================= */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade"
          style={{ backgroundColor: 'rgba(3, 5, 10, 0.85)', backdropFilter: 'blur(16px)' }}
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0c101d] p-6 sm:p-9 shadow-[0_25px_60px_rgba(0,0,0,0.8)] animate-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute right-5 top-5 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close Article"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Banner Media Frame */}
            <div className="relative mb-6 aspect-[16/8] w-full overflow-hidden rounded-xl border border-white/10 bg-[#080c18] shadow-sm">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <span className="rounded-md border border-white/20 bg-black/75 px-2.5 py-0.5 text-xs font-mono font-semibold text-white backdrop-blur-md">
                  {activeArticle.tag}
                </span>
                <span className="rounded-md border border-emerald-500/30 bg-emerald-500/20 px-2.5 py-0.5 text-xs font-mono font-bold text-emerald-400 backdrop-blur-md">
                  {activeArticle.metricBadge}
                </span>
              </div>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-bold leading-tight text-white tracking-tight">
              {activeArticle.title}
            </h2>

            {/* Author Credibility Pill */}
            <div className="mt-3 flex items-center gap-2 text-xs font-mono font-semibold text-slate-300 bg-white/[0.04] border border-white/10 px-3 py-1.5 rounded-lg w-max">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_#3b82f6]" />
              <span>{activeArticle.author}</span>
            </div>

            {/* Main Article Content */}
            <div className="mt-5 space-y-4 border-t border-white/10 pt-5 text-sm leading-relaxed text-slate-300">
              <p className="text-slate-200 font-medium text-base leading-relaxed">
                {activeArticle.content.intro}
              </p>

              {/* Code Snippet Box (If Present) */}
              {activeArticle.content.codeSnippet && (
                <div className="rounded-xl border border-white/10 bg-[#06080f] p-4 font-mono text-xs">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-white/5 pb-2 mb-2">
                    <span>CODE_SNIPPET</span>
                    <span className="text-emerald-400 font-semibold">PRODUCTION_READY</span>
                  </div>
                  <pre className="text-slate-300 overflow-x-auto leading-relaxed">
                    {activeArticle.content.codeSnippet}
                  </pre>
                </div>
              )}

              {/* Breakdown Points */}
              <div className="space-y-3.5 rounded-xl border border-white/10 bg-white/[0.02] p-5">
                {activeArticle.content.points.map((pt, i) => (
                  <div key={i}>
                    <h4 className="font-display text-sm sm:text-base font-bold text-white">
                      {pt.title}
                    </h4>
                    <p className="mt-1 text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                      {pt.desc}
                    </p>
                  </div>
                ))}
              </div>

              <p className="italic text-slate-400 font-normal border-l-2 border-blue-500 pl-3">
                {activeArticle.content.conclusion}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
              <div>
                <p className="text-xs font-bold text-white">Want to build this for your business?</p>
                <p className="text-[11px] text-slate-400 font-normal">Discuss directly with lead developer Aoun Abbas.</p>
              </div>

              <div className="flex items-center gap-2.5">
                <a
                  href={`https://wa.me/${phone}?text=Hi%20Aoun%20Abbas!%20I%20read%20your%20case%20study%20on%20"${encodeURIComponent(activeArticle.title)}"%20and%20want%20to%20build%20this%20for%20my%20business.`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFX.playClick()}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 text-xs font-semibold shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-colors"
                >
                  <span>Discuss Solution on WhatsApp</span>
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="rounded-xl border border-white/10 px-4 py-2.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Blog;