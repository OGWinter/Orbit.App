import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWaitlist: () => void;
}

export const SignInModal: React.FC<SignInModalProps> = ({
  isOpen,
  onClose,
  onOpenWaitlist,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Orbit Developer Access"
      description="Authentication is currently reserved for the private developer alpha."
      maxWidth="md"
    >
      <div className="py-2 space-y-5">
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-3.5">
          <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div className="space-y-1 text-xs">
            <p className="font-semibold text-white">Phase 1 Design Preview</p>
            <p className="text-[#94a3b8] leading-relaxed">
              We are strictly staging workspace authentication for Phase 2. Public sign-ins will open with GitHub and GitLab OAuth once the agent sandbox environment is live.
            </p>
          </div>
        </div>

        <div className="space-y-2 text-xs text-[#94a3b8]">
          <div className="flex items-center gap-2 text-[#cbd5e1]">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Encrypted local workspace keys</span>
          </div>
          <div className="flex items-center gap-2 text-[#cbd5e1]">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Direct repository authorization without third-party data retention</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
          <Button
            variant="primary"
            className="flex-1"
            iconRight={<ArrowRight className="w-4 h-4" />}
            onClick={() => {
              onClose();
              onOpenWaitlist();
            }}
          >
            Get Early Access Instead
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
