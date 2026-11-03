import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import {
  Binary,
  GitPullRequest,
  Bot,
  FileCheck2,
  TerminalSquare,
  Code2,
  CheckCircle
} from 'lucide-react';

export const CoreCapabilities: React.FC = () => {
  const [selectedCapability, setSelectedCapability] = useState(0);

  const capabilities = [
    {
      id: 'understand',
      title: 'Understand your codebase',
      category: 'Semantic Indexing',
      icon: Binary,
      color: 'indigo',
      shortDesc: 'Deep Abstract Syntax Tree analysis that maps symbols, call chains, and module boundaries.',
      details: [
        'Builds a live AST graph of your entire repository across monorepos and polyglot codebases.',
        'Tracks downstream dependencies so refactoring a function never silently breaks unseen consumers.',
        'Zero model hallucinations: Orbit inspects actual type definitions, interfaces, and schemas.'
      ],
      codeSample: `// Orbit AST Graph Snapshot
export interface CodebaseGraph {
  modules: 148,
  symbols: 1420,
  dependencyDepth: 7,
  integrity: "verified_clean"
}`
    },
    {
      id: 'plan',
      title: 'Plan implementation',
      category: 'Spec Generation',
      icon: GitPullRequest,
      color: 'cyan',
      shortDesc: 'Formulates multi-step architectural blueprints before touching a single line of source code.',
      details: [
        'Generates an executable specification broken down into discrete milestones.',
        'Flags edge cases, backward compatibility risks, and migrations in advance.',
        'Allows you to edit and prune the plan before the agent starts executing.'
      ],
      codeSample: `// Orbit Staged Plan
1. [Analyze] Map callers of verifyToken()
2. [Scaffold] Add SlidingWindowRateLimiter
3. [Migrate] Replace token buckets in 3 handlers
4. [Verify] Concurrency stress test 500 req/s`
    },
    {
      id: 'agents',
      title: 'Build with AI agents',
      category: 'Agent Orchestration',
      icon: Bot,
      color: 'indigo',
      shortDesc: 'Multi-file coordinated refactorings executed with high precision and lint-safe edits.',
      details: [
        'Coordinated agent processes work across multiple directories simultaneously.',
        'Follows your repository conventions, ESLint rules, Prettier styles, and naming standards.',
        'Self-corrects syntax errors during generation before presenting the staged diff.'
      ],
      codeSample: `// Agent Worker Pool
Agent-Alpha: Staging src/lib/rate-limiter.ts
Agent-Beta:  Updating tests/integration.test.ts
Status: Synchronized (2 files staged)`
    },
    {
      id: 'review',
      title: 'Review every change',
      category: 'Human Gate',
      icon: FileCheck2,
      color: 'amber',
      shortDesc: 'Crystal-clear unified diffs and human approval gates keep you in complete control.',
      details: [
        'Full side-by-side or unified diff viewing with semantic syntax highlighting.',
        'Single-click line acceptance or instant rollback of unwanted modifications.',
        'Explicit human confirmation is required before any commit is finalized.'
      ],
      codeSample: `// Staged Diff Gate
Pending Approval:
  src/lib/rate-limiter.ts (+18, -4)
  src/api/auth-callback.ts (+12, -2)
Action: [Approve & Merge] or [Request Revision]`
    },
    {
      id: 'verify',
      title: 'Run tests and verify results',
      category: 'Sandboxed Validation',
      icon: TerminalSquare,
      color: 'emerald',
      shortDesc: 'Runs unit tests, type checks, and linter suites in an isolated sandbox to ensure zero regressions.',
      details: [
        'Executes existing test runners (Vitest, Jest, PyTest, Go test) inside an isolated sandbox.',
        'Detects typecheck errors, compilation warnings, and failed assertions.',
        'If a test fails, Orbit analyzes the failure stack trace and iteratively proposes a fix.'
      ],
      codeSample: `// Sandboxed Test Execution
$ vitest run tests/rate-limiter.test.ts
✓ grants tokens within 60s quota
✓ drops bursts exceeding window capacity
Result: 4 passed, 0 failed (142ms)`
    }
  ];

  const current = capabilities[selectedCapability];

  return (
    <section id="capabilities" className="py-20 md:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest block mb-2">
            Core Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineered for developers who demand precision.
          </h2>
          <p className="text-base text-[#94a3b8] mt-3">
            Every step of Orbit's workflow is built around transparency, verification, and developer empowerment.
          </p>
        </div>

        {/* Interactive Capability Grid + Deep Dive */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Capability List (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            {capabilities.map((cap, idx) => {
              const Icon = cap.icon;
              const isSelected = selectedCapability === idx;
              return (
                <button
                  key={cap.id}
                  onClick={() => setSelectedCapability(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-4 ${
                    isSelected
                      ? 'bg-[#121622] border-indigo-500/40 shadow-lg shadow-indigo-950/20'
                      : 'bg-[#0d1017] border-white/[0.06] hover:bg-white/[0.03] hover:border-white/15'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : 'bg-white/[0.05] text-[#94a3b8]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono text-[#64748b]">{cap.category}</span>
                      {isSelected && (
                        <span className="text-[10px] text-indigo-300 font-mono bg-indigo-500/20 px-1.5 py-0.5 rounded">
                          Active View
                        </span>
                      )}
                    </div>
                    <h3 className={`text-sm font-semibold truncate ${isSelected ? 'text-white' : 'text-[#cbd5e1]'}`}>
                      {cap.title}
                    </h3>
                    <p className="text-xs text-[#94a3b8] mt-1 line-clamp-2 leading-relaxed">
                      {cap.shortDesc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Capability Breakdown & Preview (7 cols) */}
          <div className="lg:col-span-7">
            <Card variant="elevated" className="p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
                    <current.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-indigo-400">{current.category}</span>
                    <h4 className="text-xl font-bold text-white">{current.title}</h4>
                  </div>
                </div>
                <Badge variant="neutral" size="sm">
                  Orbit V2 Core
                </Badge>
              </div>

              {/* Bullet Points */}
              <div className="space-y-3">
                {current.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-[#cbd5e1]">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{detail}</span>
                  </div>
                ))}
              </div>

              {/* Code / Visual Box */}
              <div className="rounded-xl bg-[#07080b] border border-white/10 p-4 font-mono text-xs overflow-x-auto shadow-inner">
                <div className="flex items-center justify-between text-[#64748b] pb-2 mb-2 border-b border-white/[0.06]">
                  <span className="text-[11px] text-[#cbd5e1] font-sans font-medium flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                    Telemetric Representation
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">Status: Verified</span>
                </div>
                <pre className="text-[#94a3b8] leading-relaxed whitespace-pre font-mono">
                  {current.codeSample}
                </pre>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
