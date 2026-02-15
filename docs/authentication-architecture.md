# Authentication Architecture

Technical documentation for developers working on the UPEX DOJO authentication system.

## Table of Contents

1. [Overview](#overview)
2. [Authentication Methods](#authentication-methods)
3. [File Structure](#file-structure)
4. [Session-Based Authentication (UI)](#session-based-authentication-ui)
5. [Token-Based Authentication (API)](#token-based-authentication-api)
6. [Dual Authentication Support](#dual-authentication-support)
7. [Middleware](#middleware)
8. [Security Considerations](#security-considerations)
9. [Environment Variables](#environment-variables)
10. [Common Patterns](#common-patterns)

---

## Overview

UPEX DOJO implements a **dual authentication system** that supports both:

1. **Session-based authentication** via Auth.js v5 (for UI/browser interactions)
2. **Token-based authentication** via JWT Bearer tokens (for API/testing framework integrations)

Both methods share the same secret (`NEXTAUTH_SECRET`) and user database, ensuring consistent authentication across all entry points.

```
┌────────────────────────────────────────────────────────────────────┐
│                     Authentication Flow                             │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   UI Login Flow                    API Login Flow                   │
│   ─────────────                    ──────────────                   │
│                                                                     │
│   Browser                          Testing Framework                │
│      │                                   │                          │
│      ▼                                   ▼                          │
│   /login page                     POST /api/auth/login              │
│      │                                   │                          │
│      ▼                                   ▼                          │
│   NextAuth                         Custom JWT Endpoint              │
│   Credentials Provider                   │                          │
│      │                                   │                          │
│      ▼                                   ▼                          │
│   Session Cookie                   access_token (JWT)               │
│   (encrypted JWE)                  (signed HS256)                   │
│      │                                   │                          │
│      ▼                                   ▼                          │
│   auth() helper                    getAuthUserId()                  │
│   request.auth                     Bearer token header              │
│                                                                     │
└────────────────────────────────────────────────────────────────────┘
```

---

## Authentication Methods

### Method 1: Session-Based (UI)

| Aspect | Details |
|--------|---------|
| **Entry Point** | `/login` page form submission |
| **Handler** | NextAuth Credentials Provider |
| **Storage** | Encrypted cookie (`__Secure-authjs.session-token`) |
| **Validation** | `auth()` function or `request.auth` in middleware |
| **Expiration** | Configurable (default: 30 days) |
| **Use Case** | Browser/UI interactions |

### Method 2: Token-Based (API)

| Aspect | Details |
|--------|---------|
| **Entry Point** | `POST /api/auth/login` |
| **Handler** | Custom route with `jose` library |
| **Storage** | Client responsibility (localStorage, env var, etc.) |
| **Validation** | `getAuthUserId(request)` helper |
| **Expiration** | 24 hours (86400 seconds) |
| **Use Case** | Testing frameworks, API clients, automation |

---

## File Structure

```
lib/
└── auth.ts                    # NextAuth config + getAuthUserId helper

app/api/auth/
├── [...nextauth]/
│   └── route.ts               # NextAuth route handlers
├── login/
│   └── route.ts               # JWT login endpoint (POST)
├── register/
│   └── route.ts               # User registration (POST)
└── me/
    └── route.ts               # Current user info (GET)

middleware.ts                  # Route protection middleware
```

---

## Session-Based Authentication (UI)

### Configuration (`lib/auth.ts`)

```typescript
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // 1. Validate input with Zod
        // 2. Query user from database
        // 3. Compare password with bcrypt
        // 4. Return user object or null
        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
});
```

### Usage in Server Components

```typescript
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function ProtectedPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return <div>Welcome, {session.user.name}</div>;
}
```

### Usage in API Routes

```typescript
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // session.user.id available
}
```

---

## Token-Based Authentication (API)

### Login Endpoint (`app/api/auth/login/route.ts`)

```typescript
import { SignJWT } from 'jose';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Validate credentials against database
  const user = await validateCredentials(email, password);

  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Generate JWT
  const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);
  const token = await new SignJWT({
    id: user.id,
    email: user.email,
    name: user.name,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);

  return NextResponse.json({
    access_token: token,
    token_type: 'Bearer',
    expires_in: 86400,
  });
}
```

### Response Format

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 86400
}
```

### JWT Payload Structure

```json
{
  "id": "uuid-user-id",
  "email": "user@example.com",
  "name": "User Name",
  "iat": 1234567890,
  "exp": 1234654290
}
```

---

## Dual Authentication Support

### The `getAuthUserId` Helper

This helper function allows API routes to accept **both** session cookies and Bearer tokens:

```typescript
// lib/auth.ts

import { jwtVerify } from 'jose';

export async function getAuthUserId(request?: Request): Promise<string | null> {
  // Try Bearer token first if request is provided
  if (request) {
    const authHeader = request.headers.get('Authorization');
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      try {
        const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);
        const { payload } = await jwtVerify(token, secret);
        return payload.id as string;
      } catch {
        // Token invalid, will try session below
      }
    }
  }

  // Fall back to session cookie
  const session = await auth();
  return session?.user?.id ?? null;
}
```

### Usage in API Routes

```typescript
import { getAuthUserId } from '@/lib/auth';

export async function GET(request: Request) {
  const userId = await getAuthUserId(request);

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Works with both session cookies AND Bearer tokens
  const tasks = await db.query.tasks.findMany({
    where: eq(tasks.userId, userId),
  });

  return NextResponse.json({ tasks });
}
```

---

## Middleware

The middleware (`middleware.ts`) protects routes and handles auth redirects:

```typescript
import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

const protectedRoutes = ['/dashboard'];
const authRoutes = ['/login', '/register'];

export default auth((request) => {
  const { pathname } = request.nextUrl;
  const isLoggedIn = !!request.auth;

  // Redirect unauthenticated users to login
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !isLoggedIn) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth pages
  if (authRoutes.some(route => pathname.startsWith(route)) && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};
```

### Important Note on Auth.js v5

The middleware uses `auth()` as a wrapper (not `getToken` from `next-auth/jwt`) because Auth.js v5 uses different cookie naming conventions:

| Auth.js v5 Cookie | Legacy NextAuth Cookie |
|-------------------|------------------------|
| `__Secure-authjs.session-token` | `__Secure-next-auth.session-token` |
| `__Host-authjs.csrf-token` | `__Host-next-auth.csrf-token` |

Using `getToken` from `next-auth/jwt` will **not** work with Auth.js v5 cookies.

---

## Security Considerations

### Password Handling

- Passwords are hashed using `bcryptjs` with 10 salt rounds
- Never stored in plain text
- Never returned in API responses

```typescript
// Hashing (registration)
const passwordHash = await bcrypt.hash(password, 10);

// Verification (login)
const isValid = await bcrypt.compare(password, user.passwordHash);
```

### Multi-Tenant Data Isolation

All database queries must filter by `userId`:

```typescript
// CORRECT: Filter by authenticated user
const tasks = await db.query.tasks.findMany({
  where: eq(tasks.userId, userId),
});

// WRONG: No user filter (data leak!)
const tasks = await db.query.tasks.findMany();
```

### JWT Security

- Signed with `HS256` algorithm
- Secret: `NEXTAUTH_SECRET` environment variable
- 24-hour expiration for API tokens
- Session tokens have longer expiration (managed by NextAuth)

### Input Validation

All inputs validated with Zod before processing:

```typescript
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const parsed = loginSchema.safeParse(body);
if (!parsed.success) {
  return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
}
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `NEXTAUTH_URL` | Yes | Full URL of the application |
| `NEXTAUTH_SECRET` | Yes | Secret for JWT signing (min 32 chars) |

```bash
# .env
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
NEXTAUTH_URL="https://dojo.upexgalaxy.com"
NEXTAUTH_SECRET="your-super-secret-key-at-least-32-characters"
```

---

## Common Patterns

### Adding a New Protected API Route

```typescript
// app/api/my-resource/route.ts
import { NextResponse } from 'next/server';
import { getAuthUserId } from '@/lib/auth';
import { db, myTable } from '@/db';
import { eq } from 'drizzle-orm';

export async function GET(request: Request) {
  const userId = await getAuthUserId(request);

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = await db.query.myTable.findMany({
    where: eq(myTable.userId, userId),
  });

  return NextResponse.json({ data });
}
```

### Adding a New Protected Page

```typescript
// app/my-page/page.tsx
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function MyPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div>
      <h1>Hello, {session.user.name}</h1>
    </div>
  );
}
```

### Testing with Both Auth Methods

```bash
# Method 1: Session Cookie (browser-like)
# Login via UI, cookies automatically sent

# Method 2: Bearer Token (API/testing)
TOKEN=$(curl -s -X POST https://dojo.upexgalaxy.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"testuser@upex.dev","password":"Test123!"}' \
  | jq -r '.access_token')

curl https://dojo.upexgalaxy.com/api/tasks \
  -H "Authorization: Bearer $TOKEN"
```
