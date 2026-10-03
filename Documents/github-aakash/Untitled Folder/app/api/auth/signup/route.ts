import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import dbConnect from '@/lib/mongodb'
import { User } from '@/lib/models/User'
import { validateAuthInput } from '@/lib/auth-validation'
import { setSessionCookie } from '@/lib/session'
import { createSessionToken } from '@/lib/verify-token'
import { rateLimit } from '@/lib/rate-limit'
import { logError } from '@/lib/logger'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { error, data } = validateAuthInput(body)
    if (error) return NextResponse.json({ error: 'Invalid input' }, { status: 400 })

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
    const limit = rateLimit(ip, 'signup')
    if (!limit.allowed) {
      return NextResponse.json(
        { error: 'Too many attempts. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(limit.reset) } }
      )
    }

    await dbConnect()
    const existingUser = await User.findOne({ email: data.email })
    if (existingUser) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(data.password, 12)
    const user = await User.create({
      email: data.email,
      name: data.name,
      passwordHash,
    })

    const token = await createSessionToken({
      userId: String(user._id),
      email: user.email
    })

    const response = NextResponse.json({
      user: { id: String(user._id), email: user.email, name: user.name }
    }, { status: 201 })

    await setSessionCookie(response, token)
    return response

  } catch (e) {
    logError('auth/signup', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
