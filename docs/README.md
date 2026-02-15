# UPEX DOJO - Documentation

Technical documentation for the UPEX DOJO platform authentication and API system.

## Contents

| Document | Audience | Description |
|----------|----------|-------------|
| [Authentication Architecture](./authentication-architecture.md) | Developers | Deep dive into how authentication works, code structure, and implementation details |
| [Authentication Testing Guide](./authentication-testing-guide.md) | QA/Testers | Practical guide for testing authentication flows with examples and test cases |

## Quick Links

- **Live Site**: https://dojo.upexgalaxy.com
- **API Docs (Swagger)**: https://dojo.upexgalaxy.com/api/docs
- **OpenAPI Spec**: https://dojo.upexgalaxy.com/api/swagger.json

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        UPEX DOJO                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────┐     ┌─────────────┐     ┌─────────────┐      │
│   │   Browser   │────▶│  Next.js    │────▶│ PostgreSQL  │      │
│   │   (React)   │◀────│  API Routes │◀────│   (Neon)    │      │
│   └─────────────┘     └─────────────┘     └─────────────┘      │
│         │                   │                                   │
│         │              Auth.js v5                               │
│         │              (Session)                                │
│         │                   │                                   │
│         └───────────────────┴───────────────────────────────── │
│                             │                                   │
│   ┌─────────────────────────┴─────────────────────────────┐    │
│   │              Authentication Methods                    │    │
│   ├───────────────────────┬───────────────────────────────┤    │
│   │   UI Login (Session)  │   API Login (JWT Bearer)      │    │
│   │   - Cookie-based      │   - Token-based               │    │
│   │   - NextAuth flow     │   - POST /api/auth/login      │    │
│   └───────────────────────┴───────────────────────────────┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Test User | `testuser@upex.dev` | `Test123!` |
| Admin | `admin@upex.dev` | `Admin123!` |

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| Auth | Auth.js v5 (Credentials Provider) |
| Database | PostgreSQL (Neon) + Drizzle ORM |
| Validation | Zod |
| API Docs | OpenAPI 3.0 (Swagger UI) |
