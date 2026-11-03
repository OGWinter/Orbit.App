import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import WaitlistModal from '../components/modals/WaitlistModal';

describe('WaitlistModal Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders nothing when closed', () => {
    const { container } = render(<WaitlistModal isOpen={false} onClose={vi.fn()} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders form fields when open and validates email input', () => {
    render(<WaitlistModal isOpen={true} onClose={vi.fn()} />);

    expect(screen.getByRole('heading', { name: /Join the Orbit Waitlist/i })).toBeInTheDocument();

    const emailInput = screen.getByLabelText(/Work Email \*/i);
    const form = emailInput.closest('form')!;

    // Submit with invalid email format
    fireEvent.change(emailInput, { target: { value: 'user@nodomain' } });
    fireEvent.submit(form);

    expect(screen.getByText(/Please enter a valid work email address/i)).toBeInTheDocument();
  });

  it('submits valid entry and presents explicit local preview confirmation', () => {
    const handleSuccess = vi.fn();
    render(<WaitlistModal isOpen={true} onClose={vi.fn()} onSuccess={handleSuccess} />);

    const emailInput = screen.getByLabelText(/Work Email \*/i);
    const form = emailInput.closest('form')!;

    fireEvent.change(emailInput, { target: { value: 'developer@example.com' } });
    fireEvent.submit(form);

    expect(handleSuccess).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/Queue Position #/i)).toBeInTheDocument();
    expect(screen.getByText(/In Phase 1, data is stored locally in client-side storage for interface preview purposes/i)).toBeInTheDocument();
  });
});
