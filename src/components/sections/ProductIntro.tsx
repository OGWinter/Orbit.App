import React from 'react';
import { Card } from '../ui/Card';
import { ShieldCheck, Compass, Eye, Zap } from 'lucide-react';

interface ProductIntroProps {
  onOpenWaitlist?: () => void;
}

export const ProductIntro: React.FC<ProductIntroProps> = () => {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-3">
            Why Orbit Exists
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-5">
            AI code generation shouldn't mean losing control of your architecture.
          </h2>
          <p className="text-base sm:text-lg text-[#94a3b8] leading-relaxed">
            Most AI tools generate code in isolation without understanding the broader system. Orbit treats your repository as a cohesive organism—planning changes methodically and keeping you firmly in the driver’s seat.
          </p>
        </div>

        {/* Comparison: The Old Way vs The Orbit Way */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* The Old Way */}
          <div className="p-8 rounded-2xl bg-[#090a0f] border border-white/[0.06] relative overflow-hidden">
            <div className="text-xs font-mono text-rose-400 uppercase tracking-wider mb-3">
              The Copilot Dilemma
            </div>
            <h3 className="text-xl font-bold text-white mb-4">
              Blind autocompletions & fragile regressions
            </h3>
            <ul className="space-y-3.5 text-sm text-[#94a3b8]">
              <li className="flex items-start gap-3">
                <span className="text-rose-400 font-bold mt-0.5">✕</span>
                <span>AI writes code without knowing your project's architectural invariants.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-400 font-bold mt-0.5">✕</span>
                <span>Edits slip directly into files, breaking callers and causing hard-to-trace bugs.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-400 font-bold mt-0.5">✕</span>
                <span>You spend hours reviewing chat logs trying to understand what the AI actually changed.</span>
              </li>
            </ul>
          </div>

          {/* The Orbit Way */}
          <div className="p-8 rounded-2xl bg-[#0e121c] border border-indigo-500/30 relative overflow-hidden shadow-xl shadow-indigo-950/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>The Orbit Workspace</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">
              Spec-first planning with verified human approval
            </h3>
            <ul className="space-y-3.5 text-sm text-[#cbd5e1]">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                <span>Full AST graph indexing ensures symbol references and contracts remain unbroken.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                <span>Orbit synthesizes a concrete multi-step plan before writing a single line of code.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                <span>Changes are staged in memory; zero disk mutations occur until you review and approve.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 3 Pillars of Orbit Control */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="interactive" glowColor="indigo" className="p-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="text-base font-semibold text-white mb-2">1. Deep Codebase Context</h4>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Orbit crawls your entire repository, mapping types, imported modules, and runtime configurations into an active semantic graph.
            </p>
          </Card>

          <Card variant="interactive" glowColor="cyan" className="p-6">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
              <Eye className="w-5 h-5" />
            </div>
            <h4 className="text-base font-semibold text-white mb-2">2. Crystal-Clear Diffs</h4>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Every suggested change is presented as a clean unified diff with line-level control. Accept, reject, or request adjustments instantly.
            </p>
          </Card>

          <Card variant="interactive" glowColor="indigo" className="p-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-semibold text-white mb-2">3. Isolated Verification</h4>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Tests and linter checks run in a protected container before commits are finalized. If a test fails, Orbit diagnoses and repairs the flaw.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};
