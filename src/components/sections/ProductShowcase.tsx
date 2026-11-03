import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const ProductShowcase: React.FC = () => {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge variant="cyan" size="md" dot className="mb-3">
            Architectural Invariants
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Designed for stability at repository scale.
          </h2>
          <p className="text-base text-[#94a3b8] mt-3">
            Every feature of Orbit is shaped around one commitment: you understand and approve everything before code hits your branch.
          </p>
        </div>

        {/* 3 Detailed Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: Context Engine */}
          <Card variant="elevated" className="p-6 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#64748b]">
              <span>CORE SUBSYSTEM 01</span>
              <span className="text-indigo-400">AST Graph</span>
            </div>
            <h3 className="text-lg font-bold text-white">Full-Repository AST Map</h3>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Unlike chat windows that rely on 200-line context truncations, Orbit traverses import paths and AST definitions across all files in your project.
            </p>
            <div className="rounded-xl bg-[#07080b] border border-white/10 p-3 text-[11px] font-mono text-[#cbd5e1] space-y-1">
              <div className="text-indigo-400">// Indexed Architecture</div>
              <div>Modules: 48 TypeScript files</div>
              <div>Symbols: 312 interfaces & functions</div>
              <div>Cross-module references: 890</div>
            </div>
          </Card>

          {/* Card 2: Human Approval Gate */}
          <Card variant="elevated" className="p-6 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#64748b]">
              <span>CORE SUBSYSTEM 02</span>
              <span className="text-amber-400">Approval Gate</span>
            </div>
            <h3 className="text-lg font-bold text-white">Human Approval Gate</h3>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              The AI cannot write to your filesystem without explicit permission. Every patch is staged as an in-memory diff with interactive inspection.
            </p>
            <div className="rounded-xl bg-[#07080b] border border-white/10 p-3 text-[11px] font-mono text-[#cbd5e1] space-y-1">
              <div className="text-amber-400">// Approval Staging</div>
              <div>Patch status: STAGED_IN_MEMORY</div>
              <div>Awaiting human review: YES</div>
              <div>Disk write permission: LOCKED</div>
            </div>
          </Card>

          {/* Card 3: Sandboxed Verification */}
          <Card variant="elevated" className="p-6 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#64748b]">
              <span>CORE SUBSYSTEM 03</span>
              <span className="text-emerald-400">Sandbox CI</span>
            </div>
            <h3 className="text-lg font-bold text-white">Isolated Test Sandbox</h3>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Tests run in a closed container. If an assertion fails, Orbit diagnoses the stack trace and presents a corrected proposal automatically.
            </p>
            <div className="rounded-xl bg-[#07080b] border border-white/10 p-3 text-[11px] font-mono text-[#cbd5e1] space-y-1">
              <div className="text-emerald-400">// Test Telemetry</div>
              <div>Vitest execution: 4 passed</div>
              <div>Typecheck: 0 errors (tsc --noEmit)</div>
              <div>Security scan: 0 vulnerabilities</div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
