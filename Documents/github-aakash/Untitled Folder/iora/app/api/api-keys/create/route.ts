import { NextResponse } from 'next/server'
import { generateApiKey } from '@/lib/api-keys'
import { createDoc } from '@/lib/firestore'
import { verifySessionToken } from '@/lib/verify-token'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const token = cookies().get('session')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const session = await verifySessionToken(token)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const { name } = body

    const { key, hash, masked } = generateApiKey()

    await createDoc('apiKeys', {
      userId: session.userId,
      name,
      hash,
      masked,
      createdAt: new Date(),
    })

    return NextResponse.json({ key, masked }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
