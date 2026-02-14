import { OpenAPIRegistry, OpenApiGeneratorV3, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

// Extend Zod with OpenAPI support
extendZodWithOpenApi(z);

const registry = new OpenAPIRegistry();

// Register security scheme
registry.registerComponent('securitySchemes', 'bearerAuth', {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
});

// Common schemas
const ErrorSchema = z.object({
  error: z.string(),
  message: z.string().optional(),
  details: z.any().optional(),
});

const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

const TaskSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  title: z.string().max(200),
  description: z.string().max(2000).nullable(),
  status: z.enum(['backlog', 'in_progress', 'done']),
  priority: z.enum(['low', 'medium', 'high']),
  position: z.number().int(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

const CreateTaskSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  status: z.enum(['backlog', 'in_progress', 'done']).default('backlog'),
});

const UpdateTaskSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(2000).optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  status: z.enum(['backlog', 'in_progress', 'done']).optional(),
  position: z.number().int().min(0).optional(),
});

const UpdateStatusSchema = z.object({
  status: z.enum(['backlog', 'in_progress', 'done']),
  position: z.number().int().min(0).optional(),
});

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const LoginResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.literal('Bearer'),
  expires_in: z.number().int(),
});

// Register schemas
registry.register('Error', ErrorSchema);
registry.register('User', UserSchema);
registry.register('Task', TaskSchema);
registry.register('CreateTask', CreateTaskSchema);
registry.register('UpdateTask', UpdateTaskSchema);
registry.register('UpdateStatus', UpdateStatusSchema);
registry.register('Register', RegisterSchema);
registry.register('Login', LoginSchema);
registry.register('LoginResponse', LoginResponseSchema);

// Auth endpoints
registry.registerPath({
  method: 'post',
  path: '/api/auth/register',
  tags: ['Authentication'],
  summary: 'Register a new user',
  request: {
    body: {
      content: { 'application/json': { schema: RegisterSchema } },
    },
  },
  responses: {
    201: {
      description: 'User created successfully',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
            user: UserSchema,
          }),
        },
      },
    },
    400: { description: 'Validation error' },
    409: { description: 'User already exists' },
  },
});

registry.registerPath({
  method: 'post',
  path: '/api/auth/login',
  tags: ['Authentication'],
  summary: 'Login with credentials (returns JWT token)',
  description: 'Authenticate with email and password to receive a JWT access token. Use this token in the Authorization header for subsequent requests.',
  request: {
    body: {
      content: { 'application/json': { schema: LoginSchema } },
    },
  },
  responses: {
    200: {
      description: 'Login successful',
      content: {
        'application/json': {
          schema: LoginResponseSchema,
        },
      },
    },
    400: { description: 'Invalid email or password format' },
    401: { description: 'Invalid credentials' },
  },
});

registry.registerPath({
  method: 'get',
  path: '/api/auth/me',
  tags: ['Authentication'],
  summary: 'Get current user',
  description: 'Returns the current authenticated user. Accepts either a Bearer token in the Authorization header or a session cookie.',
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'Current user data',
      content: {
        'application/json': {
          schema: z.object({ user: UserSchema }),
        },
      },
    },
    401: { description: 'Unauthorized' },
    404: { description: 'User not found' },
  },
});

// Task endpoints
registry.registerPath({
  method: 'get',
  path: '/api/tasks',
  tags: ['Tasks'],
  summary: 'List all tasks',
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'List of tasks',
      content: {
        'application/json': {
          schema: z.object({
            tasks: z.array(TaskSchema),
            meta: z.object({
              count: z.number(),
              maxAllowed: z.number(),
              remaining: z.number(),
            }),
          }),
        },
      },
    },
    401: { description: 'Unauthorized' },
  },
});

registry.registerPath({
  method: 'post',
  path: '/api/tasks',
  tags: ['Tasks'],
  summary: 'Create a new task',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: { 'application/json': { schema: CreateTaskSchema } },
    },
  },
  responses: {
    201: {
      description: 'Task created',
      content: { 'application/json': { schema: TaskSchema } },
    },
    400: { description: 'Validation error' },
    401: { description: 'Unauthorized' },
    429: { description: 'Task limit reached (max 30)' },
  },
});

registry.registerPath({
  method: 'get',
  path: '/api/tasks/{id}',
  tags: ['Tasks'],
  summary: 'Get a specific task',
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({ id: z.string().uuid() }),
  },
  responses: {
    200: {
      description: 'Task data',
      content: { 'application/json': { schema: TaskSchema } },
    },
    401: { description: 'Unauthorized' },
    404: { description: 'Task not found' },
  },
});

registry.registerPath({
  method: 'put',
  path: '/api/tasks/{id}',
  tags: ['Tasks'],
  summary: 'Update a task',
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({ id: z.string().uuid() }),
    body: {
      content: { 'application/json': { schema: UpdateTaskSchema } },
    },
  },
  responses: {
    200: {
      description: 'Task updated',
      content: { 'application/json': { schema: TaskSchema } },
    },
    400: { description: 'Validation error' },
    401: { description: 'Unauthorized' },
    404: { description: 'Task not found' },
  },
});

registry.registerPath({
  method: 'delete',
  path: '/api/tasks/{id}',
  tags: ['Tasks'],
  summary: 'Delete a task',
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({ id: z.string().uuid() }),
  },
  responses: {
    200: {
      description: 'Task deleted',
      content: {
        'application/json': {
          schema: z.object({ message: z.string() }),
        },
      },
    },
    401: { description: 'Unauthorized' },
    404: { description: 'Task not found' },
  },
});

registry.registerPath({
  method: 'patch',
  path: '/api/tasks/{id}/status',
  tags: ['Tasks'],
  summary: 'Update task status (for drag & drop)',
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({ id: z.string().uuid() }),
    body: {
      content: { 'application/json': { schema: UpdateStatusSchema } },
    },
  },
  responses: {
    200: {
      description: 'Status updated',
      content: { 'application/json': { schema: TaskSchema } },
    },
    400: { description: 'Validation error' },
    401: { description: 'Unauthorized' },
    404: { description: 'Task not found' },
  },
});

// Generate OpenAPI document
const generator = new OpenApiGeneratorV3(registry.definitions);

export const openApiDocument = generator.generateDocument({
  openapi: '3.0.0',
  info: {
    title: 'UPEX DOJO API',
    version: '1.0.0',
    description: 'API for the UPEX DOJO QA practice platform. Provides authentication and task management endpoints.',
    contact: {
      name: 'UPEX Galaxy',
      url: 'https://upexgalaxy.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local development',
    },
    {
      url: 'https://dojo.upexgalaxy.com',
      description: 'Staging (Practice environment)',
    },
  ],
  tags: [
    { name: 'Authentication', description: 'User authentication endpoints' },
    { name: 'Tasks', description: 'Task management endpoints' },
  ],
});
