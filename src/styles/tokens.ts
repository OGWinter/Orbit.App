/**
 * Orbit V2 Design System Tokens
 * Reusable tokens for consistent colors, surfaces, typography, elevation, and component presets.
 */

export const tokens = {
  colors: {
    bg: {
      primary: '#07080b',
      secondary: '#0b0e14',
      tertiary: '#10141d',
    },
    surface: {
      base: '#0d0f17',
      level1: '#0e111a',
      level2: '#131824',
      level3: '#1a2030',
      hover: '#192032',
      glass: 'rgba(13, 16, 23, 0.75)',
    },
    borders: {
      subtle: 'rgba(255, 255, 255, 0.06)',
      default: 'rgba(255, 255, 255, 0.10)',
      strong: 'rgba(255, 255, 255, 0.18)',
      active: 'rgba(99, 102, 241, 0.45)',
      glow: 'rgba(99, 102, 241, 0.3)',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
      muted: '#64748b',
      faint: '#475569',
      inverse: '#07080b',
    },
    accent: {
      indigo: '#6366f1',
      indigoLight: '#818cf8',
      indigoDark: '#4f46e5',
      cyan: '#06b6d4',
      cyanLight: '#38bdf8',
      emerald: '#10b981',
      emeraldLight: '#34d399',
      amber: '#f59e0b',
      amberLight: '#fbbf24',
      rose: '#f43f5e',
      roseLight: '#fb7185',
    },
  },

  typography: {
    fontFamilies: {
      sans: 'Inter, system-ui, -apple-system, sans-serif',
      mono: 'JetBrains Mono, Fira Code, monospace',
    },
    scale: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
      '6xl': '3.75rem',  // 60px
    },
    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
  },

  radius: {
    sm: '6px',
    md: '10px',
    lg: '14px',
    xl: '20px',
    '2xl': '28px',
    full: '9999px',
  },

  shadows: {
    subtle: '0 2px 8px rgba(0, 0, 0, 0.4)',
    card: '0 12px 32px -8px rgba(0, 0, 0, 0.65), 0 0 1px 1px rgba(255, 255, 255, 0.05) inset',
    elevated: '0 20px 50px -12px rgba(0, 0, 0, 0.8), 0 0 1px 1px rgba(255, 255, 255, 0.08) inset',
    glowIndigo: '0 0 35px -8px rgba(99, 102, 241, 0.3)',
    glowCyan: '0 0 35px -8px rgba(6, 182, 212, 0.25)',
  },

  status: {
    analyzing: {
      color: '#38bdf8',
      bg: 'rgba(56, 189, 248, 0.1)',
      border: 'rgba(56, 189, 248, 0.2)',
      label: 'Analyzing Codebase',
    },
    planning: {
      color: '#818cf8',
      bg: 'rgba(129, 140, 248, 0.1)',
      border: 'rgba(129, 140, 248, 0.2)',
      label: 'Synthesizing Plan',
    },
    awaitingApproval: {
      color: '#fbbf24',
      bg: 'rgba(251, 191, 36, 0.1)',
      border: 'rgba(251, 191, 36, 0.2)',
      label: 'Awaiting User Approval',
    },
    executing: {
      color: '#a855f7',
      bg: 'rgba(168, 85, 247, 0.1)',
      border: 'rgba(168, 85, 247, 0.2)',
      label: 'Agent Applying Edits',
    },
    verified: {
      color: '#34d399',
      bg: 'rgba(52, 211, 153, 0.1)',
      border: 'rgba(52, 211, 153, 0.2)',
      label: 'Tests Passed & Verified',
    },
  },
} as const;

export type DesignTokens = typeof tokens;
