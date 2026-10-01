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

const DEFAULT_REVIEWS: ReviewItem[] = [
  {
    id: '1',
    clientName: 'Malik Rehan',
    role: 'Managing Director',
    company: 'Real Space Properties',
    projectTag: 'PropTech Portal',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80',
    rating: 5,
    content:
      'DEVSOLE engineered our entire real estate marketplace from the ground up. The live search filters and direct WhatsApp lead routing doubled our qualified buyer inquiries in the very first month. Cleanest PHP architecture I have seen.',
  },
  {
    id: '2',
    clientName: 'David Vance',
    role: 'Co-Founder & Product Lead',
    company: 'SaaS Estimators Co.',
    projectTag: 'SaaS Tool & Automation',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80',
    rating: 5,
    content:
      'The automated pricing calculator and instant PDF quotation generator Aoun and his team engineered completely eliminated our manual client proposal workflow. Sub-second speed and bulletproof logic. Highly recommended.',
  },
  {
    id: '3',
    clientName: 'Zainab Tariq',
    role: 'E-Commerce Operations Lead',
    company: 'Nexus Apparel Studio',
    projectTag: 'Dynamic E-Commerce',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80',
    rating: 5,
    content:
      'Our previous site was painfully slow and losing mobile checkouts. DEVSOLE rebuilt the frontend into a responsive modern masterpiece with 99 Google PageSpeed score. Our checkout completion rate jumped by 34%.',
  },
];

const inputClass =
  'w-full rounded-xl border border-white/10 bg-navy-950 px-4 py-2.5 text-xs text-white placeholder:text-chrome-600 focus:border-energy-bright focus:outline-none transition-colors';

