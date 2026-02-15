import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserId } from '@/lib/auth';
import { db, tasks } from '@/db';
import { eq, desc } from 'drizzle-orm';
import { z } from 'zod';
import { hasReachedTaskLimit, getTaskCount, taskLimitError, MAX_TASKS_PER_USER } from '@/lib/task-limit';

const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  description: z.string().max(2000, 'Description must be less than 2000 characters').optional(),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  status: z.enum(['backlog', 'in_progress', 'done']).default('backlog'),
});

// GET /api/tasks - List all tasks for the authenticated user
export async function GET(request: NextRequest) {
  try {
    const userId = await getAuthUserId(request);

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userTasks = await db
      .select()
      .from(tasks)
      .where(eq(tasks.userId, userId))
      .orderBy(desc(tasks.createdAt));

    const taskCount = userTasks.length;

    return NextResponse.json({
      tasks: userTasks,
      meta: {
        count: taskCount,
        maxAllowed: MAX_TASKS_PER_USER,
        remaining: MAX_TASKS_PER_USER - taskCount,
      },
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/tasks - Create a new task
export async function POST(request: NextRequest) {
  try {
    const userId = await getAuthUserId(request);

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check task limit
    if (await hasReachedTaskLimit(userId)) {
      const currentCount = await getTaskCount(userId);
      return NextResponse.json(taskLimitError(currentCount), { status: 429 });
    }

    const body = await request.json();
    const parsed = createTaskSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { title, description, priority, status } = parsed.data;

    // Get the next position for this status column
    const existingTasks = await db
      .select()
      .from(tasks)
      .where(eq(tasks.userId, userId));

    const statusTasks = existingTasks.filter((t) => t.status === status);
    const maxPosition = Math.max(0, ...statusTasks.map((t) => t.position ?? 0));

    const [newTask] = await db
      .insert(tasks)
      .values({
        userId,
        title,
        description,
        priority,
        status,
        position: maxPosition + 1,
      })
      .returning();

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error('Create task error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
