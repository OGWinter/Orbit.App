import React, { useState } from 'react';

export const WorkflowSection: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState(1);
  const [simulatorOpen, setSimulatorOpen] = useState(false);

  const steps = [
    {
      num: '01',
      title: 'Describe the destination',
      desc: 'Set the goal in natural language. Add constraints, mockups, or database requirements where it helps.',
      statusActive: 'INTENT PARSED',
      statusInactive: 'PHASE 1',
      detailBadge: 'Requirements Synthesis',
      simulationCode: `// Phase 1: Synthesizing destination (Design Demo)
const brief = "Create an immersive product gallery with smooth transitions";

const intent = AgentEngine.parseIntent(brief);

// Generated 3 sub-tasks with bounded module scopes`,
    },
    {
      num: '02',
      title: 'Review the plan & diffs',
      desc: 'See the architectural approach before work begins. Steer dependencies, database tables, and component APIs.',
      statusActive: 'DIFFS APPLIED',
      statusInactive: 'PHASE 2',
      detailBadge: 'Branch & File Edits',
      simulationCode: `// Phase 2: Isolated Branch Generation (Design Demo)
git checkout -b orbit/storefront-refresh
// Modifying ProductGallery.tsx (+84, -20 lines)
// Modifying theme.css (+20 lines)
// Transformed AST with 0 TypeScript errors`,
    },
    {
      num: '03',
      title: 'Follow work through live verification',
      desc: 'Track edits, automated headless browser tests, and responsive reviews as your project comes together.',
      statusActive: 'VERIFIED (12/12)',
      statusInactive: 'PHASE 3',
      detailBadge: 'Automated Headless Test',
      simulationCode: `// Phase 3: Headless Playwright Review (Design Demo)
await page.goto('http://localhost:3000');

await expect(page.locator('.mock-product-grid')).toBeVisible();

// ✓ Viewport Responsive (390px, 768px, 1200px)
// ✓ 0 Console Errors | Ready for Release`,
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
            <span>Build with clarity.</span>
          </h2>
          <p>
            Describe what you want to achieve. Orbit turns the goal into a visible plan, generates isolated branch diffs, and verifies running code in headless browsers before you merge.
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
