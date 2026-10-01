import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useCrmAuth } from '../CrmAuthContext';
import type { Lead, Project, CrmTask, Followup, CrmActivity } from '@/types/crm';
import { Link } from 'react-router-dom';

export function CrmDashboard() {
  const { profile } = useCrmAuth();
  const [stats, setStats] = useState({
    customers: 0,
    newLeads: 0,
    activeProjects: 0,
    pendingTasks: 0,
    upcomingFollowups: 0,
  });
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [activeProjects, setActiveProjects] = useState<Project[]>([]);
  const [pendingTasks, setPendingTasks] = useState<CrmTask[]>([]);
  const [followups, setFollowups] = useState<Followup[]>([]);
  const [activities, setActivities] = useState<CrmActivity[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    try {
      const [
        { count: custCount },
        { count: leadsCount },
        { count: projCount },
        { count: taskCount },
        { count: followCount },
      ] = await Promise.all([
        supabase.from('customers').select('*', { count: 'exact', head: true }),
        supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'new'),
        supabase.from('projects').select('*', { count: 'exact', head: true }).eq('status', 'in_progress'),
        supabase.from('tasks').select('*', { count: 'exact', head: true }).neq('status', 'completed'),
        supabase.from('followups').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
      ]);

      setStats({
        customers: custCount || 0,
        newLeads: leadsCount || 0,
        activeProjects: projCount || 0,
        pendingTasks: taskCount || 0,
        upcomingFollowups: followCount || 0,
      });

      const { data: leads } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      setRecentLeads(leads || []);

      const { data: projs } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'in_progress')
        .order('created_at', { ascending: false })
        .limit(4);
      setActiveProjects(projs || []);

      const { data: tasks } = await supabase
        .from('tasks')
        .select('*, project:projects(title)')
        .neq('status', 'completed')
        .order('due_date', { ascending: true })
        .limit(4);
      setPendingTasks(tasks || []);

      const { data: follow } = await supabase
        .from('followups')
        .select('*')
        .eq('status', 'pending')
        .order('followup_date', { ascending: true })
        .limit(4);
      setFollowups(follow || []);

      const { data: act } = await supabase
        .from('crm_activities')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      setActivities(act || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();

    const channel = supabase
      .channel('crm_dashboard_realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, () => {
        fetchDashboardData();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, () => {
        fetchDashboardData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchDashboardData]);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-gradient-to-r from-energy/20 via-navy-900 to-navy-950 p-6 sm:p-8 shadow-[0_0_30px_rgba(0,240,255,0.1)]">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-energy-bright font-mono">
            COMMAND CENTER OVERVIEW
          </span>
          <h1 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-white">
            Welcome back, {profile?.full_name}
          </h1>
          <p className="mt-1 text-xs text-chrome-400">
            Real-time business telemetry across DEVSOLE agency clients and pipelines.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/crm/leads"
            className="rounded-xl bg-energy-bright px-4 py-2.5 text-xs font-bold text-navy-950 shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all hover:scale-105"
          >
            + Review Leads
          </Link>
          <Link
            to="/crm/projects"
            className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/10"
          >
            All Projects
          </Link>
        </div>
      </div>

      {/* 5-Metrics Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard title="Total Customers" value={stats.customers} icon="👥" color="cyan" />
        <StatCard title="New Leads" value={stats.newLeads} icon="🎯" color="purple" highlight />
        <StatCard title="Active Projects" value={stats.activeProjects} icon="🚀" color="blue" />
        <StatCard title="Pending Tasks" value={stats.pendingTasks} icon="📋" color="yellow" />
        <StatCard title="Upcoming Follow-ups" value={stats.upcomingFollowups} icon="⏰" color="emerald" />
      </div>

      {/* Grid: Leads Pipeline + Active Projects */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left: Recent Incoming Leads (2 Cols) */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-md lg:col-span-2">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div>
              <h3 className="font-display text-base font-bold text-white">Incoming Leads</h3>
              <p className="text-[11px] text-chrome-500">Live website forms & discovery modal inquiries</p>
            </div>
            <Link to="/crm/leads" className="text-xs font-semibold text-energy-bright hover:underline">
              View All →
            </Link>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/5 text-[10px] uppercase tracking-wider text-chrome-500">
                  <th className="pb-3">Lead ID & Client</th>
                  <th className="pb-3">Service</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Value</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentLeads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-chrome-500">
                      {loading ? 'Fetching pipeline...' : 'No leads recorded yet.'}
                    </td>
                  </tr>
                ) : (
                  recentLeads.map((lead) => (
                    <tr key={lead.id} className="group hover:bg-white/[0.02]">
                      <td className="py-3">
                        <span className="font-mono text-[10px] text-energy-bright block">
                          {lead.custom_id}
                        </span>
                        <span className="font-bold text-white">{lead.name}</span>
                        {lead.company && (
                          <span className="block text-[10px] text-chrome-500">{lead.company}</span>
                        )}
                      </td>
                      <td className="py-3 text-chrome-300">{lead.service_interested}</td>
                      <td className="py-3">
                        <span className="rounded-full border border-energy-bright/40 bg-energy/10 px-2.5 py-0.5 text-[10px] font-bold text-energy-bright uppercase">
                          {lead.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 font-mono font-semibold text-white">
                        ${lead.estimated_value?.toLocaleString()}
                      </td>
                      <td className="py-3 text-right">
                        {lead.whatsapp && (
                          <a
                            href={`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-400 hover:bg-emerald-500/20"
                          >
                            WhatsApp
                          </a>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Active Projects Progress (1 Col) */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h3 className="font-display text-base font-bold text-white">Active Projects</h3>
            <Link to="/crm/projects" className="text-xs font-semibold text-energy-bright hover:underline">
              Manage →
            </Link>
          </div>

          <div className="mt-4 space-y-4">
            {activeProjects.length === 0 ? (
              <p className="py-4 text-xs text-chrome-500">No active projects in progress.</p>
            ) : (
              activeProjects.map((p) => (
                <div key={p.id} className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xs font-bold text-white">{p.title}</span>
                    <span className="font-mono text-xs font-bold text-energy-bright">{p.progress}%</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-energy to-energy-bright"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-chrome-500">
                    <span>Deadline: {p.deadline || 'Flexible'}</span>
                    <span className="font-mono text-white">${p.budget?.toLocaleString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Grid: Priority Tasks + Upcoming Follow-ups + Audit Trail */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Priority Tasks */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h3 className="font-display text-base font-bold text-white">Priority Tasks</h3>
            <Link to="/crm/tasks" className="text-xs text-energy-bright hover:underline">
              View All →
            </Link>
          </div>
          <div className="mt-4 space-y-2.5">
            {pendingTasks.length === 0 ? (
              <p className="text-xs text-chrome-500">No pending tasks.</p>
            ) : (
              pendingTasks.map((t) => (
                <div
                  key={t.id}
                  className="flex items-start justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs"
                >
                  <div>
                    <p className="font-semibold text-white">{t.task_name}</p>
                    <p className="text-[10px] text-chrome-500">Due: {t.due_date || 'No date'}</p>
                  </div>
                  <span className="rounded-full border border-yellow-500/40 bg-yellow-500/10 px-2 py-0.5 text-[9px] font-bold text-yellow-400 uppercase">
                    {t.priority}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Scheduled Follow-ups */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h3 className="font-display text-base font-bold text-white">Upcoming Follow-ups</h3>
            <Link to="/crm/followups" className="text-xs text-energy-bright hover:underline">
              Schedule →
            </Link>
          </div>
          <div className="mt-4 space-y-2.5">
            {followups.length === 0 ? (
              <p className="text-xs text-chrome-500">No upcoming follow-ups.</p>
            ) : (
              followups.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs"
                >
                  <div>
                    <p className="font-semibold text-white">{f.title}</p>
                    <p className="text-[10px] text-chrome-500">
                      {new Date(f.followup_date).toLocaleString()}
                    </p>
                  </div>
                  <span className="rounded-full border border-energy-bright/40 bg-energy/10 px-2 py-0.5 text-[9px] font-bold text-energy-bright uppercase">
                    {f.type}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Real-time Audit Trail */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-md">
          <h3 className="border-b border-white/5 pb-4 font-display text-base font-bold text-white">
            Audit Activity Trail
          </h3>
          <div className="mt-4 space-y-3">
            {activities.length === 0 ? (
              <p className="text-xs text-chrome-500">No activity logged yet.</p>
            ) : (
              activities.map((a) => (
                <div key={a.id} className="flex items-start gap-2.5 text-xs text-chrome-400">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-energy-bright shadow-[0_0_6px_#00f0ff]" />
                  <div>
                    <span className="font-medium text-white">{a.action}</span>
                    <span className="block text-[10px] text-chrome-600">
                      {new Date(a.created_at).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  highlight = false,
}: {
  title: string;
  value: number;
  icon: string;
  color: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 backdrop-blur-md transition-all ${
        highlight
          ? 'border-energy-bright/60 bg-energy-bright/10 shadow-[0_0_25px_rgba(0,240,255,0.2)]'
          : 'border-white/5 bg-white/[0.02] hover:border-white/20'
      }`}
    >
      <div className="flex items-center justify-between text-chrome-400">
        <span className="text-xs font-semibold">{title}</span>
        <span className="text-base">{icon}</span>
      </div>
      <p className="mt-3 font-display text-3xl font-extrabold text-white">{value}</p>
    </div>
  );
}