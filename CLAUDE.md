# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UPEX DOJO is a QA automation practice platform built with Next.js 15. It provides:
- Interactive UI components for QA engineers to practice test automation
- Backend API with authentication and task management
- PostgreSQL database via Neon with Drizzle ORM
- OpenAPI documentation at /api/docs

## Development Commands

```bash
# Use bun as package manager
bun install       # Install dependencies
bun run dev       # Start development server (localhost:3000)
bun run build     # Build for production
bun start         # Start production server
bun run lint      # Run Next.js linting

# Database commands
bun run db:generate   # Generate Drizzle migrations
bun run db:migrate    # Apply migrations
bun run db:push       # Push schema directly (dev)
bun run db:seed       # Seed demo users
bun run db:studio     # Open Drizzle Studio
```

## Technology Stack

- **Framework:** Next.js 15.2.4 with App Router
- **React:** 19
- **Language:** TypeScript 5
- **UI Components:** shadcn/ui (Radix UI + Tailwind CSS)
- **Styling:** Tailwind CSS 3.4 with CSS variables for theming
- **Forms:** react-hook-form + Zod validation
- **Icons:** lucide-react
- **Database:** PostgreSQL (Neon) + Drizzle ORM
- **Authentication:** Auth.js v5 (NextAuth)
- **Drag & Drop:** @dnd-kit

## Architecture

### Directory Structure

- `app/` - Next.js App Router pages
  - `app/components/` - Component showcase pages organized by category
  - `app/dashboard/` - Authenticated dashboard with Task Board
  - `app/login/` and `app/register/` - Auth pages
  - `app/api/` - API routes (auth, tasks, docs)
  - `app/layout.tsx` - Root layout with ThemeProvider
  - `app/globals.css` - Global styles with CSS variables
- `components/` - Reusable components
  - `components/ui/` - shadcn/ui primitives (59 components)
  - Other files: shared layout components
- `db/` - Database layer
  - `db/schema.ts` - Drizzle schema (users, tasks)
  - `db/index.ts` - Database client
  - `db/seed.ts` - Seed script
- `lib/` - Utilities
  - `lib/auth.ts` - Auth.js configuration
  - `lib/swagger.ts` - OpenAPI spec generator
  - `lib/task-limit.ts` - Task limit helper
  - `lib/utils.ts` - `cn()` utility
- `hooks/` - Custom hooks

### Path Aliases

- `@/*` maps to project root (e.g., `@/components/ui/button`)

## Key Conventions

### Test Attributes

All interactive elements must include `data-testid` attributes for QA automation:
```tsx
<Button data-testid="submit-button">Submit</Button>
<div data-testid="modal-container">...</div>
```

### Component Page Structure

Component pages follow this pattern:
```tsx
"use client"

import { ComponentLayout } from "@/components/component-layout"
import { SomeUIComponent } from "@/components/ui/some-component"

export default function SomePage() {
  return (
    <ComponentLayout>
      <h1 data-testid="page-title">Component Name</h1>
      <div data-testid="component-container">
        {/* Implementation */}
      </div>
    </ComponentLayout>
  )
}
```

### Styling

- Use Tailwind utility classes exclusively
- Use `cn()` for conditional class merging
- Dark mode via class-based theme switching (next-themes)
- Colors use HSL CSS variables defined in globals.css

### Adding shadcn/ui Components

The project uses shadcn/ui CLI. Configuration is in `components.json`:
- Components install to `components/ui/`
- Uses lucide-react for icons

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/callback/credentials` - Login
- `GET /api/auth/me` - Get current user (requires auth)

### Tasks (all require auth)
- `GET /api/tasks` - List user's tasks
- `POST /api/tasks` - Create task (max 30/user)
- `GET /api/tasks/:id` - Get task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/status` - Update status (drag & drop)

### Documentation
- `GET /api/docs` - Swagger UI
- `GET /api/swagger.json` - OpenAPI 3.0 spec

## Demo Users

Protected demo accounts (never deleted by cleanup):
- `testuser@upex.dev` / `Test123!`
- `admin@upex.dev` / `Admin123!`

## Environment Variables

Required in `.env.local`:
```bash
DATABASE_URL="postgres://..."  # Neon connection string
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```
