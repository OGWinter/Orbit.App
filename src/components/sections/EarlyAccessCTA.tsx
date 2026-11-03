import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

interface EarlyAccessCTAProps {
  onOpenWaitlist: (email?: string) => void;
}

export const EarlyAccessCTA: React.FC<EarlyAccessCTAProps> = ({ onOpenWaitlist }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenWaitlist(email);
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-12 md:p-16 rounded-3xl bg-gradient-to-b from-[#0f1422] to-[#0a0d14] border border-white/15 text-center shadow-2xl shadow-indigo-950/40 relative overflow-hidden">
          {/* Subtle top light bar */}
          <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-80" />

          <Badge variant="indigo" size="md" dot className="mb-4">
            Cohort 1 Early Access
          </Badge>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Ready to build with Orbit?
          </h2>

          <p className="text-base sm:text-lg text-[#94a3b8] max-w-xl mx-auto mb-8 leading-relaxed">
            Join the select cohort of developers, indie hackers, and builders shaping the future of AI-powered engineering workspaces.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mb-8">
            <input
              type="email"
              placeholder="Enter your developer email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#07090e] border border-white/15 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm text-white placeholder-[#64748b] rounded-xl px-4 py-3.5 outline-none transition-all"
            />
            <Button
              type="submit"
              variant="glow"
              size="lg"
              className="w-full sm:w-auto shrink-0"
              iconRight={<Sparkles className="w-4 h-4" />}
            >
              Get Early Access
            </Button>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#64748b]">
            <span className="flex items-center gap-1.5 text-[#94a3b8]">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Phase 1 Design Preview</span>
            </span>
            <span className="flex items-center gap-1.5 text-[#94a3b8]">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>No spam or marketing trackers</span>
            </span>
            <span className="flex items-center gap-1.5 text-[#94a3b8]">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              <span>Invite-only rollouts</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
