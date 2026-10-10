import type { ReactNode } from 'react';
import { HeaderLogo } from './HeaderLogo';
import { NAV_LINKS } from './Navigation';
import { useApiData } from '@/hooks/useApiData';
import type { SiteSettings, SocialLinkItem } from '@/types/content';

const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    platform: 'linkedin',
    url: 'https://www.linkedin.com/company/devsoleofficial/',
  },
  {
    name: 'Instagram',
    platform: 'instagram',
    url: 'https://www.instagram.com/devsole.tech?stkn=YWQ0NmZoeXNoZjF5',
  },
  {
    name: 'WhatsApp',
    platform: 'whatsapp',
    url: 'https://wa.me/923706492398',
  },
  {
    name: 'Email (Gmail)',
    platform: 'email',
    url: 'mailto:devsole.official@gmail.com',
  },
];

// Clean, Official Vector Brand SVGs (Zero Emojis)
function renderBrandLogo(platform: string): ReactNode {
  const p = platform.toLowerCase();

  if (p.includes('linkedin')) {
    return (
      <svg className="h-4 w-4 shrink-0 fill-[#0A66C2]" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.8v8.37h-2.8V10.9M7.86 6.3a1.64 1.64 0 0 0-1.64 1.64c0 .9.74 1.64 1.64 1.64s1.64-.74 1.64-1.64c0-.9-.74-1.64-1.64-1.64" />
      </svg>
    );
  }

  if (p.includes('insta')) {
    return (
      <svg className="h-4 w-4 shrink-0 text-[#E4405F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  }

  if (p.includes('whatsapp')) {
    return (
      <svg className="h-4 w-4 shrink-0 fill-[#25D366]" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
      </svg>
    );
  }

  if (p.includes('mail') || p.includes('email')) {
    return (
      <svg className="h-4 w-4 shrink-0 text-[#EA4335]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    );
  }

  if (p.includes('github')) {
    return (
      <svg className="h-4 w-4 shrink-0 fill-current text-white" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    );
  }

  if (p.includes('x') || p.includes('twitter')) {
    return (
      <svg className="h-4 w-4 shrink-0 fill-current text-white" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }

  if (p.includes('youtube')) {
    return (
      <svg className="h-4 w-4 shrink-0 fill-[#FF0000]" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  }

  // Fallback Web Link Icon
  return (
    <svg className="h-4 w-4 shrink-0 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

export function Footer() {
  const { data: settings } = useApiData<SiteSettings>('/site-settings');
  const { data: remoteSocials } = useApiData<SocialLinkItem[]>('/social-links', []);

  const email = settings?.email || 'devsole.official@gmail.com';
  const whatsapp = settings?.whatsapp || '+92 370 6492398';
  const address = settings?.address || 'Lahore, Pakistan · Global Project Delivery';
  const companyName = 'DEVSOLE Soft';

  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="relative border-t border-white/10 bg-[#04060b]/90 backdrop-blur-xl overflow-hidden"
    >
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 py-14 sm:py-16 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand & Studio Proposition */}
        <div>
          <div className="flex items-center gap-2.5">
            <HeaderLogo />
            <span className="font-display text-base sm:text-lg font-bold tracking-tight text-white">
              DEVSOLE <span className="text-blue-500 font-extrabold">Soft</span>
            </span>
          </div>
          <p className="mt-3.5 max-w-xs text-xs sm:text-sm leading-relaxed text-slate-400 font-normal">
            Engineering high-performance web applications, scalable SaaS solutions, and custom PropTech platforms built to accelerate business revenue worldwide.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] text-emerald-400 font-mono font-medium shadow-2xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981] animate-pulse" />
            <span>Available for New Sprints</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
            Navigation
          </h3>
          <ul className="mt-3.5 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-xs sm:text-sm text-slate-400 transition-colors hover:text-blue-400 font-medium"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Direct Contact Channels with Real SVGs */}
        <div>
          <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
            Direct Contact
          </h3>
          <ul className="mt-3.5 space-y-2.5 text-xs sm:text-sm text-slate-400">
            <li>
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-blue-400 font-medium group text-slate-300"
              >
                <svg className="h-4 w-4 shrink-0 text-[#EA4335]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span className="truncate">{email}</span>
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-emerald-400 font-semibold transition-colors hover:underline"
              >
                <svg className="h-4 w-4 shrink-0 fill-[#25D366]" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>{whatsapp}</span>
              </a>
            </li>
            <li className="flex items-center gap-2 text-xs text-slate-400">
              <svg className="h-4 w-4 shrink-0 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{address}</span>
            </li>
          </ul>
        </div>

        {/* Social Channels with Authentic Brand Logos */}
        <div>
          <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
            Connect
          </h3>
          <ul className="mt-3.5 space-y-2 text-xs sm:text-sm text-slate-300">
            {(remoteSocials && remoteSocials.length > 0
              ? remoteSocials.map((s) => ({
                  name: s.platform,
                  platform: s.platform,
                  url: s.url,
                }))
              : SOCIAL_LINKS
            ).map((link) => (
              <li key={link.name}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-1.5 shadow-2xs transition-all hover:border-white/20 hover:text-blue-400 group text-slate-300"
                >
                  {renderBrandLogo(link.platform || link.name)}
                  <span className="capitalize font-medium text-slate-300 group-hover:text-blue-400 transition-colors">
                    {link.name}
                  </span>
                  <span className="text-[10px] text-slate-500 group-hover:text-blue-400 transition-colors">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Copyright & Trust Guarantee */}
      <div className="border-t border-white/10 px-4 sm:px-6 py-5 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-6xl mx-auto">
        <p>© {year} {companyName}. All rights reserved.</p>
        <p className="text-[11px] text-slate-500">
          Crafted for high performance, sub-second latency, and verified milestone delivery.
        </p>
      </div>
    </footer>
  );
}

export default Footer;