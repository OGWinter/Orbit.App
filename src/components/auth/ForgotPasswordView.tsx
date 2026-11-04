import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { useAuth } from '../../contexts/AuthContext';

export const ForgotPasswordView: React.FC = () => {
  const { resetPasswordForEmail, isConfigured, configError } = useAuth();

  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    if (!isConfigured) {
      setServerError(configError || 'Supabase authentication is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in your .env file.');
      return;
    }

    setSubmitting(true);
    try {
      const { error: resetError } = await resetPasswordForEmail(email.trim());

      if (resetError) {
        setServerError(resetError.message || 'Could not send recovery email. Please check the address and try again.');
      } else {
        setSubmittedEmail(email.trim());
        setIsSubmitted(true);
      }
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'An unexpected error occurred during password recovery.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setEmail('');
    setError(null);
    setServerError(null);
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
            Enter the work email associated with your Orbit account and we’ll send you password recovery instructions.
          </p>
        </div>

        {!isConfigured && (
          <div className="auth-notice-box error" role="alert" style={{ marginBottom: '20px' }}>
            <span>⚠</span>
            <div>
              <strong>Configuration Required:</strong>
              <p style={{ margin: '4px 0 0', fontSize: '12px', lineHeight: 1.5 }}>
                {configError || 'Supabase environment variables are missing. Configure VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to enable authentication.'}
              </p>
            </div>
          </div>
        )}

        {serverError && (
          <div className="auth-notice-box error" role="alert" style={{ marginBottom: '20px' }}>
            <span>⚠</span>
            <div>
              <strong>Recovery Error:</strong>
              <p style={{ margin: '4px 0 0', fontSize: '12px', lineHeight: 1.5 }}>
                {serverError}
              </p>
            </div>
          </div>
        )}

        {isSubmitted ? (
          <div>
            <div className="auth-notice-box success" role="status">
              <span style={{ fontSize: '18px' }}>✓</span>
              <div>
                <strong>Recovery Email Sent</strong>
                <p style={{ margin: '6px 0 0', fontSize: '13px', lineHeight: 1.5 }}>
                  If an account exists for <strong style={{ color: '#f8fafc' }}>{submittedEmail}</strong>, an email with password recovery instructions has been dispatched via Supabase Auth.
                </p>
                <p style={{ margin: '8px 0 0', fontSize: '12px', opacity: 0.9 }}>
                  Please check your inbox (and spam folder) and click the link to create a new password.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '24px' }}>
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
                    if (serverError) setServerError(null);
                  }}
                  placeholder="name@company.com"
                  className={`auth-input ${error ? 'has-error' : ''}`}
                  autoComplete="email"
                  required
                  aria-invalid={!!error}
                  aria-describedby={error ? 'forgot-email-error' : undefined}
                  disabled={submitting}
                />
              </div>
              {error && (
                <span id="forgot-email-error" className="auth-field-error" role="alert">
                  ⚠ {error}
                </span>
              )}
            </div>

            <button type="submit" className="auth-submit-btn" disabled={submitting}>
              {submitting ? 'Sending instructions...' : 'Send Reset Instructions'} <span>→</span>
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
