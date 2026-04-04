# LeadBug AI Studio

**LeadBug** is a full-stack WhatsApp CRM platform that lets businesses manage contacts, build message templates, run automated drip sequences, and chat with leads — all powered by the WhatsApp Business API and Supabase.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Database Schema](#database-schema)
- [Supabase Edge Functions](#supabase-edge-functions)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Routing](#routing)
- [Authentication](#authentication)
- [Testing](#testing)

---

## Overview

LeadBug AI Studio is a React + TypeScript single-page application built on top of Supabase (Postgres + Auth + Edge Functions). It provides businesses with a dedicated dashboard for:

- Connecting their WhatsApp Business number via the Meta API
- Creating and managing Meta-approved message templates
- Building automated multi-step follow-up sequences
- Managing a contact database with tags and segmentation
- Handling inbound WhatsApp messages in a unified inbox
- Configuring an AI chatbot for automated lead qualification
- Onboarding new users through a guided multi-step wizard

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React 18 + TypeScript |
| Build Tool | Vite 5 (with SWC) |
| Routing | React Router DOM v6 |
| State / Data Fetching | TanStack React Query v5 |
| UI Components | shadcn/ui (Radix UI primitives) |
| Styling | Tailwind CSS v3 |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Backend / Database | Supabase (Postgres + Row Level Security) |
| Auth | Supabase Auth (email/password) |
| Edge Functions | Deno (deployed to Supabase) |
| HTTP Client | Axios |
| Unit Testing | Vitest + Testing Library |
| E2E Testing | Playwright |
| Package Manager | Bun (also npm-compatible) |

---

## Project Structure

```
leadbug-ai/
├── public/                        # Static assets
├── src/
│   ├── App.tsx                    # Root component with all routes
│   ├── main.tsx                   # React entry point
│   ├── index.css                  # Global styles + Tailwind directives
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppLayout.tsx      # Authenticated app shell (sidebar + topnav)
│   │   │   ├── AuthLayout.tsx     # Unauthenticated layout (onboarding)
│   │   │   ├── Sidebar.tsx        # Left navigation with search
│   │   │   └── TopNav.tsx         # Top navigation bar
│   │   ├── shared/
│   │   │   ├── Modal.tsx          # Reusable modal wrapper
│   │   │   ├── PaginationBar.tsx  # Table pagination
│   │   │   ├── StatusBadge.tsx    # Coloured status labels
│   │   │   ├── StepBar.tsx        # Multi-step progress indicator
│   │   │   └── ToggleSwitch.tsx   # On/off toggle
│   │   └── ui/                    # shadcn/ui generated components (40+)
│   ├── contexts/
│   │   └── AuthContext.tsx        # Global auth state + helper hooks
│   ├── hooks/
│   │   ├── use-mobile.tsx         # Responsive breakpoint hook
│   │   └── use-toast.ts           # Toast notification hook
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts          # Configured Supabase client
│   │       └── types.ts           # Auto-generated DB type definitions
│   ├── lib/
│   │   └── utils.ts               # Tailwind class merging utility
│   ├── pages/
│   │   ├── Dashboard.tsx          # Home dashboard with stats & objectives
│   │   ├── Templates.tsx          # Template list + management
│   │   ├── NewTemplate.tsx        # Template builder with AI assist
│   │   ├── Sequences.tsx          # Sequence list
│   │   ├── CreateSequence.tsx     # Sequence builder with AI assist
│   │   ├── Contacts.tsx           # Contact hub (list, add, import)
│   │   ├── Inbox.tsx              # Unified message inbox
│   │   ├── Chatbot.tsx            # AI chatbot configuration
│   │   ├── Settings.tsx           # Account & WhatsApp profile settings
│   │   ├── Login.tsx              # Sign in / sign up
│   │   ├── landing/
│   │   │   ├── LandingHome.tsx    # Public marketing homepage
│   │   │   ├── LandingFeatures.tsx
│   │   │   └── LandingPricing.tsx
│   │   └── onboarding/
│   │       ├── OnboardingLanding.tsx  # WhatsApp API connect prompt
│   │       └── OnboardingWizard.tsx   # 4-step business setup wizard
│   └── services/
│       └── api.ts                 # Axios base client
├── supabase/
│   ├── config.toml
│   ├── functions/
│   │   ├── chatbot/               # AI chatbot edge function
│   │   ├── generate-sequence/     # AI sequence generator
│   │   └── generate-template/     # AI template generator
│   └── migrations/
│       └── *.sql                  # Full DB schema with RLS policies
├── .env                           # Environment variables (see below)
├── tailwind.config.ts
├── vite.config.ts
├── vitest.config.ts
└── playwright.config.ts
```

---

## Features

### Public Landing Pages
- **Home** (`/landing`) — Hero section, stats, feature grid, pricing CTA
- **Features** (`/landing/features`) — Detailed feature breakdown
- **Pricing** (`/landing/pricing`) — Plan comparison

### Onboarding
- **4-step wizard** collects: business details, industry, objectives, and OTP verification
- Prompts users to connect their WhatsApp Business number via the Meta Embedded Signup flow

### Dashboard (`/dashboard`)
- Live counts of Templates, Sequences, and Contacts fetched from Supabase
- Setup status cards (Connect Number, Greeting Flow, FAQ Auto-replies)
- Objectives launcher with shortcuts to key features

### Templates (`/templates`, `/templates/new`)
- Create Marketing, Utility, or Authentication message templates
- AI-powered template body generator (via `generate-template` edge function)
- Header, footer, and button configuration
- Status tracking: Pending, Approved, Rejected
- Per-template analytics: sent, delivered, clicked, opened counts

### Sequences (`/sequences`, `/sequences/new`)
- Build multi-step automated WhatsApp campaigns
- AI-generated sequence plans (via `generate-sequence` edge function)
- Step scheduling: day, send time, timezone, active toggle
- Sequence types: one-time or recurring

### Contacts (`/contacts`)
- Add contacts manually or import via CSV
- Fields: name, phone, email, tags, source, notes
- Search, filter, and paginate

### Inbox (`/inbox`)
- View and respond to inbound WhatsApp conversations
- Conversation threading per contact

### AI Chatbot (`/chatbot`)
- Keyword-based auto-response engine (deployed as a Supabase edge function)
- Handles FAQ topics: templates, campaigns, contacts, pricing
- Detects escalation keywords and flags for human handoff
- Session tracking via `chatbot_sessions` table

### Settings (`/settings`)
- Update WhatsApp Business profile details

---

## Database Schema

The following tables are created via Supabase migrations, all with Row Level Security (RLS) enforcing per-user data isolation:

| Table | Purpose |
|---|---|
| `profiles` | Auto-created on signup; stores display name, company, industry, phone |
| `templates` | WhatsApp message templates with status and analytics counters |
| `sequences` | Campaign sequences with scheduling and channel config |
| `sequence_steps` | Individual steps within a sequence (linked to templates) |
| `contacts` | Contact records with tags, source, and notes |
| `chatbot_sessions` | Active chatbot conversation sessions with escalation flag |

A trigger (`handle_new_user`) auto-creates a profile row whenever a new user signs up via Supabase Auth.

---

## Supabase Edge Functions

Three serverless functions are deployed to Supabase (Deno runtime):

### `chatbot`
Handles inbound chat messages. Matches keywords against a response map and returns a reply. Detects escalation keywords (`agent`, `human`, `person`, etc.) and sets an `escalated` flag in the response.

**Request:** `{ message: string, sessionId: string }`  
**Response:** `{ reply: string, escalated: boolean }`

### `generate-template`
Generates a WhatsApp message template (header, body, footer) based on a user prompt and category (Marketing / Utility / Authentication).

**Request:** `{ prompt: string, category: string }`  
**Response:** `{ header: string, body: string, footer: string }`

### `generate-sequence`
Returns a suggested multi-step sequence plan (4 steps) based on a campaign prompt.

**Request:** `{ prompt: string }`  
**Response:** `{ steps: Array<{ templateName, day, sendTime, timezone, active }> }`

---

## Getting Started

### Prerequisites

- Node.js 18+ or [Bun](https://bun.sh/)
- A [Supabase](https://supabase.com/) project

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd leadbug-ai

# Install dependencies
npm install
# or
bun install
```

### Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Run the migration file to set up the database schema:
   ```bash
   supabase db push
   # or paste the SQL from supabase/migrations/*.sql into the Supabase SQL editor
   ```
3. Deploy the edge functions:
   ```bash
   supabase functions deploy chatbot
   supabase functions deploy generate-template
   supabase functions deploy generate-sequence
   ```

### Run Locally

```bash
npm run dev
# or
bun dev
```

The app will be available at `http://localhost:8080`.

---

## Environment Variables

Create a `.env` file in the project root (or update the existing one):

```env
VITE_SUPABASE_URL=https://<your-project-id>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<your-anon-public-key>
VITE_SUPABASE_PROJECT_ID=<your-project-id>
```

> **Note:** These variables are prefixed with `VITE_` and are exposed to the browser. Only use the Supabase **anon/public** key here — never the service role key.

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server on port 8080 |
| `npm run build` | Production build |
| `npm run build:dev` | Development build (with source maps) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run unit tests with Vitest |
| `npm run test:watch` | Run Vitest in watch mode |

---

## Routing

| Path | Component | Access |
|---|---|---|
| `/` | Redirect to `/landing` | Public |
| `/landing` | LandingHome | Public |
| `/landing/features` | LandingFeatures | Public |
| `/landing/pricing` | LandingPricing | Public |
| `/login` | Login | Public |
| `/onboarding` | OnboardingLanding | Protected |
| `/onboarding/setup` | OnboardingWizard | Protected |
| `/dashboard` | Dashboard | Protected |
| `/templates` | Templates | Protected |
| `/templates/new` | NewTemplate | Protected |
| `/sequences` | Sequences | Protected |
| `/sequences/new` | CreateSequence | Protected |
| `/contacts` | Contacts | Protected |
| `/inbox` | Inbox | Protected |
| `/chatbot` | Chatbot | Protected |
| `/settings` | Settings | Protected |

Protected routes use the `ProtectedRoute` component, which redirects unauthenticated users to `/login`.

---

## Authentication

Authentication is handled by **Supabase Auth** (email + password). The `AuthContext` provides the following throughout the app:

- `user` — the currently signed-in Supabase user object
- `session` — the active session token
- `loading` — whether auth state is still being resolved
- `signUp(email, password, fullName?)` — registers a new user
- `signIn(email, password)` — signs in an existing user
- `signOut()` — signs out and redirects to `/login`

A profile row is automatically created in the `profiles` table on first signup via a Supabase database trigger.

---

## Testing

### Unit Tests (Vitest)

```bash
npm run test
```

Tests live in `src/test/`. The setup file (`src/test/setup.ts`) configures `@testing-library/jest-dom` matchers.

### E2E Tests (Playwright)

```bash
npx playwright test
```

Config is in `playwright.config.ts`. Fixtures are defined in `playwright-fixture.ts`.

---

## License

Private — all rights reserved.
