import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import App from '../App';

describe('App Root Component', () => {
  beforeEach(() => {
    window.history.pushState(null, '', '/');
  });

  it('renders landing page sections by default', async () => {
    await act(async () => {
      render(<App />);
    });

    // Brand and headline
    expect(screen.getAllByText('orbit')[0]).toBeInTheDocument();
    expect(screen.getByText(/Make room/i)).toBeInTheDocument();
    expect(screen.getByText('One clear direction.')).toBeInTheDocument();
    expect(screen.getByText(/A bigger view of/i)).toBeInTheDocument();
    expect(screen.getByText('Think in outcomes.')).toBeInTheDocument();
    expect(screen.getByText(/Your craft stays/i)).toBeInTheDocument();
    expect(screen.getByText(/Give your ideas/i)).toBeInTheDocument();
  });

  it('opens and closes Waitlist modal from header CTA', async () => {
    await act(async () => {
      render(<App />);
    });

    const getStartedBtn = screen.getByRole('button', { name: /Get started/i });
    fireEvent.click(getStartedBtn);

    expect(screen.getByRole('heading', { name: /Join the Orbit Waitlist/i })).toBeInTheDocument();

    const closeBtn = screen.getByLabelText(/Close modal/i);
    fireEvent.click(closeBtn);

    expect(screen.queryByRole('heading', { name: /Join the Orbit Waitlist/i })).not.toBeInTheDocument();
  });

  it('navigates to Platform Sandbox view when clicking Platform Sandbox', async () => {
    await act(async () => {
      render(<App />);
    });

    const sandboxBtns = screen.getAllByRole('button', { name: /Platform Sandbox/i });
    fireEvent.click(sandboxBtns[0]);

    expect(screen.getByText('PLATFORM SANDBOX (DEMO)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Back to Homepage/i })).toBeInTheDocument();

    // Click back to homepage
    fireEvent.click(screen.getByRole('button', { name: /Back to Homepage/i }));
    expect(screen.getByText(/Make room/i)).toBeInTheDocument();
  });

  it('navigates to Mission Control view when clicking Mission Control', async () => {
    await act(async () => {
      render(<App />);
    });

    const adminBtns = screen.getAllByRole('button', { name: /Mission Control/i });
    fireEvent.click(adminBtns[0]);

    expect(screen.getByText('MISSION CONTROL')).toBeInTheDocument();
    expect(screen.getByText('Mission Control Overview')).toBeInTheDocument();

    // Click back to website
    fireEvent.click(screen.getByRole('button', { name: /Back to Website/i }));
    expect(screen.getByText(/Make room/i)).toBeInTheDocument();
  });
});
