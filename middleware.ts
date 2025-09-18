import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// TODO: Implement proper authentication check with NextAuth
// This is a placeholder middleware that will protect /favorites route

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the user is trying to access protected routes
  const protectedRoutes = ['/favorites']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  if (isProtectedRoute) {
    // TODO: Replace with actual authentication check
    // For now, we'll allow access to demonstrate the UI
    // Later, this will redirect to /auth/sign-in if not authenticated
    
    // Example of how this will work with NextAuth:
    // const token = request.cookies.get('next-auth.session-token')
    // if (!token) {
    //   return NextResponse.redirect(new URL('/auth/sign-in', request.url))
    // }
    
    console.log(`Accessing protected route: ${pathname}`)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
