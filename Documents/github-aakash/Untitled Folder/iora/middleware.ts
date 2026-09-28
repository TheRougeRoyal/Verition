import { NextResponse } from 'next/server'
import { verifySessionToken } from '@/lib/verify-token'

export async function middleware(request: Request) {
  const token = request.cookies.get('session')?.value

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    const verified = await verifySessionToken(token)
    if (!verified) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
