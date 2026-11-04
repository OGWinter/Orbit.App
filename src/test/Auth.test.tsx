import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import SignInView from '../components/auth/SignInView';
import RegisterView from '../components/auth/RegisterView';
import ForgotPasswordView from '../components/auth/ForgotPasswordView';
import ResetPasswordView from '../components/auth/ResetPasswordView';
import InviteAcceptanceView from '../components/auth/InviteAcceptanceView';
import Header from '../components/layout/Header';
import App from '../App';
import { AuthProvider } from '../contexts/AuthContext';

// Mock Supabase service
const mockSignUp = vi.fn();
const mockSignInWithPassword = vi.fn();
const mockSignOut = vi.fn();
const mockResetPasswordForEmail = vi.fn();
const mockUpdateUser = vi.fn();
const mockGetSession = vi.fn();
const mockOnAuthStateChange = vi.fn();

let mockIsConfigured = true;
let mockConfigError: string | null = null;

vi.mock('../services/supabase', () => ({
  get isSupabaseConfigured() {
    return () => mockIsConfigured;
  },
  get getSupabaseConfigError() {
    return () => mockConfigError;
  },
  get supabase() {
    if (!mockIsConfigured) return null;
    return {
      auth: {
        signUp: (...args: any[]) => mockSignUp(...args),
        signInWithPassword: (...args: any[]) => mockSignInWithPassword(...args),
        signOut: (...args: any[]) => mockSignOut(...args),
        resetPasswordForEmail: (...args: any[]) => mockResetPasswordForEmail(...args),
        updateUser: (...args: any[]) => mockUpdateUser(...args),
        getSession: (...args: any[]) => mockGetSession(...args),
        onAuthStateChange: (...args: any[]) => mockOnAuthStateChange(...args),
      },
    };
  },
}));

const renderWithAuth = async (ui: React.ReactElement, initialEntries = ['/']) => {
  let view: any;
  if (typeof window !== 'undefined' && initialEntries[0]) {
    window.history.pushState(null, '', initialEntries[0]);
  }
  await act(async () => {
    view = render(
      <MemoryRouter initialEntries={initialEntries}>
        <AuthProvider>{ui}</AuthProvider>
      </MemoryRouter>
    );
  });
  return view;
};

