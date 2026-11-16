import React from 'react';
import { EXPERIENCE_HISTORY } from '../data/portfolioData';
import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-elevated border border-white/10 text-accent-light text-xs font-mono uppercase tracking-wider mb-4">
            <Briefcase className="w-3.5 h-3.5 text-accent" />
            <span>Career</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Professional Experience
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            Where I have engineered, tested, and scaled production systems.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-8 border-l border-white/10 space-y-12 ml-2 sm:ml-4">
          {EXPERIENCE_HISTORY.map((item, index) => (
            <div key={index} className="relative group">
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-surface border-2 border-accent group-hover:scale-125 transition-transform">
                <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-40" />
              </div>

              {/* Experience Card */}
              <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-accent/40 transition-all">
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-accent-light transition-colors">
                      {item.role}
                    </h3>
                    <p className="text-base font-semibold text-neutral-300">
                      {item.company}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-400">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface-elevated border border-white/5">
                      <Calendar className="w-3.5 h-3.5 text-accent" />
                      <span>{item.period}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface-elevated border border-white/5">
                      <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{item.location}</span>
                    </span>
                  </div>
                </div>

                {/* Brief Summary */}
                <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
                  {item.summary}
                </p>

                {/* Bullet Points */}
                <div className="space-y-3 mb-6">
                  {item.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Technologies used in the role */}
                <div className="pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-surface-elevated/80 border border-white/5 font-mono text-xs text-neutral-400 hover:text-white transition-colors"
                    >
                      {tech}
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
