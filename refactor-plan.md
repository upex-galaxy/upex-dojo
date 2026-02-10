# Propuesta de Implementación: Backend API para upex-dojo

> **Objetivo**: Agregar backend API con autenticación, base de datos PostgreSQL y OpenAPI spec al proyecto upex-dojo para hacerlo compatible con el boilerplate de test automation y el MCP DBHUB.

**Versión**: 3.1
**Última actualización**: 2026-02-09

---

## Resumen de Cambios

| Aspecto | v1.0 | v2.0 | v3.0 | v3.1 (actual) |
|---------|------|------|------|---------------|
| Database | SQLite + Turso | PostgreSQL + Supabase | PostgreSQL + Neon | PostgreSQL + Neon |
| CRUD UI | Solo API | Task Board | Task Board | Task Board |
| Multi-tenant | No | Sí | Sí | Sí (DB compartida) |
| Límites | No | 30 + pg_cron | 30 + Branching | **30 + GitHub Action + Reset** |
| Cleanup | N/A | pg_cron | Delete/recreate branch | **SQL cleanup cada 48h** |
| MCP Compatible | Parcial | DBHUB 100% | DBHUB 100% | DBHUB 100% |

---

## Por qué Neon sobre Supabase

| Criterio | Supabase | Neon | Ganador |
|----------|----------|------|---------|
| Proyectos gratis | 2 | **100** | Neon |
| Auto-wake tras inactividad | Manual (7 días) | **Automático** | Neon |
| Branching (reset fácil) | No en free tier | **Sí (10 branches)** | Neon |
| Usuario SQL personalizado | Complicado | **Directo** | Neon |
| PostgreSQL puro | Con capas extra | **Sí** | Neon |
| DBHub MCP compatible | Sí | **Sí** | Empate |
| Storage por proyecto | 500 MB | 500 MB | Empate |

**Decisión**: Neon es superior para nuestro caso de uso (proveer DBs a estudiantes con DBHUB MCP).

---

## Estado Actual del Proyecto

### Lo que YA tiene upex-dojo:

| Componente | Estado | Notas |
|------------|--------|-------|
| Next.js 15 + React 19 | OK | Stack moderno |
| Shadcn/Radix UI | OK | Componentes bien estructurados |
| Component Gallery | OK | 24 componentes para practicar testing |
| Drag & Drop (@dnd-kit) | OK | Ya instalado, perfecto para Kanban |
| TypeScript | OK | Tipado completo |
| Producción | OK | dojo.upexgalaxy.com |
| data-testid | OK | Ya implementados |

### Lo que FALTA (requerido por este boilerplate):

| Componente | Estado | Impacto |
|------------|--------|---------|
| API Routes | FALTA | No hay endpoints para testing API |
| OpenAPI Spec | FALTA | No se puede usar `api:sync` |
| Base de datos PostgreSQL | FALTA | DBHUB requiere SQL Authentication |
| Autenticación + Registro | FALTA | No hay login/register |
| Dashboard multi-tenant | FALTA | No hay rutas autenticadas |
| Task Board (CRUD visual) | FALTA | No hay recurso para practicar CRUD |
| Ambiente staging | FALTA | Solo existe producción |

---

## Arquitectura Propuesta

