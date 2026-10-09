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
  { id: 'all', label: 'All Work' },
  { id: 'proptech', label: 'PropTech & Real Estate' },
  { id: 'saas', label: 'SaaS & Automation' },
  { id: 'ecommerce', label: 'E-Commerce' },
  { id: 'fullstack', label: 'Full-Stack Apps' },
];

export function Projects() {
  const [projectList, setProjectList] = useState<ProjectType[]>(staticProjects as ProjectType[]);
  const [activeTab, setActiveTab] = useState('all');
  const [activeProject, setActiveProject] = useState<ProjectType | null>(null);

  // Fetch Live Projects from Supabase
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
        // Fallback to static projects
      }
    }

    loadLiveProjects();
  }, []);

  // Tab Filtering Logic
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

  return (
    <section
      id="projects"
      itemScope
      itemType="https://schema.org/ItemList"
      aria-label="DEVSOLE Engineering Portfolio"
      className="relative mx-auto max-w-6xl px-4 sm:px-6 py-24 sm:py-28 overflow-hidden"
    >
      <SectionHeading
        eyebrow="Dedicated Portfolio"
        title="Featured Case Studies & Live Deployments"
        description="Filter our engineering work by industry domain or click any project to inspect full architecture details, tech stack, and live demos."
      />

      {/* 📂 Category Filter Tabs: 100% Fluid Responsive */}
      <div className="mt-10 flex flex-wrap items-center gap-2 sm:gap-2.5 pb-2">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const count = getCount(tab.id);

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-full px-3.5 sm:px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                isActive
                  ? 'bg-energy-bright text-navy-950 shadow-[0_0_20px_rgba(0,240,255,0.4)] scale-105'
                  : 'border border-white/10 bg-white/[0.02] text-chrome-400 hover:border-energy/40 hover:bg-white/[0.05] hover:text-white'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                  isActive ? 'bg-navy-950/20 text-navy-950' : 'bg-white/10 text-chrome-300'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 🖥️ Projects Grid with Semantic Microdata */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            itemScope
            itemType="https://schema.org/SoftwareApplication"
            itemProp="itemListElement"
            onClick={() => setActiveProject(project)}
            className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-navy-950/70 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-energy-bright/60 hover:bg-white/[0.04] hover:shadow-[0_0_40px_rgba(0,240,255,0.22)] animate-fade"
          >
            <meta itemProp="applicationCategory" content={project.category} />
            <meta itemProp="operatingSystem" content="Web Browser" />

            <div>
              {/* Mockup Frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/10 bg-navy-900/80">
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full border border-white/10 bg-navy-950/80 px-2.5 py-1 backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-red-500/80" />
                  <span className="h-2 w-2 rounded-full bg-yellow-500/80" />
                  <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
                </div>

                <span className="absolute top-3 right-3 z-10 rounded-full border border-energy-bright/40 bg-navy-950/85 px-2.5 py-0.5 text-[9px] font-bold text-energy-bright backdrop-blur-md">
                  {project.status}
                </span>

                {project.image ? (
                  <img
                    itemProp="image"
                    src={project.image}
                    alt={`${project.title} — Engineered by DEVSOLE`}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-navy-900 font-mono text-xs text-chrome-500">
                    Preview Frame
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />
              </div>

              <div className="p-6">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-energy-bright">
                  {project.category}
                </span>

                <h3
                  itemProp="name"
                  className="mt-2 font-display text-base sm:text-lg font-bold text-white transition-colors group-hover:text-energy-bright"
                >
                  {project.title}
                </h3>
                <p
                  itemProp="description"
                  className="mt-2 text-xs leading-relaxed text-chrome-400 line-clamp-2"
                >
                  {project.description}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-0">
              <div className="flex flex-wrap gap-1.5 border-t border-white/5 pt-4">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-white/5 bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium text-chrome-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between text-xs font-semibold text-energy-bright">
                <span>Inspect Architecture</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* 🚀 Project Details Modal: 100% Responsive */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade"
          style={{ backgroundColor: 'rgba(3, 5, 10, 0.88)', backdropFilter: 'blur(16px)' }}
          onClick={() => setActiveProject(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-energy-bright/50 bg-navy-950 p-6 sm:p-8 shadow-[0_0_60px_rgba(0,240,255,0.25)] animate-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveProject(null)}
              className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-bold text-white transition-colors hover:border-energy-bright hover:bg-energy/20 hover:text-energy-bright"
            >
              ✕
            </button>

            {activeProject.image && (
              <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-navy-900 shadow-lg">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="h-full w-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 rounded-full border border-energy/40 bg-navy-950/80 px-3 py-1 text-xs font-bold text-energy-bright backdrop-blur-md">
                  {activeProject.status}
                </span>
              </div>
            )}

            <span className="inline-block rounded-full border border-energy-bright/40 bg-energy/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-energy-bright">
              {activeProject.category}
            </span>

            <h3 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-white">
              {activeProject.title}
            </h3>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-chrome-300">
              {activeProject.description}
            </p>

            <div className="mt-6 rounded-2xl border border-white/5 bg-white/[0.02] p-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-chrome-400">
                Engineered Tech Stack
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeProject.technologies.map((t) => (
                  <span
                    key={t}
                    className="rounded-xl border border-energy/30 bg-energy/10 px-3 py-1.5 text-xs font-medium text-energy-bright"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Live Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
              {activeProject.liveUrl && (
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full bg-energy-bright px-6 py-3 text-xs sm:text-sm font-semibold text-navy-950 shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all hover:scale-105"
                >
                  <span>🌐 View Live Website →</span>
                </a>
              )}

              {activeProject.githubUrl && (
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs sm:text-sm font-medium text-chrome-200 transition-colors hover:border-white/30 hover:text-white"
                >
                  <span>💻 GitHub Repository</span>
                </a>
              )}

              <a
                href={`https://wa.me/${siteSettings.whatsapp.replace(/\D/g, '')}?text=Hi%20DEVSOLE,%20I%20am%20interested%20in%20a%20project%20similar%20to%20${encodeURIComponent(activeProject.title)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-5 py-3 text-xs sm:text-sm font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/20"
              >
                <span>💬 Discuss on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="rounded-full border border-white/10 px-5 py-3 text-xs sm:text-sm font-medium text-chrome-400 transition-colors hover:text-white"
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