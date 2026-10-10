import { SectionHeading } from '@/components/ui/SectionHeading';
import { teamMembers, siteSettings } from '@/data/siteData';

const TEAM_PHOTOS: Record<string, { local: string; initialsFallback: string }> = {
  AOUN: {
    local: '/images/aoun-abbas.jpg',
    initialsFallback: 'https://ui-avatars.com/api/?name=Aoun+Abbas&background=0f172a&color=ffffff&bold=true&size=240',
  },
  AMINA: {
    local: '/images/amina-mazhar.jpg',
    initialsFallback: 'https://ui-avatars.com/api/?name=Amina+Mazhar&background=1e293b&color=ffffff&bold=true&size=240',
  },
  MOMNA: {
    local: '/images/syeda-momna.jpg',
    initialsFallback: 'https://ui-avatars.com/api/?name=Syeda+Momna&background=334155&color=ffffff&bold=true&size=240',
  },
};

export function Team() {
  const phone = (siteSettings?.whatsapp || '+923706492398').replace(/\D/g, '');

  const getMemberPhoto = (name: string) => {
    const n = name.toUpperCase();
    if (n.includes('AOUN')) return TEAM_PHOTOS.AOUN;
    if (n.includes('AMINA')) return TEAM_PHOTOS.AMINA;
    return TEAM_PHOTOS.MOMNA;
  };

  return (
    <section
      id="team"
      itemScope
      itemType="https://schema.org/Organization"
      aria-label="DEVSOLE Soft Leadership & Engineering Team"
      className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28 overflow-hidden bg-transparent"
    >
      <meta itemProp="name" content="DEVSOLE Soft" />

      {/* Subtle Studio Grid Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <SectionHeading
        eyebrow="Leadership & Engineers"
        title="Meet the Team Behind DEVSOLE Soft"
        description="Dedicated leaders, full-stack builders, and database engineers committed to your project's technical success."
        align="center"
      />

      {/* 3 Executive Studio Team Cards */}
      <div className="mt-12 sm:mt-14 grid items-stretch gap-6 md:grid-cols-3">
        {teamMembers.map((member) => {
          const isFounder = member.name.toUpperCase().includes('AOUN');
          const photoData = getMemberPhoto(member.name);

          return (
            <div
              key={member.id}
              itemScope
              itemType="https://schema.org/Person"
              itemProp="employee"
              className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c101d] p-6 sm:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:border-blue-500/40 hover:shadow-[0_8px_35px_rgba(0,0,0,0.7)] transition-all duration-300 hover:-translate-y-1"
            >
              <meta itemProp="worksFor" content="DEVSOLE Soft" />
              <meta itemProp="knowsAbout" content={member.skills.join(', ')} />

              {/* Founder Leadership Badge */}
              {isFounder && (
                <div className="absolute -top-3 right-6 z-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider shadow-[0_0_15px_rgba(59,130,246,0.4)] bg-blue-600 text-white border border-blue-400/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
                    Founder & Lead Architect
                  </span>
                </div>
              )}

              <div>
                {/* Portrait Header */}
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 sm:h-22 sm:w-22 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#080c18] shadow-2xs">
                    <img
                      itemProp="image"
                      src={photoData.local}
                      alt={`${member.name} - ${member.role} at DEVSOLE Soft`}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-103"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src !== photoData.initialsFallback) {
                          target.src = photoData.initialsFallback;
                        }
                      }}
                    />
                    <span
                      className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xs"
                      title="Verified Core Engineer"
                    >
                      <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                  </div>

                  <div className="overflow-hidden">
                    <h3
                      itemProp="name"
                      className="font-display text-base sm:text-lg font-bold text-white tracking-tight truncate"
                    >
                      {member.name}
                    </h3>
                    <p
                      itemProp="jobTitle"
                      className="mt-0.5 text-xs text-blue-400 font-semibold truncate"
                    >
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Core Focus */}
                <p className="mt-4 text-xs leading-relaxed text-slate-400 font-normal">
                  <span className="font-semibold text-white">Core Focus: </span>
                  {member.focus}
                </p>

                {/* Key Responsibilities */}
                <div className="mt-4 border-t border-white/10 pt-3.5">
                  <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500">
                    Key Responsibilities
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {member.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300 font-normal">
                        <svg className="h-3.5 w-3.5 text-blue-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Skills Chips & Founder Action */}
              <div className="mt-5 border-t border-white/10 pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[10px] font-mono font-medium text-slate-300 shadow-2xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Founder Direct Action */}
                {isFounder && (
                  <div className="mt-4 pt-3 border-t border-white/10">
                    <a
                      href={`https://wa.me/${phone}?text=Hi%20Aoun%20Abbas!%20I%20am%20reviewing%20DEVSOLE%20Soft%20and%20would%20like%20to%20schedule%20a%20founder%20consultation.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 py-2.5 text-xs font-semibold text-white shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-colors"
                    >
                      <span>Direct Founder Consultation</span>
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Technical Leadership Commitment Banner */}
      <div className="mt-12 rounded-2xl border border-white/10 bg-[#0c101d] p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-blue-400 block">
              Core Engineering Commitment
            </span>
            <h4 className="mt-1 font-display text-lg sm:text-xl font-bold text-white">
              Direct Technical Leadership on Every Sprint
            </h4>
            <p className="mt-1 text-xs text-slate-400 font-normal max-w-xl">
              You collaborate directly with senior full-stack architects. No outsourced developers, no account manager middlemen, and 100% verified staging deliveries.
            </p>
          </div>

          <a
            href={`https://wa.me/${phone}?text=Hi%20DEVSOLE%20Soft!%20I%20want%20to%20schedule%20a%20technical%20discovery%20call.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 text-xs font-semibold shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-colors shrink-0"
          >
            <span>Start Direct Sprint Discussion</span>
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Team;