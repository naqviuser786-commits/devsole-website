import { useEffect, useState, useCallback, type FormEvent } from 'react';
import { supabase } from '@/lib/supabase';
import type { FollowupType, FollowupStatus } from '@/types/crm';
import { useCrmAuth } from '../CrmAuthContext';

interface TargetOption {
  id: string;
  name: string;
}

interface TargetPerson {
  name: string;
  whatsapp?: string | null;
}

interface FollowupRecord {
  id: string;
  title: string;
  followup_date: string;
  type: FollowupType;
  status: FollowupStatus;
  notes?: string | null;
  customer?: TargetPerson | TargetPerson[] | null;
  lead?: TargetPerson | TargetPerson[] | null;
}

export function CrmFollowups() {
  const { profile } = useCrmAuth();
  const [followups, setFollowups] = useState<FollowupRecord[]>([]);
  const [customers, setCustomers] = useState<TargetOption[]>([]);
  const [leads, setLeads] = useState<TargetOption[]>([]);
  
  // Form fields
  const [title, setTitle] = useState('');
  const [type, setType] = useState<FollowupType>('whatsapp');
  const [targetId, setTargetId] = useState('');
  const [targetType, setTargetType] = useState<'customer' | 'lead'>('lead');
  const [date, setDate] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchFollowups = useCallback(async () => {
    try {
      const { data } = await supabase
        .from('followups')
        .select('id, title, followup_date, type, status, notes, customer:customers(name, whatsapp), lead:leads(name, whatsapp)')
        .order('followup_date', { ascending: true });

      if (data) {
        setFollowups(data as unknown as FollowupRecord[]);
      }
    } catch {
      // Fetch error fallback
    }
  }, []);

  useEffect(() => {
    fetchFollowups();

    // Fetch simple ID and Name for dropdown options
    supabase
      .from('customers')
      .select('id, name')
      .then(({ data }) => {
        if (data) setCustomers(data as TargetOption[]);
      });

    supabase
      .from('leads')
      .select('id, name')
      .then(({ data }) => {
        if (data) setLeads(data as TargetOption[]);
      });
  }, [fetchFollowups]);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !date) return;
    setSaving(true);

    try {
      await supabase.from('followups').insert({
        title,
        type,
        customer_id: targetType === 'customer' && targetId ? targetId : null,
        lead_id: targetType === 'lead' && targetId ? targetId : null,
        followup_date: new Date(date).toISOString(),
        status: 'pending',
        assigned_to: profile?.id,
      });

      setTitle('');
      setDate('');
      setTargetId('');
      fetchFollowups();
    } finally {
      setSaving(false);
    }
  }

  async function updateStatus(id: string, status: FollowupStatus) {
    await supabase.from('followups').update({ status }).eq('id', id);
    fetchFollowups();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Client Follow-ups & Reminders</h1>
        <p className="text-xs text-chrome-500">
          Scheduled calls, WhatsApp chats, discovery meetings, and demo appointments.
        </p>
      </div>

      {/* Scheduler Form */}
      <form
        onSubmit={handleCreate}
        className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 text-xs backdrop-blur-md space-y-3"
      >
        <h3 className="font-bold text-white text-sm">Schedule a Follow-up</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <input
            required
            placeholder="Follow-up Title (e.g. Discuss Scope Breakdown)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-xl border border-white/10 bg-navy-950 px-3 py-2 text-white placeholder:text-chrome-600 focus:border-energy-bright focus:outline-none"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value as FollowupType)}
            className="rounded-xl border border-white/10 bg-navy-950 px-3 py-2 text-white focus:border-energy-bright focus:outline-none"
          >
            <option value="whatsapp">WhatsApp Discussion</option>
            <option value="call">Phone Call</option>
            <option value="meeting">Zoom / Google Meet</option>
            <option value="email">Email Update</option>
          </select>

          <input
            required
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-xl border border-white/10 bg-navy-950 px-3 py-2 text-white focus:border-energy-bright focus:outline-none"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <select
            value={targetType}
            onChange={(e) => {
              setTargetType(e.target.value as 'customer' | 'lead');
              setTargetId('');
            }}
            className="rounded-xl border border-white/10 bg-navy-950 px-3 py-2 text-white focus:border-energy-bright focus:outline-none"
          >
            <option value="lead">Target: Lead Prospect</option>
            <option value="customer">Target: Existing Customer</option>
          </select>

          <select
            value={targetId}
            onChange={(e) => setTargetId(e.target.value)}
            className="rounded-xl border border-white/10 bg-navy-950 px-3 py-2 text-white sm:col-span-2 focus:border-energy-bright focus:outline-none"
          >
            <option value="">Select Person (Optional)</option>
            {targetType === 'lead'
              ? leads.map((l) => (
                  <option key={l.id} value={l.id}>
                    Lead: {l.name}
                  </option>
                ))
              : customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    Customer: {c.name}
                  </option>
                ))}
          </select>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-energy-bright px-5 py-2 font-bold text-navy-950 shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:scale-105 transition-all"
          >
            {saving ? 'Scheduling...' : 'Set Reminder'}
          </button>
        </div>
      </form>

      {/* Follow-up Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {followups.length === 0 ? (
          <div className="col-span-2 rounded-2xl border border-dashed border-white/10 p-8 text-center text-xs text-chrome-500">
            No pending follow-ups scheduled. Use the form above to set client reminders.
          </div>
        ) : (
          followups.map((f) => {
            // Normalize single vs array join
            const rawLead = Array.isArray(f.lead) ? f.lead[0] : f.lead;
            const rawCust = Array.isArray(f.customer) ? f.customer[0] : f.customer;
            const targetPerson = rawLead || rawCust;

            return (
              <div
                key={f.id}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md text-xs space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-energy-bright/40 bg-energy/10 px-2.5 py-0.5 text-[9px] font-bold uppercase text-energy-bright">
                      {f.type}
                    </span>
                    <span className="font-mono text-chrome-400">
                      {new Date(f.followup_date).toLocaleString()}
                    </span>
                  </div>

                  <h4 className="mt-2 font-display text-sm font-bold text-white">{f.title}</h4>
                  {targetPerson && (
                    <p className="mt-1 text-chrome-300">
                      Target: <strong className="text-white">{targetPerson.name}</strong>
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-3">
                  {targetPerson?.whatsapp ? (
                    <a
                      href={`https://wa.me/${targetPerson.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 font-bold hover:underline"
                    >
                      💬 WhatsApp
                    </a>
                  ) : (
                    <span className="text-[10px] text-chrome-600">No phone attached</span>
                  )}

                  <button
                    type="button"
                    onClick={() => updateStatus(f.id, f.status === 'completed' ? 'pending' : 'completed')}
                    className={`rounded-lg px-3 py-1 font-semibold transition-colors ${
                      f.status === 'completed'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'border border-white/10 text-chrome-300 hover:text-white'
                    }`}
                  >
                    {f.status === 'completed' ? '✓ Completed' : 'Mark Done'}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}