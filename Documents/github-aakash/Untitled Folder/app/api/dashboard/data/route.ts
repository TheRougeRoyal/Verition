import { NextResponse } from 'next/server'
import { MOCK_CARBON_DATA, MOCK_COMPLIANCE_DATA, MOCK_RISK_DATA } from '@/lib/mock-data'
import { requireSession } from '@/lib/session'
import { logError } from '@/lib/logger'

export async function GET() {
  try {
    const { error, session } = await requireSession()
    if (error) return session // session is the response in this case

    // ponytail: initially returning mock data, will be replaced by MongoDB aggregation
    return NextResponse.json({
      carbon: MOCK_CARBON_DATA,
      compliance: MOCK_COMPLIANCE_DATA,
      risks: MOCK_RISK_DATA,
      userId: session?.userId,
    }, { status: 200 })
  } catch (e) {
    logError('dashboard/data', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
