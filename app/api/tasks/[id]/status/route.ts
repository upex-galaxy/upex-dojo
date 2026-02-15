import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserId } from '@/lib/auth';
import { db, tasks } from '@/db';
import { eq, and } from 'drizzle-orm';
import { z } from 'zod';

const updateStatusSchema = z.object({
  status: z.enum(['backlog', 'in_progress', 'done']),
  position: z.number().int().min(0).optional(),
});

type Params = Promise<{ id: string }>;

// PATCH /api/tasks/:id/status - Update task status (for drag & drop)
export async function PATCH(request: NextRequest, { params }: { params: Params }) {
  try {
    const userId = await getAuthUserId(request);
    const { id } = await params;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if task exists and belongs to user
    const existingTask = await db.query.tasks.findFirst({
      where: and(eq(tasks.id, id), eq(tasks.userId, userId)),
    });

    if (!existingTask) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    const body = await request.json();
    const parsed = updateStatusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { status, position } = parsed.data;

    const updateData: Record<string, unknown> = {
      status,
      updatedAt: new Date(),
    };

    // If position is provided, use it; otherwise, calculate next position
    if (position !== undefined) {
      updateData.position = position;
    } else {
      // Get the max position in the target column
      const columnTasks = await db
        .select()
        .from(tasks)
        .where(and(eq(tasks.userId, userId)));

      const statusTasks = columnTasks.filter((t) => t.status === status);
      const maxPosition = Math.max(0, ...statusTasks.map((t) => t.position ?? 0));
      updateData.position = maxPosition + 1;
    }

    const [updatedTask] = await db
      .update(tasks)
      .set(updateData)
      .where(and(eq(tasks.id, id), eq(tasks.userId, userId)))
      .returning();

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error('Update task status error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
