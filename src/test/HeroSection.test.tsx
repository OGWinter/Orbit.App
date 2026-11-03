import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import HeroSection from '../components/sections/HeroSection';

describe('HeroSection Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      vi.clearAllTimers();
    });
    vi.useRealTimers();
  });

  it('renders hero title and prompt input', () => {
    render(
      <HeroSection
        onOpenQuickStart={vi.fn()}
        onOpenPlatformDemo={vi.fn()}
      />
    );

    expect(screen.getByText(/Make room/i)).toBeInTheDocument();
    expect(screen.getByText(/what’s next/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Give the product page a calmer layout/i)).toBeInTheDocument();
  });

  it('allows cycling git branch', () => {
    render(
      <HeroSection
        onOpenQuickStart={vi.fn()}
        onOpenPlatformDemo={vi.fn()}
      />
    );

    const branchBtn = screen.getByTitle(/Click to cycle active git branch/i);
    expect(branchBtn).toHaveTextContent('main');

    act(() => {
      fireEvent.click(branchBtn);
    });
    expect(branchBtn).toHaveTextContent('staging');

    act(() => {
      fireEvent.click(branchBtn);
    });
    expect(branchBtn).toHaveTextContent('feat/storefront-refresh');
  });

  it('runs interactive agent simulation through its stages', () => {
    render(
      <HeroSection
        onOpenQuickStart={vi.fn()}
        onOpenPlatformDemo={vi.fn()}
      />
    );

    const runBtn = screen.getByLabelText(/Run AI agent demonstration/i);
    act(() => {
      fireEvent.click(runBtn);
    });

    // Initial stage: planning
    expect(screen.getByText('STAGE: PLANNING')).toBeInTheDocument();

    // Advance 1800ms to building
    act(() => {
      vi.advanceTimersByTime(1800);
    });
    expect(screen.getByText('STAGE: BUILDING')).toBeInTheDocument();

    // Advance 2000ms to verifying
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByText('STAGE: VERIFYING')).toBeInTheDocument();

    // Advance 1600ms to completed
    act(() => {
      vi.advanceTimersByTime(1600);
    });
    expect(screen.getByText(/Design Demonstration: 3\/3 simulated verification checks completed/i)).toBeInTheDocument();
  });
});
