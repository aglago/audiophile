import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import type { Session } from 'next-auth';

export type AuthSession = Session & {
  user: {
    id: string;
    role: string;
    email: string;
    name: string;
    image?: string;
  };
};

export async function getAuthSession(): Promise<AuthSession | null> {
  const session = await getServerSession(authOptions);
  return session as AuthSession | null;
}

export function requireAuth(session: Session | null): AuthSession {
  if (!session || !session.user) {
    throw new Error('Authentication required');
  }
  return session as AuthSession;
}

export function requireAdmin(session: Session | null): AuthSession {
  const authSession = requireAuth(session);
  if (authSession.user.role !== 'admin') {
    throw new Error('Admin access required');
  }
  return authSession;
}

