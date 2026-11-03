# Orbit.App — V2 Developer Workspace

> **An AI-powered development workspace that understands your code, plans your changes, and helps you build with confidence.**

Orbit is an AI-powered developer workspace built from scratch. Its purpose is to help developers connect repositories, understand their codebases, plan changes, and build software using AI agents—while keeping the user firmly in control with human approval gates.

---

## Visual Direction & Identity

- **Aesthetic**: Premium, futuristic, minimal developer-first aesthetic.
- **Palette**: Deep obsidian surfaces (`#07080b`, `#0d0f17`), celestial indigo (`#6366f1`), orbital cyan (`#06b6d4`), telemetry amber (`#fbbf24`), and verified emerald (`#34d399`).
- **Typography**: Inter for UI and JetBrains Mono for telemetry, AST graph, and code diffs.
- **Micro-interactions**: Subtle luminous accents, reactive status indicators, responsive mobile drawer, and interactive workspace simulation.

---

## Phase 1 Deliverables

1. **Design System & Tokens**:
   - Programmatic design tokens in `src/styles/tokens.ts` (colors, surfaces, typography, spacing, radius, shadows, status).
   - Reusable UI component library (`Button`, `Badge`, `Card`, `Input`, `Modal`, `StatusIndicator`, `CodePreview`, `OrbitLogo`).

2. **Public Landing Page**:
   - **Header**: Vector Orbit symbol + wordmark, navigation, Documentation modal trigger, early access CTA, and responsive mobile menu.
   - **Hero**: "Your next build starts with Orbit." headline, email capture, quick metrics, and preview jump.
   - **Workspace Preview**: Interactive mockup of the Orbit developer workspace featuring repository explorer, step-by-step AI implementation plan, staged code diff viewer, sandboxed Vitest runner, and approval gate controls.
   - **Product Introduction**: Direct comparison between blind autocomplete copilots and Orbit's plan-first, AST-aware architecture.
   - **Core Capabilities**: Deep codebase understanding, spec generation, multi-agent orchestration, human review gates, and sandboxed test execution.
   - **How It Works**: Clear 4-step workflow (Connect repo -> Describe goal -> Review plan -> Watch Orbit verify).
   - **Product Showcase**: Architectural invariants (AST map, staged memory gate, sandboxed CI runner).
   - **Early Access CTA**: Cohort #1 invitation waitlist with role selection and confirmation state.
   - **Footer**: Product links, security/trust principles, documentation trigger, and GitHub repository link.

---

## Tech Stack

- **Framework**: React 18
- **Language**: TypeScript (strict mode, bundler resolution)
- **Tooling**: Vite 6
- **Styling**: Tailwind CSS 3.4 with custom typography and surface tokens
- **Icons**: Lucide React
- **Status**: Phase 1 Complete (Design System & Landing Page)

---

## Getting Started

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
