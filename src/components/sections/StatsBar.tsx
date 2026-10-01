import { useEffect, useState, useRef } from 'react';

interface StatItemProps {
  target: number;
  icon: string;
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
          const duration = 1600;
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
      className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-navy-950/70 p-6 sm:p-7 backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:border-energy-bright/60 hover:bg-white/[0.03] hover:shadow-[0_0_35px_rgba(0,240,255,0.2)]"
    >
      <div>
        <div className="flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-energy-bright/40 bg-energy/10 text-xl shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-transform duration-300 group-hover:scale-110">
            <span>{icon}</span>
          </div>

          <span className="h-2 w-2 rounded-full bg-energy-bright opacity-40 shadow-[0_0_6px_#00f0ff] transition-all group-hover:opacity-100" />
        </div>

        <div className="mt-5">
          <span className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white transition-colors group-hover:text-energy-bright">
            {prefix}{value}{suffix}
          </span>
        </div>

        <h4 className="mt-2 font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-energy-bright">
          {label}
        </h4>

        <p className="mt-2 text-xs leading-relaxed text-chrome-400">
          {description}
        </p>
      </div>
    </div>
  );
}

export function StatsBar() {
  return (
    <section className="relative mx-auto -mt-6 max-w-6xl px-4 sm:px-6 pb-20 overflow-hidden">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCounter
          icon="🚀"
          target={15}
          suffix="+"
          label="Shipped Deployments"
          description="Custom full-stack web apps, PropTech portals, and automated SaaS tools live in production."
        />
        <StatCounter
          icon="⚡"
          target={1.2}
          prefix="< "
          suffix="s"
          decimals={1}
          label="Speed Benchmark"
          description="Sub-second global response times engineered via lean server architecture and index optimization."
        />
        <StatCounter
          icon="🛡️"
          target={99.9}
          suffix="%"
          decimals={1}
          label="System Reliability"
          description="Fault-tolerant database architectures with structured relational data pipelines."
        />
        <StatCounter
          icon="🎯"
          target={100}
          suffix="%"
          label="Milestone Precision"
          description="Strict adherence to delivery sprints, transparent progress staging, and verified handoffs."
        />
      </div>
    </section>
  );
}