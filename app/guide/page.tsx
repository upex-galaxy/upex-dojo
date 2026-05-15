"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Database,
  Server,
  Globe,
  Key,
  Terminal,
  FileJson,
  ExternalLink,
  CheckCircle2,
  Copy,
  BookOpen,
  TestTube2,
} from "lucide-react";
import { useState } from "react";

function CodeBlock({ code, language = "bash" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group" data-testid="code-block">
      <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-sm">
        <code className={`language-${language}`}>{code}</code>
      </pre>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={handleCopy}
        data-testid="copy-code-button"
      >
        {copied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  );
}

function ArchitectureDiagram() {
  return (
    <div className="w-full py-8" data-testid="architecture-diagram">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
        {/* Frontend */}
        <div className="flex flex-col items-center">
          <div className="w-32 h-24 bg-blue-100 dark:bg-blue-950 border-2 border-blue-500 rounded-lg flex flex-col items-center justify-center">
            <Globe className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium mt-1">Frontend</span>
          </div>
          <span className="text-xs text-muted-foreground mt-2">Next.js 15</span>
        </div>

        {/* Arrow */}
        <div className="hidden md:block text-3xl text-muted-foreground">→</div>
        <div className="md:hidden text-3xl text-muted-foreground">↓</div>

        {/* API */}
        <div className="flex flex-col items-center">
          <div className="w-32 h-24 bg-purple-100 dark:bg-purple-950 border-2 border-purple-500 rounded-lg flex flex-col items-center justify-center">
            <Server className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium mt-1">API Routes</span>
          </div>
          <span className="text-xs text-muted-foreground mt-2">Auth.js + REST</span>
        </div>

        {/* Arrow */}
        <div className="hidden md:block text-3xl text-muted-foreground">→</div>
        <div className="md:hidden text-3xl text-muted-foreground">↓</div>

        {/* Database */}
        <div className="flex flex-col items-center">
          <div className="w-32 h-24 bg-emerald-100 dark:bg-emerald-950 border-2 border-emerald-500 rounded-lg flex flex-col items-center justify-center">
            <Database className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium mt-1">Database</span>
          </div>
          <span className="text-xs text-muted-foreground mt-2">PostgreSQL (Neon)</span>
        </div>
      </div>

      {/* MCP Connections */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8 pt-8 border-t border-dashed">
        <div className="text-center">
          <Badge variant="outline" className="mb-2">OpenAPI MCP</Badge>
          <p className="text-xs text-muted-foreground">Conecta con la API</p>
        </div>
        <div className="text-center">
          <Badge variant="outline" className="mb-2">DBHub MCP</Badge>
          <p className="text-xs text-muted-foreground">Conecta con la Database</p>
        </div>
      </div>
    </div>
  );
}

export default function GuidePage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-12" data-testid="guide-page">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <BookOpen className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold" data-testid="guide-title">
            Backend Integration Guide
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Aprende a conectar con la API y Base de Datos de UPEX DOJO usando MCP servers
        </p>
      </div>

      {/* Credentials CTA — high-visibility banner */}
      <Card
        className="mb-8 border-2 border-amber-500/70 bg-amber-50 dark:bg-amber-950/30"
        data-testid="credentials-cta-card"
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            ¿Necesitás las credenciales para hacer testing?
          </CardTitle>
          <CardDescription>
            Las credenciales reales (Base de Datos, API, UI) viven en una épica de Jira con
            acceso restringido a QA. Cada credencial está en su propio snippet con botón de
            copia.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            asChild
            size="lg"
            className="w-full md:w-auto bg-amber-600 hover:bg-amber-700 text-white"
            data-testid="credentials-jira-button"
          >
            <Link
              href="https://jira.upexgalaxy.com/browse/OB-111"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Key className="h-5 w-5 mr-2" />
              Ver credenciales en Jira
              <ExternalLink className="h-4 w-4 ml-2" />
            </Link>
          </Button>
          <p className="mt-3 text-xs text-muted-foreground">
            Si no tenés acceso al ticket en Jira, solicitalo a tu instructor o al canal de
            onboarding de UPEX.
          </p>
        </CardContent>
      </Card>

      {/* Architecture Diagram Card */}
      <Card className="mb-8" data-testid="architecture-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Arquitectura del Sistema
          </CardTitle>
          <CardDescription>
            Visualiza cómo se conectan los componentes del backend
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ArchitectureDiagram />
        </CardContent>
      </Card>

      {/* CTA Button */}
      <div className="flex justify-center mb-8">
        <Button asChild size="lg" data-testid="api-docs-button">
          <Link href="/api/docs" target="_blank">
            <FileJson className="h-5 w-5 mr-2" />
            Ver Documentación API (Swagger)
            <ExternalLink className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </div>

      {/* Accordions */}
      <Accordion type="multiple" className="space-y-4" data-testid="guide-accordions">

        {/* Section 1: Architecture */}
        <AccordionItem value="architecture" className="border rounded-lg px-4">
          <AccordionTrigger className="text-lg font-semibold" data-testid="accordion-architecture">
            <span className="flex items-center gap-2">
              <Server className="h-5 w-5 text-purple-500" />
              Arquitectura del Backend
            </span>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pb-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Stack Tecnológico</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Framework</span>
                    <Badge variant="secondary">Next.js 15</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Database</span>
                    <Badge variant="secondary">PostgreSQL (Neon)</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ORM</span>
                    <Badge variant="secondary">Drizzle</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Auth</span>
                    <Badge variant="secondary">Auth.js v5</Badge>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Multi-tenancy</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>Cada usuario solo puede ver y modificar sus propios datos.
                  Todas las queries filtran por <code className="bg-muted px-1 rounded">user_id</code>.</p>
                  <p className="mt-2">Límite: <strong>30 tasks</strong> por usuario.</p>
                </CardContent>
              </Card>
            </div>
            <div className="text-sm text-muted-foreground">
              <p><strong>Tablas principales:</strong></p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><code className="bg-muted px-1 rounded">users</code> - Usuarios registrados</li>
                <li><code className="bg-muted px-1 rounded">tasks</code> - Tareas del Kanban board</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Section 2: Database Connection */}
        <AccordionItem value="database" className="border rounded-lg px-4">
          <AccordionTrigger className="text-lg font-semibold" data-testid="accordion-database">
            <span className="flex items-center gap-2">
              <Database className="h-5 w-5 text-emerald-500" />
              Conexión a Base de Datos (DBHub MCP)
            </span>
          </AccordionTrigger>
          <AccordionContent className="space-y-6 pb-4">
            {/* Prerequisites */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Prerequisitos
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                <li>Node.js o Bun instalado</li>
                <li>Claude Code configurado</li>
                <li>Connection string de la base de datos</li>
              </ul>
            </div>

            {/* Credentials callout */}
            <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/30 p-4 text-sm">
              <p className="font-semibold flex items-center gap-2">
                <Key className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                Dónde obtener las credenciales reales
              </p>
              <p className="mt-1 text-muted-foreground">
                El usuario <code className="bg-muted px-1 rounded">qa_student</code> es{" "}
                <strong>read-only</strong> sobre las tablas <code>users</code> y{" "}
                <code>tasks</code>. El host real, el password y el connection string completo
                están en{" "}
                <Link
                  href="https://jira.upexgalaxy.com/browse/OB-111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline"
                  data-testid="db-credentials-link"
                >
                  Jira
                </Link>
                .
              </p>
            </div>

            {/* Step 1 */}
            <div>
              <h4 className="font-semibold mb-2">1. Crear archivo de configuración</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Crea un archivo <code className="bg-muted px-1 rounded">dbhub.toml</code> en tu
                proyecto (reemplazá los valores marcados con{" "}
                <code className="bg-muted px-1 rounded">&lt;ver Jira&gt;</code> con los reales):
              </p>
              <CodeBlock
                language="toml"
                code={`[[sources]]
id = "upex-dojo"
type = "postgresql"
host = "<ver Jira>"
port = 5432
database = "neondb"
user = "qa_student"
password = "<ver Jira>"
sslmode = "require"`}
              />
            </div>

            {/* Step 2 */}
            <div>
              <h4 className="font-semibold mb-2">2. Configurar MCP en Claude Code</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Agrega la configuración en tu archivo <code className="bg-muted px-1 rounded">.mcp.json</code>:
              </p>
              <CodeBlock
                language="json"
                code={`{
  "mcpServers": {
    "upex-dojo-db": {
      "command": "bunx",
      "args": [
        "-y",
        "@bytebase/dbhub@latest",
        "--config",
        "/ruta/absoluta/dbhub.toml"
      ]
    }
  }
}`}
              />
            </div>

            {/* Step 3 */}
            <div>
              <h4 className="font-semibold mb-2">3. Probar la conexión</h4>
              <CodeBlock code="bunx @bytebase/dbhub@latest --config dbhub.toml" />
              <p className="text-sm text-muted-foreground mt-2">
                Deberías ver: <code className="bg-muted px-1 rounded">DBHub MCP Server running on stdio</code>
              </p>
            </div>

            {/* Example queries */}
            <div>
              <h4 className="font-semibold mb-2">Ejemplos de queries en Claude</h4>
              <div className="bg-muted/50 p-4 rounded-lg text-sm space-y-2">
                <p>• &ldquo;Muéstrame todas las tablas de la base de datos&rdquo;</p>
                <p>• &ldquo;¿Cuántos usuarios hay registrados?&rdquo;</p>
                <p>• &ldquo;Lista las tasks del usuario con email testuser@upex.dev&rdquo;</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Section 3: API Authentication */}
        <AccordionItem value="api" className="border rounded-lg px-4">
          <AccordionTrigger className="text-lg font-semibold" data-testid="accordion-api">
            <span className="flex items-center gap-2">
              <Key className="h-5 w-5 text-amber-500" />
              Autenticación API (OpenAPI MCP)
            </span>
          </AccordionTrigger>
          <AccordionContent className="space-y-6 pb-4">
            {/* Credentials callout */}
            <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/30 p-4 text-sm">
              <p className="font-semibold flex items-center gap-2">
                <Key className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                Credenciales centralizadas
              </p>
              <p className="mt-1 text-muted-foreground">
                Las URLs de endpoints (staging y local), los bodies de login y los demo users
                están listados en{" "}
                <Link
                  href="https://jira.upexgalaxy.com/browse/OB-111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline"
                  data-testid="api-credentials-link"
                >
                  Jira
                </Link>
                , cada uno en su propio snippet con botón de copia.
              </p>
            </div>

            {/* How it works */}
            <div>
              <h4 className="font-semibold mb-2">Cómo funciona</h4>
              <p className="text-sm text-muted-foreground">
                El OpenAPI MCP lee el spec de la API y genera herramientas dinámicas para cada endpoint.
                Necesitas un token JWT para acceder a los endpoints protegidos.
              </p>
            </div>

            {/* Step 1: Get token */}
            <div>
              <h4 className="font-semibold mb-2">1. Obtener token de autenticación</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Primero, haz login para obtener un JWT token:
              </p>
              <CodeBlock
                language="bash"
                code={`curl -X POST http://localhost:3000/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email": "testuser@upex.dev", "password": "Test123!"}'`}
              />
              <p className="text-sm text-muted-foreground mt-3 mb-2">
                Respuesta:
              </p>
              <CodeBlock
                language="json"
                code={`{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 86400
}`}
              />
            </div>

            {/* Step 2: Use token */}
            <div>
              <h4 className="font-semibold mb-2">2. Usar el token en requests</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Usa el <code className="bg-muted px-1 rounded">access_token</code> en el header Authorization:
              </p>
              <CodeBlock
                language="bash"
                code={`curl http://localhost:3000/api/auth/me \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

curl http://localhost:3000/api/tasks \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"`}
              />
            </div>

            {/* Step 3: Configure MCP */}
            <div>
              <h4 className="font-semibold mb-2">3. Configurar OpenAPI MCP</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Agrega en tu <code className="bg-muted px-1 rounded">.mcp.json</code>:
              </p>
              <CodeBlock
                language="json"
                code={`{
  "mcpServers": {
    "upex-dojo-api": {
      "command": "npx",
      "args": ["-y", "@ivotoby/openapi-mcp-server", "--tools", "dynamic"],
      "env": {
        "API_BASE_URL": "http://localhost:3000",
        "OPENAPI_SPEC_PATH": "http://localhost:3000/api/swagger.json",
        "API_HEADERS": "Authorization:Bearer YOUR_JWT_TOKEN"
      }
    }
  }
}`}
              />
            </div>

            {/* Example usage */}
            <div>
              <h4 className="font-semibold mb-2">4. Ejemplos de uso en Claude</h4>
              <div className="bg-muted/50 p-4 rounded-lg text-sm space-y-2">
                <p>• &ldquo;Lista todos mis tasks&rdquo;</p>
                <p>• &ldquo;Crea una nueva task con título &apos;Test automation&apos;&rdquo;</p>
                <p>• &ldquo;Mueve la task X a estado done&rdquo;</p>
                <p>• &ldquo;Elimina la task con ID abc123&rdquo;</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Section 4: E2E Testing with Playwright */}
        <AccordionItem value="e2e" className="border rounded-lg px-4">
          <AccordionTrigger className="text-lg font-semibold" data-testid="accordion-e2e">
            <span className="flex items-center gap-2">
              <TestTube2 className="h-5 w-5 text-pink-500" />
              E2E Testing (Playwright)
            </span>
          </AccordionTrigger>
          <AccordionContent className="space-y-6 pb-4">
            {/* Overview */}
            <div>
              <h4 className="font-semibold mb-2">Interceptar JWT durante Login UI</h4>
              <p className="text-sm text-muted-foreground">
                Cuando un usuario hace login desde la UI, el sistema hace una llamada a{" "}
                <code className="bg-muted px-1 rounded">/api/auth/login</code> que retorna el JWT token.
                Puedes interceptar esta respuesta con Playwright para obtener el token y usarlo en llamadas API.
              </p>
            </div>

            {/* Step 1 */}
            <div>
              <h4 className="font-semibold mb-2">1. Interceptar el token durante login</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Usa <code className="bg-muted px-1 rounded">page.waitForResponse()</code> para capturar la respuesta:
              </p>
              <CodeBlock
                language="typescript"
                code={`import { test, expect } from '@playwright/test';

test('login and get JWT token', async ({ page }) => {
  await page.goto('/login');

  // Fill login form
  await page.fill('[data-testid="login-email-input"]', 'testuser@upex.dev');
  await page.fill('[data-testid="login-password-input"]', 'Test123!');

  // Wait for the /api/auth/login response while clicking submit
  const [response] = await Promise.all([
    page.waitForResponse(resp =>
      resp.url().includes('/api/auth/login') && resp.status() === 200
    ),
    page.click('[data-testid="login-submit-button"]'),
  ]);

  // Extract the JWT token
  const { access_token } = await response.json();
  console.log('JWT Token:', access_token);

  // Store for later use in API calls
  expect(access_token).toBeTruthy();
});`}
              />
            </div>

            {/* Step 2 */}
            <div>
              <h4 className="font-semibold mb-2">2. Usar el token para llamadas API</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Una vez que tienes el token, úsalo con <code className="bg-muted px-1 rounded">request.newContext()</code>:
              </p>
              <CodeBlock
                language="typescript"
                code={`test('use token for API calls', async ({ page, request }) => {
  // ... login and get access_token (step 1)

  // Create API context with auth header
  const apiContext = await request.newContext({
    baseURL: 'http://localhost:3000',
    extraHTTPHeaders: {
      'Authorization': \`Bearer \${access_token}\`,
    },
  });

  // Now make authenticated API calls
  const tasksResponse = await apiContext.get('/api/tasks');
  expect(tasksResponse.ok()).toBeTruthy();

  const tasks = await tasksResponse.json();
  console.log('User tasks:', tasks);
});`}
              />
            </div>

            {/* Step 3 */}
            <div>
              <h4 className="font-semibold mb-2">3. Fixture reutilizable (recomendado)</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Crea un fixture para reutilizar la autenticación en múltiples tests:
              </p>
              <CodeBlock
                language="typescript"
                code={`// fixtures/auth.ts
import { test as base, APIRequestContext } from '@playwright/test';

type AuthFixtures = {
  authToken: string;
  authApi: APIRequestContext;
};

export const test = base.extend<AuthFixtures>({
  authToken: async ({ page }, use) => {
    await page.goto('/login');
    await page.fill('[data-testid="login-email-input"]', 'testuser@upex.dev');
    await page.fill('[data-testid="login-password-input"]', 'Test123!');

    const [response] = await Promise.all([
      page.waitForResponse(r => r.url().includes('/api/auth/login')),
      page.click('[data-testid="login-submit-button"]'),
    ]);

    const { access_token } = await response.json();
    await use(access_token);
  },

  authApi: async ({ authToken, request }, use) => {
    const ctx = await request.newContext({
      extraHTTPHeaders: { 'Authorization': \`Bearer \${authToken}\` },
    });
    await use(ctx);
    await ctx.dispose();
  },
});

// In your tests:
// import { test } from './fixtures/auth';
// test('my test', async ({ authApi }) => { ... });`}
              />
            </div>

            {/* data-testid reference */}
            <div>
              <h4 className="font-semibold mb-2">Selectores data-testid disponibles</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 bg-muted/50 p-2 rounded">
                  <code>login-email-input</code>
                  <span className="text-muted-foreground">- Campo de email</span>
                </div>
                <div className="flex items-center gap-2 bg-muted/50 p-2 rounded">
                  <code>login-password-input</code>
                  <span className="text-muted-foreground">- Campo de password</span>
                </div>
                <div className="flex items-center gap-2 bg-muted/50 p-2 rounded">
                  <code>login-submit-button</code>
                  <span className="text-muted-foreground">- Botón de submit</span>
                </div>
                <div className="flex items-center gap-2 bg-muted/50 p-2 rounded">
                  <code>login-error</code>
                  <span className="text-muted-foreground">- Alerta de error</span>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Section 5: Quick Reference */}
        <AccordionItem value="reference" className="border rounded-lg px-4">
          <AccordionTrigger className="text-lg font-semibold" data-testid="accordion-reference">
            <span className="flex items-center gap-2">
              <Terminal className="h-5 w-5 text-blue-500" />
              Referencia Rápida
            </span>
          </AccordionTrigger>
          <AccordionContent className="space-y-6 pb-4">
            {/* Demo credentials */}
            <div>
              <h4 className="font-semibold mb-2">Credenciales Demo</h4>
              <div className="grid gap-2 text-sm">
                <div className="flex items-center gap-2 bg-muted/50 p-3 rounded-lg">
                  <Badge>User</Badge>
                  <code>testuser@upex.dev</code>
                  <span className="text-muted-foreground">/</span>
                  <code>Test123!</code>
                </div>
                <div className="flex items-center gap-2 bg-muted/50 p-3 rounded-lg">
                  <Badge>Admin</Badge>
                  <code>admin@upex.dev</code>
                  <span className="text-muted-foreground">/</span>
                  <code>Admin123!</code>
                </div>
              </div>
            </div>

            {/* Endpoints */}
            <div>
              <h4 className="font-semibold mb-2">Endpoints Principales</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-600">POST</Badge>
                  <code>/api/auth/register</code>
                  <span className="text-muted-foreground">- Registro</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-600">POST</Badge>
                  <code>/api/auth/login</code>
                  <span className="text-muted-foreground">- Login (JWT)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-600">GET</Badge>
                  <code>/api/auth/me</code>
                  <span className="text-muted-foreground">- Usuario actual</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-600">GET</Badge>
                  <code>/api/tasks</code>
                  <span className="text-muted-foreground">- Listar tasks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-600">POST</Badge>
                  <code>/api/tasks</code>
                  <span className="text-muted-foreground">- Crear task</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-600">PUT</Badge>
                  <code>/api/tasks/:id</code>
                  <span className="text-muted-foreground">- Actualizar task</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-red-600">DELETE</Badge>
                  <code>/api/tasks/:id</code>
                  <span className="text-muted-foreground">- Eliminar task</span>
                </div>
              </div>
            </div>

            {/* Troubleshooting */}
            <div>
              <h4 className="font-semibold mb-2">Troubleshooting Común</h4>
              <div className="space-y-3 text-sm">
                <div className="border-l-2 border-amber-500 pl-3">
                  <p className="font-medium">Error: Connection refused</p>
                  <p className="text-muted-foreground">Verifica que el servidor esté corriendo (<code>bun run dev</code>)</p>
                </div>
                <div className="border-l-2 border-amber-500 pl-3">
                  <p className="font-medium">Error: 401 Unauthorized</p>
                  <p className="text-muted-foreground">El token JWT expiró o es inválido. Obtén uno nuevo.</p>
                </div>
                <div className="border-l-2 border-amber-500 pl-3">
                  <p className="font-medium">Error: 429 Task limit reached</p>
                  <p className="text-muted-foreground">Máximo 30 tasks por usuario. Elimina algunas para crear nuevas.</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
