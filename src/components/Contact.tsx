import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Copy, Check, Send, MessageSquare, Loader2, AlertCircle } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './Icons';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [botcheck, setBotcheck] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent duplicate concurrent submissions
    if (status === 'loading') return;

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setStatusMessage('Please fill in all required fields.');
      return;
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus('error');
      setStatusMessage('Please provide a valid email address.');
      return;
    }

    // Honeypot spam detection
    if (botcheck) {
      // Silently ignore bots
      setStatus('success');
      setStatusMessage('Message sent successfully!');
      return;
    }

    setStatus('loading');
    setStatusMessage('');

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setStatus('error');
      setStatusMessage('Contact form configuration error: Access key missing. Please email directly.');
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          subject: `Portfolio Contact from ${formData.name.trim()}`,
          from_name: 'Bashistha Nayak Portfolio',
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setStatusMessage('Your message has been sent successfully! I will get back to you shortly.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setStatusMessage(data.message || 'Failed to send message. Please try again or email directly.');
      }
    } catch {
      setStatus('error');
      setStatusMessage('Network error occurred. Please try again or reach out directly via email.');
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-elevated border border-white/10 text-accent-light text-xs font-mono uppercase tracking-wider mb-4">
            <MessageSquare className="w-3.5 h-3.5 text-accent" />
            <span>Connect</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-light to-accent-cyan">together</span>.
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            Have an open role, project inquiry, or technical challenge? I would love to connect.
          </p>

          {/* Quick Copy Email Pill */}
          <div className="mt-6 flex items-center justify-center">
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface-elevated hover:bg-neutral-800 border border-white/10 hover:border-accent/40 text-neutral-200 text-xs sm:text-sm font-mono transition-all group"
            >
              <Mail className="w-4 h-4 text-accent" />
              <span>{PERSONAL_INFO.email}</span>
              {copied ? (
                <span className="flex items-center gap-1 text-emerald-400 font-sans text-xs">
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </span>
              ) : (
                <span className="flex items-center gap-1 text-neutral-500 group-hover:text-neutral-300 font-sans text-xs">
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Terminal Styled Form Window */}
        <div className="glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          {/* Window Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-surface-elevated/90 border-b border-white/5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="font-mono text-xs text-neutral-400">
              ~/bashistha/contact
            </div>
            <div className="text-[11px] font-mono text-neutral-500">
              WEB3FORMS_API
            </div>
          </div>

          {/* Window Body Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Honeypot Spam Protection (Hidden from real users) */}
            <input
              type="checkbox"
              name="botcheck"
              className="hidden"
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              checked={botcheck}
              onChange={(e) => setBotcheck(e.target.checked)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-2">
                  // Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Smith"
                  className="w-full px-4 py-3 rounded-xl bg-surface-elevated/60 border border-white/10 focus:border-accent focus:outline-none text-white text-sm placeholder:text-neutral-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-2">
                  // Your Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-surface-elevated/60 border border-white/10 focus:border-accent focus:outline-none text-white text-sm placeholder:text-neutral-600 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-2">
                // Message *
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Hi Bashistha, we'd like to discuss an opportunity..."
                className="w-full px-4 py-3 rounded-xl bg-surface-elevated/60 border border-white/10 focus:border-accent focus:outline-none text-white text-sm placeholder:text-neutral-600 transition-colors resize-none"
              />
            </div>

            {/* Status Feedback Banner */}
            {status === 'success' && (
              <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs sm:text-sm flex items-center gap-2.5">
                <Check className="w-4 h-4 shrink-0" />
                <span>{statusMessage}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-400 text-xs sm:text-sm flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{statusMessage}</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-accent hover:bg-accent-hover disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all shadow-lg shadow-accent/25 hover:shadow-accent/40"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-surface-elevated hover:bg-neutral-800 text-neutral-400 hover:text-white border border-white/5 hover:border-white/20 transition-all"
                  aria-label="GitHub Profile"
                >
                  <GitHubIcon className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-surface-elevated hover:bg-neutral-800 text-neutral-400 hover:text-white border border-white/5 hover:border-white/20 transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedInIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
