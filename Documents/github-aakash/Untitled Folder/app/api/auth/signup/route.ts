import { NextResponse } from 'next/server'
import { createSessionToken } from '@/lib/verify-token'
import { createDoc } from '@/lib/firestore'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, name } = body

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    // ponytail: real password hashing would happen via Firebase or bcrypt
    const user = await createDoc('users', {
      email,
      name,
      createdAt: new Date(),
    })

    const token = await createSessionToken({ userId: user.id, email: user.email })

    const response = NextResponse.json({ user }, { status: 201 })
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
