import { siteSettings } from '@/data/siteData';

interface DiscoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DiscoveryModal({ isOpen, onClose }: DiscoveryModalProps) {
  if (!isOpen) return null;

  const phone = siteSettings.whatsapp.replace(/\D/g, '');
  const waUrl = `https://wa.me/${phone}?text=Hi%20DEVSOLE%20Soft!%20I%20want%20to%20start%20a%20new%20project%20and%20need%20a%20technical%20consultation.`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-[#0c101d] text-slate-100 p-6 sm:p-8 shadow-2xl animate-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-bold text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close Discovery Dialog"
        >
          ✕
        </button>

        <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded">
          Direct Technical Discovery
        </span>

        <h3 className="mt-2 font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
          Start Your Project with DEVSOLE Soft
        </h3>

        <p className="mt-1.5 text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
          Collaborate directly with founder Aoun Abbas and our engineering desk. Choose your preferred discovery pathway:
        </p>

        {/* 3 Interactive Studio Pathways */}
        <div className="mt-5 space-y-2.5">
          {/* Pathway 1: WhatsApp Direct */}
          <a
            href={waUrl}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05] p-3.5 transition-all duration-150"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className="text-left">
                <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                  Instant WhatsApp Consultation
                </h4>
                <p className="text-[11px] text-slate-400">
                  Fastest response · Direct communication with lead architect
                </p>
              </div>
            </div>
            <span className="text-slate-500 group-hover:text-white transition-colors text-xs font-semibold">→</span>
          </a>

          {/* Pathway 2: Interactive Cost Estimator */}
          <a
            href="#estimator"
            onClick={onClose}
            className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05] p-3.5 transition-all duration-150"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.15)]">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <line x1="8" y1="6" x2="16" y2="6" />
                  <line x1="16" y1="14" x2="16" y2="18" />
                </svg>
              </div>
              <div className="text-left">
                <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                  Calculate Real-Time Estimate
                </h4>
                <p className="text-[11px] text-slate-400">
                  Select feature modules & calculate upfront investment
                </p>
              </div>
            </div>
            <span className="text-slate-500 group-hover:text-white transition-colors text-xs font-semibold">→</span>
          </a>

          {/* Pathway 3: Detailed Project Brief Form */}
          <a
            href="#contact"
            onClick={onClose}
            className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05] p-3.5 transition-all duration-150"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.15)]">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <div className="text-left">
                <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                  Submit Formal Project Brief
                </h4>
                <p className="text-[11px] text-slate-400">
                  Detailed questionnaire sent directly to our engineering desk
                </p>
              </div>
            </div>
            <span className="text-slate-500 group-hover:text-white transition-colors text-xs font-semibold">→</span>
          </a>
        </div>

        <div className="mt-5 border-t border-white/5 pt-3.5 text-center">
          <p className="text-[11px] text-slate-500">
            Strictly confidential · Mutual NDA available upon request.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DiscoveryModal;