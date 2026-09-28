import { NextResponse } from 'next/server'
import { getDocsByQuery } from '@/lib/firestore'
import { verifySessionToken } from '@/lib/verify-token'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  try {
    const token = cookies().get('session')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const session = await verifySessionToken(token)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const keys = await getDocsByQuery('apiKeys', { userId: session.userId })

    return NextResponse.json(keys, { status: 200 })
  } catch (e) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
