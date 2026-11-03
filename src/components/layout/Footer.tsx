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
          <p style={{ marginTop: '12px', fontSize: '12px', color: 'var(--muted)', lineHeight: 1.6, maxWidth: '280px' }}>
            An agent-first development workspace that helps you turn ambitious ideas into working software.
          </p>
        </div>

        <div className="footer-main" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', borderBottom: '1px solid #dfe0e5', paddingBottom: '24px' }}>
          <div>
            <p style={{ margin: 0, color: '#83858e', fontSize: '11px' }}>
              Autonomous AI orchestration with human-in-the-loop verification.
            </p>
          </div>
          <nav style={{ display: 'flex', gap: '24px', fontSize: '12px', fontWeight: 600 }}>
            <button
              type="button"
              onClick={onOpenPlatformDemo}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'inherit', font: 'inherit' }}
            >
              Platform Sandbox ↗
            </button>
            <a href="#workflow">How it works</a>
            <a href="#for-builders">For builders</a>
            <button
              type="button"
              onClick={onOpenQuickStart}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'inherit', font: 'inherit' }}
            >
              Quick Start (Win / Mac)
            </button>
            <button
              type="button"
              onClick={onOpenAdmin}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'inherit', font: 'inherit' }}
            >
              Mission Control ◈
            </button>
          </nav>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="shell footer-bottom">
        <div>
          © {new Date().getFullYear()} Orbit. Built with React & TypeScript. All rights reserved.
        </div>
        <div>
          <span>Phase 1 Design Preview</span>
          <i style={{ fontStyle: 'normal', color: 'var(--violet)', marginLeft: '6px' }}>● Online</i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
