import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useCrmAuth } from './CrmAuthContext';
import type { UserRole } from '@/types/crm';

interface RequireCrmAuthProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

export function RequireCrmAuth({ children, allowedRoles }: RequireCrmAuthProps) {
  const { user, profile, loading } = useCrmAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-navy-950 text-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-energy-bright border-t-transparent shadow-[0_0_20px_#00f0ff]" />
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-energy-bright">
          Authenticating DEVSOLE Cloud Session...
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/crm/login" state={{ from: location }} replace />;
  }

  if (profile?.status === 'suspended') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-navy-950 px-6 text-center text-white">
        <div className="rounded-2xl border border-red-500/30 bg-red-950/20 p-8 shadow-[0_0_40px_rgba(239,68,68,0.2)]">
          <h2 className="font-display text-xl font-bold text-red-400">Account Access Suspended</h2>
          <p className="mt-2 text-sm text-chrome-400">
            Your DEVSOLE CRM account has been temporarily disabled. Contact your administrator.
          </p>
        </div>
      </div>
    );
  }

  if (allowedRoles && profile && !allowedRoles.includes(profile.role)) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-navy-950 px-6 text-center text-white">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-md">
          <h2 className="font-display text-xl font-bold text-energy-bright">Restricted Sector</h2>
          <p className="mt-2 text-sm text-chrome-400">
            Your role ({profile.role.toUpperCase()}) does not possess authorization for this section.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}