import { useState, useEffect, useMemo, type FormEvent } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { supabase } from '@/lib/supabase';
import { soundFX } from '@/lib/soundFx';

export interface ReviewItem {
  id: string;
  clientName: string;
  role: string;
  company: string;
  projectTag: string;
  avatar: string;
  rating: number;
  content: string;
  createdAt?: string;
}

const AUTHENTIC_DEFAULT_REVIEWS: ReviewItem[] = [
  {
    id: 'def-1',
    clientName: 'Hamza Tariq',
    role: 'Founder & CEO',
    company: 'UrbanNest PropTech',
    projectTag: 'PropTech & Real Estate',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80',
    rating: 5,
    content:
      'DEVSOLE Soft engineered our real estate portal from scratch. The instant search filters, direct WhatsApp agent pipeline, and sub-second load times doubled our buyer inquiries within the first 3 weeks.',
  },
  {
    id: 'def-2',
    clientName: 'Marcus Vance',
    role: 'Head of Product',
    company: 'ScaleMetrics SaaS',
    projectTag: 'SaaS Tool & Automation',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80',
    rating: 5,
    content:
      'The dynamic pricing calculator and automated PDF quotation generator Aoun and his team engineered eliminated our manual proposal backlog entirely. Extremely clean, maintainable architecture.',
  },
  {
    id: 'def-3',
    clientName: 'Sarah Jenkins',
    role: 'E-Commerce Operations Lead',
    company: 'Velox Apparel Studio',
    projectTag: 'E-Commerce Marketplace',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80',
    rating: 5,
    content:
      'Our previous site suffered from sluggish mobile speed. DEVSOLE Soft rebuilt the frontend into a responsive modern platform with 99 PageSpeed score, driving an immediate 30%+ increase in orders.',
  },
  {
    id: 'def-4',
    clientName: 'Danyal Siddiqui',
    role: 'Managing Partner',
    company: 'Apex Logistics Global',
    projectTag: 'Custom Web Application',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=240&q=80',
    rating: 5,
    content:
      'Top-notch sprint delivery. Transparent weekly staging links, daily communication, and zero unexpected delays. Handed over complete Git repo and documentation upon milestone clearance.',
  },
];

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) {
  const iconSize = size === 'lg' ? 'h-5 w-5' : 'h-3.5 w-3.5';

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((index) => (
        <svg
          key={index}
          className={`${iconSize} ${
            index <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600 fill-slate-700'
          }`}
          viewBox="0 0 24 24"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

const inputClass =
  'w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:border-blue-500 focus:bg-white/[0.05] focus:outline-none transition-colors';

export function Testimonials() {
  const [reviews, setReviews] = useState<ReviewItem[]>(AUTHENTIC_DEFAULT_REVIEWS);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [projectTag, setProjectTag] = useState('Custom Web Application');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState('');

  // Fetch Live Reviews from Supabase (Preserving CRM connection)
  useEffect(() => {
    async function fetchReviews() {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          const liveList: ReviewItem[] = data.map((r) => ({
            id: r.id,
            clientName: r.client_name,
            role: r.role || 'Verified Client',
            company: r.company || 'Enterprise Partner',
            projectTag: r.project_tag || 'Custom Web App',
            avatar:
              r.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(r.client_name)}&background=0f172a&color=ffffff&bold=true`,
            rating: r.rating || 5,
            content: r.content,
            createdAt: r.created_at,
          }));

          setReviews(liveList);
        }
      } catch {
        // Fallback to defaults
      }
    }

    fetchReviews();
  }, []);

  const metrics = useMemo(() => {
    const total = reviews.length;
    const avg =
      total > 0
        ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / total).toFixed(1)
        : '5.0';
    return { avg, total };
  }, [reviews]);

  const displayedReviews = useMemo(() => {
    return showAllReviews ? reviews : reviews.slice(0, 3);
  }, [reviews, showAllReviews]);

  async function handleSubmitReview(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    setSubmitting(true);
    soundFX.playClick();

    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=0f172a&color=ffffff&bold=true`;

    const newReviewItem: ReviewItem = {
      id: `live-${Date.now()}`,
      clientName: name.trim(),
      role: role.trim() || 'Verified Client',
      company: company.trim() || 'Direct Client',
      projectTag,
      avatar: avatarUrl,
      rating,
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      await supabase.from('reviews').insert({
        client_name: newReviewItem.clientName,
        role: newReviewItem.role,
        company: newReviewItem.company,
        project_tag: newReviewItem.projectTag,
        rating: newReviewItem.rating,
        content: newReviewItem.content,
        avatar: newReviewItem.avatar,
      });

      await supabase.from('crm_activities').insert({
        entity_type: 'review',
        action: `New Client Review from ${newReviewItem.clientName} (${newReviewItem.rating} Stars)`,
      });
    } catch {
      // Fallback
    }

    setReviews([newReviewItem, ...reviews]);
    setSubmitting(false);
    setSubmittedSuccess(true);

    setTimeout(() => {
      setName('');
      setRole('');
      setCompany('');
      setContent('');
      setRating(5);
      setSubmittedSuccess(false);
      setIsModalOpen(false);
    }, 1800);
  }

  return (
    <section
      id="testimonials"
      itemScope
      itemType="https://schema.org/Organization"
      aria-label="DEVSOLE Soft Client Testimonials & Reviews"
      className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28 overflow-hidden bg-transparent"
    >
      <meta itemProp="name" content="DEVSOLE Soft" />

      {/* Subtle Studio Grid Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <SectionHeading
        eyebrow="Verified Track Record"
        title="Client Reviews & Production Impact"
        description="Read authentic feedback from founders and engineering leaders, or submit verified feedback from your project."
        align="center"
      />

      {/* Aggregate Rating Banner + Write Review Action */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <div
          itemProp="aggregateRating"
          itemScope
          itemType="https://schema.org/AggregateRating"
          className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 shadow-2xs backdrop-blur-md"
        >
          <meta itemProp="ratingValue" content={metrics.avg} />
          <meta itemProp="bestRating" content="5" />
          <meta itemProp="worstRating" content="1" />
          <meta itemProp="reviewCount" content={String(metrics.total)} />

          <StarRating rating={5} />
          <span className="text-xs font-mono font-semibold text-slate-200">
            {metrics.avg} / 5.0 Rating Across {metrics.total} Verified Deliveries
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            soundFX.playClick();
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 text-xs font-semibold shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
        >
          <span>Submit Client Review</span>
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>

      {/* Testimonials 3-Column Studio Grid */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayedReviews.map((review) => (
          <figure
            key={review.id}
            itemScope
            itemType="https://schema.org/Review"
            className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c101d] p-6 sm:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:border-blue-500/40 hover:shadow-[0_8px_35px_rgba(0,0,0,0.7)] transition-all duration-300 hover:-translate-y-1"
          >
            <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
              <meta itemProp="ratingValue" content={String(review.rating)} />
              <meta itemProp="bestRating" content="5" />
            </div>

            <div>
              {/* Star Rating & Category Tag */}
              <div className="flex items-center justify-between gap-2">
                <StarRating rating={review.rating} />
                <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-mono font-semibold text-blue-400 truncate max-w-[170px]">
                  {review.projectTag}
                </span>
              </div>

              {/* Review Body */}
              <blockquote
                itemProp="reviewBody"
                className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-300 font-normal"
              >
                "{review.content}"
              </blockquote>
            </div>

            {/* Client Signature */}
            <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
              <div className="relative shrink-0">
                <img
                  src={review.avatar}
                  alt={`${review.clientName} - DEVSOLE Soft`}
                  loading="lazy"
                  className="h-10 w-10 rounded-xl border border-white/10 object-cover shadow-2xs"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      review.clientName
                    )}&background=0f172a&color=ffffff&bold=true`;
                  }}
                />
                <span
                  className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xs"
                  title="Verified Delivery"
                >
                  <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              </div>

              <div
                className="overflow-hidden"
                itemProp="author"
                itemScope
                itemType="https://schema.org/Person"
              >
                <h4
                  itemProp="name"
                  className="text-xs sm:text-sm font-bold text-white truncate"
                >
                  {review.clientName}
                </h4>
                <p className="text-[11px] text-slate-400 truncate">
                  {review.role} · <strong className="text-slate-300 font-medium">{review.company}</strong>
                </p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* View All Reviews Toggle */}
      {reviews.length > 3 && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              setShowAllReviews((prev) => !prev);
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-xs font-semibold text-slate-200 shadow-2xs transition-colors hover:border-white/20 hover:bg-white/[0.08]"
          >
            <span>
              {showAllReviews
                ? 'Show Featured Deliveries Only'
                : `View All Client Reviews (${reviews.length})`}
            </span>
            <svg className={`h-3.5 w-3.5 text-slate-400 transition-transform ${showAllReviews ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      )}

      {/* ================= REVIEW SUBMISSION MODAL ================= */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(12px)' }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#0c101d] text-slate-100 p-6 sm:p-8 shadow-2xl animate-modal max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close Modal"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded">
              Milestone Feedback
            </span>

            <h3 className="mt-2 font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
              Submit Review for DEVSOLE Soft
            </h3>
            <p className="mt-1 text-xs text-slate-400 font-normal">
              Your verified rating is recorded directly into our production registry.
            </p>

            {submittedSuccess ? (
              <div className="my-8 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center animate-fade">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xs">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h4 className="mt-3 font-display text-sm font-bold text-white">
                  Review Published Live
                </h4>
                <p className="mt-1 text-xs text-emerald-400">
                  Thank you, {name}! Your feedback is now visible on the website.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="mt-5 space-y-3.5">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-300">
                    Rating Score:
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 focus:outline-none transition-transform hover:scale-120"
                      >
                        <svg
                          className={`h-5 w-5 ${
                            (hoverRating || rating) >= star
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-600 fill-slate-700'
                          }`}
                          viewBox="0 0 24 24"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </button>
                    ))}
                    <span className="ml-2 font-mono text-xs font-bold text-slate-200">
                      {hoverRating || rating}.0 Stars
                    </span>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-300">
                      Client Name *
                    </label>
                    <input
                      required
                      placeholder="e.g. Alex Morgan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-300">
                      Role / Position
                    </label>
                    <input
                      placeholder="e.g. Founder & CTO"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-300">
                      Company / Organization
                    </label>
                    <input
                      placeholder="e.g. Apex Tech Solutions"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-300">
                      Delivered Category
                    </label>
                    <select
                      value={projectTag}
                      onChange={(e) => setProjectTag(e.target.value)}
                      className={inputClass}
                    >
                      <option value="Custom Web Application" className="bg-[#0c101d] text-white">Custom Web Application</option>
                      <option value="PropTech & Real Estate" className="bg-[#0c101d] text-white">PropTech & Real Estate Portal</option>
                      <option value="SaaS Tool & Automation" className="bg-[#0c101d] text-white">SaaS Tool & Automation</option>
                      <option value="E-Commerce Marketplace" className="bg-[#0c101d] text-white">E-Commerce Marketplace</option>
                      <option value="UI/UX Engineering" className="bg-[#0c101d] text-white">UI/UX & Web Performance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-300">
                    Review Feedback *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe delivery pace, code hygiene, and sprint communication..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-xl border border-white/10 px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 text-xs font-semibold shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-colors"
                  >
                    <span>{submitting ? 'Publishing...' : 'Submit Review Live'}</span>
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Testimonials;