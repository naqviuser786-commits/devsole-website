import { SectionHeading } from '@/components/ui/SectionHeading';
import { teamMembers, siteSettings } from '@/data/siteData';

const TEAM_PHOTOS: Record<string, { local: string; fallback: string }> = {
  AOUN: {
    local: '/images/aoun-abbas.jpg',
    fallback: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
  },
  AMINA: {
    local: '/images/amina-mazhar.jpg',
    fallback: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  },
  MOMNA: {
    local: '/images/syeda-momna.jpg',
    fallback: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
  },
};

export function Team() {
  const phone = siteSettings.whatsapp.replace(/\D/g, '');

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
      aria-label="DEVSOLE Leadership & Engineering Team"
      className="relative mx-auto max-w-6xl px-4 sm:px-6 py-24 sm:py-28 overflow-hidden"
    >
      <meta itemProp="name" content="DEVSOLE" />

      <SectionHeading
        eyebrow="Leadership & Engineers"
        title="Meet the Team Behind DEVSOLE"
        description="Dedicated leaders, full-stack builders, and UI/UX specialists committed to your project's technical success."
        align="center"
      />

      <div className="mt-12 sm:mt-14 grid items-start gap-8 md:grid-cols-3">
        {teamMembers.map((member) => {
          const isFounder = member.name.toUpperCase().includes('AOUN');
          const photoData = getMemberPhoto(member.name);

          return (
            <div
              key={member.id}
              itemScope
              itemType="https://schema.org/Person"
              itemProp="employee"
              className={`group relative flex flex-col justify-between rounded-3xl p-7 sm:p-8 backdrop-blur-md transition-all duration-500 ${
                isFounder
                  ? 'border-2 border-energy-bright/60 bg-gradient-to-b from-energy/20 via-navy-950/90 to-navy-950 shadow-[0_0_45px_rgba(0,240,255,0.22)] md:-translate-y-3 hover:border-energy-bright hover:shadow-[0_0_60px_rgba(0,240,255,0.35)]'
                  : 'border border-white/10 bg-navy-950/70 hover:border-energy-bright/50 hover:bg-white/[0.03] hover:shadow-[0_0_35px_rgba(0,240,255,0.15)]'
              }`}
            >
              <meta itemProp="worksFor" content="DEVSOLE" />
              <meta itemProp="knowsAbout" content={member.skills.join(', ')} />

              {/* Founder VIP Glow Badge */}
              {isFounder && (
                <div className="absolute -top-3.5 right-6 z-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-energy-bright bg-navy-950 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-energy-bright shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-energy-bright" />
                    Founder & Lead Architect
                  </span>
                </div>
              )}

              <div>
                {/* Profile Portrait Header with Image SEO */}
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 sm:h-22 sm:w-22 shrink-0 overflow-hidden rounded-2xl border-2 border-energy-bright/50 bg-navy-900 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-transform duration-300 group-hover:scale-105 group-hover:border-energy-bright">
                    <img
                      itemProp="image"
                      src={photoData.local}
                      alt={`${member.name} — ${member.role} at DEVSOLE`}
                      loading="lazy"
                      className="h-full w-full object-cover object-top"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src !== photoData.fallback) {
                          target.src = photoData.fallback;
                        }
                      }}
                    />
                    <span
                      className={`absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-navy-950 ${
                        isFounder ? 'bg-energy-bright shadow-[0_0_10px_#00f0ff]' : 'bg-energy-soft'
                      }`}
                      title="Verified DEVSOLE Engineer"
                    >
                      ✓
                    </span>
                  </div>

                  <div>
                    <h3
                      itemProp="name"
                      className={`font-display text-lg sm:text-xl font-bold ${
                        isFounder ? 'text-white' : 'text-chrome-100'
                      }`}
                    >
                      {member.name}
                    </h3>
                    <p
                      itemProp="jobTitle"
                      className="mt-0.5 text-xs font-semibold text-energy-bright"
                    >
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Core Focus */}
                <p className="mt-5 text-xs leading-relaxed text-chrome-300">
                  <span className="font-semibold text-white">Core Focus: </span>
                  {member.focus}
                </p>

                {/* Key Responsibilities */}
                <div className="mt-5 border-t border-white/5 pt-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-chrome-500 font-mono">
                    Key Responsibilities
                  </p>
                  <ul className="mt-2.5 space-y-1.5">
                    {member.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-chrome-400">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-energy-bright shadow-[0_0_6px_#00f0ff]" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="mt-6 border-t border-white/5 pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium transition-colors ${
                        isFounder
                          ? 'border border-energy/40 bg-energy/10 text-energy-bright'
                          : 'border border-white/10 bg-white/5 text-chrome-300 group-hover:border-energy/30 group-hover:text-chrome-200'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Founder Direct Chat Action */}
                {isFounder && (
                  <div className="mt-4 pt-3 border-t border-white/5">
                    <a
                      href={`https://wa.me/${phone}?text=Hi%20Aoun!%20I%20am%20reviewing%20your%20DEVSOLE%20portfolio%20and%20would%20like%20to%20discuss%20a%20project%20with%20you.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-energy-bright py-2.5 text-xs font-bold text-navy-950 shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-all hover:scale-102"
                    >
                      <span>💬 Direct Founder Consultation →</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}