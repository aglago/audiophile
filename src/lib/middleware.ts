import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth/next';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protected routes that require authentication
  const protectedRoutes = ['/checkout', '/orders', '/profile'];
  const adminRoutes = ['/admin'];

  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  const isAdminRoute = adminRoutes.some(route => 
    pathname.startsWith(route)
  );

  if (isProtectedRoute || isAdminRoute) {
    try {
      const session = await getServerSession(authOptions);
      
      if (!session) {
        // Redirect to login page with return URL
        const loginUrl = new URL('/auth/login', request.url);
        loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
      }

      // Check admin access for admin routes
      if (isAdminRoute && session.user?.role !== 'admin') {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    } catch (error) {
      console.error('Middleware auth error:', error);
      // Redirect to login on auth error
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};