// FILE: src/pages/ServiceDetailPage.tsx
// One dedicated page per service (/services/<slug>). Content lives in
// src/seo/seo-data.json so the build-time prerender script and this page
// always show the same text.
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import seoData from '@/seo/seo-data.json';
import { applySeo } from '@/seo/useSeo';
import { Contact } from '@/components/sections/Contact';
import NotFound from '@/pages/NotFound';

type Section = { heading: string; paragraphs?: string[]; bullets?: string[] };

export function ServiceDetailPage() {
  const { slug } = useParams();
  const service = seoData.services.find((s) => s.slug === slug);

  useEffect(() => {
    if (service) {
      applySeo(`/services/${service.slug}`, service.title, service.description);
    }
  }, [service]);

  if (!service) return <NotFound />;

  const waLink = `https://wa.me/${seoData.site.whatsapp}?text=${encodeURIComponent(service.whatsappText)}`;
  const others = seoData.services.filter((s) => s.slug !== service.slug);

  return (
    <div className="relative pt-24 sm:pt-28 min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-16 left-1/2 -translate-x-1/2 h-[550px] w-[900px] rounded-full bg-blue-600/[0.09] blur-[150px]" />
        <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_20%,#000_70%,transparent_100%)]" />
      </div>

      <article className="mx-auto max-w-3xl px-4 sm:px-6 pt-8 pb-16">
        <nav aria-label="Breadcrumb" className="text-xs font-mono text-slate-500">
          <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/services" className="hover:text-blue-400 transition-colors">Services</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-300">{service.name}</span>
        </nav>

        <h1 className="mt-5 font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {service.h1}
        </h1>

        <div className="mt-5 space-y-4">
          {service.intro.map((p) => (
            <p key={p} className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition-colors"
          >
            Discuss on WhatsApp
          </a>
          <Link
            to="/estimator"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 px-5 py-3 text-sm font-semibold text-slate-100 transition-colors"
          >
            Calculate Project Cost
          </Link>
        </div>

        {(service.sections as Section[]).map((section) => (
          <section key={section.heading} className="mt-12">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
              {section.heading}
            </h2>
            {section.paragraphs?.map((p) => (
              <p key={p} className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                {p}
              </p>
            ))}
            {section.bullets && (
              <ul className="mt-4 space-y-2.5">
                {section.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <section className="mt-12">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
            Common questions
          </h2>
          <div className="mt-4 space-y-4">
            {service.faqs.map((f) => (
              <div key={f.q} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="text-sm sm:text-base font-semibold text-white">{f.q}</h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
            Other services
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {others.map((s) => (
              <li key={s.slug}>
                <Link
                  to={`/services/${s.slug}`}
                  className="block h-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:border-blue-500/40 transition-colors"
                >
                  <span className="block text-sm font-semibold text-white">{s.name}</span>
                  <span className="mt-1 block text-xs text-slate-400 leading-relaxed">{s.short}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>

      <div className="border-t border-white/10">
        <Contact />
      </div>
    </div>
  );
}

export default ServiceDetailPage;
