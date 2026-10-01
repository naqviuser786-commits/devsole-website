import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useCrmAuth } from '../CrmAuthContext';

interface ReviewRecord {
  id: string;
  client_name: string;
  role?: string | null;
  company?: string | null;
  project_tag?: string | null;
  rating: number;
  content: string;
  avatar?: string | null;
  created_at: string;
}

export function CrmReviews() {
  const { profile } = useCrmAuth();
  const [reviews, setReviews] = useState<ReviewRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [ratingFilter, setRatingFilter] = useState<string>('all');

  const fetchReviews = useCallback(async () => {
    try {
      const { data } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      setReviews(data || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  async function handleDelete(id: string, name: string) {
    if (!window.confirm(`Are you sure you want to permanently delete review from "${name}"?`)) {
      return;
    }

    await supabase.from('reviews').delete().eq('id', id);

    // Activity log in CRM
    await supabase.from('crm_activities').insert({
      entity_type: 'review',
      action: `Deleted review from ${name}`,
      performed_by: profile?.id,
    });

    // Also remove from localStorage if cached
    const cached = localStorage.getItem('devsole_live_reviews');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        const updated = parsed.filter((r: { id: string }) => r.id !== id);
        localStorage.setItem('devsole_live_reviews', JSON.stringify(updated));
      } catch {
        // fallback
      }
    }

    fetchReviews();
  }

  const filtered = reviews.filter((r) => {
    const matchesSearch =
      r.client_name.toLowerCase().includes(search.toLowerCase()) ||
      r.content.toLowerCase().includes(search.toLowerCase()) ||
      r.company?.toLowerCase().includes(search.toLowerCase());

    const matchesRating =
      ratingFilter === 'all'
        ? true
        : ratingFilter === '5'
        ? r.rating === 5
        : ratingFilter === '4'
        ? r.rating === 4
        : r.rating <= 3;

    return matchesSearch && matchesRating;
  });

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
      : '5.0';

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Client Reviews Management</h1>
          <p className="text-xs text-chrome-500">
            Moderate, review, and delete spam or negative reviews from the live website.
          </p>
        </div>

        {/* Quick Stats Pills */}
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-1.5 text-xs text-chrome-300">
            Total Reviews: <strong className="text-white font-mono">{reviews.length}</strong>
          </div>
          <div className="rounded-xl border border-energy-bright/40 bg-energy/10 px-3.5 py-1.5 text-xs text-energy-bright font-bold font-mono">
            ★ {avgRating} / 5.0 Avg
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-3 text-xs">
        <input
          type="text"
          placeholder="Search by client name, company, or review text..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-xl border border-white/10 bg-navy-950 px-4 py-2.5 text-white placeholder:text-chrome-600 focus:border-energy-bright focus:outline-none"
        />

        <select
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
          className="rounded-xl border border-white/10 bg-navy-950 px-3 py-2.5 text-white focus:border-energy-bright focus:outline-none"
        >
          <option value="all">All Ratings</option>
          <option value="5">5 Stars Only (★★★★★)</option>
          <option value="4">4 Stars Only (★★★★☆)</option>
          <option value="3">3 Stars & Below (★★★☆☆)</option>
        </select>
      </div>

      {/* Reviews Table / List */}
      <div className="overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md">
        {loading ? (
          <div className="py-12 text-center text-xs text-chrome-500">Loading reviews...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-chrome-500">
            No reviews matching your filter.
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filtered.map((rev) => (
              <div
                key={rev.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 transition-colors hover:bg-white/[0.02]"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-sm font-bold text-white">
                      {rev.client_name}
                    </span>
                    <span className="text-yellow-400 text-xs">
                      {'★'.repeat(rev.rating)}
                      {'☆'.repeat(5 - rev.rating)}
                    </span>
                    <span className="rounded-full border border-energy/30 bg-energy/10 px-2.5 py-0.5 text-[9px] font-semibold text-energy-bright">
                      {rev.project_tag || 'Web Project'}
                    </span>
                  </div>

                  <p className="text-xs text-chrome-400">
                    {rev.role ? `${rev.role} · ` : ''}
                    <strong className="text-chrome-300">{rev.company || 'Client'}</strong>
                    {rev.created_at && (
                      <span className="ml-2 text-[10px] text-chrome-600 font-mono">
                        ({new Date(rev.created_at).toLocaleDateString()})
                      </span>
                    )}
                  </p>

                  <p className="text-xs text-chrome-300 leading-relaxed max-w-3xl">
                    “{rev.content}”
                  </p>
                </div>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => handleDelete(rev.id, rev.client_name)}
                  className="rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-2 text-xs font-semibold text-red-400 hover:border-red-500 hover:bg-red-500/20 transition-all shrink-0"
                >
                  🗑️ Delete Review
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}