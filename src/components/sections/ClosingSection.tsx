import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

interface ClosingSectionProps {
  onOpenWaitlist: () => void;
  onOpenInquiry: () => void;
}

export const ClosingSection: React.FC<ClosingSectionProps> = ({
  onOpenWaitlist,
  onOpenInquiry,
}) => {
  return (
    <section className="closing-section" id="get-started" aria-labelledby="closing-title">
      <div className="shell closing-inner">
        <div className="closing-orbit" aria-hidden="true">
          <span />
        </div>
        <p className="eyebrow eyebrow-light">THE NEXT MOVE IS YOURS</p>
        <h2 id="closing-title">
          Give your ideas
          <br />
          room to <span>move.</span>
        </h2>
        <p>Bring your next project into focus with a workspace built around the way you think.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            className="button button-lime btn-open-waitlist"
            type="button"
            onClick={onOpenWaitlist}
          >
            <span>Join Early Access</span>
            <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
          </button>
          <button
            className="button button-light btn-open-inquiry"
            type="button"
            onClick={onOpenInquiry}
          >
            <span>Request Team Demo</span>
            <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ClosingSection;
