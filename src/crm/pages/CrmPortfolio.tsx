import { useEffect, useState, useCallback, useRef, type FormEvent, type ChangeEvent } from 'react';
import { supabase } from '@/lib/supabase';
import { useCrmAuth } from '../CrmAuthContext';

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  description: string;
  image?: string | null;
  live_url?: string | null;
  github_url?: string | null;
  technologies: string[];
  status: string;
  featured: boolean;
  created_at: string;
}

export function CrmPortfolio() {
  const { profile } = useCrmAuth();
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      const { data } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) {
        setProjects(
          data.map((item) => ({
            ...item,
            technologies: Array.isArray(item.technologies)
              ? item.technologies
              : typeof item.technologies === 'string'
              ? item.technologies.split(',').map((s: string) => s.trim())
              : [],
          }))
        );
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  async function handleDelete(id: string, title: string) {
    if (!window.confirm(`Are you sure you want to delete "${title}" from the public website?`))
      return;

    await supabase.from('portfolio_projects').delete().eq('id', id);
    await supabase.from('crm_activities').insert({
      entity_type: 'portfolio',
      action: `Deleted portfolio project "${title}"`,
      performed_by: profile?.id,
    });
    fetchProjects();
  }

  async function toggleFeatured(project: PortfolioProject) {
    await supabase
      .from('portfolio_projects')
      .update({ featured: !project.featured })
      .eq('id', project.id);
    fetchProjects();
  }

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Website Portfolio CMS</h1>
          <p className="text-xs text-chrome-500">
            Publish, edit, or delete live projects displayed on the public devsole.com portfolio.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingProject(null);
            setIsModalOpen(true);
          }}
          className="rounded-xl bg-energy-bright px-5 py-2.5 text-xs font-bold text-navy-950 shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all hover:scale-105 active:scale-95"
        >
          + Add New Portfolio Project
        </button>
      </div>

      {/* Filter Bar */}
      <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-3 text-xs">
        <input
          type="text"
          placeholder="Search by title, category, or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-navy-950 px-4 py-2.5 text-white placeholder:text-chrome-600 focus:border-energy-bright focus:outline-none"
        />
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-3 py-12 text-center text-xs text-chrome-500">
            Loading portfolio items...
          </div>
        ) : filtered.length === 0 ? (
          <div className="col-span-3 rounded-3xl border border-dashed border-white/10 p-12 text-center text-xs text-chrome-500">
            No projects found. Click "+ Add New Portfolio Project" to publish your first work!
          </div>
        ) : (
          filtered.map((p) => (
            <div
              key={p.id}
              className="flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md transition-all hover:border-energy-bright/60 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]"
            >
              <div>
                {/* Image Frame */}
                <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/10 bg-navy-900">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-mono text-xs text-chrome-600">
                      No Preview Image
                    </div>
                  )}

                  <span className="absolute top-3 left-3 rounded-full border border-energy-bright/40 bg-navy-950/90 px-2.5 py-0.5 text-[10px] font-bold text-energy-bright backdrop-blur-md">
                    {p.status}
                  </span>

                  <button
                    onClick={() => toggleFeatured(p)}
                    className={`absolute top-3 right-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold transition-all ${
                      p.featured
                        ? 'border border-yellow-400 bg-yellow-500/20 text-yellow-300'
                        : 'border border-white/10 bg-navy-950/80 text-chrome-400'
                    }`}
                  >
                    ★ {p.featured ? 'Featured' : 'Standard'}
                  </button>
                </div>

                <div className="p-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-energy-bright">
                    {p.category}
                  </span>
                  <h3 className="mt-1 font-display text-base font-bold text-white">{p.title}</h3>
                  <p className="mt-2 text-xs text-chrome-400 line-clamp-3 leading-relaxed">
                    {p.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5 border-t border-white/5 pt-3">
                    {p.technologies.slice(0, 5).map((t) => (
                      <span
                        key={t}
                        className="rounded-lg border border-white/5 bg-white/[0.04] px-2 py-0.5 text-[10px] text-chrome-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between border-t border-white/5 bg-white/[0.01] px-5 py-3.5 text-xs">
                <div className="flex items-center gap-3">
                  {p.live_url && (
                    <a
                      href={p.live_url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-energy-bright hover:underline"
                    >
                      Live Link ↗
                    </a>
                  )}
                  {p.github_url && (
                    <a
                      href={p.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-chrome-400 hover:text-white"
                    >
                      GitHub ↗
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setEditingProject(p);
                      setIsModalOpen(true);
                    }}
                    className="text-chrome-300 hover:text-white font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id, p.title)}
                    className="font-semibold text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Project Modal (Add / Edit) */}
      {isModalOpen && (
        <PortfolioProjectModal
          project={editingProject}
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

function PortfolioProjectModal({
  project,
  onClose,
  onSuccess,
}: {
  project: PortfolioProject | null;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { profile } = useCrmAuth();
  const [title, setTitle] = useState(project?.title || '');
  const [category, setCategory] = useState(project?.category || 'Custom Web Application');
  const [description, setDescription] = useState(project?.description || '');
  const [image, setImage] = useState(project?.image || '');
  const [liveUrl, setLiveUrl] = useState(project?.live_url || '');
  const [githubUrl, setGithubUrl] = useState(project?.github_url || '');
  const [technologies, setTechnologies] = useState(
    project ? project.technologies.join(', ') : 'HTML5, Tailwind CSS, JavaScript, PHP, MySQL'
  );
  const [status, setStatus] = useState(project?.status || 'Live Project');
  const [featured, setFeatured] = useState(project?.featured || false);
  const [saving, setSaving] = useState(false);

  // 🖼️ Dual Image Mode: 'upload' (Device/Gallery) vs 'url' (Web URL)
  const [imageMode, setImageMode] = useState<'upload' | 'url'>('upload');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const inputClass =
    'w-full rounded-xl border border-white/10 bg-navy-950 px-3.5 py-2.5 text-xs text-white placeholder:text-chrome-600 focus:border-energy-bright focus:outline-none';

  // Handle Device / Laptop Image Selection
  async function handleFileSelect(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setImageError('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }

    setImageError(null);
    setUploadingImage(true);

    try {
      // 1. Try uploading to Supabase Storage Bucket
      const fileExt = file.name.split('.').pop() || 'png';
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `projects/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(filePath, file);

      if (!uploadError) {
        const { data: urlData } = supabase.storage
          .from('portfolio-images')
          .getPublicUrl(filePath);

        setImage(urlData.publicUrl);
        setUploadingImage(false);
        return;
      }
    } catch {
      // Supabase storage bucket not configured fallback
    }

    // 2. Automatic Fallback: Local Base64 Canvas Compression (< 300KB)
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxDim = 1200;
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.82);
          setImage(compressedBase64);
          setUploadingImage(false);
        };
      };
      reader.readAsDataURL(file);
    } catch {
      setImageError('Failed to process image. Try pasting an image URL instead.');
      setUploadingImage(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);

    const techArray = technologies
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title,
      category,
      description,
      image: image.trim() || null,
      live_url: liveUrl.trim() || null,
      github_url: githubUrl.trim() || null,
      technologies: techArray,
      status,
      featured,
    };

    try {
      if (project) {
        await supabase.from('portfolio_projects').update(payload).eq('id', project.id);
        await supabase.from('crm_activities').insert({
          entity_type: 'portfolio',
          action: `Updated portfolio project: ${title}`,
          performed_by: profile?.id,
        });
      } else {
        await supabase.from('portfolio_projects').insert(payload);
        await supabase.from('crm_activities').insert({
          entity_type: 'portfolio',
          action: `Added new portfolio project: ${title}`,
          performed_by: profile?.id,
        });
      }
      onSuccess();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/80 p-4 backdrop-blur-md">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-energy-bright/60 bg-navy-900 p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <h3 className="font-display text-lg font-bold text-white">
            {project ? 'Edit Portfolio Project' : 'Publish New Portfolio Project'}
          </h3>
          <button onClick={onClose} className="text-chrome-400 hover:text-white">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
          <div>
            <label className="mb-1 block font-semibold text-chrome-400">Project Title *</label>
            <input
              required
              placeholder="e.g. Apex Global Logistics Platform"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-semibold text-chrome-400">Category Tag *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputClass}
              >
                <option value="Full-Stack Real Estate Web Application">
                  PropTech & Real Estate
                </option>
                <option value="Interactive SaaS Calculator & Automation">SaaS & Automation</option>
                <option value="Dynamic E-Commerce Marketplace">E-Commerce Marketplace</option>
                <option value="Custom Web Application">Custom Web Application</option>
                <option value="Branding Showcase & Interactive Portal">Creative Agency & Branding</option>
                <option value="Healthcare & Online Appointment Booking">Healthcare & Medical</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block font-semibold text-chrome-400">Status Badge</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={inputClass}
              >
                <option value="Live Project">Live Project</option>
                <option value="Live SaaS Tool">Live SaaS Tool</option>
                <option value="Case Study">Case Study</option>
                <option value="Demo Portfolio">Demo Portfolio</option>
                <option value="Client Handover">Client Handover</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block font-semibold text-chrome-400">
              Project Description *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Explain the features, architecture, and client impact..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* 🖼️ DUAL IMAGE SELECTION (UPLOAD FROM LAPTOP OR PASTE URL) */}
          <div className="rounded-2xl border border-white/10 bg-navy-950/70 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <label className="block font-semibold text-chrome-300">
                Preview Screenshot / Image
              </label>

              {/* Mode Toggle Buttons */}
              <div className="inline-flex rounded-xl border border-white/10 bg-white/[0.03] p-1 text-[11px]">
                <button
                  type="button"
                  onClick={() => setImageMode('upload')}
                  className={`rounded-lg px-3 py-1 font-semibold transition-all ${
                    imageMode === 'upload'
                      ? 'bg-energy-bright text-navy-950 font-bold shadow-sm'
                      : 'text-chrome-400 hover:text-white'
                  }`}
                >
                  💻 Upload from Device
                </button>
                <button
                  type="button"
                  onClick={() => setImageMode('url')}
                  className={`rounded-lg px-3 py-1 font-semibold transition-all ${
                    imageMode === 'url'
                      ? 'bg-energy-bright text-navy-950 font-bold shadow-sm'
                      : 'text-chrome-400 hover:text-white'
                  }`}
                >
                  🔗 Paste URL
                </button>
              </div>
            </div>

            {/* Upload from Laptop Mode */}
            {imageMode === 'upload' ? (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.02] p-6 text-center transition-all hover:border-energy-bright/60 hover:bg-energy/5"
                >
                  {uploadingImage ? (
                    <div className="flex items-center gap-2 text-energy-bright">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-energy-bright border-t-transparent" />
                      <span>Optimizing and uploading image...</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-energy-bright/40 bg-energy/10 text-xl shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-transform group-hover:scale-110">
                        📁
                      </div>
                      <p className="mt-3 font-semibold text-white">
                        Click to browse image from laptop / gallery
                      </p>
                      <p className="mt-1 text-[11px] text-chrome-500">
                        Supports PNG, JPG, or WEBP (Automatically optimized)
                      </p>
                    </>
                  )}
                </div>
              </div>
            ) : (
              /* Paste URL Mode */
              <div>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... or your custom CDN link"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className={inputClass}
                />
              </div>
            )}

            {imageError && (
              <p className="text-[11px] text-red-400">{imageError}</p>
            )}

            {/* Thumbnail Preview If Image is Chosen */}
            {image && (
              <div className="relative mt-2 overflow-hidden rounded-xl border border-energy-bright/40 bg-navy-900 p-2">
                <div className="flex items-center gap-3">
                  <img
                    src={image}
                    alt="Preview"
                    className="h-16 w-24 rounded-lg object-cover border border-white/10"
                  />
                  <div className="flex-1 overflow-hidden">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                      ✓ Image Selected
                    </span>
                    <p className="mt-1 truncate font-mono text-[10px] text-chrome-500">
                      {image.startsWith('data:') ? 'Local Device Upload (Ready)' : image}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setImage('')}
                    className="rounded-lg border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[11px] font-semibold text-red-400 hover:bg-red-500/20"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-semibold text-chrome-400">Live Website URL</label>
              <input
                type="url"
                placeholder="https://example.com"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1 block font-semibold text-chrome-400">GitHub Repo URL</label>
              <input
                type="url"
                placeholder="https://github.com/..."
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block font-semibold text-chrome-400">
              Technologies (Comma Separated)
            </label>
            <input
              placeholder="React, TypeScript, PHP 8.2, MySQL, Tailwind CSS"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="featured"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="h-4 w-4 rounded accent-energy-bright"
            />
            <label htmlFor="featured" className="text-xs text-white">
              Highlight as Featured Project (shows prominently on website)
            </label>
          </div>

          <div className="flex justify-end gap-3 border-t border-white/5 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 px-4 py-2 text-chrome-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || uploadingImage}
              className="rounded-xl bg-energy-bright px-6 py-2 font-bold text-navy-950 shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:scale-105 transition-all disabled:opacity-50"
            >
              {saving ? 'Saving...' : project ? 'Save Changes' : 'Publish to Website →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}