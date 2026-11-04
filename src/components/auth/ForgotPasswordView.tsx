import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';

export const ForgotPasswordView: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const validate = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setError('Email address is required');
      return false;
    }
    if (!emailPattern.test(email.trim())) {
      setError('Please enter a valid email address (e.g. name@company.com)');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmittedEmail(email.trim());
    setIsSubmitted(true);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setEmail('');
    setError(null);
  };

  return (
    <AuthLayout
      headerRightAction={
        <Link to="/login" className="auth-nav-link">
          ← Back to Sign In
        </Link>
      }
    >
      <div className="auth-card-dark">
        <div className="auth-card-header">
          <h1>Reset password</h1>
          <p>
            Enter the work email associated with your Orbit account and we’ll prepare recovery steps.
          </p>
        </div>

        {isSubmitted ? (
          <div>
            <div className="auth-notice-box success" role="status">
              <span style={{ fontSize: '18px' }}>✓</span>
              <div>
                <strong>Recovery Request Recorded (Design Preview)</strong>
                <p style={{ margin: '6px 0 0', fontSize: '13px', lineHeight: 1.5 }}>
                  In a production release, a secure token would be dispatched to{' '}
                  <strong style={{ color: '#f8fafc' }}>{submittedEmail}</strong>.
                </p>
                <p style={{ margin: '8px 0 0', fontSize: '12px', opacity: 0.85 }}>
                  <em>
                    Notice: This interface is a design preview. No actual recovery email was sent to your inbox.
                  </em>
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '24px' }}>
              <Link to={`/reset-password?email=${encodeURIComponent(submittedEmail)}`} className="auth-submit-btn" style={{ textDecoration: 'none' }}>
                Preview Reset Password Flow <span>→</span>
              </Link>
              <button
                type="button"
                onClick={handleResetForm}
                className="auth-github-btn"
              >
                Send another request
              </button>
            </div>

            <div className="auth-footer-prompt">
              Remember your password?
              <Link to="/login">Back to Sign In</Link>
            </div>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="auth-form-group">
              <label htmlFor="forgot-email" className="auth-form-label">
                Work Email Address
              </label>
              <div className="auth-input-wrapper">
                <input
                  id="forgot-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="name@company.com"
                  className={`auth-input ${error ? 'has-error' : ''}`}
                  autoComplete="email"
                  required
                  aria-invalid={!!error}
                  aria-describedby={error ? 'forgot-email-error' : undefined}
                />
              </div>
              {error && (
                <span id="forgot-email-error" className="auth-field-error" role="alert">
                  ⚠ {error}
                </span>
              )}
            </div>

            <button type="submit" className="auth-submit-btn">
              Send Reset Instructions <span>→</span>
            </button>

            <div className="auth-footer-prompt">
              Remembered your credentials?
              <Link to="/login">Back to Sign In</Link>
            </div>
          </form>
        )}
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordView;

