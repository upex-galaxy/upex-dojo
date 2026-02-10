# Phase 1: Database Setup - Implementation Summary

**Date**: 2026-02-09
**Status**: Completed

## What was implemented

### 1. Package Manager Migration
- Migrated from npm/pnpm to **bun** as package manager
- Updated `package.json` with bun-compatible scripts

### 2. Database Dependencies
- Added `drizzle-orm` (^0.38.3) - Type-safe ORM
- Added `@neondatabase/serverless` (^0.10.4) - Neon PostgreSQL driver
- Added `drizzle-kit` (^0.30.1) - Migration toolkit
- Added `bcryptjs` (^2.4.3) - Password hashing

### 3. Database Schema (`db/schema.ts`)
- **users** table: id, email, passwordHash, name, timestamps
- **tasks** table: id, userId, title, description, status, priority, position, timestamps
- Cascade delete: tasks deleted when user is deleted
- Type exports: User, NewUser, Task, NewTask, TaskStatus, TaskPriority

### 4. Database Client (`db/index.ts`)
- Neon serverless HTTP driver configuration
- Drizzle ORM instance with schema

### 5. Drizzle Configuration (`drizzle.config.ts`)
- PostgreSQL dialect
- Migrations output to `db/migrations/`
- Strict mode enabled

### 6. Seed Script (`db/seed.ts`)
- Protected demo users:
  - `testuser@upex.dev` / `Test123!`
  - `admin@upex.dev` / `Admin123!`
- 5 sample tasks per user
- Idempotent (uses onConflictDoNothing)

### 7. Task Limit Helper (`lib/task-limit.ts`)
- `MAX_TASKS_PER_USER = 30`
- `hasReachedTaskLimit()` - Check if limit reached
- `getTaskCount()` - Get current count
- `taskLimitError()` - Standard error response

### 8. Database Cleanup Workflow (`.github/workflows/db-cleanup.yml`)
- Runs every 48 hours (3am UTC)
- Deletes old tasks and users (>48h)
- Protects demo users from deletion
- Manual trigger available

### 9. Environment Template (`.env.example`)
- DATABASE_URL placeholder
- NEXTAUTH_URL and NEXTAUTH_SECRET placeholders

## New Scripts
```bash
bun run db:generate   # Generate migrations
bun run db:migrate    # Apply migrations
bun run db:push       # Push schema directly
bun run db:seed       # Seed demo data
bun run db:studio     # Open Drizzle Studio
```

## Files Created
- `db/schema.ts`
- `db/index.ts`
- `db/seed.ts`
- `drizzle.config.ts`
- `lib/task-limit.ts`
- `.env.example`
- `.github/workflows/db-cleanup.yml`

## Next Steps
- Phase 2: Implement authentication with Auth.js v5
