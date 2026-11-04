import React, { useState } from 'react';
import { Compass, GitPullRequest, CheckCheck, Sparkles, X } from 'lucide-react';

export const CapabilityStrip: React.FC = () => {
  const [philosophyOpen, setPhilosophyOpen] = useState(false);

  return (
    <>
      <section className="capability-strip" aria-label="Orbit capabilities">
        <div className="shell strip-inner">
          <button
            type="button"
            className="strip-quote-btn"
            onClick={() => setPhilosophyOpen(true)}
            aria-label="Learn about Orbit's core philosophy: One clear direction, more momentum at every step"
            title="Click to view Orbit philosophy breakdown"
          >
            <p>
              One clear direction.
              <br />
              <strong>More momentum at every step.</strong>
            </p>
            <span className="strip-info-chip">
              <Sparkles size={11} strokeWidth={2} aria-hidden="true" />
              <span>Explore Philosophy</span>
            </span>
          </button>

          <div className="strip-items">
            <button
              type="button"
              className="strip-item-btn"
              onClick={() => setPhilosophyOpen(true)}
              title="Plan with context"
            >
              <i className="strip-icon icon-plan" aria-hidden="true">
                <Compass size={13} strokeWidth={2} />
              </i>
              <span>Plan with context</span>
            </button>
            <button
              type="button"
              className="strip-item-btn"
              onClick={() => setPhilosophyOpen(true)}
              title="Propose across your code"
            >
              <i className="strip-icon icon-build" aria-hidden="true">
                <GitPullRequest size={13} strokeWidth={2} />
              </i>
              <span>Propose across your code</span>
            </button>
            <button
              type="button"
              className="strip-item-btn"
              onClick={() => setPhilosophyOpen(true)}
              title="Approve before shipping"
            >
              <i className="strip-icon icon-check" aria-hidden="true">
                <CheckCheck size={13} strokeWidth={2} />
              </i>
              <span>Approve before shipping</span>
            </button>
          </div>
        </div>
      </section>

      {/* Philosophy Popover Dialog */}
      {philosophyOpen && (
        <div
          className="cute-popover-overlay"
          onClick={() => setPhilosophyOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="philosophy-title"
        >
          <div className="cute-popover-card" onClick={(e) => e.stopPropagation()}>
            <div className="cute-card-topbar">
              <div className="cute-badge">
                <Compass size={12} strokeWidth={2} aria-hidden="true" />
                <span>ORBIT PHILOSOPHY</span>
              </div>
              <button
                type="button"
                className="cute-close-btn"
                onClick={() => setPhilosophyOpen(false)}
                aria-label="Close modal"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
            <h3 id="philosophy-title" className="cute-card-title">
              One clear direction.
              <br />
              <span>More momentum at every step.</span>
            </h3>
            <p className="cute-card-desc">
              Most AI dev tools make unreviewed changes or trap you in chat. Orbit is built approval-first: the AI proposes architectural plans and isolated diffs, waiting for your explicit review and sign-off before modifying code.
            </p>
            <div className="cute-steps-grid">
              <div className="cute-step-pill step-plan">
                <div className="cute-step-icon">
                  <Compass size={14} strokeWidth={2} aria-hidden="true" />
                </div>
                <div className="cute-step-content">
                  <strong>01 / Plan with Context</strong>
                  <p>Synthesizes codebase architecture, dependencies, and component boundaries upfront. No blind coding.</p>
                </div>
              </div>
              <div className="cute-step-pill step-build">
                <div className="cute-step-icon">
                  <GitPullRequest size={14} strokeWidth={2} aria-hidden="true" />
                </div>
                <div className="cute-step-content">
                  <strong>02 / Propose Isolated Changes</strong>
                  <p>Coordinates multi-file modifications in git-isolated branches without altering your main codebase until approved.</p>
                </div>
              </div>
              <div className="cute-step-pill step-verify">
                <div className="cute-step-icon">
                  <CheckCheck size={14} strokeWidth={2} aria-hidden="true" />
                </div>
                <div className="cute-step-content">
                  <strong>03 / Review & Approve Before Release</strong>
                  <p>Inspect every proposed diff, simulated check, and layout update. You retain complete authority over every commit.</p>
                </div>
              </div>
            </div>
            <div className="cute-card-actions" style={{ marginTop: '20px', textAlign: 'right' }}>
              <button
                type="button"
                className="button button-dark"
                onClick={() => setPhilosophyOpen(false)}
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CapabilityStrip;
