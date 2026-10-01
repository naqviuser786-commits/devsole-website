import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext';

export function RequireAdminAuth({ children }: { children: ReactNode }) {
  const { status } = useAdminAuth();

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy-950 text-chrome-500">
        Checking session…
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
