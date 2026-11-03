import React, { useState } from 'react';
import { orbitStore } from '../../services/orbitStore';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenQuickStart: () => void;
  onOpenPlatformDemo: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAdmin,
  onOpenQuickStart,
  onOpenPlatformDemo,
}) => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.toLowerCase().trim();
    if (!orbitStore.validateEmail(cleanEmail)) {
      setFeedback({
        type: 'error',
        message: 'Please enter a valid work email address (e.g. name@company.com).',
      });
      return;
    }

    setSubmitting(true);
    setFeedback(null);
    try {
      orbitStore.subscribeNewsletter(cleanEmail, 'landing_footer');
      setFeedback({
        type: 'success',
        message: `✓ Subscribed successfully! A preview confirmation is recorded for ${cleanEmail}.`,
      });
      setEmail('');
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err instanceof Error ? err.message : 'Could not subscribe. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="site-footer" id="footer">
      {/* Newsletter Subscription Bar */}
      <div className="shell">
        <div className="footer-newsletter-box">
          <div className="newsletter-info">
            <h4>Stay ahead with Orbit engineering updates</h4>
            <p>Get bi-weekly architecture deep-dives, agent orchestration templates, and cohort release announcements.</p>
          </div>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (feedback) setFeedback(null);
              }}
              placeholder="Enter your work email"
              required
              aria-label="Work email for newsletter"
            />
            <button type="submit" disabled={submitting}>
              {submitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          {feedback && (
            <div
              style={{
                width: '100%',
                fontSize: '13px',
                marginTop: '10px',
                color: feedback.type === 'success' ? '#10b981' : '#ef4444',
                fontWeight: 500,
                lineHeight: 1.5,
              }}
            >
              {feedback.message}
            </div>
          )}
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="shell footer-columns-grid">
        <div className="footer-col brand-col">
          <a className="brand footer-brand" href="#top" aria-label="Orbit home">
            <span className="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 36 36" fill="none" width="32" height="32" style={{ maxWidth: '32px', maxHeight: '32px' }}>
                <circle cx="18" cy="18" r="12.5" stroke="currentColor" strokeWidth="1.7" />
                <ellipse cx="18" cy="18" rx="16" ry="6.3" transform="rotate(-34 18 18)" stroke="currentColor" strokeWidth="1.7" />
                <circle cx="29.4" cy="8.2" r="2.6" fill="currentColor" />
              </svg>
            </span>
            <span>orbit</span>
          </a>
          <p style={{ marginTop: '12px', fontSize: '13px', color: '#94a3b8', lineHeight: 1.6 }}>
            The agent-first development workspace. Plan, execute, and verify software systems with autonomous AI orchestrations.
          </p>
        </div>

        <div className="footer-col">
          <h5>Workspace</h5>
          <nav aria-label="Workspace links">
            <button
              type="button"
              onClick={onOpenPlatformDemo}
              className="footer-nav-btn"
            >
              Platform Sandbox ↗
            </button>
            <a href="#workflow">How it works</a>
            <a href="#for-builders">Persona architecture</a>
            <button
              type="button"
              onClick={onOpenQuickStart}
              className="footer-nav-btn"
              style={{ color: '#10b981' }}
            >
              1-Click Launchers ⚡
            </button>
          </nav>
        </div>

        <div className="footer-col">
          <h5>Architecture</h5>
          <nav aria-label="Architecture links">
            <a href="#workflow">Outcome Synthesis</a>
            <a href="#workflow">Branch Isolation</a>
            <a href="#workflow">Headless Verification</a>
            <a href="#for-builders">Full-Stack Sync</a>
          </nav>
        </div>

        <div className="footer-col developer-col">
          <h5>Developer & Admin Tools</h5>
          <nav aria-label="Developer links">
            <button
              type="button"
              onClick={onOpenAdmin}
              className="footer-admin-link"
              id="btn-footer-admin-login"
            >
              <span>◈</span> Mission Control
            </button>
            <p style={{ margin: '6px 0 0', fontSize: '11px', color: '#64748b', lineHeight: 1.4 }}>
              Internal access for waitlist review, approval dispatches, and preview database controls.
            </p>
            <button
              type="button"
              onClick={onOpenQuickStart}
              style={{
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                fontSize: '11px',
                padding: '4px 0',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              Download start.bat / start.sh
            </button>
          </nav>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="shell footer-bottom">
        <span>© 2026 Orbit Studio • All Rights Reserved</span>
        <span>
          Built for what’s next <i>✳</i>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
