import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db, users } from '@/db';
import { eq } from 'drizzle-orm';
import { jwtVerify } from 'jose';

export async function GET(request: Request) {
  try {
    let userId: string | null = null;

    // Try Bearer token first
    const authHeader = request.headers.get('Authorization');
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      try {
        const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);
        const { payload } = await jwtVerify(token, secret);
        userId = payload.id as string;
      } catch {
        // Token invalid, will try session below
      }
    }

    // Fall back to session cookie
    if (!userId) {
      const session = await auth();
      userId = session?.user?.id ?? null;
    }

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
      columns: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
