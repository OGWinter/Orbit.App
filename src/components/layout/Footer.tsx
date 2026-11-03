import React from 'react';
import { OrbitLogo } from '../ui/OrbitLogo';
import { Github, Shield, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenWaitlist: () => void;
  onOpenDocs: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenWaitlist, onOpenDocs }) => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#050608] pt-16 pb-12 text-sm text-[#94a3b8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-white/[0.06]">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <OrbitLogo size="md" />
            <p className="text-xs text-[#94a3b8] leading-relaxed max-w-sm">
              The AI-powered development workspace that understands your code, plans your changes, and lets you build with confidence and complete control.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Phase 1 Design Preview — Online</span>
            </div>
          </div>

          {/* Links Column 1: Product */}
          <div className="space-y-3 text-xs">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Product</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#capabilities" className="hover:text-white transition-colors">
                  Core Capabilities
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#workspace-preview" className="hover:text-white transition-colors">
                  Workspace Interactive Preview
                </a>
              </li>
              <li>
                <button onClick={onOpenDocs} className="hover:text-white transition-colors text-left">
                  Architecture Specifications
                </button>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Developers */}
          <div className="space-y-3 text-xs">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Developers</h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={onOpenDocs} className="hover:text-white transition-colors text-left flex items-center gap-1">
                  <span>Documentation</span>
                  <ArrowUpRight className="w-3 h-3 text-[#64748b]" />
                </button>
              </li>
              <li>
                <a
                  href="https://github.com/OGWinter/Orbit.App"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>GitHub Repository</span>
                  <ArrowUpRight className="w-3 h-3 text-[#64748b]" />
                </a>
              </li>
              <li>
                <span className="text-[#64748b]">CLI Tool (Phase 2)</span>
              </li>
              <li>
                <span className="text-[#64748b]">Extensions API (Upcoming)</span>
              </li>
            </ul>
          </div>

          {/* Links Column 3: Trust & Updates */}
          <div className="space-y-3 text-xs">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Trust & Control</h4>
            <div className="space-y-2 text-[#94a3b8]">
              <p className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Zero model training on your code</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span>Local diff approval required</span>
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={onOpenWaitlist}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium underline underline-offset-4"
              >
                Join Early Access Cohort →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748b]">
          <div>
            © {new Date().getFullYear()} Orbit. Built from scratch with React & TypeScript. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#94a3b8] transition-colors cursor-pointer">
              Privacy Philosophy
            </span>
            <span className="hover:text-[#94a3b8] transition-colors cursor-pointer">
              Terms of Service
            </span>
            <a
              href="https://github.com/OGWinter/Orbit.App"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
