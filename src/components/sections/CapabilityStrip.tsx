import React, { useState } from 'react';

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
              <span>✦</span> Explore Philosophy
            </span>
          </button>

          <div className="strip-items">
            <button
              type="button"
              className="strip-item-btn"
              onClick={() => setPhilosophyOpen(true)}
              title="Plan with context"
            >
              <i className="strip-icon icon-plan">✳</i> Plan with context
            </button>
            <button
              type="button"
              className="strip-item-btn"
              onClick={() => setPhilosophyOpen(true)}
              title="Build across your code"
            >
              <i className="strip-icon icon-build">⌘</i> Build across your code
            </button>
            <button
              type="button"
              className="strip-item-btn"
              onClick={() => setPhilosophyOpen(true)}
              title="Verify what ships"
            >
              <i className="strip-icon icon-check">✓</i> Verify what ships
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
                <span className="cute-sparkle">✳</span> ORBIT PHILOSOPHY
              </div>
              <button
                type="button"
                className="cute-close-btn"
                onClick={() => setPhilosophyOpen(false)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <h3 id="philosophy-title" className="cute-card-title">
              One clear direction.
              <br />
              <span>More momentum at every step.</span>
            </h3>
            <p className="cute-card-desc">
              Most AI dev tools trap you in conversational ping-pong. Orbit treats coding as an autonomous, verified pipeline that gives you complete certainty.
            </p>
            <div className="cute-steps-grid">
              <div className="cute-step-pill step-plan">
                <div className="cute-step-icon">✳</div>
                <div className="cute-step-content">
                  <strong>01 / Plan with Context</strong>
                  <p>Synthesizes codebase architecture, dependencies, and component boundaries upfront. No blind coding.</p>
                </div>
              </div>
              <div className="cute-step-pill step-build">
                <div className="cute-step-icon">⌘</div>
                <div className="cute-step-content">
                  <strong>02 / Build Across Your Stack</strong>
                  <p>Coordinates multi-file modifications in git-isolated staging trees without polluting your main branch.</p>
                </div>
              </div>
              <div className="cute-step-pill step-verify">
                <div className="cute-step-icon">✓</div>
                <div className="cute-step-content">
                  <strong>03 / Verify Before You Ship</strong>
                  <p>Headless browser runs, responsive layout checks, and unit test suites validate outcomes before release.</p>
                </div>
              </div>
            </div>
            <div className="cute-card-actions">
              <button
                type="button"
                className="cute-primary-btn"
                onClick={() => setPhilosophyOpen(false)}
              >
                Got It ✦
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CapabilityStrip;
