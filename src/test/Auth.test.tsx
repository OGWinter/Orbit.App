import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import SignInView from '../components/auth/SignInView';
import RegisterView from '../components/auth/RegisterView';
import ForgotPasswordView from '../components/auth/ForgotPasswordView';
import ResetPasswordView from '../components/auth/ResetPasswordView';
import InviteAcceptanceView from '../components/auth/InviteAcceptanceView';
import App from '../App';

describe('Phase 2 — Authentication UI Test Suite', () => {
  describe('SignInView (/login)', () => {
    it('renders all sign-in elements and branding', () => {
      render(
        <MemoryRouter>
          <SignInView />
        </MemoryRouter>
      );

      expect(screen.getByRole('heading', { name: /Welcome back/i })).toBeInTheDocument();
      expect(screen.getByLabelText(/Work Email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: /Remember this device/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Forgot password\?/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Sign In to Workspace/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Continue with GitHub/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Create one now/i })).toBeInTheDocument();
    });

    it('validates empty and invalid email inputs', () => {
      render(
        <MemoryRouter>
          <SignInView />
        </MemoryRouter>
      );

      const submitBtn = screen.getByRole('button', { name: /Sign In to Workspace/i });
      fireEvent.click(submitBtn);

      expect(screen.getByText(/Email address is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();

      const emailInput = screen.getByLabelText(/Work Email/i);
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.click(submitBtn);

      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    it('toggles password visibility', () => {
      render(
        <MemoryRouter>
          <SignInView />
        </MemoryRouter>
      );

      const passwordInput = screen.getByLabelText(/^Password$/i) as HTMLInputElement;
      expect(passwordInput.type).toBe('password');

      const toggleBtn = screen.getByLabelText(/Show password/i);
      fireEvent.click(toggleBtn);
      expect(passwordInput.type).toBe('text');

      fireEvent.click(toggleBtn);
      expect(passwordInput.type).toBe('password');
    });

    it('displays preview notice on submit and GitHub integration placeholder notice', () => {
      render(
        <MemoryRouter>
          <SignInView />
        </MemoryRouter>
      );

      // GitHub placeholder
      const gitHubBtn = screen.getByRole('button', { name: /Continue with GitHub/i });
      fireEvent.click(gitHubBtn);
      expect(screen.getByText(/GitHub Integration: Non-functional placeholder preview/i)).toBeInTheDocument();

      // Successful validation submission notice
      fireEvent.change(screen.getByLabelText(/Work Email/i), { target: { value: 'ada@lovelace.dev' } });
      fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'Secret123!' } });
      fireEvent.click(screen.getByRole('button', { name: /Sign In to Workspace/i }));

      expect(screen.getByText(/Design Preview Notice: Form validation succeeded/i)).toBeInTheDocument();
    });
  });

  describe('RegisterView (/register)', () => {
    it('renders all registration fields and terms acceptance', () => {
      render(
        <MemoryRouter>
          <RegisterView />
        </MemoryRouter>
      );

      expect(screen.getByRole('heading', { name: /Create your account/i })).toBeInTheDocument();
      expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Work Email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^Confirm Password$/i)).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: /I agree to the Orbit Terms/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Create Developer Account/i })).toBeInTheDocument();
    });

    it('updates password strength indicator as password is typed', () => {
      render(
        <MemoryRouter>
          <RegisterView />
        </MemoryRouter>
      );

      const passwordInput = screen.getByLabelText(/^Password$/i);
      fireEvent.change(passwordInput, { target: { value: 'abc' } });
      expect(screen.getByText(/weak/i)).toBeInTheDocument();

      fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
      expect(screen.getByText(/strong/i)).toBeInTheDocument();
    });

    it('validates password mismatch and terms agreement', () => {
      render(
        <MemoryRouter>
          <RegisterView />
        </MemoryRouter>
      );

      fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Alan Turing' } });
      fireEvent.change(screen.getByLabelText(/Work Email/i), { target: { value: 'alan@bletchley.org' } });
      fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'EnigmaCode2026!' } });
      fireEvent.change(screen.getByLabelText(/^Confirm Password$/i), { target: { value: 'DifferentPassword' } });

      const submitBtn = screen.getByRole('button', { name: /Create Developer Account/i });
      fireEvent.click(submitBtn);

      expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
      expect(screen.getByText(/You must accept the terms to proceed/i)).toBeInTheDocument();

      // Fix mismatch and accept terms
      fireEvent.change(screen.getByLabelText(/^Confirm Password$/i), { target: { value: 'EnigmaCode2026!' } });
      fireEvent.click(screen.getByRole('checkbox', { name: /I agree to the Orbit Terms/i }));
      fireEvent.click(submitBtn);

      expect(screen.getByText(/Design Preview Notice: Registration form validated for Alan Turing/i)).toBeInTheDocument();
    });
  });

  describe('ForgotPasswordView (/forgot-password)', () => {
    it('validates email and displays required preview notice on success', () => {
      render(
        <MemoryRouter>
          <ForgotPasswordView />
        </MemoryRouter>
      );

      expect(screen.getByRole('heading', { name: /Reset password/i })).toBeInTheDocument();

      const submitBtn = screen.getByRole('button', { name: /Send Reset Instructions/i });
      fireEvent.click(submitBtn);
      expect(screen.getByText(/Email address is required/i)).toBeInTheDocument();

      const emailInput = screen.getByLabelText(/Work Email Address/i);
      fireEvent.change(emailInput, { target: { value: 'dev@company.com' } });
      fireEvent.click(submitBtn);

      // Must explicitly declare that no real recovery email was sent!
      expect(screen.getByText(/Notice: This interface is a design preview. No actual recovery email was sent to your inbox./i)).toBeInTheDocument();
    });
  });

  describe('ResetPasswordView (/reset-password)', () => {
    it('renders active reset preview and confirms no real account is modified', () => {
      render(
        <MemoryRouter initialEntries={['/reset-password']}>
          <ResetPasswordView />
        </MemoryRouter>
      );

      expect(screen.getByRole('heading', { name: /Choose a new password/i })).toBeInTheDocument();
      expect(screen.getByText(/UI Preview — No live account modified/i)).toBeInTheDocument();

      // Submit matching password
      fireEvent.change(screen.getByLabelText(/^New Password$/i), { target: { value: 'NewSuperPass2026!' } });
      fireEvent.change(screen.getByLabelText(/Confirm New Password/i), { target: { value: 'NewSuperPass2026!' } });
      fireEvent.click(screen.getByRole('button', { name: /Update Password/i }));

      expect(screen.getByRole('heading', { name: /Password updated/i })).toBeInTheDocument();
      expect(screen.getByText(/no real account or database credentials were changed/i)).toBeInTheDocument();
    });

    it('renders expired reset preview when ?expired=true or ?token=invalid is provided', () => {
      render(
        <MemoryRouter initialEntries={['/reset-password?expired=true']}>
          <ResetPasswordView />
        </MemoryRouter>
      );

      expect(screen.getByRole('heading', { name: /Reset link expired/i })).toBeInTheDocument();
      expect(screen.getByText(/This password recovery link is invalid or has expired/i)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Request New Reset Link/i })).toBeInTheDocument();
    });

    it('renders invalid link preview when ?token=invalid is provided', () => {
      render(
        <MemoryRouter initialEntries={['/reset-password?token=invalid']}>
          <ResetPasswordView />
        </MemoryRouter>
      );

      expect(screen.getByRole('heading', { name: /Reset link expired/i })).toBeInTheDocument();
    });
  });

  describe('InviteAcceptanceView (/invite)', () => {
    it('renders valid invitation preview with sample data clearly identified as demo', () => {
      render(
        <MemoryRouter initialEntries={['/invite?email=alex@orbit.app&team=Atlas+Core']}>
          <InviteAcceptanceView />
        </MemoryRouter>
      );

      expect(screen.getByText(/SAMPLE INVITATION \(DEMO DATA\)/i)).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Join Atlas Core/i })).toBeInTheDocument();
      const emailInput = screen.getByLabelText(/Invited Work Email/i) as HTMLInputElement;
      expect(emailInput.value).toBe('alex@orbit.app');
      expect(emailInput.readOnly).toBe(true);

      // Fill form and submit
      fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Alex Developer' } });
      fireEvent.change(screen.getByLabelText(/^Create Password$/i), { target: { value: 'SecurePass2026!' } });
      fireEvent.change(screen.getByLabelText(/^Confirm Password$/i), { target: { value: 'SecurePass2026!' } });
      fireEvent.click(screen.getByRole('button', { name: /Accept Invitation & Join Team/i }));

      expect(screen.getByRole('heading', { name: /Invitation preview completed/i })).toBeInTheDocument();
      expect(screen.getByText(/no live invitation was redeemed and no database account was created/i)).toBeInTheDocument();
    });

    it('renders expired invitation preview when ?expired=true is provided', () => {
      render(
        <MemoryRouter initialEntries={['/invite?expired=true&team=Atlas+Core']}>
          <InviteAcceptanceView />
        </MemoryRouter>
      );

      expect(screen.getByRole('heading', { name: /Invitation expired/i })).toBeInTheDocument();
      expect(screen.getByText(/This workspace invitation link is invalid or has already been redeemed/i)).toBeInTheDocument();
    });

    it('gracefully handles missing URL parameters without crashing', () => {
      render(
        <MemoryRouter initialEntries={['/invite']}>
          <InviteAcceptanceView />
        </MemoryRouter>
      );

      expect(screen.getByRole('heading', { name: /Join Skyline Engineering/i })).toBeInTheDocument();
      const emailInput = screen.getByLabelText(/Invited Work Email/i) as HTMLInputElement;
      expect(emailInput.value).toBe('developer@skyline.tech');
    });
  });

  describe('Direct Route Navigation in App Root', () => {
    it('renders SignInView when directly loading /login', () => {
      window.history.pushState(null, '', '/login');
      render(<App />);
      expect(screen.getByRole('heading', { name: /Welcome back/i })).toBeInTheDocument();
    });

    it('renders RegisterView when directly loading /register', () => {
      window.history.pushState(null, '', '/register');
      render(<App />);
      expect(screen.getByRole('heading', { name: /Create your account/i })).toBeInTheDocument();
    });

    it('renders ForgotPasswordView when directly loading /forgot-password', () => {
      window.history.pushState(null, '', '/forgot-password');
      render(<App />);
      expect(screen.getByRole('heading', { name: /Reset password/i })).toBeInTheDocument();
    });

    it('renders ResetPasswordView when directly loading /reset-password', () => {
      window.history.pushState(null, '', '/reset-password');
      render(<App />);
      expect(screen.getByRole('heading', { name: /Choose a new password/i })).toBeInTheDocument();
    });

    it('renders InviteAcceptanceView when directly loading /invite', () => {
      window.history.pushState(null, '', '/invite');
      render(<App />);
      expect(screen.getByText(/SAMPLE INVITATION \(DEMO DATA\)/i)).toBeInTheDocument();
    });
  });
});
