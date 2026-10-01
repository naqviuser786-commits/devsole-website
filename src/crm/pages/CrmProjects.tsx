import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Project, ProjectStatus, Customer } from '@/types/crm';
import { useCrmAuth } from '../CrmAuthContext';

export function CrmProjects() {
  const { isManager } = useCrmAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [status, setStatus] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProjects = useCallback(async () => {
    let q = supabase
      .from('projects')
      .select('*, client:customers(name, company_name)')
      .order('created_at', { ascending: false });
    if (status !== 'all') {
      q = q.eq('status', status);
    }
    const { data } = await q;
    setProjects(data || []);
  }, [status]);

  const fetchCustomers = useCallback(async () => {
    const { data } = await supabase.from('customers').select('*');
    setCustomers(data || []);
  }, []);

  useEffect(() => {
    fetchProjects();
    fetchCustomers();
  }, [fetchProjects, fetchCustomers]);

  async function updateProgress(id: string, progress: number) {
    await supabase.from('projects').update({ progress }).eq('id', id);
    fetchProjects();
  }

  async function updateProjectStatus(id: string, newStatus: ProjectStatus) {
    await supabase.from('projects').update({ status: newStatus }).eq('id', id);
    fetchProjects();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Project Deliveries</h1>
          <p className="text-xs text-chrome-500">
            SaaS development, client platforms, progress percentage, and deployment milestones.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Status Filter Dropdown (Ab status aur setStatus dono use ho rahe hain) */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-xl border border-white/10 bg-navy-900 px-3 py-2 text-xs text-white focus:border-energy-bright focus:outline-none"
          >
            <option value="all">All Stages</option>
            <option value="planning">Planning</option>
            <option value="in_progress">In Progress</option>
            <option value="review">Review</option>
            <option value="completed">Completed</option>
            <option value="on_hold">On Hold</option>
          </select>

          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-xl bg-energy-bright px-4 py-2 text-xs font-bold text-navy-950 shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:scale-105 transition-all"
          >
            + New Project
          </button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.length === 0 ? (
          <div className="col-span-3 rounded-3xl border border-dashed border-white/10 p-12 text-center text-xs text-chrome-500">
            No projects in pipeline. Click "+ New Project" to initialize your first build.
          </div>
        ) : (
          projects.map((proj) => (
            <div
              key={proj.id}
              className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-md transition-all hover:border-energy-bright/60 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-energy-bright">
                    {proj.custom_id || 'PROJ'}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-bold text-chrome-300 uppercase">
                    {proj.service_type}
                  </span>
                </div>

                <h3 className="mt-3 font-display text-lg font-bold text-white">{proj.title}</h3>
                <p className="text-xs text-chrome-400">
                  Client: {proj.client?.name || 'Internal'} {proj.client?.company_name ? `(${proj.client.company_name})` : ''}
                </p>

                {/* Live Progress Slider */}
                <div className="mt-5 border-t border-white/5 pt-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-chrome-400">Sprint Progress:</span>
                    <span className="font-mono font-bold text-energy-bright">{proj.progress}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={proj.progress}
                    disabled={!isManager}
                    onChange={(e) => updateProgress(proj.id, Number(e.target.value))}
                    className="mt-2 w-full accent-energy-bright cursor-pointer"
                  />
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-chrome-400">
                  <div>
                    <span>Deadline: </span>
                    <strong className="text-white">{proj.deadline || 'Ongoing'}</strong>
                  </div>
                  <div>
                    <span>Budget: </span>
                    <strong className="font-mono text-white">${proj.budget?.toLocaleString()}</strong>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                <select
                  value={proj.status}
                  onChange={(e) => updateProjectStatus(proj.id, e.target.value as ProjectStatus)}
                  className="rounded-lg border border-white/10 bg-navy-950 px-2 py-1 text-[11px] text-chrome-300"
                >
                  <option value="planning">Planning</option>
                  <option value="in_progress">In Progress</option>
                  <option value="review">Review</option>
                  <option value="completed">Completed</option>
                  <option value="on_hold">On Hold</option>
                </select>

                <span className="text-[10px] text-chrome-500">
                  {new Date(proj.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* New Project Modal */}
      {isModalOpen && (
        <CreateProjectModal
          customers={customers}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setIsModalOpen(false);
            fetchProjects();
          }}
        />
      )}
    </div>
  );
}

function CreateProjectModal({
  customers,
  onClose,
  onSuccess,
}: {
  customers: Customer[];
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { profile } = useCrmAuth();
  const [title, setTitle] = useState('');
  const [clientId, setClientId] = useState('');
  const [serviceType, setServiceType] = useState('Custom Web Application');
  const [budget, setBudget] = useState(650);
  const [deadline, setDeadline] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await supabase.from('projects').insert({
        title,
        client_id: clientId || null,
        service_type: serviceType,
        budget,
        deadline: deadline || null,
        progress: 0,
        status: 'planning',
        project_manager_id: profile?.id,
      });
      onSuccess();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/80 p-4 backdrop-blur-md">
      <div className="w-full max-w-lg rounded-3xl border border-energy-bright/60 bg-navy-900 p-6 shadow-2xl">
        <h3 className="font-display text-lg font-bold text-white">Create New Project</h3>
        <form onSubmit={handleSave} className="mt-4 space-y-3 text-xs">
          <div>
            <label className="mb-1 block text-chrome-400">Project Title *</label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Real Space Properties PropTech Portal"
              className="w-full rounded-xl border border-white/10 bg-navy-950 px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="mb-1 block text-chrome-400">Associate Client / Customer</label>
            <select
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-navy-950 px-3 py-2 text-white"
            >
              <option value="">Select a Customer (Optional)</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} {c.company_name ? `(${c.company_name})` : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-chrome-400">Service Category</label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-navy-950 px-3 py-2 text-white"
              >
                <option value="Custom Web Application">Custom Web Application</option>
                <option value="PropTech & Real Estate">PropTech & Real Estate</option>
                <option value="SaaS Tool & Automation">SaaS Tool & Automation</option>
                <option value="E-Commerce Marketplace">E-Commerce Marketplace</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-chrome-400">Project Budget ($)</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full rounded-xl border border-white/10 bg-navy-950 px-3 py-2 text-white"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-chrome-400">Target Delivery Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-navy-950 px-3 py-2 text-white"
            />
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
              {saving ? 'Creating...' : 'Initialize Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}