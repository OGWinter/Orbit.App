import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { GitBranch, Cpu, ShieldCheck, Terminal, Layers } from 'lucide-react';

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentationModal: React.FC<DocumentationModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Orbit Architecture Documentation"
      description="Technical specifications and architectural design overview for the Orbit workspace."
      maxWidth="xl"
    >
      <div className="space-y-5 py-2 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin">
        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold">
              <Cpu className="w-4 h-4" />
              <span>Contextual AST Graph</span>
            </div>
            <p className="text-[#94a3b8] leading-relaxed">
              Orbit builds an in-memory Abstract Syntax Tree and dependency graph across your entire repository, preserving symbol references and call hierarchies before making suggestions.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold">
              <GitBranch className="w-4 h-4" />
              <span>Spec-First Planning</span>
            </div>
            <p className="text-[#94a3b8] leading-relaxed">
              Before modifying any code, the agent generates a step-by-step implementation plan detailing which files will change, why, and what invariants must be preserved.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Human Approval Gate</span>
            </div>
            <p className="text-[#94a3b8] leading-relaxed">
              No code is written blindly to disk. Orbit stages every modification in an interactive diff viewer, pausing for your explicit approval or refinement.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <Terminal className="w-4 h-4" />
              <span>Automated Verification</span>
            </div>
            <p className="text-[#94a3b8] leading-relaxed">
              Orbit executes test suites, typecheckers, and lint rules inside an isolated sandbox, automatically detecting regressions and self-correcting errors.
            </p>
          </div>
        </div>

        {/* Quick Spec Details */}
        <div className="p-4 rounded-xl bg-[#090b10] border border-white/10 space-y-2.5 font-mono text-xs">
          <div className="flex items-center justify-between text-[#64748b] border-b border-white/[0.06] pb-2">
            <span className="flex items-center gap-2 text-[#cbd5e1] font-sans font-medium">
              <Layers className="w-4 h-4 text-indigo-400" />
              Runtime Support & Compatibility
            </span>
            <span className="text-[11px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
              Orbit V2 Specs
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1 text-[11px] text-[#94a3b8]">
            <div>
              <span className="text-white font-semibold">Languages:</span> TypeScript, JavaScript, Python, Go, Rust
            </div>
            <div>
              <span className="text-white font-semibold">VCS:</span> Git, GitHub, GitLab, Local clones
            </div>
            <div>
              <span className="text-white font-semibold">Sandboxing:</span> Local container / WASM isolation
            </div>
            <div>
              <span className="text-white font-semibold">Target:</span> Web & Desktop Native
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button variant="secondary" onClick={onClose}>
            Back to Overview
          </Button>
        </div>
      </div>
    </Modal>
  );
};
