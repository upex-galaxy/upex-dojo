# UPEX DOJO

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**QA Automation Practice Platform** - A training ground for QA engineers to practice UI and API automation testing.

> **Live Demo:** [dojo.upexgalaxy.com](https://dojo.upexgalaxy.com) | **API Docs:** [/api/docs](https://dojo.upexgalaxy.com/api/docs)

---

## What is UPEX DOJO?

UPEX DOJO is a full-stack web application designed specifically for QA automation practice. It provides:

- **24 UI Components** - Buttons, forms, tables, modals, and more for UI testing
- **REST API** - Full CRUD operations with OpenAPI documentation for API testing
- **Authentication** - Login/Register flows to practice auth testing
- **Dashboard** - Kanban board with drag & drop for complex interaction testing

Perfect for practicing with **Playwright**, **Cypress**, **Selenium**, **Postman**, or any automation tool.

---

## Quick Start

### Demo Credentials

Use these credentials to login immediately:

| Email | Password |
|-------|----------|
| `testuser@upex.dev` | `Test123!` |

### Run Locally

```bash
# Clone the repository
git clone https://github.com/upex-galaxy/upex-dojo.git
cd upex-dojo

# Install dependencies (requires Bun)
bun install

# Set environment variables
cp .env.example .env.local
# Edit .env.local with your database URL

# Start development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

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
| API Docs | OpenAPI 3.0 (Swagger UI) |

---

## Available Components (24)

Practice your automation skills with these UI components:

### Input Components
| Component | Path | Description |
|-----------|------|-------------|
| Buttons | `/components/input/buttons` | Various button styles and states |
| Text Fields | `/components/input/text-fields` | Input validation, placeholders |
| Checkboxes | `/components/input/checkboxes` | Single and grouped checkboxes |
| Radio Buttons | `/components/input/radio-buttons` | Radio groups |
| Toggle Buttons | `/components/input/toggle-buttons` | On/off switches |
| Sliders | `/components/input/sliders` | Range inputs |
| Dropdown Menus | `/components/input/dropdown-menus` | Select components |
| Multi-Select | `/components/input/multi-select-dropdowns` | Multiple selection |
| Autocomplete | `/components/input/autocomplete-fields` | Search with suggestions |
| Date Pickers | `/components/input/date-pickers` | Calendar inputs |
| File Uploads | `/components/input/file-uploads` | File input handling |
| Dynamic Forms | `/components/input/dynamic-forms` | Form arrays, add/remove fields |

### Feedback Components
| Component | Path | Description |
|-----------|------|-------------|
| Modals | `/components/feedback/modals` | Dialogs and alerts |
| Toast Notifications | `/components/feedback/toast-notifications` | Temporary messages |
| Progress Bars | `/components/feedback/progress-bars` | Loading indicators |
| Tooltips | `/components/feedback/tooltips` | Hover information |

### Data & Layout
| Component | Path | Description |
|-----------|------|-------------|
| Tables | `/components/data/tables` | Data grids with sorting |
| Accordions | `/components/layout/accordions` | Collapsible sections |
| Carousels | `/components/media/carousels` | Image sliders |

### Navigation
| Component | Path | Description |
|-----------|------|-------------|
| Menus | `/components/navigation/menus` | Navigation menus |
| Pagination | `/components/navigation/pagination` | Page navigation |

### Interaction
| Component | Path | Description |
|-----------|------|-------------|
| Drag and Drop | `/components/interaction/drag-and-drop` | Sortable lists |
| File Downloads | `/components/interaction/file-downloads` | Download triggers |

### Forms
| Component | Path | Description |
|-----------|------|-------------|
| Shipping Form | `/components/forms/shipping-information` | Complex form validation |

---

## API Reference

Full REST API for practicing API automation. See interactive docs at [`/api/docs`](https://dojo.upexgalaxy.com/api/docs).

### Authentication

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/auth/register` | POST | No | Create new account |
| `/api/auth/[...nextauth]` | * | No | NextAuth.js handlers (login/logout) |
| `/api/auth/me` | GET | Yes | Get current user info |

### Tasks (CRUD)

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/tasks` | GET | Yes | List all user tasks |
| `/api/tasks` | POST | Yes | Create new task |
| `/api/tasks/:id` | GET | Yes | Get task by ID |
| `/api/tasks/:id` | PUT | Yes | Update task |
| `/api/tasks/:id` | DELETE | Yes | Delete task |
| `/api/tasks/:id/status` | PATCH | Yes | Update task status only |

### Request Examples

```bash
# Register
curl -X POST https://dojo.upexgalaxy.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "Test123!", "name": "Test"}'

# Login (get session)
curl -X POST https://dojo.upexgalaxy.com/api/auth/callback/credentials \
  -H "Content-Type: application/json" \
  -d '{"email": "testuser@upex.dev", "password": "Test123!"}'

# Create task (with auth cookie)
curl -X POST https://dojo.upexgalaxy.com/api/tasks \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=..." \
  -d '{"title": "My Task", "status": "backlog", "priority": "medium"}'
```

---

## Project Structure

```
upex-dojo/
├── app/
│   ├── api/                    # REST API routes
│   │   ├── auth/               # Authentication endpoints
│   │   ├── tasks/              # Task CRUD endpoints
│   │   ├── docs/               # Swagger UI
│   │   └── swagger.json/       # OpenAPI spec
│   ├── components/             # UI Component gallery (24 pages)
│   ├── dashboard/              # Protected Kanban board
│   ├── login/                  # Login page
│   ├── register/               # Register page
│   └── guide/                  # Backend integration guide
├── components/ui/              # shadcn/ui primitives
├── db/                         # Database schema & seed
├── lib/                        # Utilities (auth, swagger, etc.)
└── public/                     # Static assets
```

---

## Environment Variables

Create a `.env.local` file:

```bash
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

---

## Scripts

```bash
bun install          # Install dependencies
bun run dev          # Start dev server (localhost:3000)
bun run build        # Production build
bun run start        # Start production server
bun run typecheck    # TypeScript validation
bun run lint         # ESLint

# Database
bun run db:push      # Push schema changes
bun run db:seed      # Seed demo users
bun run db:studio    # Open Drizzle Studio
bun run db:generate  # Generate migrations
bun run db:migrate   # Run migrations
```

---

## Testing Attributes

All interactive elements have `data-testid` attributes for easy automation:

```typescript
// Examples
data-testid="login-submit-button"
data-testid="task-card-{id}"
data-testid="column-backlog"
data-testid="demo-credentials-banner"
data-testid="copy-email-button"
```

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Links

- **Live App:** [dojo.upexgalaxy.com](https://dojo.upexgalaxy.com)
- **API Docs:** [dojo.upexgalaxy.com/api/docs](https://dojo.upexgalaxy.com/api/docs)
- **GitHub:** [github.com/upex-galaxy](https://github.com/upex-galaxy)
- **UPEX Galaxy:** [upexgalaxy.com](https://www.upexgalaxy.com)

---

Made with love by [UPEX Galaxy](https://www.upexgalaxy.com)
