# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UPEX DOJO is a QA automation practice platform with:
- **Frontend:** Component gallery (24 UI components) for testing practice
- **Backend:** REST API with auth, tasks CRUD, OpenAPI docs
- **Database:** PostgreSQL (Neon) with multi-tenant isolation
- **Dashboard:** Kanban task board with drag & drop

Staging (Practice): `dojo.upexgalaxy.com` | Docs: `/api/docs`

## Deployment & Branching Strategy

**IMPORTANTE:** Este es un proyecto de práctica/demo para testing automatizado.

| Aspecto | Detalle |
|---------|---------|
| **Rama principal** | `staging` (rama por defecto) |
| **Rama main** | NO USAR - read-only, abandonada |
| **Deploy** | Vercel, linked a rama `staging` |
| **URL producción** | `https://dojo.upexgalaxy.com` |
| **Auto-deploy** | Sí, cada push a `staging` despliega automáticamente |

**Flujo de trabajo:**
- Siempre trabajar en `staging`
- Push directo a `staging` → deploy automático a Vercel
- NO usar PRs a `main` (rama obsoleta)

**Propósito del proyecto:**
- Demo de práctica para QA automation
- Target para tests de UI (Playwright), API y Database
- Usado por repositorios externos de automatización de pruebas

## Commands

```bash
bun install          # Install dependencies
bun run dev          # Dev server (localhost:3000)
bun run build        # Production build
bun run typecheck    # TypeScript validation
bun run lint         # ESLint

# Database
bun run db:push      # Push schema (dev)
bun run db:seed      # Seed demo users
bun run db:studio    # Drizzle Studio
bun run db:generate  # Generate migrations
bun run db:migrate   # Apply migrations
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) + React 19 |
| Language | TypeScript 5 |
| UI | shadcn/ui + Radix UI + Tailwind CSS |
| Database | PostgreSQL (Neon) + Drizzle ORM |
| Auth | Auth.js v5 (JWT + Credentials) |
| Validation | Zod |
| Drag & Drop | @dnd-kit |
| API Docs | OpenAPI 3.0 (@asteasolutions/zod-to-openapi) |

## Architecture

```
app/
├── api/                    # API Routes
│   ├── auth/               # NextAuth + register + me
│   ├── tasks/              # CRUD + status endpoint
│   ├── docs/               # Swagger UI
│   └── swagger.json/       # OpenAPI spec
├── dashboard/              # Protected routes
│   ├── components/         # TaskBoard, TaskCard, TaskColumn, TaskModal
│   └── profile/
├── login/ & register/      # Auth pages
├── components/             # Component gallery (public)
└── guide/                  # Backend integration guide

components/ui/              # shadcn/ui primitives
db/                         # Schema, client, seed, migrations
lib/                        # auth.ts, swagger.ts, task-limit.ts, utils.ts
```

## Data Model

```typescript
// Task status: 'backlog' | 'in_progress' | 'done'
// Task priority: 'low' | 'medium' | 'high'
// Limit: 30 tasks per user
```

**Tables:** `users` (id, email, passwordHash, name) → `tasks` (cascade delete)

## API Reference

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/auth/register` | POST | No | Create account |
| `/api/auth/[...nextauth]` | * | No | NextAuth handlers |
| `/api/auth/me` | GET | Yes | Current user |
| `/api/tasks` | GET | Yes | List tasks |
| `/api/tasks` | POST | Yes | Create task |
| `/api/tasks/:id` | GET/PUT/DELETE | Yes | Task CRUD |
| `/api/tasks/:id/status` | PATCH | Yes | Update status (drag&drop) |

## Demo Users (Protected)

```
testuser@upex.dev / Test123!
admin@upex.dev / Admin123!
```

## Environment Variables

```bash
DATABASE_URL="postgres://..."      # Neon connection
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret"
```

---

# Code Guidelines

## General

- Use `@/*` path aliases (e.g., `@/components/ui/button`)
- Run `bun run typecheck` before commits
- All interactive elements MUST have `data-testid` attributes

## Frontend

### Components

```tsx
"use client"  // Only when needed (hooks, events, browser APIs)

// Always include data-testid for QA automation
<Button data-testid="submit-button">Submit</Button>
<Input data-testid="email-input" />
```

### Styling

- Tailwind utility classes only (no inline styles)
- Use `cn()` from `@/lib/utils` for conditional classes
- Dark mode: class-based via `next-themes`
- Colors: HSL CSS variables in `globals.css`

### State & Forms

- `react-hook-form` + `zod` for forms
- No prop drilling: use context or server components
- Prefer server components; use `"use client"` only when necessary

### Patterns

```tsx
// Component page pattern
export default function SomePage() {
  return (
    <ComponentLayout>
      <h1 data-testid="page-title">Title</h1>
      <div data-testid="component-container">
        {/* Content */}
      </div>
    </ComponentLayout>
  )
}

// Dashboard components pattern
// Located in app/dashboard/components/
// Use @dnd-kit hooks for drag & drop
```

## Backend

### API Routes

```typescript
// Always validate with Zod
const schema = z.object({
  title: z.string().min(1).max(200),
});

// Always check authentication
const session = await auth();
if (!session?.user?.id) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

// Multi-tenant: ALWAYS filter by userId
const tasks = await db.query.tasks.findMany({
  where: eq(tasks.userId, session.user.id),
});
```

### Response Format

```typescript
// Success
return NextResponse.json({ data }, { status: 200 });

// Error
return NextResponse.json({ error: 'Message' }, { status: 4XX });

// List with meta
return NextResponse.json({
  tasks: [...],
  meta: { count, maxAllowed, remaining }
});
```

### Database

```typescript
// Use Drizzle query builder
import { db, tasks, users } from '@/db';
import { eq, and, desc } from 'drizzle-orm';

// Always use transactions for multiple writes
await db.transaction(async (tx) => {
  await tx.insert(tasks).values(data);
  await tx.update(users).set({ updatedAt: new Date() });
});
```

### Auth Pattern

```typescript
// In API routes
import { auth } from '@/lib/auth';
const session = await auth();

// In server components
import { auth } from '@/lib/auth';
const session = await auth();
if (!session) redirect('/login');

// Session type includes user.id (extended in lib/auth.ts)
```

## Security

- Validate ALL inputs with Zod
- Never expose passwordHash in responses
- Multi-tenant isolation: filter queries by `userId`
- Use `bcryptjs` for password hashing (10 rounds)
- Sanitize error messages (no stack traces in production)

## Testing Attributes

Every interactive element needs `data-testid`:

```tsx
// Naming convention: {context}-{element}-{identifier?}
data-testid="login-submit-button"
data-testid="task-card-{id}"
data-testid="column-backlog"
data-testid="task-menu-{id}"
```

## File Naming

- Components: PascalCase (`TaskCard.tsx`)
- Utilities: camelCase (`taskLimit.ts`)
- API routes: `route.ts` in folder structure
- Pages: `page.tsx` in folder structure
