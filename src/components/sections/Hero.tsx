import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ArrowRight, ShieldCheck, GitBranch, Cpu, Terminal } from 'lucide-react';

interface HeroProps {
  onOpenWaitlist: (email?: string) => void;
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenWaitlist, onExplore }) => {
  const [quickEmail, setQuickEmail] = useState('');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickEmail && quickEmail.includes('@')) {
      onOpenWaitlist(quickEmail);
    } else {
      onOpenWaitlist();
    }
  };

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background radial luminous lighting effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-indigo-500/15 via-cyan-500/5 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Announcement Pill */}
        <div className="inline-flex items-center gap-2 mb-8 animate-fadeIn">
          <Badge variant="indigo" size="md" dot>
            Introducing Orbit V2 Architecture
          </Badge>
          <span className="hidden sm:inline text-xs text-[#94a3b8] flex items-center gap-1">
            <span>Human-controlled AI engineering</span>
            <span className="text-[#64748b]">·</span>
            <span className="text-indigo-400 font-mono">AST-Aware</span>
          </span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
          Your next build starts with{' '}
          <span className="bg-gradient-to-r from-white via-indigo-100 to-indigo-400 bg-clip-text text-transparent">
            Orbit.
          </span>
        </h1>

        {/* Supporting Copy */}
        <p className="text-lg sm:text-xl text-[#94a3b8] max-w-2xl mx-auto leading-relaxed mb-10">
          An AI-powered development workspace that understands your code, plans your changes, and helps you build with confidence.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto mb-14">
          <form onSubmit={handleQuickSubmit} className="flex-1 w-full flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="email"
                placeholder="developer@work.com"
                value={quickEmail}
                onChange={(e) => setQuickEmail(e.target.value)}
                className="w-full bg-[#0d1017] border border-white/15 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm text-white placeholder-[#64748b] rounded-xl px-4 py-3 outline-none transition-all"
              />
            </div>
            <Button
              type="submit"
              variant="glow"
              size="md"
              className="py-3 px-5 shrink-0"
              iconRight={<ArrowRight className="w-4 h-4" />}
            >
              Get Early Access
            </Button>
          </form>
        </div>

        {/* Secondary explore button */}
        <div className="flex items-center justify-center gap-4 text-xs text-[#94a3b8] mb-14">
          <button
            onClick={onExplore}
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors underline underline-offset-4"
          >
            <span>Explore Orbit Workspace Preview</span>
            <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
          </button>
        </div>

        {/* High-level trust badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto text-left text-xs">
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-2.5">
            <Cpu className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="text-[#cbd5e1] font-medium">Deep AST Understanding</span>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-2.5">
            <GitBranch className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-[#cbd5e1] font-medium">Plan-First Architecture</span>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-[#cbd5e1] font-medium">Human Approval Required</span>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-2.5">
            <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-[#cbd5e1] font-medium">Verified Test Sandbox</span>
          </div>
        </div>
      </div>
    </section>
  );
};
