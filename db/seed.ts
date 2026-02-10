import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { users, tasks } from './schema';
import bcrypt from 'bcryptjs';

// Protected demo users - never deleted by cleanup
const PROTECTED_USERS = [
  { email: 'testuser@upex.dev', password: 'Test123!', name: 'Test User' },
  { email: 'admin@upex.dev', password: 'Admin123!', name: 'Admin User' },
];

// Sample tasks for demo users
const SAMPLE_TASKS = [
  { title: 'Learn Playwright basics', description: 'Complete the Playwright tutorial', status: 'done' as const, priority: 'high' as const },
  { title: 'Write login tests', description: 'Automate the login flow', status: 'in_progress' as const, priority: 'high' as const },
  { title: 'Setup API testing', description: 'Configure HTTP client for API tests', status: 'backlog' as const, priority: 'medium' as const },
  { title: 'Add database validations', description: 'Use DBHUB MCP for SQL queries', status: 'backlog' as const, priority: 'medium' as const },
  { title: 'Review test reports', description: 'Check Allure reports', status: 'backlog' as const, priority: 'low' as const },
];

async function seed() {
  console.log('🌱 Starting database seed...');

  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql);

  try {
    // Create protected users
    for (const user of PROTECTED_USERS) {
      console.log(`Creating user: ${user.email}`);

      const passwordHash = await bcrypt.hash(user.password, 10);

      const [createdUser] = await db
        .insert(users)
        .values({
          email: user.email,
          passwordHash,
          name: user.name,
        })
        .onConflictDoNothing()
        .returning();

      if (createdUser) {
        console.log(`✅ Created user: ${user.email}`);

        // Add sample tasks for this user
        for (const task of SAMPLE_TASKS) {
          await db.insert(tasks).values({
            userId: createdUser.id,
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            position: SAMPLE_TASKS.indexOf(task),
          });
        }
        console.log(`  📋 Added ${SAMPLE_TASKS.length} sample tasks`);
      } else {
        console.log(`⏭️  User already exists: ${user.email}`);
      }
    }

    console.log('✅ Seed completed successfully!');
  } catch (error) {
    console.error('❌ Seed failed:', error);
    throw error;
  }
}

seed();
