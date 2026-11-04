import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import AuthLayout from './AuthLayout';

export const InviteAcceptanceView: React.FC = () => {
  const [searchParams] = useSearchParams();
  const invitedEmail = searchParams.get('email') || 'developer@skyline.tech';
  const teamName = searchParams.get('team') || 'Skyline Engineering';
  const initialExpired = searchParams.get('expired') === 'true' || searchParams.get('status') === 'invalid';

  const [isInviteExpired, setIsInviteExpired] = useState(initialExpired);
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{
    fullName?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [isAccepted, setIsAccepted] = useState(false);

  // Password strength calculation
  const strengthDetails = useMemo(() => {
    const hasMinLength = password.length >= 8;
    const hasUpperLower = /[a-z]/.test(password) && /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    const score = [hasMinLength, hasUpperLower, hasNumber, hasSpecial].filter(Boolean).length;

    let level: 'none' | 'weak' | 'medium' | 'good' | 'strong' = 'none';
    if (password.length > 0) {
      if (score <= 1) level = 'weak';
      else if (score === 2) level = 'medium';
      else if (score === 3) level = 'good';
      else level = 'strong';
    }

    return { score, level, hasMinLength, hasUpperLower, hasNumber, hasSpecial };
  }, [password]);

  const validate = () => {
    const errs: typeof errors = {};

    if (!fullName.trim()) {
      errs.fullName = 'Full name is required';
    }

    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 8) {
      errs.password = 'Password must be at least 8 characters long';
    }

    if (!confirmPassword) {
      errs.confirmPassword = 'Confirm your password';
    } else if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsAccepted(true);
  };

  return (
    <AuthLayout
      headerRightAction={
        <Link to="/login" className="auth-nav-link">
          Sign In →
        </Link>
      }
    >
      <div className="auth-card-dark" style={{ maxWidth: '480px' }}>
        {/* Toggle between Active and Expired Invite States */}
        <div className="auth-state-toggle-banner">
          <span>Design State Preview:</span>
          <button
            type="button"
            className="auth-toggle-btn"
            onClick={() => {
              setIsInviteExpired(!isInviteExpired);
              setIsAccepted(false);
            }}
          >
            {isInviteExpired ? 'Switch to Valid Invite State' : 'Switch to Expired Invite State'}
          </button>
        </div>

        {isInviteExpired ? (
          <div>
            <div className="auth-card-header">
              <h1 style={{ color: '#f87171' }}>Invitation expired</h1>
              <p>
                This workspace invitation link is invalid or has already been redeemed.
              </p>
            </div>

            <div className="auth-notice-box error" role="alert">
              <span>⚠</span>
              <div>
                <strong>Expired Link Demonstration:</strong>
                <p style={{ margin: '4px 0 0', fontSize: '12px' }}>
                  Please contact your workspace administrator at <strong>{teamName}</strong> to issue a fresh invitation.
                </p>
              </div>
            </div>

            <div style={{ marginTop: '24px' }}>
              <Link to="/login" className="auth-submit-btn" style={{ textDecoration: 'none' }}>
                Go to Sign In <span>→</span>
              </Link>
            </div>

            <div className="auth-footer-prompt">
              Need assistance?
              <Link to="/">Contact Orbit Support</Link>
            </div>
          </div>
        ) : isAccepted ? (
          <div>
            <div className="auth-card-header">
              <h1>Invitation accepted!</h1>
              <p>You have joined the <strong>{teamName}</strong> workspace.</p>
            </div>

            <div className="auth-notice-box success" role="status">
              <span style={{ fontSize: '18px' }}>✓</span>
              <div>
                <strong>Design Preview Notice:</strong>
                <p style={{ margin: '4px 0 0', fontSize: '12px' }}>
                  Account details for <strong>{fullName}</strong> ({invitedEmail}) have been validated. Backend team provisioning will occur during the backend integration phase.
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
                  background: 'rgba(117,100,245,0.15)',
                  border: '1px solid rgba(117,100,245,0.3)',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  color: '#c4b5fd',
                  fontSize: '11px',
                  fontWeight: 600,
                  marginBottom: '12px',
                }}
              >
                <span>◈</span> TEAM INVITATION
              </div>
              <h1>Join {teamName}</h1>
              <p>Set up your developer profile to collaborate with your team on Orbit.</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              {/* Invited Email (Read-only / verified) */}
              <div className="auth-form-group">
                <label htmlFor="invite-email" className="auth-form-label">
                  Invited Work Email
                </label>
                <div className="auth-input-wrapper">
                  <input
                    id="invite-email"
                    type="email"
                    value={invitedEmail}
                    readOnly
                    className="auth-input"
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      borderColor: 'rgba(255, 255, 255, 0.08)',
                      color: '#94a3b8',
                      cursor: 'not-allowed',
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      right: '12px',
                      color: '#10b981',
                      fontSize: '12px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    ✓ Verified
                  </span>
                </div>
              </div>

              {/* Full Name */}
              <div className="auth-form-group">
                <label htmlFor="invite-fullname" className="auth-form-label">
                  Full Name
                </label>
                <input
                  id="invite-fullname"
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                  }}
                  placeholder="Sarah Connor"
                  className={`auth-input ${errors.fullName ? 'has-error' : ''}`}
                  autoComplete="name"
                  required
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? 'invite-name-error' : undefined}
                />
                {errors.fullName && (
                  <span id="invite-name-error" className="auth-field-error" role="alert">
                    ⚠ {errors.fullName}
                  </span>
                )}
              </div>

              {/* Password */}
              <div className="auth-form-group">
                <label htmlFor="invite-password" className="auth-form-label">
                  Create Password
                </label>
                <div className="auth-input-wrapper">
                  <input
                    id="invite-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                      if (confirmPassword && e.target.value !== confirmPassword) {
                        setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
                      } else if (confirmPassword && e.target.value === confirmPassword) {
                        setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                      }
                    }}
                    placeholder="At least 8 characters"
                    className={`auth-input has-icon-right ${errors.password ? 'has-error' : ''}`}
                    autoComplete="new-password"
                    required
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? 'invite-pass-error' : undefined}
                  />
                  <button
                    type="button"
                    className="auth-eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? '👁' : '👁‍🗨'}
                  </button>
                </div>
                {errors.password && (
                  <span id="invite-pass-error" className="auth-field-error" role="alert">
                    ⚠ {errors.password}
                  </span>
                )}

                {/* Strength Meter */}
                {password.length > 0 && (
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
                <label htmlFor="invite-confirm-password" className="auth-form-label">
                  Confirm Password
                </label>
                <div className="auth-input-wrapper">
                  <input
                    id="invite-confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword) {
                        setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                      }
                      if (password && e.target.value !== password) {
                        setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
                      }
                    }}
                    placeholder="Re-enter your password"
                    className={`auth-input has-icon-right ${errors.confirmPassword ? 'has-error' : ''}`}
                    autoComplete="new-password"
                    required
                    aria-invalid={!!errors.confirmPassword}
                    aria-describedby={errors.confirmPassword ? 'invite-confirm-error' : undefined}
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
                  <span id="invite-confirm-error" className="auth-field-error" role="alert">
                    ⚠ {errors.confirmPassword}
                  </span>
                )}
              </div>

              <button type="submit" className="auth-submit-btn">
                Accept Invitation & Join Team <span>→</span>
              </button>
            </form>

            <div className="auth-footer-prompt">
              Already accepted an invite?
              <Link to="/login">Sign In</Link>
            </div>
          </div>
        )}
      </div>
    </AuthLayout>
  );
};

export default InviteAcceptanceView;

