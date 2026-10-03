import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { verifySessionToken, createSessionToken } from '@/lib/verify-token'
import { SessionPayload } from '@/lib/verify-token'

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  if (!token) return null
  return await verifySessionToken(token)
}

export async function requireSession() {
  const session = await getSession()
  if (!session) {
    return {
      error: true,
      response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }
  return { error: false, session }
}

export function assertSameOrigin(request: Request) {
  const origin = request.headers.get('origin')
  const host = request.headers.get('host')

  if (!origin) return null // Allow non-browser clients (e.g. curl)

  if (host && !origin.includes(host)) {
    return NextResponse.json({ error: 'Forbidden: Invalid Origin' }, { status: 403 })
  }
  return null
}

export async function setSessionCookie(response: NextResponse, token: string) {
  const cookieStore = await cookies()
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 24 * 60 * 60,
  })
}

export async function clearSessionCookie() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}
