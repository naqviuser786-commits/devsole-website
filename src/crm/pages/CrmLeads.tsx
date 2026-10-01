import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Lead, LeadStatus, LeadPriority } from '@/types/crm';
import { useCrmAuth } from '../CrmAuthContext';

const STATUS_COLUMNS: { id: LeadStatus; label: string }[] = [
  { id: 'new', label: 'New Inquiries' },
  { id: 'contacted', label: 'Contacted' },
  { id: 'qualified', label: 'Qualified' },
  { id: 'proposal_sent', label: 'Proposal Sent' },
  { id: 'negotiation', label: 'Negotiation' },
  { id: 'converted', label: 'Converted' },
  { id: 'lost', label: 'Lost / Closed' },
];

export function CrmLeads() {
  const { profile } = useCrmAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchLeads = useCallback(async () => {
    let query = supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (statusFilter !== 'all') {
      query = query.eq('status', statusFilter);
    }
    const { data } = await query;
    setLeads(data || []);
  }, [statusFilter]);

  useEffect(() => {
    fetchLeads();

    const channel = supabase
      .channel('leads_realtime_board')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, () => {
        fetchLeads();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchLeads]);

  async function updateStatus(id: string, newStatus: LeadStatus) {
    await supabase.from('leads').update({ status: newStatus }).eq('id', id);
    await supabase.from('crm_activities').insert({
      entity_type: 'lead',
      entity_id: id,
      action: `Lead moved to ${newStatus.replace('_', ' ').toUpperCase()}`,
      performed_by: profile?.id,
    });
    fetchLeads();
  }

  async function deleteLead(id: string, name: string) {
    if (!window.confirm(`Delete lead "${name}" from CRM?`)) return;

    try {
      await supabase.from('leads').delete().eq('id', id);
      await supabase.from('crm_activities').insert({
        entity_type: 'lead',
        action: `Lead Deleted: ${name}`,
        performed_by: profile?.id,
      });
      fetchLeads();
    } catch {
      alert('Delete failed.');
    }
  }

  async function convertToCustomer(lead: Lead) {
    if (!window.confirm(`Convert "${lead.name}" into an official DEVSOLE Customer?`)) return;

    const { data: cust, error } = await supabase
      .from('customers')
      .insert({
        name: lead.name,
        company_name: lead.company,
        email: lead.email,
        phone: lead.phone,
        whatsapp: lead.whatsapp,
        source: lead.source,
        status: 'active',
        assigned_to: lead.assigned_to || profile?.id,
      })
      .select()
      .single();

    if (!error && cust) {
      await supabase
        .from('leads')
        .update({ status: 'converted', converted_customer_id: cust.id })
        .eq('id', lead.id);

      alert(`Lead successfully converted into Customer (${cust.custom_id || 'Active'})!`);
      fetchLeads();
    }
  }

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      l.company?.toLowerCase().includes(search.toLowerCase()) ||
      (l.custom_id && l.custom_id.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Leads Pipeline</h1>
          <p className="text-xs text-chrome-500">
            Real-time prospective clients generated from public site forms and estimators.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex rounded-xl border border-white/10 bg-white/[0.03] p-1 text-xs">
            <button
              onClick={() => setViewMode('kanban')}
              className={`rounded-lg px-3 py-1 font-semibold transition-all ${
                viewMode === 'kanban' ? 'bg-energy-bright text-navy-950 font-bold' : 'text-chrome-400'
              }`}
            >
              Kanban
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`rounded-lg px-3 py-1 font-semibold transition-all ${
                viewMode === 'table' ? 'bg-energy-bright text-navy-950 font-bold' : 'text-chrome-400'
              }`}
            >
              Table
            </button>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-xl bg-energy-bright px-4 py-2 text-xs font-bold text-navy-950 shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:scale-105 transition-all"
          >
            + Create Lead
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-3 text-xs">
        <input
          type="text"
          placeholder="Search by name, email, company, or lead ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2 text-white placeholder:text-chrome-600 focus:border-energy-bright focus:outline-none"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-white/10 bg-navy-900 px-3 py-2 text-white focus:border-energy-bright focus:outline-none"
        >
          <option value="all">All Stages</option>
          {STATUS_COLUMNS.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {viewMode === 'kanban' ? (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {STATUS_COLUMNS.map((col) => {
            const colLeads = filteredLeads.filter((l) => l.status === col.id);

            return (
              <div
                key={col.id}
                className="flex w-72 shrink-0 flex-col rounded-3xl border border-white/5 bg-navy-900/60 p-4 backdrop-blur-md"
              >
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className="font-display text-xs font-bold uppercase tracking-wider text-white">
                    {col.label}
                  </span>
                  <span className="rounded-full bg-energy/20 px-2 py-0.5 text-[10px] font-bold text-energy-bright font-mono">
                    {colLeads.length}
                  </span>
                </div>

                <div className="mt-3 flex-1 space-y-3 overflow-y-auto">
                  {colLeads.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-white/5 py-8 text-center text-[11px] text-chrome-600">
                      Empty stage
                    </div>
                  ) : (
                    colLeads.map((lead) => (
                      <div
                        key={lead.id}
                        className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-xs transition-all hover:border-energy-bright/60 hover:bg-white/[0.04] hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] text-energy-bright">
                            {lead.custom_id || 'LEAD'}
                          </span>

                          <div className="flex items-center gap-1.5">
                            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] font-medium text-chrome-400 uppercase">
                              {lead.priority}
                            </span>
                            <button
                              onClick={() => deleteLead(lead.id, lead.name)}
                              className="rounded p-1 text-chrome-500 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                              title="Delete Lead"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>

                        <h4 className="mt-2 font-display text-sm font-bold text-white">{lead.name}</h4>
                        {lead.company && <p className="text-[11px] text-chrome-400">{lead.company}</p>}

                        <div className="mt-2.5 border-t border-white/5 pt-2 text-[11px]">
                          <span className="text-chrome-500">Service: </span>
                          <span className="text-chrome-300 font-medium">{lead.service_interested}</span>
                        </div>

                        <div className="mt-1 flex items-center justify-between font-mono text-[11px]">
                          <span className="text-chrome-500">Value:</span>
                          <span className="font-bold text-energy-bright">
                            ${lead.estimated_value?.toLocaleString()}
                          </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2.5">
                          {lead.whatsapp && (
                            <a
                              href={`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[11px] font-bold text-emerald-400 hover:underline"
                            >
                              💬 WhatsApp
                            </a>
                          )}

                          <select
                            value={lead.status}
                            onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                            className="rounded-lg border border-white/10 bg-navy-950 px-2 py-1 text-[10px] text-chrome-300"
                          >
                            {STATUS_COLUMNS.map((c) => (
                              <option key={c.id} value={c.id}>
                                → {c.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {lead.status !== 'converted' && (
                          <button
                            onClick={() => convertToCustomer(lead)}
                            className="mt-2.5 w-full rounded-lg border border-energy/40 bg-energy/10 py-1 text-[10px] font-bold text-energy-bright hover:bg-energy/20"
                          >
                            ✓ Convert to Customer
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02]">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.02] text-[10px] font-bold uppercase tracking-wider text-chrome-500 border-b border-white/5">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Lead Name</th>
                <th className="p-4">Email / Phone</th>
                <th className="p-4">Service</th>
                <th className="p-4">Stage</th>
                <th className="p-4">Est. Value</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-chrome-300">
              {filteredLeads.map((l) => (
                <tr key={l.id} className="hover:bg-white/[0.02]">
                  <td className="p-4 font-mono text-[11px] text-energy-bright">{l.custom_id || 'LEAD'}</td>
                  <td className="p-4 font-bold text-white">{l.name}</td>
                  <td className="p-4">
                    <div>{l.email}</div>
                    <div className="text-[10px] text-chrome-500">{l.phone || l.whatsapp}</div>
                  </td>
                  <td className="p-4">{l.service_interested}</td>
                  <td className="p-4">
                    <span className="rounded-full border border-energy-bright/40 bg-energy/10 px-2.5 py-0.5 text-[10px] font-bold text-energy-bright uppercase">
                      {l.status}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold text-white">${l.estimated_value?.toLocaleString()}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => convertToCustomer(l)}
                      className="text-xs font-semibold text-energy-bright hover:underline"
                    >
                      Convert
                    </button>
                    <button
                      onClick={() => deleteLead(l.id, l.name)}
                      className="text-xs font-semibold text-red-400 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <CreateLeadModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setIsModalOpen(false);
            fetchLeads();
          }}
        />
      )}
    </div>
  );
}

function CreateLeadModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { profile } = useCrmAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState('Custom Web Application');
  const [value, setValue] = useState(500);
  const [priority, setPriority] = useState<LeadPriority>('medium');
  const [saving, setSaving] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const { data, error } = await supabase
        .from('leads')
        .insert({
          name,
          email,
          phone,
          whatsapp: phone,
          company,
          service_interested: service,
          estimated_value: value,
          priority,
          source: 'Manual Team Entry',
          assigned_to: profile?.id,
        })
        .select()
        .single();

      if (!error && data) {
        await supabase.from('crm_activities').insert({
          entity_type: 'lead',
          entity_id: data.id,
          action: `New Lead Created (${data.name})`,
          performed_by: profile?.id,
        });
        onSuccess();
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/80 p-4 backdrop-blur-md">
      <div className="w-full max-w-lg rounded-3xl border border-energy-bright/60 bg-navy-900 p-6 shadow-2xl">
        <h3 className="font-display text-lg font-bold text-white">Add New Prospect Lead</h3>
        <form onSubmit={handleSave} className="mt-4 space-y-3 text-xs">
          <div>
            <label className="mb-1 block text-chrome-400">Prospect / Client Name *</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-navy-950 px-3 py-2 text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-chrome-400">Email Address *</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-navy-950 px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-chrome-400">WhatsApp / Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+92 300 0000000"
                className="w-full rounded-xl border border-white/10 bg-navy-950 px-3 py-2 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-chrome-400">Company Name</label>
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-navy-950 px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-chrome-400">Estimated Value ($)</label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full rounded-xl border border-white/10 bg-navy-950 px-3 py-2 text-white"
              />
            </div>
          </div>

          {/* ⚡ Service Dropdown (setService is now actively used) */}
          <div>
            <label className="mb-1 block text-chrome-400">Service Category</label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-navy-950 px-3 py-2 text-white"
            >
              <option value="Custom Web Application">Custom Web Application</option>
              <option value="PropTech & Real Estate">PropTech & Real Estate</option>
              <option value="SaaS Tool & Automation">SaaS Tool & Automation</option>
              <option value="E-Commerce Marketplace">E-Commerce Marketplace</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-chrome-400">Priority Level</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as LeadPriority)}
              className="w-full rounded-xl border border-white/10 bg-navy-950 px-3 py-2 text-white"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div className="mt-5 flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 px-4 py-2 text-chrome-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-energy-bright px-5 py-2 font-bold text-navy-950"
            >
              {saving ? 'Saving...' : 'Save Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}