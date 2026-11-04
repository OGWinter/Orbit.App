import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const WorkspaceView: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState<string | null>(null);

  const handleSignOut = async () => {
    if (signingOut) return;
    setSigningOut(true);
    setSignOutError(null);

    try {
      const result = await signOut();
      if (result && result.error) {
        setSignOutError(
          result.error.message || 'Unable to sign out. Please check your network connection and try again.'
        );
      } else {
        navigate('/login', { replace: true });
      }
    } catch (err) {
      setSignOutError(
        err instanceof Error ? err.message : 'An unexpected error occurred during sign-out.'
      );
    } finally {
      setSigningOut(false);
    }
  };

  const userDisplayName =
    user?.user_metadata?.full_name || (user?.email ? user.email.split('@')[0] : 'Developer');

  const userInitials =
    user?.user_metadata?.full_name
      ? user.user_metadata.full_name
          .split(' ')
          .filter(Boolean)
          .map((part: string) => part[0])
          .slice(0, 2)
          .join('')
          .toUpperCase()
      : userDisplayName.slice(0, 2).toUpperCase();

  return (
    <div className="workspace-shell">
      {/* Mobile Topbar */}
      <div className="workspace-mobile-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="brand-mark" aria-hidden="true" style={{ color: 'var(--violet, #7564f5)' }}>
            <svg viewBox="0 0 36 36" fill="none" width="24" height="24">
              <circle cx="18" cy="18" r="12.5" stroke="currentColor" strokeWidth="1.7" />
              <ellipse
                cx="18"
                cy="18"
                rx="16"
                ry="6.3"
                transform="rotate(-34 18 18)"
                stroke="currentColor"
                strokeWidth="1.7"
              />
              <circle cx="29.4" cy="8.2" r="2.6" fill="currentColor" />
            </svg>
          </span>
          <span style={{ fontWeight: 700, fontSize: '18px', fontFamily: 'var(--font-display)' }}>orbit</span>
          <span className="workspace-badge">WORKSPACE</span>
        </div>
        <button
          type="button"
          className="workspace-mobile-toggle"
          aria-label={mobileMenuOpen ? 'Close workspace menu' : 'Open workspace menu'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          className="workspace-sidebar-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`workspace-sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}
        aria-label="Workspace sidebar navigation"
      >
        <Link to="/workspace" className="workspace-brand" aria-label="Orbit workspace home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 36 36" fill="none" width="28" height="28">
              <circle cx="18" cy="18" r="12.5" stroke="currentColor" strokeWidth="1.7" />
              <ellipse
                cx="18"
                cy="18"
                rx="16"
                ry="6.3"
                transform="rotate(-34 18 18)"
                stroke="currentColor"
                strokeWidth="1.7"
              />
              <circle cx="29.4" cy="8.2" r="2.6" fill="currentColor" />
            </svg>
          </span>
          <span className="brand-name">orbit</span>
          <span className="workspace-badge">WORKSPACE</span>
        </Link>

        {/* Navigation Items */}
        <nav className="workspace-nav" aria-label="Workspace navigation">
          <span className="workspace-nav-section-label">Workspace</span>

          <button
            type="button"
            className="workspace-nav-item active"
            aria-current="page"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span aria-hidden="true">📊</span>
            <span>Overview</span>
          </button>

          <button
            type="button"
            className="workspace-nav-item is-disabled"
            disabled
            aria-disabled="true"
            title="Projects and repository connection are coming in Phase 4.2"
          >
            <span aria-hidden="true">📁</span>
            <span>Projects</span>
            <span className="coming-soon-badge">Coming soon</span>
          </button>

          <button
            type="button"
            className="workspace-nav-item is-disabled"
            disabled
            aria-disabled="true"
            title="Activity logging will be available in an upcoming update"
          >
            <span aria-hidden="true">⚡</span>
            <span>Activity</span>
            <span className="coming-soon-badge">Coming soon</span>
          </button>

          <span className="workspace-nav-section-label" style={{ marginTop: '16px' }}>
            Design Previews
          </span>

          <Link
            to="/platform"
            className="workspace-nav-item"
            onClick={() => setMobileMenuOpen(false)}
            title="Open Platform Sandbox design demonstration"
          >
            <span aria-hidden="true">🧪</span>
            <span>Platform Sandbox</span>
            <span className="coming-soon-badge" style={{ color: '#a7f3d0' }}>
              Preview
            </span>
          </Link>

          <Link
            to="/admin"
            className="workspace-nav-item"
            onClick={() => setMobileMenuOpen(false)}
            title="Open Mission Control design demonstration"
          >
            <span aria-hidden="true">◈</span>
            <span>Mission Control</span>
            <span className="coming-soon-badge" style={{ color: '#fed7aa' }}>
              Preview
            </span>
          </Link>
        </nav>

        {/* User Account Section at Bottom */}
        <div className="workspace-user-section">
          {signOutError && (
            <div className="workspace-signout-error" role="alert" aria-live="assertive">
              <span aria-hidden="true">⚠</span>
              <span>Sign-out failed: {signOutError}</span>
            </div>
          )}
          <div className="workspace-user-card">
            <div className="workspace-avatar" aria-hidden="true">
              {userInitials}
            </div>
            <div className="workspace-user-info">
              <span className="workspace-user-name" title={userDisplayName}>
                {userDisplayName}
              </span>
              <span className="workspace-user-email" title={user?.email || ''}>
                {user?.email}
              </span>
            </div>
            <button
              type="button"
              className="workspace-signout-btn"
              onClick={handleSignOut}
              disabled={signingOut}
              aria-disabled={signingOut}
              aria-label={signingOut ? 'Signing out of Orbit...' : 'Sign out of Orbit'}
            >
              {signingOut ? 'Signing out...' : 'Sign out'}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Workspace Content */}
      <main className="workspace-main-content" role="main">
        {signOutError && (
          <div className="workspace-alert-banner error" role="alert" aria-live="assertive">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span aria-hidden="true">⚠</span>
              <span>
                <strong>Sign-out failed:</strong> {signOutError}
              </span>
            </div>
            <button
              type="button"
              className="workspace-alert-dismiss"
              onClick={() => setSignOutError(null)}
              aria-label="Dismiss error notification"
            >
              ✕
            </button>
          </div>
        )}

        {/* Topbar */}
        <header className="workspace-topbar">
          <div>
            <h1>Workspace Overview</h1>
            <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>
              Authenticated developer workspace shell • Orbit V2
            </p>
          </div>
          <div className="workspace-topbar-actions">
            <Link to="/" className="workspace-external-link" title="View public Orbit website">
              Marketing Site ↗
            </Link>
          </div>
        </header>

        {/* Welcome Dashboard Banner */}
        <section className="workspace-welcome-banner" aria-labelledby="welcome-heading">
          <div className="workspace-status-chip">
            <span className="status-dot" aria-hidden="true" />
            <span>Authenticated via Supabase Auth</span>
          </div>
          <h2 id="welcome-heading">Welcome back, {userDisplayName}</h2>
          <p>
            Your Orbit developer workspace shell is ready. Connected to account identity{' '}
            <strong style={{ color: '#f1f5f9' }}>{user?.email}</strong>. This is your personal workspace
            where upcoming repository connections, branch workflows, and human-in-the-loop AI orchestration will run.
          </p>
        </section>

        {/* Projects Section with Truthful Empty State */}
        <section className="workspace-section" aria-labelledby="projects-heading">
          <div className="workspace-section-header">
            <div>
              <h3 id="projects-heading">Connected Projects</h3>
              <p>Repositories and isolated development environments linked to your workspace.</p>
            </div>
          </div>

          <div className="workspace-empty-card" role="region" aria-label="Projects empty state">
            <div className="workspace-empty-icon" aria-hidden="true">
              📁
            </div>
            <h4>No repositories or projects have been connected yet</h4>
            <p>
              Your Orbit workspace does not currently have any active repository connections. Project creation,
              GitHub integration, and sandboxed developer environments are currently in development for Phase 4.2.
            </p>

            <button
              type="button"
              className="workspace-empty-action"
              disabled
              aria-disabled="true"
              title="Repository connection will be available in Phase 4.2"
            >
              <span>+ Connect Repository</span>
              <span className="coming-soon-pill">Coming in Phase 4.2</span>
            </button>

            {/* Truthful Stats (No fabricated numbers) */}
            <div className="workspace-stats-row">
              <span className="workspace-stat-pill">
                0 Connected Repositories
              </span>
              <span className="workspace-stat-pill">
                0 Active Branches
              </span>
              <span className="workspace-stat-pill">
                0 Staged Reviews
              </span>
            </div>
          </div>
        </section>

        {/* Getting Started Guide */}
        <section className="workspace-section" aria-labelledby="guide-heading">
          <div className="workspace-section-header">
            <div>
              <h3 id="guide-heading">Getting Started</h3>
              <p>Overview of current workspace capabilities and next milestones.</p>
            </div>
          </div>

          <div className="workspace-guide-grid">
            <div className="workspace-guide-card">
              <span className="guide-step-tag">Step 1 • Live</span>
              <h4>Authentication Active</h4>
              <p>
                Your account is verified and securely authenticated with Supabase Auth. Session state and password
                recovery flows are fully operational.
              </p>
            </div>

            <div className="workspace-guide-card">
              <span className="guide-step-tag">Step 2 • Preview</span>
              <h4>Explore Design Demonstrations</h4>
              <p>
                Preview the upcoming developer workflow in the interactive Platform Sandbox and Mission Control
                demonstrations before live repository linking opens.
              </p>
            </div>

            <div className="workspace-guide-card">
              <span className="guide-step-tag">Step 3 • In Development</span>
              <h4>Phase 4.2: Git Connections</h4>
              <p>
                The upcoming release will introduce verified GitHub repository connections, branch-level isolation,
                and human-in-the-loop plan reviews.
              </p>
            </div>
          </div>
        </section>

        {/* Truthful Architecture Note */}
        <aside className="workspace-notice-box" role="note">
          <span style={{ fontSize: '18px' }} aria-hidden="true">
            🛡
          </span>
          <div>
            <strong>Approval-First Architecture:</strong>
            <p style={{ margin: '4px 0 0' }}>
              Orbit never applies autonomous code modifications or executes repository changes without explicit
              developer review. Interactive sandbox features currently displayed in the marketing demos are design
              demonstrations and will arrive in this workspace in upcoming verified phases.
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default WorkspaceView;