### Stack Tecnológico

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (existente)                  │
│                     Next.js 15 + React 19               │
│                   + @dnd-kit (ya instalado)             │
├─────────────────────────────────────────────────────────┤
│                    API LAYER (nuevo)                     │
│              Next.js API Routes + OpenAPI               │
├─────────────────────────────────────────────────────────┤
│                    AUTH LAYER (nuevo)                    │
│                  NextAuth.js v5 (Auth.js)               │
├─────────────────────────────────────────────────────────┤
│                   DATABASE (nuevo)                       │
│                  PostgreSQL (Neon)                      │
│                    + Drizzle ORM                         │
├─────────────────────────────────────────────────────────┤
│                   MCP INTEGRATION                        │
│              DBHUB (SQL Authentication)                  │
└─────────────────────────────────────────────────────────┘
```

### Por qué este stack:

| Tecnología | Justificación |
|------------|---------------|
| **Neon (PostgreSQL)** | 100 proyectos gratis, auto-wake, branching, PostgreSQL puro, DBHUB compatible |
| **Drizzle ORM** | Type-safe, ligero, excelente con PostgreSQL y Neon |
| **Auth.js v5** | Estándar Next.js, soporta Credentials + JWT |
| **next-swagger-doc** | Genera OpenAPI 3.0 desde API routes (ver nota de compatibilidad abajo) |
| **@dnd-kit** | Ya instalado en upex-dojo, ideal para Kanban |

### Enfoque de Base de Datos Compartida

> **Importante**: Todos los estudiantes usan la misma base de datos (branch `staging`) con el mismo connection string. La aplicación es **multi-tenant**: cada usuario solo ve sus propios datos gracias al filtro por `user_id` en todas las queries. **No se crean branches individuales por estudiante**. Esto simplifica la administración y permite que todos usen el mismo DSN en su configuración de DBHUB MCP.

### Nota sobre OpenAPI/Swagger

La librería `next-swagger-doc` puede tener problemas de compatibilidad con Next.js 15 App Router. Si esto ocurre, las alternativas son:

1. **Archivo estático**: Generar el OpenAPI spec como `public/swagger.json` y servirlo desde un API route simple
2. **Zod to OpenAPI**: Usar `@asteasolutions/zod-to-openapi` que genera specs desde schemas Zod (que ya se usan para validación de requests)

La segunda opción es preferible porque mantiene sincronizados los schemas de validación con la documentación.

---

## Diseño de la Aplicación

### Flujo de Usuario

```
┌─────────────┐     ┌─────────────┐     ┌─────────────────────────────┐
│   Landing   │────▶│   Login/    │────▶│        Dashboard            │
│    Page     │     │  Register   │     │  (Task Board + Profile)     │
│  (público)  │     │  (público)  │     │      (autenticado)          │
└─────────────┘     └─────────────┘     └─────────────────────────────┘
      │                                            │
      │                                            ▼
      │                              ┌─────────────────────────────┐
      │                              │        Task Board           │
      │                              │  ┌───────┬───────┬───────┐  │
      │                              │  │BACKLOG│IN PROG│ DONE  │  │
      │                              │  │       │       │       │  │
      │                              │  │ Task  │ Task  │ Task  │  │
      │                              │  │ Task  │       │ Task  │  │
      │                              │  └───────┴───────┴───────┘  │
      │                              │    ↑ Drag & Drop ↑         │
      │                              └─────────────────────────────┘
      ▼
