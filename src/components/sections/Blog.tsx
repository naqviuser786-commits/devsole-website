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
    author: 'AOUN ABBAS · Founder & Lead Architect',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
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
        'At DEVSOLE, we engineer custom estimator tools tailored for service firms, SaaS startups, and enterprise agencies to turn passive visitors into pre-sold buyers.',
    },
  },
  {
    id: '2',
    title: 'How Full-Stack PropTech Applications Boost Real Estate Client Conversions',
    tag: 'PropTech',
    readTime: '4 min read',
    author: 'AOUN ABBAS · Founder & Lead Architect',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=80',
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
    title: 'Optimizing PHP & MySQL Performance for Fast Web Applications',
    tag: 'Engineering',
    readTime: '4 min read',
    author: 'AOUN ABBAS · Founder & Lead Architect',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
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
          title: '3. Asset Pipeline Compression & Edge Caching',
          desc: 'Combining gzip/brotli compression with strict HTTP cache-control headers allows global CDNs to serve repeated assets directly from edge nodes without hitting the origin server.',
        },
      ],
      conclusion:
        'DEVSOLE designs systems where speed is treated as a fundamental feature, ensuring maximum SEO rank, instant user engagement, and minimal infrastructure expense.',
    },
  },
];

export function Blog() {
  const [activeArticle, setActiveArticle] = useState<ArticleDetail | null>(null);

  return (
    <section
      id="blog"
      itemScope
      itemType="https://schema.org/Blog"
      aria-label="DEVSOLE Engineering Insights & Articles"
      className="relative mx-auto max-w-6xl px-4 sm:px-6 py-24 sm:py-28 overflow-hidden"
    >
      <meta itemProp="name" content="DEVSOLE Engineering Blog" />
      <meta
        itemProp="description"
        content="Deep dives into full-stack web engineering, PropTech innovations, and SaaS automation by our team."
      />

      <SectionHeading
        eyebrow="Insights & Articles"
        title="From the DEVSOLE Engineering Blog"
        description="Deep dives into full-stack web engineering, PropTech innovations, and SaaS automation by our team."
        align="left"
      />

      {/* Blog Cards Grid with Schema.org/BlogPosting */}
      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {ARTICLES.map((post) => (
          <article
            key={post.id}
            itemScope
            itemType="https://schema.org/BlogPosting"
            itemProp="blogPost"
            onClick={() => setActiveArticle(post)}
            className="group flex cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-navy-950/70 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-energy-bright/60 hover:bg-white/[0.04] hover:shadow-[0_0_35px_rgba(0,240,255,0.2)]"
          >
            <meta itemProp="headline" content={post.title} />
            <meta itemProp="image" content={post.image} />
            <div itemProp="author" itemScope itemType="https://schema.org/Person">
              <meta itemProp="name" content="Aoun Abbas" />
            </div>

            <div>
              {/* Cover Image Frame with Tag */}
              <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/10 bg-navy-900">
                <img
                  src={post.image}
                  alt={`${post.title} — DEVSOLE Engineering`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-70" />
                <span className="absolute bottom-3 left-3 rounded-full border border-energy-bright/40 bg-navy-950/90 px-3 py-0.5 text-[10px] font-bold text-energy-bright backdrop-blur-md">
                  {post.tag}
                </span>
                <span className="absolute top-3 right-3 rounded-full border border-white/10 bg-navy-950/80 px-2.5 py-0.5 text-[10px] font-medium text-chrome-400 backdrop-blur-md">
                  {post.readTime}
                </span>
              </div>

              {/* Text Description */}
              <div className="p-6">
                <h3 className="font-display text-base sm:text-lg font-bold leading-snug text-white transition-colors group-hover:text-energy-bright">
                  {post.title}
                </h3>
                <p
                  itemProp="description"
                  className="mt-2.5 text-xs sm:text-sm leading-relaxed text-chrome-400 line-clamp-3"
                >
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-0">
              <div className="flex items-center justify-between border-t border-white/5 pt-4 text-xs font-semibold text-energy-bright">
                <span>Read Full Insight</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* 🚀 ARTICLE READING MODAL POPUP: 100% Responsive */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade"
          style={{ backgroundColor: 'rgba(3, 5, 10, 0.88)', backdropFilter: 'blur(16px)' }}
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-energy-bright/50 bg-navy-950 p-6 sm:p-10 shadow-[0_0_60px_rgba(0,240,255,0.25)] animate-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute right-5 top-5 sm:right-6 sm:top-6 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-navy-950/80 text-sm font-bold text-white transition-colors hover:border-energy-bright hover:bg-energy/20 hover:text-energy-bright"
            >
              ✕
            </button>

            {/* Modal Large Article Banner */}
            <div className="relative mb-6 aspect-[16/8] w-full overflow-hidden rounded-2xl border border-white/10 bg-navy-900 shadow-lg">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <span className="rounded-full border border-energy-bright/50 bg-navy-950/90 px-3 py-1 text-xs font-bold text-energy-bright backdrop-blur-md">
                  {activeArticle.tag}
                </span>
                <span className="rounded-full border border-white/10 bg-navy-950/80 px-3 py-1 text-xs text-chrome-400 backdrop-blur-md">
                  {activeArticle.readTime}
                </span>
              </div>
            </div>

            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold leading-tight text-white">
              {activeArticle.title}
            </h2>

            {/* Author Badge */}
            <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-energy-bright">
              <span>✍</span>
              <span>{activeArticle.author}</span>
            </div>

            {/* Article Content */}
            <div className="mt-6 space-y-6 border-t border-white/10 pt-6 text-sm sm:text-base leading-relaxed text-chrome-300">
              <p className="text-chrome-200">{activeArticle.content.intro}</p>

              <div className="space-y-5 rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                {activeArticle.content.points.map((pt, i) => (
                  <div key={i}>
                    <h4 className="font-display text-base font-bold text-white">
                      {pt.title}
                    </h4>
                    <p className="mt-1.5 text-xs sm:text-sm text-chrome-400">
                      {pt.desc}
                    </p>
                  </div>
                ))}
              </div>

              <p className="italic text-chrome-400">
                {activeArticle.content.conclusion}
              </p>
            </div>

            {/* Direct Conversion CTA */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
              <div>
                <p className="text-xs font-bold text-white">Ready to implement this for your business?</p>
                <p className="text-[11px] text-chrome-500">Connect directly with our engineering team.</p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={`https://wa.me/${siteSettings.whatsapp.replace(/\D/g, '')}?text=Hi%20Aoun,%20I%20read%20your%20article%20on%20"${encodeURIComponent(activeArticle.title)}"%20and%20want%20to%20implement%20this.`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-energy-bright px-5 py-2.5 text-xs font-bold text-navy-950 shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all hover:scale-105"
                >
                  <span>💬 Discuss on WhatsApp →</span>
                </a>
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="rounded-full border border-white/10 px-4 py-2.5 text-xs font-medium text-chrome-400 hover:text-white"
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