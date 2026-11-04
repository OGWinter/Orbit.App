import React from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  headerRightAction?: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, headerRightAction }) => {
  return (
    <div className="auth-page-wrapper">
      {/* Top Header */}
      <header className="auth-header" role="banner">
        <Link to="/" className="auth-brand-link" aria-label="Orbit home">
          <span className="brand-mark" aria-hidden="true" style={{ color: 'var(--orbit-brand-primary, #315CE8)', display: 'grid', placeItems: 'center' }}>
            <svg viewBox="0 0 36 36" fill="none" width="28" height="28" style={{ maxWidth: '28px', maxHeight: '28px' }}>
              <circle cx="18" cy="18" r="12.5" stroke="currentColor" strokeWidth="1.7" />
              <ellipse cx="18" cy="18" rx="16" ry="6.3" transform="rotate(-34 18 18)" stroke="currentColor" strokeWidth="1.7" />
              <circle cx="29.4" cy="8.2" r="2.6" fill="var(--orbit-brand-highlight, #D6ED83)" />
            </svg>
          </span>
          <span>orbit</span>
        </Link>

        <div className="auth-header-actions">
          {headerRightAction || (
            <Link to="/" className="auth-nav-link">
              ← Back to Website
            </Link>
          )}
        </div>
      </header>

      {/* Center Auth Stage */}
      <main className="auth-content-container" role="main">
        {children}
      </main>

      {/* Bottom Footer */}
      <footer className="auth-footer" role="contentinfo">
        <div className="auth-footer-links">
          <span>Official Supabase Auth Integration</span>
          <span>•</span>
          <Link to="/">Platform Overview</Link>
          <span>•</span>
          <Link to="/workspace">Workspace</Link>
        </div>
        <div style={{ marginTop: '6px', fontSize: '11px', color: 'var(--orbit-text-secondary, #647386)' }}>
          © {new Date().getFullYear()} Orbit Studio • Precision & Momentum
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;
