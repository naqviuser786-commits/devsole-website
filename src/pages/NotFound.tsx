import { Link } from 'react-router-dom';
import { siteSettings } from '@/data/siteData';

export function NotFound() {
  const phone = siteSettings.whatsapp.replace(/\D/g, '');

  return (
    <div className="relative flex min-h-[85vh] flex-col items-center justify-center px-4 sm:px-6 py-20 text-center overflow-hidden bg-white">
      {/* Subtle Studio Grid Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-96 w-96 rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_50%,transparent_100%)]" />
      </div>

      {/* Status Badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 shadow-2xs">
        <span className="h-2 w-2 rounded-full bg-rose-500" />
        <span className="text-xs font-mono font-semibold uppercase tracking-[0.15em] text-slate-700">
          Page Not Found (404)
        </span>
      </div>

      {/* Large 404 Number (High-Contrast Charcoal) */}
      <h1 className="font-display text-7xl sm:text-9xl font-black tracking-tight text-slate-950">
        4<span className="text-blue-600">0</span>4
      </h1>

      <h2 className="mt-3 font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
        This Page Could Not Be Found
      </h2>

      <p className="mx-auto mt-2 max-w-md text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
        The link you followed may be broken, updated, or the page might have been moved during recent architecture updates.
      </p>

      {/* Helpful Navigation Links Box */}
      <div className="mt-8 w-full max-w-md rounded-2xl border border-slate-200/90 bg-slate-50/70 p-5 text-left text-xs shadow-2xs">
        <p className="font-bold text-slate-900">Direct Navigation Shortcuts:</p>
        <div className="mt-3 grid grid-cols-2 gap-2 text-slate-700">
          <Link
            to="/#services"
            className="rounded-xl border border-slate-200 bg-white p-2.5 hover:border-slate-300 hover:text-blue-600 transition-colors shadow-2xs font-medium"
          >
            → Our Services
          </Link>
          <Link
            to="/#projects"
            className="rounded-xl border border-slate-200 bg-white p-2.5 hover:border-slate-300 hover:text-blue-600 transition-colors shadow-2xs font-medium"
          >
            → View Projects
          </Link>
          <Link
            to="/#estimator"
            className="rounded-xl border border-slate-200 bg-white p-2.5 hover:border-slate-300 hover:text-blue-600 transition-colors shadow-2xs font-medium"
          >
            → Cost Calculator
          </Link>
          <Link
            to="/#contact"
            className="rounded-xl border border-slate-200 bg-white p-2.5 hover:border-slate-300 hover:text-blue-600 transition-colors shadow-2xs font-medium"
          >
            → Contact Desk
          </Link>
        </div>
      </div>

      {/* Quick Action Navigation */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 px-6 py-3 text-xs font-semibold text-white shadow-xs transition-colors"
        >
          <span>Return to Home Page</span>
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
        <a
          href={`https://wa.me/${phone}?text=Hi%20DEVSOLE!%20I%20hit%20a%20broken%20link%20on%20your%20site.`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-5 py-3 text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" />
          <span>Report on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}

export default NotFound;