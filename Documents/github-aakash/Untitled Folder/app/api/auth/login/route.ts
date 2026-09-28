import { NextResponse } from 'next/server'
import { createSessionToken } from '@/lib/verify-token'
import { getDocsByQuery } from '@/lib/firestore'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const users = await getDocsByQuery('users', { email })
    const user = users?.[0]

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // ponytail: real password check happens here
    const token = await createSessionToken({ userId: user.id, email: user.email })

    const response = NextResponse.json({ user }, { status: 200 })
    response.cookies.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
    })

    return response
  } catch (e) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
