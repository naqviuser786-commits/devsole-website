// FILE: src/components/sections/StatsBar.tsx
import { useEffect, useState, useRef, type ReactNode } from 'react';
import { soundFX } from '@/lib/soundFx';

interface StatItemProps {
  target: number;
  icon: ReactNode;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  badge: string;
  badgeColor?: string;
  description: string;
  telemetryVisual: ReactNode;
}

function StatCounter({
  target,
  icon,
  prefix = '',
  suffix = '',
  decimals = 0,
  label,
  badge,
  badgeColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  description,
  telemetryVisual,
}: StatItemProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frameId: number;
    let hasAnimated = false;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry && entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          const duration = 1400;
          const startTime = performance.now();

          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Smooth ease-out cubic curve
            const ease = 1 - Math.pow(1 - progress, 3);
            setValue(Number((ease * target).toFixed(decimals)));

            if (progress < 1) {
              frameId = requestAnimationFrame(animate);
            } else {
              setValue(target);
            }
          };

          frameId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [target, decimals]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => soundFX.playHover()}
      className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c101d] p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-blue-500/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.7)] hover:-translate-y-1 overflow-hidden"
    >
      {/* Subtle background grid */}
      <div className="bg-grid absolute inset-0 opacity-10 pointer-events-none rounded-2xl" />

      <div className="relative z-10">
        {/* Top Header: Icon + Metric Status Pill */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-blue-400 shadow-2xs group-hover:scale-105 transition-transform">
            {icon}
          </div>
          <span className={`rounded-md border px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider ${badgeColor}`}>
            {badge}
          </span>
        </div>

        {/* Counter Value */}
        <div className="mt-4 flex items-baseline gap-1">
          <span className="font-mono text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {prefix}{value}{suffix}
          </span>
        </div>

        {/* Title */}
        <h4 className="mt-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-200">
          {label}
        </h4>

        {/* Description */}
        <p className="mt-1.5 text-xs leading-relaxed text-slate-400 font-normal">
          {description}
        </p>
      </div>

      {/* Visual Indicator */}
      <div className="relative z-10 mt-5 border-t border-white/10 pt-3.5">
        {telemetryVisual}
      </div>
    </div>
  );
}

export function StatsBar() {
  return (
    <section
      aria-label="DEVSOLE Soft Production Status and Speed Benchmarks"
      className="relative mx-auto max-w-7xl px-4 sm:px-6 pb-20 pt-4 overflow-hidden"
    >
      {/* Top Status Console Strip */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#080c18] px-4 py-2.5 text-xs font-mono backdrop-blur-md shadow-2xs">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_#10b981]" />
          </span>
          <span className="text-slate-300 font-semibold uppercase text-[11px] tracking-wider">
            DEVSOLE SOFT · LIVE PRODUCTION STATUS
          </span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-emerald-400 hidden sm:inline text-[10px] font-bold">ALL SYSTEMS OPERATIONAL</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-400">
          <span>GLOBAL SPEED: <strong className="text-emerald-400 font-bold">&lt; 0.8s LOAD</strong></span>
          <span className="text-slate-600 hidden md:inline">|</span>
          <span className="hidden md:inline font-semibold text-slate-300">100% CODE HANDOVER</span>
        </div>
      </div>

      {/* 4 Architectural Telemetry Cards */}
      <div data-gsap="stagger-group" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Card 1: Delivered Projects */}
        <StatCounter
          target={15}
          suffix="+"
          label="Delivered Projects"
          badge="15/15 Active"
          description="Custom business websites, real estate portals, and online stores delivered on schedule."
          icon={
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            </svg>
          }
          telemetryVisual={
            <div className="flex items-center justify-between font-mono text-[10px] text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Live in Production
              </span>
              <span>100% On-Time Delivery</span>
            </div>
          }
        />

        {/* Card 2: Page Speed */}
        <StatCounter
          target={0.8}
          prefix="< "
          suffix="s"
          decimals={1}
          label="Page Load Speed"
          badge="Score: 99/100"
          badgeColor="text-blue-400 bg-blue-500/10 border-blue-500/20"
          description="Websites load in under 1 second on mobile 4G, keeping visitors engaged and boosting your Google search rank."
          icon={
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          }
          telemetryVisual={
            <div>
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1.5">
                <span>Load Speed Spectrum:</span>
                <span className="text-emerald-400 font-bold">580ms Mobile Average</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-[94%] bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full" />
              </div>
            </div>
          }
        />

        {/* Card 3: Production Uptime */}
        <StatCounter
          target={99.9}
          suffix="%"
          decimals={1}
          label="Uptime Reliability"
          badge="Daily Backups"
          description="Fast cloud servers and automated daily backups so your business website is always open for customers."
          icon={
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          }
          telemetryVisual={
            <div>
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1.5">
                <span>90-Day Uptime Record:</span>
                <span className="text-emerald-400">0 Downtime Incidents</span>
              </div>
              {/* Green Datadog uptime ticks */}
              <div className="flex items-center gap-1 overflow-hidden">
                {Array.from({ length: 22 }).map((_, i) => (
                  <span
                    key={i}
                    className="h-3.5 w-1 flex-1 rounded-sm bg-emerald-500/80 hover:bg-emerald-400 transition-colors"
                    title={`Day -${22 - i}: 100% Operational`}
                  />
                ))}
              </div>
            </div>
          }
        />

        {/* Card 4: Code Ownership */}
        <StatCounter
          target={100}
          suffix="%"
          label="Code Ownership"
          badge="Zero Lock-In"
          badgeColor="text-indigo-400 bg-indigo-500/10 border-indigo-500/20"
          description="All website files, database, and admin logins belong completely to you upon launch. Zero recurring lock-in fees."
          icon={
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          }
          telemetryVisual={
            <div className="flex items-center justify-between font-mono text-[10px] text-slate-400">
              <span className="text-white font-semibold flex items-center gap-1">
                <svg className="h-3 w-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Complete Files Transfer
              </span>
              <span className="text-indigo-400 font-bold">$0 Platform Fee</span>
            </div>
          }
        />

      </div>
    </section>
  );
}

export default StatsBar;