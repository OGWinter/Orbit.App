import React from 'react';
import { Card } from '../ui/Card';
import { GitBranch, MessageSquareCode, CheckSquare, Sparkles } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Connect your repository',
      desc: 'Link your GitHub, GitLab, or local git clone. Orbit reads the codebase without modifying your worktree.',
      icon: GitBranch,
      tag: 'AST Semantic Graph',
      visual: 'git remote add origin https://github.com/...'
    },
    {
      number: '02',
      title: 'Describe what you want to build',
      desc: 'Express your feature request, refactoring goal, or bugfix in natural developer terms or paste an issue link.',
      icon: MessageSquareCode,
      tag: 'Context Synthesis',
      visual: '"Implement rate-limiting for OAuth callbacks"'
    },
    {
      number: '03',
      title: 'Review and approve the AI plan',
      desc: 'Inspect the generated architectural blueprint and line-by-line diffs. You hold complete approval authority.',
      icon: CheckSquare,
      tag: 'Human Approval Gate',
      visual: '2 files modified · 0 syntax errors · 100% staged'
    },
    {
      number: '04',
      title: 'Watch Orbit implement & verify',
      desc: 'Orbit applies changes cleanly, runs your test suites in an isolated sandbox, and prepares a verified commit.',
      icon: Sparkles,
      tag: 'Sandboxed CI Run',
      visual: '✓ 4 tests passed in 142ms · Clean git commit'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 relative scroll-mt-20 bg-[#06070a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-2">
            The Orbit Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Orbit works in four clean steps.
          </h2>
          <p className="text-base text-[#94a3b8] mt-3">
            Predictable, transparent engineering without unexpected surprises or unchecked code changes.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <Card
                key={idx}
                variant="interactive"
                glowColor="indigo"
                className="p-6 flex flex-col justify-between"
              >
                <div>
                  {/* Step Number & Icon Header */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-mono font-bold text-white/20">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider block mb-2">
                    {step.tag}
                  </span>

                  <h3 className="text-base font-bold text-white mb-2.5 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs text-[#94a3b8] leading-relaxed mb-6">
                    {step.desc}
                  </p>
                </div>

                {/* Micro Visual Snippet */}
                <div className="p-2.5 rounded-lg bg-[#07080b] border border-white/[0.06] font-mono text-[11px] text-[#cbd5e1] truncate">
                  <span className="text-[#64748b] mr-1.5">$</span>
                  {step.visual}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
