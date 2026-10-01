import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { CrmTask, TaskStatus, TaskPriority, Project } from '@/types/crm';
import { useCrmAuth } from '../CrmAuthContext';

export function CrmTasks() {
  const { profile } = useCrmAuth();
  const [tasks, setTasks] = useState<CrmTask[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [dueDate, setDueDate] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [saving, setSaving] = useState(false);

  const fetchTasks = useCallback(async () => {
    let q = supabase
      .from('tasks')
      .select('*, project:projects(title)')
      .order('created_at', { ascending: false });
    if (statusFilter !== 'all') {
      q = q.eq('status', statusFilter);
    }
    const { data } = await q;
    setTasks(data || []);
  }, [statusFilter]);

  const fetchProjects = useCallback(async () => {
    const { data } = await supabase.from('projects').select('*');
    setProjects(data || []);
  }, []);

  useEffect(() => {
    fetchTasks();
    fetchProjects();

    const channel = supabase
      .channel('tasks_realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, () => {
        fetchTasks();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchTasks, fetchProjects]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newTaskName.trim()) return;
    setSaving(true);

    try {
      await supabase.from('tasks').insert({
        task_name: newTaskName,
        project_id: selectedProject || null,
        priority,
        status: 'todo',
        due_date: dueDate || null,
        assigned_to: profile?.id,
        created_by: profile?.id,
      });

      setNewTaskName('');
      setSelectedProject('');
      setDueDate('');
      fetchTasks();
    } finally {
      setSaving(false);
    }
  }

  async function updateStatus(id: string, status: TaskStatus) {
    await supabase.from('tasks').update({ status }).eq('id', id);
    fetchTasks();
  }

  async function deleteTask(id: string) {
    if (!window.confirm('Delete this task?')) return;
    await supabase.from('tasks').delete().eq('id', id);
    fetchTasks();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Sprint Tasks</h1>
        <p className="text-xs text-chrome-500">
          Action items, bug fixes, feature milestones, and developer assignments.
        </p>
      </div>

      {/* Quick Add Task Form */}
      <form
        onSubmit={handleCreate}
        className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-xs backdrop-blur-md"
      >
        <input
          required
          type="text"
          placeholder="New task title... (e.g. Integrate Stripe Payment API)"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          className="min-w-[240px] flex-1 rounded-xl border border-white/10 bg-navy-950 px-4 py-2.5 text-white placeholder:text-chrome-600 focus:border-energy-bright focus:outline-none"
        />

        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="rounded-xl border border-white/10 bg-navy-950 px-3 py-2.5 text-white focus:border-energy-bright focus:outline-none"
        >
          <option value="">Link Project (Optional)</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriority)}
          className="rounded-xl border border-white/10 bg-navy-950 px-3 py-2.5 text-white focus:border-energy-bright focus:outline-none"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
          <option value="urgent">Urgent</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="rounded-xl border border-white/10 bg-navy-950 px-3 py-2 text-white focus:border-energy-bright focus:outline-none"
        />

        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-energy-bright px-5 py-2.5 font-bold text-navy-950 shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:scale-105 transition-all"
        >
          {saving ? 'Adding...' : '+ Add Task'}
        </button>
      </form>

      {/* Filter tab buttons */}
      <div className="flex items-center gap-2 text-xs">
        {['all', 'todo', 'in_progress', 'review', 'completed'].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`rounded-full px-3.5 py-1.5 font-semibold capitalize transition-all ${
              statusFilter === st
                ? 'bg-energy-bright text-navy-950 font-bold shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                : 'border border-white/10 bg-white/[0.02] text-chrome-400 hover:text-white'
            }`}
          >
            {st.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/10 p-10 text-center text-xs text-chrome-500">
            No tasks found. Use the quick add form above to log sprint items.
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 backdrop-blur-md transition-all hover:border-white/15 hover:bg-white/[0.04]"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.status === 'completed'}
                  onChange={(e) => updateStatus(task.id, e.target.checked ? 'completed' : 'todo')}
                  className="h-4 w-4 rounded accent-energy-bright cursor-pointer"
                />
                <div>
                  <h4
                    className={`font-semibold text-sm ${
                      task.status === 'completed' ? 'text-chrome-500 line-through' : 'text-white'
                    }`}
                  >
                    {task.task_name}
                  </h4>
                  <div className="mt-0.5 flex items-center gap-2 text-[10px] text-chrome-400">
                    {task.project && (
                      <span className="text-energy-bright">
                        📁 {task.project.title}
                      </span>
                    )}
                    <span>Due: {task.due_date || 'No deadline'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase ${
                    task.priority === 'urgent'
                      ? 'border border-red-500/40 bg-red-500/10 text-red-400'
                      : task.priority === 'high'
                      ? 'border border-yellow-500/40 bg-yellow-500/10 text-yellow-400'
                      : 'border border-white/10 bg-white/5 text-chrome-400'
                  }`}
                >
                  {task.priority}
                </span>

                <select
                  value={task.status}
                  onChange={(e) => updateStatus(task.id, e.target.value as TaskStatus)}
                  className="rounded-lg border border-white/10 bg-navy-950 px-2 py-1 text-[10px] text-white"
                >
                  <option value="todo">To Do</option>
                  <option value="in_progress">In Progress</option>
                  <option value="review">Review</option>
                  <option value="completed">Completed</option>
                </select>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-chrome-500 hover:text-red-400 text-xs px-1"
                  title="Delete Task"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}