┌─────────────┐
│  Component  │
│   Gallery   │
│  (público)  │
└─────────────┘
```

### Estructura de Rutas

```
/                     → Landing + Component Gallery (público)
/login                → Formulario de login (público)
/register             → Formulario de registro (público)
/dashboard            → Task Board (protegido, multi-tenant)
/dashboard/profile    → Perfil del usuario (protegido)
/api/docs             → Swagger UI (público)
/api/swagger.json     → OpenAPI spec (público)
```

### Task Board UI (Kanban)

```
┌──────────────────────────────────────────────────────────────────┐
│  My Tasks                                        [+ New Task]    │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │    BACKLOG      │  │   IN PROGRESS   │  │      DONE       │  │
│  │    (3 tasks)    │  │    (1 task)     │  │    (2 tasks)    │  │
│  ├─────────────────┤  ├─────────────────┤  ├─────────────────┤  │
│  │ ┌─────────────┐ │  │ ┌─────────────┐ │  │ ┌─────────────┐ │  │
│  │ │ Write tests │ │  │ │ Setup API   │ │  │ │ Create DB   │ │  │
│  │ │             │ │  │ │             │ │  │ │      ✓      │ │  │
│  │ │ Priority: M │ │  │ │ Priority: H │ │  │ │             │ │  │
│  │ │ [Edit][Del] │ │  │ │ [Edit][Del] │ │  │ │ [Edit][Del] │ │  │
│  │ └─────────────┘ │  │ └─────────────┘ │  │ └─────────────┘ │  │
│  │ ┌─────────────┐ │  │                 │  │ ┌─────────────┐ │  │
│  │ │ Add auth    │ │  │                 │  │ │ Design UI   │ │  │
│  │ │             │ │  │                 │  │ │      ✓      │ │  │
│  │ │ Priority: H │ │  │                 │  │ │             │ │  │
│  │ │ [Edit][Del] │ │  │                 │  │ │ [Edit][Del] │ │  │
│  │ └─────────────┘ │  │                 │  │ └─────────────┘ │  │
│  │ ┌─────────────┐ │  │                 │  │                 │  │
│  │ │ Docs update │ │  │                 │  │                 │  │
│  │ │             │ │  │                 │  │                 │  │
│  │ │ Priority: L │ │  │                 │  │                 │  │
│  │ │ [Edit][Del] │ │  │                 │  │                 │  │
│  │ └─────────────┘ │  │                 │  │                 │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
│                                                                  │
│  ────────────────────────────────────────────────────────────    │
│  Tasks: 6/30 (máximo permitido)                                  │
└──────────────────────────────────────────────────────────────────┘
```

**Características del diseño:**
- Columnas con drag & drop (usando @dnd-kit ya instalado)
- Cards con título, prioridad y acciones
- Indicador de límite de tasks (6/30)
- Modal para crear/editar tasks
- Responsive: en móvil las columnas se apilan verticalmente

---

## Modelo de Datos

### Schema de Base de Datos

```sql
-- Usuarios (multi-tenant)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tasks (pertenecen a un usuario)
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'backlog' CHECK (status IN ('backlog', 'in_progress', 'done')),
  priority VARCHAR(10) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_users_email ON users(email);
```

### Drizzle Schema (TypeScript)

```typescript
// db/schema.ts
import { pgTable, uuid, varchar, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const tasks = pgTable('tasks', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 200 }).notNull(),
  description: text('description'),
  status: varchar('status', { length: 20 }).default('backlog'),
  priority: varchar('priority', { length: 10 }).default('medium'),
  position: integer('position').default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// Type exports
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;
```

---

## API Endpoints

### Autenticación

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Crear cuenta nueva | No |
| POST | `/api/auth/login` | Iniciar sesión | No |
| POST | `/api/auth/logout` | Cerrar sesión | Sí |
| GET | `/api/auth/me` | Obtener usuario actual | Sí |

### Tasks (CRUD)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/tasks` | Listar MIS tasks | Sí |
| POST | `/api/tasks` | Crear task (max 30) | Sí |
| GET | `/api/tasks/:id` | Obtener MI task | Sí |
| PUT | `/api/tasks/:id` | Actualizar MI task | Sí |
| PATCH | `/api/tasks/:id/status` | Cambiar estado (drag&drop) | Sí |
| DELETE | `/api/tasks/:id` | Eliminar MI task | Sí |

### Documentación

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/docs` | Swagger UI | No |
| GET | `/api/swagger.json` | OpenAPI 3.0 spec | No |

### Ejemplo de Request/Response

```typescript
// POST /api/tasks
// Request
{
  "title": "Escribir tests de login",
  "description": "Automatizar el flujo de autenticación",
  "priority": "high"
}

// Response 201
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "userId": "123e4567-e89b-12d3-a456-426614174000",
  "title": "Escribir tests de login",
  "description": "Automatizar el flujo de autenticación",
  "status": "backlog",
  "priority": "high",
  "position": 0,
  "createdAt": "2026-02-09T10:30:00Z",
  "updatedAt": "2026-02-09T10:30:00Z"
}

