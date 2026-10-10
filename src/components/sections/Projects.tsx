import { useState, useEffect, useMemo } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { projects as staticProjects, siteSettings } from '@/data/siteData';
import { supabase } from '@/lib/supabase';

interface ProjectType {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  featured: boolean;
  status: string;
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
}

const TABS = [
  { id: 'all', label: 'All Architecture' },
  { id: 'proptech', label: 'PropTech & Real Estate' },
  { id: 'saas', label: 'SaaS & Automation' },
  { id: 'ecommerce', label: 'E-Commerce' },
  { id: 'fullstack', label: 'Custom Web Apps' },
];

export function Projects() {
  const [projectList, setProjectList] = useState<ProjectType[]>(staticProjects as ProjectType[]);
  const [activeTab, setActiveTab] = useState('all');
  const [activeProject, setActiveProject] = useState<ProjectType | null>(null);

  // Fetch Live Projects from Supabase CMS (Preserving CRM connection)
  useEffect(() => {
    async function loadLiveProjects() {
      try {
        const { data, error } = await supabase
          .from('portfolio_projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          const mapped: ProjectType[] = data.map((item) => ({
            id: item.id,
            title: item.title,
            category: item.category,
            description: item.description,
            image: item.image || undefined,
            liveUrl: item.live_url || undefined,
            githubUrl: item.github_url || undefined,
            technologies: Array.isArray(item.technologies)
              ? item.technologies
              : typeof item.technologies === 'string'
              ? item.technologies.split(',').map((s: string) => s.trim())
              : [],
            featured: Boolean(item.featured),
            status: item.status || 'Live Project',
          }));
          setProjectList(mapped);
        }
      } catch {
        // Fallback to staticProjects
      }
    }

    loadLiveProjects();
  }, []);

  // Category Filtering Logic
  const filteredProjects = useMemo(() => {
    if (activeTab === 'all') return projectList;
    if (activeTab === 'proptech') {
      return projectList.filter(
        (p) =>
          p.category.toLowerCase().includes('real estate') ||
          p.category.toLowerCase().includes('proptech')
      );
    }
    if (activeTab === 'saas') {
      return projectList.filter(
        (p) =>
          p.category.toLowerCase().includes('saas') ||
          p.category.toLowerCase().includes('calculator') ||
          p.category.toLowerCase().includes('analytics')
      );
    }
    if (activeTab === 'ecommerce') {
      return projectList.filter((p) => p.category.toLowerCase().includes('commerce'));
    }
    if (activeTab === 'fullstack') {
      return projectList.filter(
        (p) =>
          p.category.toLowerCase().includes('branding') ||
          p.category.toLowerCase().includes('healthcare') ||
          p.category.toLowerCase().includes('full-stack') ||
          p.category.toLowerCase().includes('custom')
      );
    }
    return projectList;
  }, [activeTab, projectList]);

  const getCount = (tabId: string) => {
    if (tabId === 'all') return projectList.length;
    if (tabId === 'proptech')
      return projectList.filter(
        (p) =>
          p.category.toLowerCase().includes('real estate') ||
          p.category.toLowerCase().includes('proptech')
      ).length;
    if (tabId === 'saas')
      return projectList.filter(
        (p) =>
          p.category.toLowerCase().includes('saas') ||
          p.category.toLowerCase().includes('calculator') ||
          p.category.toLowerCase().includes('analytics')
      ).length;
    if (tabId === 'ecommerce')
      return projectList.filter((p) => p.category.toLowerCase().includes('commerce')).length;
    if (tabId === 'fullstack')
      return projectList.filter(
        (p) =>
          p.category.toLowerCase().includes('branding') ||
          p.category.toLowerCase().includes('healthcare') ||
          p.category.toLowerCase().includes('full-stack') ||
          p.category.toLowerCase().includes('custom')
      ).length;
    return 0;
  };

  const phone = (siteSettings?.whatsapp || '+923706492398').replace(/\D/g, '');

  return (
    <section
      id="projects"
      itemScope
      itemType="https://schema.org/ItemList"
      aria-label="DEVSOLE Soft Engineering Portfolio"
      className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28 overflow-hidden bg-transparent"
    >
      {/* Subtle Studio Grid Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <SectionHeading
        eyebrow="Production Portfolio"
        title="Featured Work & Live Case Studies"
        description="Filter our engineering work by industry domain or inspect any project for architecture specifications, tech stack, and live previews."
      />

      {/* Segmented Filter Control Dock */}
      <div className="mt-8 flex items-center justify-start overflow-x-auto pb-2 max-w-full">
        <div className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-[#080c18] p-1 shadow-2xs">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const count = getCount(tab.id);

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-white/10 text-white shadow-2xs border border-white/15'
                    : 'text-slate-400 hover:text-white font-medium'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`rounded-md px-1.5 py-0.5 text-[10px] font-mono font-semibold ${
                    isActive
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'bg-white/5 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            itemScope
            itemType="https://schema.org/SoftwareApplication"
            itemProp="itemListElement"
            onClick={() => setActiveProject(project)}
            className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0c101d] p-2.5 shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:border-blue-500/40 hover:shadow-[0_8px_35px_rgba(0,0,0,0.7)] transition-all duration-300 hover:-translate-y-1"
          >
            <meta itemProp="applicationCategory" content={project.category} />
            <meta itemProp="operatingSystem" content="Web Browser" />

            <div>
              {/* Media Preview Frame with Mac Window Chrome */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-[#080c18] shadow-inner">
                {/* Window Control Header */}
                <div className="absolute top-0 inset-x-0 z-10 flex items-center justify-between bg-[#06080f] border-b border-white/10 px-3 py-1.5 backdrop-blur-md">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-[#ff5f56]" />
                    <div className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
                    <div className="h-2 w-2 rounded-full bg-[#27c93f]" />
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/75 px-2 py-0.5 text-[9px] font-mono font-semibold text-slate-200 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>{project.status}</span>
                  </span>
                </div>

                {project.image ? (
                  <img
                    itemProp="image"
                    src={project.image}
                    alt={`${project.title} - DEVSOLE Soft`}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-102"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-mono text-xs text-slate-500 bg-[#080c18]">
                    Preview Frame
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
              </div>

              {/* Information Content */}
              <div className="p-3.5 sm:p-4">
                <span className="inline-block rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-blue-400">
                  {project.category}
                </span>

                <h3
                  itemProp="name"
                  className="mt-2 font-display text-base sm:text-lg font-bold text-white transition-colors group-hover:text-blue-400"
                >
                  {project.title}
                </h3>

                <p
                  itemProp="description"
                  className="mt-1.5 text-xs leading-relaxed text-slate-400 line-clamp-2 font-normal"
                >
                  {project.description}
                </p>
              </div>
            </div>

            <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4 pt-0">
              {/* Technologies Pills */}
              <div className="flex flex-wrap gap-1.5 border-t border-white/10 pt-3">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] font-mono text-slate-300 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Prompt */}
              <div className="mt-3.5 flex items-center justify-between text-xs font-semibold text-blue-400 group-hover:text-blue-300">
                <span>Inspect Architecture & Demo</span>
                <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ================= ARCHITECTURE INSPECTION MODAL ================= */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(12px)' }}
          onClick={() => setActiveProject(null)}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0c101d] text-slate-100 p-6 sm:p-8 shadow-2xl animate-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button with Clean SVG Cross */}
            <button
              onClick={() => setActiveProject(null)}
              className="absolute right-5 top-5 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-colors hover:text-white hover:bg-white/10"
              aria-label="Close Modal"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Modal Image Wallpaper Frame */}
            {activeProject.image && (
              <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10 bg-[#080c18] shadow-2xl">
                <div className="absolute top-0 inset-x-0 z-10 flex items-center justify-between bg-[#06080f] border-b border-white/10 px-3 py-1.5 backdrop-blur-md">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-[#ff5f56]" />
                    <div className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
                    <div className="h-2 w-2 rounded-full bg-[#27c93f]" />
                  </div>
                  <span className="font-mono text-[9px] text-slate-400">Live Architecture Inspection</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                </div>

                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="h-full w-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/75 px-3 py-1 text-xs font-mono font-medium text-white backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>{activeProject.status}</span>
                </span>
              </div>
            )}

            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
              {activeProject.category}
            </span>

            <h3 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {activeProject.title}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-slate-300 font-normal">
              {activeProject.description}
            </p>

            {/* Engineered Tech Stack Chips */}
            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <h4 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                Engineered Tech Stack
              </h4>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {activeProject.technologies.map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-mono font-semibold text-slate-200 shadow-2xs"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
              {activeProject.liveUrl && (
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 text-xs font-semibold shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-colors"
                >
                  <span>View Live Deployment</span>
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              )}

              {activeProject.githubUrl && (
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] px-4 py-2.5 text-xs font-semibold text-slate-200 transition-colors shadow-2xs"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>Repository</span>
                </a>
              )}

              <a
                href={`https://wa.me/${phone}?text=Hi%20DEVSOLE%20Soft!%20I%20want%20to%20discuss%20a%20project%20similar%20to%20${encodeURIComponent(activeProject.title)}.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 px-4 py-2.5 text-xs font-semibold text-emerald-400 transition-colors shadow-2xs"
              >
                <span>Discuss on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="rounded-xl border border-white/10 px-4 py-2.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;