import { NextResponse } from 'next/server'
import { assertSameOrigin, clearSessionCookie } from '@/lib/session'
import { logError } from '@/lib/logger'

export async function POST(request: Request) {
  try {
    const originError = assertSameOrigin(request)
    if (originError) return originError

    await clearSessionCookie()
    return NextResponse.json({ success: true })
  } catch (e) {
    logError('auth/logout', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
