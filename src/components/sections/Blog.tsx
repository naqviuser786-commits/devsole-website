import { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { siteSettings } from '@/data/siteData';

interface ArticleDetail {
  id: string;
  title: string;
  tag: string;
  readTime: string;
  author: string;
  image: string;
  excerpt: string;
  content: {
    intro: string;
    points: { title: string; desc: string }[];
    conclusion: string;
  };
}

const ARTICLES: ArticleDetail[] = [
  {
    id: '1',
    title: 'Why Your Business Needs an Automated Real-Time Pricing Calculator',
    tag: 'SaaS & Automation',
    readTime: '3 min read',
    author: 'Aoun Abbas - Founder & Lead Architect',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'Manual quotations can often disengage clients. Discover how instant dynamic estimators can increase your conversion rates by 3x.',
    content: {
      intro:
        'In modern digital commerce, prospective clients expect instant answers. When a potential customer has to wait 24 to 48 hours for a manual quotation email, over 60% of them explore competitors in the interim. Implementing an automated interactive pricing calculator fundamentally transforms client acquisition.',
      points: [
        {
          title: '1. Upfront Pre-Qualification of Budgets',
          desc: 'Interactive estimators allow clients to self-select features, screen scopes, and add-ons. By the time they contact your sales desk, they already understand your pricing tiers, eliminating unqualified inquiries.',
        },
        {
          title: '2. Instant PDF Quotation Generation',
          desc: 'With custom serverless or PHP PDF generation engines, the system automatically packages selected options into a branded estimate summary that clients can present to their internal procurement teams immediately.',
        },
        {
          title: '3. Direct High-Intent Lead Routing',
          desc: 'By capturing calculated totals directly into WhatsApp or CRM webhooks, your team receives the exact scope breakdown before the first consultation call begins.',
        },
      ],
      conclusion:
        'At DEVSOLE Soft, we engineer custom estimator tools tailored for service firms, SaaS startups, and enterprise agencies to turn passive visitors into pre-sold buyers.',
    },
  },
  {
    id: '2',
    title: 'How Full-Stack PropTech Applications Boost Real Estate Client Conversions',
    tag: 'PropTech & Real Estate',
    readTime: '4 min read',
    author: 'Aoun Abbas - Founder & Lead Architect',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'Learn how advanced property search filters and direct lead integrations automate business workflows for real estate brokers.',
    content: {
      intro:
        'Conventional real estate agency websites rely on heavy, bloated templates that suffer from sluggish mobile load speeds and fragmented search queries. A custom-engineered PropTech web application solves the friction between property discovery and agent contact.',
      points: [
        {
          title: '1. Sub-Second Multi-Filter Search',
          desc: 'By utilizing indexed relational MySQL queries, users can filter by location, price bracket, square footage, and property category in milliseconds without full page refreshes.',
        },
        {
          title: '2. Direct WhatsApp Agent Routing',
          desc: 'Instead of complex multi-step contact forms, each property card features direct verified agent routing with property ID pre-filled in the inquiry payload.',
        },
        {
          title: '3. Responsive Mobile-First Property Cards',
          desc: 'Over 78% of real estate searches occur on mobile devices. Custom CSS layouts ensure high-resolution floorplans and gallery assets load smoothly even on cellular data.',
        },
      ],
      conclusion:
        'Our Real Space Properties platform showcases how modern PropTech architecture helps brokerage teams capture and close buyer leads with zero operational drag.',
    },
  },
  {
    id: '3',
    title: 'Optimizing PHP and MySQL Performance for Fast Web Applications',
    tag: 'Engineering Architecture',
    readTime: '4 min read',
    author: 'Aoun Abbas - Founder & Lead Architect',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'How to achieve millisecond load speeds without heavy servers by utilizing lightweight architecture and indexed database queries.',
    content: {
      intro:
        'There is a common misconception that high-speed web performance requires multi-thousand-dollar server infrastructure. In reality, sub-second response times are achieved through clean code hygiene, zero plugin bloat, and relational database indexing.',
      points: [
        {
          title: '1. Strategic Composite Indexing in MySQL',
          desc: 'Unindexed database queries scan thousands of rows on every request. Structuring composite indexes on high-frequency search columns reduces database execution time from 800ms to less than 15ms.',
        },
        {
          title: '2. Eliminating Framework & Plugin Overhead',
          desc: 'Bespoke PHP server endpoints execute only the exact business logic required for the request, bypassing the massive memory footprint of generic multi-purpose CMS platforms.',
        },
        {
          title: '3. Asset Pipeline Compression and Edge Caching',
          desc: 'Combining gzip/brotli compression with strict HTTP cache-control headers allows global CDNs to serve repeated assets directly from edge nodes without hitting the origin server.',
        },
      ],
      conclusion:
        'DEVSOLE Soft designs systems where speed is treated as a fundamental feature, ensuring maximum SEO rank, instant user engagement, and minimal infrastructure expense.',
    },
  },
];

export function Blog() {
  const [activeArticle, setActiveArticle] = useState<ArticleDetail | null>(null);
  const phone = (siteSettings?.whatsapp || '+923706492398').replace(/\D/g, '');

  return (
    <section
      id="blog"
      itemScope
      itemType="https://schema.org/Blog"
      aria-label="DEVSOLE Soft Engineering Insights & Articles"
      className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28 overflow-hidden bg-transparent"
    >
      <meta itemProp="name" content="DEVSOLE Soft Engineering Blog" />
      <meta
        itemProp="description"
        content="Deep dives into full-stack web engineering, PropTech innovations, and SaaS automation by our team."
      />

      {/* Subtle Studio Grid Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <SectionHeading
        eyebrow="Insights & Architecture"
        title="From the DEVSOLE Soft Engineering Desk"
        description="Deep dives into full-stack web engineering, PropTech innovations, and SaaS automation by our core team."
        align="left"
      />

      {/* Blog Cards Grid */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ARTICLES.map((post) => (
          <article
            key={post.id}
            itemScope
            itemType="https://schema.org/BlogPosting"
            itemProp="blogPost"
            onClick={() => setActiveArticle(post)}
            className="group flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0c101d] p-2.5 shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:border-blue-500/40 hover:shadow-[0_8px_35px_rgba(0,0,0,0.7)] transition-all duration-300 hover:-translate-y-1"
          >
            <meta itemProp="headline" content={post.title} />
            <meta itemProp="image" content={post.image} />
            <div itemProp="author" itemScope itemType="https://schema.org/Person">
              <meta itemProp="name" content="Aoun Abbas" />
            </div>

            <div>
              {/* Cover Image Frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-[#080c18] shadow-inner">
                <div className="absolute top-0 inset-x-0 z-10 flex items-center justify-between bg-[#06080f] border-b border-white/10 px-3 py-1.5 backdrop-blur-md">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-[#ff5f56]" />
                    <div className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
                    <div className="h-2 w-2 rounded-full bg-[#27c93f]" />
                  </div>
                  <span className="font-mono text-[9px] text-slate-400">Technical Case Study</span>
                  <span className="font-mono text-[9px] text-slate-300 font-semibold">{post.readTime}</span>
                </div>

                <img
                  src={post.image}
                  alt={`${post.title} - DEVSOLE Soft`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                <span className="absolute bottom-2.5 left-2.5 rounded-md border border-white/20 bg-black/75 px-2 py-0.5 text-[10px] font-mono font-semibold text-white backdrop-blur-md">
                  {post.tag}
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
                <span>Read Full Insight</span>
                <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ================= ARTICLE READING MODAL ================= */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(12px)' }}
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0c101d] p-6 sm:p-9 shadow-2xl animate-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute right-5 top-5 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close Article"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Banner Image */}
            <div className="relative mb-6 aspect-[16/8] w-full overflow-hidden rounded-xl border border-white/10 bg-[#080c18] shadow-sm">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <span className="rounded-md border border-white/20 bg-black/75 px-2.5 py-0.5 text-xs font-mono font-semibold text-white backdrop-blur-md">
                  {activeArticle.tag}
                </span>
                <span className="rounded-md border border-white/20 bg-black/75 px-2.5 py-0.5 text-xs font-mono font-medium text-white backdrop-blur-md">
                  {activeArticle.readTime}
                </span>
              </div>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-bold leading-tight text-white tracking-tight">
              {activeArticle.title}
            </h2>

            {/* Author Badge */}
            <div className="mt-3 flex items-center gap-2 text-xs font-mono font-semibold text-slate-300 bg-white/[0.04] border border-white/10 px-3 py-1 rounded-lg w-max">
              <svg className="h-3.5 w-3.5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
              <span>{activeArticle.author}</span>
            </div>

            {/* Content Points */}
            <div className="mt-5 space-y-4 border-t border-white/10 pt-5 text-sm leading-relaxed text-slate-300">
              <p className="text-slate-200 font-medium text-base leading-relaxed">
                {activeArticle.content.intro}
              </p>

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

              <p className="italic text-slate-400 font-normal">
                {activeArticle.content.conclusion}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
              <div>
                <p className="text-xs font-bold text-white">Ready to implement this for your business?</p>
                <p className="text-[11px] text-slate-400 font-normal">Connect directly with our lead engineering desk.</p>
              </div>

              <div className="flex items-center gap-2.5">
                <a
                  href={`https://wa.me/${phone}?text=Hi%20Aoun,%20I%20read%20your%20article%20on%20"${encodeURIComponent(activeArticle.title)}"%20and%20want%20to%20implement%20this.`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 text-xs font-semibold shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-colors"
                >
                  <span>Discuss on WhatsApp</span>
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="rounded-xl border border-white/10 px-4 py-2.5 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
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