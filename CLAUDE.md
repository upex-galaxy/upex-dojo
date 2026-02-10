# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UPEX DOJO is a QA automation practice platform built with Next.js 15. It provides interactive UI components designed for QA engineers to practice test automation with Playwright, Cypress, or Selenium.

## Development Commands

```bash
npm run dev       # Start development server (localhost:3000)
npm run build     # Build for production
npm start         # Start production server
npm run lint      # Run Next.js linting
```

## Technology Stack

- **Framework:** Next.js 15.2.4 with App Router
- **React:** 19
- **Language:** TypeScript 5
- **UI Components:** shadcn/ui (Radix UI + Tailwind CSS)
- **Styling:** Tailwind CSS 3.4 with CSS variables for theming
- **Forms:** react-hook-form + Zod validation
- **Icons:** lucide-react

## Architecture

### Directory Structure

- `app/` - Next.js App Router pages
  - `app/components/` - Component showcase pages organized by category (input/, feedback/, navigation/, etc.)
  - `app/layout.tsx` - Root layout with ThemeProvider
  - `app/globals.css` - Global styles with CSS variables
- `components/` - Reusable components
  - `components/ui/` - shadcn/ui primitives (59 components)
  - Other files: shared layout components (ComponentLayout, MainNav, Footer, etc.)
- `hooks/` - Custom hooks (use-toast.ts, use-mobile.tsx)
- `lib/utils.ts` - `cn()` utility for class merging (clsx + tailwind-merge)

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
