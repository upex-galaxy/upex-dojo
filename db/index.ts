import { neon, NeonQueryFunction } from '@neondatabase/serverless';
import { drizzle, NeonHttpDatabase } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Lazy initialization to avoid build errors when DATABASE_URL is not set
let _db: NeonHttpDatabase<typeof schema> | null = null;

function getDb(): NeonHttpDatabase<typeof schema> {
  if (!_db) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set');
    }
    const sql: NeonQueryFunction<false, false> = neon(process.env.DATABASE_URL);
    _db = drizzle(sql, { schema });
  }
  return _db;
}

// Export a proxy that lazily initializes the db connection
export const db = new Proxy({} as NeonHttpDatabase<typeof schema>, {
  get(_target, prop) {
    const actualDb = getDb();
    const value = actualDb[prop as keyof typeof actualDb];
    if (typeof value === 'function') {
      return value.bind(actualDb);
    }
    return value;
  },
});

// Re-export schema types for convenience
export * from './schema';
