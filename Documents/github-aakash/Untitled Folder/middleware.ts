import { NextResponse, NextRequest } from 'next/server'
import { verifySessionToken } from '@/lib/verify-token'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('session')?.value

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      const verified = await verifySessionToken(token)
      if (!verified) {
        return NextResponse.redirect(new URL('/login', request.url))
      }
    } catch (e) {
      // ponytail: if secrets are missing, fail safely with 500 instead of crashing
      return new NextResponse('Internal Server Error', { status: 500 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