// Error 429 (límite alcanzado)
{
  "error": "Task limit reached",
  "message": "Maximum 30 tasks per user. Delete some tasks to create new ones.",
  "currentCount": 30,
  "maxAllowed": 30
}
```

---

## Límites y Estrategia de Limpieza

### Límites por Usuario (en la aplicación)

| Límite | Valor | Propósito |
|--------|-------|-----------|
| Tasks por usuario | 30 | Evitar abuso de storage |
| Longitud título | 200 chars | UI consistency |
| Longitud descripción | 2000 chars | Razonable para tasks |

### Estrategia de Limpieza (Dos Niveles)

#### 1. Limpieza Automática con GitHub Action (Primaria)

Un workflow de GitHub Actions corre cada 48 horas y ejecuta queries de limpieza SQL:

```yaml
# .github/workflows/db-cleanup.yml
name: Database Cleanup

on:
  schedule:
    - cron: '0 3 */2 * *'  # Cada 48 horas a las 3am UTC
  workflow_dispatch:  # Permite ejecución manual

jobs:
  cleanup:
    runs-on: ubuntu-latest
    steps:
      - name: Run cleanup queries
        env:
          DATABASE_URL: ${{ secrets.NEON_STAGING_DATABASE_URL }}
        run: |
          psql "$DATABASE_URL" << 'EOF'
          -- Eliminar tasks > 48 horas (excepto de demo users)
          DELETE FROM tasks
          WHERE created_at < NOW() - INTERVAL '48 hours'
            AND user_id NOT IN (
              SELECT id FROM users
              WHERE email IN ('testuser@upex.dev', 'admin@upex.dev')
            );

          -- Eliminar usuarios > 48 horas (excepto demo users)
          DELETE FROM users
          WHERE created_at < NOW() - INTERVAL '48 hours'
            AND email NOT IN ('testuser@upex.dev', 'admin@upex.dev');

          -- Mostrar estadísticas
          SELECT 'Remaining users:' as stat, COUNT(*) as count FROM users
          UNION ALL
          SELECT 'Remaining tasks:', COUNT(*) FROM tasks;
          EOF
```

**Ventajas:**
- Limpieza gradual sin afectar datos recientes
- Los demo users y sus tasks nunca se eliminan
- Se puede ejecutar manualmente con `workflow_dispatch`
- No requiere infraestructura adicional

#### 2. Reset Completo con Neon Branching (Nuclear/Manual)

Para un reset total (restaurar a estado inicial), usamos el comando `reset` de Neon:

```
main (estado base con demo users)
  │
  ├── branch "production" ──────► dojo.upexgalaxy.com
  │
  └── branch "staging" ──────────► staging.dojo.upexgalaxy.com
        │
        └── (se resetea desde main cuando sea necesario)
```

**Comando para reset completo (preserva el connection string):**

```bash
# Reset staging al estado de main (NO cambia el connection string)
neon branches reset staging --project-id upex-dojo --parent
```

> **IMPORTANTE**: Usar `neon branches reset` en lugar de eliminar y recrear la branch. Cuando se elimina y recrea una branch, el connection string cambia porque se genera un nuevo compute endpoint, lo cual rompe la configuración de DBHUB MCP y el `.env.local` de los estudiantes. El comando `reset --parent` reemplaza todos los datos con el estado de `main` pero **preserva el connection string**.

**Cuándo usar cada estrategia:**

| Situación | Estrategia |
|-----------|------------|
| Limpieza rutinaria | GitHub Action (automático cada 48h) |
| DB muy sucia/corrompida | `neon branches reset` (manual) |
| Después de cambios en schema | `neon branches reset` (manual) |

### Usuarios Protegidos (Demo)

Estos usuarios **NUNCA se eliminan** (protegidos en seed.ts y en cleanup):

| Email | Password | Propósito |
|-------|----------|-----------|
| testuser@upex.dev | Test123! | Usuario de prueba estándar |
| admin@upex.dev | Admin123! | Usuario admin (futuro) |

**Protección en `db/seed.ts`:**

```typescript
// db/seed.ts
const PROTECTED_USERS = [
  { email: 'testuser@upex.dev', password: 'Test123!', name: 'Test User' },
  { email: 'admin@upex.dev', password: 'Admin123!', name: 'Admin User' },
];

