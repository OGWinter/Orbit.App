import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Header from '../components/layout/Header';

describe('Header Component', () => {
  it('renders brand logo and primary navigation links', () => {
    const handleOpenWaitlist = vi.fn();
    const handleOpenAdmin = vi.fn();
    const handleOpenPlatformDemo = vi.fn();
    const handleOpenQuickStart = vi.fn();

    render(
      <Header
        onOpenWaitlist={handleOpenWaitlist}
        onOpenAdmin={handleOpenAdmin}
        onOpenPlatformDemo={handleOpenPlatformDemo}
        onOpenQuickStart={handleOpenQuickStart}
      />
    );

    // Verify brand name
    expect(screen.getByText('orbit')).toBeInTheDocument();

    // Verify navigation links
    expect(screen.getByRole('button', { name: /Platform Sandbox/i })).toBeInTheDocument();
    expect(screen.getByText('How it works')).toBeInTheDocument();
    expect(screen.getByText('For builders')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Mission Control/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Start on Win \/ Mac/i })).toBeInTheDocument();
  });

  it('triggers action callbacks when clicked', () => {
    const handleOpenWaitlist = vi.fn();
    const handleOpenAdmin = vi.fn();
    const handleOpenPlatformDemo = vi.fn();
    const handleOpenQuickStart = vi.fn();

    render(
      <Header
        onOpenWaitlist={handleOpenWaitlist}
        onOpenAdmin={handleOpenAdmin}
        onOpenPlatformDemo={handleOpenPlatformDemo}
        onOpenQuickStart={handleOpenQuickStart}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Get started/i }));
    expect(handleOpenWaitlist).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: /Platform Sandbox/i }));
    expect(handleOpenPlatformDemo).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: /Mission Control/i }));
    expect(handleOpenAdmin).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: /Start on Win \/ Mac/i }));
    expect(handleOpenQuickStart).toHaveBeenCalledTimes(1);
  });

  it('toggles mobile menu open and closed', () => {
    render(
      <Header
        onOpenWaitlist={vi.fn()}
        onOpenAdmin={vi.fn()}
        onOpenPlatformDemo={vi.fn()}
        onOpenQuickStart={vi.fn()}
      />
    );

    const toggleBtn = screen.getByRole('button', { name: /Open navigation/i });
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggleBtn);
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(toggleBtn);
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
  });
});
