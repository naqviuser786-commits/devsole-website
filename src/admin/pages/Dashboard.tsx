import { useApiData } from '@/hooks/useApiData';
import type { Project } from '@/types/content';

interface ContactMessage {
  id: string;
  read: boolean;
}

export function Dashboard() {
  const { data: projects, loading: projectsLoading } = useApiData<Project[]>('/projects?all=1', []);
  const { data: messages, loading: messagesLoading } = useApiData<ContactMessage[]>('/contact', []);

  const unreadCount = messages?.filter((m) => !m.read).length ?? 0;

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-white">Overview</h1>
      <p className="mt-1 text-sm text-chrome-500">A quick snapshot of the site's content.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Projects" value={projectsLoading ? '—' : String(projects?.length ?? 0)} />
        <StatCard
          label="Published projects"
          value={projectsLoading ? '—' : String(projects?.filter((p) => p.published).length ?? 0)}
        />
        <StatCard label="Unread messages" value={messagesLoading ? '—' : String(unreadCount)} />
      </div>

      <div className="mt-10 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-6 text-sm text-chrome-500">
        Services, Technologies, Testimonials, Team, Blog, FAQ, and Process management are the next
        pieces to wire up — their data models already exist in the database, and their admin pages
        should follow the same pattern as Projects.
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
      <p className="text-xs uppercase tracking-wider text-chrome-500">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}
