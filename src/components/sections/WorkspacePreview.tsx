import React, { useState } from 'react';
import { StatusIndicator, AgentStatusType } from '../ui/StatusIndicator';
import { CodePreview } from '../ui/CodePreview';
import { Button } from '../ui/Button';
import {
  FolderGit2,
  FileCode2,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  Terminal,
  ShieldCheck,
  Check,
  ChevronRight,
  GitCommit,
  Layers
} from 'lucide-react';

export const WorkspacePreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'plan' | 'diff' | 'tests'>('plan');
  const [agentStatus, setAgentStatus] = useState<AgentStatusType>('awaitingApproval');
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeFile, setActiveFile] = useState<'auth' | 'route'>('auth');

  // Interactive simulation of the approval gate
  const handleApprove = () => {
    setIsSimulating(true);
    setAgentStatus('executing');
    setTimeout(() => {
      setAgentStatus('verified');
      setIsSimulating(false);
      setActiveTab('tests');
    }, 1800);
  };

  const handleReset = () => {
    setAgentStatus('awaitingApproval');
    setActiveTab('plan');
  };

  const diffFiles = {
    auth: {
      name: 'src/lib/rate-limiter.ts',
      additions: 18,
      deletions: 4,
      lines: [
        { type: 'normal' as const, lineNumber: 1, content: 'import { createHash } from "crypto";' },
        { type: 'normal' as const, lineNumber: 2, content: 'import { RedisClient } from "./redis";' },
        { type: 'normal' as const, lineNumber: 3, content: '' },
        { type: 'del' as const, lineNumber: 4, content: '// Legacy in-memory token counter (prone to cluster desync)' },
        { type: 'del' as const, lineNumber: 5, content: 'const localBuckets = new Map<string, number>();' },
        { type: 'add' as const, lineNumber: 4, content: 'export interface SlidingWindowConfig {' },
        { type: 'add' as const, lineNumber: 5, content: '  maxRequests: number;' },
        { type: 'add' as const, lineNumber: 6, content: '  windowMs: number;' },
        { type: 'add' as const, lineNumber: 7, content: '}' },
        { type: 'add' as const, lineNumber: 8, content: '' },
        { type: 'add' as const, lineNumber: 9, content: 'export async function verifyRateLimit(key: string, config: SlidingWindowConfig) {' },
        { type: 'add' as const, lineNumber: 10, content: '  const timestamp = Date.now();' },
        { type: 'add' as const, lineNumber: 11, content: '  const windowStart = timestamp - config.windowMs;' },
        { type: 'add' as const, lineNumber: 12, content: '  const keyHash = createHash("sha256").update(key).digest("hex");' },
        { type: 'add' as const, lineNumber: 13, content: '  return RedisClient.evaluateRateWindow(keyHash, windowStart, timestamp);' },
        { type: 'add' as const, lineNumber: 14, content: '}' },
        { type: 'normal' as const, lineNumber: 15, content: '' },
        { type: 'normal' as const, lineNumber: 16, content: 'export default verifyRateLimit;' }
      ]
    },
    route: {
      name: 'src/api/auth-callback.ts',
      additions: 12,
      deletions: 2,
      lines: [
        { type: 'normal' as const, lineNumber: 18, content: 'export async function handleOAuthCallback(req: Request) {' },
        { type: 'del' as const, lineNumber: 19, content: '  // No pre-flight quota check' },
        { type: 'add' as const, lineNumber: 19, content: '  const clientIp = req.headers.get("x-forwarded-for") ?? "anonymous";' },
        { type: 'add' as const, lineNumber: 20, content: '  const allowed = await verifyRateLimit(clientIp, { maxRequests: 20, windowMs: 60000 });' },
        { type: 'add' as const, lineNumber: 21, content: '  if (!allowed) return new Response("Too Many Requests", { status: 429 });' },
        { type: 'normal' as const, lineNumber: 22, content: '  const session = await exchangeCodeForToken(req);' },
        { type: 'normal' as const, lineNumber: 23, content: '  return Response.json(session);' },
        { type: 'normal' as const, lineNumber: 24, content: '}' }
      ]
    }
  };

  return (
    <section id="workspace-preview" className="relative py-12 md:py-20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 text-xs font-mono text-indigo-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ORBIT WORKSPACE V2 — DESIGN PREVIEW</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              A workspace where AI plans and you stay in control.
            </h2>
          </div>
          <div className="text-xs text-[#94a3b8] flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-white/[0.05] border border-white/10 font-mono">
              Live Mockup Interaction
            </span>
          </div>
        </div>

        {/* Workspace Mockup Container */}
        <div className="rounded-2xl border border-white/15 bg-[#090b10] shadow-2xl shadow-black/90 overflow-hidden">
          {/* Top Workspace Chrome / Window Header */}
          <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-[#0d1017] border-b border-white/[0.08] gap-3">
            {/* Window Controls & Repo Context */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 pr-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <div className="h-4 w-px bg-white/10" />
              <div className="flex items-center gap-2 text-xs font-medium text-white">
                <FolderGit2 className="w-3.5 h-3.5 text-indigo-400" />
                <span className="font-mono text-[#cbd5e1]">OGWinter/Orbit.App</span>
                <span className="text-[#64748b]">/</span>
                <span className="text-[#94a3b8] font-mono">feature/sliding-rate-limiter</span>
              </div>
            </div>

            {/* Agent Live Status */}
            <div className="flex items-center gap-3">
              <StatusIndicator status={agentStatus} />
              {agentStatus === 'verified' && (
                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-lg text-[#94a3b8] hover:text-white hover:bg-white/10 transition-colors"
                  title="Reset demo"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Main 3-Column / Workspace Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
            {/* Left Column: Repository Tree (3 cols) */}
            <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-white/[0.08] bg-[#0b0e14] p-3 text-xs">
              <div className="flex items-center justify-between text-[#64748b] font-mono text-[11px] mb-3 px-2 uppercase tracking-wider">
                <span>Repository Explorer</span>
                <span className="text-emerald-400">git: synced</span>
              </div>

              <div className="space-y-1 font-mono text-[#94a3b8]">
                <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/[0.03] text-[#cbd5e1]">
                  <ChevronRight className="w-3 h-3 text-[#64748b]" />
                  <span>src/components</span>
                </div>
                <div className="pl-3 space-y-1">
                  <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/[0.03]">
                    <FileCode2 className="w-3.5 h-3.5 text-[#64748b]" />
                    <span>Workspace.tsx</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-2 py-1.5 rounded bg-indigo-500/10 text-indigo-300">
                  <ChevronRight className="w-3 h-3 text-indigo-400 rotate-90" />
                  <span className="font-semibold">src/lib</span>
                  <span className="ml-auto text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 rounded">
                    modified
                  </span>
                </div>
                <div className="pl-3 space-y-1">
                  <button
                    onClick={() => {
                      setActiveFile('auth');
                      setActiveTab('diff');
                    }}
                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-left transition-colors ${
                      activeFile === 'auth' && activeTab === 'diff'
                        ? 'bg-indigo-600/30 text-white font-medium'
                        : 'hover:bg-white/[0.03] text-[#cbd5e1]'
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <FileCode2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span className="truncate">rate-limiter.ts</span>
                    </span>
                    <span className="text-emerald-400 font-mono text-[10px]">+18 -4</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveFile('route');
                      setActiveTab('diff');
                    }}
                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-left transition-colors ${
                      activeFile === 'route' && activeTab === 'diff'
                        ? 'bg-indigo-600/30 text-white font-medium'
                        : 'hover:bg-white/[0.03] text-[#cbd5e1]'
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <FileCode2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span className="truncate">auth-callback.ts</span>
                    </span>
                    <span className="text-emerald-400 font-mono text-[10px]">+12 -2</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/[0.03] text-[#cbd5e1]">
                  <ChevronRight className="w-3 h-3 text-[#64748b]" />
                  <span>tests</span>
                  <span className="ml-auto text-[10px] text-emerald-400 font-mono">2 files</span>
                </div>
              </div>

              {/* AST Knowledge Graph Box */}
              <div className="mt-8 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-indigo-300 font-semibold">
                  <Layers className="w-3.5 h-3.5" />
                  <span>AST Context Graph</span>
                </div>
                <p className="text-[11px] text-[#64748b] leading-relaxed">
                  Orbit indexed 42 modules and 128 exported symbols. Zero blind regex modifications.
                </p>
              </div>
            </div>

            {/* Center Column: Plan & Diff Viewer (6 cols) */}
            <div className="lg:col-span-6 flex flex-col border-b lg:border-b-0 lg:border-r border-white/[0.08] bg-[#07080b]">
              {/* Tab Navigation */}
              <div className="flex items-center border-b border-white/[0.08] px-3 bg-[#0d1017]">
                <button
                  onClick={() => setActiveTab('plan')}
                  className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-colors flex items-center gap-2 ${
                    activeTab === 'plan'
                      ? 'border-indigo-500 text-white font-semibold'
                      : 'border-transparent text-[#94a3b8] hover:text-[#cbd5e1]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>1. Proposed Plan</span>
                </button>
                <button
                  onClick={() => setActiveTab('diff')}
                  className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-colors flex items-center gap-2 ${
                    activeTab === 'diff'
                      ? 'border-indigo-500 text-white font-semibold'
                      : 'border-transparent text-[#94a3b8] hover:text-[#cbd5e1]'
                  }`}
                >
                  <FileCode2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>2. Staged Diffs (2)</span>
                </button>
                <button
                  onClick={() => setActiveTab('tests')}
                  className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-colors flex items-center gap-2 ${
                    activeTab === 'tests'
                      ? 'border-indigo-500 text-white font-semibold'
                      : 'border-transparent text-[#94a3b8] hover:text-[#cbd5e1]'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>3. Sandbox Verification</span>
                </button>
              </div>

              {/* Tab Content Area */}
              <div className="p-4 flex-1 overflow-y-auto">
                {activeTab === 'plan' && (
                  <div className="space-y-4">
                    <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs">
                      <p className="font-semibold text-indigo-200">
                        Objective: Replace in-memory token bucket with distributed sliding window rate limiter.
                      </p>
                      <p className="text-indigo-300/80 mt-1">
                        Agent synthesized 3 discrete milestones. Awaiting developer approval before committing.
                      </p>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div className="p-3 rounded-xl bg-[#0e111a] border border-white/[0.08] flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                          ✓
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium text-white">Step 1: Dependency Graph Analysis</p>
                          <p className="text-[#94a3b8]">
                            Scanned 14 API routes importing legacy rate-limiter. Verified zero cyclic imports.
                          </p>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-[#0e111a] border border-white/[0.08] flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                          2
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium text-white">Step 2: Implement Redis Sliding Window</p>
                          <p className="text-[#94a3b8]">
                            Write `verifyRateLimit()` using atomic timestamps; guard OAuth endpoints with 429 backoff.
                          </p>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-[#0e111a] border border-white/[0.08] flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                          3
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium text-white">Step 3: Verification in Isolated Sandbox</p>
                          <p className="text-[#94a3b8]">
                            Run Vitest suite with high-concurrency simulation (100 parallel requests) to confirm zero race conditions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'diff' && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <button
                        onClick={() => setActiveFile('auth')}
                        className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                          activeFile === 'auth'
                            ? 'bg-white/10 border-white/20 text-white font-medium'
                            : 'border-transparent text-[#94a3b8] hover:bg-white/[0.04]'
                        }`}
                      >
                        rate-limiter.ts
                      </button>
                      <button
                        onClick={() => setActiveFile('route')}
                        className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                          activeFile === 'route'
                            ? 'bg-white/10 border-white/20 text-white font-medium'
                            : 'border-transparent text-[#94a3b8] hover:bg-white/[0.04]'
                        }`}
                      >
                        auth-callback.ts
                      </button>
                    </div>

                    <CodePreview
                      filename={diffFiles[activeFile].name}
                      lines={diffFiles[activeFile].lines}
                      additionsCount={diffFiles[activeFile].additions}
                      deletionsCount={diffFiles[activeFile].deletions}
                    />
                  </div>
                )}

                {activeTab === 'tests' && (
                  <div className="rounded-xl border border-white/10 bg-[#090b10] p-4 font-mono text-xs space-y-3">
                    <div className="flex items-center justify-between text-[#64748b] border-b border-white/[0.06] pb-2">
                      <span className="flex items-center gap-2 text-emerald-400">
                        <Terminal className="w-4 h-4" />
                        Sandboxed Vitest Runner
                      </span>
                      <span className="text-[11px] text-emerald-400 font-semibold">ALL TESTS PASSED</span>
                    </div>

                    <div className="space-y-1 text-[#94a3b8]">
                      <p className="text-white">$ vitest run tests/rate-limiter.test.ts</p>
                      <p className="text-[#64748b]"> ✓ tests/rate-limiter.test.ts (4 tests) 142ms</p>
                      <p className="text-emerald-400">   ✓ grants tokens within 60s quota</p>
                      <p className="text-emerald-400">   ✓ drops bursts exceeding window capacity</p>
                      <p className="text-emerald-400">   ✓ hashes client IP to prevent entropy leakage</p>
                      <p className="text-emerald-400">   ✓ safely recovers from redis latency spikes</p>
                      <p className="text-[#cbd5e1] pt-2">
                        Test Files  1 passed (1)
                      </p>
                      <p className="text-emerald-400 font-semibold">
                        Tests       4 passed (4)
                      </p>
                      <p className="text-[#64748b]">
                        Duration    380ms (transform 48ms, setup 0ms, collect 32ms, tests 142ms)
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Bottom Control Bar (Human Approval Gate) */}
              <div className="p-3.5 bg-[#0d1017] border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-[#94a3b8]">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Changes are staged in memory. Code on disk remains unchanged.</span>
                </div>

                <div className="flex items-center gap-2.5">
                  {agentStatus === 'awaitingApproval' ? (
                    <Button
                      variant="glow"
                      size="sm"
                      onClick={handleApprove}
                      isLoading={isSimulating}
                      iconLeft={<Check className="w-4 h-4" />}
                    >
                      Approve & Execute Plan
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
                        <CheckCircle2 className="w-4 h-4" />
                        Verified & Ready
                      </span>
                      <Button variant="secondary" size="sm" onClick={handleReset}>
                        Reset Demo
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Telemetry & Invariants (3 cols) */}
            <div className="lg:col-span-3 bg-[#0b0e14] p-4 text-xs space-y-5">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-[#64748b] uppercase tracking-wider">
                  Session Telemetry
                </span>
                <h4 className="font-semibold text-white">Execution Bounds</h4>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                  <div className="flex justify-between text-[#94a3b8]">
                    <span>File Mutations</span>
                    <span className="font-mono text-white">2 files</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full w-[25%]" />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                  <div className="flex justify-between text-[#94a3b8]">
                    <span>AST Integrity</span>
                    <span className="font-mono text-emerald-400">100% Clean</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-full" />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                  <div className="flex justify-between text-[#94a3b8]">
                    <span>Sandbox State</span>
                    <span className="font-mono text-cyan-400">Isolated</span>
                  </div>
                  <p className="text-[11px] text-[#64748b]">No network egress outside repository</p>
                </div>
              </div>

              <div className="pt-2 border-t border-white/[0.08]">
                <div className="flex items-center gap-2 text-[#94a3b8] mb-2 font-mono text-[11px]">
                  <GitCommit className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Staged Commit Preview</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#07080b] border border-white/[0.06] font-mono text-[11px] text-[#cbd5e1] leading-relaxed">
                  feat(security): integrate sliding window rate limiter for auth routes
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