export function Testimonials() {
  const [reviews, setReviews] = useState<ReviewItem[]>(DEFAULT_REVIEWS);
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

  // Fetch Live Reviews from Supabase & LocalStorage
  useEffect(() => {
    async function fetchReviews() {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          const formatted: ReviewItem[] = data.map((r) => ({
            id: r.id,
            clientName: r.client_name,
            role: r.role || 'Client',
            company: r.company || 'Enterprise Partner',
            projectTag: r.project_tag || 'Web Solution',
            avatar:
              r.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(r.client_name)}&background=021526&color=00f0ff&bold=true`,
            rating: r.rating || 5,
            content: r.content,
            createdAt: r.created_at,
          }));

          // Merge live reviews with defaults without duplicate IDs
          setReviews([...formatted, ...DEFAULT_REVIEWS]);
        } else {
          // Check local storage for offline/temporary reviews
          const cached = localStorage.getItem('devsole_live_reviews');
          if (cached) {
            try {
              const parsed = JSON.parse(cached);
              setReviews([...parsed, ...DEFAULT_REVIEWS]);
            } catch {
              // fallback
            }
          }
        }
      } catch {
        // network fallback
      }
    }

    fetchReviews();
  }, []);

  // Compute Live Rating Metrics
  const metrics = useMemo(() => {
    const total = reviews.length;
    const avg =
      total > 0
        ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / total).toFixed(1)
        : '5.0';
    return { avg, total };
  }, [reviews]);

  // Handle Review Submission
  async function handleSubmitReview(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    setSubmitting(true);
    soundFX.playClick();

    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=021526&color=00f0ff&bold=true`;

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
      // 1. Save to Supabase database
      await supabase.from('reviews').insert({
        client_name: newReviewItem.clientName,
        role: newReviewItem.role,
        company: newReviewItem.company,
        project_tag: newReviewItem.projectTag,
        rating: newReviewItem.rating,
        content: newReviewItem.content,
        avatar: newReviewItem.avatar,
      });

      // ✅ Is se replace karein:
await supabase.from('crm_activities').insert({
  entity_type: 'review',
  action: `⭐ New Client Review from ${newReviewItem.clientName} (${newReviewItem.rating}★)`,
});
    } catch {
      // Background error ignored, will save to state & localStorage
    }

    // 3. Instant UI update & local backup
    const updated = [newReviewItem, ...reviews];
    setReviews(updated);

    const localOnly = updated.filter((r) => r.id.startsWith('live-'));
    localStorage.setItem('devsole_live_reviews', JSON.stringify(localOnly));

    setSubmitting(false);
    setSubmittedSuccess(true);

    // Reset Form
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
    <section id="testimonials" className="relative mx-auto max-w-6xl px-4 sm:px-6 py-24 sm:py-28 overflow-hidden">
      <SectionHeading
        eyebrow="Social Proof & Impact"
        title="Backed by Proven Client Success"
        description="Read verified feedback from founders and engineering teams, or share your own experience working with DEVSOLE."
        align="center"
      />

      {/* Trust Score Rating Banner + Add Review Action */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-energy-bright/40 bg-energy-bright/10 px-4 py-2 backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.15)]">
          <span className="text-yellow-400 font-bold">★★★★★</span>
          <span className="text-xs font-semibold text-energy-bright font-mono">
            {metrics.avg} / 5.0 Rating Across {metrics.total} Client Reviews
          </span>
        </div>

        {/* ✍️ Live Add Review Button */}
        <button
          type="button"
          onClick={() => {
            soundFX.playClick();
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-full bg-energy-bright px-5 py-2 text-xs font-bold text-navy-950 shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all hover:scale-105 active:scale-95"
        >
          <span>✍️ Write a Review</span>
        </button>
      </div>

      {/* Testimonials 3-Column Grid */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <figure
            key={review.id}
            className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-navy-950/70 p-6 sm:p-8 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-energy-bright/50 hover:bg-white/[0.04] hover:shadow-[0_0_35px_rgba(0,240,255,0.18)]"
          >
            <div>
              {/* Stars & Project Tag */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex text-yellow-400 text-sm tracking-wider">
                  {'★'.repeat(review.rating)}
                  {'☆'.repeat(5 - review.rating)}
                </div>
                <span className="rounded-full border border-energy/30 bg-energy/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-energy-bright truncate max-w-[140px]">
                  {review.projectTag}
                </span>
              </div>

              {/* Review Quote */}
              <blockquote className="mt-5 text-xs sm:text-sm leading-relaxed text-chrome-300">
                “{review.content}”
              </blockquote>
            </div>

            {/* Client Info with Avatar */}
            <figcaption className="mt-6 flex items-center gap-3.5 border-t border-white/5 pt-5">
              <div className="relative shrink-0">
                <img
                  src={review.avatar}
                  alt={review.clientName}
                  loading="lazy"
                  className="h-11 w-11 sm:h-12 sm:w-12 rounded-2xl border-2 border-energy-bright/40 object-cover shadow-[0_0_15px_rgba(0,240,255,0.25)] transition-transform duration-300 group-hover:scale-105 group-hover:border-energy-bright"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      review.clientName
                    )}&background=021526&color=00f0ff&bold=true`;
                  }}
                />
                <span
                  className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-energy-bright text-[9px] font-black text-navy-950 shadow-[0_0_8px_#00f0ff]"
                  title="Verified Client"
                >
                  ✓
                </span>
              </div>

              <div className="overflow-hidden">
                <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-energy-bright transition-colors truncate">
                  {review.clientName}
                </h4>
                <p className="text-[11px] text-chrome-400 truncate">
                  {review.role} ·{' '}
                  <span className="font-semibold text-energy-bright/90">
                    {review.company}
                  </span>
                </p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* 🚀 Interactive Submit Review Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade"
          style={{ backgroundColor: 'rgba(3, 5, 10, 0.88)', backdropFilter: 'blur(16px)' }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl border border-energy-bright/60 bg-navy-900/95 p-6 sm:p-8 shadow-[0_0_60px_rgba(0,240,255,0.25)] animate-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-bold text-white transition-colors hover:border-energy-bright hover:bg-energy/20 hover:text-energy-bright"
            >
              ✕
            </button>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-energy-bright/40 bg-energy/10 px-3 py-1 text-xs font-semibold text-energy-bright">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-energy-bright" />
              Client Feedback
            </span>

            <h3 className="mt-3 font-display text-xl sm:text-2xl font-bold text-white">
              Leave a Review for DEVSOLE
            </h3>
            <p className="mt-1 text-xs text-chrome-400">
              Your feedback is published live to inspire prospective founders and businesses.
            </p>

            {submittedSuccess ? (
              <div className="my-8 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-center animate-fade">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400 text-xl font-bold text-navy-950 shadow-[0_0_20px_#10b981]">
                  ✓
                </div>
                <h4 className="mt-3 font-display text-base font-bold text-white">
                  Review Published Live!
                </h4>
                <p className="mt-1 text-xs text-chrome-300">
                  Thank you, {name}! Your review is now visible on the website.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="mt-5 space-y-4">
                {/* Interactive Star Rating */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-chrome-300">
                    Your Rating:
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="text-2xl transition-transform hover:scale-125 focus:outline-none"
                      >
                        <span
                          className={
                            (hoverRating || rating) >= star
                              ? 'text-yellow-400 drop-shadow-[0_0_8px_#facc15]'
                              : 'text-white/20'
                          }
                        >
                          ★
                        </span>
                      </button>
                    ))}
                    <span className="ml-2 font-mono text-xs font-bold text-energy-bright">
                      {hoverRating || rating}.0 / 5.0
                    </span>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-chrome-400">
                      Your Name *
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
                    <label className="mb-1 block text-xs font-semibold text-chrome-400">
                      Role / Title
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
                    <label className="mb-1 block text-xs font-semibold text-chrome-400">
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
                    <label className="mb-1 block text-xs font-semibold text-chrome-400">
                      Project Delivered
                    </label>
                    <select
                      value={projectTag}
                      onChange={(e) => setProjectTag(e.target.value)}
                      className={inputClass}
                    >
                      <option value="Custom Web Application" className="bg-navy-950">
                        Custom Web Application
                      </option>
                      <option value="PropTech & Real Estate" className="bg-navy-950">
                        PropTech & Real Estate Portal
                      </option>
                      <option value="SaaS Tool & Automation" className="bg-navy-950">
                        SaaS Tool & Automation
                      </option>
                      <option value="E-Commerce Marketplace" className="bg-navy-950">
                        E-Commerce Marketplace
                      </option>
                      <option value="UI/UX Engineering" className="bg-navy-950">
                        UI/UX & Web Performance
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-chrome-400">
                    Your Review Feedback *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Share your experience working with DEVSOLE, project speed, code quality, and delivery communication..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-xl border border-white/10 px-4 py-2.5 text-xs text-chrome-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-xl bg-energy-bright px-6 py-2.5 text-xs font-bold text-navy-950 shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    {submitting ? 'Publishing...' : 'Publish Review Live →'}
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