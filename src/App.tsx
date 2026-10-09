import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Scene } from '@/components/3d/Scene';
import { WebGLFallback } from '@/components/3d/WebGLFallback';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { Home } from '@/pages/Home';
import { NotFound } from '@/pages/NotFound';
import { AdminApp } from '@/admin/AdminApp';
import { CrmApp } from '@/crm/CrmApp';
import { initSmoothScroll } from '@/lib/lenis';
import { useDevsoleScrollTimeline } from '@/hooks/useDevsoleScrollTimeline';
import { isWebGLAvailable } from '@/lib/webgl';

// Route change par scroll ko clean top par reset karne ke liye
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function PublicSite() {
  const [webglOk] = useState(isWebGLAvailable);

  useDevsoleScrollTimeline();

  useEffect(() => {
    const cleanup = initSmoothScroll();
    return cleanup;
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* 🎯 Hardware-Accelerated Custom Cursor */}
      <CustomCursor />

      {/* 🧊 3D Scene / WebGL Fallback */}
      {webglOk ? <Scene /> : <WebGLFallback />}

      <div className="relative z-10">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>

      {/* 🟢 Floating WhatsApp Contact Widget */}
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
          {/* ⚡ DEVSOLE Cloud CRM Route */}
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