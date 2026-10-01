import { type ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext';

const NAV_ITEMS = [
  { to: '/admin', label: 'Overview', end: true },
  { to: '/admin/projects', label: 'Projects' },
  { to: '/admin/messages', label: 'Contact Messages' },
  { to: '/admin/social-links', label: 'Social Links' },
  { to: '/admin/settings', label: 'Site Settings' },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
    isActive ? 'bg-energy/15 text-white' : 'text-chrome-400 hover:bg-white/5 hover:text-white'
  }`;

export function AdminLayout({ children }: { children: ReactNode }) {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/admin/login', { replace: true });
  }

  return (
    <div className="flex min-h-screen bg-navy-950 text-chrome-100">
      <aside className="hidden w-64 shrink-0 border-r border-white/5 bg-navy-900/60 p-6 lg:block">
        <div className="mb-8">
          <p className="font-display text-lg font-semibold text-white">DEVSOLE</p>
          <p className="text-xs text-chrome-500">Admin dashboard</p>
        </div>
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-white/5 px-6 py-4">
          <p className="text-sm text-chrome-400 lg:hidden">DEVSOLE Admin</p>
          <div className="ml-auto flex items-center gap-4">
            {admin && (
              <span className="text-sm text-chrome-400">
                {admin.name} <span className="text-chrome-700">· {admin.role}</span>
              </span>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-chrome-300 hover:border-energy/50 hover:text-white"
            >
              Log out
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
