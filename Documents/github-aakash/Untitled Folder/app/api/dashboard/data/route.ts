import { NextResponse } from 'next/server'
import { MOCK_CARBON_DATA, MOCK_COMPLIANCE_DATA, MOCK_RISK_DATA } from '@/lib/mock-data'

export async function GET() {
  try {
    // ponytail: initially returning mock data, will be replaced by MongoDB aggregation
    return NextResponse.json({
      carbon: MOCK_CARBON_DATA,
      compliance: MOCK_COMPLIANCE_DATA,
      risks: MOCK_RISK_DATA,
    }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
