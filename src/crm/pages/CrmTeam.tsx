import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { UserProfile, UserRole, UserStatus } from '@/types/crm';
import { useCrmAuth } from '../CrmAuthContext';

export function CrmTeam() {
  const { isAdmin } = useCrmAuth();
  const [members, setMembers] = useState<UserProfile[]>([]);

  const fetchMembers = useCallback(async () => {
    const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: true });
    setMembers(data || []);
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  async function updateRole(id: string, role: UserRole) {
    if (!isAdmin) return;
    await supabase.from('profiles').update({ role }).eq('id', id);
    fetchMembers();
  }

  async function updateStatus(id: string, status: UserStatus) {
    if (!isAdmin) return;
    await supabase.from('profiles').update({ status }).eq('id', id);
    fetchMembers();
  }

  if (!isAdmin) {
    return (
      <div className="rounded-3xl border border-red-500/30 bg-red-950/20 p-8 text-center text-xs text-red-300">
        Access Denied. Only DEVSOLE Administrators possess authority to manage team roles and permissions.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Team & Access Control (RBAC)</h1>
        <p className="text-xs text-chrome-500">
          Manage team member accounts, adjust permission roles, and suspend/activate cloud access.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02]">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-white/5 bg-white/[0.02] text-[10px] font-bold uppercase tracking-wider text-chrome-500">
            <tr>
              <th className="p-4">Team Member</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Account Status</th>
              <th className="p-4">Joined Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-chrome-300">
            {members.map((m) => (
              <tr key={m.id} className="hover:bg-white/[0.02]">
                <td className="p-4 font-bold text-white flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-energy/20 text-energy-bright font-mono text-[10px]">
                    {m.full_name?.charAt(0) || 'U'}
                  </div>
                  <span>{m.full_name}</span>
                </td>
                <td className="p-4">{m.email}</td>
                <td className="p-4">
                  <select
                    value={m.role}
                    onChange={(e) => updateRole(m.id, e.target.value as UserRole)}
                    className="rounded-lg border border-white/10 bg-navy-950 px-2.5 py-1 text-[11px] text-energy-bright font-bold uppercase"
                  >
                    <option value="admin">Owner / Admin</option>
                    <option value="manager">Manager</option>
                    <option value="employee">Employee</option>
                  </select>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => updateStatus(m.id, m.status === 'active' ? 'suspended' : 'active')}
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                      m.status === 'active'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-red-500/20 text-red-400 border border-red-500/40'
                    }`}
                  >
                    {m.status}
                  </button>
                </td>
                <td className="p-4 text-chrome-500">
                  {new Date(m.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}