import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, ApiRequestError } from '@/lib/api';
import { ButtonLink } from '@/components/ui/Button';
import type { Project } from '@/types/content';

export function ProjectsList() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const data = await api.get<Project[]>('/projects?all=1');
      setProjects(data);
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'Failed to load projects.');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function togglePublished(project: Project) {
    setBusyId(project.id);
    try {
      await api.patch(`/projects/${project.id}`, { published: !project.published });
      await load();
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'Update failed.');
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(project: Project) {
    if (!window.confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
    setBusyId(project.id);
    try {
      await api.delete(`/projects/${project.id}`);
      await load();
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'Delete failed.');
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-white">Projects</h1>
          <p className="mt-1 text-sm text-chrome-500">Create, publish, and reorder portfolio projects.</p>
        </div>
        <ButtonLink href="/admin/projects/new">New project</ButtonLink>
      </div>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <div className="mt-8 overflow-hidden rounded-2xl border border-white/5">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/[0.03] text-xs uppercase tracking-wider text-chrome-500">
            <tr>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Featured</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {projects === null ? (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-chrome-500">
                  Loading…
                </td>
              </tr>
            ) : projects.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-chrome-500">
                  No projects yet. Create the first one.
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project.id}>
                  <td className="px-5 py-4 font-medium text-white">{project.title}</td>
                  <td className="px-5 py-4 text-chrome-400">{project.category ?? '—'}</td>
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      disabled={busyId === project.id}
                      onClick={() => togglePublished(project)}
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        project.published
                          ? 'bg-energy/20 text-energy-bright'
                          : 'bg-white/5 text-chrome-500'
                      }`}
                    >
                      {project.published ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="px-5 py-4 text-chrome-400">{project.featured ? 'Yes' : 'No'}</td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex justify-end gap-3">
                      <Link
                        to={`/admin/projects/${project.id}/edit`}
                        className="text-xs font-medium text-chrome-300 hover:text-white"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        disabled={busyId === project.id}
                        onClick={() => handleDelete(project)}
                        className="text-xs font-medium text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
