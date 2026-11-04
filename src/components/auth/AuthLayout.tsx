import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

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
          <div className="auth-preview-badge">
            <span className="live-dot" />
            <ShieldCheck size={12} strokeWidth={2} style={{ display: 'inline', marginRight: '2px' }} aria-hidden="true" />
            <span>SECURE AUTH</span>
          </div>

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
          <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Privacy Notice: Orbit uses official Supabase Auth. Session state is managed via secure browser storage.'); }}>
            Privacy Policy
          </a>
          <span>•</span>
          <a href="#terms" onClick={(e) => { e.preventDefault(); alert('Terms of Service: Orbit V2 developer workspace edition.'); }}>
            Terms of Service
          </a>
          <span>•</span>
          <a href="#security" onClick={(e) => { e.preventDefault(); alert('Security: Row Level Security (RLS) and cryptographic session security active.'); }}>
            Security Architecture
          </a>
        </div>
        <div>
          © {new Date().getFullYear()} Orbit Studio • Precision & Momentum
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;
