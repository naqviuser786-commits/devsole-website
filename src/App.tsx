import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function PublicSite() {
  const [webglOk] = useState(isWebGLAvailable);

  useDevsoleScrollTimeline();

  useEffect(() => {
    const cleanup = initSmoothScroll();
    return cleanup;
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* 🎯 Custom Cyberpunk Trailing Neon Cursor */}
      <CustomCursor />

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

      {/* 🟢 Live Floating Neon WhatsApp Widget */}
      <WhatsAppFloat />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          {/* ⚡ DEVSOLE Cloud CRM Route (Ye line add hui hai) */}
          <Route path="/crm/*" element={<CrmApp />} />

          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="/*" element={<PublicSite />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}