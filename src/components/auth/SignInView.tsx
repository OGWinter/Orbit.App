import React, { useState } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { useAuth } from '../../contexts/AuthContext';
import { getSafeRedirectPath } from '../../utils/redirect';

export const SignInView: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { signIn, isConfigured, configError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [githubNotice, setGithubNotice] = useState<string | null>(null);

  const validate = () => {
    const errs: { email?: string; password?: string } = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!emailPattern.test(email.trim())) {
      errs.email = 'Please enter a valid email address (e.g. name@company.com)';
    }

    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setGithubNotice(null);

    if (!validate()) return;

    if (!isConfigured) {
      setServerError(configError || 'Supabase authentication is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in your .env file.');
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await signIn(email.trim(), password);

      if (error) {
        setServerError(error.message || 'Invalid login credentials. Please try again.');
      } else {
        // Resolve intended destination: location.state.from or query params (?redirect= / ?from=)
        const fromState = (location.state as any)?.from;
        const fromTarget =
          typeof fromState === 'object' && fromState?.pathname
            ? `${fromState.pathname}${fromState.search || ''}`
            : typeof fromState === 'string'
            ? fromState
            : searchParams.get('redirect') || searchParams.get('from');

        // Validate destination to prevent open redirects; default to /workspace
        const destination = getSafeRedirectPath(fromTarget, '/workspace');
        navigate(destination, { replace: true });
      }
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'An unexpected error occurred during sign-in.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGitHubClick = () => {
    setGithubNotice(
      'GitHub sign-in is not yet implemented. Please sign in using your email and password credentials.'
    );
  };

  return (
    <AuthLayout
      headerRightAction={
        <Link to="/register" className="auth-nav-link">
          Create Account →
        </Link>
      }
    >
      <div className="auth-card-dark">
        <div className="auth-card-header">
          <h1>Welcome back</h1>
          <p>Enter your developer credentials to access your Orbit workspace.</p>
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
              <strong>Sign-in Error:</strong>
              <p style={{ margin: '4px 0 0', fontSize: '12px', lineHeight: 1.5 }}>
                {serverError}
              </p>
            </div>
          </div>
        )}

        {githubNotice && (
          <div className="auth-notice-box info" role="status" style={{ marginBottom: '20px' }}>
            <span>ℹ</span>
            <div>{githubNotice}</div>
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {/* Email Field */}
          <div className="auth-form-group">
            <label htmlFor="signin-email" className="auth-form-label">
              Work Email
            </label>
            <div className="auth-input-wrapper">
              <input
                id="signin-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  if (serverError) setServerError(null);
                }}
                placeholder="name@company.com"
                className={`auth-input ${errors.email ? 'has-error' : ''}`}
                autoComplete="email"
                required
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                disabled={submitting}
              />
            </div>
            {errors.email && (
              <span id="email-error" className="auth-field-error" role="alert">
                ⚠ {errors.email}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div className="auth-form-group">
            <div className="auth-label-row">
              <label htmlFor="signin-password" className="auth-form-label">
                Password
              </label>
              <Link to="/forgot-password" className="auth-forgot-link">
                Forgot password?
              </Link>
            </div>
            <div className="auth-input-wrapper">
              <input
                id="signin-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                  if (serverError) setServerError(null);
                }}
                placeholder="Enter your password"
                className={`auth-input has-icon-right ${errors.password ? 'has-error' : ''}`}
                autoComplete="current-password"
                required
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
                disabled={submitting}
              />
              <button
                type="button"
                className="auth-eye-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                disabled={submitting}
              >
                {showPassword ? '👁' : '👁‍🗨'}
              </button>
            </div>
            {errors.password && (
              <span id="password-error" className="auth-field-error" role="alert">
                ⚠ {errors.password}
              </span>
            )}
          </div>

          {/* Remember Me Option */}
          <label className="auth-checkbox-row">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="auth-checkbox"
              disabled={submitting}
            />
            <span className="auth-checkbox-label">
              Remember this device for 30 days
            </span>
          </label>

          {/* Sign In Button */}
          <button type="submit" className="auth-submit-btn" disabled={submitting}>
            {submitting ? 'Signing in...' : 'Sign In to Workspace'} <span>→</span>
          </button>

          {/* Divider */}
          <div className="auth-divider">or continue with</div>

          {/* GitHub Placeholder */}
          <button
            type="button"
            onClick={handleGitHubClick}
            className="auth-github-btn"
            aria-label="Continue with GitHub (Not yet implemented)"
            disabled={submitting}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>Continue with GitHub</span>
            <span className="placeholder-pill">Not implemented</span>
          </button>
        </form>

        <div className="auth-footer-prompt">
          Don’t have an Orbit account?
          <Link to="/register">Create one now</Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignInView;
