import { useState, type ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCrmAuth } from './CrmAuthContext';

const NAV_ITEMS = [
  { to: '/crm', label: 'Dashboard', icon: '⚡', end: true },
  { to: '/crm/leads', label: 'Leads Pipeline', icon: '🎯' },
  { to: '/crm/customers', label: 'Customers', icon: '👥' },
  { to: '/crm/projects', label: 'Projects', icon: '🚀' },
  { to: '/crm/portfolio', label: 'Portfolio Showcase', icon: '🌐' },
  { to: '/crm/reviews', label: 'Client Reviews', icon: '⭐' }, // 👈 Yeh nayi line add karein
  { to: '/crm/tasks', label: 'Tasks', icon: '📋' },
  { to: '/crm/followups', label: 'Follow-ups', icon: '⏰' },
  { to: '/crm/team', label: 'Team & Roles', icon: '🛡️', adminOnly: true },
];

export function CrmLayout({ children }: { children: ReactNode }) {
  const { profile, signOut, isAdmin } = useCrmAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut();
    navigate('/crm/login', { replace: true });
  }

  return (
    <div className="flex min-h-screen bg-navy-950 font-sans text-chrome-100 selection:bg-energy selection:text-white">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy-950/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Futuristic Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/5 bg-navy-900/90 p-5 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-energy-bright/50 bg-energy/20 text-sm font-bold text-energy-bright shadow-[0_0_15px_rgba(0,240,255,0.4)]">
              D
            </div>
            <div>
              <span className="font-display text-base font-bold tracking-wider text-white">
                DEVSOLE
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-energy-bright font-mono">
                Cloud CRM
              </span>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-chrome-500 hover:text-white lg:hidden"
          >
            ✕
          </button>
        </div>

        {/* Live Network Cloud Pill */}
        <div className="mt-4 flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2 text-xs">
          <span className="flex items-center gap-2 text-chrome-400">
            <span className="h-2 w-2 animate-ping rounded-full bg-energy-bright" />
            Supabase Cloud
          </span>
          <span className="rounded-full bg-energy/20 px-2 py-0.5 text-[10px] font-bold text-energy-bright font-mono uppercase">
            {profile?.role || 'Live'}
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="mt-6 flex-1 space-y-1.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            if (item.adminOnly && !isAdmin) return null;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'border border-energy-bright/50 bg-gradient-to-r from-energy/30 to-energy-bright/10 text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                      : 'border border-transparent text-chrome-400 hover:border-white/5 hover:bg-white/[0.03] hover:text-white'
                  }`
                }
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Profile & Sign out */}
        <div className="mt-auto border-t border-white/5 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-energy-bright/40 bg-energy/10 text-xs font-bold text-energy-bright">
                {profile?.full_name?.charAt(0) || 'A'}
              </div>
              <div className="max-w-[110px] overflow-hidden">
                <p className="truncate text-xs font-semibold text-white">{profile?.full_name}</p>
                <p className="truncate text-[10px] text-chrome-500">{profile?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="rounded-lg border border-white/10 p-1.5 text-xs text-chrome-400 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400 transition-colors"
            >
              🚪
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content View */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/5 bg-navy-950/80 px-4 sm:px-8 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg border border-white/10 p-2 text-white hover:bg-white/5 lg:hidden"
            >
              ☰
            </button>
            <span className="hidden font-mono text-xs text-chrome-500 sm:inline">
              SYS://DEVSOLE_CLOUD_WORKSPACE
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-chrome-400 transition-colors hover:border-energy-bright/50 hover:text-white"
            >
              <span>🌐 Public Site</span>
              <span className="text-[10px]">↗</span>
            </a>
            <div className="h-4 w-px bg-white/10" />
            <span className="rounded-full border border-energy-bright/40 bg-energy/10 px-3 py-1 text-[11px] font-bold text-energy-bright">
              {profile?.role?.toUpperCase()}
            </span>
          </div>
        </header>

        {/* Page Inner Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
}