import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { api, ApiRequestError } from '@/lib/api';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'SUPERADMIN' | 'EDITOR';
}

interface AdminAuthState {
  admin: AdminUser | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthState | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [status, setStatus] = useState<AdminAuthState['status']>('loading');

  const checkSession = useCallback(async () => {
    try {
      const me = await api.get<AdminUser>('/auth/me');
      setAdmin(me);
      setStatus('authenticated');
    } catch {
      setAdmin(null);
      setStatus('unauthenticated');
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const login = useCallback(async (email: string, password: string) => {
    const me = await api.post<AdminUser>('/auth/login', { email, password });
    setAdmin(me);
    setStatus('authenticated');
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      // Logging out should still clear local state even if the network
      // call fails (e.g. session already expired server-side).
      if (!(err instanceof ApiRequestError)) throw err;
    }
    setAdmin(null);
    setStatus('unauthenticated');
  }, []);

  return (
    <AdminAuthContext.Provider value={{ admin, status, login, logout }}>{children}</AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}
