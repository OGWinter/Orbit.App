import React, { useState } from 'react';

export const WorkflowSection: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState(1);
  const [simulatorOpen, setSimulatorOpen] = useState(false);

  const steps = [
    {
      num: '01',
      title: 'Describe what you want to build',
      desc: 'Set the goal in natural language. Add constraints, mockups, or stack preferences where it helps.',
      statusActive: 'PLAN PROPOSED',
      statusInactive: 'PHASE 1',
      detailBadge: 'Requirements Mapping',
      simulationCode: `// Phase 1: Synthesizing destination (Design Demo)
const brief = "Create an immersive product gallery with smooth transitions";

// AI analyzes codebase and maps component boundaries for your review
// Generated 3 proposed changes awaiting your approval`,
    },
    {
      num: '02',
      title: 'Review the plan & diffs',
      desc: 'Inspect proposed architectural steps and file edits. You remain in control: modify constraints or approve before any code is written.',
      statusActive: 'AWAITING APPROVAL',
      statusInactive: 'PHASE 2',
      detailBadge: 'Approval Gate',
      simulationCode: `// Phase 2: Isolated Branch Staging (Design Demo)
git checkout -b orbit/storefront-refresh
// Proposed diffs for ProductGallery.tsx (+84, -20 lines)
// Proposed diffs for theme.css (+20 lines)
// Gated on explicit developer sign-off`,
    },
    {
      num: '03',
      title: 'Approve before merging',
      desc: 'Inspect isolated branch diffs, simulated checks, and responsive layouts. Nothing merges without your sign-off.',
      statusActive: 'DEVELOPER SIGN-OFF',
      statusInactive: 'PHASE 3',
      detailBadge: 'Final Approval',
      simulationCode: `// Phase 3: Developer Review & Sign-Off (Design Demo)
// Proposed visual checks ready for inspection
// Viewport Responsive (390px, 768px, 1200px)
// Requires developer approval to merge`,
    },
  ];

  const current = steps[selectedStep - 1];

  return (
    <section className="workflow-section" id="workflow" aria-labelledby="workflow-title">
      <div className="shell workflow-inner">
        {/* Left Copy */}
        <div className="workflow-copy">
          <p className="eyebrow eyebrow-light">FROM INTENT TO OUTCOME</p>
          <h2 id="workflow-title">
            Think in outcomes.
            <br />
            <span>Stay in control.</span>
          </h2>
          <p>
            Describe what you want to achieve. Orbit analyzes your repository, prepares a transparent execution plan with isolated diffs, and waits for your approval before modifying code.
          </p>
          <button
            type="button"
            className="button button-light"
            onClick={() => setSimulatorOpen(!simulatorOpen)}
            style={{ cursor: 'pointer', border: 'none' }}
          >
            {simulatorOpen ? 'Close Workflow Simulator ✕' : 'Explore Workflow Simulator ⚡'}
          </button>
        </div>

        {/* Right Steps */}
        <div className="workflow-steps">
          <div className="workflow-line">
            <span
              style={{
                height: selectedStep === 1 ? '24%' : selectedStep === 2 ? '62%' : '100%',
              }}
            />
          </div>

          {steps.map((step, idx) => {
            const stepNum = idx + 1;
            const isSelected = selectedStep === stepNum;
            return (
              <article
                key={step.num}
                className={`workflow-step ${isSelected ? 'selected' : ''}`}
                data-step={stepNum}
                onClick={() => setSelectedStep(stepNum)}
                tabIndex={0}
                role="button"
                aria-pressed={isSelected}
              >
                <span className="workflow-number">{step.num}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
                <span className="workflow-status">
                  {isSelected ? step.statusActive : step.statusInactive}
                </span>
              </article>
            );
          })}
        </div>
      </div>

      {/* Simulator Modal */}
      {simulatorOpen && (
        <div
          className="cute-popover-overlay"
          onClick={() => setSimulatorOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="cute-popover-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <div className="cute-card-topbar">
              <div className="cute-badge" style={{ background: 'var(--lime)', color: '#171820' }}>
                <span>⚡</span> WORKFLOW SIMULATOR (DEMONSTRATION)
              </div>
              <button
                type="button"
                className="cute-close-btn"
                onClick={() => setSimulatorOpen(false)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <h3 className="cute-card-title">
              Step {current.num}: {current.title}
            </h3>
            <p className="cute-card-desc">
              Demonstration snippet illustrating how Orbit processes this phase in memory:
            </p>
            <div style={{ background: '#171820', color: '#f8fafc', padding: '16px', borderRadius: '10px', font: '12px/1.6 monospace', overflowX: 'auto', margin: '14px 0' }}>
              <pre style={{ margin: 0 }}>{current.simulationCode}</pre>
            </div>
            <div className="cute-card-actions" style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              {selectedStep < 3 ? (
                <button
                  type="button"
                  className="cute-primary-btn"
                  onClick={() => setSelectedStep(selectedStep + 1)}
                >
                  Next Step ({selectedStep + 1}/3) →
                </button>
              ) : (
                <button
                  type="button"
                  className="cute-primary-btn"
                  onClick={() => setSimulatorOpen(false)}
                >
                  Close Simulator ✓
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WorkflowSection;

