import React, { useState } from 'react';
import { FEATURED_PROJECTS, OTHER_PROJECTS, Project } from '../data/portfolioData';
import { ExternalLink, Layers, CheckCircle2, FolderGit2 } from 'lucide-react';
import { GitHubIcon } from './Icons';

export const Projects: React.FC = () => {
  // Active screenshot index for multi-image projects (Employee Access Portal)
  const [activeImageIndex, setActiveImageIndex] = useState<{ [key: string]: number }>({
    'employee-access-portal': 0,
  });

  const handleSelectImage = (projectId: string, index: number) => {
    setActiveImageIndex((prev) => ({ ...prev, [projectId]: index }));
  };

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-elevated border border-white/10 text-accent-light text-xs font-mono uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5 text-accent" />
            <span>Featured Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Selected Projects
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            Production-grade systems, webhook architectures, and authenticated web applications built with modern engineering standards.
          </p>
        </div>

        {/* Featured Project Cards List */}
        <div className="space-y-12 mb-20">
          {FEATURED_PROJECTS.map((project: Project) => {
            const currentImgIndex = activeImageIndex[project.id] || 0;
            const currentImg = project.images[currentImgIndex] || project.images[0];

            return (
              <div
                key={project.id}
                className="glass-card rounded-2xl p-6 sm:p-8 lg:p-10 border border-white/10 hover:border-accent/40 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Visual / Screenshot Showcase Column */}
                  <div className="lg:col-span-6 flex flex-col gap-3">
                    {/* Browser-styled mock container */}
                    <div className="w-full rounded-xl overflow-hidden bg-neutral-950 border border-white/10 shadow-2xl">
                      {/* Browser header bar */}
                      <div className="flex items-center justify-between px-4 py-2.5 bg-surface-elevated/90 border-b border-white/5 text-xs text-neutral-400">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        </div>
                        <span className="font-mono text-[11px] text-neutral-400 truncate max-w-[200px]">
                          {project.liveUrl?.replace('https://', '') || project.title}
                        </span>
                        <div className="w-6" />
                      </div>

                      {/* Image viewport */}
                      <div className="relative aspect-[16/10] bg-neutral-900 overflow-hidden flex items-center justify-center group">
                        <img
                          src={currentImg.src}
                          alt={currentImg.caption || project.title}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                          loading="lazy"
                        />

                        {/* Interactive overlay on hover */}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 text-white font-medium text-sm transition-opacity duration-200 backdrop-blur-[2px]"
                          >
                            <span>Open Live Application</span>
                            <ExternalLink className="w-4 h-4 text-accent" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Multi-screenshot tab selectors (Especially for Employee Access Portal) */}
                    {project.images.length > 1 && (
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider mr-1">
                          Views:
                        </span>
                        {project.images.map((img, idx) => (
                          <button
                            key={img.label || idx}
                            onClick={() => handleSelectImage(project.id, idx)}
                            className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all ${
                              currentImgIndex === idx
                                ? 'bg-accent/20 border border-accent/60 text-white font-medium shadow-sm'
                                : 'bg-surface-elevated/80 border border-white/5 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
                            }`}
                          >
                            {img.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Screenshot caption */}
                    {currentImg.caption && (
                      <p className="text-xs text-neutral-500 italic">
                        {currentImg.caption}
                      </p>
                    )}
                  </div>

                  {/* Content / Architectural Highlights Column */}
                  <div className="lg:col-span-6 flex flex-col justify-between h-full">
                    <div>
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {project.badge && (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-accent/15 border border-accent/30 text-accent-light">
                            {project.badge}
                          </span>
                        )}
                        <span className="text-xs text-neutral-500 font-mono">
                          // {project.role}
                        </span>
                      </div>

                      {/* Project Title */}
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                        {project.title}
                      </h3>

                      {/* Summary */}
                      <p className="text-neutral-300 text-sm leading-relaxed mb-4">
                        {project.description}
                      </p>

                      {/* Engineering Highlights Checklist */}
                      {project.highlights && (
                        <div className="space-y-2 mb-6">
                          {project.highlights.map((point, i) => (
                            <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                              <span className="leading-snug">{point}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Tech Badges & Action Buttons */}
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded bg-surface-elevated border border-white/5 font-mono text-[11px] text-neutral-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent hover:bg-accent-hover text-white text-xs font-medium transition-all shadow-md shadow-accent/20"
                          >
                            <span>Live Demo</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-elevated hover:bg-neutral-800 text-neutral-300 hover:text-white border border-white/10 text-xs font-medium transition-all"
                          >
                            <GitHubIcon className="w-3.5 h-3.5" />
                            <span>Source Code</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Other Projects Sub-Section */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent-light mb-2">
                <FolderGit2 className="w-3.5 h-3.5 text-accent" />
                <span>Archive & Prototypes</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                Other Projects
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
              Additional web applications, responsive clones, and e-commerce platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OTHER_PROJECTS.map((project) => (
              <div
                key={project.id}
                className="glass-card rounded-xl p-5 border border-white/10 hover:border-accent/40 flex flex-col justify-between transition-all group"
              >
                <div>
                  {/* Screenshot Thumbnail */}
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-neutral-950 border border-white/5 mb-4 group-hover:border-white/20 transition-colors">
                    <img
                      src={project.images[0].src}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1.5 text-xs text-white font-medium transition-opacity"
                      >
                        <span>View Project</span>
                        <ExternalLink className="w-3.5 h-3.5 text-accent" />
                      </a>
                    )}
                  </div>

                  {/* Role Tag & Title */}
                  <span className="text-[11px] font-mono text-accent-light block mb-1">
                    {project.role}
                  </span>
                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-accent-light transition-colors">
                    {project.title}
                  </h4>

                  {/* Description */}
                  <p className="text-neutral-400 text-xs leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                {/* Tech Badges & Links */}
                <div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-surface-elevated border border-white/5 font-mono text-[10px] text-neutral-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-surface-elevated hover:bg-neutral-800 text-white text-xs font-medium border border-white/10 transition-colors"
                      >
                        <span>Demo</span>
                        <ExternalLink className="w-3 h-3 text-accent" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-surface-elevated hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-medium border border-white/10 transition-colors"
                      >
                        <GitHubIcon className="w-3 h-3" />
                        <span>Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
