// FILE: src/components/sections/Team.tsx
import { SectionHeading } from '@/components/ui/SectionHeading';
import { teamMembers, siteSettings } from '@/data/siteData';
import { soundFX } from '@/lib/soundFx';

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
      aria-label="DEVSOLE Soft Leadership and Web Development Team"
      className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28 overflow-hidden bg-transparent"
    >
      <meta itemProp="name" content="DEVSOLE Soft" />

      {/* Subtle Studio Grid Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <div data-gsap="mask-up">
        <SectionHeading
          eyebrow="Our Developers · Real People"
          title="Meet the Core Developers Behind Your Website"
          description="You communicate directly with the real software engineers who write your code. No outsourced freelancers, no junior handoffs, and 100% transparent milestone delivery."
          align="center"
        />
      </div>

      {/* 3 Executive Studio Team Cards Grid */}
      <div data-gsap="stagger-group" className="mt-12 sm:mt-14 grid items-stretch gap-6 md:grid-cols-3">
        {teamMembers.map((member) => {
          const isFounder = member.name.toUpperCase().includes('AOUN');
          const photoData = getMemberPhoto(member.name);

          return (
            <div
              key={member.id}
              itemScope
              itemType="https://schema.org/Person"
              itemProp="employee"
              onMouseEnter={() => soundFX.playHover()}
              className={`group relative flex flex-col justify-between rounded-2xl border p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 overflow-hidden ${
                isFounder
                  ? 'border-blue-500/50 bg-[#0c101d] shadow-[0_8px_35px_rgba(59,130,246,0.18)] hover:border-blue-400'
                  : 'border-white/10 bg-[#0c101d] hover:border-blue-500/40 shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_35px_rgba(0,0,0,0.7)]'
              }`}
            >
              <meta itemProp="worksFor" content="DEVSOLE Soft" />
              <meta itemProp="knowsAbout" content={member.skills.join(', ')} />

              {/* Circuit Grid Watermark */}
              <div className="bg-grid absolute inset-0 opacity-10 pointer-events-none rounded-2xl" />

              {/* Founder Leadership Badge */}
              {isFounder && (
                <div className="absolute top-4 right-5 z-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(59,130,246,0.4)] bg-blue-600 text-white border border-blue-400/40">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981] animate-pulse" />
                    Founder & Lead Architect
                  </span>
                </div>
              )}

              <div className="relative z-10">
                {/* Portrait Header Frame */}
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 sm:h-22 sm:w-22 shrink-0 overflow-hidden rounded-2xl border border-white/15 bg-[#080c18] shadow-md group-hover:scale-103 transition-transform">
                    <img
                      itemProp="image"
                      src={photoData.local}
                      alt={`${member.name} - ${member.role} at DEVSOLE Soft`}
                      loading="lazy"
                      className="h-full w-full object-cover object-top"
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
                      <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
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

                    {/* 🔗 Clickable Social Verification Links (LinkedIn & GitHub) */}
                    <div className="mt-2 flex items-center gap-2">
                      {member.socialLinks?.linkedin && (
                        <a
                          href={member.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => soundFX.playClick()}
                          className="flex h-6 w-6 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] hover:bg-blue-600/20 hover:border-blue-500/40 text-slate-300 hover:text-white transition-all shadow-2xs"
                          title="Verified LinkedIn Profile"
                          aria-label={`${member.name} LinkedIn Profile`}
                        >
                          <svg className="h-3 w-3 fill-current text-[#0A66C2]" viewBox="0 0 24 24">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.8v8.37h-2.8V10.9M7.86 6.3a1.64 1.64 0 0 0-1.64 1.64c0 .9.74 1.64 1.64 1.64s1.64-.74 1.64-1.64c0-.9-.74-1.64-1.64-1.64" />
                          </svg>
                        </a>
                      )}
                      {member.socialLinks?.github && (
                        <a
                          href={member.socialLinks.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => soundFX.playClick()}
                          className="flex h-6 w-6 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/10 hover:border-white/20 text-slate-300 hover:text-white transition-all shadow-2xs"
                          title="Verified GitHub Commits"
                          aria-label={`${member.name} GitHub Commits`}
                        >
                          <svg className="h-3 w-3 fill-current text-white" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                          </svg>
                        </a>
                      )}
                      <span className="font-mono text-[9px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded font-semibold">
                        Verified Developer
                      </span>
                    </div>
                  </div>
                </div>

                {/* Core Role Summary */}
                <p className="mt-4 text-xs leading-relaxed text-slate-300 font-normal">
                  <strong className="text-white font-semibold">Specialization: </strong>
                  {member.focus}
                </p>

                {/* Responsibilities */}
                <div className="mt-4 border-t border-white/10 pt-3.5">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    What They Build for You:
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {member.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-400 font-normal">
                        <svg className="h-3.5 w-3.5 text-blue-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Skills Chips & Founder Action */}
              <div className="relative z-10 mt-5 border-t border-white/10 pt-4">
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

                {/* Founder Direct Action Channel */}
                {isFounder && (
                  <div className="mt-4 pt-3 border-t border-white/10">
                    <a
                      href={`https://wa.me/${phone}?text=Hi%20Aoun%20Abbas!%20I%20am%20reviewing%20DEVSOLE%20Soft%20and%20would%20like%20to%20schedule%20a%20direct%20founder%20consultation.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundFX.playClick()}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 py-2.5 text-xs font-semibold text-white shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-colors"
                    >
                      <span>Direct Founder Consultation</span>
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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

      {/* Bottom Direct Developer Guarantee Banner */}
      <div data-gsap="fade-up" className="mt-10 rounded-2xl border border-white/10 bg-[#0c101d] p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-blue-400 shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_6px_#3b82f6]" />
              <span>Direct Developer Collaboration</span>
            </div>
            <h4 className="mt-2 font-display text-lg sm:text-xl font-bold text-white">
              Talk Directly with Real Developers on Every Project
            </h4>
            <p className="mt-1 text-xs sm:text-sm text-slate-400 font-normal max-w-xl">
              You collaborate directly with our lead developers who write the actual code. No middlemen, no junior handoffs, and 100% verified milestone progress.
            </p>
          </div>

          <a
            href={`https://wa.me/${phone}?text=Hi%20DEVSOLE%20Soft!%20I%20want%20to%20schedule%20a%20project%20planning%20call%20with%20your%20lead%20developers.`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFX.playClick()}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 text-xs font-semibold shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-colors shrink-0"
          >
            <span>Schedule a Call on WhatsApp</span>
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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