import React, { useState, useRef } from 'react';
import {
  Monitor,
  Tablet,
  Smartphone,
  Sparkles,
  ArrowUpRight,
  Zap,
  Check,
  RotateCcw,
  ArrowLeft,
  Radio,
} from 'lucide-react';

interface PlatformSandboxViewProps {
  onBackToWebsite: () => void;
  onOpenQuickStart: () => void;
  onOpenWaitlist: () => void;
}

export const PlatformSandboxView: React.FC<PlatformSandboxViewProps> = ({
  onBackToWebsite,
  onOpenQuickStart,
  onOpenWaitlist,
}) => {
  const [selectedBranch, setSelectedBranch] = useState('main');
  const [activeCodeFile, setActiveCodeFile] = useState('ProductGallery.tsx');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const [activeSwatch, setActiveSwatch] = useState<'sand' | 'obsidian' | 'sage'>('sand');
  const [cartCount, setCartCount] = useState(1);
  const [promptText, setPromptText] = useState('Give the product page a calmer layout and make the gallery feel more immersive.');
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionState, setExecutionState] = useState<'idle' | 'planning' | 'building' | 'verifying' | 'done'>('done');

  const [logLines, setLogLines] = useState<string[]>([
    '09:42:10 [AST Analyzer] Parsed 3 modules: ProductGallery.tsx, Carousel.tsx, theme.css',
    '09:42:12 [Git Isolation] Created atomic branch checkout main -> staging',
    '09:42:14 [Vite HMR] Transformed 3 modules in 14ms (39.8kb gzip)',
    '09:42:15 [Approval Review] Staged proposed layout across desktop, tablet, and mobile viewports',
    '09:42:16 [Orbit Demo] Staged for developer review & approval (Design Demonstration)',
  ]);

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const handleRunPrompt = () => {
    if (!promptText.trim() || isExecuting) return;
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];

    setIsExecuting(true);
    setExecutionState('planning');
    setLogLines((prev) => [
      `--:--:-- [Brief Received] "${promptText.slice(0, 48)}..."`,
      '--:--:-- [Step 1/3] Synthesizing requirements into proposal (Approval required)...',
      ...prev.slice(0, 4),
    ]);

    const t1 = setTimeout(() => {
      setExecutionState('building');
      setLogLines((prev) => [
        '--:--:-- [Step 2/3] Drafting proposed diffs for ProductGallery.tsx (Awaiting approval)...',
        ...prev.slice(0, 5),
      ]);
    }, 1800);

    const t2 = setTimeout(() => {
      setExecutionState('verifying');
      setLogLines((prev) => [
        '--:--:-- [Step 3/3] Staging preview checks for developer inspection...',
        ...prev.slice(0, 5),
      ]);
    }, 3600);

    const t3 = setTimeout(() => {
      setExecutionState('done');
      setIsExecuting(false);
      setLogLines((prev) => [
        '--:--:-- [Orbit Demo] Proposed plan and diffs ready for developer inspection and approval',
        ...prev.slice(0, 6),
      ]);
    }, 5200);

    timersRef.current.push(t1, t2, t3);
  };

  const angleOptions = [
    { title: 'Front Angle', bg: 'linear-gradient(135deg, #f5ebd9, #d4b28c)' },
    { title: 'Top Down', bg: 'linear-gradient(135deg, #e2e8f0, #94a3b8)' },
    { title: 'Side Profile', bg: 'linear-gradient(135deg, #dcfce7, #86efac)' },
  ];

  return (
    <div className="sandbox-workspace-container" style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      {/* Top Bar */}
      <header className="sandbox-light-topbar">
        <div className="sandbox-topbar-left">
          <button type="button" onClick={onBackToWebsite} className="btn-light-back" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <ArrowLeft size={14} strokeWidth={2} aria-hidden="true" />
            <span>Back to Homepage</span>
          </button>
          <div className="sandbox-brand-group">
            <span className="brand-mark" style={{ color: 'var(--violet)' }}>
              <Radio size={16} strokeWidth={2} aria-hidden="true" />
            </span>
            <span className="sandbox-brand-name">orbit</span>
            <span className="sandbox-paper-pill">PLATFORM SANDBOX (DEMO)</span>
          </div>
          <div className="sandbox-path-pill">
            <span className="path-icon" style={{ color: 'var(--violet)' }}>
              <Radio size={12} strokeWidth={2} aria-hidden="true" />
            </span>
            <span>atlas / storefront-refresh</span>
          </div>
          <div className="sandbox-branch-switcher">
            <label htmlFor="sandbox-branch-select">Branch:</label>
            <select
              id="sandbox-branch-select"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="sandbox-select"
            >
              <option value="main">main (production)</option>
              <option value="staging">staging</option>
              <option value="feat/storefront-refresh">feat/storefront-refresh</option>
            </select>
          </div>
        </div>

        <div className="sandbox-topbar-right">
          <div className="sandbox-status-indicator">
            <span className="live-dot" />
            <span>Approval-First Workspace (Prototype Preview)</span>
          </div>
          <button type="button" onClick={onOpenQuickStart} className="btn-light-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span>1-Click Win/Mac Launch</span>
            <Zap size={13} strokeWidth={2} aria-hidden="true" />
          </button>
          <button type="button" onClick={onOpenWaitlist} className="btn-light-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span>Get Early Access</span>
            <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Main Sandbox Stage */}
      <div className="sandbox-inner-stage shell" style={{ padding: '24px 0 60px' }}>
        <div className="sandbox-window-frame" style={{ borderRadius: '16px', border: '1px solid var(--line)', background: '#fff', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.08)' }}>
          {/* Window Topbar */}
          <div className="window-topbar">
            <div className="window-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <div className="window-path">
              <span className="path-icon" style={{ color: 'var(--violet)' }}>
                <Radio size={12} strokeWidth={2} aria-hidden="true" />
              </span>
              <span>./projects/atlas-storefront/components/ProductGallery.tsx</span>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Interactive Simulation</span>
          </div>

          {/* Columns Layout */}
          <div className="sandbox-workspace-columns" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '620px' }}>
            {/* Left Column: Code Editor & Logs */}
            <div style={{ padding: '20px', borderRight: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: '16px', background: '#fafbfc' }}>
              {/* Task Prompt Box */}
              <div style={{ display: 'flex', gap: '8px', background: '#fff', padding: '8px 12px', borderRadius: '10px', border: '1px solid var(--line)' }}>
                <span style={{ color: 'var(--violet)', display: 'grid', placeItems: 'center' }}>
                  <Sparkles size={16} strokeWidth={2} aria-hidden="true" />
                </span>
                <input
                  type="text"
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder="Describe proposed changes for agent planning and review..."
                  style={{ flex: 1, border: 'none', outline: 'none', font: '13px var(--font-body)', background: 'transparent' }}
                  disabled={isExecuting}
                />
                <button
                  type="button"
                  onClick={handleRunPrompt}
                  disabled={isExecuting}
                  style={{
                    background: 'var(--lime)',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 14px',
                    fontWeight: 700,
                    fontSize: '12px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>{isExecuting ? executionState.toUpperCase() : 'Propose Plan'}</span>
                  <Sparkles size={12} strokeWidth={2} aria-hidden="true" />
                </button>
              </div>

              {/* Code Editor Card */}
              <div style={{ borderRadius: '10px', border: '1px solid var(--line)', background: '#16171d', color: '#f8fafc', overflow: 'hidden', display: 'flex', flexDirection: 'column', flex: 1 }}>
                {/* Code Tabs */}
                <div style={{ display: 'flex', background: '#0e1017', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '0 8px' }}>
                  {['ProductGallery.tsx', 'tailwind.config.js', 'server.ts'].map((fileName) => (
                    <button
                      key={fileName}
                      type="button"
                      onClick={() => setActiveCodeFile(fileName)}
                      style={{
                        padding: '10px 14px',
                        background: activeCodeFile === fileName ? '#16171d' : 'transparent',
                        color: activeCodeFile === fileName ? '#fff' : '#94a3b8',
                        border: 'none',
                        borderBottom: activeCodeFile === fileName ? '2px solid var(--violet)' : '2px solid transparent',
                        fontSize: '12px',
                        fontFamily: 'monospace',
                        cursor: 'pointer',
                      }}
                    >
                      {fileName}
                    </button>
                  ))}
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', paddingRight: '8px' }}>
                    <span style={{ fontSize: '11px', color: '#10b981', fontFamily: 'monospace' }}>+142 -38</span>
                  </div>
                </div>

                {/* Editor Content */}
                <div style={{ padding: '16px', fontFamily: 'monospace', fontSize: '12px', lineHeight: 1.6, overflowX: 'auto', flex: 1 }}>
                  {activeCodeFile === 'ProductGallery.tsx' && (
                    <pre style={{ margin: 0, color: '#e2e8f0' }}>
                      {`export function ProductGallery({ product, activeAngle }: GalleryProps) {
  const [selectedAngle, setSelectedAngle] = useState(activeAngle || 0);
  const [swatchColor, setSwatchColor] = useState('sand');

  // Multi-angle thumbnail carousel with smooth spring physics
  return (
    <div className="product-stage-container" data-theme={swatchColor}>
      <CarouselViewport angleIndex={selectedAngle} onSelect={setSelectedAngle} />
      <ProductSpecSummary sku={product.sku} verifiedRating={4.9} />
    </div>
  );
}`}
                    </pre>
                  )}
                  {activeCodeFile === 'tailwind.config.js' && (
                    <pre style={{ margin: 0, color: '#e2e8f0' }}>
                      {`module.exports = {
  theme: {
    extend: {
      colors: {
        stage: { sand: '#e5c7a5', obsidian: '#1e293b', sage: '#059669' }
      }
    }
  }
};`}
                    </pre>
                  )}
                  {activeCodeFile === 'server.ts' && (
                    <pre style={{ margin: 0, color: '#e2e8f0' }}>
                      {`// Local Express + SQLite Backend API (Demo Preview)
app.get('/api/v1/products/atlas-refresh', (req, res) => {
  res.json({ id: 'atlas_01', status: 'pending_approval', preview: true });
});`}
                    </pre>
                  )}
                </div>
              </div>

              {/* Log Stream Box */}
              <div style={{ borderRadius: '10px', border: '1px solid var(--line)', background: '#fff', padding: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--muted)', fontWeight: 700, marginBottom: '6px' }}>
                  <span>PROPOSED AGENT AUDIT LOG</span>
                  <span style={{ color: '#15803d' }}>● PROTOTYPE PREVIEW</span>
                </div>
                <div style={{ fontFamily: 'monospace', fontSize: '11px', color: '#475569', lineHeight: 1.5, maxHeight: '90px', overflowY: 'auto' }}>
                  {logLines.map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Live Browser Viewport Preview */}
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Viewport Control Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {(['desktop', 'tablet', 'mobile'] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setViewport(v)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: '1px solid var(--line)',
                        background: viewport === v ? 'var(--ink)' : '#fff',
                        color: viewport === v ? '#fff' : 'var(--muted)',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      {v === 'desktop' ? (
                        <>
                          <Monitor size={12} strokeWidth={2} aria-hidden="true" />
                          <span>Desktop</span>
                        </>
                      ) : v === 'tablet' ? (
                        <>
                          <Tablet size={12} strokeWidth={2} aria-hidden="true" />
                          <span>Tablet</span>
                        </>
                      ) : (
                        <>
                          <Smartphone size={12} strokeWidth={2} aria-hidden="true" />
                          <span>Mobile</span>
                        </>
                      )}
                    </button>
                  ))}
                </div>
                <div style={{ fontSize: '11px', color: '#15803d', fontWeight: 600 }}>
                  <span className="live-dot" style={{ display: 'inline-block', marginRight: '6px' }} />
                  PROTOTYPE PREVIEW (DESIGN DEMO)
                </div>
              </div>

              {/* Browser Window Frame */}
              <div
                style={{
                  border: '1px solid var(--line)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  background: '#fff',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                  width: viewport === 'mobile' ? '320px' : viewport === 'tablet' ? '460px' : '100%',
                  margin: '0 auto',
                  transition: 'width 0.3s ease',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Browser URL bar */}
                <div style={{ background: '#f8fafc', padding: '8px 12px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff968b', display: 'inline-block' }} />
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffc96f', display: 'inline-block' }} />
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#7cd8a2', display: 'inline-block' }} />
                  </div>
                  <div style={{ flex: 1, background: '#fff', border: '1px solid var(--line)', borderRadius: '4px', padding: '2px 8px', fontSize: '11px', color: '#64748b' }}>
                    https://atlas-storefront.local:3000/products/horizon
                  </div>
                  <RotateCcw size={12} color="#94a3b8" aria-hidden="true" />
                </div>

                {/* E-Commerce Product Layout */}
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: '13px', fontFamily: 'var(--font-display)' }}>ATLAS ACOUSTICS</strong>
                    <span style={{ fontSize: '12px', background: 'var(--lilac)', color: 'var(--violet)', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>
                      Cart ({cartCount})
                    </span>
                  </div>

                  {/* Product Visual Box */}
                  <div
                    style={{
                      height: '170px',
                      borderRadius: '10px',
                      background:
                        activeSwatch === 'sand'
                          ? angleOptions[activeAngleIndex].bg
                          : activeSwatch === 'obsidian'
                          ? 'linear-gradient(135deg, #475569, #1e293b)'
                          : 'linear-gradient(135deg, #10b981, #065f46)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05)',
                    }}
                  >
                    <div style={{ width: '60px', height: '90px', borderRadius: '30px', background: 'rgba(255,255,255,0.85)', boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }} />
                    <span style={{ position: 'absolute', bottom: '8px', right: '10px', fontSize: '10px', background: 'rgba(255,255,255,0.9)', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                      {angleOptions[activeAngleIndex].title}
                    </span>
                  </div>

                  {/* Product Details */}
                  <div>
                    <span style={{ fontSize: '10px', background: 'var(--lime)', color: '#171820', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>
                      NEW RELEASE
                    </span>
                    <h3 style={{ fontSize: '18px', margin: '6px 0 2px', fontFamily: 'var(--font-display)' }}>
                      Horizon Soundstage Speaker
                    </h3>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--violet)' }}>
                      $349.00 USD
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '6px 0 12px', lineHeight: 1.5 }}>
                      Sculpted matte acoustic enclosure with spatial multi-room driver array. Designed with Orbit layout agents.
                    </p>

                    {/* Finish Color Swatches */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 600 }}>Finish:</span>
                      <button
                        type="button"
                        onClick={() => setActiveSwatch('sand')}
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          background: '#e5c7a5',
                          border: activeSwatch === 'sand' ? '2px solid var(--violet)' : '2px solid transparent',
                          cursor: 'pointer',
                        }}
                        title="Warm Sand"
                      />
                      <button
                        type="button"
                        onClick={() => setActiveSwatch('obsidian')}
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          background: '#1e293b',
                          border: activeSwatch === 'obsidian' ? '2px solid var(--violet)' : '2px solid transparent',
                          cursor: 'pointer',
                        }}
                        title="Obsidian Night"
                      />
                      <button
                        type="button"
                        onClick={() => setActiveSwatch('sage')}
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          background: '#059669',
                          border: activeSwatch === 'sage' ? '2px solid var(--violet)' : '2px solid transparent',
                          cursor: 'pointer',
                        }}
                        title="Deep Sage"
                      />
                    </div>

                    {/* Angle Thumbnails */}
                    <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
                      {angleOptions.map((opt, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveAngleIndex(idx)}
                          style={{
                            flex: 1,
                            padding: '6px 4px',
                            borderRadius: '6px',
                            border: '1px solid var(--line)',
                            background: activeAngleIndex === idx ? 'var(--paper)' : '#fff',
                            fontWeight: activeAngleIndex === idx ? 700 : 500,
                            fontSize: '10px',
                            cursor: 'pointer',
                          }}
                        >
                          {opt.title}
                        </button>
                      ))}
                    </div>

                    {/* Add to Cart */}
                    <button
                      type="button"
                      onClick={() => setCartCount((prev) => prev + 1)}
                      className="button button-dark"
                      style={{ width: '100%', minHeight: '44px', fontSize: '13px' }}
                    >
                      Add to Cart +
                    </button>
                  </div>
                </div>

                {/* Browser Verification Footer */}
                <div style={{ padding: '8px 16px', background: '#f8fafc', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#15803d', fontWeight: 600 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Check size={12} strokeWidth={2} /> 0 Layout Shifts (CLS)
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Check size={12} strokeWidth={2} /> AA Contrast Passed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformSandboxView;
