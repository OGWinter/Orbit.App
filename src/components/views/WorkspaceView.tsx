import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderGit2,
  Activity,
  FlaskConical,
  Radio,
  LogOut,
  ArrowUpRight,
  ShieldCheck,
  Shield,
  GitBranch,
  AlertCircle,
  X,
  Menu,
} from 'lucide-react';
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
          <span className="brand-mark" aria-hidden="true" style={{ color: 'var(--orbit-brand-primary, #315CE8)' }}>
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
              <circle cx="29.4" cy="8.2" r="2.6" fill="var(--orbit-brand-highlight, #D6ED83)" />
            </svg>
          </span>
          <span style={{ fontWeight: 700, fontSize: '18px', fontFamily: 'var(--font-display, "Space Grotesk")' }}>
            orbit
          </span>
          <span className="workspace-badge">WORKSPACE</span>
        </div>
        <button
          type="button"
          className="workspace-mobile-toggle"
          aria-label={mobileMenuOpen ? 'Close workspace menu' : 'Open workspace menu'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
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
              <circle cx="29.4" cy="8.2" r="2.6" fill="var(--orbit-brand-highlight, #D6ED83)" />
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
            <LayoutDashboard size={16} strokeWidth={2} className="nav-item-icon" aria-hidden="true" />
            <span>Overview</span>
          </button>

          <button
            type="button"
            className="workspace-nav-item is-disabled"
            disabled
            aria-disabled="true"
            title="Projects and repository connection are coming in Phase 4.2"
          >
            <FolderGit2 size={16} strokeWidth={2} className="nav-item-icon" aria-hidden="true" />
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
            <Activity size={16} strokeWidth={2} className="nav-item-icon" aria-hidden="true" />
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
            <FlaskConical size={16} strokeWidth={2} className="nav-item-icon" aria-hidden="true" />
            <span>Platform Sandbox</span>
            <span className="preview-badge preview-badge-platform">Preview</span>
          </Link>

          <Link
            to="/admin"
            className="workspace-nav-item"
            onClick={() => setMobileMenuOpen(false)}
            title="Open Mission Control design demonstration"
          >
            <Radio size={16} strokeWidth={2} className="nav-item-icon" aria-hidden="true" />
            <span>Mission Control</span>
            <span className="preview-badge preview-badge-admin">Preview</span>
          </Link>
        </nav>

        {/* User Account Section at Bottom */}
        <div className="workspace-user-section">
          {signOutError && (
            <div className="workspace-signout-error" role="alert" aria-live="assertive">
              <AlertCircle size={14} strokeWidth={2} aria-hidden="true" />
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
              <LogOut size={13} strokeWidth={2} aria-hidden="true" />
              <span>{signingOut ? 'Signing out...' : 'Sign out'}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Workspace Content */}
      <main className="workspace-main-content" role="main">
        {signOutError && (
          <div className="workspace-alert-banner error" role="alert" aria-live="assertive">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={18} strokeWidth={2} aria-hidden="true" />
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
              <X size={16} aria-hidden="true" />
            </button>
          </div>
        )}

        {/* Topbar */}
        <header className="workspace-topbar">
          <div className="workspace-topbar-title-group">
            <div className="workspace-breadcrumb">
              <span className="breadcrumb-root">ORBIT</span>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-section">DEVELOPER WORKSPACE</span>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">OVERVIEW</span>
            </div>
            <h1>Workspace Overview</h1>
            <p className="workspace-topbar-subtitle">
              Authenticated developer workspace shell • Orbit V2
            </p>
          </div>
          <div className="workspace-topbar-actions">
            <div className="workspace-session-pill">
              <span className="session-dot" aria-hidden="true" />
              <span>Active Session</span>
            </div>
            <Link to="/" className="workspace-external-link" title="View public Orbit website">
              <span>Marketing Site</span>
              <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>
        </header>

        {/* Welcome Dashboard Banner */}
        <section className="workspace-welcome-banner" aria-labelledby="welcome-heading">
          <div className="welcome-banner-content">
            <div className="workspace-status-chip">
              <span className="status-dot" aria-hidden="true" />
              <span>Authenticated via Supabase Auth</span>
            </div>
            <h2 id="welcome-heading">Welcome back, {userDisplayName}</h2>
            <p>
              Your Orbit developer workspace shell is ready. Connected to account identity{' '}
              <strong>{user?.email}</strong>. This is your personal workspace where upcoming repository
              connections, branch workflows, and human-in-the-loop AI orchestration will run.
            </p>
          </div>
          <div className="welcome-banner-visual" aria-hidden="true">
            <svg viewBox="0 0 240 160" fill="none" className="welcome-orbital-svg">
              {/* Concentric precision orbital paths */}
              <circle cx="120" cy="80" r="68" stroke="var(--orbit-border, #E1E6E8)" strokeWidth="1" strokeDasharray="3 3" />
              <ellipse cx="120" cy="80" rx="98" ry="46" transform="rotate(-22 120 80)" stroke="var(--orbit-surface-soft-blue, #DFE6F2)" strokeWidth="1.5" />
              <ellipse cx="120" cy="80" rx="104" ry="48" transform="rotate(26 120 80)" stroke="var(--orbit-brand-primary, #315CE8)" strokeWidth="1.75" />
              {/* Precision coordinate ticks */}
              <line x1="120" y1="20" x2="120" y2="28" stroke="var(--orbit-border, #E1E6E8)" strokeWidth="1.5" />
              <line x1="120" y1="132" x2="120" y2="140" stroke="var(--orbit-border, #E1E6E8)" strokeWidth="1.5" />
              <line x1="28" y1="80" x2="36" y2="80" stroke="var(--orbit-border, #E1E6E8)" strokeWidth="1.5" />
              <line x1="204" y1="80" x2="212" y2="80" stroke="var(--orbit-border, #E1E6E8)" strokeWidth="1.5" />
              {/* Center core */}
              <circle cx="120" cy="80" r="14" fill="var(--orbit-surface-dark, #172536)" stroke="var(--orbit-border, #E1E6E8)" strokeWidth="2" />
              <circle cx="120" cy="80" r="5" fill="var(--orbit-brand-highlight, #D6ED83)" />
              {/* Orbital nodes & momentum tangent */}
              <circle cx="198" cy="54" r="7" fill="var(--orbit-brand-primary, #315CE8)" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="48" cy="102" r="5" fill="var(--orbit-brand-highlight, #D6ED83)" stroke="var(--orbit-surface-dark, #172536)" strokeWidth="1.5" />
            </svg>
          </div>
        </section>

        {/* Projects Section with Intentional First-Run Empty State */}
        <section className="workspace-section" aria-labelledby="projects-heading">
          <div className="workspace-section-header">
            <div>
              <h3 id="projects-heading">Connected Projects</h3>
              <p>Repositories and isolated development environments linked to your workspace.</p>
            </div>
          </div>

          <div className="workspace-empty-card" role="region" aria-label="Projects empty state">
            <div className="workspace-empty-illustration" aria-hidden="true">
              <svg viewBox="0 0 140 100" fill="none" className="empty-schematic-svg">
                <circle cx="70" cy="50" r="42" stroke="var(--orbit-border, #E1E6E8)" strokeWidth="1" strokeDasharray="3 3" />
                <rect x="42" y="26" width="56" height="48" rx="8" fill="var(--orbit-surface-soft-blue, #DFE6F2)" stroke="var(--orbit-border, #E1E6E8)" strokeWidth="1" />
                {/* Schematic Git branch inside card */}
                <line x1="56" y1="60" x2="56" y2="40" stroke="var(--orbit-brand-primary, #315CE8)" strokeWidth="2" strokeLinecap="round" />
                <path d="M56 50 C62 50, 68 46, 76 42" stroke="var(--orbit-brand-primary, #315CE8)" strokeWidth="2" strokeLinecap="round" />
                <circle cx="56" cy="60" r="3.5" fill="var(--orbit-surface-dark, #172536)" />
                <circle cx="56" cy="38" r="3.5" fill="var(--orbit-brand-primary, #315CE8)" />
                <circle cx="76" cy="42" r="3.5" fill="var(--orbit-brand-highlight, #D6ED83)" stroke="var(--orbit-surface-dark, #172536)" strokeWidth="1" />
              </svg>
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
              <div className="guide-card-top">
                <span className="guide-step-tag guide-tag-live">Step 1 • Live</span>
                <div className="guide-icon-wrapper guide-icon-live" aria-hidden="true">
                  <ShieldCheck size={18} strokeWidth={2} />
                </div>
              </div>
              <h4>Authentication Active</h4>
              <p>
                Your account is verified and securely authenticated with Supabase Auth. Session state and password
                recovery flows are fully operational.
              </p>
            </div>

            <div className="workspace-guide-card">
              <div className="guide-card-top">
                <span className="guide-step-tag guide-tag-preview">Step 2 • Preview</span>
                <div className="guide-icon-wrapper guide-icon-preview" aria-hidden="true">
                  <FlaskConical size={18} strokeWidth={2} />
                </div>
              </div>
              <h4>Explore Design Demonstrations</h4>
              <p>
                Preview the upcoming developer workflow in the interactive Platform Sandbox and Mission Control
                demonstrations before live repository linking opens.
              </p>
              <div className="guide-card-links">
                <Link to="/platform" className="guide-link">
                  <span>Platform Sandbox</span>
                  <ArrowUpRight size={12} strokeWidth={2} aria-hidden="true" />
                </Link>
                <span className="guide-link-dot">•</span>
                <Link to="/admin" className="guide-link">
                  <span>Mission Control</span>
                  <ArrowUpRight size={12} strokeWidth={2} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="workspace-guide-card">
              <div className="guide-card-top">
                <span className="guide-step-tag guide-tag-upcoming">Step 3 • In Development</span>
                <div className="guide-icon-wrapper guide-icon-upcoming" aria-hidden="true">
                  <GitBranch size={18} strokeWidth={2} />
                </div>
              </div>
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
          <div className="notice-icon-wrapper" aria-hidden="true">
            <Shield size={18} strokeWidth={2} />
          </div>
          <div>
            <strong>Approval-First Architecture:</strong>
            <p>
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
