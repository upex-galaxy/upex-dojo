import { db, tasks } from '@/db';
import { eq, count } from 'drizzle-orm';

export const MAX_TASKS_PER_USER = 30;

/**
 * Check if user has reached the task limit
 */
export async function hasReachedTaskLimit(userId: string): Promise<boolean> {
  const result = await db
    .select({ count: count() })
    .from(tasks)
    .where(eq(tasks.userId, userId));

  return (result[0]?.count ?? 0) >= MAX_TASKS_PER_USER;
}

/**
 * Get current task count for a user
 */
export async function getTaskCount(userId: string): Promise<number> {
  const result = await db
    .select({ count: count() })
    .from(tasks)
    .where(eq(tasks.userId, userId));

  return result[0]?.count ?? 0;
}

/**
 * Task limit error response
 */
export function taskLimitError(currentCount: number) {
  return {
    error: 'Task limit reached',
    message: `Maximum ${MAX_TASKS_PER_USER} tasks per user. Delete some tasks to create new ones.`,
    currentCount,
    maxAllowed: MAX_TASKS_PER_USER,
  };
}