// Estos usuarios se crean en el seed inicial y están protegidos
// contra eliminación tanto en el GitHub Action como en el reset
```

---

## Integración con DBHUB MCP

### Configuración Neon

1. **Crear proyecto en Neon** (gratis - hasta 100 proyectos)
2. **Crear branches**: `main` (base) y `staging` (práctica)
3. **Obtener connection string**:

```
postgres://usuario:password@ep-xxx-yyy.us-east-2.aws.neon.tech/neondb?sslmode=require
```

### Crear Rol SQL Dedicado para Estudiantes

```sql
-- En Neon SQL Editor
CREATE ROLE qa_student WITH LOGIN PASSWORD 'StudentPass123!';

-- Permisos de lectura y escritura
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO qa_student;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO qa_student;

-- Asegurar permisos para tablas futuras
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO qa_student;
```

### Connection String para Estudiantes

```
postgres://qa_student:StudentPass123!@ep-cool-rain-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
```

### Archivo dbhub.toml para este proyecto

```toml
# dbhub.toml (para conectar desde este boilerplate)
[[databases]]
id = "upex-dojo"
dsn = "postgres://qa_student:StudentPass123!@ep-cool-rain-123456.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

### Configuración MCP (usando DSN directamente)

```json
{
  "mcpServers": {
    "upex-dojo-db": {
      "command": "npx",
      "args": [
        "@bytebase/dbhub@latest",
        "--dsn",
        "postgres://qa_student:StudentPass123!@ep-cool-rain-123456.us-east-2.aws.neon.tech/neondb?sslmode=require"
      ]
    }
  }
}
```

### Configuración MCP Multi-DB (TOML)

```toml
# dbhub.toml - múltiples bases de datos
[[databases]]
id = "upex-dojo-staging"
dsn = "postgres://qa_student:pass@ep-staging.neon.tech/neondb?sslmode=require"

[[databases]]
id = "upex-dojo-local"
dsn = "postgres://postgres:pass@localhost:5432/upex_dojo"

[[databases]]
id = "demo-sqlite"
dsn = "sqlite:///./demo.db"
```

---

## Configuración de Ambientes

### Estructura de Ambientes

| Ambiente | URL App | URL API | Database (Neon Branch) | Propósito |
|----------|---------|---------|------------------------|-----------|
| Local | localhost:3000 | localhost:3000/api | Branch `dev` o local PG | Desarrollo |
| Staging | staging.dojo.upexgalaxy.com | staging.dojo.upexgalaxy.com/api | Branch `staging` | QA/Testing |
| Production | dojo.upexgalaxy.com | dojo.upexgalaxy.com/api | Branch `production` | Producción |

### Consideración: Cold Start de Neon

> **Nota sobre latencia inicial**: Neon free tier usa scale-to-zero. La primera conexión después de un periodo de inactividad puede tardar entre **500ms y 2 segundos** (cold start). Esto es comportamiento normal y no indica un error. Las conexiones subsiguientes serán inmediatas mientras el compute permanezca activo.

### Variables de Entorno

```bash
# .env.local (desarrollo)
DATABASE_URL="postgres://user:pass@ep-dev.us-east-2.aws.neon.tech/neondb?sslmode=require"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="dev-secret-change-in-production"

# .env.staging (Vercel Environment Variables)
DATABASE_URL="postgres://user:pass@ep-staging.us-east-2.aws.neon.tech/neondb?sslmode=require"
NEXTAUTH_URL="https://staging.dojo.upexgalaxy.com"
NEXTAUTH_SECRET="staging-secret-key"

# .env.production
DATABASE_URL="postgres://user:pass@ep-prod.us-east-2.aws.neon.tech/neondb?sslmode=require"
NEXTAUTH_URL="https://dojo.upexgalaxy.com"
NEXTAUTH_SECRET="production-secret-key"
```

