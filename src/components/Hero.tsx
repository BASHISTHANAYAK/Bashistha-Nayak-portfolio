import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ParticleSphere } from './ParticleSphere';
import { ArrowRight, Mail, FileText, Terminal } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './Icons';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-accent-cyan/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-3">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-accent-light">Bashistha</span>.
            </h1>

            {/* Sub-headline / Job Title */}
            <div className="text-xl sm:text-2xl font-semibold text-neutral-300 mb-3 flex items-center gap-2">
              <span>{PERSONAL_INFO.tagline}</span>
            </div>

            {/* Code Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-surface-elevated/80 border border-white/5 font-mono text-xs sm:text-sm text-accent-light mb-6">
              <Terminal className="w-3.5 h-3.5 text-accent" />
              <span>{PERSONAL_INFO.codeTag}</span>
            </div>

            {/* Elevator Pitch */}
            <p className="text-base sm:text-lg text-neutral-400 max-w-xl leading-relaxed mb-8">
              I engineer resilient backend architectures and production-grade full-stack web applications.
              Experienced in designing webhook pipelines, recurring billing workflows with Razorpay, and high-performance MongoDB/Express data layers.
            </p>

            {/* CTAs & Social Links */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
              <a
                href="#projects"
                className="group flex items-center gap-2 px-6 py-3 rounded-full bg-accent hover:bg-accent-hover text-white text-sm font-semibold transition-all shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:scale-[1.02]"
              >
                <span>View Selected Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-surface-elevated hover:bg-neutral-800 text-neutral-200 hover:text-white border border-white/10 text-sm font-medium transition-all hover:scale-[1.02]"
              >
                <Mail className="w-4 h-4 text-neutral-400" />
                <span>Get In Touch</span>
              </a>

              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 rounded-full bg-surface/80 hover:bg-surface-elevated text-neutral-400 hover:text-white border border-white/5 hover:border-white/20 text-sm font-medium transition-all"
                title="Download / View Resume"
              >
                <FileText className="w-4 h-4" />
                <span>Resume</span>
              </a>
            </div>

            {/* Social Icons row */}
            <div className="flex items-center gap-4 text-neutral-400">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">Connect:</span>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-surface-elevated hover:bg-neutral-800 text-neutral-400 hover:text-white border border-white/5 hover:border-white/20 transition-all"
                aria-label="GitHub Profile"
              >
                <GitHubIcon className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-surface-elevated hover:bg-neutral-800 text-neutral-400 hover:text-white border border-white/5 hover:border-white/20 transition-all"
                aria-label="LinkedIn Profile"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="p-2 rounded-lg bg-surface-elevated hover:bg-neutral-800 text-neutral-400 hover:text-white border border-white/5 hover:border-white/20 transition-all"
                aria-label="Email Me"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: 3D Particle Canvas */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <ParticleSphere />
          </div>
        </div>
      </div>
    </section>
  );
};
