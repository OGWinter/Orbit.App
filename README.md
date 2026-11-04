# Orbit.App — The Approval-First Workspace

> **An approval-first developer workspace where AI understands your codebase, proposes architectural plans, and waits for your review and approval before modifying code.**

Matched 1:1 with [oribit-app.vercel.app](https://oribit-app.vercel.app/) visual identity while enforcing approval-first product messaging and explicit demonstration labeling across all views.

---

## Visual Direction & Identity

- **Design System**: Refined paper palette (`--paper: #f7f8fa`, `--ink: #16171d`, `--violet: #7564f5`, `--lime: #d9fa65`, `--night: #171820`, `--mint: #e5f6ef`, `--lilac: #eeebff`).
- **Typography**: `Space Grotesk` for titles & display typography; `DM Sans` for body copy.
- **Micro-Interactions & Animations**: Keyframe animations (`spin`, `blink`, `fadeInMenu`, `spinDot`, `popIn`, `slideIn`), glowing orbital rings, live pulse dots, interactive popovers, and smooth tab transitions.

---

## Features & Sections

1. **Site Header**:
   - Vector Orbit symbol + brand wordmark.
   - Navigation links (`Platform Sandbox ↗`, `How it works`, `For builders`, `Mission Control ◈`).
   - One-click launcher action (`Start on Win / Mac ⚡`) and early access CTA (`Get started ↗`).
   - Responsive mobile navigation drawer with hamburger toggle.

2. **Hero Section**:
   - Eyebrow: `● THE APPROVAL-FIRST WORKSPACE`
   - Headline: *"Make room for what’s next."*
   - Description emphasizing AI proposals and human-in-the-loop review.
   - Approval-first core principles list.
   - Interactive hero window mockup:
     - Branch switcher (`main`, `staging`, `feat/storefront-refresh`).
     - Task prompt input (`Run ✳`) with staged simulation demonstrating proposed changes and developer approval gates.
     - Interactive rail icons (`⌘` Editor, `▤` Plan, `⌕` Search, `⚙` Settings).
     - Floating tags (`tag-plan`, `tag-verify`) triggering detailed architecture & inspection popovers.
     - Live preview floating card showing sunglasses store preview.

3. **Capability Strip**:
   - Philosophy breakdown: *"One clear direction. More momentum at every step."*
   - Interactive capability badges triggering the Orbit Philosophy modal with approval-first explanations.

4. **Platform Section (01 / 02 / 03)**:
   - `01 / ORCHESTRATE`: Multi-agent constellation diagram with active nodes.
   - `02 / CREATE`: Code editor preview with proposed component diffs.
   - `03 / APPROVE`: Staged preview and review checks before merge.

5. **Workflow Section**:
   - 3-step vertical progress timeline:
     - 01: Describe what you want to build
     - 02: Review the plan & diffs
     - 03: Approve before merging
   - Interactive Workflow Simulator modal.

6. **Made For How You Build**:
   - Role switcher tabs: `Frontend`, `Backend`, `Full stack`, `Teams`.
   - Dynamic role-specific architecture cards emphasizing human oversight and approval at every layer.

7. **Closing CTA**:
   - Animated orbital ring background with glowing node.
   - Actions: `Join Early Access ↗` and `Request Team Demo →`.

8. **Footer**:
   - Newsletter signup with validation and confirmation.
   - Links to Platform Sandbox, Mission Control, Documentation, and GitHub.

9. **Modals & Overlays**:
   - **Early Access Waitlist Modal**: Role selection, work email validation, and local preview queue position reservation.
   - **Team Demo Inquiry Modal**: Enterprise inquiry submission with local storage recording.
   - **Local Runtime Launcher Modal**: One-click startup for Windows & Mac with copyable commands (`npx orbit-workspace start`).

10. **Platform Sandbox Prototype (`/platform` or `#platform-sandbox`)**:
    - Full-screen interactive IDE with project selector and branch dropdown.
    - Code editor with file tabs (`ProductGallery.tsx`, `tailwind.config.js`, `server.ts`).
    - Staged agent audit log stream.
    - Responsive browser preview with Desktop, Tablet, and Mobile viewport switches.
    - Interactive e-commerce prototype of the Horizon Soundstage Speaker with live color swatches (`Warm Sand`, `Obsidian Night`, `Deep Sage`), angle thumbnails, and Add to Cart counter.

11. **Mission Control Admin Dashboard (`/admin` or `#admin`)**:
    - Complete administration portal: Overview metrics, Waitlist management table (status toggle, search, delete, CSV export), Inquiries review, Newsletter subscribers, and preview database controls.

---

## Tech Stack & Tooling

- **React 18**
- **TypeScript**
- **Vite 6**
- **Custom Orbit CSS & Design System** (`src/styles/orbit.css`)

---

## Getting Started

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Build for production
npm run build

# Preview build
npm run preview
```
