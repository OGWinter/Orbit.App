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
   - Authentication status badge (authenticated user badge + Sign out button / Sign in button).
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
    - Explicitly designated demonstration environment.
    - Full-screen interactive IDE with project selector and branch dropdown.
    - Code editor with file tabs (`ProductGallery.tsx`, `tailwind.config.js`, `server.ts`).
    - Staged agent audit log stream.
    - Responsive browser preview with Desktop, Tablet, and Mobile viewport switches.
    - Interactive e-commerce prototype of the Horizon Soundstage Speaker with live color swatches (`Warm Sand`, `Obsidian Night`, `Deep Sage`), angle thumbnails, and Add to Cart counter.

11. **Mission Control Admin Dashboard (`/admin` or `#admin`)**:
    - Explicitly designated internal preview portal: Overview metrics, Waitlist management table (status toggle, search, delete, CSV export), Inquiries review, Newsletter subscribers, and preview database controls.

12. **Real Authentication Foundation (`/login`, `/register`, `/forgot-password`, `/reset-password`)**:
    - Powered by Supabase Auth (`@supabase/supabase-js`).
    - Real account registration with full name metadata and email verification enforcement.
    - Real sign-in and sign-out with persistent sessions restored across reloads.
    - Hardened password recovery flow:
      - Recovery emails dispatched via Supabase Auth with redirect to `/reset-password`.
      - Password updates strictly require a valid Supabase recovery authorization / session event (`PASSWORD_RECOVERY`).
      - Direct access or generic authenticated sessions are safely blocked with a recovery authorization requirement notice.
      - Expired and invalid tokens are detected and routed to dedicated renewal flows.
    - Explicit error handling for missing configuration, invalid credentials, and expired recovery links.
    - Invitation acceptance view (`/invite`) preserved as an explicit demonstration screen.

---

## Supabase Authentication Setup & Configuration

Orbit uses **Supabase Auth** for production-grade email-and-password authentication with email verification.

### 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and log in or create an account.
2. Click **New project** and specify a Project Name (e.g. `orbit-workspace`), database password, and preferred region.
3. Wait for the project initialization to complete.

### 2. Locate Your Project URL & Publishable Key

1. In the Supabase project dashboard, navigate to **Project Settings** (gear icon) -> **API**.
2. Under **Project URL**, copy the `URL` (e.g., `https://xyzcompany.supabase.co`).
3. Under **Project API keys**, locate the **publishable / anon key** and copy its value.
4. **Security Notice**:
   - The publishable key (`VITE_SUPABASE_PUBLISHABLE_KEY`) is intended specifically for client browser use.
   - Database security relies on proper Supabase **Row Level Security (RLS)** policies on your tables.
   - **Never** expose or use a Supabase `service_role` or secret key in frontend code or client-side bundles.

### 3. Configure Local Environment Variables

Create a `.env` file in the project root based on `.env.example`:

```bash
cp .env.example .env
```

Set the copied Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your_key_placeholder
```

*Note: If these variables are not configured or invalid, Orbit displays a clear configuration banner on all auth screens and prevents unconfigured requests.*

### 4. Configure Application URL and Authentication Redirects

In the Supabase Dashboard:

1. Navigate to **Authentication** -> **URL Configuration**.
2. Set **Site URL** to your local dev URL or deployed domain (e.g., `http://localhost:5173` or `https://orbit.app`).
3. Under **Redirect URLs**, add the password recovery redirect URL:
   - `http://localhost:5173/reset-password`
   - `https://your-domain.com/reset-password`
4. Click **Save**.

### 5. Enable Email Confirmation

1. Navigate to **Authentication** -> **Providers** -> **Email**.
2. Ensure **Enable Email provider** is turned on.
3. Ensure **Confirm email** is enabled so new users must verify their email address before their first sign-in.
4. Click **Save**.

---

## Manual Integration Testing Checklist

The automated test suite (`npm test`) uses mocked Supabase clients to verify UI states and failure modes without requiring external network connectivity. For end-to-end verification against live Supabase services:

| Action | Requirements | Verification Steps |
| :--- | :--- | :--- |
| **Registration** | Live Supabase Project & Real Inbox | 1. Navigate to `/register`.<br>2. Fill in Name, Email, Password (8+ chars), accept Terms.<br>3. Submit form. Confirm notice: *"A confirmation email has been dispatched to [email]"*.<br>4. Inspect Supabase Dashboard -> Authentication -> Users to confirm user record with metadata. |
| **Email Verification** | Real Email Inbox | 1. Open the verification email sent by Supabase.<br>2. Click the confirmation link.<br>3. Verify user status changes to confirmed in Supabase Dashboard. |
| **Sign In** | Live Supabase Project & Verified User | 1. Navigate to `/login`.<br>2. Enter credentials for confirmed account.<br>3. Click *Sign In to Workspace*.<br>4. Verify redirect to `/` and header displaying user pill and *Sign out* button. |
| **Session Restoration** | Local Browser Storage | 1. While signed in, refresh the page or open a new browser tab.<br>2. Confirm the user remains signed in without UI flicker. |
| **Sign Out** | Active Session | 1. Click *Sign out* in the header.<br>2. Verify user badge disappears and *Sign in* button returns.<br>3. Confirm session is cleared in browser storage. |
| **Password Recovery Request** | Real Email Inbox | 1. Navigate to `/forgot-password`.<br>2. Submit registered email.<br>3. Confirm notice: *"If an account exists... recovery instructions have been dispatched"*. |
| **Password Update Authorization** | Real Email Inbox | 1. Direct access to `/reset-password` without recovery authorization displays: *"Password reset authorization required"*.<br>2. Click the recovery link in the received email (redirects to `/reset-password#access_token=...&type=recovery`).<br>3. Verify recovery form is unlocked.<br>4. Enter a new password matching confirmation.<br>5. Submit and confirm: *"Password updated successfully via Supabase Auth"*. |

---

## Tech Stack & Tooling

- **Node.js Environment**: `>=22.0.0` (Node 22+ required)
- **React 18**: Core component hierarchy (`^18.3.1`)
- **React Router 7**: Modern client-side routing & deep-link navigation (`^7.x`)
- **Supabase SDK**: `@supabase/supabase-js` (`^2.x`)
- **TypeScript 5**: Strict type verification (`^5.6.3`)
- **Vite 6**: Fast ESM bundler & dev server (`^6.0.7`)
- **Custom Orbit CSS & Design System**: (`src/styles/orbit.css` & `src/styles/auth.css`)

---

## Getting Started

```bash
# Ensure Node.js >=22 is installed
node -v

# Install dependencies
npm install

# Start local dev server
npm run dev

# Run Vitest test suite
npm test

# Build for production
npm run build

# Preview build
npm run preview
```