### Actualización en este Boilerplate

```typescript
// config/variables.ts
const envDataMap: Record<Environment, { base: string, api: string, user: {...} }> = {
  local: {
    base: 'http://localhost:3000',
    api: 'http://localhost:3000/api',
    user: userCredentialsMap.local,
  },
  devstage: {
    base: 'https://staging.dojo.upexgalaxy.com',
    api: 'https://staging.dojo.upexgalaxy.com/api',
    user: userCredentialsMap.devstage,
  },
};
```

```bash
# .env de este boilerplate
LOCAL_USER_EMAIL=testuser@upex.dev
LOCAL_USER_PASSWORD=Test123!

DEVSTAGE_USER_EMAIL=testuser@upex.dev
DEVSTAGE_USER_PASSWORD=Test123!
```

---

## Estructura de Archivos (upex-dojo)

### Nuevos Archivos (~25 archivos)

```
upex-dojo/
├── .github/
│   └── workflows/
│       └── db-cleanup.yml     # Limpieza automática cada 48h
│
├── db/
│   ├── schema.ts              # Drizzle schema (users, tasks)
│   ├── index.ts               # Database client (Neon serverless)
│   ├── seed.ts                # Demo users + sample tasks (protegidos)
│   └── migrations/            # Drizzle migrations
│
├── lib/
│   ├── auth.ts                # Auth.js configuration
│   ├── swagger.ts             # OpenAPI spec generator
│   └── task-limit.ts          # Task limit checker (máximo 30 tasks por usuario)
│
├── middleware.ts              # Route protection
│
├── app/
│   ├── login/
│   │   └── page.tsx           # Login form
│   ├── register/
│   │   └── page.tsx           # Register form
│   ├── dashboard/
│   │   ├── layout.tsx         # Protected layout
│   │   ├── page.tsx           # Task Board (Kanban)
│   │   ├── profile/
│   │   │   └── page.tsx       # User profile
│   │   └── components/
│   │       ├── TaskBoard.tsx  # Kanban board
│   │       ├── TaskColumn.tsx # Single column
│   │       ├── TaskCard.tsx   # Draggable card
│   │       └── TaskModal.tsx  # Create/Edit modal
│   │
│   └── api/
│       ├── auth/
│       │   ├── [...nextauth]/route.ts
│       │   ├── register/route.ts
│       │   └── me/route.ts
│       ├── tasks/
│       │   ├── route.ts           # GET (list), POST (create)
│       │   └── [id]/
│       │       ├── route.ts       # GET, PUT, DELETE
│       │       └── status/route.ts # PATCH (drag&drop)
│       ├── docs/route.ts          # Swagger UI
│       └── swagger.json/route.ts  # OpenAPI spec
│
├── drizzle.config.ts          # Drizzle configuration
├── .env.example               # Environment template
└── .env.local                 # Local environment (gitignored)
```

### Nuevas Dependencias (~10)

```json
{
  "dependencies": {
    "drizzle-orm": "^0.38.x",
    "@neondatabase/serverless": "^0.10.x",
    "next-auth": "^5.x",
    "bcryptjs": "^2.4.x",
    "next-swagger-doc": "^0.4.x",
    "swagger-ui-react": "^5.x",
    "zod": "latest"
  },
  "devDependencies": {
    "drizzle-kit": "^0.30.x",
    "@types/bcryptjs": "^2.4.x"
  }
}
```

---

## Diseño UI (Especificaciones)

### Paleta de Colores (consistente con upex-dojo actual)

