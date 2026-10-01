import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api, ApiRequestError } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import type { Project } from '@/types/content';

const inputClass =
  'w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-chrome-700 focus-visible:outline-energy-bright';
const labelClass = 'mb-1.5 block text-xs text-chrome-500';

interface FormState {
  title: string;
  slug: string;
  description: string;
  category: string;
  coverImage: string;
  liveUrl: string;
  githubUrl: string;
  challenge: string;
  solution: string;
  results: string;
  featured: boolean;
  published: boolean;
}

const EMPTY: FormState = {
  title: '',
  slug: '',
  description: '',
  category: '',
  coverImage: '',
  liveUrl: '',
  githubUrl: '',
  challenge: '',
  solution: '',
  results: '',
  featured: false,
  published: false,
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function ProjectForm() {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>(EMPTY);
  const [slugTouched, setSlugTouched] = useState(false);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    // The public GET /projects/:slug route looks up by slug, not id, so for
    // the admin edit screen we fetch the full (draft-inclusive) list and
    // find the record by id instead of guessing a slug-shaped URL.
    api
      .get<Project[]>('/projects?all=1')
      .then((all) => all.find((p) => p.id === id))
      .then((project) => {
        if (!project) return;
        setForm({
          title: project.title,
          slug: project.slug,
          description: project.description,
          category: project.category ?? '',
          coverImage: project.coverImage ?? '',
          liveUrl: project.liveUrl ?? '',
          githubUrl: project.githubUrl ?? '',
          challenge: project.challenge ?? '',
          solution: project.solution ?? '',
          results: project.results ?? '',
          featured: project.featured,
          published: project.published,
        });
        setSlugTouched(true);
      })
      .finally(() => setLoading(false));
  }, [id]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      ...form,
      category: form.category || null,
      coverImage: form.coverImage || null,
      liveUrl: form.liveUrl || null,
      githubUrl: form.githubUrl || null,
      challenge: form.challenge || null,
      solution: form.solution || null,
      results: form.results || null,
    };

    try {
      if (isEditing) {
        await api.patch(`/projects/${id}`, payload);
      } else {
        await api.post('/projects', payload);
      }
      navigate('/admin/projects');
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'Save failed.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-sm text-chrome-500">Loading…</p>;
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-semibold text-white">
        {isEditing ? 'Edit project' : 'New project'}
      </h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label className={labelClass} htmlFor="title">
            Title
          </label>
          <input
            id="title"
            required
            className={inputClass}
            value={form.title}
            onChange={(e) => {
              const title = e.target.value;
              update('title', title);
              if (!slugTouched) update('slug', slugify(title));
            }}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="slug">
            Slug
          </label>
          <input
            id="slug"
            required
            pattern="[a-z0-9]+(-[a-z0-9]+)*"
            className={inputClass}
            value={form.slug}
            onChange={(e) => {
              setSlugTouched(true);
              update('slug', e.target.value);
            }}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            required
            rows={3}
            className={inputClass}
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="category">
              Category
            </label>
            <input
              id="category"
              className={inputClass}
              value={form.category}
              onChange={(e) => update('category', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="coverImage">
              Cover image URL
            </label>
            <input
              id="coverImage"
              type="url"
              className={inputClass}
              value={form.coverImage}
              onChange={(e) => update('coverImage', e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="liveUrl">
              Live URL
            </label>
            <input
              id="liveUrl"
              type="url"
              className={inputClass}
              value={form.liveUrl}
              onChange={(e) => update('liveUrl', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="githubUrl">
              GitHub URL
            </label>
            <input
              id="githubUrl"
              type="url"
              className={inputClass}
              value={form.githubUrl}
              onChange={(e) => update('githubUrl', e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="challenge">
            Challenge (case study)
          </label>
          <textarea
            id="challenge"
            rows={2}
            className={inputClass}
            value={form.challenge}
            onChange={(e) => update('challenge', e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="solution">
            Solution (case study)
          </label>
          <textarea
            id="solution"
            rows={2}
            className={inputClass}
            value={form.solution}
            onChange={(e) => update('solution', e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="results">
            Results (case study)
          </label>
          <textarea
            id="results"
            rows={2}
            className={inputClass}
            value={form.results}
            onChange={(e) => update('results', e.target.value)}
          />
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm text-chrome-300">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => update('featured', e.target.checked)}
            />
            Featured
          </label>
          <label className="flex items-center gap-2 text-sm text-chrome-300">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => update('published', e.target.checked)}
            />
            Published
          </label>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving…' : 'Save project'}
          </Button>
          <Button type="button" variant="ghost" onClick={() => navigate('/admin/projects')}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
