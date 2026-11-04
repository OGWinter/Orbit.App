import React from 'react';

interface PlatformSectionProps {
  onOpenPlatformDemo: () => void;
}

export const PlatformSection: React.FC<PlatformSectionProps> = ({ onOpenPlatformDemo }) => {
  return (
    <section className="platform-section shell section-space" id="platform" aria-labelledby="platform-title">
      <div className="section-heading">
        <p className="eyebrow">YOUR WORK, IN MOTION</p>
        <h2 id="platform-title">
          A bigger view of
          <br />
          the work ahead.
        </h2>
        <p className="section-intro">
          Move from uncontrolled prompts to an approval-first workspace. Orbit analyzes your codebase, plans atomic changes, and waits for your review and approval before touching code.
        </p>
      </div>

      <div className="platform-grid">
        {/* Card 01: Orchestrate */}
        <article className="feature-card feature-card-dark">
          <div className="feature-topline">
            <span className="feature-icon icon-orchestrate">✳</span>
            <span>01 / ORCHESTRATE</span>
          </div>
          <div className="constellation" aria-hidden="true">
            <span className="constellation-line line-a" />
            <span className="constellation-line line-b" />
            <span className="constellation-line line-c" />
            <span className="constellation-node node-core">✳</span>
            <span className="constellation-node node-one">⌘</span>
            <span className="constellation-node node-two">▤</span>
            <span className="constellation-node node-three">✓</span>
          </div>
          <h3>
            Keep every agent
            <br />
            on the same page.
          </h3>
          <p>
            Give a clear brief, then inspect and approve each proposed step from one focused workspace.
          </p>
          <button
            type="button"
            className="card-link"
            onClick={onOpenPlatformDemo}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            See orchestration <span aria-hidden="true">↗</span>
          </button>
        </article>

        {/* Card 02: Create */}
        <article className="feature-card feature-card-lilac">
          <div className="feature-topline">
            <span className="feature-icon icon-editor">⌘</span>
            <span>02 / CREATE</span>
          </div>
          <div className="code-art" aria-hidden="true">
            <div className="code-bar">
              <span />
              <span />
              <span />
              <b>ProductGallery.tsx</b>
            </div>
            <div className="code-lines">
              <span>
                <i>1</i> <b className="code-purple">export const</b> Gallery = () =&gt; &#123;
              </span>
              <span>
                <i>2</i> &nbsp;&nbsp;<b className="code-blue">const</b> [active, setActive] = useState(0);
              </span>
              <span>
                <i>3</i> &nbsp;&nbsp;<b className="code-pink">return</b> &lt;<b className="code-purple">ImageCarousel</b> /&gt;;
              </span>
            </div>
            <span className="code-cursor" />
          </div>
          <h3>
            Propose changes
            <br />
            with full stack context.
          </h3>
          <p>
            Orbit sees how files connect, drafting coordinated diffs and schema updates for your inspection and sign-off.
          </p>
          <button
            type="button"
            className="card-link"
            onClick={onOpenPlatformDemo}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            See editing preview <span aria-hidden="true">↗</span>
          </button>
        </article>

        {/* Card 03: Verify */}
        <article className="feature-card feature-card-mint">
          <div className="feature-topline">
            <span className="feature-icon icon-browser">✓</span>
            <span>03 / APPROVE</span>
          </div>
          <div className="browser-art" aria-hidden="true">
            <div className="browser-bar">
              <span />
              <span />
              <span />
              <b>localhost:3000/preview</b>
            </div>
            <div className="browser-page">
              <div className="browser-nav">
                <i />
                <i />
              </div>
              <div className="browser-hero">
                <div>
                  <b>New release</b>
                  <i />
                  <i />
                </div>
                <div className="browser-shape" />
              </div>
            </div>
          </div>
          <h3>
            Review changes
            <br />
            before they merge.
          </h3>
          <p>
            Inspect proposed diffs and visual layouts side-by-side, giving you complete approval control before anything hits production.
          </p>
          <button
            type="button"
            className="card-link"
            onClick={onOpenPlatformDemo}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            See approval flow <span aria-hidden="true">↗</span>
          </button>
        </article>
      </div>
    </section>
  );
};

export default PlatformSection;

