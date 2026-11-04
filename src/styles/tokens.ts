/**
 * Orbit V2 Design System Tokens — Precision & Momentum
 * Centralized design tokens establishing the official visual identity across the entire Orbit application.
 */

export const tokens = {
  colors: {
    bg: {
      main: '#F3F4EF',         // Warm Porcelain
      surface: '#FFFFFF',      // Pure White
      dark: '#172536',         // Midnight Ink / Dark Feature Surfaces
      darkHover: '#1e3046',
    },
    text: {
      primary: '#172536',      // Midnight Ink
      secondary: '#647386',    // Slate
      muted: '#8E9BAE',
      inverse: '#FFFFFF',
    },
    brand: {
      primary: '#315CE8',      // Electric Cobalt
      primaryHover: '#234bc9',
      highlight: '#D6ED83',    // Orbit Lime
      highlightHover: '#c5e06a',
    },
    surfaces: {
      softBlue: '#DFE6F2',
      softGreen: '#DCEDE5',
      softWarm: '#F6E6D9',
    },
    border: {
      default: '#E1E6E8',
      dark: 'rgba(255, 255, 255, 0.08)',
      focus: '#315CE8',
    },
  },

  typography: {
    fontFamilies: {
      display: '"Space Grotesk", system-ui, -apple-system, sans-serif',
      body: '"DM Sans", system-ui, -apple-system, sans-serif',
      mono: '"Cascadia Code", "Fira Code", monospace',
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
    },
    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
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
    full: '9999px',
  },

  shadows: {
    subtle: '0 1px 3px rgba(23, 37, 54, 0.04)',
    card: '0 4px 16px rgba(23, 37, 54, 0.06)',
    elevated: '0 12px 32px rgba(23, 37, 54, 0.10)',
  },
} as const;

export type DesignTokens = typeof tokens;
