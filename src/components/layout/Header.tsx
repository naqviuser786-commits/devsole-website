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
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile menu open hone par background page scroll reliably lock karna
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

  const phone = siteSettings.whatsapp.replace(/\D/g, '');

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
            className={`flex items-center justify-between rounded-full border border-white/10 px-3.5 sm:px-6 py-2 transition-all duration-300 ${
              compact
                ? 'bg-navy-950/90 shadow-2xl backdrop-blur-2xl'
                : 'bg-navy-950/60 shadow-lg backdrop-blur-xl'
            }`}
          >
            {/* Brand Logo & Name */}
            <a
              href="#home"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2.5 shrink-0 focus-visible:outline-energy-bright"
              aria-label="DEVSOLE home"
            >
              <HeaderLogo />
              <span className="font-display text-sm sm:text-base font-bold tracking-wider text-white">
                DEVSOLE
              </span>
            </a>

            {/* Desktop Center Dock Navigation */}
            <Navigation className="hidden items-center lg:flex" />

            {/* Right Action Tools */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* 🔊 Sound FX Toggle */}
              <SoundToggle />

              {/* 🚀 Start a Project Button (Desktop & Tablet) */}
              <button
                type="button"
                onClick={() => setDiscoveryOpen(true)}
                className="hidden sm:inline-flex rounded-full bg-gradient-to-b from-energy-soft to-energy px-4 py-2 text-xs font-bold text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-lg focus-visible:outline-energy-bright"
              >
                Start a Project
              </button>

              {/* 🍔 Sleek Mobile Hamburger Toggle */}
              <button
                type="button"
                onClick={() => setMobileOpen((prev) => !prev)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-colors hover:border-energy-bright hover:bg-energy/10 focus-visible:outline-energy-bright lg:hidden"
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              >
                {mobileOpen ? (
                  <span className="text-base font-bold text-energy-bright">✕</span>
                ) : (
                  <span className="text-lg leading-none font-bold">☰</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 📱 MOBILE OVERLAY & SLIDE-DOWN DRAWER: 100% Fluid Responsive */}
        {mobileOpen && (
          <div
            className="fixed inset-0 top-[56px] sm:top-[64px] z-30 flex flex-col bg-navy-950/85 backdrop-blur-2xl animate-fade lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <div
              id="mobile-nav"
              className="mx-3 mt-2 flex max-h-[82vh] flex-col overflow-y-auto rounded-3xl border border-white/15 bg-navy-950/95 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.9)] animate-modal"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Navigation Items */}
              <Navigation
                isMobile={true}
                onNavigate={() => setMobileOpen(false)}
              />

              {/* Mobile Actions Drawer Bottom */}
              <div className="mt-5 space-y-3 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    setDiscoveryOpen(true);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-energy-bright py-3.5 text-xs font-bold text-navy-950 shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-transform active:scale-95"
                >
                  <span>🚀 Start a Project (Discovery) →</span>
                </button>

                <a
                  href={`https://wa.me/${phone}?text=Hi%20DEVSOLE!%20I%20am%20browsing%20your%20website%20on%20mobile%20and%20want%20to%20discuss%20a%20project.`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] py-3 text-xs font-semibold text-chrome-300 hover:text-white"
                >
                  <span>💬 Direct WhatsApp Chat</span>
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