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
    const limit = rateLimit(`${ip}:${data.email}`, 'login')
    if (!limit.allowed) {
      return NextResponse.json(
        { error: 'Too many attempts. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(limit.reset) } }
      )
    }

    await dbConnect()
    const user = await User.findOne({ email: data.email }).select('+passwordHash').lean()

    // Dummy hash for timing attack prevention
    const dummyHash = '$2a$12$S8uA.7.pZ7RkMvX1v.UeuefXGqW9Vb.fT1BvM7zPZ1VbM7zPZ1VbM'
    const hashToCompare = user ? user.passwordHash : dummyHash

    const isValid = await bcrypt.compare(data.password, hashToCompare)

    if (!user || !isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = await createSessionToken({
      userId: String(user._id),
      email: user.email
    })

    const response = NextResponse.json({
      user: { id: String(user._id), email: user.email, name: user.name }
    })

    await setSessionCookie(response, token)
    return response

  } catch (e) {
    logError('auth/login', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
