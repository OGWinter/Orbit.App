import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { orbitStore } from '../../services/orbitStore';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenQuickStart: () => void;
  onOpenPlatformDemo: () => void;
  onOpenSignIn?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAdmin,
  onOpenQuickStart,
  onOpenPlatformDemo,
  onOpenSignIn,
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
            <span className="brand-mark" aria-hidden="true" style={{ color: 'var(--orbit-brand-primary, #315CE8)' }}>
              <svg viewBox="0 0 36 36" fill="none" width="30" height="30" style={{ maxWidth: '30px', maxHeight: '30px' }}>
                <circle cx="18" cy="18" r="12.5" stroke="currentColor" strokeWidth="1.7" />
                <ellipse cx="18" cy="18" rx="16" ry="6.3" transform="rotate(-34 18 18)" stroke="currentColor" strokeWidth="1.7" />
                <circle cx="29.4" cy="8.2" r="2.6" fill="var(--orbit-brand-highlight, #D6ED83)" />
              </svg>
            </span>
            <span>orbit</span>
          </a>
          <p style={{ marginTop: '12px', color: 'var(--muted)', fontSize: '13px', lineHeight: 1.6, maxWidth: '280px' }}>
            The approval-first AI workspace for engineering teams. Propose plans, isolate diffs, and sign off before code merges.
          </p>
        </div>

        <div className="footer-col">
          <h5>Product</h5>
          <ul>
            <li>
              <a href="#workflow">How It Works</a>
            </li>
            <li>
              <button type="button" onClick={onOpenPlatformDemo}>
                <span>Platform Sandbox</span>
                <ArrowUpRight size={11} strokeWidth={2} style={{ display: 'inline', marginLeft: '4px' }} aria-hidden="true" />
              </button>
            </li>
            <li>
              <button type="button" onClick={onOpenQuickStart}>
                <span>Desktop QuickStart</span>
              </button>
            </li>
            <li>
              <a href="#for-builders">For Builders</a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Demonstrations</h5>
          <ul>
            <li>
              <button type="button" onClick={onOpenAdmin}>
                <span>Mission Control</span>
                <ArrowUpRight size={11} strokeWidth={2} style={{ display: 'inline', marginLeft: '4px' }} aria-hidden="true" />
              </button>
            </li>
            <li>
              {onOpenSignIn ? (
                <button type="button" onClick={onOpenSignIn}>
                  <span>User Login / Auth</span>
                </button>
              ) : (
                <a href="/login">User Login / Auth</a>
              )}
            </li>
            <li>
              <a href="/workspace">Developer Workspace</a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Company</h5>
          <ul>
            <li>
              <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Privacy Notice: Orbit is currently in client-side preview mode.'); }}>
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#terms" onClick={(e) => { e.preventDefault(); alert('Terms of Service: Preview edition of Orbit developer platform.'); }}>
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#security" onClick={(e) => { e.preventDefault(); alert('Security: Full RBAC and cryptographic audit trails active.'); }}>
                Security Architecture
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Sub-Footer */}
      <div className="shell footer-bottom">
        <div>
          © {new Date().getFullYear()} Orbit Studio • Precision & Momentum
        </div>
        <div>
          Designed for developers who stay in control
        </div>
      </div>
    </footer>
  );
};

export default Footer;
