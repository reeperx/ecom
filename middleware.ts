import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "./auth"

export async function middleware(request: NextRequest) {
  const session = await auth()
  
  // Public paths that don't require authentication
  const publicPaths = ['/login', '/register', '/']
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname)

  if (!session && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (session && isPublicPath && request.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL("/dashboard", request.url))
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