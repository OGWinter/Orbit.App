import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/layout/Header';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import WorkspaceView from '../components/views/WorkspaceView';
import SignInView from '../components/auth/SignInView';
import { AuthProvider } from '../contexts/AuthContext';
import { getSafeRedirectPath } from '../utils/redirect';

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

describe('Phase 4.1 — Authenticated Workspace Foundation', () => {
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

  describe('1. Protected Route & Workspace Access Control', () => {
    it('redirects unauthenticated visitors navigating to /workspace to /login', async () => {
      mockGetSession.mockResolvedValueOnce({
        data: { session: null },
        error: null,
      });

      await act(async () => {
        render(
          <MemoryRouter initialEntries={['/workspace']}>
            <AuthProvider>
              <Routes>
                <Route
                  path="/workspace"
                  element={
                    <ProtectedRoute>
                      <WorkspaceView />
                    </ProtectedRoute>
                  }
                />
                <Route path="/login" element={<SignInView />} />
              </Routes>
            </AuthProvider>
          </MemoryRouter>
        );
      });

      // User must be redirected to /login
      expect(screen.getByRole('heading', { name: /Welcome back/i })).toBeInTheDocument();
      expect(screen.getByLabelText(/Work Email/i)).toBeInTheDocument();
      expect(screen.queryByText(/Workspace Overview/i)).not.toBeInTheDocument();
    });

    it('prevents protected content from flashing while authentication is loading', async () => {
      // Promise that never resolves immediately to keep loading=true
      mockGetSession.mockReturnValueOnce(new Promise(() => {}));

      await act(async () => {
        render(
          <MemoryRouter initialEntries={['/workspace']}>
            <AuthProvider>
              <ProtectedRoute>
                <WorkspaceView />
              </ProtectedRoute>
            </AuthProvider>
          </MemoryRouter>
        );
      });

      // Loading screen must be displayed
      expect(screen.getByText(/Loading Orbit workspace.../i)).toBeInTheDocument();
      // Protected content must NEVER be rendered during loading
      expect(screen.queryByText(/Workspace Overview/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/No repositories or projects have been connected yet/i)).not.toBeInTheDocument();
    });

    it('allows authenticated users to access /workspace with personalized greeting', async () => {
      mockGetSession.mockResolvedValueOnce({
        data: {
          session: {
            user: {
              id: 'u-dev-1',
              email: 'ada.lovelace@orbit.dev',
              user_metadata: { full_name: 'Ada Lovelace' },
            },
            access_token: 'valid-token',
            refresh_token: 'refresh-token',
            expires_in: 3600,
            token_type: 'bearer',
          },
        },
        error: null,
      });

      await act(async () => {
        render(
          <MemoryRouter initialEntries={['/workspace']}>
            <AuthProvider>
              <ProtectedRoute>
                <WorkspaceView />
              </ProtectedRoute>
            </AuthProvider>
          </MemoryRouter>
        );
      });

      // Authenticated workspace shell is rendered
      expect(screen.getByRole('heading', { name: /Workspace Overview/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Welcome back, Ada Lovelace/i })).toBeInTheDocument();
      expect(screen.getAllByText(/ada.lovelace@orbit.dev/i).length).toBeGreaterThanOrEqual(1);
      expect(screen.getByRole('button', { name: /Sign out/i })).toBeInTheDocument();
    });

    it('falls back gracefully to email prefix when user full_name metadata is missing', async () => {
      mockGetSession.mockResolvedValueOnce({
        data: {
          session: {
            user: {
              id: 'u-dev-2',
              email: 'grace.hopper@navy.mil',
              user_metadata: {},
            },
            access_token: 'valid-token',
            refresh_token: 'refresh-token',
            expires_in: 3600,
            token_type: 'bearer',
          },
        },
        error: null,
      });

      await act(async () => {
        render(
          <MemoryRouter initialEntries={['/workspace']}>
            <AuthProvider>
              <ProtectedRoute>
                <WorkspaceView />
              </ProtectedRoute>
            </AuthProvider>
          </MemoryRouter>
        );
      });

      // Greeting falls back to email prefix
      expect(screen.getByRole('heading', { name: /Welcome back, grace.hopper/i })).toBeInTheDocument();
    });

    it('displays configuration error when Supabase environment variables are missing', async () => {
      mockIsConfigured = false;
      mockConfigError = 'VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY are required.';

      await act(async () => {
        render(
          <MemoryRouter initialEntries={['/workspace']}>
            <AuthProvider>
              <ProtectedRoute>
                <WorkspaceView />
              </ProtectedRoute>
            </AuthProvider>
          </MemoryRouter>
        );
      });

      expect(screen.getByText(/Configuration Required/i)).toBeInTheDocument();
      expect(screen.queryByText(/Workspace Overview/i)).not.toBeInTheDocument();
    });
  });

  describe('2. Post-Login Navigation & Open Redirect Prevention', () => {
    it('redirects to /workspace by default after successful sign-in', async () => {
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

      mockSignInWithPassword.mockResolvedValueOnce({
        data: {
          user: {
            id: 'u-signed-in',
            email: 'founder@orbit.dev',
            user_metadata: { full_name: 'Dev Founder' },
          },
          session: {
            access_token: 'tok',
            user: {
              id: 'u-signed-in',
              email: 'founder@orbit.dev',
              user_metadata: { full_name: 'Dev Founder' },
            },
          },
        },
        error: null,
      });

      await act(async () => {
        render(
          <MemoryRouter initialEntries={['/login']}>
            <AuthProvider>
              <Routes>
                <Route path="/login" element={<SignInView />} />
                <Route
                  path="/workspace"
                  element={
                    <ProtectedRoute>
                      <WorkspaceView />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </AuthProvider>
          </MemoryRouter>
        );
      });

      fireEvent.change(screen.getByLabelText(/Work Email/i), { target: { value: 'founder@orbit.dev' } });
      fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'ValidPassword2026!' } });

      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: /Sign in to workspace/i }));
      });

      // Trigger session update in auth context
      await act(async () => {
        if (authCallback) {
          authCallback('SIGNED_IN', {
            user: {
              id: 'u-signed-in',
              email: 'founder@orbit.dev',
              user_metadata: { full_name: 'Dev Founder' },
            },
            access_token: 'tok',
          });
        }
      });

      // Navigated to /workspace
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /Workspace Overview/i })).toBeInTheDocument();
      });
    });

    it('returns to the originally requested internal route after sign-in', async () => {
      mockSignInWithPassword.mockResolvedValueOnce({
        data: {
          user: { id: 'u-1', email: 'dev@orbit.dev' },
          session: {
            access_token: 'tok',
            user: { id: 'u-1', email: 'dev@orbit.dev' },
          },
        },
        error: null,
      });

      await act(async () => {
        render(
          <MemoryRouter
            initialEntries={[
              {
                pathname: '/login',
                state: { from: { pathname: '/workspace/custom-project' } },
              },
            ]}
          >
            <AuthProvider>
              <Routes>
                <Route path="/login" element={<SignInView />} />
                <Route
                  path="/workspace/custom-project"
                  element={<div>Custom Internal Project Page</div>}
                />
              </Routes>
            </AuthProvider>
          </MemoryRouter>
        );
      });

      fireEvent.change(screen.getByLabelText(/Work Email/i), { target: { value: 'dev@orbit.dev' } });
      fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'ValidPassword2026!' } });

      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: /Sign in to workspace/i }));
      });

      // Successfully redirected to requested internal destination
      await waitFor(() => {
        expect(screen.getByText('Custom Internal Project Page')).toBeInTheDocument();
      });
    });

    it('sanitizes destinations and rejects unsafe external open redirects', () => {
      // Unit validation for getSafeRedirectPath
      expect(getSafeRedirectPath('https://evil-site.com')).toBe('/workspace');
      expect(getSafeRedirectPath('http://malicious.org')).toBe('/workspace');
      expect(getSafeRedirectPath('//attacker.com')).toBe('/workspace');
      expect(getSafeRedirectPath('///attacker.com')).toBe('/workspace');
      expect(getSafeRedirectPath('\\\\attacker.com')).toBe('/workspace');
      expect(getSafeRedirectPath('/\\attacker.com')).toBe('/workspace');
      expect(getSafeRedirectPath('javascript:alert(1)')).toBe('/workspace');
      expect(getSafeRedirectPath('')).toBe('/workspace');
      expect(getSafeRedirectPath(null)).toBe('/workspace');
      expect(getSafeRedirectPath(undefined)).toBe('/workspace');

      // Valid internal paths are preserved
      expect(getSafeRedirectPath('/workspace')).toBe('/workspace');
      expect(getSafeRedirectPath('/workspace/settings')).toBe('/workspace/settings');
      expect(getSafeRedirectPath('/admin')).toBe('/admin');
    });

    it('rejects external URL query parameter and defaults to /workspace upon sign-in', async () => {
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

      mockSignInWithPassword.mockResolvedValueOnce({
        data: {
          user: { id: 'u-1', email: 'dev@orbit.dev' },
          session: {
            access_token: 'tok',
            user: { id: 'u-1', email: 'dev@orbit.dev' },
          },
        },
        error: null,
      });

      await act(async () => {
        render(
          <MemoryRouter initialEntries={['/login?redirect=https://evil-site.com/steal-creds']}>
            <AuthProvider>
              <Routes>
                <Route path="/login" element={<SignInView />} />
                <Route
                  path="/workspace"
                  element={
                    <ProtectedRoute>
                      <WorkspaceView />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </AuthProvider>
          </MemoryRouter>
        );
      });

      fireEvent.change(screen.getByLabelText(/Work Email/i), { target: { value: 'dev@orbit.dev' } });
      fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'ValidPassword2026!' } });

      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: /Sign in to workspace/i }));
      });

      await act(async () => {
        if (authCallback) {
          authCallback('SIGNED_IN', {
            user: { id: 'u-1', email: 'dev@orbit.dev' },
            access_token: 'tok',
          });
        }
      });

      // External URL rejected; defaults safely to /workspace
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /Workspace Overview/i })).toBeInTheDocument();
      });
    });
  });

  describe('3. Sign Out & Session Teardown', () => {
    it('signing out removes access to protected content and redirects away from /workspace', async () => {
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

      mockGetSession.mockResolvedValueOnce({
        data: {
          session: {
            user: { id: 'u-logout', email: 'user@orbit.dev' },
            access_token: 'tok',
          },
        },
        error: null,
      });

      mockSignOut.mockResolvedValueOnce({ error: null });

      await act(async () => {
        render(
          <MemoryRouter initialEntries={['/workspace']}>
            <AuthProvider>
              <Routes>
                <Route
                  path="/workspace"
                  element={
                    <ProtectedRoute>
                      <WorkspaceView />
                    </ProtectedRoute>
                  }
                />
                <Route path="/login" element={<SignInView />} />
              </Routes>
            </AuthProvider>
          </MemoryRouter>
        );
      });

      expect(screen.getByRole('heading', { name: /Workspace Overview/i })).toBeInTheDocument();

      // Click sign out button in workspace sidebar
      const signOutBtn = screen.getByRole('button', { name: /Sign out/i });
      await act(async () => {
        fireEvent.click(signOutBtn);
      });

      // Supabase auth triggers SIGNED_OUT
      await act(async () => {
        if (authCallback) {
          authCallback('SIGNED_OUT', null);
        }
      });

      // User must be redirected to login, workspace content removed
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /Welcome back/i })).toBeInTheDocument();
      });
      expect(screen.queryByText(/Workspace Overview/i)).not.toBeInTheDocument();
    });
  });

  describe('4. Public Header Workspace Navigation', () => {
    it('displays Open Workspace in the header when signed in', async () => {
      mockGetSession.mockResolvedValueOnce({
        data: {
          session: {
            user: { id: 'u-header', email: 'architect@orbit.dev', user_metadata: { full_name: 'Linus Torvalds' } },
            access_token: 'tok',
          },
        },
        error: null,
      });

      await act(async () => {
        render(
          <MemoryRouter initialEntries={['/']}>
            <AuthProvider>
              <Header
                onOpenWaitlist={vi.fn()}
                onOpenAdmin={vi.fn()}
                onOpenPlatformDemo={vi.fn()}
                onOpenQuickStart={vi.fn()}
              />
            </AuthProvider>
          </MemoryRouter>
        );
      });

      // Signed-in header displays Open Workspace
      expect(screen.getByRole('button', { name: /Open Workspace/i })).toBeInTheDocument();
      expect(screen.getByText(/Linus Torvalds/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Sign out/i })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /^Sign in$/i })).not.toBeInTheDocument();
    });

    it('displays Sign In in the header when signed out', async () => {
      mockGetSession.mockResolvedValueOnce({
        data: { session: null },
        error: null,
      });

      await act(async () => {
        render(
          <MemoryRouter initialEntries={['/']}>
            <AuthProvider>
              <Header
                onOpenWaitlist={vi.fn()}
                onOpenAdmin={vi.fn()}
                onOpenPlatformDemo={vi.fn()}
                onOpenQuickStart={vi.fn()}
              />
            </AuthProvider>
          </MemoryRouter>
        );
      });

      // Signed-out header displays Sign In and does NOT display Open Workspace
      expect(screen.getByRole('button', { name: /^Sign in$/i })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /Open Workspace/i })).not.toBeInTheDocument();
    });
  });

  describe('5. Truthful Workspace Empty States & Navigation Integrity', () => {
    it('renders truthful empty state without fabricated project counts or simulated activity', async () => {
      mockGetSession.mockResolvedValueOnce({
        data: {
          session: {
            user: { id: 'u-audit', email: 'auditor@orbit.dev' },
            access_token: 'tok',
          },
        },
        error: null,
      });

      await act(async () => {
        render(
          <MemoryRouter initialEntries={['/workspace']}>
            <AuthProvider>
              <WorkspaceView />
            </AuthProvider>
          </MemoryRouter>
        );
      });

      // Explicit empty state heading
      expect(
        screen.getByRole('heading', { name: /No repositories or projects have been connected yet/i })
      ).toBeInTheDocument();

      // Truthful 0 counts
      expect(screen.getByText(/0 Connected Repositories/i)).toBeInTheDocument();
      expect(screen.getByText(/0 Active Branches/i)).toBeInTheDocument();
      expect(screen.getByText(/0 Staged Reviews/i)).toBeInTheDocument();

      // Non-functional coming-soon elements are marked
      const comingSoonBadges = screen.getAllByText(/Coming soon/i);
      expect(comingSoonBadges.length).toBeGreaterThanOrEqual(2);

      // Verify no fabricated project data exists
      expect(screen.queryByText(/Horizon Soundstage Speaker/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/12 tasks completed/i)).not.toBeInTheDocument();
    });
  });
});
