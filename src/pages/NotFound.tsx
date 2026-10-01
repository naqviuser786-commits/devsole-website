import { Link } from 'react-router-dom';
import { siteSettings } from '@/data/siteData';

export function NotFound() {
  return (
    <div className="relative flex min-h-[85vh] flex-col items-center justify-center px-6 py-20 text-center">
      {/* Background Cyber Grid Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-96 w-96 rounded-full bg-energy/10 blur-[120px]" />
      </div>

      {/* Cyber Status Badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-4 py-1.5 backdrop-blur-md">
        <span className="h-2 w-2 animate-ping rounded-full bg-red-400" />
        <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-red-400">
          [SYSTEM_SIGNAL_LOST: 404]
        </span>
      </div>

      {/* Big Glitch Number */}
      <h1 className="font-display text-7xl sm:text-9xl font-black tracking-tighter text-white drop-shadow-[0_0_40px_rgba(0,240,255,0.4)]">
        4<span className="text-energy-bright">0</span>4
      </h1>

      <h2 className="mt-4 font-display text-xl sm:text-2xl font-bold text-white">
        Coordinate Not Found in DEVSOLE Matrix
      </h2>

      <p className="mx-auto mt-3 max-w-md text-sm text-chrome-400 leading-relaxed">
        The requested digital sector does not exist, has been migrated, or was deconstructed during server optimization.
      </p>

      {/* Futuristic Mini Terminal Box */}
      <div className="mt-8 w-full max-w-lg rounded-2xl border border-white/10 bg-navy-950/80 p-5 text-left font-mono text-xs text-chrome-400 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-1.5 border-b border-white/10 pb-3 text-chrome-600">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-energy-bright/80" />
          <span className="ml-2 text-[10px] text-chrome-500">terminal_tracer.sh</span>
        </div>
        <div className="mt-3 space-y-1.5 text-chrome-300">
          <p className="text-chrome-500">&gt; ping destination_url ... [TIMEOUT]</p>
          <p className="text-red-400">&gt; error_code: 0x404_ROUTE_NULL</p>
          <p className="text-energy-bright">
            &gt; solution: Reroute telemetry to DEVSOLE Command Center
          </p>
        </div>
      </div>

      {/* Quick Action Navigation */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-energy-bright px-7 py-3.5 text-xs font-bold text-navy-950 shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all hover:scale-105"
        >
          <span>⚡ Return to Command Center (Home)</span>
        </Link>
        <a
          href={`https://wa.me/${siteSettings.whatsapp.replace(/\D/g, '')}?text=Hi%20DEVSOLE!%20I%20hit%20a%20broken%20link%20on%20your%20site.`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-6 py-3.5 text-xs font-medium text-chrome-300 transition-colors hover:border-white/30 hover:text-white"
        >
          <span>💬 Report on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}