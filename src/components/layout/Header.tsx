import { HeaderLogo } from './HeaderLogo';
import { NAV_LINKS } from './Navigation';
import { useApiData } from '@/hooks/useApiData';
import { siteSettings } from '@/data/siteData';
import type { SiteSettings, SocialLinkItem } from '@/types/content';

const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    icon: '💼',
    url: 'https://www.linkedin.com/company/devsoleofficial/',
  },
  {
    name: 'Instagram',
    icon: '📸',
    url: 'https://www.instagram.com/devsole.tech?stkn=YWQ0NmZoeXNoZjF5',
  },
  {
    name: 'WhatsApp',
    icon: '💬',
    url: 'https://wa.me/923706492398',
  },
  {
    name: 'Email (Gmail)',
    icon: '✉️',
    url: 'mailto:devsole.official@gmail.com',
  },
];

const getSocialIcon = (platform: string) => {
  const p = platform.toLowerCase();
  if (p.includes('linkedin')) return '💼';
  if (p.includes('insta')) return '📸';
  if (p.includes('whatsapp')) return '💬';
  if (p.includes('github')) return '💻';
  if (p.includes('mail') || p.includes('email')) return '✉️';
  return '🔗';
};

export function Footer() {
  const { data: settings } = useApiData<SiteSettings>('/site-settings');
  const { data: remoteSocials } = useApiData<SocialLinkItem[]>('/social-links', []);

  const email = settings?.email || siteSettings.email || 'devsole.official@gmail.com';
  const whatsapp = settings?.whatsapp || siteSettings.whatsapp || '+92 370 6492398';
  const address = settings?.address || siteSettings.address || 'Lahore, Pakistan / Global Delivery';
  const companyName = settings?.companyName || siteSettings.companyName || 'DEVSOLE';

  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="relative border-t border-white/5 bg-navy-950/80 backdrop-blur-md overflow-hidden"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand & Professional Tagline */}
        <div>
          <div className="flex items-center gap-3">
            <HeaderLogo />
            <span className="font-display text-lg font-bold tracking-wider text-white">
              {companyName}
            </span>
          </div>
          <p className="mt-4 max-w-xs text-xs sm:text-sm leading-relaxed text-chrome-400">
            Engineering high-performance web applications, scalable SaaS solutions, and custom PropTech platforms built to accelerate business revenue worldwide.
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-[11px] text-emerald-400 font-mono">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
            <span>Available for New Projects</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-energy-bright">
            Navigation
          </h3>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-xs sm:text-sm text-chrome-400 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Channels */}
        <div>
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-energy-bright">
            Direct Contact
          </h3>
          <ul className="mt-4 space-y-3 text-xs sm:text-sm text-chrome-300">
            <li>
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-energy-bright"
              >
                <span>✉</span>
                <span className="truncate">{email}</span>
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-emerald-400 transition-colors hover:underline"
              >
                <span>💬</span>
                <span>{whatsapp}</span>
              </a>
            </li>
            <li className="flex items-center gap-2 text-xs text-chrome-500">
              <span>📍</span>
              <span>{address}</span>
            </li>
          </ul>
        </div>

        {/* Follow & Social Channels */}
        <div>
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-energy-bright">
            Connect
          </h3>
          <ul className="mt-4 space-y-2 text-xs sm:text-sm text-chrome-300">
            {(remoteSocials && remoteSocials.length > 0
              ? remoteSocials.map((s) => ({
                  name: s.platform,
                  icon: getSocialIcon(s.platform),
                  url: s.url,
                }))
              : SOCIAL_LINKS
            ).map((link) => (
              <li key={link.name}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-3.5 py-1.5 transition-all hover:border-energy-bright/50 hover:bg-energy/10 hover:text-white"
                >
                  <span>{link.icon}</span>
                  <span className="capitalize">{link.name}</span>
                  <span className="text-[10px] text-chrome-600">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Copyright & Trust Guarantee */}
      <div className="border-t border-white/5 px-4 sm:px-6 py-6 text-center text-xs text-chrome-500 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-6xl mx-auto">
        <p>© {year} {companyName}. All rights reserved.</p>
        <p className="text-[11px] text-chrome-500">
          Crafted for high performance, sub-second latency, and verified milestone delivery.
        </p>
      </div>
    </footer>
  );
}