```css
/* Mantener el tema actual de upex-dojo */
--primary: hsl(220, 90%, 56%);      /* Azul UPEX */
--secondary: hsl(280, 85%, 65%);    /* Morado accent */
--background: hsl(0, 0%, 100%);     /* Blanco */
--card: hsl(0, 0%, 98%);            /* Gris muy claro */
--muted: hsl(0, 0%, 96%);           /* Gris claro */

/* Estados de tasks */
--backlog: hsl(220, 14%, 96%);      /* Gris neutro */
--in-progress: hsl(45, 93%, 47%);   /* Amarillo/Naranja */
--done: hsl(142, 76%, 36%);         /* Verde */

/* Prioridades */
--priority-low: hsl(142, 76%, 36%);  /* Verde */
--priority-medium: hsl(45, 93%, 47%);/* Amarillo */
--priority-high: hsl(0, 84%, 60%);   /* Rojo */
```

### Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| Mobile (<640px) | Columnas apiladas verticalmente, tabs para cambiar |
| Tablet (640-1024px) | 3 columnas side-by-side, compactas |
| Desktop (>1024px) | 3 columnas full-width con espacio |

### Componentes UI (Shadcn)

Usar los componentes de Shadcn ya instalados:
- `Card` para TaskCard
- `Button` para acciones
- `Dialog` para TaskModal
- `Input` + `Textarea` para formularios
- `Badge` para prioridades y estados
- `DropdownMenu` para acciones de task

---

## Plan de Implementación

### Fase 1: Setup Base de Datos Neon (1 día)

1. Crear proyecto en Neon
2. Crear branches: `main`, `staging`, `dev`
3. Configurar Drizzle ORM con `@neondatabase/serverless`
4. Crear schema y migraciones
5. Seed con demo users en branch `main`
6. Probar conexión con DBHUB MCP

### Fase 2: Autenticación (1-2 días)

1. Configurar Auth.js con Credentials
2. Crear páginas login/register
3. Implementar middleware de protección
4. API endpoints de auth

### Fase 3: API Tasks + OpenAPI (1-2 días)

1. CRUD endpoints para tasks
2. Validación con Zod
3. Límite de 30 tasks por usuario
4. Documentación OpenAPI con JSDoc
5. Swagger UI

### Fase 4: Task Board UI (2-3 días)

1. Layout de dashboard
2. Componente TaskBoard con @dnd-kit
3. TaskColumn y TaskCard
4. Modal de crear/editar
5. Drag & drop entre columnas
6. Diseño responsive
7. Indicador de límite (X/30)

### Fase 5: Deploy + Testing (1 día)

1. Deploy a Vercel (staging)
2. Configurar variables de entorno
3. Probar flujo completo
4. Crear rol SQL para estudiantes
5. Documentar connection string para DBHUB
6. Actualizar boilerplate para apuntar a staging

**Total estimado: 6-9 días**

---

## Escenarios de Testing Habilitados

Una vez implementado, el boilerplate podrá probar:

### E2E Tests
- [ ] Registro de nuevo usuario
- [ ] Login con credenciales válidas
- [ ] Login con credenciales inválidas
- [ ] Crear task en el board
- [ ] Editar task existente
- [ ] Eliminar task
- [ ] Drag & drop entre columnas
- [ ] Logout

### API Tests
- [ ] POST /api/auth/register
- [ ] POST /api/auth/login
- [ ] GET /api/auth/me (con y sin token)
- [ ] GET /api/tasks (listar)
- [ ] POST /api/tasks (crear)
- [ ] PUT /api/tasks/:id (actualizar)
- [ ] PATCH /api/tasks/:id/status (cambiar estado)
- [ ] DELETE /api/tasks/:id (eliminar)
- [ ] Límite de 30 tasks (error 429)

### Database Validation (DBHUB MCP)
- [ ] Verificar usuario creado después de registro
- [ ] Verificar task creado con datos correctos
- [ ] Verificar cascade delete (usuario → tasks)
- [ ] Query directa a las tablas

---

## Diagrama de Arquitectura Final

