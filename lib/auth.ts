import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { db, users } from '@/db';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { jwtVerify } from 'jose';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const { email, password } = parsed.data;

        const user = await db.query.users.findFirst({
          where: eq(users.email, email),
        });

        if (!user) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(password, user.passwordHash);

        if (!passwordMatch) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
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

// Type augmentation for next-auth
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
    };
  }
}

/**
 * Get authenticated user ID from either Bearer token or session cookie.
 * Use this in API routes that need to support both authentication methods.
 *
 * @param request - The incoming request (optional, only needed for Bearer token)
 * @returns The user ID if authenticated, null otherwise
 */
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
