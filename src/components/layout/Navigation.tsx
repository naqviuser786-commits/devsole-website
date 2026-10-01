import { useEffect, useState } from 'react';

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Technologies', href: '#technologies' },
  { label: 'Process', href: '#process' },
  { label: 'Team', href: '#team' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

interface NavigationProps {
  className?: string;
  isMobile?: boolean;
  onNavigate?: () => void;
}

export function Navigation({ className, isMobile = false, onNavigate }: NavigationProps) {
  const [activeHash, setActiveHash] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;

      for (const link of NAV_LINKS) {
        const id = link.href.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveHash(link.href);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (href: string) => {
    setActiveHash(href);
    if (onNavigate) onNavigate();
  };

  // 📱 MOBILE VIEW: Full-width touch friendly cards with glowing active state
  if (isMobile) {
    return (
      <nav className={`flex flex-col gap-1.5 w-full ${className ?? ''}`} aria-label="Mobile Navigation">
        {NAV_LINKS.map((link) => {
          const isActive = activeHash === link.href;

          return (
            <a
              key={link.href}
              href={link.href}
              onClick={() => handleClick(link.href)}
              className={`flex items-center justify-between w-full px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'border border-energy-bright/60 bg-energy/15 text-energy-bright shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                  : 'border border-white/5 bg-white/[0.02] text-chrome-300 hover:border-white/20 hover:bg-white/[0.05] hover:text-white'
              }`}
            >
              <span>{link.label}</span>
              {isActive ? (
                <span className="flex items-center gap-1.5 text-xs text-energy-bright">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-energy-bright shadow-[0_0_6px_#00f0ff]" />
                  Active
                </span>
              ) : (
                <span className="text-chrome-600 text-xs">→</span>
              )}
            </a>
          );
        })}
      </nav>
    );
  }

  // 🖥️ DESKTOP VIEW: Floating Glass Capsule Dock
  return (
    <nav className={className} aria-label="Desktop Navigation">
      <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 shadow-inner backdrop-blur-md">
        {NAV_LINKS.map((link) => {
          const isActive = activeHash === link.href;

          return (
            <a
              key={link.href}
              href={link.href}
              onClick={() => handleClick(link.href)}
              className={`relative rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide transition-all duration-300 ${
                isActive
                  ? 'border border-energy-bright/60 bg-gradient-to-r from-energy/25 to-energy-bright/15 text-white shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                  : 'border border-transparent text-chrome-400 hover:border-white/10 hover:bg-white/[0.05] hover:text-white'
              }`}
            >
              {isActive && (
                <span className="absolute -top-0.5 right-1 h-1 w-1 animate-ping rounded-full bg-energy-bright" />
              )}
              {link.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}