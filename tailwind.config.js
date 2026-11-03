/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        orbit: {
          bg: '#07080b',
          surface: {
            DEFAULT: '#0d0f17',
            1: '#0e111a',
            2: '#131824',
            3: '#1a2030',
            hover: '#181e2e',
          },
          border: {
            subtle: 'rgba(255, 255, 255, 0.06)',
            DEFAULT: 'rgba(255, 255, 255, 0.10)',
            strong: 'rgba(255, 255, 255, 0.18)',
            active: 'rgba(99, 102, 241, 0.45)',
          },
          text: {
            primary: '#f8fafc',
            secondary: '#94a3b8',
            muted: '#64748b',
            faint: '#475569',
          },
          accent: {
            DEFAULT: '#6366f1',
            hover: '#4f46e5',
            light: '#818cf8',
            dim: 'rgba(99, 102, 241, 0.12)',
          },
          cyan: {
            DEFAULT: '#06b6d4',
            light: '#38bdf8',
            dim: 'rgba(6, 182, 212, 0.12)',
          },
          emerald: {
            DEFAULT: '#10b981',
            light: '#34d399',
            dim: 'rgba(16, 185, 129, 0.12)',
          },
          amber: {
            DEFAULT: '#f59e0b',
            light: '#fbbf24',
            dim: 'rgba(245, 158, 11, 0.12)',
          },
          rose: {
            DEFAULT: '#f43f5e',
            light: '#fb7185',
            dim: 'rgba(244, 63, 94, 0.12)',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        'orbit-sm': '0 2px 8px rgba(0, 0, 0, 0.4)',
        'orbit-card': '0 12px 32px -8px rgba(0, 0, 0, 0.65), 0 0 1px 1px rgba(255, 255, 255, 0.05) inset',
        'orbit-elevated': '0 20px 50px -12px rgba(0, 0, 0, 0.8), 0 0 1px 1px rgba(255, 255, 255, 0.08) inset',
        'orbit-glow': '0 0 40px -10px rgba(99, 102, 241, 0.25)',
        'orbit-glow-cyan': '0 0 40px -10px rgba(6, 182, 212, 0.25)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'orbit-spin-slow': 'spin 30s linear infinite',
      }
    },
  },
  plugins: [],
}

