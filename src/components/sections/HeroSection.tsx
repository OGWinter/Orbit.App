import React, { useState, useRef } from 'react';
import { AgentStep, WorkspaceTab, AgentSimulationStage, FileDiffItem } from '../../types/orbit';

interface HeroSectionProps {
  currentBuilderRole?: string;
  onOpenQuickStart: () => void;
  onOpenPlatformDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenQuickStart,
  onOpenPlatformDemo,
}) => {
  const [taskPrompt, setTaskPrompt] = useState('Give the product page a calmer layout and make the gallery feel more immersive.');
  const [activeBranch, setActiveBranch] = useState('main');
  const [activeRailTab, setActiveRailTab] = useState<WorkspaceTab>('editor');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStage, setSimulationStage] = useState<AgentSimulationStage>('idle');
  const [simulationNotice, setSimulationNotice] = useState<string | null>(null);
  const [activePopover, setActivePopover] = useState<'plan' | 'verify' | 'menu' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [floatingToast, setFloatingToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setFloatingToast(msg);
    setTimeout(() => setFloatingToast(null), 3000);
  };

  const [agentSteps, setAgentSteps] = useState<AgentStep[]>([
    {
      step_number: 1,
      title: 'Plan ready',
      description: 'Mapped the page structure and component boundaries',
      status: 'done',
      time_label: '2m',
    },
    {
      step_number: 2,
      title: 'Building gallery',
      description: 'Updating 3 components with smooth transitions',
      status: 'active',
      time_label: 'now',
    },
    {
      step_number: 3,
      title: 'Check in browser',
      description: 'Waiting for build completion',
      status: 'pending',
      time_label: '—',
    },
  ]);

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  const runSimulation = () => {
    if (!taskPrompt.trim() || isSimulating) return;
    clearTimers();
    setIsSimulating(true);
    setSimulationNotice(null);
    setActiveRailTab('editor');
    setSimulationStage('planning');

    setAgentSteps([
      {
        step_number: 1,
        title: 'Synthesizing requirements',
        description: 'Parsing design tokens and component hierarchy...',
        status: 'active',
        time_label: 'running',
      },
      {
        step_number: 2,
        title: 'Building gallery components',
        description: 'Queued behind plan approval',
        status: 'pending',
        time_label: 'queued',
      },
      {
        step_number: 3,
        title: 'Headless browser validation',
        description: 'Queued behind build',
        status: 'pending',
        time_label: 'queued',
      },
    ]);

    const t1 = setTimeout(() => {
      setSimulationStage('building');
      setAgentSteps([
        {
          step_number: 1,
          title: 'Plan approved',
          description: 'Architecture mapped across 3 modules',
          status: 'done',
          time_label: '✓ done',
        },
        {
          step_number: 2,
          title: 'Writing component diffs',
          description: 'Updating ProductGallery.tsx, Carousel.tsx (+142, -38)...',
          status: 'active',
          time_label: 'running',
        },
        {
          step_number: 3,
          title: 'Headless browser validation',
          description: 'Queued behind build',
          status: 'pending',
          time_label: 'queued',
        },
      ]);
    }, 1800);

    const t2 = setTimeout(() => {
      setSimulationStage('verifying');
      setAgentSteps([
        {
          step_number: 1,
          title: 'Plan approved',
          description: 'Architecture mapped across 3 modules',
          status: 'done',
          time_label: '✓ done',
        },
        {
          step_number: 2,
          title: 'Proposed diffs prepared',
          description: `+142 lines staged on branch ${activeBranch} for review`,
          status: 'done',
          time_label: '✓ done',
        },
        {
          step_number: 3,
          title: 'Awaiting developer approval',
          description: 'Review diffs and preview before applying changes...',
          status: 'active',
          time_label: 'running',
        },
      ]);
    }, 3800);

    const t3 = setTimeout(() => {
      setSimulationStage('completed');
      setAgentSteps([
        {
          step_number: 1,
          title: 'Plan approved',
          description: 'Architecture mapped across 3 modules',
          status: 'done',
          time_label: '✓ done',
        },
        {
          step_number: 2,
          title: 'Proposed diffs prepared',
          description: `+142 lines staged on branch ${activeBranch} for review`,
          status: 'done',
          time_label: '✓ done',
        },
        {
          step_number: 3,
          title: 'Ready for developer sign-off',
          description: 'Developer approval required before code is committed',
          status: 'done',
          time_label: '✓ done',
        },
      ]);
      setSimulationNotice('✓ Design Demonstration: Proposed plan & staged diffs ready for developer approval. (No live repo modified)');
      setIsSimulating(false);
    }, 5400);

    timersRef.current.push(t1, t2, t3);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      runSimulation();
    }
  };

  const cycleBranch = () => {
    const branches = ['main', 'staging', 'feat/storefront-refresh'];
    const nextIdx = (branches.indexOf(activeBranch) + 1) % branches.length;
    const next = branches[nextIdx];
    setActiveBranch(next);
    showToast(`Switched active git workspace to '${next}'`);
  };

  const searchFiles: FileDiffItem[] = [
    { name: 'ProductGallery.tsx', path: 'src/components/ProductGallery.tsx', lines: '+84, -12' },
    { name: 'ImageCarousel.tsx', path: 'src/components/ImageCarousel.tsx', lines: '+38, -6' },
    { name: 'theme.css', path: 'src/styles/theme.css', lines: '+20, -0' },
    { name: 'orbitStore.ts', path: 'src/services/orbitStore.ts', lines: 'clean' },
    { name: 'server.ts', path: 'server.ts', lines: 'verified' },
  ].filter(
    (f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.path.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollToWorkflow = () => {
    const el = document.getElementById('workflow') || document.getElementById('platform');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero shell" aria-labelledby="hero-title">
      {/* Left Copy */}
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="live-dot" /> THE APPROVAL-FIRST WORKSPACE
        </p>
        <h1 id="hero-title">
          Make room
          <br />
          for <span>what’s next.</span>
        </h1>
        <p className="hero-description">
          Bring your best ideas. Orbit’s AI proposes architectural plans and isolated code changes, waiting for your review and approval before touching a single file.
        </p>

        {/* Action CTAs */}
        <div className="hero-actions">
          <button
            type="button"
            className="button button-dark"
            onClick={onOpenPlatformDemo}
            style={{ cursor: 'pointer' }}
          >
            Explore the platform <span aria-hidden="true">↗</span>
          </button>
          <button
            type="button"
            className="button"
            onClick={onOpenQuickStart}
            style={{ cursor: 'pointer', background: 'var(--lime)', color: '#171820', fontWeight: 700 }}
          >
            Start on Win / Mac <span>⚡</span>
          </button>
          <a className="text-link" href="#workflow">
            See how it works <span aria-hidden="true">↓</span>
          </a>
        </div>

        {/* Approval-First Core Principles */}
        <div className="hero-proof-list" aria-label="Approval-first core principles">
          <div className="proof-item">
            <span className="proof-check" aria-hidden="true">✓</span>
            <span>Approval-first workflow — AI proposes changes, you approve every edit</span>
          </div>
          <div className="proof-item">
            <span className="proof-check" aria-hidden="true">✓</span>
            <span>Transparent plans & atomic diffs before code modifications</span>
          </div>
          <div className="proof-item">
            <span className="proof-check" aria-hidden="true">✓</span>
            <span>Dedicated Git branch isolation with full developer oversight</span>
          </div>
          <div className="proof-item">
            <span className="proof-check" aria-hidden="true">✓</span>
            <span>Zero lock-in — complete source control retention</span>
          </div>
        </div>
      </div>

      {/* Right Art / Interactive Workspace Window Mockup */}
      <div className="hero-art" aria-label="Illustration of an AI agent planning, building, and checking a project">
        <div className="orbit-glow" />
        <div className="orbit-ring orbit-ring-one" />
        <div className="orbit-ring orbit-ring-two" />

        {floatingToast && (
          <div className="hero-floating-notice">
            <span>◈</span> {floatingToast}
          </div>
        )}

        {/* Hero Window */}
        <div className="hero-window">
          {/* Topbar */}
          <div className="window-topbar">
            <div
              className="window-dots"
              onClick={() => showToast('Orbit Window: Workspace active and listening on port 3000')}
              title="Window Controls"
              role="button"
              tabIndex={0}
            >
              <i />
              <i />
              <i />
            </div>
            <div className="window-path">
              <span className="path-icon">◈</span> atlas / storefront-refresh
            </div>
            <button
              type="button"
              className="window-menu-btn"
              onClick={() => setActivePopover(activePopover === 'menu' ? null : 'menu')}
              aria-label="Workspace Actions Menu"
              title="Workspace actions"
            >
              •••
            </button>

            {/* Quick dropdown menu */}
            {activePopover === 'menu' && (
              <div className="hero-quick-dropdown">
                <button
                  type="button"
                  onClick={() => {
                    setActivePopover(null);
                    runSimulation();
                  }}
                >
                  <span>✳</span> Re-run Agent Simulation
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActivePopover(null);
                    setActivePopover('plan');
                  }}
                >
                  <span>▤</span> View Architecture Plan
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActivePopover(null);
                    setActivePopover('verify');
                  }}
                >
                  <span>✓</span> Inspect Playwright Test Suite
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActivePopover(null);
                    onOpenPlatformDemo();
                  }}
                >
                  <span>↗</span> Open Full Sandbox Workspace
                </button>
              </div>
            )}
          </div>

          {/* Workspace Layout */}
          <div className="workspace-layout">
            {/* Rail Navigation */}
            <aside className="workspace-rail" aria-label="Workspace Navigation">
              <button
                type="button"
                className="rail-logo-btn"
                onClick={() => setActiveRailTab('editor')}
                title="Orbit Home"
              >
                ◉
              </button>
              <button
                type="button"
                className={`rail-icon-btn ${activeRailTab === 'editor' ? 'selected' : ''}`}
                onClick={() => setActiveRailTab('editor')}
                title="Editor & Agent Prompt (⌘)"
              >
                ⌘
              </button>
              <button
                type="button"
                className={`rail-icon-btn ${activeRailTab === 'plan' ? 'selected' : ''}`}
                onClick={() => setActiveRailTab('plan')}
                title="Architecture & Plan Specs (▤)"
              >
                ▤
              </button>
              <button
                type="button"
                className={`rail-icon-btn ${activeRailTab === 'search' ? 'selected' : ''}`}
                onClick={() => setActiveRailTab('search')}
                title="Search Codebase & AST (⌕)"
              >
                ⌕
              </button>
              <button
                type="button"
                className={`rail-icon-btn rail-bottom ${activeRailTab === 'settings' ? 'selected' : ''}`}
                onClick={() => setActiveRailTab('settings')}
                title="Workspace Agent Settings (⚙)"
              >
                ⚙
              </button>
            </aside>

            {/* Main Area */}
            <div className="workspace-main">
              <div className="project-heading">
                <div>
                  <span className="mini-label">PROJECT (DEMO)</span>
                  <h2>Storefront refresh</h2>
                </div>
                <button
                  type="button"
                  className="branch-pill-btn"
                  onClick={cycleBranch}
                  title="Click to cycle active git branch"
                >
                  <span /> {activeBranch} <i>⇄</i>
                </button>
              </div>

              {/* Tab 1: Editor / Agent Prompt */}
              {activeRailTab === 'editor' && (
                <>
                  <div className="task-prompt-interactive">
                    <span className="sparkle" style={{ color: 'var(--violet)', fontSize: '13px' }}>
                      ✳
                    </span>
                    <input
                      type="text"
                      value={taskPrompt}
                      onChange={(e) => setTaskPrompt(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Describe what you want the agent to build..."
                      aria-label="Agent execution prompt"
                      disabled={isSimulating}
                    />
                    <button
                      type="button"
                      className="task-run-btn"
                      onClick={runSimulation}
                      disabled={isSimulating}
                      aria-label="Run AI agent demonstration"
                      title="Click to simulate live agent execution across 3 stages"
                    >
                      {isSimulating ? (
                        <>
                          <span>
                            {simulationStage === 'planning'
                              ? 'Planning...'
                              : simulationStage === 'building'
                              ? 'Building...'
                              : 'Verifying...'}
                          </span>
                          <i className="spinner-dot" />
                        </>
                      ) : (
                        <>
                          Run <span>✳</span>
                        </>
                      )}
                    </button>
                  </div>

                  {simulationNotice && (
                    <div
                      style={{
                        background: '#f0fdf4',
                        border: '1px solid #bbf7d0',
                        borderRadius: '6px',
                        padding: '5px 8px',
                        fontSize: '8px',
                        color: '#15803d',
                        marginBottom: '8px',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      {simulationNotice}
                    </div>
                  )}

                  <div className="activity-label">
                    <span>AGENT ORCHESTRATION TIMELINE (SIMULATION)</span>
                    <span>
                      {isSimulating ? (
                        <span style={{ color: 'var(--violet)', fontWeight: 700 }}>
                          STAGE: {simulationStage.toUpperCase()}
                        </span>
                      ) : (
                        <>
                          LIVE <i />
                        </>
                      )}
                    </span>
                  </div>

                  <div className="agent-list">
                    {agentSteps.map((step, idx) => (
                      <div key={idx} className={`agent-step ${step.status}`}>
                        <span className="step-symbol">
                          {step.status === 'done' ? '✓' : step.status === 'active' ? <i /> : '○'}
                        </span>
                        <div>
                          <strong>{step.title}</strong>
                          <small>{step.description}</small>
                        </div>
                        <span className="step-time">{step.time_label || 'now'}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Tab 2: Architecture Plan */}
              {activeRailTab === 'plan' && (
                <div className="hero-rail-tab-content">
                  <div className="tab-title-row">
                    <span className="tab-badge">ARCHITECTURE SPECIFICATION (PREVIEW)</span>
                    <span className="tab-timestamp">v2.4 • synchronized</span>
                  </div>
                  <div className="plan-modules-list">
                    <div className="plan-module-item">
                      <div className="module-header">
                        <strong>1. ProductGallery.tsx</strong>
                        <span className="module-tag">React / TypeScript</span>
                      </div>
                      <p>Implements multi-angle thumbnail carousel with smooth CSS spring transitions and keyboard controls.</p>
                    </div>
                    <div className="plan-module-item">
                      <div className="module-header">
                        <strong>2. theme.css</strong>
                        <span className="module-tag">Design Tokens</span>
                      </div>
                      <p>Defines responsive container queries and relaxed spacing scale (--gallery-gap: 24px).</p>
                    </div>
                    <div className="plan-module-item">
                      <div className="module-header">
                        <strong>3. Headless Verification</strong>
                        <span className="module-tag">Playwright</span>
                      </div>
                      <p>Visual screenshot diff checks across desktop (1280px), tablet (768px), and mobile (390px).</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn-tab-action"
                    onClick={() => setActivePopover('plan')}
                  >
                    Open Deep Plan Inspector ↗
                  </button>
                </div>
              )}

              {/* Tab 3: Code Search */}
              {activeRailTab === 'search' && (
                <div className="hero-rail-tab-content">
                  <div className="search-bar-row">
                    <span>⌕</span>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search files, symbols, hooks..."
                      autoFocus
                    />
                  </div>
                  <div className="search-results-list">
                    {searchFiles.map((file, idx) => (
                      <div
                        key={idx}
                        className="search-result-item"
                        onClick={() => showToast(`Selected ${file.name}`)}
                      >
                        <div>
                          <strong>{file.name}</strong>
                          <small>{file.path}</small>
                        </div>
                        <span className="file-stat-chip">{file.lines}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 4: Agent Settings */}
              {activeRailTab === 'settings' && (
                <div className="hero-rail-tab-content">
                  <div className="tab-title-row">
                    <span className="tab-badge">AGENT ENGINE CONFIG (DEMO)</span>
                  </div>
                  <div className="settings-options-list">
                    <div className="setting-row">
                      <span>LLM Orchestrator</span>
                      <strong>Gemini 2.5 Flash</strong>
                    </div>
                    <div className="setting-row">
                      <span>Git Isolation</span>
                      <strong>Atomic ({activeBranch})</strong>
                    </div>
                    <div className="setting-row">
                      <span>Verification Suite</span>
                      <strong>Headless Playwright CLI</strong>
                    </div>
                    <div className="setting-row">
                      <span>Local Persistence</span>
                      <strong>SQLite (orbit.db)</strong>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn-tab-action"
                    onClick={() => {
                      showToast('Configured Orbit Agent Engine Demo');
                      setActiveRailTab('editor');
                    }}
                  >
                    Apply & Back to Prompt
                  </button>
                </div>
              )}

              {/* Workspace Footer */}
              <div className="workspace-footer">
                <span className="footer-avatar">O</span>
                <span>
                  {isSimulating
                    ? 'Orchestrating agent workflows sequentially...'
                    : activeRailTab === 'plan'
                    ? 'Architecture plan is approved and ready'
                    : activeRailTab === 'search'
                    ? 'AST Index synchronized across 48 modules'
                    : 'Orbit is ready for your next prompt'}
                </span>
                <span className="footer-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Sunglasses E-Commerce Live Preview Float Card */}
        <div
          className="preview-float"
          onClick={() => onOpenPlatformDemo()}
          role="button"
          tabIndex={0}
          title="Click to expand Sandbox Preview"
        >
          <div className="preview-label">
            <span className="preview-dot" /> LIVE PREVIEW (DEMO)
          </div>
          <div className="preview-image">
            <div className="preview-sun" />
            <div className="preview-product" />
            <div className="preview-copy">
              <i />
              <i />
              <b />
            </div>
          </div>
          <div className="preview-caption">
            <span>Product detail</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenPlatformDemo();
              }}
              className="btn-open-preview-link"
              title="Open Sandbox"
            >
              ↗ Open
            </button>
          </div>
        </div>

        {/* Floating Tags */}
        <button
          type="button"
          className="floating-tag tag-plan tag-interactive-btn"
          onClick={() => setActivePopover('plan')}
          title="Click to view Architecture Plan"
        >
          <span>✳</span> Plan
        </button>
        <button
          type="button"
          className="floating-tag tag-verify tag-interactive-btn"
          onClick={() => setActivePopover('verify')}
          title="Click to view Browser Verification Results"
        >
          <span>✓</span> Verify
        </button>
      </div>

      {/* Plan Popover Dialog */}
      {activePopover === 'plan' && (
        <div className="cute-popover-overlay" onClick={() => setActivePopover(null)} role="dialog">
          <div className="cute-popover-card" onClick={(e) => e.stopPropagation()}>
            <div className="cute-card-topbar">
              <div className="cute-badge" style={{ background: 'var(--violet)', color: '#fff' }}>
                <span>✳</span> ORBIT ARCHITECTURE PLAN (DEMO)
              </div>
              <button
                type="button"
                className="cute-close-btn"
                onClick={() => setActivePopover(null)}
              >
                ✕
              </button>
            </div>
            <h3 className="cute-card-title">
              Proposed Plan for <span>storefront-refresh</span>
            </h3>
            <p className="cute-card-desc">
              Orbit synthesizes your prompt into transparent steps requiring your approval before touching code:
            </p>
            <div className="cute-steps-grid">
              <div className="cute-step-pill" style={{ background: '#f5f3ff', borderColor: '#ddd6fe' }}>
                <div className="cute-step-icon" style={{ background: 'var(--violet)', color: '#fff' }}>
                  1
                </div>
                <div className="cute-step-content">
                  <strong>Component Boundaries</strong>
                  <p>Refactors ProductGallery into decoupled ImageCarousel and SpecSummary.</p>
                </div>
              </div>
              <div className="cute-step-pill" style={{ background: '#f5f3ff', borderColor: '#ddd6fe' }}>
                <div className="cute-step-icon" style={{ background: 'var(--violet)', color: '#fff' }}>
                  2
                </div>
                <div className="cute-step-content">
                  <strong>Design Token Upgrades</strong>
                  <p>Applies relaxed ambient padding (--gallery-gap: 32px) and warm sand gradients.</p>
                </div>
              </div>
              <div className="cute-step-pill" style={{ background: '#f5f3ff', borderColor: '#ddd6fe' }}>
                <div className="cute-step-icon" style={{ background: 'var(--violet)', color: '#fff' }}>
                  3
                </div>
                <div className="cute-step-content">
                  <strong>Git Isolation Safety</strong>
                  <p>Branch staged on feat/storefront-refresh to prevent regressions on main.</p>
                </div>
              </div>
            </div>
            <div className="cute-card-actions">
              <button
                type="button"
                className="cute-primary-btn"
                onClick={() => {
                  setActivePopover(null);
                  runSimulation();
                }}
              >
                Run Simulation Now ✳
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Verify Popover Dialog */}
      {activePopover === 'verify' && (
        <div className="cute-popover-overlay" onClick={() => setActivePopover(null)} role="dialog">
          <div className="cute-popover-card" onClick={(e) => e.stopPropagation()}>
            <div className="cute-card-topbar">
              <div className="cute-badge" style={{ background: '#10b981', color: '#fff' }}>
                <span>✓</span> PROPOSED INSPECTION CHECKS (DEMO)
              </div>
              <button
                type="button"
                className="cute-close-btn"
                onClick={() => setActivePopover(null)}
              >
                ✕
              </button>
            </div>
            <h3 className="cute-card-title">
              Visual & Layout Checks <span>Staged for Review</span>
            </h3>
            <p className="cute-card-desc">
              Prototype preview of planned inspection workflow — tests and checks require your explicit review and sign-off:
            </p>
            <div className="cute-steps-grid">
              <div className="cute-step-pill" style={{ background: '#ecfdf5', borderColor: '#a7f3d0' }}>
                <div className="cute-step-icon" style={{ background: '#10b981', color: '#fff' }}>
                  ✓
                </div>
                <div className="cute-step-content">
                  <strong>Viewport Layout Stability</strong>
                  <p>Desktop (1280px), Tablet (768px), and Mobile (390px) rendered with 0 CLS.</p>
                </div>
              </div>
              <div className="cute-step-pill" style={{ background: '#ecfdf5', borderColor: '#a7f3d0' }}>
                <div className="cute-step-icon" style={{ background: '#10b981', color: '#fff' }}>
                  ✓
                </div>
                <div className="cute-step-content">
                  <strong>WCAG 2.1 AA Accessibility</strong>
                  <p>Color contrast ratio: 8.4:1 on warm sand swatches, focus rings active.</p>
                </div>
              </div>
              <div className="cute-step-pill" style={{ background: '#ecfdf5', borderColor: '#a7f3d0' }}>
                <div className="cute-step-icon" style={{ background: '#10b981', color: '#fff' }}>
                  ✓
                </div>
                <div className="cute-step-content">
                  <strong>Zero Console Errors</strong>
                  <p>React 19 hydration cleanly passed without warnings or memory leaks.</p>
                </div>
              </div>
            </div>
            <div className="cute-card-actions">
              <button
                type="button"
                className="cute-primary-btn"
                style={{ background: '#10b981' }}
                onClick={() => setActivePopover(null)}
              >
                Close Verification Suite ✓
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scroll indicator */}
      <button
        type="button"
        className="hero-scroll-btn"
        onClick={scrollToWorkflow}
        aria-label="Scroll down to explore architecture and workflows"
      >
        <span className="scroll-indicator" />
        <span>SCROLL TO EXPLORE WORKFLOWS ↓</span>
      </button>
    </section>
  );
};

export default HeroSection;
