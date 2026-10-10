import { useEffect, useState, useRef } from 'react';

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#projects' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Stack', href: '#technologies' },
  { label: 'Process', href: '#process' },
  { label: 'Team', href: '#team' },
  { label: 'Estimator', href: '#estimator' },
  { label: 'Insights', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

interface NavigationProps {
  className?: string;
  isMobile?: boolean;
  onNavigate?: () => void;
}

export function Navigation({ className, isMobile = false, onNavigate }: NavigationProps) {
  const [activeHash, setActiveHash] = useState('#home');
  const isClickingRef = useRef(false);
  const clickTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    let ticking = false;

    const updateActiveSection = () => {
      if (isClickingRef.current) {
        ticking = false;
        return;
      }

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 70) {
        setActiveHash('#contact');
        ticking = false;
        return;
      }

      const scrollAnchor = window.scrollY + 140;
      let currentActive = NAV_LINKS[0].href;

      for (const link of NAV_LINKS) {
        const id = link.href.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollAnchor >= top && scrollAnchor < top + height) {
            currentActive = link.href;
            break;
          } else if (scrollAnchor >= top) {
            currentActive = link.href;
          }
        }
      }

      setActiveHash(currentActive);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateActiveSection();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (clickTimeoutRef.current) {
        window.clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActiveHash(href);

    isClickingRef.current = true;
    if (clickTimeoutRef.current) {
      window.clearTimeout(clickTimeoutRef.current);
    }
    clickTimeoutRef.current = window.setTimeout(() => {
      isClickingRef.current = false;
    }, 900);

    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 90;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }

    if (onNavigate) onNavigate();
  };

  if (isMobile) {
    return (
      <nav className={`flex flex-col gap-1 w-full ${className ?? ''}`} aria-label="Mobile Navigation">
        {NAV_LINKS.map((link) => {
          const isActive = activeHash === link.href;

          return (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-xs transition-colors duration-150 ${
                isActive
                  ? 'bg-white/10 text-white font-bold border border-white/15'
                  : 'text-slate-300 hover:text-white hover:bg-white/5 font-medium'
              }`}
            >
              <span>{link.label}</span>
              {isActive ? (
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_6px_#3b82f6]" />
              ) : (
                <svg className="h-3.5 w-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              )}
            </a>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className={className} aria-label="Desktop Navigation">
      <div className="flex items-center gap-0.5 rounded-xl border border-white/10 bg-white/[0.03] p-1 backdrop-blur-md overflow-x-auto max-w-full">
        {NAV_LINKS.map((link) => {
          const isActive = activeHash === link.href;

          return (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={`relative whitespace-nowrap rounded-lg px-2.5 py-1 text-[11px] transition-all duration-150 ${
                isActive
                  ? 'bg-white/10 text-white shadow-2xs font-semibold border border-white/15'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 font-medium'
              }`}
            >
              {link.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

export default Navigation;