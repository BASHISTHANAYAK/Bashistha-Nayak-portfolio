import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { User, Shield, Terminal, Zap } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-elevated border border-white/10 text-accent-light text-xs font-mono uppercase tracking-wider mb-4">
            <User className="w-3.5 h-3.5 text-accent" />
            <span>Profile</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            About Me
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            Grounded engineering principles, clean code practices, and system architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Avatar Column */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent to-accent-cyan opacity-40 blur-xl group-hover:opacity-70 transition duration-500" />
              <div className="relative w-64 h-72 rounded-2xl overflow-hidden border border-white/10 bg-surface-elevated flex items-center justify-center">
                <img
                  src="https://avatars.githubusercontent.com/u/105913853?v=4"
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent text-center">
                  <p className="text-xs font-mono text-neutral-300">
                    Bashistha Nayak
                  </p>
                  <p className="text-[11px] font-mono text-accent-light">
                    Full Stack Developer
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative Column */}
          <div className="lg:col-span-8 flex flex-col gap-6 text-neutral-300 text-sm sm:text-base leading-relaxed">
            <p>
              I am a <strong className="text-white font-semibold">Full Stack Developer</strong> with a strong focus on backend system architecture, API reliability, and scalable data layers. My professional experience spans developing production services at <strong className="text-white font-semibold">Eatoes Web Private Limited</strong>, where I worked with Node.js, Express, and MongoDB to engineer dependable business workflows and third-party integrations.
            </p>

            <p>
              My recent technical work centers on real-world engineering challenges: designing robust recurring subscription billing engines with <strong className="text-white font-semibold">Razorpay</strong>, orchestrating asynchronous webhook processing with strict idempotency and signature verification, and building cross-platform authentication applications with <strong className="text-white font-semibold">React Native for Web</strong>, Expo, and Firebase Auth.
            </p>

            <p>
              I value clean architecture, maintainable codebases, and realistic software engineering over artificial complexity. Whether optimizing database queries or diagnosing production edge cases, I focus on delivering resilient systems that solve genuine operational needs.
            </p>

            {/* Engineering Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-surface-elevated/70 border border-white/5">
                <Shield className="w-5 h-5 text-accent mb-2" />
                <h4 className="text-white text-xs font-semibold mb-1">Resilient APIs</h4>
                <p className="text-neutral-400 text-[11px]">Strict validation, idempotency, and clean RESTful design.</p>
              </div>

              <div className="p-4 rounded-xl bg-surface-elevated/70 border border-white/5">
                <Zap className="w-5 h-5 text-accent-cyan mb-2" />
                <h4 className="text-white text-xs font-semibold mb-1">Webhook Pipelines</h4>
                <p className="text-neutral-400 text-[11px]">Signature checks, automated retries, and data sync.</p>
              </div>

              <div className="p-4 rounded-xl bg-surface-elevated/70 border border-white/5">
                <Terminal className="w-5 h-5 text-purple-400 mb-2" />
                <h4 className="text-white text-xs font-semibold mb-1">Production Tested</h4>
                <p className="text-neutral-400 text-[11px]">Unit tests with Jest and disciplined error handling.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
