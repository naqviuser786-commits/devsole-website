// FILE: src/components/ui/DiscoveryModal.tsx
import { useState, useEffect, useMemo, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { siteSettings } from '@/data/siteData';
import { soundFX } from '@/lib/soundFx';

interface DiscoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Direct Action' | 'Financial & Pricing' | 'Architecture & Work' | 'Sprint & Team';
  badge: string;
  icon: ReactNode;
  action: () => void;
}

export function DiscoveryModal({ isOpen, onClose }: DiscoveryModalProps) {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const phone = (siteSettings?.whatsapp || '+923706492398').replace(/\D/g, '');
  const waUrl = `https://wa.me/${phone}?text=Hi%20DEVSOLE%20Soft!%20I%20am%20using%20the%20Command%20Palette%20and%20want%20to%20start%20a%20project%20consultation.`;

  // Keyboard Escape listener
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  const commands: CommandItem[] = useMemo(
    () => [
      {
        id: 'whatsapp-direct',
        title: 'Instant WhatsApp Founder Consultation',
        subtitle: 'Direct communication with founder and lead architect Aoun Abbas',
        category: 'Direct Action',
        badge: 'Priority Desk',
        icon: (
          <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        ),
        action: () => {
          soundFX.playClick();
          window.open(waUrl, '_blank', 'noreferrer');
          onClose();
        },
      },
      {
        id: 'calculate-budget',
        title: 'Calculate Live Project Investment',
        subtitle: 'Configure architecture, user views, and add-ons in USD or PKR',
        category: 'Financial & Pricing',
        badge: 'Interactive Tool',
        icon: (
          <svg className="h-4 w-4 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <line x1="8" y1="6" x2="16" y2="6" />
            <line x1="16" y1="14" x2="16" y2="18" />
          </svg>
        ),
        action: () => {
          soundFX.playClick();
          navigate('/estimator');
          onClose();
        },
      },
      {
        id: 'inspect-projects',
        title: 'Inspect Production Work & Live Deployments',
        subtitle: 'Explore PropTech platforms, SaaS calculators, and case studies',
        category: 'Architecture & Work',
        badge: '15+ Shipped',
        icon: (
          <svg className="h-4 w-4 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        ),
        action: () => {
          soundFX.playClick();
          navigate('/projects');
          onClose();
        },
      },
      {
        id: 'client-reviews',
        title: 'Verified Client Testimonials & Social Proof',
        subtitle: 'Read 5-star ratings from founders or leave your project review',
        category: 'Architecture & Work',
        badge: '5.0 Rating',
        icon: (
          <svg className="h-4 w-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ),
        action: () => {
          soundFX.playClick();
          navigate('/reviews');
          onClose();
        },
      },
      {
        id: 'sprint-process',
        title: 'Review 21-Day Agile Sprint Roadmap',
        subtitle: 'Weekly staging previews, deliverables checklist, and 100% IP handover',
        category: 'Sprint & Team',
        badge: 'Predictable SLA',
        icon: (
          <svg className="h-4 w-4 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        ),
        action: () => {
          soundFX.playClick();
          navigate('/process');
          onClose();
        },
      },
      {
        id: 'submit-brief',
        title: 'Submit Formal Project Brief Form',
        subtitle: 'Direct CRM pipeline inquiry sent to our lead engineering desk',
        category: 'Direct Action',
        badge: 'Form Desk',
        icon: (
          <svg className="h-4 w-4 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        ),
        action: () => {
          soundFX.playClick();
          navigate('/contact');
          onClose();
        },
      },
    ],
    [navigate, onClose, waUrl]
  );

  const filtered = useMemo(() => {
    if (!search.trim()) return commands;
    const q = search.toLowerCase();
    return commands.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
    );
  }, [commands, search]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 animate-fade"
      style={{ backgroundColor: 'rgba(3, 5, 10, 0.82)', backdropFilter: 'blur(16px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0c101d] text-slate-100 shadow-[0_25px_60px_rgba(0,0,0,0.8)] animate-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Raycast-Style Live Search Header */}
        <div className="relative flex items-center border-b border-white/10 px-4 py-3.5">
          <svg className="h-4 w-4 text-slate-400 shrink-0 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            autoFocus
            type="text"
            placeholder="Search commands, calculator, deployments, or WhatsApp desk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none"
          />
          <div className="flex items-center gap-1.5 shrink-0 ml-2">
            <span className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-slate-400">
              ESC
            </span>
          </div>
        </div>

        {/* Command Items List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-10 text-center text-xs text-slate-500 font-mono">
              No matching commands found for "{search}"
            </div>
          ) : (
            filtered.map((cmd) => (
              <button
                key={cmd.id}
                type="button"
                onClick={cmd.action}
                className="group flex w-full items-center justify-between rounded-xl p-3 text-left transition-all duration-150 hover:bg-white/[0.05] hover:border-white/10 border border-transparent"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] shadow-2xs group-hover:scale-105 transition-transform">
                    {cmd.icon}
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {cmd.title}
                    </span>
                    <span className="block text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {cmd.subtitle}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 ml-3">
                  <span className="rounded border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[9px] font-semibold text-slate-400 group-hover:text-slate-200">
                    {cmd.badge}
                  </span>
                  <span className="text-slate-500 group-hover:text-blue-400 transition-colors text-xs font-bold">
                    →
                  </span>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Bottom Studio Command Bar */}
        <div className="flex items-center justify-between border-t border-white/10 bg-[#080c18] px-4 py-2.5 text-[11px] text-slate-500 font-mono">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
            DEVSOLE Studio Command Palette
          </span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
}

export default DiscoveryModal;