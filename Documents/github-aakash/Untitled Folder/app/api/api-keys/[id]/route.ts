import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { ApiKey } from '@/lib/models/ApiKey'
import { requireSession, assertSameOrigin } from '@/lib/session'
import { logError } from '@/lib/logger'
import mongoose from 'mongoose'

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const originError = assertSameOrigin(request)
    if (originError) return originError

    const { error, session } = await requireSession()
    if (error) return session

    const { id } = await params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
    }

    await dbConnect()
    const key = await ApiKey.findOne({ _id: id, userId: session?.userId })
    if (!key) {
      return NextResponse.json({ error: 'Key not found' }, { status: 404 })
    }

    await ApiKey.deleteOne({ _id: id })
    return NextResponse.json({ success: true })
  } catch (e) {
    logError('api-keys/delete', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
