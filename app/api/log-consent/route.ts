// /app/api/log-consent/route.ts
// This endpoint logs when users accept or reject cookies for legal protection

import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { choice, timestamp, userAgent, url } = body

    // Get IP address from request headers
    const forwardedFor = req.headers.get('x-forwarded-for')
    const realIp = req.headers.get('x-real-ip')
    const ipAddress = forwardedFor?.split(',')[0].trim() || realIp || 'unknown'

    // Log to console (you can replace with database insert)
    const logEntry = {
      type: 'COOKIE_CONSENT',
      choice, // 'accept' or 'reject'
      timestamp,
      ipAddress,
      userAgent,
      url,
      recordedAt: new Date().toISOString(),
    }

    console.log('📋 Consent Log:', JSON.stringify(logEntry, null, 2))

    // TODO: Save to database if needed
    // await db.consentLogs.create(logEntry)

    return NextResponse.json({ 
      success: true, 
      message: 'Consent logged successfully',
      recordedAt: logEntry.recordedAt,
    })
  } catch (error) {
    console.error('Consent logging error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to log consent' },
      { status: 500 }
    )
  }
}