describe('Phase 3.1 — Supabase Auth Hardening & Configuration Fixes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsConfigured = true;
    mockConfigError = null;

    mockGetSession.mockResolvedValue({
      data: { session: null },
      error: null,
    });

    mockOnAuthStateChange.mockReturnValue({
      data: {
        subscription: {
          unsubscribe: vi.fn(),
        },
      },
    });
  });

  describe('Supabase Environment Configuration & Missing Variables', () => {
    it('displays configuration error notice referencing VITE_SUPABASE_PUBLISHABLE_KEY when unconfigured', async () => {
      mockIsConfigured = false;
      mockConfigError = 'Missing VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in environment.';

      await renderWithAuth(<RegisterView />);

      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(
        screen.getByText(/Missing VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY/i)
      ).toBeInTheDocument();

      // Form submission is blocked
      fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Ada Lovelace' } });
      fireEvent.change(screen.getByLabelText(/Work Email/i), { target: { value: 'ada@lovelace.dev' } });
      fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'StrongPass2026!' } });
      fireEvent.change(screen.getByLabelText(/^Confirm Password$/i), { target: { value: 'StrongPass2026!' } });
      fireEvent.click(screen.getByRole('checkbox', { name: /I agree to the Orbit Terms/i }));

      fireEvent.click(screen.getByRole('button', { name: /Create Developer Account/i }));

      await waitFor(() => {
        expect(mockSignUp).not.toHaveBeenCalled();
      });
    });
  });

  describe('RegisterView (/register)', () => {
    it('renders all registration elements and calculates password strength', async () => {
      await renderWithAuth(<RegisterView />);

      expect(screen.getByRole('heading', { name: /Create your account/i })).toBeInTheDocument();
      expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Work Email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^Confirm Password$/i)).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: /I agree to the Orbit Terms/i })).toBeInTheDocument();

      // Password strength testing
      const passwordInput = screen.getByLabelText(/^Password$/i);
      fireEvent.change(passwordInput, { target: { value: 'pass' } });
      expect(screen.getByText(/weak/i)).toBeInTheDocument();

      fireEvent.change(passwordInput, { target: { value: 'StrongPassword123!' } });
      expect(screen.getByText(/strong/i)).toBeInTheDocument();
    });

    it('performs local validation before calling backend', async () => {
      await renderWithAuth(<RegisterView />);

      const submitBtn = screen.getByRole('button', { name: /Create Developer Account/i });
      fireEvent.click(submitBtn);

      expect(screen.getByText(/Full name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Work email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
      expect(mockSignUp).not.toHaveBeenCalled();
    });

    it('submits registration to Supabase with metadata and shows email verification state', async () => {
      mockSignUp.mockResolvedValueOnce({
        data: {
          user: { id: 'user-123', email: 'ada@lovelace.dev' },
          session: null, // session is null when email confirmation is required
        },
        error: null,
      });

      await renderWithAuth(<RegisterView />);

      fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Ada Lovelace' } });
      fireEvent.change(screen.getByLabelText(/Work Email/i), { target: { value: 'ada@lovelace.dev' } });
      fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'Password123!' } });
      fireEvent.change(screen.getByLabelText(/^Confirm Password$/i), { target: { value: 'Password123!' } });
      fireEvent.click(screen.getByRole('checkbox', { name: /I agree to the Orbit Terms/i }));

      fireEvent.click(screen.getByRole('button', { name: /Create Developer Account/i }));

      await waitFor(() => {
        expect(mockSignUp).toHaveBeenCalledWith({
          email: 'ada@lovelace.dev',
          password: 'Password123!',
          options: {
            data: {
              full_name: 'Ada Lovelace',
            },
          },
        });
      });

      // Confirms verification requirement message is presented
      await waitFor(() => {
        expect(screen.getByText(/Account Registered Successfully/i)).toBeInTheDocument();
        expect(
          screen.getByText(/A confirmation email has been dispatched to ada@lovelace\.dev/i)
        ).toBeInTheDocument();
      });
    });

    it('displays error and avoids false success when Supabase returns an error', async () => {
      mockSignUp.mockResolvedValueOnce({
        data: { user: null, session: null },
        error: { message: 'User already registered' },
      });

      await renderWithAuth(<RegisterView />);

      fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Ada Lovelace' } });
      fireEvent.change(screen.getByLabelText(/Work Email/i), { target: { value: 'duplicate@lovelace.dev' } });
      fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'Password123!' } });
      fireEvent.change(screen.getByLabelText(/^Confirm Password$/i), { target: { value: 'Password123!' } });
      fireEvent.click(screen.getByRole('checkbox', { name: /I agree to the Orbit Terms/i }));

      fireEvent.click(screen.getByRole('button', { name: /Create Developer Account/i }));

      await waitFor(() => {
        expect(screen.getByText(/User already registered/i)).toBeInTheDocument();
      });

      expect(screen.queryByText(/Account Registered Successfully/i)).not.toBeInTheDocument();
    });
  });

  describe('SignInView (/login)', () => {
    it('validates required fields on sign in', async () => {
      await renderWithAuth(<SignInView />);

      fireEvent.click(screen.getByRole('button', { name: /Sign In to Workspace/i }));

      expect(screen.getByText(/Email address is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
      expect(mockSignInWithPassword).not.toHaveBeenCalled();
    });

    it('submits credentials to Supabase and shows error on invalid credentials', async () => {
      mockSignInWithPassword.mockResolvedValueOnce({
        data: { user: null, session: null },
        error: { message: 'Invalid login credentials' },
      });

      await renderWithAuth(<SignInView />);

      fireEvent.change(screen.getByLabelText(/Work Email/i), { target: { value: 'dev@company.com' } });
      fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'WrongPass123' } });

      fireEvent.click(screen.getByRole('button', { name: /Sign In to Workspace/i }));

      await waitFor(() => {
        expect(mockSignInWithPassword).toHaveBeenCalledWith({
          email: 'dev@company.com',
          password: 'WrongPass123',
        });
        expect(screen.getByText(/Invalid login credentials/i)).toBeInTheDocument();
      });
    });

    it('shows placeholder notice when clicking GitHub sign-in button', async () => {
      await renderWithAuth(<SignInView />);

      const githubBtn = screen.getByRole('button', { name: /Continue with GitHub/i });
      fireEvent.click(githubBtn);

      expect(
        screen.getByText(/GitHub sign-in is not yet implemented/i)
      ).toBeInTheDocument();
    });
  });

  describe('ForgotPasswordView (/forgot-password)', () => {
    it('submits recovery request to Supabase and shows success feedback', async () => {
      mockResetPasswordForEmail.mockResolvedValueOnce({
        data: {},
        error: null,
      });

      await renderWithAuth(<ForgotPasswordView />);

      fireEvent.change(screen.getByLabelText(/Work Email Address/i), { target: { value: 'dev@company.com' } });
      fireEvent.click(screen.getByRole('button', { name: /Send Reset Instructions/i }));

      await waitFor(() => {
        expect(mockResetPasswordForEmail).toHaveBeenCalledWith('dev@company.com', {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        expect(screen.getByText(/Recovery Email Sent/i)).toBeInTheDocument();
      });
    });

    it('displays error notice when password recovery request fails', async () => {
      mockResetPasswordForEmail.mockResolvedValueOnce({
        data: {},
        error: { message: 'Rate limit exceeded for password recovery' },
      });

      await renderWithAuth(<ForgotPasswordView />);

      fireEvent.change(screen.getByLabelText(/Work Email Address/i), { target: { value: 'dev@company.com' } });
      fireEvent.click(screen.getByRole('button', { name: /Send Reset Instructions/i }));

      await waitFor(() => {
        expect(screen.getByText(/Rate limit exceeded for password recovery/i)).toBeInTheDocument();
      });
      expect(screen.queryByText(/Recovery Email Sent/i)).not.toBeInTheDocument();
    });
  });

  describe('Hardened ResetPasswordView (/reset-password)', () => {
    it('blocks direct access and shows authorization required state when no recovery session is active', async () => {
      await renderWithAuth(<ResetPasswordView />, ['/reset-password']);

      expect(
        screen.getByRole('heading', { name: /Password reset authorization required/i })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/No active password recovery session was detected/i)
      ).toBeInTheDocument();
      expect(
        screen.getByRole('link', { name: /Request Password Reset Link/i })
      ).toBeInTheDocument();

      // Form input should NOT be accessible
      expect(screen.queryByLabelText(/^New Password$/i)).not.toBeInTheDocument();
    });

    it('renders expired view when ?expired=true or ?token=invalid is provided', async () => {
      await renderWithAuth(<ResetPasswordView />, ['/reset-password?expired=true']);

      expect(screen.getByRole('heading', { name: /Reset link expired/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Request New Reset Link/i })).toBeInTheDocument();
      expect(screen.queryByLabelText(/^New Password$/i)).not.toBeInTheDocument();
    });

    it('unlocks password reset form and submits update when valid recovery authorization is established', async () => {
      mockUpdateUser.mockResolvedValueOnce({
        data: { user: { id: 'user-1' } },
        error: null,
      });

      // Accessible with recovery authorization parameter
      await renderWithAuth(<ResetPasswordView />, ['/reset-password?type=recovery']);

      expect(screen.getByRole('heading', { name: /Choose a new password/i })).toBeInTheDocument();

      fireEvent.change(screen.getByLabelText(/^New Password$/i), { target: { value: 'BrandNewPass2026!' } });
      fireEvent.change(screen.getByLabelText(/Confirm New Password/i), { target: { value: 'BrandNewPass2026!' } });

      fireEvent.click(screen.getByRole('button', { name: /Update Password/i }));

      await waitFor(() => {
        expect(mockUpdateUser).toHaveBeenCalledWith({
          password: 'BrandNewPass2026!',
        });
        expect(screen.getByRole('heading', { name: /Password updated/i })).toBeInTheDocument();
        expect(screen.getByText(/Your Orbit account password has been updated successfully via Supabase Auth/i)).toBeInTheDocument();
      });
    });

    it('displays error and does not report false success when password update fails', async () => {
      mockUpdateUser.mockResolvedValueOnce({
        data: { user: null },
        error: { message: 'Auth session missing or token expired' },
      });

      await renderWithAuth(<ResetPasswordView />, ['/reset-password?type=recovery']);

      fireEvent.change(screen.getByLabelText(/^New Password$/i), { target: { value: 'BrandNewPass2026!' } });
      fireEvent.change(screen.getByLabelText(/Confirm New Password/i), { target: { value: 'BrandNewPass2026!' } });

      fireEvent.click(screen.getByRole('button', { name: /Update Password/i }));

      await waitFor(() => {
        expect(screen.getByText(/Auth session missing or token expired/i)).toBeInTheDocument();
      });

      expect(screen.queryByRole('heading', { name: /Password updated/i })).not.toBeInTheDocument();
    });

    it('authorizes password update when PASSWORD_RECOVERY event is triggered by Supabase SDK', async () => {
      let authCallback: any;
      mockOnAuthStateChange.mockImplementationOnce((callback) => {
        authCallback = callback;
        return {
          data: {
            subscription: {
              unsubscribe: vi.fn(),
            },
          },
        };
      });

      mockUpdateUser.mockResolvedValueOnce({
        data: { user: { id: 'u-recovery' } },
        error: null,
      });

      // Initial load without recovery params
      await renderWithAuth(<ResetPasswordView />, ['/reset-password']);

      // Initially blocked
      expect(
        screen.getByRole('heading', { name: /Password reset authorization required/i })
      ).toBeInTheDocument();

      // Supabase fires PASSWORD_RECOVERY event
      await act(async () => {
        if (authCallback) {
          authCallback('PASSWORD_RECOVERY', {
            user: { id: 'u-recovery', email: 'dev@company.com' },
            access_token: 'rec-tok',
          });
        }
      });

      // Password form is now unlocked
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /Choose a new password/i })).toBeInTheDocument();
      });

      fireEvent.change(screen.getByLabelText(/^New Password$/i), { target: { value: 'ValidRecovery2026!' } });
      fireEvent.change(screen.getByLabelText(/Confirm New Password/i), { target: { value: 'ValidRecovery2026!' } });
      fireEvent.click(screen.getByRole('button', { name: /Update Password/i }));

      await waitFor(() => {
        expect(mockUpdateUser).toHaveBeenCalledWith({
          password: 'ValidRecovery2026!',
        });
        expect(screen.getByRole('heading', { name: /Password updated/i })).toBeInTheDocument();
      });
    });
  });

  describe('Header Authentication State & Sign Out', () => {
    it('reflects authenticated user in header and triggers sign-out', async () => {
      const mockUser = {
        id: 'u-123',
        email: 'founder@orbit.dev',
        user_metadata: { full_name: 'Grace Hopper' },
        app_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
      };

      mockGetSession.mockResolvedValueOnce({
        data: {
          session: {
            user: mockUser,
            access_token: 'fake-token',
            refresh_token: 'fake-refresh',
            expires_in: 3600,
            token_type: 'bearer',
          },
        },
        error: null,
      });

      mockSignOut.mockResolvedValueOnce({ error: null });

      await renderWithAuth(
        <Header
          onOpenWaitlist={vi.fn()}
          onOpenAdmin={vi.fn()}
          onOpenPlatformDemo={vi.fn()}
          onOpenQuickStart={vi.fn()}
        />
      );

      // Verify authenticated user badge is displayed
      await waitFor(() => {
        expect(screen.getByText(/● Grace Hopper/i)).toBeInTheDocument();
      });

      const signOutBtn = screen.getByRole('button', { name: /Sign out/i });
      expect(signOutBtn).toBeInTheDocument();

      fireEvent.click(signOutBtn);

      await waitFor(() => {
        expect(mockSignOut).toHaveBeenCalled();
      });
    });
  });

  describe('InviteAcceptanceView (/invite)', () => {
    it('remains explicitly labeled as sample demonstration data', () => {
      render(
        <MemoryRouter initialEntries={['/invite?email=demo@orbit.app&team=Atlas+Core']}>
          <InviteAcceptanceView />
        </MemoryRouter>
      );

      expect(screen.getByText(/SAMPLE INVITATION \(DEMO DATA\)/i)).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Join Atlas Core/i })).toBeInTheDocument();
    });

    it('renders expired invitation preview when ?expired=true is present', () => {
      render(
        <MemoryRouter initialEntries={['/invite?expired=true']}>
          <InviteAcceptanceView />
        </MemoryRouter>
      );

      expect(screen.getByRole('heading', { name: /Invitation expired/i })).toBeInTheDocument();
    });
  });

  describe('Direct Route Navigation in App Root', () => {
    it('renders SignInView when directly loading /login', async () => {
      window.history.pushState(null, '', '/login');
      await act(async () => {
        render(<App />);
      });
      expect(screen.getByRole('heading', { name: /Welcome back/i })).toBeInTheDocument();
    });

    it('renders RegisterView when directly loading /register', async () => {
      window.history.pushState(null, '', '/register');
      await act(async () => {
        render(<App />);
      });
      expect(screen.getByRole('heading', { name: /Create your account/i })).toBeInTheDocument();
    });

    it('renders ForgotPasswordView when directly loading /forgot-password', async () => {
      window.history.pushState(null, '', '/forgot-password');
      await act(async () => {
        render(<App />);
      });
      expect(screen.getByRole('heading', { name: /Reset password/i })).toBeInTheDocument();
    });

    it('renders ResetPasswordView authorization check when directly loading /reset-password', async () => {
      window.history.pushState(null, '', '/reset-password');
      await act(async () => {
        render(<App />);
      });
      expect(screen.getByRole('heading', { name: /Password reset authorization required/i })).toBeInTheDocument();
    });

    it('renders InviteAcceptanceView when directly loading /invite', async () => {
      window.history.pushState(null, '', '/invite');
      await act(async () => {
        render(<App />);
      });
      expect(screen.getByText(/SAMPLE INVITATION \(DEMO DATA\)/i)).toBeInTheDocument();
    });
  });
});
