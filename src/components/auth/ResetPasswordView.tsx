import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import AuthLayout from './AuthLayout';

export const ResetPasswordView: React.FC = () => {
  const [searchParams] = useSearchParams();
  const isLinkExpired = searchParams.get('expired') === 'true' || searchParams.get('token') === 'invalid';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ newPassword?: string; confirmPassword?: string }>({});
  const [isSuccess, setIsSuccess] = useState(false);

  // Password strength calculation
  const strengthDetails = useMemo(() => {
    const hasMinLength = newPassword.length >= 8;
    const hasUpperLower = /[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);
    const hasSpecial = /[^A-Za-z0-9]/.test(newPassword);

    const score = [hasMinLength, hasUpperLower, hasNumber, hasSpecial].filter(Boolean).length;

    let level: 'none' | 'weak' | 'medium' | 'good' | 'strong' = 'none';
    if (newPassword.length > 0) {
      if (score <= 1) level = 'weak';
      else if (score === 2) level = 'medium';
      else if (score === 3) level = 'good';
      else level = 'strong';
    }

    return { score, level, hasMinLength, hasUpperLower, hasNumber, hasSpecial };
  }, [newPassword]);

  const validate = () => {
    const errs: typeof errors = {};

    if (!newPassword) {
      errs.newPassword = 'New password is required';
    } else if (newPassword.length < 8) {
      errs.newPassword = 'Password must be at least 8 characters long';
    }

    if (!confirmPassword) {
      errs.confirmPassword = 'Confirm your new password';
    } else if (newPassword !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSuccess(true);
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
        {isLinkExpired ? (
          <div>
            <div className="auth-card-header">
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.28)',
                  padding: '3px 9px',
                  borderRadius: '999px',
                  color: '#fca5a5',
                  fontSize: '11px',
                  fontWeight: 600,
                  marginBottom: '10px',
                }}
              >
                <span>⚠</span> EXPIRED LINK PREVIEW
              </div>
              <h1 style={{ color: '#f87171' }}>Reset link expired</h1>
              <p>
                This password recovery link is invalid or has expired. For your security, reset links are only active for 60 minutes.
              </p>
            </div>

            <div className="auth-notice-box error" role="alert">
              <span>⚠</span>
              <div>
                <strong>Invalid Link Demonstration:</strong>
                <p style={{ margin: '4px 0 0', fontSize: '12px' }}>
                  This screen is rendered because the link parameter was flagged as expired (<code style={{ color: '#fca5a5', background: 'rgba(0,0,0,0.2)', padding: '1px 4px', borderRadius: '4px' }}>?expired=true</code> or <code style={{ color: '#fca5a5', background: 'rgba(0,0,0,0.2)', padding: '1px 4px', borderRadius: '4px' }}>?token=invalid</code>).
                </p>
              </div>
            </div>

            <div style={{ marginTop: '24px' }}>
              <Link to="/forgot-password" className="auth-submit-btn" style={{ textDecoration: 'none' }}>
                Request New Reset Link <span>→</span>
              </Link>
            </div>

            <div className="auth-footer-prompt">
              <Link to="/login">Back to Sign In</Link>
            </div>
          </div>
        ) : isSuccess ? (
          <div>
            <div className="auth-card-header">
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.28)',
                  padding: '3px 9px',
                  borderRadius: '999px',
                  color: '#6ee7b7',
                  fontSize: '11px',
                  fontWeight: 600,
                  marginBottom: '10px',
                }}
              >
                <span>✓</span> DESIGN PREVIEW
              </div>
              <h1>Password updated</h1>
              <p>Your password reset form validation has succeeded in preview mode.</p>
            </div>

            <div className="auth-notice-box success" role="status">
              <span style={{ fontSize: '18px' }}>✓</span>
              <div>
                <strong>Design Preview Notice:</strong>
                <p style={{ margin: '4px 0 0', fontSize: '12px', lineHeight: 1.5 }}>
                  Form submission validated locally with 0 errors. Notice: This is a design preview — no real account or database credentials were changed. Real token verification and credential hashing will be wired in the backend phase.
                </p>
              </div>
            </div>

            <div style={{ marginTop: '24px' }}>
              <Link to="/login" className="auth-submit-btn" style={{ textDecoration: 'none' }}>
                Proceed to Sign In <span>→</span>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="auth-card-header">
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(117, 100, 245, 0.12)',
                  border: '1px solid rgba(117, 100, 245, 0.28)',
                  padding: '3px 9px',
                  borderRadius: '999px',
                  color: '#c4b5fd',
                  fontSize: '11px',
                  fontWeight: 600,
                  marginBottom: '10px',
                }}
              >
                <span className="live-dot" /> DESIGN PREVIEW
              </div>
              <h1>Choose a new password</h1>
              <p>Set a strong password to safeguard your repositories and workspace. (UI Preview — No live account modified)</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              {/* New Password */}
              <div className="auth-form-group">
                <label htmlFor="reset-new-password" className="auth-form-label">
                  New Password
                </label>
                <div className="auth-input-wrapper">
                  <input
                    id="reset-new-password"
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      if (errors.newPassword) setErrors((prev) => ({ ...prev, newPassword: undefined }));
                    }}
                    placeholder="Enter at least 8 characters"
                    className={`auth-input has-icon-right ${errors.newPassword ? 'has-error' : ''}`}
                    autoComplete="new-password"
                    required
                    aria-invalid={!!errors.newPassword}
                    aria-describedby={errors.newPassword ? 'reset-pass-error' : undefined}
                  />
                  <button
                    type="button"
                    className="auth-eye-btn"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                  >
                    {showNewPassword ? '👁' : '👁‍🗨'}
                  </button>
                </div>
                {errors.newPassword && (
                  <span id="reset-pass-error" className="auth-field-error" role="alert">
                    ⚠ {errors.newPassword}
                  </span>
                )}

                {/* Strength Meter */}
                {newPassword.length > 0 && (
                  <div className="auth-strength-meter" aria-live="polite">
                    <div className="strength-bar-track">
                      <div
                        className={`strength-bar-segment ${
                          strengthDetails.score >= 1 ? `active-${strengthDetails.level}` : ''
                        }`}
                      />
                      <div
                        className={`strength-bar-segment ${
                          strengthDetails.score >= 2 ? `active-${strengthDetails.level}` : ''
                        }`}
                      />
                      <div
                        className={`strength-bar-segment ${
                          strengthDetails.score >= 3 ? `active-${strengthDetails.level}` : ''
                        }`}
                      />
                      <div
                        className={`strength-bar-segment ${
                          strengthDetails.score >= 4 ? `active-${strengthDetails.level}` : ''
                        }`}
                      />
                    </div>
                    <div className="strength-label-row">
                      <span>Password strength:</span>
                      <span className={`strength-badge ${strengthDetails.level}`}>
                        {strengthDetails.level}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="auth-form-group">
                <label htmlFor="reset-confirm-password" className="auth-form-label">
                  Confirm New Password
                </label>
                <div className="auth-input-wrapper">
                  <input
                    id="reset-confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword) {
                        setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                      }
                      if (newPassword && e.target.value !== newPassword) {
                        setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
                      }
                    }}
                    placeholder="Re-enter your new password"
                    className={`auth-input has-icon-right ${errors.confirmPassword ? 'has-error' : ''}`}
                    autoComplete="new-password"
                    required
                    aria-invalid={!!errors.confirmPassword}
                    aria-describedby={errors.confirmPassword ? 'reset-confirm-error' : undefined}
                  />
                  <button
                    type="button"
                    className="auth-eye-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  >
                    {showConfirmPassword ? '👁' : '👁‍🗨'}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span id="reset-confirm-error" className="auth-field-error" role="alert">
                    ⚠ {errors.confirmPassword}
                  </span>
                )}
              </div>

              <button type="submit" className="auth-submit-btn">
                Update Password <span>→</span>
              </button>
            </form>

            <div className="auth-footer-prompt">
              Remembered your existing password?
              <Link to="/login">Sign In</Link>
            </div>
          </div>
        )}
      </div>
    </AuthLayout>
  );
};

export default ResetPasswordView;

