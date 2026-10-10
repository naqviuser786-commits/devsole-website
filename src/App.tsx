import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { Home } from '@/pages/Home';
import { NotFound } from '@/pages/NotFound';
import { AdminApp } from '@/admin/AdminApp';
import { CrmApp } from '@/crm/CrmApp';
import { initSmoothScroll } from '@/lib/lenis';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function PublicSite() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cleanup = initSmoothScroll();
    return cleanup;
  }, []);

  // Hardware-accelerated Desktop Cursor Spotlight (Zero Re-render Performance Engine)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const spotlight = spotlightRef.current;
    if (!spotlight) return;

    let rafId: number;
    let targetX = -1000;
    let targetY = -1000;
    let currentX = -1000;
    let currentY = -1000;
    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        spotlight.style.opacity = '1';
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      spotlight.style.opacity = '0';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    const render = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      if (isVisible) {
        spotlight.style.background = `radial-gradient(600px circle at ${currentX}px ${currentY}px, rgba(59, 130, 246, 0.07), transparent 80%)`;
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#06080f] text-slate-100 selection:bg-blue-600/30 selection:text-white overflow-x-hidden">
      {/* 1. Ultra-Lightweight Matte Film-Grain Texture Layer */}
      <div
        aria-hidden="true"
        className="bg-noise pointer-events-none fixed inset-0 z-0 opacity-60 mix-blend-overlay"
      />

      {/* 2. Interactive Desktop Mouse Spotlight Layer */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-0 transition-opacity duration-300 will-change-transform"
      />

      {/* 3. Architectural Dual-Tone Ambient Atmosphere (Top Cobalt + Middle Indigo + Bottom Emerald) */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        {/* Soft Ambient Cobalt Wash (Top) */}
        <div className="absolute -top-40 left-1/2 h-[650px] w-[1100px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-600/15 via-indigo-600/5 to-transparent blur-[160px]" />

        {/* Ambient Indigo/Violet Glow (Mid-Right) */}
        <div className="absolute top-[40%] -right-48 h-[600px] w-[600px] rounded-full bg-indigo-600/[0.06] blur-[150px]" />

        {/* Subtle Emerald Telemetry Ambient Wash (Bottom-Left) */}
        <div className="absolute bottom-20 -left-48 h-[550px] w-[550px] rounded-full bg-emerald-600/[0.04] blur-[140px]" />

        {/* 1px Subtle Architectural Blueprint Grid Layer */}
        <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      {/* 4. Main Content Layer */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>

      {/* 5. Floating WhatsApp Action Trigger */}
      <WhatsAppFloat />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* ⚡ DEVSOLE Cloud CRM Route (Internal Use - Untouched) */}
          <Route path="/crm/*" element={<CrmApp />} />

          {/* 🛡️ Website Admin Route */}
          <Route path="/admin/*" element={<AdminApp />} />

          {/* 🌐 Public Client Website */}
          <Route path="/*" element={<PublicSite />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}