```
┌─────────────────────────────────────────────────────────────────┐
│                         USUARIOS                                 │
│                    (Testers / Estudiantes)                      │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    UPEX DOJO (Next.js)                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │   Landing   │  │   Login/    │  │       Dashboard         │ │
│  │    Page     │  │  Register   │  │  ┌─────────────────┐    │ │
│  │             │  │             │  │  │   Task Board    │    │ │
│  │  Component  │  │  Auth.js    │  │  │   (Kanban)      │    │ │
│  │   Gallery   │  │  Credentials│  │  │   @dnd-kit     │    │ │
│  └─────────────┘  └─────────────┘  │  └─────────────────┘    │ │
│                                     └─────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│                      API ROUTES                                  │
│  /api/auth/*  │  /api/tasks/*  │  /api/docs  │  /api/swagger   │
├─────────────────────────────────────────────────────────────────┤
│                     DRIZZLE ORM                                  │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                     NEON (PostgreSQL)                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    PROJECT: upex-dojo                     │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────────────┐  │  │
│  │  │   main     │  │  staging   │  │    production      │  │  │
│  │  │  (base)    │  │ (práctica) │  │   (producción)     │  │  │
│  │  │            │  │            │  │                    │  │  │
│  │  │ demo users │──│ se resetea │  │   datos reales     │  │  │
│  │  │   only     │  │ desde main │  │                    │  │  │
│  │  └────────────┘  └────────────┘  └────────────────────┘  │  │
│  │                                                           │  │
│  │  Roles: postgres (admin), qa_student (para DBHUB)        │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    TEST AUTOMATION BOILERPLATE                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐│
│  │ E2E Tests│  │API Tests │  │  DBHUB   │  │   Allure         ││
│  │Playwright│  │   HTTP   │  │   MCP    │  │   Reports        ││
│  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

---

## Próximos Pasos

1. **Revisar y aprobar** esta propuesta
2. **Crear cuenta/proyecto Neon** (gratis)
3. **Crear branch** `feature/backend-api` en upex-dojo
4. **Implementar** fases 1-5
5. **Crear rol** `qa_student` para estudiantes
6. **Configurar GitHub Secret** `NEON_STAGING_DATABASE_URL` para el workflow de cleanup
7. **Documentar** connection string para DBHUB
8. **Actualizar** este boilerplate con las nuevas URLs/credenciales
9. **Escribir tests** que validen la integración

---

## Resumen Ejecutivo

| Aspecto | Decisión |
|---------|----------|
| **Base de datos** | Neon PostgreSQL |
| **Por qué Neon** | 100 proyectos gratis, auto-wake, branching, PostgreSQL puro |
| **Enfoque DB** | DB compartida (staging) - todos los estudiantes usan el mismo DSN |
| **Funcionalidad CRUD** | Task Board Kanban (drag & drop) |
| **Multi-tenant** | Sí, cada usuario ve solo sus tasks (filtro por user_id) |
| **Límites** | 30 tasks por usuario (en código) |
| **Limpieza primaria** | GitHub Action cada 48h (SQL cleanup) |
| **Reset completo** | `neon branches reset --parent` (preserva connection string) |
| **MCP compatible** | DBHUB con DSN postgres:// estándar |
| **Tiempo estimado** | 6-9 días de desarrollo |

---

---

## Nota Técnica: Uso de Bun

> **IMPORTANTE**: Este proyecto utiliza **bun** como package manager y runtime en lugar de npm/pnpm.

### Comandos con Bun

```bash
# Instalación de dependencias
bun install

# Scripts de desarrollo
bun run dev       # Start development server
bun run build     # Build for production
bun start         # Start production server
bun run lint      # Run linting

# Scripts de base de datos
bun run db:generate   # Generar migraciones
bun run db:migrate    # Aplicar migraciones
bun run db:push       # Push schema directo (dev)
bun run db:seed       # Seed con demo users
bun run db:studio     # Abrir Drizzle Studio
```

---

**Autor**: Claude Code
**Fecha**: 2026-02-09
**Estado**: PROPUESTA v3.1 - Pendiente de aprobación
