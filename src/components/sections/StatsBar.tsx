import { useEffect, useState, useRef, type ReactNode } from 'react';

interface StatItemProps {
  target: number;
  icon: ReactNode;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  description: string;
}

function StatCounter({
  target,
  icon,
  prefix = '',
  suffix = '',
  decimals = 0,
  label,
  description,
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
          const duration = 1500;
          const startTime = performance.now();

          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 2);
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
      { threshold: 0.25 }
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
      className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c101d] p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-blue-500/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.7)] hover:-translate-y-1"
    >
      <div>
        {/* Top Header: Clean Studio Icon */}
        <div className="flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-blue-400 shadow-2xs">
            {icon}
          </div>
          <span className="h-1.5 w-1.5 rounded-full bg-slate-700 group-hover:bg-blue-400 shadow-[0_0_8px_#3b82f6] transition-colors" />
        </div>

        {/* Metric Number */}
        <div className="mt-4">
          <span className="font-mono text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {prefix}{value}{suffix}
          </span>
        </div>

        {/* Label */}
        <h4 className="mt-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-200">
          {label}
        </h4>

        {/* Description */}
        <p className="mt-1.5 text-xs leading-relaxed text-slate-400 font-normal">
          {description}
        </p>
      </div>
    </div>
  );
}

export function StatsBar() {
  return (
    <section
      aria-label="Production Telemetry & Benchmarks"
      className="relative mx-auto max-w-6xl px-4 sm:px-6 pb-20 overflow-hidden"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Stat 1: Shipped Deployments */}
        <StatCounter
          icon={
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
              <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
              <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
            </svg>
          }
          target={15}
          suffix="+"
          label="Shipped Deployments"
          description="Bespoke full-stack web applications, PropTech platforms, and SaaS automation systems running live in production."
        />

        {/* Stat 2: Speed Benchmark */}
        <StatCounter
          icon={
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          }
          target={0.8}
          prefix="< "
          suffix="s"
          decimals={1}
          label="Speed Benchmark"
          description="Sub-second global response latency achieved through lean server endpoints and composite database indexing."
        />

        {/* Stat 3: Production Uptime */}
        <StatCounter
          icon={
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          }
          target={99.9}
          suffix="%"
          decimals={1}
          label="Production Uptime"
          description="Fault-tolerant relational schemas and secure REST API pipelines designed for continuous enterprise load."
        />

        {/* Stat 4: Milestone SLA */}
        <StatCounter
          icon={
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          }
          target={100}
          suffix="%"
          label="Milestone SLA"
          description="Strict adherence to 1-week sprint delivery, private staging reviews, and verified production handovers."
        />
      </div>
    </section>
  );
}

export default StatsBar;