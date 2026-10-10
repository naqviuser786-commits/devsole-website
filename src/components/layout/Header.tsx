import { useEffect, useState } from 'react';
import { HeaderLogo } from './HeaderLogo';
import { Navigation } from './Navigation';
import { SoundToggle } from '@/components/ui/SoundToggle';
import { DiscoveryModal } from '@/components/ui/DiscoveryModal';
import { siteSettings } from '@/data/siteData';

export function Header() {
  const [compact, setCompact] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [discoveryOpen, setDiscoveryOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [mobileOpen]);

  const phone = (siteSettings?.whatsapp || '+923706492398').replace(/\D/g, '');

  return (
    <>
      <header
        role="banner"
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          compact ? 'py-2 sm:py-2.5' : 'py-3 sm:py-4'
        }`}
      >
        <div className="mx-auto max-w-7xl px-3 sm:px-6">
          <div
            className={`flex items-center justify-between rounded-2xl border px-3 sm:px-5 py-2.5 transition-all duration-300 ${
              compact
                ? 'border-white/15 bg-[#080c18]/90 shadow-[0_12px_40px_rgba(0,0,0,0.7)] backdrop-blur-2xl'
                : 'border-white/10 bg-[#06080f]/75 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl'
            }`}
          >
            {/* Brand Logo & Studio Wordmark */}
            <a
              href="#home"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2.5 shrink-0 focus-visible:outline-blue-500"
              aria-label="DEVSOLE Soft Home"
            >
              <HeaderLogo />
              <div className="flex flex-col">
                <span className="font-display text-sm sm:text-base font-bold tracking-tight text-white flex items-center gap-1.5">
                  DEVSOLE <span className="text-blue-500 font-extrabold">Soft</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 hidden sm:inline-block shadow-[0_0_8px_#10b981] animate-pulse" />
                </span>
                <span className="text-[9px] uppercase tracking-widest text-slate-400 font-mono hidden sm:inline font-semibold">
                  Engineering Studio
                </span>
              </div>
            </a>

            {/* Desktop Center Floating Segmented Navigation Dock */}
            <Navigation className="hidden items-center lg:flex" />

            {/* Right Action Tools */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* Sound FX Toggle */}
              <SoundToggle />

              {/* Direct WhatsApp Pill (Tablets & Desktops) */}
              <a
                href={`https://wa.me/${phone}?text=Hi%20DEVSOLE%20Soft!%20I%20would%20like%20to%20discuss%20a%20project%20roadmap.`}
                target="_blank"
                rel="noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 px-3 py-1.5 text-xs font-semibold transition-all shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                title="Direct WhatsApp Consultation"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
                <span>WhatsApp</span>
              </a>

              {/* High-End Direct CTA Button */}
              <button
                type="button"
                onClick={() => setDiscoveryOpen(true)}
                className="hidden sm:inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 text-xs font-semibold shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-blue-500"
              >
                <span>Start a Project</span>
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                onClick={() => setMobileOpen((prev) => !prev)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-200 transition-colors hover:border-white/20 hover:bg-white/[0.08] focus-visible:outline-blue-500 lg:hidden"
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              >
                {mobileOpen ? (
                  <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4 text-slate-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-Down Sheet Drawer on Obsidian Studio Frame */}
        {mobileOpen && (
          <div
            className="fixed inset-0 top-[56px] sm:top-[64px] z-30 flex flex-col bg-black/60 backdrop-blur-md animate-fade lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <div
              id="mobile-nav"
              className="mx-3 mt-2 flex max-h-[82vh] flex-col overflow-y-auto rounded-2xl border border-white/10 bg-[#080c18] p-4 sm:p-5 shadow-2xl animate-modal"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Navigation Items */}
              <Navigation
                isMobile={true}
                onNavigate={() => setMobileOpen(false)}
              />

              {/* Mobile Actions Drawer Bottom */}
              <div className="mt-4 space-y-2 border-t border-white/10 pt-3.5">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    setDiscoveryOpen(true);
                  }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white py-3 text-xs font-semibold shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-colors"
                >
                  <span>Start a Project Consultation</span>
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>

                <a
                  href={`https://wa.me/${phone}?text=Hi%20DEVSOLE%20Soft!%20I%20am%20browsing%20your%20website%20and%20want%20to%20discuss%20a%20project.`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 py-2.5 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
                  <span>Direct WhatsApp Channel</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Discovery Consultation Modal */}
      <DiscoveryModal isOpen={discoveryOpen} onClose={() => setDiscoveryOpen(false)} />
    </>
  );
}

export default Header;