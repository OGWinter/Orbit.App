import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  onOpenWaitlist: () => void;
  onOpenAdmin: () => void;
  onOpenPlatformDemo: () => void;
  onOpenQuickStart: () => void;
  onOpenSignIn?: () => void;
  isAdminView?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenWaitlist,
  onOpenAdmin,
  onOpenPlatformDemo,
  onOpenQuickStart,
  onOpenSignIn,
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

  const userDisplayName =
    user?.user_metadata?.full_name || (user?.email ? user.email.split('@')[0] : 'Developer');

  return (
    <header className="site-header">
      <div className="header-inner shell">
        {/* Brand Logo */}
        <a href="/" className="brand" onClick={handleBrandClick} aria-label="Orbit home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 36 36" fill="none" width="32" height="32" style={{ maxWidth: '32px', maxHeight: '32px' }}>
              <circle cx="18" cy="18" r="12.5" stroke="currentColor" strokeWidth="1.7" />
              <ellipse cx="18" cy="18" rx="16" ry="6.3" transform="rotate(-34 18 18)" stroke="currentColor" strokeWidth="1.7" />
              <circle cx="29.4" cy="8.2" r="2.6" fill="currentColor" />
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
                Join Waitlist <span aria-hidden="true">↗</span>
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
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                  color: 'inherit',
                  padding: 0,
                  fontSize: '13px',
                }}
              >
                Platform Sandbox ↗
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
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                  color: 'inherit',
                  padding: 0,
                  fontSize: '13px',
                }}
              >
                Mission Control ◈
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
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  fontSize: '13px',
                }}
              >
                Start on Win / Mac ⚡
              </button>

              {/* Authentication Status in Header */}
              {user ? (
                <>
                  <span
                    className="nav-user-badge"
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--ink, #16171d)',
                      background: 'rgba(99, 102, 241, 0.12)',
                      border: '1px solid rgba(99, 102, 241, 0.25)',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      maxWidth: '180px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                    title={user.email}
                  >
                    ● {userDisplayName}
                  </span>
                  <button
                    type="button"
                    className="nav-link btn-sign-out"
                    onClick={handleSignOut}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: 600,
                      color: '#ef4444',
                      padding: 0,
                      fontSize: '13px',
                    }}
                  >
                    Sign out
                  </button>
                </>
              ) : (
                !loading && (
                  <button
                    type="button"
                    className="nav-link btn-sign-in"
                    onClick={handleSignInClick}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: 600,
                      color: 'inherit',
                      padding: 0,
                      fontSize: '13px',
                    }}
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
                Get started <span aria-hidden="true">↗</span>
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
