import { useState, type FormEvent } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useCrmAuth } from '../CrmAuthContext';
import { supabase } from '@/lib/supabase';

export function CrmLogin() {
  const { user, signIn, loading } = useCrmAuth();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isReset, setIsReset] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/crm';

  if (!loading && user) {
    return <Navigate to={from} replace />;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setSubmitting(true);

    try {
      if (isReset) {
        const { error: resetErr } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/crm/reset-password`,
        });
        if (resetErr) throw resetErr;
        setMessage('Password reset email dispatched. Check your inbox.');
      } else {
        const res = await signIn(email, password);
        if (res.error) throw res.error;
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Authentication failed.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950 px-4 selection:bg-energy selection:text-white">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-energy-bright/40 bg-navy-900/90 p-8 shadow-[0_0_60px_rgba(0,240,255,0.2)] backdrop-blur-2xl">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-energy-bright bg-energy/20 text-2xl font-bold text-energy-bright shadow-[0_0_20px_#00f0ff]">
            ⚡
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-white">
            DEVSOLE Cloud CRM
          </h1>
          <p className="mt-1 text-xs text-chrome-400">
            {isReset ? 'Enter email to receive password reset link' : 'Authorized Personnel Sign In'}
          </p>
        </div>

        {error && (
          <div className="mt-5 rounded-xl border border-red-500/40 bg-red-950/30 p-3 text-xs text-red-300">
            {error}
          </div>
        )}

        {message && (
          <div className="mt-5 rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-3 text-xs text-emerald-300">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-chrome-400">
              Work Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@devsole.com"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-chrome-700 focus:border-energy-bright focus:outline-none"
            />
          </div>

          {!isReset && (
            <div>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <label className="font-semibold text-chrome-400">Password</label>
                <button
                  type="button"
                  onClick={() => setIsReset(true)}
                  className="text-energy-bright hover:underline"
                >
                  Forgot?
                </button>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-chrome-700 focus:border-energy-bright focus:outline-none"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-energy-bright py-3.5 text-xs font-bold uppercase tracking-wider text-navy-950 shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-50"
          >
            {submitting
              ? 'Verifying...'
              : isReset
              ? 'Send Reset Link →'
              : 'Access CRM Dashboard →'}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4 text-xs text-chrome-500">
          {isReset ? (
            <button
              onClick={() => setIsReset(false)}
              className="text-energy-bright hover:underline"
            >
              ← Back to Sign In
            </button>
          ) : (
            <span>Strict Role-Based Cloud Access</span>
          )}
          <a href="/" className="hover:text-white">
            Return to devsole.com
          </a>
        </div>
      </div>
    </div>
  );
}