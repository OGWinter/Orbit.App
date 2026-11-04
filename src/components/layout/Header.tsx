import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight, Radio, Zap, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  onOpenWaitlist: () => void;
  onOpenAdmin: () => void;
  onOpenPlatformDemo: () => void;
  onOpenQuickStart: () => void;
  onOpenSignIn?: () => void;
  onOpenWorkspace?: () => void;
  isAdminView?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenWaitlist,
  onOpenAdmin,
  onOpenPlatformDemo,
  onOpenQuickStart,
  onOpenSignIn,
  onOpenWorkspace,
  isAdminView = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut, loading } = useAuth();

  const handleBrandClick = (e: React.MouseEvent) => {
    if (isAdminView) {
      e.preventDefault();
      window.history.pushState(null, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const closeMenu = () => setMobileMenuOpen(false);

  const handleSignOut = async () => {
    closeMenu();
    await signOut();
  };

  const handleSignInClick = () => {
    closeMenu();
    if (onOpenSignIn) onOpenSignIn();
    else {
      window.history.pushState(null, '', '/login');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleWorkspaceClick = () => {
    closeMenu();
    if (onOpenWorkspace) onOpenWorkspace();
    else {
      window.history.pushState(null, '', '/workspace');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const userDisplayName =
    user?.user_metadata?.full_name || (user?.email ? user.email.split('@')[0] : 'Developer');

  return (
    <header className="site-header">
      <div className="header-inner shell">
        {/* Brand Logo */}
        <a href="/" className="brand" onClick={handleBrandClick} aria-label="Orbit home">
          <span className="brand-mark" aria-hidden="true" style={{ color: 'var(--orbit-brand-primary, #315CE8)' }}>
            <svg viewBox="0 0 36 36" fill="none" width="30" height="30" style={{ maxWidth: '30px', maxHeight: '30px' }}>
              <circle cx="18" cy="18" r="12.5" stroke="currentColor" strokeWidth="1.7" />
              <ellipse cx="18" cy="18" rx="16" ry="6.3" transform="rotate(-34 18 18)" stroke="currentColor" strokeWidth="1.7" />
              <circle cx="29.4" cy="8.2" r="2.6" fill="var(--orbit-brand-highlight, #D6ED83)" />
            </svg>
          </span>
          <span>orbit</span>
        </a>

        {/* Mobile Hamburger Menu Toggle */}
        <button
          className="menu-toggle"
          type="button"
          aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span />
          <span />
        </button>

        {/* Navigation Links */}
        <nav className={`main-navigation ${mobileMenuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          {isAdminView ? (
            <>
              <a
                href="/"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  closeMenu();
                  window.history.pushState(null, '', '/');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
              >
                ← Back to Website
              </a>
              <button
                type="button"
                className="nav-cta btn-open-waitlist"
                onClick={() => {
                  closeMenu();
                  onOpenWaitlist();
                }}
              >
                <span>Join Waitlist</span>
                <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="nav-link"
                onClick={() => {
                  closeMenu();
                  onOpenPlatformDemo();
                }}
              >
                <span>Platform Sandbox</span>
                <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" />
              </button>

              <a href="#workflow" onClick={closeMenu}>
                How it works
              </a>

              <a href="#for-builders" onClick={closeMenu}>
                For builders
              </a>

              <button
                type="button"
                className="nav-link"
                onClick={() => {
                  closeMenu();
                  onOpenAdmin();
                }}
              >
                <span>Mission Control</span>
                <Radio size={13} strokeWidth={2} aria-hidden="true" />
              </button>

              <button
                type="button"
                className="nav-link"
                onClick={() => {
                  closeMenu();
                  onOpenQuickStart();
                }}
                style={{
                  color: '#059669',
                }}
              >
                <span>Start on Win / Mac</span>
                <Zap size={13} strokeWidth={2} aria-hidden="true" />
              </button>

              {/* Authentication Status in Header */}
              {user ? (
                <>
                  <button
                    type="button"
                    className="nav-link btn-open-workspace"
                    onClick={handleWorkspaceClick}
                  >
                    <span>Open Workspace</span>
                    <ArrowRight size={13} strokeWidth={2} aria-hidden="true" />
                  </button>
                  <span
                    className="nav-user-badge"
                    title={user.email}
                  >
                    ● {userDisplayName}
                  </span>
                  <button
                    type="button"
                    className="nav-link btn-sign-out"
                    onClick={handleSignOut}
                  >
                    <LogOut size={13} strokeWidth={2} aria-hidden="true" />
                    <span>Sign out</span>
                  </button>
                </>
              ) : (
                !loading && (
                  <button
                    type="button"
                    className="nav-link btn-sign-in"
                    onClick={handleSignInClick}
                  >
                    Sign in
                  </button>
                )
              )}

              <button
                type="button"
                className="nav-cta btn-open-waitlist"
                onClick={() => {
                  closeMenu();
                  onOpenWaitlist();
                }}
              >
                <span>Get started</span>
                <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
