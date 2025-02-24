import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the Privy auth cookie
  const isAuthenticated = request.cookies.get('privy-token')

  // Public paths that don't require authentication
  const publicPaths = ['/', '/api/meteoraMetrics']
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname)

  // If not authenticated and trying to access a protected route, redirect to home
  if (!isAuthenticated && !isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes that need to be public
     */
    '/((?!_next/static|_next/image|favicon.ico|public|api/meteoraMetrics).*)',
  ],
} 