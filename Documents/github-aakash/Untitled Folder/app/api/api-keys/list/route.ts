import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { ApiKey } from '@/lib/models/ApiKey'
import { requireSession } from '@/lib/session'
import { logError } from '@/lib/logger'

export async function GET(request: Request) {
  try {
    const { error, session } = await requireSession()
    if (error) return session

    await dbConnect()
    const keys = await ApiKey.find({ userId: session?.userId })
      .select('name masked createdAt')
      .lean()

    return NextResponse.json(
      keys.map(k => ({
        id: String(k._id),
        name: k.name,
        masked: k.masked,
        createdAt: k.createdAt,
      })),
      { status: 200 }
    )
  } catch (e) {
    logError('api-keys/list', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
