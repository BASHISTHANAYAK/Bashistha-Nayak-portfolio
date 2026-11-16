import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Menu, X, FileText, ExternalLink, Mail } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:pt-6 pointer-events-none">
      <nav
        className={`pointer-events-auto w-full max-w-5xl rounded-full transition-all duration-300 ${
          isScrolled
            ? 'glass-panel shadow-2xl py-3 px-6 border-white/10'
            : 'bg-surface/60 backdrop-blur-md py-3.5 px-6 border border-white/5'
        } flex items-center justify-between`}
      >
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-2 group text-white font-mono font-bold text-sm sm:text-base tracking-wider"
        >
          <span className="w-8 h-8 rounded-lg bg-surface-elevated border border-accent/40 flex items-center justify-center text-accent group-hover:border-accent group-hover:scale-105 transition-all">
            B
          </span>
          <span className="hidden sm:inline font-sans font-semibold text-neutral-300 group-hover:text-white transition-colors">
            Bashistha<span className="text-accent">.dev</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs lg:text-sm font-medium text-neutral-400 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/5 transition-all"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Action Items */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Contact Link */}
          <a
            href="#contact"
            className="flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-full bg-accent/15 border border-accent/40 text-accent-light hover:bg-accent hover:text-white transition-all shadow-sm shadow-accent/10 hover:shadow-accent/30"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </a>

          {/* Resume Link */}
          <a
            href={PERSONAL_INFO.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full bg-surface-elevated hover:bg-neutral-800 text-neutral-300 hover:text-white border border-white/10 transition-all"
            title="Open Resume"
          >
            <FileText className="w-3.5 h-3.5 text-neutral-400" />
            <span>Resume</span>
            <ExternalLink className="w-2.5 h-2.5 text-neutral-500" />
          </a>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg text-neutral-400 hover:text-white bg-surface-elevated border border-white/10"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden pointer-events-auto fixed top-20 left-4 right-4 glass-panel rounded-2xl p-6 shadow-2xl border border-white/10 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-neutral-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="h-px bg-white/10 my-1" />

          <div className="flex flex-col gap-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm font-semibold transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Get in Touch</span>
            </a>

            <a
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-surface-elevated border border-white/10 text-neutral-200 text-sm font-medium"
            >
              <FileText className="w-4 h-4 text-neutral-400" />
              <span>View Resume (PDF)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
