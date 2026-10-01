import { siteSettings } from '@/data/siteData';

interface DiscoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DiscoveryModal({ isOpen, onClose }: DiscoveryModalProps) {
  if (!isOpen) return null;

  const phone = siteSettings.whatsapp.replace(/\D/g, '');
  const waUrl = `https://wa.me/${phone}?text=Hi%20DEVSOLE!%20I%20want%20to%20start%20a%20new%20project%20and%20need%20a%20technical%20consultation.`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade"
      style={{ backgroundColor: 'rgba(3, 5, 10, 0.88)', backdropFilter: 'blur(16px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl border border-energy-bright/60 bg-navy-950 p-6 sm:p-8 shadow-[0_0_60px_rgba(0,240,255,0.25)] animate-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-bold text-white transition-colors hover:border-energy-bright hover:bg-energy/20 hover:text-energy-bright"
        >
          ✕
        </button>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-energy-bright/40 bg-energy/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-energy-bright">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-energy-bright" />
          Direct Technical Discovery
        </span>

        <h3 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-white">
          Start Your Project with DEVSOLE
        </h3>

        <p className="mt-2 text-xs sm:text-sm text-chrome-400">
          Collaborate directly with founder Aoun Abbas and our core engineering team. Choose how you would like to begin:
        </p>

        {/* 3 Interactive Pathways */}
        <div className="mt-6 space-y-3">
          {/* Pathway 1: WhatsApp Direct Chat (Primary) */}
          <a
            href={waUrl}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between rounded-2xl border border-energy-bright/60 bg-gradient-to-r from-energy/20 to-energy-bright/10 p-4 transition-all duration-300 hover:border-energy-bright hover:shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:scale-[1.02]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-energy-bright font-bold text-navy-950 shadow-[0_0_12px_#00f0ff]">
                💬
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-white group-hover:text-energy-bright transition-colors">
                  Instant WhatsApp Consultation
                </h4>
                <p className="text-[11px] text-chrome-300">
                  Fastest response · Direct chat with lead architect
                </p>
              </div>
            </div>
            <span className="text-energy-bright text-sm font-bold">→</span>
          </a>

          {/* Pathway 2: Interactive Cost Estimator */}
          <a
            href="#estimator"
            onClick={onClose}
            className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 hover:border-energy/40 hover:bg-white/[0.05] hover:scale-[1.02]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-bold text-energy-bright">
                ⚡
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-white group-hover:text-energy-bright transition-colors">
                  Calculate Live Estimate
                </h4>
                <p className="text-[11px] text-chrome-400">
                  Select features & calculate upfront budget
                </p>
              </div>
            </div>
            <span className="text-chrome-500 group-hover:text-white transition-colors">→</span>
          </a>

          {/* Pathway 3: Detailed Project Brief Form */}
          <a
            href="#contact"
            onClick={onClose}
            className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 hover:border-energy/40 hover:bg-white/[0.05] hover:scale-[1.02]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-bold text-energy-bright">
                📋
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-white group-hover:text-energy-bright transition-colors">
                  Submit Formal Project Brief
                </h4>
                <p className="text-[11px] text-chrome-400">
                  Detailed questionnaire sent to our engineering inbox
                </p>
              </div>
            </div>
            <span className="text-chrome-500 group-hover:text-white transition-colors">→</span>
          </a>
        </div>

        <div className="mt-6 border-t border-white/5 pt-4 text-center">
          <p className="text-[11px] text-chrome-500">
            🔒 Strictly confidential · Mutual NDA available upon request.
          </p>
        </div>
      </div>
    </div>
  );
}