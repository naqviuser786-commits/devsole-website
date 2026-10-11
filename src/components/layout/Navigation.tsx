// FILE: src/components/layout/Navigation.tsx
import { useEffect, useState, useCallback, type MouseEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { soundFX } from '@/lib/soundFx';
import { getLenis } from '@/lib/lenis';

export interface NavItem {
  label: string;
  sectionId: string;
  path: string;
}

export const NAV_LINKS: NavItem[] = [
  { label: 'Home', sectionId: 'home', path: '/' },
  { label: 'About', sectionId: 'about', path: '/about' },
  { label: 'Services', sectionId: 'services', path: '/services' },
  { label: 'Work', sectionId: 'projects', path: '/projects' },
  { label: 'Reviews', sectionId: 'testimonials', path: '/reviews' },
  { label: 'Stack', sectionId: 'technologies', path: '/technologies' },
  { label: 'Process', sectionId: 'process', path: '/process' },
  { label: 'Team', sectionId: 'team', path: '/team' },
  { label: 'Estimator', sectionId: 'estimator', path: '/estimator' },
  { label: 'Insights', sectionId: 'blog', path: '/blog' },
  { label: 'Contact', sectionId: 'contact', path: '/contact' },
];

interface NavigationProps {
  className?: string;
  isMobile?: boolean;
  onNavigate?: () => void;
}

export function Navigation({ className, isMobile = false, onNavigate }: NavigationProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  // Active section tracking for ScrollSpy
  const [activeSection, setActiveSection] = useState<string>('home');

  // 1. ScrollSpy Engine: Detects currently visible section on the homepage in real-time
  const updateActiveSectionOnScroll = useCallback(() => {
    if (!isHomePage) return;

    const scrollPosition = window.scrollY + 160; // Offset for sticky header
    const sectionIds = NAV_LINKS.map((link) => link.sectionId);

    // If near the very top, set Home active
    if (window.scrollY < 120) {
      setActiveSection('home');
      return;
    }

    // Check each section's vertical offset on the page
    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const el = document.getElementById(sectionIds[i]);
      if (el) {
        const top = el.offsetTop;
        if (scrollPosition >= top) {
          setActiveSection(sectionIds[i]);
          return;
        }
      }
    }
  }, [isHomePage]);

  useEffect(() => {
    if (!isHomePage) {
      // If user is on a dedicated route like /process, highlight that link
      const matchingLink = NAV_LINKS.find((l) => l.path === location.pathname);
      if (matchingLink) {
        setActiveSection(matchingLink.sectionId);
      }
      return;
    }

    // Run on mount & listen to scroll
    updateActiveSectionOnScroll();
    window.addEventListener('scroll', updateActiveSectionOnScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateActiveSectionOnScroll);
  }, [isHomePage, location.pathname, updateActiveSectionOnScroll]);

  // 2. Smooth Scroll & Cross-Page Routing Handler (Never traps the user on an isolated page)
  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    e.preventDefault();
    soundFX.playClick();

    if (onNavigate) {
      onNavigate();
    }

    if (isHomePage) {
      // Smoothly scroll to the section on homepage
      const targetElement = document.getElementById(item.sectionId);
      if (targetElement) {
        const lenis = getLenis();
        if (lenis) {
          lenis.scrollTo(targetElement, { offset: -80, duration: 1.2 });
        } else {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        setActiveSection(item.sectionId);
      }
    } else {
      // If user is on an isolated subpage (e.g. /process), navigate back to Home and scroll to that section
      navigate(`/#${item.sectionId}`);
      setTimeout(() => {
        const targetElement = document.getElementById(item.sectionId);
        if (targetElement) {
          const lenis = getLenis();
          if (lenis) {
            lenis.scrollTo(targetElement, { offset: -80, duration: 1.2 });
          } else {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
    }
  };

  if (isMobile) {
    return (
      <nav className={`flex flex-col gap-1 w-full ${className ?? ''}`} aria-label="Mobile Navigation">
        {NAV_LINKS.map((link) => {
          const isActive = activeSection === link.sectionId;

          return (
            <a
              key={link.sectionId}
              href={`#${link.sectionId}`}
              onClick={(e) => handleNavClick(e, link)}
              className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-xs transition-colors duration-150 ${
                isActive
                  ? 'bg-blue-600/15 text-white font-bold border border-blue-500/30'
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
          const isActive = activeSection === link.sectionId;

          return (
            <a
              key={link.sectionId}
              href={`#${link.sectionId}`}
              onClick={(e) => handleNavClick(e, link)}
              className={`relative whitespace-nowrap rounded-lg px-2.5 py-1 text-[11px] transition-all duration-150 ${
                isActive
                  ? 'bg-blue-600/20 text-white shadow-2xs font-semibold border border-blue-500/30'
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