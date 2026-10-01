import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Customer, CustomerStatus } from '@/types/crm';
import { useCrmAuth } from '../CrmAuthContext';

export function CrmCustomers() {
  const { isAdmin } = useCrmAuth();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<string>('all');
  const [selectedCust, setSelectedCust] = useState<Customer | null>(null);

  const fetchCustomers = useCallback(async () => {
    let q = supabase.from('customers').select('*').order('created_at', { ascending: false });
    if (status !== 'all') {
      q = q.eq('status', status);
    }
    const { data } = await q;
    setCustomers(data || []);
  }, [status]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  async function handleDelete(id: string) {
    if (!isAdmin) {
      alert('Only Administrators can delete Customer records.');
      return;
    }
    if (!window.confirm('Delete this customer? Associated projects will also be affected.')) return;
    await supabase.from('customers').delete().eq('id', id);
    fetchCustomers();
  }

  async function updateStatus(id: string, newStatus: CustomerStatus) {
    await supabase.from('customers').update({ status: newStatus }).eq('id', id);
    fetchCustomers();
  }

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.company_name?.toLowerCase().includes(search.toLowerCase()) ||
      (c.custom_id && c.custom_id.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Customer Database</h1>
          <p className="text-xs text-chrome-500">
            Official client records, company credentials, and engagement history.
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-3 text-xs">
        <input
          type="text"
          placeholder="Search by name, company, email, or Customer ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2 text-white placeholder:text-chrome-600 focus:border-energy-bright focus:outline-none"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border border-white/10 bg-navy-900 px-3 py-2 text-white focus:border-energy-bright focus:outline-none"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="contacted">Contacted</option>
          <option value="inactive">Inactive</option>
          <option value="converted">Converted</option>
        </select>
      </div>

      {/* Customers Table */}
      <div className="overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02]">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-white/5 bg-white/[0.02] text-[10px] font-bold uppercase tracking-wider text-chrome-500">
            <tr>
              <th className="p-4">Customer ID</th>
              <th className="p-4">Client Name & Company</th>
              <th className="p-4">Contact Channels</th>
              <th className="p-4">Status</th>
              <th className="p-4">Location</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-chrome-300">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-chrome-500">
                  No customers found. (Convert a lead from Leads Pipeline to see it here).
                </td>
              </tr>
            ) : (
              filtered.map((c) => (
                <tr key={c.id} className="hover:bg-white/[0.02]">
                  <td className="p-4 font-mono font-bold text-energy-bright">
                    {c.custom_id || 'CUST'}
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-white">{c.name}</p>
                    <p className="text-[10px] text-chrome-500">{c.company_name || 'Individual Client'}</p>
                  </td>
                  <td className="p-4">
                    <div>{c.email}</div>
                    <div className="text-[10px] text-chrome-500">{c.whatsapp || c.phone || 'N/A'}</div>
                  </td>
                  <td className="p-4">
                    <select
                      value={c.status}
                      onChange={(e) => updateStatus(c.id, e.target.value as CustomerStatus)}
                      className="rounded-lg border border-white/10 bg-navy-950 px-2 py-1 text-[10px] text-white"
                    >
                      <option value="active">Active</option>
                      <option value="contacted">Contacted</option>
                      <option value="inactive">Inactive</option>
                      <option value="lost">Lost</option>
                    </select>
                  </td>
                  <td className="p-4 text-chrome-400">
                    {c.city ? `${c.city}, ${c.country}` : c.country}
                  </td>
                  <td className="p-4 text-right space-x-3">
                    <button
                      onClick={() => setSelectedCust(c)}
                      className="text-xs font-semibold text-energy-bright hover:underline"
                    >
                      Details
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="text-xs font-semibold text-red-400 hover:underline"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Customer Quick Slide-in Drawer */}
      {selectedCust && (
        <div className="fixed inset-0 z-50 flex justify-end bg-navy-950/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-navy-900 p-6 shadow-2xl overflow-y-auto border-l border-white/10">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <span className="font-mono text-xs text-energy-bright">
                {selectedCust.custom_id || 'CLIENT'}
              </span>
              <button
                onClick={() => setSelectedCust(null)}
                className="text-chrome-400 hover:text-white text-base"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-4 text-xs">
              <div>
                <h3 className="font-display text-xl font-bold text-white">{selectedCust.name}</h3>
                <p className="text-chrome-400">{selectedCust.company_name || 'Individual'}</p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 space-y-2.5">
                <p>
                  <strong className="text-chrome-400">Email:</strong> {selectedCust.email}
                </p>
                <p>
                  <strong className="text-chrome-400">Phone / WhatsApp:</strong>{' '}
                  {selectedCust.whatsapp || selectedCust.phone || 'N/A'}
                </p>
                <p>
                  <strong className="text-chrome-400">Source:</strong> {selectedCust.source}
                </p>
                <p>
                  <strong className="text-chrome-400">Client Since:</strong>{' '}
                  {new Date(selectedCust.created_at).toLocaleDateString()}
                </p>
              </div>

              {selectedCust.whatsapp && (
                <a
                  href={`https://wa.me/${selectedCust.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 font-bold text-navy-950 shadow-lg hover:bg-emerald-400 transition-colors"
                >
                  💬 Start Direct WhatsApp Chat
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}