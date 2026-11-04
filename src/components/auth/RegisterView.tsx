import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { useAuth } from '../../contexts/AuthContext';

export const RegisterView: React.FC = () => {
  const { signUp, isConfigured, configError } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    agreeTerms?: string;
  }>({});

  const [serverError, setServerError] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<{ email: string; needsVerification: boolean } | null>(null);

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

    return {
      score,
      level,
      hasMinLength,
      hasUpperLower,
      hasNumber,
      hasSpecial,
    };
  }, [password]);

  const validate = () => {
    const errs: typeof errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!fullName.trim()) {
      errs.fullName = 'Full name is required';
    }

    if (!email.trim()) {
      errs.email = 'Work email is required';
    } else if (!emailPattern.test(email.trim())) {
      errs.email = 'Please enter a valid email address';
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

    if (!agreeTerms) {
      errs.agreeTerms = 'You must accept the terms to proceed';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
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
      const { error, needsEmailVerification } = await signUp(email.trim(), password, fullName.trim());

      if (error) {
        setServerError(error.message || 'Registration failed. Please check your credentials and try again.');
      } else {
        setSuccessInfo({
          email: email.trim(),
          needsVerification: needsEmailVerification ?? true,
        });
        // Clear sensitive inputs
        setPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'An unexpected error occurred during registration.');
    } finally {
      setSubmitting(false);
    }
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
        <div className="auth-card-header">
          <h1>Create your account</h1>
          <p>Join Orbit to plan, build, and verify software with approval-first workflows.</p>
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
              <strong>Registration Error:</strong>
              <p style={{ margin: '4px 0 0', fontSize: '12px', lineHeight: 1.5 }}>
                {serverError}
              </p>
            </div>
          </div>
        )}

        {successInfo ? (
          <div>
            <div className="auth-notice-box success" role="status" style={{ marginBottom: '24px' }}>
              <span style={{ fontSize: '18px' }}>✓</span>
              <div>
                <strong>Account Registered Successfully</strong>
                <p style={{ margin: '6px 0 0', fontSize: '13px', lineHeight: 1.5 }}>
                  {successInfo.needsVerification
                    ? `A confirmation email has been dispatched to ${successInfo.email}. Please verify your email before signing in.`
                    : `Your account for ${successInfo.email} has been created.`}
                </p>
                {successInfo.needsVerification && (
                  <p style={{ margin: '8px 0 0', fontSize: '12px', opacity: 0.9 }}>
                    Verification is required by Supabase Auth before your first session can be established.
                  </p>
                )}
              </div>
            </div>

            <div style={{ marginTop: '20px' }}>
              <Link to="/login" className="auth-submit-btn" style={{ textDecoration: 'none' }}>
                Proceed to Sign In <span>→</span>
              </Link>
            </div>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {/* Full Name Field */}
            <div className="auth-form-group">
              <label htmlFor="reg-fullname" className="auth-form-label">
                Full Name
              </label>
              <input
                id="reg-fullname"
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                  if (serverError) setServerError(null);
                }}
                placeholder="Ada Lovelace"
                className={`auth-input ${errors.fullName ? 'has-error' : ''}`}
                autoComplete="name"
                required
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? 'name-error' : undefined}
                disabled={submitting}
              />
              {errors.fullName && (
                <span id="name-error" className="auth-field-error" role="alert">
                  ⚠ {errors.fullName}
                </span>
              )}
            </div>

            {/* Email Field */}
            <div className="auth-form-group">
              <label htmlFor="reg-email" className="auth-form-label">
                Work Email
              </label>
              <input
                id="reg-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  if (serverError) setServerError(null);
                }}
                placeholder="ada@company.com"
                className={`auth-input ${errors.email ? 'has-error' : ''}`}
                autoComplete="email"
                required
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                disabled={submitting}
              />
              {errors.email && (
                <span id="email-error" className="auth-field-error" role="alert">
                  ⚠ {errors.email}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className="auth-form-group">
              <label htmlFor="reg-password" className="auth-form-label">
                Password
              </label>
              <div className="auth-input-wrapper">
                <input
                  id="reg-password"
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
                    if (serverError) setServerError(null);
                  }}
                  placeholder="At least 8 characters"
                  className={`auth-input has-icon-right ${errors.password ? 'has-error' : ''}`}
                  autoComplete="new-password"
                  required
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'reg-pass-error' : undefined}
                  disabled={submitting}
                />
                <button
                  type="button"
                  className="auth-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password visibility' : 'Show password visibility'}
                  disabled={submitting}
                >
                  {showPassword ? '👁' : '👁‍🗨'}
                </button>
              </div>
              {errors.password && (
                <span id="reg-pass-error" className="auth-field-error" role="alert">
                  ⚠ {errors.password}
                </span>
              )}

              {/* Password Strength Indicator */}
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
                  <div className="strength-rules-list">
                    <span className={`strength-rule-item ${strengthDetails.hasMinLength ? 'is-met' : ''}`}>
                      {strengthDetails.hasMinLength ? '✓' : '○'} 8+ characters
                    </span>
                    <span className={`strength-rule-item ${strengthDetails.hasUpperLower ? 'is-met' : ''}`}>
                      {strengthDetails.hasUpperLower ? '✓' : '○'} Upper & lowercase
                    </span>
                    <span className={`strength-rule-item ${strengthDetails.hasNumber ? 'is-met' : ''}`}>
                      {strengthDetails.hasNumber ? '✓' : '○'} Number (0-9)
                    </span>
                    <span className={`strength-rule-item ${strengthDetails.hasSpecial ? 'is-met' : ''}`}>
                      {strengthDetails.hasSpecial ? '✓' : '○'} Symbol (!@#$)
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="auth-form-group">
              <label htmlFor="reg-confirm-password" className="auth-form-label">
                Confirm Password
              </label>
              <div className="auth-input-wrapper">
                <input
                  id="reg-confirm-password"
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
                    if (serverError) setServerError(null);
                  }}
                  placeholder="Re-enter your password"
                  className={`auth-input has-icon-right ${errors.confirmPassword ? 'has-error' : ''}`}
                  autoComplete="new-password"
                  required
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby={errors.confirmPassword ? 'confirm-pass-error' : undefined}
                  disabled={submitting}
                />
                <button
                  type="button"
                  className="auth-eye-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide confirm password visibility' : 'Show confirm password visibility'}
                  disabled={submitting}
                >
                  {showConfirmPassword ? '👁' : '👁‍🗨'}
                </button>
              </div>
              {errors.confirmPassword && (
                <span id="confirm-pass-error" className="auth-field-error" role="alert">
                  ⚠ {errors.confirmPassword}
                </span>
              )}
            </div>

            {/* Terms Acceptance */}
            <div className="auth-form-group">
              <label className="auth-checkbox-row">
                <input
                  id="reg-terms"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => {
                    setAgreeTerms(e.target.checked);
                    if (errors.agreeTerms) setErrors((prev) => ({ ...prev, agreeTerms: undefined }));
                  }}
                  className="auth-checkbox"
                  required
                  aria-invalid={!!errors.agreeTerms}
                  disabled={submitting}
                />
                <span className="auth-checkbox-label">
                  I agree to the Orbit Terms of Service and acknowledge the Privacy Policy.
                </span>
              </label>
              {errors.agreeTerms && (
                <span className="auth-field-error" role="alert">
                  ⚠ {errors.agreeTerms}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="auth-submit-btn" disabled={submitting}>
              {submitting ? 'Creating account...' : 'Create Developer Account'} <span>→</span>
            </button>
          </form>
        )}

        <div className="auth-footer-prompt">
          <span>Already have an Orbit account?</span>
          <Link to="/login">Sign in here</Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterView;
