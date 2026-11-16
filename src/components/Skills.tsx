import React from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Cpu, Code2, Database, ShieldCheck, Smartphone, CheckSquare, Wrench, Globe } from 'lucide-react';

export const Skills: React.FC = () => {
  // Category icons mapping
  const getCategoryIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case 'languages':
        return <Code2 className="w-4 h-4 text-accent" />;
      case 'backend':
        return <Cpu className="w-4 h-4 text-accent-cyan" />;
      case 'frontend':
        return <Globe className="w-4 h-4 text-purple-400" />;
      case 'database':
        return <Database className="w-4 h-4 text-emerald-400" />;
      case 'authentication':
        return <ShieldCheck className="w-4 h-4 text-amber-400" />;
      case 'mobile / cross-platform (project exposure)':
        return <Smartphone className="w-4 h-4 text-sky-400" />;
      case 'testing':
        return <CheckSquare className="w-4 h-4 text-rose-400" />;
      case 'tools & deployment':
        return <Wrench className="w-4 h-4 text-indigo-400" />;
      default:
        return <Cpu className="w-4 h-4 text-accent" />;
    }
  };

  return (
    <section id="skills" className="py-24 relative bg-surface/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-elevated border border-white/10 text-accent-light text-xs font-mono uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5 text-accent" />
            <span>Technologies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Technical Skills
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            Verified technologies, frameworks, and deployment tools applied across production services and full-stack projects.
          </p>
        </div>

        {/* 8-Category Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.title}
              className="glass-card rounded-xl p-5 border border-white/5 hover:border-accent/40 flex flex-col justify-between transition-all"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
                  <div className="p-1.5 rounded-lg bg-surface-elevated border border-white/5">
                    {getCategoryIcon(category.title)}
                  </div>
                  <h3 className="font-semibold text-white text-sm tracking-wide">
                    {category.title}
                  </h3>
                </div>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="px-2.5 py-1 rounded-md bg-surface-elevated/70 hover:bg-surface-elevated border border-white/5 hover:border-white/20 text-xs font-mono text-neutral-300 hover:text-white transition-all cursor-default"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
