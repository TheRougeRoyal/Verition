import { NextResponse } from 'next/server'
import { generateApiKey } from '@/lib/api-keys'
import dbConnect from '@/lib/mongodb'
import { ApiKey } from '@/lib/models/ApiKey'
import { requireSession, assertSameOrigin } from '@/lib/session'
import { validateApiKeyInput } from '@/lib/api-key-validation'
import { logError } from '@/lib/logger'

export async function POST(request: Request) {
  try {
    const originError = assertSameOrigin(request)
    if (originError) return originError

    const { error, session } = await requireSession()
    if (error) return session

    const body = await request.json()
    const validation = validateApiKeyInput(body)
    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid name' }, { status: 400 })
    }
    const { name } = validation.data

    await dbConnect()
    const count = await ApiKey.countDocuments({ userId: session?.userId })
    if (count >= 10) {
      return NextResponse.json({ error: 'API key limit reached (max 10)' }, { status: 409 })
    }

    const { key, hash, masked } = generateApiKey()

    await ApiKey.create({
      userId: session?.userId,
      name,
      hash,
      masked,
    })

    return NextResponse.json({ key, masked }, { status: 201 })
  } catch (e) {
    logError('api-keys/create', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
