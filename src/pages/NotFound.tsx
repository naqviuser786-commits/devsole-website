import { Link } from 'react-router-dom';
import { siteSettings } from '@/data/siteData';

export function NotFound() {
  const phone = siteSettings.whatsapp.replace(/\D/g, '');

  return (
    <div className="relative flex min-h-[85vh] flex-col items-center justify-center px-4 sm:px-6 py-20 text-center overflow-hidden">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-96 w-96 rounded-full bg-energy/10 blur-[120px]" />
      </div>

      {/* Status Badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-energy-bright/40 bg-energy/10 px-4 py-1.5 backdrop-blur-md">
        <span className="h-2 w-2 rounded-full bg-energy-bright shadow-[0_0_8px_#00f0ff]" />
        <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-energy-bright">
          Page Not Found (404)
        </span>
      </div>

      {/* Large 404 Number */}
      <h1 className="font-display text-7xl sm:text-9xl font-black tracking-tighter text-white drop-shadow-[0_0_40px_rgba(0,240,255,0.35)]">
        4<span className="text-energy-bright">0</span>4
      </h1>

      <h2 className="mt-4 font-display text-xl sm:text-2xl font-bold text-white">
        This Page Could Not Be Found
      </h2>

      <p className="mx-auto mt-3 max-w-md text-xs sm:text-sm text-chrome-400 leading-relaxed">
        The link you followed may be broken, updated, or the page might have been moved during recent architecture updates.
      </p>

      {/* Helpful Navigation Links Box */}
      <div className="mt-8 w-full max-w-md rounded-2xl border border-white/10 bg-navy-950/80 p-5 text-left text-xs backdrop-blur-md shadow-lg">
        <p className="font-semibold text-white">Where would you like to go?</p>
        <div className="mt-3 grid grid-cols-2 gap-2 text-chrome-300">
          <Link
            to="/#services"
            className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5 hover:border-energy-bright/50 hover:text-white transition-all"
          >
            → Our Services
          </Link>
          <Link
            to="/#projects"
            className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5 hover:border-energy-bright/50 hover:text-white transition-all"
          >
            → View Projects
          </Link>
          <Link
            to="/#estimator"
            className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5 hover:border-energy-bright/50 hover:text-white transition-all"
          >
            → Cost Calculator
          </Link>
          <Link
            to="/#contact"
            className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5 hover:border-energy-bright/50 hover:text-white transition-all"
          >
            → Contact Desk
          </Link>
        </div>
      </div>

      {/* Quick Action Navigation */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-energy-bright px-7 py-3 text-xs font-bold text-navy-950 shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all hover:scale-105 active:scale-95"
        >
          <span>⚡ Return to Home Page</span>
        </Link>
        <a
          href={`https://wa.me/${phone}?text=Hi%20DEVSOLE!%20I%20hit%20a%20broken%20link%20on%20your%20site.`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-6 py-3 text-xs font-medium text-chrome-300 transition-colors hover:border-white/30 hover:text-white"
        >
          <span>💬 Report on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}