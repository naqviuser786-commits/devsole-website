import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { UserProfile, UserRole } from '@/types/crm';
import type { Session, User } from '@supabase/supabase-js';

interface CrmAuthState {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  role: UserRole;
  loading: boolean;
  isAdmin: boolean;
  isManager: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const CrmAuthContext = createContext<CrmAuthState | null>(null);

export function CrmAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchProfile(userId: string, userEmail?: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (data) {
        setProfile(data as UserProfile);
      } else if (!data || error) {
        // Agar profile nahi bani hui to frontend automatic Admin profile create karega
        const newProfile = {
          id: userId,
          email: userEmail || 'admin@devsole.com',
          full_name: userEmail ? userEmail.split('@')[0].toUpperCase() : 'DEVSOLE Admin',
          role: 'admin' as UserRole,
          status: 'active' as const,
        };

        const { data: created } = await supabase
          .from('profiles')
          .upsert(newProfile)
          .select()
          .single();

        if (created) {
          setProfile(created as UserProfile);
        }
      }
    } catch {
      // Profile fetch fallback
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id, session.user.email).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id, session.user.email);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error ? new Error(error.message) : null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setSession(null);
  };

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.id, user.email);
  };

  const role = profile?.role || 'admin';
  const isAdmin = role === 'admin';
  const isManager = role === 'manager' || isAdmin;

  return (
    <CrmAuthContext.Provider
      value={{
        user,
        profile,
        session,
        role,
        loading,
        isAdmin,
        isManager,
        signIn,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </CrmAuthContext.Provider>
  );
}

export function useCrmAuth() {
  const ctx = useContext(CrmAuthContext);
  if (!ctx) throw new Error('useCrmAuth must be used within CrmAuthProvider');
  return ctx;
}